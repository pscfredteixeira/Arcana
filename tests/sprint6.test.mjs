import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
 ALLOWED_KEYS,BACKUP_FORMAT,BACKUP_VERSION,UI_PREFS_KEY,LESSON_KEY,
 parseUIPreferences,completedLesson,setCompletedLesson,readStudySummary,
 buildBackup,validateBackup,restoreBackup,validateAndNormalizeKey
} from '../src/study/studyData.js';
import {studyPage,markLessonControl,handleStudyClick} from '../src/study/studyUI.js';
import {cards} from '../src/data/cards.js';
import {drawReading,enterReview,archiveReading} from '../src/spreads/spreadLogic.js';
import {freshReading} from '../src/spreads/spreadLogic.js';

function fakeStorage(original={}){
 const values=new Map(Object.entries(original));
 return {
  getItem:key=>values.has(key)?values.get(key):null,
  setItem:(key,v)=>values.set(key,String(v)),
  removeItem:key=>values.delete(key),
  dump:()=>Object.fromEntries(values)
 };
}
test('marca conclusão de aula por ação explícita e calcula progresso sem estimar a formação inteira',()=>{
 const local=fakeStorage();
 assert.equal(completedLesson(local),false);
 assert.equal(setCompletedLesson(local,true),true);
 assert.equal(completedLesson(local),true);
 local.setItem('arcana-firstlook-step','2');
 local.setItem('arcana-diamond-v1',JSON.stringify({step:'complete',completed:true,board:{top:'o-louco',left:'o-mago',right:'a-sacerdotisa',bottom:'o-mundo'}}));
 const summary=readStudySummary(local);
 assert.equal(summary.lessonCompleted,true);
 assert.equal(summary.lessonActivityStep,2);
 assert.equal(summary.diamondCompleted,true);
 assert.equal(summary.readingsSaved,0);
});

test('preferências visuais têm valores estritos e preservam ajustes iniciais',()=>{
 assert.deepEqual(parseUIPreferences({contrast:'high',motion:'reduce'}),{contrast:'high',motion:'reduce'});
 assert.deepEqual(parseUIPreferences({contrast:'corrupted',motion:'unknown'}),{contrast:'standard',motion:'system'});
 assert.throws(()=>validateAndNormalizeKey('arcana-font','tamanho-inexistente'),/fonte/i);
 assert.equal(validateAndNormalizeKey('arcana-font','larger'),'larger');
 assert.throws(()=>validateAndNormalizeKey(UI_PREFS_KEY,JSON.stringify({contrast:'unknown',motion:'reduce'})),/Preferências/);
});

test('backup preserva os oito tipos de dados permitidos e ignora chaves externas',()=>{
 const local=fakeStorage({
  'arcana-font':'large',
  [UI_PREFS_KEY]:JSON.stringify({contrast:'high',motion:'reduce'}),
  [LESSON_KEY]:JSON.stringify({'F-03.01':true}),
  'arcana-firstlook-step':'3',
  'arcana-firstlook-notes':'Observação de imagem',
  'arcana-diamond-v1':JSON.stringify({step:'complete',completed:true,board:{top:'o-louco',left:'o-mago',right:'a-sacerdotisa',bottom:'o-mundo'},reflection:'Pergunta aberta'}),
  'arcana-spread-session-v1':JSON.stringify(freshReading('tres')),
  'outra-aplicacao':'Não incluir'
 });
 const spread=enterReview({...drawReading(freshReading('tres'),cards,()=>0.25),revealed:[true,true,true]});
 const record=archiveReading(spread,[],'teste-1','2026-10-10T13:00:00.000Z');
 local.setItem('arcana-spread-archive-v1',JSON.stringify(record));
 const backup=buildBackup(local,'2026-10-10T13:00:00.000Z');
 assert.equal(backup.format,BACKUP_FORMAT);
 assert.equal(backup.version,BACKUP_VERSION);
 assert.equal(Object.keys(backup.data).length,8);
 assert.ok(Object.keys(backup.data).every(k=>ALLOWED_KEYS.includes(k)));
 assert.equal(Object.hasOwn(backup.data,'outra-aplicacao'),false);
 const normalized=validateBackup(JSON.parse(JSON.stringify(backup)));
 const restored=fakeStorage({'outra-aplicacao':'Não alterar','arcana-font':'small','arcana-firstlook-notes':'Antigo'});
 assert.equal(restoreBackup(restored,normalized),true);
 assert.equal(restored.getItem('outra-aplicacao'),'Não alterar');
 assert.equal(restored.getItem('arcana-font'),'large');
 assert.equal(restored.getItem('arcana-firstlook-notes'),'Observação de imagem');
 assert.equal(completedLesson(restored),true);
 assert.equal(readStudySummary(restored).readingsSaved,1);
});

test('rejeita backups externos ou inválidos antes de substituir os dados',()=>{
 const valid={format:BACKUP_FORMAT,version:BACKUP_VERSION,data:{'arcana-font':'normal'}};
 assert.deepEqual(validateBackup(valid),{'arcana-font':'normal'});
 assert.throws(()=>validateBackup({...valid,version:999}),/compatível/);
 assert.throws(()=>validateBackup({...valid,data:{'evil-key':'not ours'}}),/desconhecidos/);
 assert.throws(()=>validateBackup({...valid,data:{'arcana-font':'huge'}}),/fonte/);
 assert.throws(()=>validateBackup({...valid,data:{'arcana-firstlook-notes':'a'.repeat(3001)}}),/grande/);
 assert.throws(()=>validateBackup({...valid,data:{'arcana-spread-archive-v1':'[{"id":"a"}]'}}),/conferem/);
});

test('restauração não deixa dados pela metade quando o armazenamento falha',()=>{
 const value=new Map([['arcana-font','small'],['arcana-firstlook-notes','manter'],['unrelated','preserved']]);
 let fails=true;
 const storage={
  getItem:key=>value.has(key)?value.get(key):null,
  removeItem:key=>value.delete(key),
  setItem(key,v){if(key==='arcana-firstlook-notes'&&fails){fails=false;throw Error('quota');}value.set(key,String(v));}
 };
 assert.throws(()=>restoreBackup(storage,{'arcana-font':'large','arcana-firstlook-notes':'novo'}),/armazenamento/);
 assert.equal(storage.getItem('arcana-font'),'small');
 assert.equal(storage.getItem('arcana-firstlook-notes'),'manter');
 assert.equal(storage.getItem('unrelated'),'preserved');
});

test('tela de estudo inclui progresso, legibilidade, arquivo e confirmação',()=>{
 const local=fakeStorage({'arcana-font':'normal'});
 globalThis.localStorage=local;
 const html=studyPage();
 for(const phrase of ['Meu <em>Estudo','0 / 4','data-study-font="normal"','data-study-contrast="high"','data-study-motion="reduce"','data-study-export','study-import-file','privado']){
  if(phrase==='privado')continue;
  assert.ok(html.includes(phrase),phrase);
 }
 assert.match(markLessonControl(),/data-study-lesson-toggle/);
 assert.match(html,/backup/i);
 const clicked={closest:selector=>selector==='[data-study-lesson-toggle]'?{}:null};
 globalThis.document={querySelector:()=>null,getElementById:()=>null};
 assert.equal(handleStudyClick(clicked),true);
 assert.equal(completedLesson(local),true);
});

test('roteador e CSS do Sprint 6 estão integrados',()=>{
 const app=readFileSync(new URL('../src/app/main.js',import.meta.url),'utf8');
 const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const nav=readFileSync(new URL('../src/ui/templates.js',import.meta.url),'utf8');
 const lesson=readFileSync(new URL('../src/ui/fullLesson.js',import.meta.url),'utf8');
 const css=readFileSync(new URL('../styles/study.css',import.meta.url),'utf8');
 assert.match(app,/meu-estudo/);
 assert.match(app,/handleStudyClick/);
 assert.match(app,/handleStudyFile/);
 assert.match(app,/renderStudyControl/);
 assert.match(nav,/key:'study'/);
 assert.match(index,/styles\/study.css/);
 assert.match(lesson,/lesson-mark-control/);
 assert.match(css,/data-contrast=high/);
 assert.match(css,/data-motion=reduce/);
});
