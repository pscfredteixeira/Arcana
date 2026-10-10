import {ateliers,sixPaths} from './explorationsData.js';
export const ATELIER_IDS=ateliers.map(x=>x.slug);
export const JOURNEY_IDS=sixPaths.map(x=>x.id);
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);
export const initialAtelier=()=>({selected:null,phase:'choose',seen:[],choice:null,completed:[],notes:''});
export function normalizeAtelier(value){
 const initial=initialAtelier();if(!obj(value))return initial;
 const selected=ATELIER_IDS.includes(value.selected)?value.selected:null;
 const completed=Array.isArray(value.completed)?ATELIER_IDS.filter(id=>value.completed.includes(id)):[];
 const card=ateliers.find(c=>c.slug===selected);
 const seen=card&&Array.isArray(value.seen)?card.points.map(p=>p.id).filter(id=>value.seen.includes(id)):[];
 let phase=['choose','inspect','connect','answer','finished'].includes(value.phase)?value.phase:'choose';
 if(phase!=='choose'&&!selected)phase='choose';
 if(phase==='connect'&&seen.length!==3)phase='inspect';
 if(phase==='answer'&&seen.length!==3)phase='inspect';
 if(phase==='finished'&&completed.length!==3)phase='choose';
 return {...initial,selected,phase,seen,completed,notes:typeof value.notes==='string'?value.notes.slice(0,900):''};
}
export function atelierVisit(state,id){
 const c=ateliers.find(x=>x.slug===state.selected);
 if(!c||!c.points.some(p=>p.id===id))return state;
 return {...state,seen:[...new Set([...state.seen,id])]};
}
export function atelierChoose(state,slug){
 if(!ATELIER_IDS.includes(slug))return state;
 return {...state,selected:slug,seen:[],choice:null,phase:'inspect'};
}
export function atelierComplete(state){
 if(!ATELIER_IDS.includes(state.selected))return state;
 return {...state,completed:ATELIER_IDS.filter(x=>x===state.selected||state.completed.includes(x)),phase:'choose'};
}
export const initialJourney=()=>({step:0,phase:'station',completed:false,notes:''});
export function normalizeJourney(value){
 const r=initialJourney();if(!obj(value))return r;
 const step=Number.isInteger(value.step)?Math.max(0,Math.min(6,value.step)):0;
 let phase=['station','synthesis','complete'].includes(value.phase)?value.phase:'station';
 if(step<6)phase='station';
 if(step===6&&phase==='station')phase='synthesis';
 const completed=step===6&&phase==='complete'&&value.completed===true;
 if(phase==='complete'&&!completed)phase='synthesis';
 return {...r,step,phase,completed,notes:typeof value.notes==='string'?value.notes.slice(0,900):''};
}
export function advanceJourney(state,correct){
 if(!correct||state.phase!=='station'||state.step>=6)return state;
 const step=state.step+1;
 return {...state,step,phase:step===6?'synthesis':'station'};
}
export function finishJourney(state,correct){
 if(!correct||state.step!==6||state.phase!=='synthesis')return state;
 return {...state,phase:'complete',completed:true};
}
