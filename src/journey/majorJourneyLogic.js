import {journeyOrder,journeyTasks} from './majorJourneyData.js';
export const MAJOR_JOURNEY_KEY='arcana-major-journey-v1';
export const maxNoteLength=350;
export function initialMajorJourney(){
 return {current:'o-louco',stage:'observe',completed:[],attempts:{},notes:{}};
}
const safeObject=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
export function normalizeMajorJourney(raw){
 const out=initialMajorJourney();
 if(!safeObject(raw))return out;
 if(journeyOrder.includes(raw.current))out.current=raw.current;
 if(['observe','understand','practice'].includes(raw.stage))out.stage=raw.stage;
 if(Array.isArray(raw.completed))out.completed=journeyOrder.filter(s=>raw.completed.includes(s));
 for(const slug of journeyOrder){
  const indices=raw.attempts?.[slug];
  if(Array.isArray(indices)){
   const safe=[];
   for(const x of indices){
    if(!Number.isInteger(x)||x<0||x>2||safe.includes(x)||safe.length>=3)break;
    safe.push(x);
    if(x===journeyTasks[slug].answer)break;
   }
   if(safe.length)out.attempts[slug]=safe;
  }
  const note=raw.notes?.[slug];
  if(typeof note==='string'&&note.length)out.notes[slug]=note.slice(0,maxNoteLength);
 }
 // completion requires a genuine correct choice; importing arbitrary completion flags
 // cannot turn an unseen station into a finished one.
 out.completed=out.completed.filter(s=>out.attempts[s]?.includes(journeyTasks[s].answer));
 return out;
}
export function visitMajor(raw,slug){
 const s=normalizeMajorJourney(raw);
 if(!journeyOrder.includes(slug))return s;
 return {...s,current:slug,stage:'observe'};
}
export function advanceMajor(raw){
 const s=normalizeMajorJourney(raw);
 return {...s,stage:s.stage==='observe'?'understand':s.stage==='understand'?'practice':s.stage};
}
export function chooseMajor(raw,slug,index){
 const s=normalizeMajorJourney(raw);
 if(s.current!==slug||s.stage!=='practice'||!journeyOrder.includes(slug)||!Number.isInteger(index)||index<0||index>2)return s;
 const prior=s.attempts[slug]||[],task=journeyTasks[slug];
 if(prior.includes(task.answer)||prior.includes(index))return s;
 const attempts={...s.attempts,[slug]:[...prior,index]};
 const completed= index===task.answer && !s.completed.includes(slug)?[...s.completed,slug]:s.completed;
 return normalizeMajorJourney({...s,attempts,completed});
}
export function saveMajorNote(raw,slug,value){
 const s=normalizeMajorJourney(raw);
 if(!journeyOrder.includes(slug))return s;
 return {...s,notes:{...s.notes,[slug]:String(value).slice(0,maxNoteLength)}};
}
export function majorProgress(raw){
 const s=normalizeMajorJourney(raw);
 return {completed:s.completed.length,total:journeyOrder.length,next:journeyOrder.find(slug=>!s.completed.includes(slug))||null,finished:s.completed.length===journeyOrder.length,percent:Math.round(s.completed.length/journeyOrder.length*100)};
}
export function loadMajorJourney(storage){
 try{return normalizeMajorJourney(JSON.parse(storage.getItem(MAJOR_JOURNEY_KEY)));}catch{return initialMajorJourney();}
}
export function storeMajorJourney(storage,raw){
 try{storage.setItem(MAJOR_JOURNEY_KEY,JSON.stringify(normalizeMajorJourney(raw)));return true;}catch{return false;}
}
