import {dialogueChapters,dialogueTasks,dialogueTaskIds,findDialogueChapter} from './dialogueData.js';
export const DIALOGUE_KEY='arcana-dialogue-v1';
export const DIALOGUE_NOTE_LIMIT=400;
const isObject=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
export const initialDialogue=()=>({answers:{},notes:{}});
export function normalizeDialogue(raw){
 const state=initialDialogue();
 if(!isObject(raw))return state;
 for(const id of dialogueTaskIds){
  const data=raw.answers?.[id],task=dialogueTasks[id];
  if(!isObject(data))continue;
  const attempts=[];
  for(const index of Array.isArray(data.attempts)?data.attempts:[]){
   if(!Number.isInteger(index)||index<0||index>=task.options.length||attempts.includes(index)||attempts.length>=task.options.length)break;
   attempts.push(index);
   if(index===task.answer)break;
  }
  if(attempts.length || data.hintUsed===true)state.answers[id]={attempts,hintUsed:data.hintUsed===true};
 }
 for(const {id} of dialogueChapters){
  const note=raw.notes?.[id];
  if(typeof note==='string'&&note.length)state.notes[id]=note.slice(0,DIALOGUE_NOTE_LIMIT);
 }
 return state;
}
export const isDialogueSolved=(state,id)=>{
 const task=dialogueTasks[id],r=state.answers[id];
 return Boolean(task && r?.attempts?.includes(task.answer));
};
export function nextDialogueTask(state,chapterId){
 const chapter=findDialogueChapter(chapterId);
 if(!chapter)return null;
 const normalized=normalizeDialogue(state);
 return chapter.taskIds.find(id=>!isDialogueSolved(normalized,id))||null;
}
export function chooseDialogue(raw,chapterId,taskId,index){
 const state=normalizeDialogue(raw),task=dialogueTasks[taskId];
 if(!task||nextDialogueTask(state,chapterId)!==taskId||!Number.isInteger(index)||index<0||index>=task.options.length)return state;
 const previous=state.answers[taskId]||{attempts:[],hintUsed:false};
 if(previous.attempts.includes(index))return state;
 return {...state,answers:{...state.answers,[taskId]:{attempts:[...previous.attempts,index],hintUsed:previous.hintUsed}}};
}
export function hintDialogue(raw,chapterId,taskId){
 const state=normalizeDialogue(raw);
 if(nextDialogueTask(state,chapterId)!==taskId)return state;
 const previous=state.answers[taskId]||{attempts:[],hintUsed:false};
 return {...state,answers:{...state.answers,[taskId]:{...previous,hintUsed:true}}};
}
export function noteDialogue(raw,chapterId,value){
 const state=normalizeDialogue(raw);
 if(nextDialogueTask(state,chapterId)!==null||!findDialogueChapter(chapterId))return state;
 return {...state,notes:{...state.notes,[chapterId]:String(value).slice(0,DIALOGUE_NOTE_LIMIT)}};
}
export function dialogueProgress(raw){
 const state=normalizeDialogue(raw);
 const completed=dialogueTaskIds.filter(id=>isDialogueSolved(state,id));
 const independent=completed.filter(id=>state.answers[id].attempts.length===1&&!state.answers[id].hintUsed);
 const chapters=dialogueChapters.map(ch=>({
  id:ch.id,done:ch.taskIds.filter(id=>isDialogueSolved(state,id)).length,total:ch.taskIds.length,
  finished:ch.taskIds.every(id=>isDialogueSolved(state,id))
 }));
 return {done:completed.length,total:dialogueTaskIds.length,independent:independent.length,withSupport:completed.length-independent.length,chapters,finished:completed.length===dialogueTaskIds.length};
}
export function loadDialogue(storage){
 try{return normalizeDialogue(JSON.parse(storage.getItem(DIALOGUE_KEY)));}catch{return initialDialogue();}
}
export function storeDialogue(storage,raw){
 try{storage.setItem(DIALOGUE_KEY,JSON.stringify(normalizeDialogue(raw)));return true;}catch{return false;}
}
