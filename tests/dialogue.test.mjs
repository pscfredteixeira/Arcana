import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cards} from '../src/data/cards.js';
import {dialogueChapters,dialogueTasks,dialogueTaskIds,findDialogueChapter} from '../src/dialogue/dialogueData.js';
import {
 DIALOGUE_KEY,initialDialogue,normalizeDialogue,nextDialogueTask,chooseDialogue,
 hintDialogue,noteDialogue,dialogueProgress,loadDialogue,storeDialogue
} from '../src/dialogue/dialogueLogic.js';
import {dialogueHubPage,dialogueChapterPage,handleDialogueClick,handleDialogueInput} from '../src/dialogue/dialogueUI.js';
import {ALLOWED_KEYS,buildBackup,validateBackup,restoreBackup,readStudySummary} from '../src/study/studyData.js';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const storage=(raw={})=>{
 const map=new Map(Object.entries(raw));
 return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)};
};
test('sete comparações, quatro revisões, imagens existentes e justificativas diferentes',()=>{
 assert.deepEqual(dialogueChapters.map(ch=>ch.taskIds.length),[1,2,2,2]);
 assert.equal(dialogueTaskIds.length,7);
 assert.equal(new Set(dialogueTaskIds).size,7);
 assert.deepEqual(new Set(dialogueTaskIds),new Set(Object.keys(dialogueTasks)));
 const majors=new Set(cards.filter(c=>c.arcana==='major').map(c=>c.slug));
 for(const chapter of dialogueChapters){
  assert.equal(findDialogueChapter(chapter.id),chapter);
  assert.ok(chapter.intro.length>40);
  for(const id of chapter.taskIds){
   const task=dialogueTasks[id];
   assert.equal(task.cards.length,2,id);
   assert.notEqual(task.cards[0],task.cards[1],id);
   for(const slug of task.cards)assert.ok(majors.has(slug),slug);
   for(const field of ['first','second','relation','example','prompt','hint'])assert.ok(task[field].length>35,id+':'+field);
   assert.equal(task.options.length,3,id);
   assert.ok(task.options.every(o=>o.text.length>24&&o.why.length>45),id);
   assert.ok(Number.isInteger(task.answer)&&task.answer>=0&&task.answer<3,id);
   assert.ok(task.options[task.answer].why.match(/certo|exato|boa leitura|isso mesmo/i),id);
  }
 }
});
test('o estudante não pode pular uma pergunta e aprende depois de errar',()=>{
 let s=initialDialogue();
 assert.deepEqual(dialogueProgress(s).chapters.map(x=>x.done),[0,0,0,0]);
 const first='comeco-acao',correct=dialogueTasks[first].answer;
 assert.equal(nextDialogueTask(s,'portal'),first);
 assert.deepEqual(chooseDialogue(s,'portal','agir-observar',2),s,'a pergunta pertence a outro capítulo');
 assert.deepEqual(chooseDialogue(s,'portal','qualquer',1),s,'tarefa inexistente');
 s=chooseDialogue(s,'portal',first,0);
 assert.equal(dialogueProgress(s).done,0,'o erro não conclui');
 assert.deepEqual(chooseDialogue(s,'portal',first,0),s,'a mesma opção não conta duas vezes');
 s=hintDialogue(s,'portal',first);
 assert.equal(s.answers[first].hintUsed,true);
 s=chooseDialogue(s,'portal',first,correct);
 assert.equal(dialogueProgress(s).done,1);
 assert.equal(dialogueProgress(s).independent,0,'não transforma o acerto após erro em acerto independente');
 assert.equal(dialogueProgress(s).withSupport,1);
 assert.equal(nextDialogueTask(s,'portal'),null);
 assert.deepEqual(chooseDialogue(s,'portal',first,2),s,'não muda resposta concluída');
 s=noteDialogue(s,'portal','Aprendi que começar é diferente de organizar ações.');
 assert.match(s.notes.portal,/diferente/);
 assert.equal(noteDialogue(s,'acao','Não terminei.').notes.acao,undefined,'não salva conclusão antecipada');
});
test('o aluno pode concluir todas as revisões sem visitar as cartas antes',()=>{
 let s=initialDialogue();
 for(const chapter of dialogueChapters){
  for(const id of chapter.taskIds){
   assert.equal(nextDialogueTask(s,chapter.id),id);
   s=chooseDialogue(s,chapter.id,id,dialogueTasks[id].answer);
  }
  assert.equal(nextDialogueTask(s,chapter.id),null);
 }
 const p=dialogueProgress(s);
 assert.equal(p.done,7);
 assert.equal(p.independent,7);
 assert.equal(p.finished,true);
 assert.deepEqual(p.chapters.map(ch=>ch.finished),[true,true,true,true]);
});
test('recupera progresso de backup, respeita versões antigas e limpa valores inválidos',()=>{
 let s=initialDialogue();
 s=chooseDialogue(s,'portal','comeco-acao',1);
 s=noteDialogue(s,'portal','Um teste pessoal.');
 const source=storage({'arcana-font':'large'});
 assert.equal(storeDialogue(source,s),true);
 assert.ok(ALLOWED_KEYS.includes(DIALOGUE_KEY));
 assert.equal(loadDialogue(source).notes.portal,'Um teste pessoal.');
 const backup=buildBackup(source,'2026-10-12T18:00:00.000Z'),valid=validateBackup(backup);
 assert.ok(Object.hasOwn(valid,DIALOGUE_KEY));
 const target=storage({'arcana-font':'normal'});
 assert.equal(restoreBackup(target,valid),true);
 assert.equal(target.getItem('arcana-font'),'large');
 assert.deepEqual(loadDialogue(target),normalizeDialogue(s));
 assert.equal(readStudySummary(target).dialogueCompleted,1);
 assert.equal(readStudySummary(target).dialogueTotal,7);
 assert.equal(readStudySummary(target).dialogueIndependent,1);
 const old=validateBackup({format:'arcana-local-backup',version:1,data:{'arcana-font':'normal'}});
 assert.equal(Object.hasOwn(old,DIALOGUE_KEY),false);
 const weird=normalizeDialogue({answers:{'comeco-acao':{attempts:[0,0,999,1]},'agit':{attempts:[0]}},notes:{portal:'x'.repeat(1000),acao:{html:'x'}}});
 assert.deepEqual(weird.answers['comeco-acao'].attempts,[0]);
 assert.equal(weird.notes.portal.length,400);
 assert.equal(weird.notes.acao,undefined);
});
test('a oficina aparece nas quatro áreas e fica no cache do iPhone',()=>{
 const old=globalThis.localStorage;
 globalThis.localStorage=storage();
 try{
  const home=dialogueHubPage();
  assert.ok(home.includes('Sete')||home.includes('sete'));
  for(const ch of dialogueChapters){
   assert.ok(home.includes('#/praticas/cartas-em-dialogo/'+ch.id));
   assert.ok(dialogueChapterPage(ch.id).includes('data-dialogue-chapter="'+ch.id+'"'));
  }
  assert.equal(dialogueChapterPage('outra'),'');
 }finally{globalThis.localStorage=old;}
 const app=read('src/app/main.js');
 for(const mark of ["path==='/praticas/cartas-em-dialogo'","handleDialogueClick","handleDialogueInput"])assert.ok(app.includes(mark),mark);
 assert.match(read('src/ui/templates.js'),/Cartas em Diálogo/);
 assert.match(read('src/games/diamondGame.js'),/cartas-em-dialogo/);
 assert.match(read('src/journey/majorJourneyUI.js'),/journey-review-link/);
 assert.match(read('src/study/studyUI.js'),/Cartas em Diálogo/);
 assert.match(read('index.html'),/styles\/dialogue.css/);
 assert.match(read('sw.js'),/arcana-app-shell-v10/);
 for(const name of ['dialogueData.js','dialogueLogic.js','dialogueUI.js','dialogue.css'])assert.ok(read('sw.js').includes(name),name);
});
test('clicar no exercício mostra a explicação do erro e preserva o acerto antes de avançar',()=>{
 const oldDoc=globalThis.document,oldStorage=globalThis.localStorage;
 const local=storage(),root={dataset:{dialogueChapter:'portal'},innerHTML:'',querySelector:()=>({focus(){}})};
 globalThis.localStorage=local;
 globalThis.document={getElementById:id=>id==='dialogue-root'?root:null};
 const click=(name,i)=>handleDialogueClick({closest:()=>({hasAttribute:a=>a===name,dataset:{dialogueChoice:String(i)}})});
 try{
  assert.ok(dialogueChapterPage('portal').includes('data-dialogue-choice'));
  assert.equal(click('data-dialogue-choice',0),true);
  assert.match(root.innerHTML,/Ainda não/);
  assert.equal(click('data-dialogue-hint'),true);
  assert.match(root.innerHTML,/Dica/);
  assert.equal(click('data-dialogue-choice',1),true);
  assert.match(root.innerHTML,/Boa leitura/);
  assert.match(root.innerHTML,/data-dialogue-next/);
  assert.equal(click('data-dialogue-next'),true);
  assert.match(root.innerHTML,/REVISÃO CONCLUÍDA/);
  assert.equal(handleDialogueInput({id:'dialogue-note',dataset:{dialogueNote:'portal'},value:'Duas cartas que se completam.'}),true);
  assert.match(loadDialogue(local).notes.portal,/se completam/);
 }finally{globalThis.document=oldDoc;globalThis.localStorage=oldStorage;}
});
