import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cards} from '../src/data/cards.js';
import {ateliers,sixPaths,sixPathsSynthesis,ATELIER_KEY,PATHS_KEY} from '../src/games/explorationsData.js';
import {initialAtelier,normalizeAtelier,atelierChoose,atelierVisit,atelierComplete,initialJourney,normalizeJourney,advanceJourney,finishJourney} from '../src/games/explorationsLogic.js';
import {buildBackup,validateBackup,restoreBackup,readStudySummary,ALLOWED_KEYS} from '../src/study/studyData.js';

const memory=()=>{
 const data=new Map();
 return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
};
const event=(selector,data={})=>({closest:q=>q===selector?{dataset:data}:null});
test('Ateliê associa nove indícios visuais a três cartas RWS',()=>{
 assert.equal(ateliers.length,3);
 assert.equal(new Set(ateliers.map(x=>x.slug)).size,3);
 for(const c of ateliers){
  assert.ok(cards.some(x=>x.slug===c.slug));
  assert.equal(c.points.length,3);
  assert.equal(new Set(c.points.map(x=>x.id)).size,3);
  for(const p of c.points){
   assert.ok(p.x>=0&&p.x<=100&&p.y>=0&&p.y<=100);
   assert.ok(p.observable.length>20&&p.interpretation.length>20&&p.question.length>20);
  }
  assert.equal(c.bridge.options.filter(x=>x.valid).length,1);
  assert.ok(c.bridge.options.every(x=>x.why.length>20));
 }
});
test('Ateliê só aceita um detalhe cadastrado e normaliza armazenamento',()=>{
 const a=atelierChoose(initialAtelier(),'o-louco');
 const first=atelierVisit(a,'borda');
 assert.deepEqual(first.seen,['borda']);
 assert.equal(atelierVisit(first,'inexistente'),first);
 assert.deepEqual(atelierVisit(first,'borda').seen,['borda']);
 assert.equal(atelierChoose(a,'nada'),a);
 assert.equal(normalizeAtelier({selected:'o-louco',phase:'connect',seen:['borda'],completed:[]}).phase,'inspect');
 const done=atelierComplete({...a,seen:['borda','animal','bagagem']});
 assert.deepEqual(done.completed,['o-louco']);
 assert.equal(done.phase,'choose');
});
test('Seis Caminhos seguem divisão de Naiff e têm cartões distintos',()=>{
 assert.deepEqual(sixPaths.map(s=>s.range),['I–V','VI','VII–XI','XII–XVI','XVII','XVIII–XXI']);
 assert.deepEqual(sixPaths.map(s=>s.name),['Vontade','Livre-arbítrio','Prazer','Dor','Esperança','Evolução']);
 assert.equal(new Set(sixPaths.map(s=>s.id)).size,6);
 for(const s of sixPaths){
  assert.ok(cards.some(c=>c.slug===s.representative));
  assert.equal(new Set(s.options).size,3);
  assert.equal(s.options.filter(x=>x===s.representative).length,1);
  assert.ok(s.description.length>50);
 }
 assert.equal(sixPathsSynthesis.options.filter(o=>o.valid).length,1);
});
test('Seis Caminhos não liberam estação errada nem conclusão prematura',()=>{
 const a=initialJourney();
 assert.equal(advanceJourney(a,false).step,0);
 assert.equal(finishJourney(a,true).completed,false);
 let b=a;
 for(let i=0;i<6;i++)b=advanceJourney(b,true);
 assert.equal(b.step,6);
 assert.equal(b.phase,'synthesis');
 assert.equal(finishJourney(b,false).completed,false);
 const done=finishJourney(b,true);
 assert.equal(done.completed,true);
 assert.equal(normalizeJourney(done).completed,true);
 assert.equal(normalizeJourney({step:99,phase:'complete',completed:false}).phase,'synthesis');
});
test('Ateliê real: observa nove pontos e completa três estudos com feedback',async()=>{
 globalThis.localStorage=memory();
 const root={innerHTML:'',querySelector:()=>null};
 globalThis.document={getElementById:id=>id==='atelier-root'?root:null,querySelector:()=>null};
 const ui=await import('../src/games/atelierGame.js');
 ui.renderAtelier();
 assert.match(root.innerHTML,/Um detalhe muda tudo/);
 for(const atelier of ateliers){
  assert.equal(ui.handleAtelierClick(event('[data-atelier-start]',{atelierStart:atelier.slug})),true);
  assert.match(root.innerHTML,/data-atelier-point/);
  for(const p of atelier.points) ui.handleAtelierClick(event('[data-atelier-point]',{atelierPoint:p.id}));
  assert.equal(ui.atelierSnapshot().seen.length,3);
  ui.handleAtelierClick(event('[data-atelier-bridge]'));
  const invalid=atelier.bridge.options.findIndex(x=>!x.valid);
  ui.handleAtelierClick(event('[data-atelier-answer]',{atelierAnswer:String(invalid)}));
  assert.match(root.innerHTML,/Ainda há um salto/);
  ui.handleAtelierClick(event('[data-atelier-retry]'));
  const correct=atelier.bridge.options.findIndex(x=>x.valid);
  ui.handleAtelierClick(event('[data-atelier-answer]',{atelierAnswer:String(correct)}));
  ui.handleAtelierClick(event('[data-atelier-finish]'));
 }
 assert.equal(ui.atelierSnapshot().completed.length,3);
 assert.match(root.innerHTML,/Três imagens. Nove detalhes/);
 assert.equal(readStudySummary(localStorage).atelierCompleted,true);
});
test('Seis Caminhos real: erra, recupera, percorre e sintetiza',async()=>{
 globalThis.localStorage=memory();
 const root={innerHTML:'',querySelector:()=>null};
 globalThis.document={getElementById:id=>id==='six-root'?root:null,querySelector:()=>null};
 const ui=await import('../src/games/sixPathsGame.js');
 ui.renderSixPaths();
 assert.match(root.innerHTML,/ESTAÇÃO 01 DE 06/);
 for(let i=0;i<6;i++){
  const station=sixPaths[i];
  const incorrect=station.options.findIndex(x=>x!==station.representative);
  ui.handleSixPathsClick(event('[data-six-pick]',{sixPick:String(incorrect)}));
  assert.equal(ui.sixPathsSnapshot().step,i);
  assert.match(root.innerHTML,/Observe a posição/);
  ui.handleSixPathsClick(event('[data-six-retry]'));
  const correct=station.options.indexOf(station.representative);
  ui.handleSixPathsClick(event('[data-six-pick]',{sixPick:String(correct)}));
  ui.handleSixPathsClick(event('[data-six-next]'));
 }
 assert.equal(ui.sixPathsSnapshot().phase,'synthesis');
 ui.handleSixPathsClick(event('[data-six-synthesis]',{sixSynthesis:'0'}));
 ui.handleSixPathsClick(event('[data-six-retry]'));
 ui.handleSixPathsClick(event('[data-six-synthesis]',{sixSynthesis:'1'}));
 ui.handleSixPathsClick(event('[data-six-finish]'));
 assert.equal(ui.sixPathsSnapshot().completed,true);
 assert.match(root.innerHTML,/O mapa está aberto/);
 assert.equal(readStudySummary(localStorage).pathsCompleted,true);
 ui.handleSixPathsClick(event('[data-six-reset]'));
 assert.equal(ui.sixPathsSnapshot().step,0);
});
test('Backup inclui as duas atividades e preserva registros anteriores',()=>{
 const source=memory();
 source.setItem('arcana-font','large');
 source.setItem(ATELIER_KEY,JSON.stringify({selected:'o-louco',phase:'choose',seen:[],completed:['o-louco'],notes:''}));
 source.setItem(PATHS_KEY,JSON.stringify({step:4,phase:'station',completed:false,notes:''}));
 const file=buildBackup(source);
 assert.ok(ALLOWED_KEYS.includes(ATELIER_KEY)&&ALLOWED_KEYS.includes(PATHS_KEY));
 const clean=validateBackup(file);
 const restored=memory();
 restored.setItem('arcana-firstlook-notes','other');
 restoreBackup(restored,clean);
 assert.equal(restored.getItem('arcana-font'),'large');
 assert.equal(readStudySummary(restored).atelierDiscovered,1);
 assert.equal(readStudySummary(restored).pathsStation,4);
 assert.equal(restored.getItem('arcana-firstlook-notes'),null);
});
test('Rotas, estilos e cards do painel estão integrados',()=>{
 const main=readFileSync(new URL('../src/app/main.js',import.meta.url),'utf8');
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const hub=readFileSync(new URL('../src/games/diamondGame.js',import.meta.url),'utf8');
 const panel=readFileSync(new URL('../src/study/studyUI.js',import.meta.url),'utf8');
 const css=readFileSync(new URL('../styles/explorations.css',import.meta.url),'utf8');
 for(const needle of ['atelierPage','sixPathsPage','handleAtelierClick','handleSixPathsClick','renderAtelier','renderSixPaths'])assert.ok(main.includes(needle));
 for(const route of ['#/praticas/atelie','#/praticas/seis-caminhos'])assert.ok(hub.includes(route));
 assert.ok(html.includes('styles/explorations.css'));
 assert.ok(panel.includes('atelierDiscovered')&&panel.includes('pathsStation'));
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/prefers-reduced-motion/);
});
