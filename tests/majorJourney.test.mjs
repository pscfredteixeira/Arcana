import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cards} from '../src/data/cards.js';
import {journeyChapters,journeyOrder,journeyTasks,journeyChapterOf} from '../src/journey/majorJourneyData.js';
import {
 MAJOR_JOURNEY_KEY,initialMajorJourney,normalizeMajorJourney,visitMajor,
 advanceMajor,chooseMajor,saveMajorNote,majorProgress,loadMajorJourney,storeMajorJourney
} from '../src/journey/majorJourneyLogic.js';
import {majorJourneyHub,majorStationPage} from '../src/journey/majorJourneyUI.js';
import {ALLOWED_KEYS,buildBackup,validateBackup,restoreBackup,readStudySummary} from '../src/study/studyData.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const store=(values={})=>{const data=new Map(Object.entries(values));return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};};
test('22 cartas completas, números RWS, um ponto de partida e três grupos de sete',()=>{
 assert.equal(cards.filter(c=>c.arcana==='major').length,22);
 assert.equal(journeyChapters.length,4);
 assert.deepEqual(journeyChapters.map(c=>c.slugs.length),[1,7,7,7]);
 assert.equal(journeyOrder.length,22);
 assert.equal(new Set(journeyOrder).size,22);
 assert.deepEqual(new Set(journeyOrder),new Set(cards.filter(c=>c.arcana==='major').map(c=>c.slug)));
 assert.deepEqual(Object.keys(journeyTasks).sort(),[...journeyOrder].sort());
 assert.equal(journeyOrder.at(0),'o-louco');
 assert.equal(journeyOrder.at(8),'a-forca');
 assert.equal(journeyOrder.at(11),'a-justica');
 assert.equal(journeyOrder.at(-1),'o-mundo');
 for(const slug of journeyOrder){
  const x=journeyTasks[slug];
  assert.ok(journeyChapterOf(slug));
  assert.ok(x.focus.length>25,slug+' / imagem');
  assert.ok(x.observation.length>70,slug+' / explicação');
  assert.ok(x.contrast.length>50,slug+' / comparação');
  assert.ok(x.scenario.length>45,slug+' / exemplo');
  assert.ok(x.why.length>55,slug+' / feedback');
  assert.equal(x.options.length,3,slug);
  assert.ok(x.options.every(y=>y.length>=18),slug+' / alternativa');
  assert.ok(x.answer>=0&&x.answer<=2,slug);
 }
});
test('a progressão ensina antes de corrigir e não bloqueia acesso às cartas',()=>{
 let s=initialMajorJourney();
 assert.deepEqual(majorProgress(s),{completed:0,total:22,next:'o-louco',finished:false,percent:0});
 let t=chooseMajor(s,'o-louco',journeyTasks['o-louco'].answer);
 assert.deepEqual(t,s,'não concluir sem observar e estudar');
 s=advanceMajor(s);
 assert.equal(s.stage,'understand');
 s=advanceMajor(s);
 assert.equal(s.stage,'practice');
 s=chooseMajor(s,'o-louco',0);
 assert.equal(majorProgress(s).completed,0,'erro não conclui');
 assert.deepEqual(s.attempts['o-louco'],[0]);
 s=chooseMajor(s,'o-louco',journeyTasks['o-louco'].answer);
 assert.equal(majorProgress(s).completed,1,'acerto após revisão conclui');
 assert.deepEqual(chooseMajor(s,'o-louco',2),s,'não altera a carta após concluída');
 s=saveMajorNote(s,'o-louco','O começo pode ser corajoso e cuidadoso.');
 assert.match(s.notes['o-louco'],/corajoso/);
 s=visitMajor(s,'o-carro');
 assert.equal(s.stage,'observe');
 assert.equal(s.current,'o-carro');
 assert.equal(s.completed.length,1);
});
test('todas as 22 cartas podem ser concluídas sem respostas automáticas',()=>{
 let s=initialMajorJourney();
 for(const slug of journeyOrder){
  s=visitMajor(s,slug);
  s=advanceMajor(advanceMajor(s));
  const answer=journeyTasks[slug].answer;
  s=chooseMajor(s,slug,answer);
  assert.ok(s.completed.includes(slug));
 }
 assert.equal(majorProgress(s).percent,100);
 assert.equal(majorProgress(s).finished,true);
 assert.equal(majorProgress(s).next,null);
});
test('o progresso não aceita conclusões falsas nem opções ou notas malformadas',()=>{
 const malformed={
  current:'../../bad',stage:'inventado',completed:['o-mundo','o-louco','a-morte','O Rei'],
  attempts:{'o-mundo':[9], 'o-louco':['a'], 'a-morte':[journeyTasks['a-morte'].answer]},
  notes:{'a-morte':'a'.repeat(900), 'o-carro':{html:'<img>'}}
 };
 const s=normalizeMajorJourney(malformed);
 assert.equal(s.current,'o-louco');
 assert.equal(s.stage,'observe');
 assert.deepEqual(s.completed,['a-morte']);
 assert.equal(s.notes['a-morte'].length,350);
 assert.equal(s.notes['o-carro'],undefined);
 assert.deepEqual(visitMajor(s,'nao-existe'),s);
 assert.deepEqual(chooseMajor(s,'o-louco',99),s);
});
test('as telas exibem os 22 pontos, explicações e perguntas, sem bloquear as demais cartas',()=>{
 const old=globalThis.localStorage;
 globalThis.localStorage=store();
 try{
  const hub=majorJourneyHub();
  assert.ok(hub.includes('22 cartas'));
  for(const slug of journeyOrder)assert.ok(hub.includes('#/jornada/'+slug),slug);
  assert.match(hub,/Força é VIII/);
  assert.match(hub,/Justiça é XI/);
  for(const slug of journeyOrder){
   const page=majorStationPage(slug);
   assert.ok(page.includes('major-journey-root'),slug);
   assert.ok(page.includes('data-major-slug="'+slug+'"'),slug);
   assert.ok(page.includes('data-major-stage'),slug);
  }
 }finally{globalThis.localStorage=old;}
 const app=read('src/app/main.js');
 assert.match(app,/path==='\/jornada'/);
 assert.match(app,/path\.startsWith\('\/jornada\/'\)/);
 assert.match(app,/handleMajorJourneyClick/);
 assert.match(app,/handleMajorJourneyInput/);
 assert.match(read('src/ui/templates.js'),/href="#\/jornada"/);
 assert.match(read('index.html'),/styles\/majorJourney.css/);
});
test('o PWA guarda a jornada e o backup antigo continua compatível',()=>{
 let s=initialMajorJourney();
 s=advanceMajor(advanceMajor(s));
 s=chooseMajor(s,'o-louco',1);
 s=saveMajorNote(s,'o-louco','Um exemplo pessoal.');
 const storage=store({'arcana-font':'large'});
 assert.equal(storeMajorJourney(storage,s),true);
 assert.equal(loadMajorJourney(storage).completed.length,1);
 assert.ok(ALLOWED_KEYS.includes(MAJOR_JOURNEY_KEY));
 const backup=buildBackup(storage,'2026-10-12T18:00:00Z');
 const valid=validateBackup(backup),fresh=store();
 assert.equal(restoreBackup(fresh,valid),true);
 assert.deepEqual(loadMajorJourney(fresh),normalizeMajorJourney(s));
 assert.equal(readStudySummary(fresh).majorJourneyCompleted,1);
 assert.equal(readStudySummary(fresh).majorJourneyTotal,22);
 assert.equal(fresh.getItem('arcana-font'),'large');
 const old=validateBackup({format:'arcana-local-backup',version:1,data:{'arcana-font':'normal'}});
 assert.equal(Object.hasOwn(old,MAJOR_JOURNEY_KEY),false);
 const sw=read('sw.js');
 for(const file of ['majorJourneyData.js','majorJourneyLogic.js','majorJourneyUI.js','majorJourney.css'])assert.ok(sw.includes(file));
 assert.match(sw,/arcana-app-shell-v9/);
});
