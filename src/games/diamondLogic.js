import {diamondContent} from '../data/diamondContent.js';

export const positions=['top','left','right','bottom'];
export const cardSlugs=Object.freeze(['o-louco','o-mago','a-sacerdotisa','o-mundo']);

export function emptyDiamond(){
 return {step:'compose',board:{top:null,left:null,right:null,bottom:null},selected:null,checked:false,axisIndex:0,axisChoice:null,scenarioChoice:null,reflection:'',completed:false};
}
export function normalizedDiamond(raw){
 const fresh=emptyDiamond();
 if(!raw||typeof raw!=='object')return fresh;
 const board={...fresh.board};const used=new Set();
 for(const pos of positions){
  const val=raw.board?.[pos];
  if(cardSlugs.includes(val)&&!used.has(val)){board[pos]=val;used.add(val);}
 }
 const step=['compose','axes','scenario','complete'].includes(raw.step)?raw.step:'compose';
 return {
  ...fresh,step,board,checked:!!raw.checked&&step==='compose',
  axisIndex:raw.axisIndex===1?1:0,axisChoice:null,scenarioChoice:null,
  reflection:typeof raw.reflection==='string'?raw.reflection.slice(0,2000):'',
  completed:!!raw.completed||step==='complete'
 };
}
export function placeCard(board,position,slug){
 if(!positions.includes(position)||!cardSlugs.includes(slug))return {...board};
 const next={...board};
 for(const pos of positions){if(next[pos]===slug)next[pos]=null;}
 next[position]=slug;return next;
}
export function clearSlot(board,position){
 if(!positions.includes(position))return {...board};
 return {...board,[position]:null};
}
export function allPlaced(board){return positions.every(pos=>cardSlugs.includes(board[pos]))}
export function gradeBoard(board){
 return {correct:positions.every(pos=>board[pos]===diamondContent.placements[pos].card),
  errors:positions.filter(pos=>board[pos]!==diamondContent.placements[pos].card),
  matched:positions.filter(pos=>board[pos]===diamondContent.placements[pos].card)};
}
export function evaluateOption(options,id){
 const selected=options.find(o=>o.id===id);
 return selected?{correct:selected.correct,explanation:selected.explanation}:null;
}
