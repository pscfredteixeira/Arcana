import {trioLessons,trioById,trioIds,trioCriteria} from './trioData.js';

export const TRIO_KEY='arcana-three-cards-v1';
export const TRIO_MAX_DRAFT=1400;
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const validPair=(task,pair)=>Array.isArray(pair)&&pair.length===2&&pair.every(n=>Number.isInteger(n)&&n>=0&&n<task.choices.length)&&pair[0]!==pair[1];
const sortedPair=a=>[...a].sort((x,y)=>x-y);
export const correctPair=task=>task.choices.flatMap((c,i)=>c.valid?[i]:[]);
export const isCorrectPair=(task,pair)=>validPair(task,pair)&&sortedPair(pair).every((v,i)=>v===correctPair(task)[i]);
export const initialTrio=()=>({lessons:{}});
const emptyLesson=()=>({selected:[],submissions:[],hintUsed:false,draft:'',exampleShown:false,checks:[],finished:false,view:'choices'});
export function normalizeTrio(raw){
 const s=initialTrio();
 if(!object(raw)||!object(raw.lessons))return s;
 for(const id of trioIds){
  const task=trioById(id),v=raw.lessons[id];
  if(!object(v))continue;
  const out=emptyLesson();
  if(Array.isArray(v.selected)){
   const values=[];
   for(const n of v.selected)if(Number.isInteger(n)&&n>=0&&n<task.choices.length&&!values.includes(n)&&values.length<2)values.push(n);
   out.selected=sortedPair(values);
  }
  if(Array.isArray(v.submissions)){
   for(const pair of v.submissions){
    if(out.submissions.length>=6)break;
    if(validPair(task,pair)){
     out.submissions.push(sortedPair(pair));
     if(isCorrectPair(task,pair))break;
    }
   }
  }
  out.hintUsed=v.hintUsed===true;
  out.draft=typeof v.draft==='string'?v.draft.slice(0,TRIO_MAX_DRAFT):'';
  const solved=out.submissions.some(pair=>isCorrectPair(task,pair));
  if(solved){
   out.selected=correctPair(task);
   out.view=['choices','writing','report'].includes(v.view)?v.view:'writing';
   out.exampleShown=v.exampleShown===true&&out.draft.trim().length>=80;
   if(out.exampleShown&&Array.isArray(v.checks))out.checks=trioCriteria.map((_,i)=>i).filter(i=>v.checks.includes(i));
   out.finished=out.exampleShown&&v.finished===true;
   if(out.finished)out.view='report';
   else if(out.view==='report')out.view='writing';
  }
  s.lessons[id]=out;
 }
 return s;
}
export const readLesson=(raw,id)=>normalizeTrio(raw).lessons[id]||emptyLesson();
export function isSolved(raw,id){
 const lesson=readLesson(raw,id),task=trioById(id);
 return Boolean(task&&lesson.submissions.some(p=>isCorrectPair(task,p)));
}
function replaceLesson(raw,id,update){
 const s=normalizeTrio(raw);
 if(!trioById(id))return s;
 return {...s,lessons:{...s.lessons,[id]:update}};
}
export function toggleTrioChoice(raw,id,index){
 const s=normalizeTrio(raw),task=trioById(id);
 if(!task||!Number.isInteger(index)||index<0||index>=task.choices.length||isSolved(s,id))return s;
 const current=readLesson(s,id);
 let chosen=current.selected.includes(index)?current.selected.filter(x=>x!==index):current.selected.length>=2?[current.selected[1],index]:[...current.selected,index];
 return replaceLesson(s,id,{...current,selected:sortedPair(chosen)});
}
export function useTrioHint(raw,id){
 const s=normalizeTrio(raw);
 if(!trioById(id)||isSolved(s,id))return s;
 const current=readLesson(s,id);
 return replaceLesson(s,id,{...current,hintUsed:true});
}
export function submitTrioChoices(raw,id){
 const s=normalizeTrio(raw),task=trioById(id);
 if(!task||isSolved(s,id))return s;
 const current=readLesson(s,id);
 if(!validPair(task,current.selected)||current.submissions.length>=6)return s;
 // Keep incorrect submissions visible for meaningful feedback and count support.
 return replaceLesson(s,id,{...current,submissions:[...current.submissions,sortedPair(current.selected)]});
}
export function openTrioWriting(raw,id){
 const s=normalizeTrio(raw);
 if(!isSolved(s,id))return s;
 const lesson=readLesson(s,id);
 return replaceLesson(s,id,{...lesson,view:'writing'});
}
export function writeTrio(raw,id,value){
 const s=normalizeTrio(raw),lesson=readLesson(s,id);
 if(!isSolved(s,id)||lesson.finished||lesson.view!=='writing')return s;
 const draft=String(value).slice(0,TRIO_MAX_DRAFT);
 return replaceLesson(s,id,{...lesson,draft,checks:[],exampleShown:lesson.exampleShown&&draft.trim().length>=80});
}
export function revealTrioExample(raw,id){
 const s=normalizeTrio(raw),lesson=readLesson(s,id);
 if(!isSolved(s,id)||lesson.view!=='writing'||lesson.draft.trim().length<80)return s;
 return replaceLesson(s,id,{...lesson,exampleShown:true});
}
export function markTrioCriterion(raw,id,index,checked){
 const s=normalizeTrio(raw),lesson=readLesson(s,id);
 if(!isSolved(s,id)||lesson.view!=='writing'||!lesson.exampleShown||!Number.isInteger(index)||index<0||index>=trioCriteria.length)return s;
 const selected=new Set(lesson.checks);
 if(checked)selected.add(index);else selected.delete(index);
 return replaceLesson(s,id,{...lesson,checks:[...selected].sort()});
}
export function finishTrio(raw,id){
 const s=normalizeTrio(raw),lesson=readLesson(s,id);
 if(!isSolved(s,id)||lesson.view!=='writing'||!lesson.exampleShown||lesson.draft.trim().length<80)return s;
 return replaceLesson(s,id,{...lesson,view:'report',finished:true});
}
export function trioProgress(raw){
 const s=normalizeTrio(raw);
 const completed=trioIds.filter(id=>s.lessons[id]?.finished===true);
 const independent=trioIds.filter(id=>{
  const l=s.lessons[id];return l?.finished&&l.submissions.length===1&&!l.hintUsed;
 });
 return {
  completed:completed.length,total:trioLessons.length,
  independent:independent.length,withSupport:completed.length-independent.length,
  started:trioIds.filter(id=>{const l=s.lessons[id];return l&&(l.selected.length||l.submissions.length||l.draft.length||l.hintUsed)}).length,
  next:trioIds.find(id=>!completed.includes(id))||null,
  finished:completed.length===trioLessons.length
 };
}
export function loadTrio(storage){
 try{return normalizeTrio(JSON.parse(storage.getItem(TRIO_KEY)));}catch{return initialTrio();}
}
export function storeTrio(storage,raw){
 try{storage.setItem(TRIO_KEY,JSON.stringify(normalizeTrio(raw)));return true;}catch{return false;}
}
