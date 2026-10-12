import test from 'node:test';
import assert from 'node:assert/strict';
import {assessmentItems} from '../src/assessment/assessmentData.js';
import {assessmentPage,assessmentSnapshot,renderAssessment,handleAssessmentClick,handleAssessmentInput,handleAssessmentChange} from '../src/assessment/assessmentUI.js';
import {ASSESSMENT_KEY,loadAssessment} from '../src/assessment/assessmentLogic.js';

test('fluxo completo na tela: iniciar, responder, interpretar, autoavaliar e retomar',()=>{
 const oldDocument=globalThis.document,oldStorage=globalThis.localStorage;
 const saved=new Map();
 const localStorage={
  getItem:k=>saved.get(k)??null,
  setItem:(k,v)=>saved.set(k,String(v)),
  removeItem:k=>saved.delete(k)
 };
 const root={innerHTML:'',scrollIntoView(){},querySelector(){return {focus(){}}}};
 const count={textContent:''};
 globalThis.localStorage=localStorage;
 globalThis.document={
  getElementById:id=>id==='assessment-root'?root:id==='assessment-writing-count'?count:null,
  querySelector:()=>null
 };
 const click=(attr,data={})=>handleAssessmentClick({closest:()=>({hasAttribute:name=>name===attr,dataset:data})});
 try{
  assert.match(assessmentPage(),/Avalie o que/);
  renderAssessment();
  assert.match(root.innerHTML,/Começar avaliação/);
  assert.equal(click('data-assessment-start'),true);
  assert.equal(assessmentSnapshot().phase,'questions');
  for(const [idx,q] of assessmentItems.entries()){
   assert.ok(root.innerHTML.includes(q.prompt),q.id);
   const correct=q.options.find(x=>x.correct);
   assert.equal(click('data-assessment-choice',{assessmentChoice:correct.id}),true);
   assert.match(root.innerHTML,/Você acertou/);
   assert.equal(click('data-assessment-next'),true);
  }
  assert.equal(assessmentSnapshot().phase,'writing');
  assert.ok(root.innerHTML.includes('assessment-writing'));
  assert.equal(handleAssessmentInput({id:'assessment-writing',value:'Vejo um barco transportando pessoas. As espadas seguem junto, o que me faz pensar nas lembranças de uma mudança.'}),true);
  assert.ok(assessmentSnapshot().writing.length>45);
  assert.equal(click('data-assessment-model'),true);
  assert.match(root.innerHTML,/Exemplo de uma interpretação possível/);
  for(let i=0;i<3;i++)assert.equal(handleAssessmentChange({hasAttribute:x=>x==='data-assessment-check',dataset:{assessmentCheck:String(i)},checked:true}),true);
  assert.equal(click('data-assessment-finish'),true);
  assert.equal(assessmentSnapshot().phase,'report');
  assert.match(root.innerHTML,/4 \/ 4/);
  assert.match(root.innerHTML,/não corrigiu automaticamente/);
  assert.ok(saved.has(ASSESSMENT_KEY));
  assert.equal(loadAssessment(localStorage).phase,'report');
  // Opening the same route again should restore the result from the saved state.
  renderAssessment();
  assert.match(root.innerHTML,/Seu texto sobre/);
  assert.equal(click('data-assessment-reset'),true);
  assert.match(root.innerHTML,/Refazer a avaliação vai substituir/);
  assert.equal(click('data-assessment-cancel'),true);
  assert.equal(assessmentSnapshot().phase,'report');
  assert.equal(click('data-assessment-reset'),true);
  assert.equal(click('data-assessment-confirm'),true);
  assert.equal(assessmentSnapshot().phase,'welcome');
 }finally{
  globalThis.document=oldDocument;
  globalThis.localStorage=oldStorage;
 }
});
