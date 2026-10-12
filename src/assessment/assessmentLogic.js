import {assessmentItems,transferTask} from './assessmentData.js';

export const ASSESSMENT_KEY='arcana-learning-assessment-v1';
export const MAX_WRITING=1800;
const validPhases=new Set(['welcome','questions','writing','report']);
const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
export const initialAssessment=()=>({
 phase:'welcome',index:0,responses:{},writing:'',checks:[],sampleRevealed:false,finishedAt:null
});
const findQuestion=id=>assessmentItems.find(q=>q.id===id);
export function normalizeAssessment(raw){
 const s=initialAssessment();
 if(!plain(raw))return s;
 for(const q of assessmentItems){
  const r=raw.responses?.[q.id];
  if(!plain(r))continue;
  const attempts=[];
  for(const id of Array.isArray(r.attempts)?r.attempts:[]){
   if(attempts.length>=3||attempts.includes(id))break;
   if(!q.options.some(o=>o.id===id))break;
   attempts.push(id);
   if(q.options.find(o=>o.id===id)?.correct)break;
  }
  s.responses[q.id]={attempts,hintUsed:r.hintUsed===true};
 }
 const completedPrefix=assessmentItems.findIndex(q=>!isResolved(q,s.responses[q.id]));
 const maximumIndex=completedPrefix===-1?assessmentItems.length:completedPrefix;
 s.index=Number.isInteger(raw.index)?Math.max(0,Math.min(maximumIndex,raw.index)):0;
 // Recover the first incomplete stage rather than trusting a stored phase.
 if(s.index<assessmentItems.length && assessmentItems.slice(0,s.index).some(q=>!isResolved(q,s.responses[q.id])))s.index=maximumIndex;
 s.writing=typeof raw.writing==='string'?raw.writing.slice(0,MAX_WRITING):'';
 s.checks=Array.isArray(raw.checks)?transferTask.criteria.map((_,i)=>i).filter(i=>raw.checks.includes(i)):[];
 s.sampleRevealed=raw.sampleRevealed===true&&s.writing.trim().length>=45;
 s.finishedAt=typeof raw.finishedAt==='string'&&raw.finishedAt.length<=32&&Number.isFinite(Date.parse(raw.finishedAt))?raw.finishedAt:null;
 if(s.finishedAt && s.index===assessmentItems.length && s.writing.trim().length>=45 && s.sampleRevealed)s.phase='report';
 else if(s.index===assessmentItems.length && raw.phase!=='welcome')s.phase='writing';
 else if(raw.phase==='welcome')s.phase='welcome';
 else s.phase=validPhases.has(raw.phase)&&raw.phase!=='report'?'questions':'welcome';
 return s;
}
export const isResolved=(q,r)=>{
 if(!r||!Array.isArray(r.attempts)||!r.attempts.length)return false;
 return r.attempts.length>=3||r.attempts.some(id=>q.options.some(o=>o.id===id&&o.correct));
};
export function answerStatus(q,r){
 if(!isResolved(q,r))return 'pendente';
 const last=r.attempts.at(-1);
 const correct=q.options.find(o=>o.id===last)?.correct===true;
 if(!correct)return 'revisar';
 return r.attempts.length===1&&!r.hintUsed?'sozinho':'com-apoio';
}
export function startAssessment(raw){
 const s=normalizeAssessment(raw);
 return {...s,phase:s.index>=assessmentItems.length?'writing':'questions',finishedAt:null};
}
export function revealHint(raw){
 const s=normalizeAssessment(raw);
 if(s.phase!=='questions')return s;
 const q=assessmentItems[s.index],r=s.responses[q.id]||{attempts:[],hintUsed:false};
 if(isResolved(q,r))return s;
 return {...s,responses:{...s.responses,[q.id]:{...r,hintUsed:true}}};
}
export function chooseAssessment(raw,option){
 const s=normalizeAssessment(raw);
 if(s.phase!=='questions')return s;
 const q=assessmentItems[s.index];
 if(!q)return s;
 const r=s.responses[q.id]||{attempts:[],hintUsed:false};
 if(isResolved(q,r)||r.attempts.includes(option)||!q.options.some(o=>o.id===option))return s;
 return {...s,responses:{...s.responses,[q.id]:{...r,attempts:[...r.attempts,option]}}};
}
export function nextAssessment(raw){
 const s=normalizeAssessment(raw);
 if(s.phase!=='questions')return s;
 const q=assessmentItems[s.index];
 if(!q||!isResolved(q,s.responses[q.id]))return s;
 const next=s.index+1;
 return {...s,index:next,phase:next===assessmentItems.length?'writing':'questions'};
}
export function saveAssessmentWriting(raw,value){
 const s=normalizeAssessment(raw);
 if(s.phase!=='writing')return s;
 return {...s,writing:String(value).slice(0,MAX_WRITING),sampleRevealed:false,checks:[]};
}
export function showAssessmentExample(raw){
 const s=normalizeAssessment(raw);
 if(s.phase!=='writing'||s.writing.trim().length<45)return s;
 return {...s,sampleRevealed:true};
}
export function checkAssessmentCriterion(raw,id,checked){
 const s=normalizeAssessment(raw);
 if(s.phase!=='writing'||!s.sampleRevealed||!Number.isInteger(id)||id<0||id>=transferTask.criteria.length)return s;
 const selected=new Set(s.checks);
 if(checked)selected.add(id);else selected.delete(id);
 return {...s,checks:[...selected].sort()};
}
export function finishAssessment(raw,date=new Date().toISOString()){
 const s=normalizeAssessment(raw);
 if(s.phase!=='writing'||s.index!==assessmentItems.length||!s.sampleRevealed||s.writing.trim().length<45)return s;
 return {...s,phase:'report',finishedAt:date};
}
export function resultsAssessment(raw){
 const s=normalizeAssessment(raw);
 const rows=assessmentItems.map(q=>({id:q.id,competency:q.competency,status:answerStatus(q,s.responses[q.id]),review:q.review}));
 const counts={
  sozinho:rows.filter(r=>r.status==='sozinho').length,
  apoio:rows.filter(r=>r.status==='com-apoio').length,
  revisar:rows.filter(r=>r.status==='revisar').length,
  pendente:rows.filter(r=>r.status==='pendente').length
 };
 return {rows,counts,writing: {
  attempted:s.writing.trim().length>=45,
  checked:s.checks.length,
  criteriaTotal:transferTask.criteria.length,
  // The learner's free text is never graded by a keyword detector.
  manuallyReviewed:s.sampleRevealed
 },complete:s.phase==='report'};
}
export function storeAssessment(storage,state){
 try{storage.setItem(ASSESSMENT_KEY,JSON.stringify(normalizeAssessment(state)));return true;}catch{return false;}
}
export function loadAssessment(storage){
 try{return normalizeAssessment(JSON.parse(storage.getItem(ASSESSMENT_KEY)));}catch{return initialAssessment();}
}
