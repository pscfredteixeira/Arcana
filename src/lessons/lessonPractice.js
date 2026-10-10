import {extendedLessons} from './sprint7Lessons.js';

export const PRACTICE_KEY='arcana-sprint7-activities-v1';
const safeObject=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
export function blankPractice(){return {step:0,completed:false};}
export function normalizePractices(raw){
 const result={};
 if(!safeObject(raw))return result;
 for(const lesson of extendedLessons){
  const value=raw[lesson.id];
  if(!safeObject(value))continue;
  const step=Number.isInteger(value.step)?Math.max(0,Math.min(lesson.activity.length,value.step)):0;
  result[lesson.id]={step,completed:step===lesson.activity.length&&value.completed===true};
 }
 return result;
}
export function readPractices(storage){
 try{return normalizePractices(JSON.parse(storage.getItem(PRACTICE_KEY)||'{}'));}catch{return {};}
}
export function savePractices(storage,value){
 const normalized=normalizePractices(value);
 try{storage.setItem(PRACTICE_KEY,JSON.stringify(normalized));return true;}catch{return false;}
}
export function progressOf(storage,id){
 const found=readPractices(storage)[id];
 return found||blankPractice();
}
export function getExpectedChoice(activity){
 if(activity?.kind!=='choice')return -1;
 return activity.options.findIndex(x=>x.right===true);
}
