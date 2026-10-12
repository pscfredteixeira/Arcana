import {cards} from '../data/cards.js';
import {cardImage,escapeHTML as e} from '../ui/templates.js';
import {dialogueChapters,dialogueTasks,findDialogueChapter} from './dialogueData.js';
import {
 loadDialogue,storeDialogue,nextDialogueTask,chooseDialogue,hintDialogue,
 noteDialogue,dialogueProgress,DIALOGUE_NOTE_LIMIT
} from './dialogueLogic.js';

const cardBySlug=new Map(cards.map(c=>[c.slug,c]));
let saveNotice='';
const getState=()=>{try{return loadDialogue(localStorage)}catch{return {answers:{},notes:{}}}};
function save(state){
 try{if(!storeDialogue(localStorage,state))saveNotice='Não foi possível salvar os dados neste navegador.';else saveNotice='';}
 catch{saveNotice='Não foi possível salvar os dados neste navegador.';}
}
const chapterLink=id=>'#/praticas/cartas-em-dialogo/'+id;
const chapterNumber=id=>dialogueChapters.findIndex(c=>c.id===id)+1;
export function dialogueHubPage(){
 const state=getState(),progress=dialogueProgress(state);
 return '<div class="container dialogue-page"><header class="page-intro"><div class="breadcrumb"><a href="#/praticas">Práticas</a> / Cartas em Diálogo</div><span class="eyebrow">SPRINT 10 · OFICINA DE COMPARAÇÃO</span><h1>Cartas em<br><em>diálogo.</em></h1><p class="lead">Uma carta pode falar de começar. Outra, de organizar um projeto. Quando colocamos as duas lado a lado, aprendemos a perceber diferenças e relações.</p><p>Você verá duas imagens, uma explicação simples e uma situação do cotidiano. Não há combinações mágicas a decorar nem respostas sobre o futuro.</p></header>'
 +'<section class="dialogue-overview"><div><span class="eyebrow">SEU PROGRESSO</span><strong>'+progress.done+' <small>de '+progress.total+'</small></strong><span>comparações concluídas</span></div><div><div class="dialogue-meter" role="progressbar" aria-label="Comparações concluídas" aria-valuemin="0" aria-valuemax="'+progress.total+'" aria-valuenow="'+progress.done+'"><span style="width:"'+Math.round(progress.done/progress.total*100)+'%"></span></div><p>'+(progress.finished?'Você concluiu os sete desafios. Volte para rever os contrastes e suas anotações.':'Pode escolher qualquer capítulo, mesmo que ainda não tenha estudado todas as cartas. As dicas não impedem a conclusão.')+'</p><a class="button" href="'+chapterLink(progress.chapters.find(x=>!x.finished)?.id||'portal')+'"> '+(progress.finished?'Rever comparações':'Começar ou continuar')+' →</a></div></section>'
 +'<div class="dialogue-guide"><h2>Como comparar duas cartas?</h2><div class="dialogue-guide-grid"><article><span>01</span><strong>Olhe os desenhos</strong><p>Descreva o que aparece em cada imagem, sem imaginar acontecimentos futuros.</p></article><article><span>02</span><strong>Encontre a diferença</strong><p>Entenda o que cada carta costuma representar. Os sentidos podem se complementar.</p></article><article><span>03</span><strong>Use numa situação</strong><p>Escolha uma explicação que conecte os dois significados a um exemplo real.</p></article></div></div>'
 +'<section class="dialogue-chapters" aria-label="Revisões dos capítulos">'+dialogueChapters.map((ch,i)=>{
   const p=progress.chapters[i],sample=dialogueTasks[ch.taskIds[0]];
   return '<article class="dialogue-chapter-card"><div class="dialogue-chapter-meta"><span class="eyebrow">REVISÃO '+String(i+1).padStart(2,'0')+'</span><span>'+p.done+' de '+p.total+' desafios'+(p.finished?' · concluída':'')+'</span></div><div class="dialogue-chapter-body"><div class="dialogue-chapter-text"><h2>'+e(ch.title)+'</h2><p>'+e(ch.intro)+'</p><a href="'+chapterLink(ch.id)+'" class="button secondary">'+(p.finished?'Revisar este capítulo':'Abrir os desafios')+' →</a></div><div class="dialogue-chapter-images" aria-hidden="true">'+sample.cards.map(slug=>'<div>'+cardImage(cardBySlug.get(slug))+'</div>').join('')+'</div></div></article>';
 }).join('')+'</section>'
 +'<aside class="dialogue-method-note"><strong>De onde vem esta proposta?</strong><p>As imagens são do Rider–Waite–Smith, ilustrado por Pamela Colman Smith. A comparação de cartas dialoga com práticas de leitura visual presentes no estudo de Rachel Pollack. Os casos, as explicações e as perguntas desta oficina são textos originais do ARCANA. O método de seis caminhos de Nei Naiff é apresentado separadamente.</p><a href="#/jornada">Voltar à Jornada dos Maiores →</a></aside></div>';
}
function feedback(task,answers){
 const last=answers.attempts.at(-1);
 if(last===undefined)return '';
 const isRight=last===task.answer;
 return '<div class="dialogue-feedback '+(isRight?'right':'wrong')+'" role="status" aria-live="polite"><strong>'+(isRight?'Boa leitura. Veja por quê.':'Ainda não. Entenda essa diferença e tente outra alternativa.')+'</strong><p>'+e(task.options[last].why)+'</p></div>';
}
function chapterFinished(ch,state,progress){
 const next=dialogueChapters[chapterNumber(ch.id)];
 return '<section class="dialogue-conclusion"><span class="eyebrow">REVISÃO CONCLUÍDA</span><h2>Você relacionou as cartas deste capítulo.</h2><p>Concluir significa que você conseguiu escolher as interpretações adequadas depois de ler o feedback. Se precisou de ajuda, isso faz parte do estudo.</p>'
 +'<div class="dialogue-conclusion-stats"><strong>'+progress.done+' / '+progress.total+'</strong><span>comparações concluídas no total</span></div>'
 +'<div class="dialogue-takeaways">'+ch.taskIds.map(id=>'<article><strong>'+e(dialogueTasks[id].title)+'</strong><p>'+e(dialogueTasks[id].relation)+'</p></article>').join('')+'</div>'
 +'<label for="dialogue-note">O que aprendi sobre a relação entre essas cartas? (opcional)</label><textarea id="dialogue-note" data-dialogue-note="'+e(ch.id)+'" maxlength="'+DIALOGUE_NOTE_LIMIT+'" rows="4" placeholder="Explique a diferença com suas palavras, sem decorar uma frase.">'+e(state.notes[ch.id]||'')+'</textarea><p class="dialogue-save-note">Salvo somente neste navegador. Também entra no backup de Meu estudo.</p>'
 +'<div class="dialogue-conclusion-actions">'+(next?'<a class="button" href="'+chapterLink(next.id)+'">Ir para a próxima revisão →</a>':'<a class="button" href="#/jornada">Revisar a Jornada dos 22 Maiores →</a>')+'<a class="button secondary" href="#/praticas/cartas-em-dialogo">Ver as quatro revisões</a></div></section>';
}
function activeTask(ch,state,progress){
 const id=nextDialogueTask(state,ch.id);
 if(!id)return chapterFinished(ch,state,progress);
 const task=dialogueTasks[id],taskIdx=ch.taskIds.indexOf(id);
 const ans=state.answers[id]||{attempts:[],hintUsed:false};
 const explained=ans.attempts.includes(task.answer);
 return '<section class="dialogue-exercise"><div class="dialogue-stepbar"><span>DESAFIO '+(taskIdx+1)+' DE '+ch.taskIds.length+'</span><span>'+progress.done+' DE '+progress.total+' CONCLUÍDOS NO TOTAL</span></div><h2 tabindex="-1" data-dialogue-focus>'+e(task.title)+'</h2><p class="dialogue-instruction">Primeiro compare os desenhos e leia as explicações. Depois resolva a situação.</p>'
 +'<div class="dialogue-cards">'+task.cards.map((slug,i)=>{
 const c=cardBySlug.get(slug);
 return '<article><div class="dialogue-card-image">'+cardImage(c,true)+'</div><div><span class="eyebrow">CARTA '+(i+1)+'</span><h3>'+e(c.name)+'</h3><p>'+e(i===0?task.first:task.second)+'</p></div></article>';
 }).join('')+'</div>'
 +'<aside class="dialogue-bridge"><strong>O que muda quando aparecem juntas?</strong><p>'+e(task.relation)+'</p></aside>'
 +'<div class="dialogue-question"><span class="eyebrow">SITUAÇÃO DO DIA A DIA</span><p>'+e(task.example)+'</p><h3>'+e(task.prompt)+'</h3><div class="dialogue-answers" role="group" aria-label="Alternativas para comparar as duas cartas">'+task.options.map((opt,i)=>{
  const tried=ans.attempts.includes(i);
  return '<button type="button" data-dialogue-choice="'+i+'" '+(explained||tried?'disabled':'')+' class="'+(tried?(i===task.answer?'correct':'wrong'):'')+'"><span>'+String(i+1).padStart(2,'0')+'</span><span>'+e(opt.text)+'</span></button>';
 }).join('')+'</div>'+feedback(task,ans)
 +(ans.hintUsed?'<aside class="dialogue-hint"><strong>Dica</strong><p>'+e(task.hint)+'</p></aside>':'<button type="button" class="dialogue-hint-button" data-dialogue-hint>Preciso de uma dica →</button>')
 +'</div></section>';
}
export function dialogueChapterPage(id){
 const ch=findDialogueChapter(id);
 if(!ch)return '';
 const state=getState(),progress=dialogueProgress(state);
 const cp=progress.chapters.find(x=>x.id===id);
 return '<div class="container dialogue-page dialogue-single"><div class="dialogue-back"><a href="#/praticas/cartas-em-dialogo">← Voltar às revisões</a><span>'+cp.done+' de '+cp.total+' desafios deste capítulo</span></div><header class="dialogue-single-header"><span class="eyebrow">CARTAS EM DIÁLOGO · REVISÃO '+String(chapterNumber(id)).padStart(2,'0')+'</span><h1>'+e(ch.title)+'</h1><p>'+e(ch.intro)+'</p></header><div id="dialogue-root" data-dialogue-chapter="'+e(id)+'">'+activeTask(ch,state,progress)+'</div><footer class="dialogue-endnote"><p>Comparar cartas não permite descobrir acontecimentos futuros. O objetivo é explicar a ligação entre duas imagens e uma situação com clareza.</p><a href="#/jornada">Retomar a Jornada dos Maiores →</a></footer>'+(saveNotice?'<p role="status">'+e(saveNotice)+'</p>':'')+'</div>';
}
function rerender(){
 const root=document.getElementById('dialogue-root');
 if(!root)return;
 const id=root.dataset.dialogueChapter,ch=findDialogueChapter(id);
 if(!ch)return;
 root.innerHTML=activeTask(ch,getState(),dialogueProgress(getState()));
 root.querySelector('[data-dialogue-focus]')?.focus?.({preventScroll:true});
}
export function handleDialogueClick(target){
 const btn=target?.closest?.('[data-dialogue-choice],[data-dialogue-hint]');
 if(!btn)return false;
 const root=document.getElementById('dialogue-root');
 if(!root)return false;
 const chapterId=root.dataset.dialogueChapter,state=getState(),taskId=nextDialogueTask(state,chapterId);
 if(!taskId)return false;
 const updated=btn.hasAttribute('data-dialogue-hint')?hintDialogue(state,chapterId,taskId):chooseDialogue(state,chapterId,taskId,Number(btn.dataset.dialogueChoice));
 save(updated);
 rerender();
 return true;
}
export function handleDialogueInput(target){
 if(target?.id!=='dialogue-note')return false;
 const chapterId=target.dataset.dialogueNote;
 if(!findDialogueChapter(chapterId))return false;
 save(noteDialogue(getState(),chapterId,target.value));
 return true;
}
