import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cards} from '../src/data/cards.js';
import {trioLessons,trioIds,trioById,trioCriteria} from '../src/trios/trioData.js';
import {
 TRIO_KEY,TRIO_MAX_DRAFT,initialTrio,normalizeTrio,readLesson,correctPair,isSolved,
 toggleTrioChoice,submitTrioChoices,useTrioHint,openTrioWriting,
 writeTrio,revealTrioExample,markTrioCriterion,finishTrio,
 trioProgress,loadTrio,storeTrio
} from '../src/trios/trioLogic.js';
import {trioHubPage,trioScenarioPage,handleTrioClick,handleTrioInput,handleTrioChange} from '../src/trios/trioUI.js';
import {ALLOWED_KEYS,buildBackup,validateBackup,restoreBackup,readStudySummary} from '../src/study/studyData.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const storage=(o={})=>{
 const m=new Map(Object.entries(o));
 return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)};
};
const validIndices=task=>task.choices.flatMap((choice,i)=>choice.valid?[i]:[]);
const badIndex=task=>task.choices.findIndex(choice=>!choice.valid);
const essay='Observo três imagens que podem explicar a situação por caminhos diferentes. A primeira mostra uma atitude, a segunda sugere um recurso e a terceira lembra uma pergunta que ainda precisamos fazer.';
function pair(s,id,indices){
 for(const i of indices)s=toggleTrioChoice(s,id,i);
 return submitTrioChoices(s,id);
}
test('quatro histórias com três imagens, duas leituras fundamentadas e uma previsão inadequada',()=>{
 assert.equal(trioLessons.length,4);
 assert.equal(new Set(trioIds).size,4);
 assert.equal(trioCriteria.length,3);
 const allCards=new Set(cards.map(c=>c.slug));
 for(const task of trioLessons){
  assert.equal(task.cards.length,3,task.id);
  assert.equal(new Set(task.cards.map(x=>x.slug)).size,3,task.id);
  for(const c of task.cards){
   assert.ok(allCards.has(c.slug),c.slug);
   assert.ok(c.observation.length>30&&c.meaning.length>30,c.slug);
  }
  assert.ok(task.situation.length>75,task.id);
  assert.equal(task.choices.length,3,task.id);
  assert.equal(validIndices(task).length,2,task.id);
  assert.ok(task.choices.every(x=>x.why.length>45),task.id);
  assert.ok(task.model.length>190&&task.revision.length>75,task.id);
  assert.ok(task.writingPrompt.length>60,task.id);
  assert.deepEqual(correctPair(task),validIndices(task));
 }
});
test('duas escolhas corretas após erro e dica não contam como desempenho sem ajuda',()=>{
 const task=trioLessons[0],id=task.id;
 let s=initialTrio();
 assert.equal(trioProgress(s).completed,0);
 assert.deepEqual(submitTrioChoices(s,id),s,'não permite enviar sem duas escolhas');
 const wrong=[validIndices(task)[0],badIndex(task)];
 s=pair(s,id,wrong);
 assert.equal(isSolved(s,id),false);
 assert.equal(readLesson(s,id).submissions.length,1);
 s=useTrioHint(s,id);
 assert.equal(readLesson(s,id).hintUsed,true);
 s=toggleTrioChoice(s,id,badIndex(task));
 s=toggleTrioChoice(s,id,validIndices(task)[1]);
 s=submitTrioChoices(s,id);
 assert.equal(isSolved(s,id),true);
 assert.equal(trioProgress(s).completed,0,'o acerto objetivo não é conclusão da escrita');
 assert.equal(readLesson(s,id).submissions.length,2);
 assert.deepEqual(toggleTrioChoice(s,id,2),s,'não altera questão já resolvida');
 s=openTrioWriting(s,id);
 assert.equal(readLesson(s,id).view,'writing');
 assert.deepEqual(finishTrio(s,id),s,'não conclui sem reflexão escrita');
 s=writeTrio(s,id,essay);
 assert.equal(readLesson(s,id).draft,essay);
 s=revealTrioExample(s,id);
 s=markTrioCriterion(s,id,0,true);
 s=markTrioCriterion(s,id,2,true);
 s=finishTrio(s,id);
 assert.equal(readLesson(s,id).finished,true);
 assert.equal(readLesson(s,id).checks.length,2);
 assert.equal(trioProgress(s).completed,1);
 assert.equal(trioProgress(s).independent,0);
 assert.equal(trioProgress(s).withSupport,1);
});
test('nenhuma interpretação recebe nota automática e o texto fica protegido',()=>{
 let s=pair(initialTrio(),trioIds[0],validIndices(trioLessons[0]));
 s=openTrioWriting(s,trioIds[0]);
 s=writeTrio(s,trioIds[0],'curto');
 assert.equal(readLesson(revealTrioExample(s,trioIds[0]),trioIds[0]).exampleShown,false);
 s=writeTrio(s,trioIds[0],'<script>alert(1)</script> '+essay);
 const id=trioIds[0];
 assert.equal(readLesson(revealTrioExample(s,id),id).exampleShown,true);
 assert.ok(!trioScenarioPage('id-inexistente'));
 const old=globalThis.localStorage;
 globalThis.localStorage=storage();
 try{assert.ok(trioHubPage().includes('Três cartas'));}
 finally{globalThis.localStorage=old;}
 assert.equal(Object.hasOwn(trioProgress(s),'writingGrade'),false);
 const long=writeTrio(s,id,'x'.repeat(TRIO_MAX_DRAFT+100));
 assert.equal(readLesson(long,id).draft.length,TRIO_MAX_DRAFT);
});
test('percurso completo das quatro situações, independentes e retomáveis',()=>{
 let s=initialTrio();
 for(const task of trioLessons){
  s=pair(s,task.id,validIndices(task));
  assert.ok(isSolved(s,task.id));
  s=openTrioWriting(s,task.id);
  s=writeTrio(s,task.id,essay);
  s=revealTrioExample(s,task.id);
  for(let i=0;i<3;i++)s=markTrioCriterion(s,task.id,i,true);
  s=finishTrio(s,task.id);
  assert.ok(readLesson(s,task.id).finished);
 }
 assert.equal(trioProgress(s).completed,4);
 assert.equal(trioProgress(s).independent,4);
 assert.equal(trioProgress(s).finished,true);
 assert.equal(trioProgress(s).next,null);
});
test('o backup inclui os textos novos e backups anteriores continuam funcionando',()=>{
 let s=pair(initialTrio(),trioIds[0],validIndices(trioLessons[0]));
 s=openTrioWriting(s,trioIds[0]);
 s=writeTrio(s,trioIds[0],essay);
 s=revealTrioExample(s,trioIds[0]);
 s=finishTrio(s,trioIds[0]);
 const source=storage({'arcana-font':'large','arcana-firstlook-notes':'Notas originais'});
 assert.equal(storeTrio(source,s),true);
 assert.ok(ALLOWED_KEYS.includes(TRIO_KEY));
 const exported=buildBackup(source,'2026-10-12T20:00:00.000Z');
 const validated=validateBackup(exported);
 assert.ok(Object.hasOwn(validated,TRIO_KEY));
 const dest=storage();
 assert.equal(restoreBackup(dest,validated),true);
 assert.deepEqual(loadTrio(dest),normalizeTrio(s));
 assert.equal(dest.getItem('arcana-font'),'large');
 assert.equal(dest.getItem('arcana-firstlook-notes'),'Notas originais');
 assert.equal(readStudySummary(dest).triosCompleted,1);
 assert.equal(readStudySummary(dest).triosTotal,4);
 const old=validateBackup({format:'arcana-local-backup',version:1,data:{'arcana-font':'normal'}});
 assert.equal(Object.hasOwn(old,TRIO_KEY),false);
 const malformed=normalizeTrio({lessons:{comecar:{selected:[200,0,0,-1],submissions:[[0,0],[6,1]],draft:'y'.repeat(5000),finished:true},unexpected:{finished:true}}});
 assert.equal(readLesson(malformed,'comecar').draft.length,TRIO_MAX_DRAFT);
 assert.equal(readLesson(malformed,'comecar').finished,false);
});
test('a nova rota está em Práticas, Aprender, Meu estudo e cache PWA 11',()=>{
 const app=read('src/app/main.js');
 for(const t of ["path==='/praticas/tres-cartas'","handleTrioClick","handleTrioInput","handleTrioChange"])assert.ok(app.includes(t),t);
 assert.match(read('src/ui/templates.js'),/Três Cartas, Uma História/);
 assert.match(read('src/games/diamondGame.js'),/praticas\/tres-cartas/);
 assert.match(read('src/study/studyUI.js'),/Três Cartas, Uma História/);
 assert.match(read('index.html'),/styles\/trios.css/);
 const sw=read('sw.js');
 assert.match(sw,/arcana-app-shell-v11/);
 for(const file of ['trioData.js','trioLogic.js','trioUI.js','trios.css'])assert.ok(sw.includes(file),file);
});
test('interação completa: selecionar duas leituras, justificar, autoavaliar e salvar',()=>{
 const oldStorage=globalThis.localStorage,oldDocument=globalThis.document;
 const local=storage();
 const root={dataset:{trioId:'comecar'},innerHTML:'',querySelector:()=>({focus(){}})};
 const counter={textContent:''}, model={disabled:true};
 globalThis.localStorage=local;
 globalThis.document={
  getElementById:id=>id==='trio-root'?root:id==='trio-writing-length'?counter:null,
  querySelector:()=>model
 };
 const click=(attr,n)=>handleTrioClick({closest:()=>({hasAttribute:name=>name===attr,dataset:{trioChoice:String(n)}})});
 try{
  assert.match(trioScenarioPage('comecar'),/trio-root/);
  assert.equal(click('data-trio-choice',0),true);
  assert.equal(click('data-trio-choice',2),true);
  assert.equal(click('data-trio-submit'),true);
  assert.match(root.innerHTML,/precisa ser revista/);
  assert.equal(click('data-trio-choice',2),true);
  assert.equal(click('data-trio-choice',1),true);
  assert.equal(click('data-trio-submit'),true);
  assert.match(root.innerHTML,/Essas duas leituras fazem sentido/);
  assert.equal(click('data-trio-write'),true);
  assert.match(root.innerHTML,/trio-draft/);
  assert.equal(handleTrioInput({id:'trio-draft',dataset:{trioDraft:'comecar'},value:essay}),true);
  assert.equal(model.disabled,false);
  assert.equal(click('data-trio-model'),true);
  assert.match(root.innerHTML,/Exemplo de uma leitura possível/);
  assert.equal(handleTrioChange({hasAttribute:a=>a==='data-trio-check',dataset:{trioCheck:'0'},checked:true}),true);
  assert.equal(click('data-trio-finish'),true);
  assert.match(root.innerHTML,/Sua interpretação ficou registrada/);
  assert.ok(readLesson(loadTrio(local),'comecar').finished);
  assert.ok(local.getItem(TRIO_KEY));
 }finally{globalThis.localStorage=oldStorage;globalThis.document=oldDocument;}
});
