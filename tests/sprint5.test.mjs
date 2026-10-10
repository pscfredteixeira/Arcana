import test from 'node:test';
import assert from 'node:assert/strict';
import {cards} from '../src/data/cards.js';
import {spreads} from '../src/data/spreadDefinitions.js';
import {
 freshReading,normalizeReading,drawWithoutReplacement,drawReading,revealAt,allRevealed,
 enterReview,reviseNotes,archiveReading,normalizeArchive,MAX_ARCHIVE
} from '../src/spreads/spreadLogic.js';
import {readFileSync} from 'node:fs';

test('dois modelos didáticos, com perguntas e posições distintas',()=>{
 assert.equal(spreads.tres.positions.length,3);
 assert.equal(spreads.cinco.positions.length,5);
 for(const def of Object.values(spreads)){
  assert.equal(new Set(def.positions.map(p=>p.id)).size,def.count);
  for(const p of def.positions){assert.ok(p.name&&p.prompt.length>20&&p.helper.length>20);}
 }
});
test('distribuição não repete cartas e aceita as 78 ou apenas os Maiores',()=>{
 const all=drawReading(freshReading('cinco'),cards,()=>0.57);
 assert.equal(all.drawn.length,5);
 assert.equal(new Set(all.drawn).size,5);
 assert.equal(all.revealed.filter(Boolean).length,0);
 assert.equal(all.phase,'table');
 const majorSetup={...freshReading(),deck:'major',question:'Uma pergunta aberta'};
 const majors=drawReading(majorSetup,cards,()=>0.2);
 assert.equal(majors.drawn.length,3);
 assert.ok(majors.drawn.every(s=>cards.find(c=>c.slug===s).arcana==='major'));
 assert.equal(majors.question,'Uma pergunta aberta');
 assert.equal(drawWithoutReplacement([1,2,3,4],3,()=>0).length,3);
 assert.throws(()=>drawWithoutReplacement([],1));
});
test('o aluno só pode interpretar após revelar todas as cartas',()=>{
 const reading=drawReading(freshReading(),cards,()=>0.2);
 assert.equal(enterReview(reading).phase,'table');
 const once=revealAt(reading,0);
 assert.equal(once.selected,0);
 assert.equal(once.revealed.filter(Boolean).length,1);
 assert.equal(allRevealed(once),false);
 const finished=revealAt(revealAt(once,1),2);
 assert.equal(allRevealed(finished),true);
 assert.equal(enterReview(finished).phase,'review');
});
test('anotações e sessões recuperadas são validadas',()=>{
 let state=drawReading(freshReading('tres'),cards,()=>0.4);
 state=reviseNotes(state,'contexto','Descrição e hipótese');
 state.question='O que estou investigando?';
 const recovered=normalizeReading(state,cards.map(c=>c.slug));
 assert.equal(recovered.notes.contexto,'Descrição e hipótese');
 assert.equal(recovered.question,'O que estou investigando?');
 const invalid=normalizeReading({...state,drawn:['o-louco','o-louco','o-mago']},cards.map(c=>c.slug));
 assert.equal(invalid.phase,'setup');
 assert.equal(normalizeReading({spreadId:'inexistente'},cards.map(c=>c.slug)).spreadId,'tres');
});
test('diário guarda no máximo quinze registros e recusa leitura não concluída',()=>{
 const slugs=cards.map(c=>c.slug);
 assert.throws(()=>archiveReading(freshReading(),[], 'id','2026-10-10T00:00:00Z'));
 let state=drawReading(freshReading(),cards,()=>0.3);
 state={...state,revealed:[true,true,true],phase:'review',notes:{contexto:'Uma hipótese',tensao:'Outra',caminho:''}};
 let entries=[];
 for(let i=0;i<MAX_ARCHIVE+3;i++)entries=archiveReading(state,entries,'leitura-'+i,'2026-10-10T00:00:00Z');
 assert.equal(entries.length,MAX_ARCHIVE);
 assert.equal(new Set(entries.map(e=>e.id)).size,MAX_ARCHIVE);
 const restored=normalizeArchive(entries,slugs);
 assert.equal(restored.length,MAX_ARCHIVE);
 assert.equal(restored[0].reading.notes.contexto,'Uma hipótese');
});
test('componentes da mesa estão ligados às rotas e têm controles mobile-first',()=>{
 const app=readFileSync(new URL('../src/app/main.js',import.meta.url),'utf8');
 const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const ui=readFileSync(new URL('../src/spreads/spreadUI.js',import.meta.url),'utf8');
 const css=readFileSync(new URL('../styles/spreads.css',import.meta.url),'utf8');
 assert.match(app,/praticas\/mesa/);
 assert.match(app,/renderSpread/);
 assert.match(app,/handleSpreadClick/);
 assert.match(app,/handleSpreadInput/);
 assert.match(index,/styles\/spreads.css/);
 for(const pattern of ['data-spread-pattern','data-spread-deck','data-spread-reveal','data-spread-note','data-spread-save','data-spread-delete-confirm']){
  assert.ok(ui.includes(pattern),pattern);
 }
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/prefers-reduced-motion/);
});
test('a jornada completa funciona: preparar, revelar, registrar, guardar, refazer',async()=>{
 const memory=new Map();
 globalThis.localStorage={getItem:key=>memory.get(key)??null,setItem:(key,value)=>memory.set(key,String(value))};
 const nodes=new Map([['spread-root',{innerHTML:''}],['spread-journal-root',{innerHTML:''}]]);
 globalThis.document={getElementById:key=>nodes.get(key)??null};
 const ui=await import('../src/spreads/spreadUI.js');
 const click=(selector,dataset={})=>({closest:q=>q===selector?{dataset}:null});
 ui.renderSpread();
 assert.match(nodes.get('spread-root').innerHTML,/Primeiro, escolha/);
 ui.handleSpreadInput({id:'spread-question',value:'Como refletir sobre um projeto?',getAttribute:()=>null});
 ui.handleSpreadClick(click('[data-spread-deal]'));
 assert.equal(ui.getSpreadSnapshot().session.phase,'table');
 for(let i=0;i<3;i++)ui.handleSpreadClick(click('[data-spread-reveal]',{spreadReveal:String(i)}));
 assert.equal(ui.getSpreadSnapshot().session.revealed.filter(Boolean).length,3);
 ui.handleSpreadClick(click('[data-spread-review]'));
 assert.equal(ui.getSpreadSnapshot().session.phase,'review');
 ui.handleSpreadInput({id:'spread-synthesis',value:'Posso comparar as imagens antes de decidir.',getAttribute:()=>null});
 ui.handleSpreadClick(click('[data-spread-save]'));
 assert.equal(ui.getSpreadSnapshot().history.length,1);
 assert.match(nodes.get('spread-journal-root').innerHTML,/Posso comparar as imagens/);
 ui.handleSpreadClick(click('[data-spread-reset]'));
 assert.match(nodes.get('spread-root').innerHTML,/Começar outra tiragem/);
 ui.handleSpreadClick(click('[data-spread-reset-confirm]'));
 assert.equal(ui.getSpreadSnapshot().session.phase,'setup');
 assert.equal(ui.getSpreadSnapshot().history.length,1);
 ui.handleSpreadClick(click('[data-spread-pattern]',{spreadPattern:'cinco'}));
 ui.handleSpreadClick(click('[data-spread-deal]'));
 assert.equal(ui.getSpreadSnapshot().session.drawn.length,5);
 assert.equal(new Set(ui.getSpreadSnapshot().session.drawn).size,5);
});
