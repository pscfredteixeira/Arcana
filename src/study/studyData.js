import {ASSESSMENT_KEY,loadAssessment,normalizeAssessment,resultsAssessment} from '../assessment/assessmentLogic.js';
/**
 * ARCANA · Sprint 6 — leitura dos dados locais e cópias de segurança.
 * Não existe servidor, conta de aluno ou sincronização entre dispositivos.
 */
import {normalizedDiamond} from '../games/diamondLogic.js';
import {normalizeReading,normalizeArchive} from '../spreads/spreadLogic.js';
import {cards} from '../data/cards.js';
import {PRACTICE_KEY,readPractices,normalizePractices} from '../lessons/lessonPractice.js';
import {ATELIER_KEY,PATHS_KEY} from '../games/explorationsData.js';
import {normalizeAtelier,normalizeJourney} from '../games/explorationsLogic.js';

export const BACKUP_FORMAT='arcana-local-backup';
export const BACKUP_VERSION=1;
export const UI_PREFS_KEY='arcana-ui-preferences-v1';
export const LESSON_KEY='arcana-lesson-completed-v1';
export const LESSON_IDS=Object.freeze(['F-02.01','F-03.01','F-04.01','I-01.01']);
export const ALLOWED_KEYS=Object.freeze([
  'arcana-font',
  UI_PREFS_KEY,
  LESSON_KEY,
  'arcana-firstlook-step',
  'arcana-firstlook-notes',
  'arcana-diamond-v1',
  'arcana-spread-session-v1',
  'arcana-spread-archive-v1',
  PRACTICE_KEY,
  ATELIER_KEY,
  PATHS_KEY,
  ASSESSMENT_KEY
]);
const KEY_LIMITS={
 'arcana-font':20,
 [UI_PREFS_KEY]:800,
 [LESSON_KEY]:500,
 'arcana-firstlook-step':10,
 'arcana-firstlook-notes':3000,
 'arcana-diamond-v1':12000,
 'arcana-spread-session-v1':30000,
 'arcana-spread-archive-v1':240000,
 [PRACTICE_KEY]:2000,
 [ATELIER_KEY]:4000,
 [PATHS_KEY]:2000,
 [ASSESSMENT_KEY]:9500
};
const slugs=cards.map(c=>c.slug);
const plainObject=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const safeParse=s=>{try{return JSON.parse(s);}catch{return null;}};

export function parseUIPreferences(value){
 return {
  contrast:value?.contrast==='high'?'high':'standard',
  motion:value?.motion==='reduce'?'reduce':'system'
 };
}
export function getUIPreferences(storage){
 const raw=safeGet(storage,UI_PREFS_KEY);
 return parseUIPreferences(safeParse(raw));
}
export function safeGet(storage,key){
 try{return storage.getItem(key);}catch{return null;}
}
export function safePut(storage,key,value){
 try{storage.setItem(key,value);return true;}catch{return false;}
}
function completionMap(storage){
 const parsed=safeParse(safeGet(storage,LESSON_KEY));
 const result={};
 for(const id of LESSON_IDS)result[id]=plainObject(parsed)&&parsed[id]===true;
 return result;
}
export function completedLesson(storage,id='F-03.01'){
 return LESSON_IDS.includes(id)&&completionMap(storage)[id]===true;
}
export function setCompletedLesson(storage,value,id='F-03.01'){
 if(!LESSON_IDS.includes(id))return false;
 const all=completionMap(storage);
 all[id]=value===true;
 return safePut(storage,LESSON_KEY,JSON.stringify(all));
}
export function readStudySummary(storage){
 const diamond=safeParse(safeGet(storage,'arcana-diamond-v1'));
 const archive=safeParse(safeGet(storage,'arcana-spread-archive-v1'));
 const validArchive=normalizeArchive(archive,slugs);
 const rawStep=Number(safeGet(storage,'arcana-firstlook-step'));
 const exerciseStep=Number.isInteger(rawStep)?Math.max(0,Math.min(3,rawStep)):0;
 const completed=completedLesson(storage);
 const allCompletions=completionMap(storage);
 const practices=readPractices(storage);
 const atelier=normalizeAtelier(safeParse(safeGet(storage,ATELIER_KEY)));
 const journey=normalizeJourney(safeParse(safeGet(storage,PATHS_KEY)));
 const assessment=loadAssessment(storage);
 const resultAssessment=resultsAssessment(assessment);
 return {
  assessmentComplete:resultAssessment.complete,
  assessmentStarted:assessment.phase!=='welcome',
  assessmentIndependent:resultAssessment.counts.sozinho,
  assessmentWithSupport:resultAssessment.counts.apoio,
  assessmentToReview:resultAssessment.counts.revisar,
  lessonCompleted:completed,
  lessonCompletions:allCompletions,
  lessonsCompletedCount:Object.values(allCompletions).filter(Boolean).length,
  lessonsAvailableCount:LESSON_IDS.length,
  newPracticeSteps:Object.values(practices).reduce((n,s)=>n+(s?.step||0),0),
  newPracticeDone:Object.values(practices).filter(s=>s?.completed===true).length,
  atelierDiscovered:atelier.completed.length,
  atelierCompleted:atelier.completed.length===3,
  pathsStation:journey.step,
  pathsCompleted:journey.completed,
  lessonActivityStep:exerciseStep,
  diamondCompleted:diamond?.completed===true&&diamond?.step==='complete',
  diamondStarted:!!diamond&&diamond?.step!==undefined,
  readingsSaved:validArchive.length,
  hasDraft:!!safeGet(storage,'arcana-firstlook-notes'),
  hasSpreadDraft:(()=>{const raw=safeParse(safeGet(storage,'arcana-spread-session-v1'));return raw?.phase==='table'||raw?.phase==='review';})()
 };
}

export function validateAndNormalizeKey(key,raw){
 if(!ALLOWED_KEYS.includes(key))throw Error('Chave de dados desconhecida.');
 if(typeof raw!=='string'||raw.length>KEY_LIMITS[key])throw Error('O arquivo contém um campo muito grande ou inválido.');
 if(key==='arcana-font'){
  if(!['small','normal','large','larger'].includes(raw))throw Error('Preferência de fonte inválida.');
  return raw;
 }
 if(key===UI_PREFS_KEY){
  const v=safeParse(raw);
  if(!plainObject(v)||!['standard','high'].includes(v.contrast)||!['system','reduce'].includes(v.motion))throw Error('Preferências visuais inválidas.');
  return JSON.stringify(parseUIPreferences(v));
 }
 if(key===LESSON_KEY){
  const v=safeParse(raw);
  if(!plainObject(v)||typeof v['F-03.01']!=='boolean'||Object.keys(v).some(k=>!LESSON_IDS.includes(k)||typeof v[k]!=='boolean'))throw Error('Conclusão de aula inválida.');
  return JSON.stringify(Object.fromEntries(LESSON_IDS.map(id=>[id,v[id]===true])));
 }
 if(key===PRACTICE_KEY){
  const v=safeParse(raw);
  if(!plainObject(v)||Object.keys(v).some(k=>!LESSON_IDS.includes(k)||k==='F-03.01'))throw Error('Progresso dos exercícios inválido.');
  const normalized=normalizePractices(v);
  if(Object.keys(normalized).length!==Object.keys(v).length)throw Error('Etapas dos exercícios inválidas.');
  return JSON.stringify(normalized);
 }
 if(key===ATELIER_KEY){
  const v=safeParse(raw);
  if(!plainObject(v)||!['choose','inspect','connect','answer','finished'].includes(v.phase))throw Error('Ateliê inválido.');
  return JSON.stringify(normalizeAtelier(v));
 }
 if(key===ASSESSMENT_KEY){
  const v=safeParse(raw);
  if(!plainObject(v)||!['welcome','questions','writing','report'].includes(v.phase))throw Error('Avaliação de aprendizagem inválida.');
  return JSON.stringify(normalizeAssessment(v));
 }
 if(key===PATHS_KEY){
  const v=safeParse(raw);
  if(!plainObject(v)||!['station','synthesis','complete'].includes(v.phase))throw Error('Caminhos inválidos.');
  return JSON.stringify(normalizeJourney(v));
 }
 if(key==='arcana-firstlook-step'){
  const n=Number(raw);
  if(!Number.isInteger(n)||n<0||n>3)throw Error('Etapa da aula inválida.');
  return String(n);
 }
 if(key==='arcana-firstlook-notes')return raw;
 if(key==='arcana-diamond-v1'){
  const v=safeParse(raw);
  if(!plainObject(v)||!['compose','axes','scenario','complete'].includes(v.step))throw Error('Jogo Diamante inválido.');
  const normalized=normalizedDiamond(v);
  if(v.step==='complete'&&normalized.completed!==true)throw Error('Conclusão do Diamante inválida.');
  return JSON.stringify(normalized);
 }
 if(key==='arcana-spread-session-v1'){
  const v=safeParse(raw);
  if(!plainObject(v)||!['tres','cinco'].includes(v.spreadId))throw Error('Mesa de Tiragens inválida.');
  const norm=normalizeReading(v,slugs);
  if(['table','review'].includes(v.phase)&&norm.phase==='setup')throw Error('Cartas da mesa não conferem.');
  return JSON.stringify(norm);
 }
 if(key==='arcana-spread-archive-v1'){
  const v=safeParse(raw);
  if(!Array.isArray(v)||v.length>15)throw Error('Diário de tiragens inválido.');
  const norm=normalizeArchive(v,slugs);
  if(norm.length!==v.length)throw Error('Registros do diário não conferem.');
  return JSON.stringify(norm);
 }
 throw Error('Dado não reconhecido.');
}

export function buildBackup(storage,now=new Date().toISOString()){
 const data={};
 for(const key of ALLOWED_KEYS){
  const raw=safeGet(storage,key);
  if(raw!==null){
   // Never export corrupted data.
   data[key]=validateAndNormalizeKey(key,raw);
  }
 }
 return {format:BACKUP_FORMAT,version:BACKUP_VERSION,exportedAt:now,data};
}
export function validateBackup(payload){
 if(!plainObject(payload)||payload.format!==BACKUP_FORMAT||payload.version!==BACKUP_VERSION||!plainObject(payload.data))throw Error('Este não é um backup ARCANA compatível.');
 const keys=Object.keys(payload.data);
 if(keys.length===0)throw Error('O backup não contém nenhum registro.');
 if(keys.some(k=>!ALLOWED_KEYS.includes(k)))throw Error('O backup contém dados desconhecidos.');
 const normalized={};
 for(const key of keys)normalized[key]=validateAndNormalizeKey(key,payload.data[key]);
 return normalized;
}
export function restoreBackup(storage,validated){
 if(!plainObject(validated)||Object.keys(validated).some(k=>!ALLOWED_KEYS.includes(k)))throw Error('Backup não validado.');
 const before={};
 for(const k of ALLOWED_KEYS)before[k]=safeGet(storage,k);
 try{
  for(const k of ALLOWED_KEYS)storage.removeItem(k);
  for(const [key,val] of Object.entries(validated)){
   if(!safePut(storage,key,val))throw Error('Não foi possível escrever no armazenamento do navegador.');
  }
 }catch(err){
  try{for(const k of ALLOWED_KEYS){storage.removeItem(k);if(before[k]!==null)storage.setItem(k,before[k]);}}catch{}
  throw err;
 }
 return true;
}
