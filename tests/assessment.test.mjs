import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {assessmentItems,transferTask,allCompetencies} from '../src/assessment/assessmentData.js';
import {
 ASSESSMENT_KEY,initialAssessment,normalizeAssessment,loadAssessment,storeAssessment,
 startAssessment,chooseAssessment,revealHint,nextAssessment,saveAssessmentWriting,
 showAssessmentExample,checkAssessmentCriterion,finishAssessment,
 answerStatus,isResolved,resultsAssessment
} from '../src/assessment/assessmentLogic.js';
import {ALLOWED_KEYS,buildBackup,validateBackup,restoreBackup,readStudySummary} from '../src/study/studyData.js';
import {studyPage} from '../src/study/studyUI.js';
import {assessmentPage} from '../src/assessment/assessmentUI.js';
import {learnPage} from '../src/ui/templates.js';
import {practicesHub} from '../src/games/diamondGame.js';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const storage=(values={})=>{
 const data=new Map(Object.entries(values));
 return {getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,String(value)),removeItem:key=>data.delete(key)};
};
const right=q=>q.options.find(o=>o.correct).id;
const wrong=q=>q.options.filter(o=>!o.correct).map(o=>o.id);
function finishQuestions(s){
 for(const q of assessmentItems){
  s=chooseAssessment(s,right(q));
  s=nextAssessment(s);
 }
 return s;
}
test('a avaliação cobre quatro habilidades diferentes e uma carta nova',()=>{
 assert.equal(assessmentItems.length,4);
 assert.equal(new Set(assessmentItems.map(q=>q.id)).size,4);
 assert.equal(new Set(assessmentItems.map(q=>q.card)).size,4);
 assert.equal(allCompetencies.length,5);
 for(const q of assessmentItems){
  assert.equal(q.options.length,3);
  assert.equal(q.options.filter(o=>o.correct).length,1);
  assert.equal(new Set(q.options.map(o=>o.id)).size,3);
  assert.ok(q.options.every(o=>o.why.length>60));
  assert.ok(q.hint.length>40&&q.rationale.length>50);
  assert.ok(q.review.url.startsWith('#/'));
 }
 assert.ok(!assessmentItems.some(q=>q.card===transferTask.card));
 assert.equal(transferTask.criteria.length,3);
});
test('respostas sem ajuda se distinguem de acertos após uma dica',()=>{
 let s=startAssessment(initialAssessment()),q=assessmentItems[0];
 assert.equal(s.phase,'questions');
 assert.equal(nextAssessment(s).index,0,'não passa sem responder');
 s=chooseAssessment(s,right(q));
 assert.equal(answerStatus(q,s.responses[q.id]),'sozinho');
 assert.equal(isResolved(q,s.responses[q.id]),true);
 s=nextAssessment(s);
 q=assessmentItems[1];
 s=revealHint(s);
 assert.equal(s.responses[q.id].hintUsed,true);
 s=chooseAssessment(s,right(q));
 assert.equal(answerStatus(q,s.responses[q.id]),'com-apoio');
 s=nextAssessment(s);
 q=assessmentItems[2];
 s=chooseAssessment(s,wrong(q)[0]);
 assert.equal(isResolved(q,s.responses[q.id]),false);
 assert.equal(answerStatus(q,s.responses[q.id]),'pendente');
 s=chooseAssessment(s,right(q));
 assert.equal(answerStatus(q,s.responses[q.id]),'com-apoio');
 assert.equal(resultsAssessment(s).counts.sozinho,1);
 assert.equal(resultsAssessment(s).counts.apoio,2);
});
test('erro repetido leva à revisão e não bloqueia o aluno indefinidamente',()=>{
 let s=startAssessment(initialAssessment());
 const q=assessmentItems[0];
 s=chooseAssessment(s,wrong(q)[0]);
 const repeat=chooseAssessment(s,wrong(q)[0]);
 assert.deepEqual(repeat,s,'não conta a mesma alternativa duas vezes');
 s=chooseAssessment(s,wrong(q)[1]);
 s=chooseAssessment(s,right(q));
 assert.equal(answerStatus(q,s.responses[q.id]),'revisar','dois erros mostram que é importante revisar, mesmo após acertar');
 s=nextAssessment(s);
 assert.equal(s.index,1);
 // O acerto foi permitido depois de duas falhas, mas o assunto entra para revisão.
});
test('interpretação livre não recebe nota automática nem exige texto idêntico ao modelo',()=>{
 let s=finishQuestions(startAssessment(initialAssessment()));
 assert.equal(s.phase,'writing');
 assert.equal(s.index,4);
 assert.equal(finishAssessment(s).phase,'writing');
 s=saveAssessmentWriting(s,'Vejo um barco levando pessoas e espadas. Isso pode lembrar mudança e o peso das experiências anteriores.');
 assert.ok(s.writing.length>45);
 assert.equal(finishAssessment(s).phase,'writing','precisa comparar o modelo antes');
 s=showAssessmentExample(s);
 assert.equal(s.sampleRevealed,true);
 s=checkAssessmentCriterion(s,0,true);
 s=checkAssessmentCriterion(s,1,true);
 s=checkAssessmentCriterion(s,2,false);
 s=finishAssessment(s,'2026-10-12T18:00:00.000Z');
 assert.equal(s.phase,'report');
 const report=resultsAssessment(s);
 assert.equal(report.counts.sozinho,4);
 assert.equal(report.writing.checked,2);
 assert.equal(report.writing.criteriaTotal,3);
 assert.equal(report.writing.manuallyReviewed,true);
 assert.equal(report.complete,true);
 assert.equal(Object.hasOwn(report.writing,'score'),false);
});
test('recuperar uma tentativa interrompida e normalizar dados ruins',()=>{
 const local=storage();
 let s=startAssessment(initialAssessment());
 s=chooseAssessment(s,wrong(assessmentItems[0])[0]);
 assert.equal(storeAssessment(local,s),true);
 const resumed=loadAssessment(local);
 assert.equal(resumed.index,0);
 assert.deepEqual(resumed.responses.estrutura.attempts,['b']);
 s=chooseAssessment(resumed,right(assessmentItems[0]));
 s=nextAssessment(s);
 assert.equal(storeAssessment(local,s),true);
 assert.equal(loadAssessment(local).index,1);
 assert.equal(normalizeAssessment({phase:'report',index:20,responses:{},writing:'<script>alert(1)</script>'}).phase,'welcome');
 assert.equal(normalizeAssessment(null).phase,'welcome');
 const garbage={...s,responses:{estrutura:{attempts:['not-allowed']}}};
 assert.equal(normalizeAssessment(garbage).responses.estrutura.attempts.length,0);
});
test('o backup guarda a avaliação sem perder registros de versões antigas',()=>{
 const local=storage({'arcana-font':'large','arcana-firstlook-notes':'Notas originais'});
 let s=finishQuestions(startAssessment(initialAssessment()));
 s=saveAssessmentWriting(s,'Há pessoas atravessando água em um barco. Essa cena pode lembrar mudança, mas não garante resultados.');
 s=showAssessmentExample(s);
 s=checkAssessmentCriterion(s,0,true);
 s=finishAssessment(s,'2026-10-12T18:00:00.000Z');
 storeAssessment(local,s);
 assert.ok(ALLOWED_KEYS.includes(ASSESSMENT_KEY));
 const backup=buildBackup(local,'2026-10-12T18:01:00.000Z');
 assert.ok(Object.hasOwn(backup.data,ASSESSMENT_KEY));
 const normalized=validateBackup(JSON.parse(JSON.stringify(backup)));
 const fresh=storage({'arcana-font':'normal'});
 assert.equal(restoreBackup(fresh,normalized),true);
 assert.equal(loadAssessment(fresh).phase,'report');
 assert.equal(fresh.getItem('arcana-font'),'large');
 assert.equal(fresh.getItem('arcana-firstlook-notes'),'Notas originais');
 const report=readStudySummary(fresh);
 assert.equal(report.assessmentComplete,true);
 assert.equal(report.assessmentIndependent,4);
 assert.equal(report.assessmentToReview,0);
 const old=validateBackup({format:'arcana-local-backup',version:1,data:{'arcana-font':'normal'}});
 assert.equal(Object.hasOwn(old,ASSESSMENT_KEY),false,'backups antigos continuam válidos');
});
test('a interface oferece avaliação acessível em Aprender, Práticas e Meu estudo',()=>{
 const app=read('src/app/main.js'),sw=read('sw.js'),index=read('index.html');
 const html=assessmentPage();
 assert.ok(html.includes('assessment-root'));
 assert.ok(html.includes('sem login'));
 assert.ok(learnPage().includes('#/avaliacao'));
 assert.ok(practicesHub().includes('#/avaliacao'));
 const saved=globalThis.localStorage;
 try{
  globalThis.localStorage=storage();
  assert.ok(studyPage().includes('#/avaliacao'));
 }finally{globalThis.localStorage=saved;}
 for(const token of ["path==='/avaliacao'","renderAssessment()","handleAssessmentClick","handleAssessmentInput","handleAssessmentChange"])assert.ok(app.includes(token),token);
 for(const file of ['assessmentData.js','assessmentLogic.js','assessmentUI.js','assessment.css'])assert.ok(sw.includes(file),file);
 assert.match(sw,/arcana-app-shell-v11/);
 assert.match(index,/styles\/assessment.css/);
});
