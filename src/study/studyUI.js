import {
 BACKUP_FORMAT,ALLOWED_KEYS,UI_PREFS_KEY,LESSON_KEY,
 getUIPreferences,parseUIPreferences,readStudySummary,safeGet,safePut,
 completedLesson,setCompletedLesson,buildBackup,validateBackup,restoreBackup
} from './studyData.js';
import {escapeHTML as esc} from '../ui/templates.js';
import {extendedLessons} from '../lessons/sprint7Lessons.js';
import {progressOf} from '../lessons/lessonPractice.js';

const FONTS=[['small','Pequena'],['normal','Padrão'],['large','Grande'],['larger','Muito grande']];
const OPTIONS=[['standard','Original'],['high','Alto contraste']];
const MOTIONS=[['system','Seguir aparelho'],['reduce','Reduzir animações']];
let pendingImport=null;
let announcement='';

function readFont(){
 const f=safeGet(localStorage,'arcana-font');
 return FONTS.some(x=>x[0]===f)?f:'normal';
}
export function applyStudyPreferences(){
 if(typeof document==='undefined')return;
 const p=getUIPreferences(localStorage);
 document.body.dataset.font=readFont();
 document.documentElement.dataset.contrast=p.contrast;
 document.documentElement.dataset.motion=p.motion;
 document.querySelectorAll?.('button[data-font]').forEach(btn=>{
  btn.setAttribute('aria-pressed',String(btn.dataset.font===readFont()));
 });
}
function progressCard(title,note,value,href,action){
 const indicator=value?'<span class="study-indicator finished">Concluído</span>':'<span class="study-indicator">Em andamento</span>';
 return '<article class="study-card"><div class="study-card-top">'+indicator+'<span aria-hidden="true">✧</span></div><h3>'+esc(title)+'</h3><p>'+esc(note)+'</p><a class="study-card-link" href="'+href+'">'+esc(action)+' →</a></article>';
}
export function studyPage(){
 const summary=readStudySummary(localStorage),prefs=getUIPreferences(localStorage),font=readFont();
 const chapterLine=summary.lessonCompleted?'Você marcou esta aula como concluída.':'Esta aula ainda não foi marcada como concluída.';
 const diamonds=summary.diamondCompleted?'O Diamante dos Arcanos foi concluído neste navegador.':summary.diamondStarted?'Você já começou o Diamante dos Arcanos.':'O Diamante dos Arcanos está disponível para começar.';
 const notes=summary.readingsSaved===1?'1 tiragem guardada':summary.readingsSaved+' tiragens guardadas';
 const newCourseCards=extendedLessons.map(l=>{
  const done=summary.lessonCompletions[l.id];const practice=progressOf(localStorage,l.id);
  const note=(done?'Aula marcada como concluída.':'Aula disponível para leitura.')+' Atividade: '+(practice.completed?'três fases concluídas.':practice.step+' de 3 fases.');
  return progressCard(l.title,note,done,'#/aula/'+l.slug,'Abrir aula');
 }).join('');
 return '<div class="container"><header class="page-intro study-page-intro"><span class="eyebrow">Seu espaço de aprendizagem</span><h1>Meu <em>Estudo.</em></h1><p class="lead">Acompanhe o que já fez, adapte a leitura ao seu conforto e guarde uma cópia dos seus registros. Tudo permanece neste navegador, sem conta.</p></header>'
 +'<section class="study-section" id="study-progress"><div class="section-head"><div><span class="eyebrow">Meu percurso</span><h2>Pequenos avanços, registrados.</h2></div><p>Estes indicadores mostram apenas as atividades disponíveis atualmente, não o percentual da formação completa.</p></div><div class="study-summary"><div class="study-summary-number"><strong>'+summary.lessonsCompletedCount+' / '+summary.lessonsAvailableCount+'</strong><span>aulas disponíveis concluídas</span></div><div class="study-summary-number"><strong>'+summary.newPracticeSteps+' / 9</strong><span>etapas das três novas oficinas</span></div><div class="study-summary-number"><strong>'+(summary.diamondCompleted?'1 / 1':'0 / 1')+'</strong><span>jogo Diamante concluído</span></div><div class="study-summary-number"><strong>'+summary.readingsSaved+'</strong><span>tiragens no diário</span></div></div><div class="study-card-grid">'
 +progressCard('A arte de olhar',chapterLine,summary.lessonCompleted,'#/aula/primeiro-olhar','Retomar a aula')
 +newCourseCards
 +progressCard('Diamante dos Arcanos',diamonds,summary.diamondCompleted,'#/praticas/diamante','Abrir o jogo')
 +progressCard('Ateliê dos Símbolos',summary.atelierDiscovered+' de 3 imagens estudadas.',summary.atelierCompleted,'#/praticas/atelie','Continuar investigando')
 +progressCard('Os Seis Caminhos',summary.pathsStation+' de 6 estações percorridas.',summary.pathsCompleted,'#/praticas/seis-caminhos','Retomar jornada')
 +'<article class="study-card"><div class="study-card-top"><span class="study-indicator">'+esc(notes)+'</span><span aria-hidden="true">◇</span></div><h3>Mesa de Tiragens</h3><p>Consulte seu diário de leituras e retome a prática. Os textos são armazenados só neste aparelho.</p><a class="study-card-link" href="#/praticas/mesa">Abrir a mesa →</a></article></div></section>'
 +'<section class="study-section" id="study-accessibility"><div class="section-head"><div><span class="eyebrow">Conforto visual</span><h2>Leia do seu jeito.</h2></div><p>Essas preferências ficam guardadas apenas neste navegador.</p></div><div class="study-setting-list">'
 +'<div class="study-setting"><div><h3>Tamanho dos textos de aula</h3><p>Ajuste o corpo dos textos longos sem alterar as imagens das cartas.</p></div><div class="study-choice-grid font-size-options" role="group" aria-label="Tamanho da fonte nas aulas">'+FONTS.map(([value,label])=>'<button type="button" data-study-font="'+value+'" aria-pressed="'+(font===value)+'">'+esc(label)+'</button>').join('')+'</div></div>'
 +'<div class="study-setting"><div><h3>Contraste</h3><p>O modo de alto contraste escurece textos e reforça bordas. Preserva as cores e a identidade visual do ARCANA.</p></div><div class="study-choice-grid" role="group" aria-label="Contraste visual">'+OPTIONS.map(([value,label])=>'<button type="button" data-study-contrast="'+value+'" aria-pressed="'+(prefs.contrast===value)+'">'+esc(label)+'</button>').join('')+'</div></div>'
 +'<div class="study-setting"><div><h3>Movimento</h3><p>Você pode manter o ajuste do aparelho ou reduzir as animações do site.</p></div><div class="study-choice-grid" role="group" aria-label="Animações da interface">'+MOTIONS.map(([value,label])=>'<button type="button" data-study-motion="'+value+'" aria-pressed="'+(prefs.motion===value)+'">'+esc(label)+'</button>').join('')+'</div></div></div></section>'
 +'<section class="study-section" id="study-backup"><div class="section-head"><div><span class="eyebrow">Seus registros</span><h2>Leve o estudo com você.</h2></div><p>Você pode salvar um arquivo de backup para transferir suas anotações ou restaurá-las em outro navegador.</p></div><div class="study-backup-grid">'
 +'<article class="study-backup-card"><span class="eyebrow">01 / Salvar cópia</span><h3>Exportar meu estudo</h3><p>Gere um arquivo JSON com preferências, aulas, jogos, rascunhos e diário de tiragens. Você escolhe onde guardá-lo.</p><button class="button" type="button" data-study-export>Baixar meu backup ↓</button><p class="study-backup-warning">O arquivo pode conter perguntas e interpretações pessoais. Guarde-o em um local seguro.</p></article>'
 +'<article class="study-backup-card"><span class="eyebrow">02 / Recuperar cópia</span><h3>Importar um backup</h3><p>Escolha um backup ARCANA criado anteriormente. Antes de substituir os registros locais, você precisará confirmar.</p><label class="study-import-label" for="study-import-file">Selecionar arquivo JSON</label><input id="study-import-file" type="file" accept=".json,application/json"><div id="study-import-preview" class="study-import-preview" aria-live="polite"></div></article></div>'
 +'<div class="study-data-note"><strong>Privacidade e limites:</strong> o ARCANA não envia suas anotações ao GitHub. O navegador guarda seus registros localmente, sem criptografia ou sincronização. Se você apagar os dados do navegador, poderá perdê-los. O backup é a forma de preservar uma cópia. A restauração substitui apenas os registros ARCANA reconhecidos.</div></section>'
 +'<div class="study-end-link"><a href="#/aprender" class="button secondary">Voltar às aulas →</a><a href="#/atlas" class="text-link">Explorar o Atlas</a></div></div>';
}
function renderStudy(){
 const main=document.getElementById('main');
 if(!main||!document.getElementById('study-progress'))return;
 main.innerHTML=studyPage();
 applyStudyPreferences();
 refreshPreview();
}
function say(text){
 announcement=text;
 const area=document.getElementById('study-import-preview');
 if(area)area.innerHTML='<p class="study-message" role="status">'+esc(text)+'</p>';
}
function refreshPreview(){
 const node=document.getElementById('study-import-preview');
 if(!node)return;
 if(!pendingImport){if(announcement) say(announcement);return;}
 const n=Object.keys(pendingImport).length;
 node.innerHTML='<div class="study-import-confirm"><strong>Backup pronto para restaurar.</strong><p>O arquivo contém '+n+' tipos de registro. A restauração <strong>substituirá os dados ARCANA atuais</strong> neste navegador. Antes de continuar, recomendamos exportar uma cópia dos registros atuais.</p><div class="study-actions"><button class="button" type="button" data-study-restore>Confirmar substituição</button><button class="button secondary" type="button" data-study-import-cancel>Cancelar</button></div></div>';
}
function setPrefs(update){
 const old=getUIPreferences(localStorage);
 if(!safePut(localStorage,UI_PREFS_KEY,JSON.stringify(parseUIPreferences({...old,...update})))){
  say('Não foi possível guardar sua preferência neste navegador.');
  return;
 }
 renderStudy();
}
function exportStudy(){
 try{
  const backup=buildBackup(localStorage);
  if(Object.keys(backup.data).length===0){say('Ainda não há dados para exportar. Comece uma aula ou uma prática.');return;}
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const anchor=document.createElement('a');
  anchor.href=url;anchor.download='ARCANA-meu-estudo-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(anchor);anchor.click();anchor.remove();
  setTimeout(()=>URL.revokeObjectURL(url),60000);
  say('Backup preparado. Guarde o arquivo em um local seguro.');
 }catch(error){say('Não foi possível criar o backup: '+String(error.message||error));}
}
export async function handleStudyFile(target){
 if(target?.id!=='study-import-file')return false;
 pendingImport=null;
 const file=target.files?.[0];
 if(!file){say('Nenhum arquivo selecionado.');return true;}
 if(file.size>400000){say('O arquivo é maior que o limite de 400 KB.');return true;}
 try{
  const content=await file.text();
  if(content.length>400000)throw Error('O arquivo é muito grande.');
  pendingImport=validateBackup(JSON.parse(content));
  announcement='';refreshPreview();
 }catch(err){pendingImport=null;say('Não foi possível ler o backup: '+String(err.message||err));}
 return true;
}
export function handleStudyClick(target){
 const font=target.closest?.('[data-study-font]');
 const contrast=target.closest?.('[data-study-contrast]');
 const motion=target.closest?.('[data-study-motion]');
 const exportBtn=target.closest?.('[data-study-export]');
 const restore=target.closest?.('[data-study-restore]');
 const cancel=target.closest?.('[data-study-import-cancel]');
 const done=target.closest?.('[data-study-lesson-toggle]');
 if(!font&&!contrast&&!motion&&!exportBtn&&!restore&&!cancel&&!done)return false;
 if(font){
  if(FONTS.some(x=>x[0]===font.dataset.studyFont)){safePut(localStorage,'arcana-font',font.dataset.studyFont);renderStudy();}
 }else if(contrast)setPrefs({contrast:contrast.dataset.studyContrast});
 else if(motion)setPrefs({motion:motion.dataset.studyMotion});
 else if(exportBtn)exportStudy();
 else if(restore){
  if(!pendingImport){say('Selecione primeiro um arquivo ARCANA válido.');return true;}
  try{
   restoreBackup(localStorage,pendingImport);pendingImport=null;announcement='Backup restaurado. Recarregando para aplicar registros e preferências.';
   window.location.reload();
  }catch(err){say('A restauração falhou. '+String(err.message||err));}
 }else if(cancel){pendingImport=null;announcement='Restauração cancelada. Nenhum registro foi alterado.';renderStudy();}
 else if(done){
  const lessonId=done.dataset?.studyLessonToggle||'F-03.01';
  const current=completedLesson(localStorage,lessonId);
  if(setCompletedLesson(localStorage,!current,lessonId)){
   const button=document.querySelector('[data-study-lesson-toggle]');
   if(button){button.setAttribute('aria-pressed',String(!current));button.textContent=!current?'Aula marcada como concluída ✓':'Marcar aula como concluída';}
   const feedback=document.getElementById('lesson-completion-status');
   if(feedback)feedback.textContent=!current?'A conclusão foi registrada neste navegador.':'Marcação de conclusão desfeita.';
  }
 }
 return true;
}
export function markLessonControl(lessonId='F-03.01'){
 const isDone=completedLesson(localStorage,lessonId);
 return '<section class="study-lesson-finish"><span class="eyebrow">Seu percurso</span><h2>Você concluiu esta leitura?</h2><p>Se já leu o material, praticou a observação e refletiu sobre as perguntas, marque esta aula como concluída. Isso registra apenas sua escolha neste navegador.</p><button type="button" class="button" data-study-lesson-toggle="'+esc(lessonId)+'" aria-pressed="'+isDone+'">'+(isDone?'Aula marcada como concluída ✓':'Marcar aula como concluída')+'</button><p class="study-lesson-status" id="lesson-completion-status" role="status" aria-live="polite"></p><a class="text-link" href="#/meu-estudo">Acompanhar meu estudo →</a></section>';
}
export function renderStudyControl(){
 const area=document.getElementById('lesson-mark-control');
 if(area)area.innerHTML=markLessonControl(area.dataset.lessonId||'F-03.01');
}
