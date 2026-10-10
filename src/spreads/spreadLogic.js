import {spreads,spreadIds} from '../data/spreadDefinitions.js';

export const STORAGE_VERSION=1;
export const MAX_ARCHIVE=15;
export function freshReading(spreadId='tres'){
 const id=spreadIds.includes(spreadId)?spreadId:'tres';
 return {version:STORAGE_VERSION,spreadId:id,deck:'all',question:'',phase:'setup',drawn:[],revealed:[],selected:0,notes:{},synthesis:'',savedId:null};
}
export function normalizeReading(raw,slugs){
 const all=new Set(slugs);
 const init=freshReading(raw?.spreadId);
 if(!raw||typeof raw!=='object')return init;
 init.deck=raw.deck==='major'?'major':'all';
 init.question=typeof raw.question==='string'?raw.question.slice(0,500):'';
 init.synthesis=typeof raw.synthesis==='string'?raw.synthesis.slice(0,3000):'';
 const def=spreads[init.spreadId];
 if(!['setup','table','review'].includes(raw.phase))return init;
 if(raw.phase==='setup')return init;
 if(!Array.isArray(raw.drawn)||raw.drawn.length!==def.count||new Set(raw.drawn).size!==def.count||!raw.drawn.every(s=>all.has(s)))return init;
 init.drawn=raw.drawn.slice();
 init.revealed=def.positions.map((_,i)=>raw.revealed?.[i]===true);
 init.selected=Number.isInteger(raw.selected)&&raw.selected>=0&&raw.selected<def.count?raw.selected:0;
 init.notes={};
 for(const pos of def.positions){const val=raw.notes?.[pos.id];init.notes[pos.id]=typeof val==='string'?val.slice(0,1500):'';}
 init.phase=raw.phase==='review'&&init.revealed.every(Boolean)?'review':'table';
 init.savedId=typeof raw.savedId==='string'?raw.savedId.slice(0,80):null;
 return init;
}
export function drawWithoutReplacement(pool,n,rng=Math.random){
 if(!Array.isArray(pool)||n>pool.length||n<1)throw Error('O baralho não tem cartas suficientes.');
 const shuffled=pool.slice();
 for(let i=shuffled.length-1;i>0;i--){
  let value=Number(rng()); if(!Number.isFinite(value))value=0;
  const j=Math.min(i,Math.max(0,Math.floor(value*(i+1))));
  [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
 }
 return shuffled.slice(0,n);
}
export function drawReading(prev,allCards,rng=Math.random){
 const def=spreads[prev.spreadId]||spreads.tres;
 const pool=allCards.filter(c=>prev.deck!=='major'||c.arcana==='major').map(c=>c.slug);
 const picks=drawWithoutReplacement(pool,def.count,rng);
 return {...freshReading(def.id),question:prev.question,deck:prev.deck,phase:'table',drawn:picks,revealed:def.positions.map(()=>false),selected:0,notes:Object.fromEntries(def.positions.map(p=>[p.id,'']))};
}
export function revealAt(reading,index){
 if(reading.phase!=='table'||index<0||index>=reading.drawn.length)return reading;
 const revealed=reading.revealed.slice();revealed[index]=true;
 return {...reading,revealed,selected:index,savedId:null};
}
export function allRevealed(reading){return reading.drawn.length>0&&reading.revealed.length===reading.drawn.length&&reading.revealed.every(Boolean);}
export function enterReview(reading){return reading.phase==='table'&&allRevealed(reading)?{...reading,phase:'review'}:reading;}
export function reviseNotes(reading,id,value){
 const def=spreads[reading.spreadId];
 if(!def?.positions.some(p=>p.id===id))return reading;
 return {...reading,notes:{...reading.notes,[id]:String(value).slice(0,1500)},savedId:null};
}
export function archiveReading(reading,history,id,now){
 if(reading.phase!=='review'||!allRevealed(reading))throw Error('Revele todas as cartas antes de guardar a leitura.');
 const entry={id,createdAt:now,reading:{...reading,savedId:id}};
 const items=history.filter(x=>x?.id!==reading.savedId&&x?.id!==id);
 return [entry,...items].slice(0,MAX_ARCHIVE);
}
export function normalizeArchive(raw,slugs){
 if(!Array.isArray(raw))return [];
 const used=new Set();
 const valid=[];
 for(const item of raw.slice(0,100)){
  if(!item||typeof item.id!=='string'||used.has(item.id)||item.id.length>80)continue;
  const reading=normalizeReading(item.reading,slugs);
  if(reading.phase!=='review')continue;
  used.add(item.id);
  valid.push({id:item.id,createdAt:typeof item.createdAt==='string'?item.createdAt.slice(0,40):'',reading:{...reading,savedId:item.id}});
  if(valid.length>=MAX_ARCHIVE)break;
 }
 return valid;
}
