import {cards} from '../data/cards.js';
import {cardImage,escapeHTML as e} from '../ui/templates.js';
import {trioLessons,trioById,trioCriteria} from './trioData.js';
import {
 initialTrio,loadTrio,storeTrio,readLesson,isSolved,correctPair,
 toggleTrioChoice,useTrioHint,submitTrioChoices,openTrioWriting,
 writeTrio,revealTrioExample,markTrioCriterion,finishTrio,trioProgress,TRIO_MAX_DRAFT
} from './trioLogic.js';

const bySlug=new Map(cards.map(c=>[c.slug,c]));
let notice='';
const getState=()=>{try{return loadTrio(localStorage)}catch{return initialTrio()}};
function save(state){
 try{notice=storeTrio(localStorage,state)?'':'O navegador não conseguiu salvar esta atividade.';}
 catch{notice='O navegador não conseguiu salvar esta atividade.';}
}
const link=id=>'#/praticas/tres-cartas/'+id;
function trioImages(task,detail=false){
 return '<div class="trio-cards">'+task.cards.map((item,index)=>{
  const c=bySlug.get(item.slug);
  return '<article class="trio-card"><div class="trio-card-art">'+cardImage(c,detail)+'</div><div class="trio-card-copy"><span class="eyebrow">CARTA '+(index+1)+' · '+e(item.role.toUpperCase())+'</span><h3>'+e(c.name)+'</h3>'+(detail?'<p><strong>O que vemos:</strong> '+e(item.observation)+'</p><p><strong>O que pode significar:</strong> '+e(item.meaning)+'</p>':'')+'</div></article>';
 }).join('')+'</div>';
}
export function trioHubPage(){
 const progress=trioProgress(getState());
 return '<div class="container trio-page"><header class="page-intro"><div class="breadcrumb"><a href="#/praticas">Práticas</a> / Três Cartas</div><span class="eyebrow">SPRINT 11 · LEITURA DE TRÊS CARTAS</span><h1>Três cartas.<br><em>Uma história.</em></h1><p class="lead">Uma situação pode ter mais de uma interpretação. Aqui você vai aprender a explicar três imagens juntas, sem prometer acontecimentos ou decorar respostas prontas.</p></header>'
 +'<section class="trio-intro"><div><span class="eyebrow">SEU PERCURSO</span><strong>'+progress.completed+' <small>de 4</small></strong><p>histórias concluídas com uma interpretação escrita</p></div><div><p>Em cada história você observa três cartas, escolhe <strong>duas leituras possíveis</strong> e escreve sua própria explicação. Um exemplo aparece depois que você escrever.</p><p>Os acertos das alternativas são corrigidos. A qualidade do texto é avaliada por você, usando três critérios. Isso não é uma prova de adivinhação.</p><a class="button" href="'+link(progress.next||trioLessons[0].id)+'">'+(progress.finished?'Revisitar histórias':'Começar ou continuar')+' →</a></div></section>'
 +'<section class="trio-scenarios" aria-label="Histórias de três cartas"><h2>Escolha uma história</h2>'+trioLessons.map((lesson,i)=>{
  const completed=getState().lessons[lesson.id]?.finished===true;
  return '<article class="trio-scenario"><div class="trio-scenario-head"><span class="eyebrow">'+e(lesson.kicker.toUpperCase())+'</span><span class="trio-state">'+(completed?'✓ Concluída':'Para praticar')+'</span></div><h3>'+e(lesson.title)+'</h3><p>'+e(lesson.situation)+'</p>'+trioImages(lesson)+'<a class="button secondary" href="'+link(lesson.id)+'">'+(completed?'Rever minha interpretação':'Abrir esta história')+' →</a></article>';
 }).join('')+'</section><aside class="trio-method"><strong>Importante:</strong> as cartas são do Rider–Waite–Smith. Os exemplos e as relações são propostas didáticas originais do ARCANA, inspiradas no estudo visual de Rachel Pollack. Essas leituras não garantem acontecimentos e não devem ser usadas para supor o que outra pessoa pensa.</aside></div>';
}
const getLastFeedback=(lesson,r)=>{
 const submission=r.submissions.at(-1);
 if(!submission||submission.length!==r.selected.length||!submission.every((n,i)=>n===r.selected[i]))return '';
 const good=submission.every(i=>lesson.choices[i].valid);
 const notes=submission.map(i=>'<p><strong>'+e(lesson.choices[i].text)+'</strong> '+e(lesson.choices[i].why)+'</p>').join('');
 return '<div class="trio-feedback '+(good?'is-good':'needs-work')+'" role="status" aria-live="polite"><strong>'+(good?'Essas duas leituras fazem sentido.':'Uma dessas interpretações precisa ser revista.')+'</strong>'+notes+(good?'<p>Veja que é possível explicar a mesma situação por ângulos diferentes, desde que as imagens e o contexto sustentem a leitura.</p>':'<p>Troque uma das opções e tente novamente. A dica pode ajudar.</p>')+'</div>';
};
function choices(lesson,r){
 const solved=r.submissions.some(pair=>pair.every((n,i)=>n===correctPair(lesson)[i]));
 return '<section class="trio-activity"><span class="eyebrow">ETAPA 01 · COMPARE AS POSSIBILIDADES</span><h2>'+e(lesson.prompt)+'</h2><p>Selecione exatamente duas alternativas. Mais de uma interpretação pode ser adequada à mesma situação.</p><div class="trio-options" role="group" aria-label="Escolha duas interpretações">'+lesson.choices.map((choice,i)=>{
  const selected=r.selected.includes(i);
  return '<button type="button" data-trio-choice="'+i+'" aria-pressed="'+selected+'" class="'+(selected?'is-selected':'')+'" '+(solved?'disabled':'')+'><span class="trio-option-mark">'+(selected?'✓':String(i+1).padStart(2,'0'))+'</span><span>'+e(choice.text)+'</span></button>';
 }).join('')+'</div><p class="trio-choice-count" role="status">'+r.selected.length+' de 2 interpretações selecionadas.</p>'
 +(solved?getLastFeedback(lesson,r)+'<button type="button" class="button" data-trio-write>Agora explique com suas palavras →</button>':
 '<button type="button" class="button" data-trio-submit '+(r.selected.length!==2?'disabled':'')+'>Conferir as duas escolhas →</button>'
 +getLastFeedback(lesson,r)
 +(r.hintUsed?'<aside class="trio-hint"><strong>Dica para pensar</strong><p>'+e(lesson.hint)+'</p></aside>':'<button type="button" class="trio-hint-button" data-trio-hint>Preciso de uma dica →</button>'))
 +'</section>';
}
function writing(lesson,r){
 const length=r.draft.trim().length;
 return '<section class="trio-activity"><span class="eyebrow">ETAPA 02 · SUA PRÓPRIA LEITURA</span><h2>Como você explicaria essas três cartas?</h2><p>'+e(lesson.writingPrompt)+'</p><label for="trio-draft">Escreva sua interpretação</label><textarea id="trio-draft" data-trio-draft="'+e(lesson.id)+'" rows="7" maxlength="'+TRIO_MAX_DRAFT+'" placeholder="Na primeira carta, observo... Na segunda, percebo... A terceira me faz pensar... Então eu perguntaria...">'+e(r.draft)+'</textarea><p class="trio-writing-length" id="trio-writing-length" role="status">'+length+' caracteres de conteúdo. '+(length>=80?'Você pode comparar com o exemplo.':'Escreva pelo menos 80 caracteres para comparar com o exemplo.')+'</p>'
 +(r.exampleShown?'<div class="trio-model"><strong>Exemplo de uma leitura possível</strong><p>'+e(lesson.model)+'</p><p>Seu texto pode ser diferente. O mais importante é explicar como chegou à sua interpretação.</p></div><div class="trio-rubric"><h3>Confira seu texto</h3><p>Marque somente os critérios que você realmente conseguiu cumprir. Eles servem para orientar sua revisão, não para gerar uma nota automática.</p>'+trioCriteria.map((c,i)=>'<label class="trio-check"><input type="checkbox" data-trio-check="'+i+'" '+(r.checks.includes(i)?'checked':'')+'><span>'+e(c)+'</span></label>').join('')+'</div><button type="button" class="button" data-trio-finish>Ver meu resultado →</button>':'<button type="button" class="button" data-trio-model '+(length<80?'disabled':'')+'>Comparar com uma explicação →</button>')
 +'</section>';
}
function report(lesson,r){
 const other=trioLessons.find(x=>!getState().lessons[x.id]?.finished)||trioLessons[0];
 return '<section class="trio-activity trio-report"><span class="eyebrow">ATIVIDADE CONCLUÍDA</span><h2>Sua interpretação ficou registrada.</h2><p>Você conseguiu identificar duas leituras sustentadas pelas imagens e escreveu uma interpretação própria. Esse registro mostra que realizou a atividade; não significa que seu texto tenha sido corrigido por um professor.</p><div class="trio-selfresult"><strong>'+r.checks.length+' de '+trioCriteria.length+'</strong><span>critérios marcados por você na autoavaliação</span></div><h3>O que você escreveu</h3><blockquote>'+e(r.draft)+'</blockquote><h3>Outra possibilidade de leitura</h3><p>'+e(lesson.revision)+'</p>'+(r.checks.length<trioCriteria.length?'<p>Algum ponto ainda merece atenção. Você pode voltar às três fichas no Atlas e observar os detalhes com calma.</p>':'<p>Você marcou os três critérios. Agora vale experimentar esse raciocínio com outra situação.</p>')+'<div class="trio-report-actions"><a class="button" href="#/praticas/tres-cartas">Ver as quatro histórias →</a><a class="button secondary" href="'+link(other.id)+'">Abrir outra história</a></div></section>';
}
function scenarioMarkup(id){
 const lesson=trioById(id);
 if(!lesson)return '';
 const state=getState(),r=readLesson(state,id);
 const status=r.finished?'Concluída':r.view==='writing'?'Escrever interpretação':'Comparar interpretações';
 return '<div class="container trio-page trio-single"><div class="trio-back"><a href="#/praticas/tres-cartas">← Voltar às quatro histórias</a><span>'+e(status)+'</span></div><header class="trio-single-heading"><span class="eyebrow">'+e(lesson.kicker.toUpperCase())+'</span><h1 tabindex="-1" data-trio-focus>'+e(lesson.title)+'</h1><p>'+e(lesson.situation)+'</p></header>'
 +'<div class="trio-context"><span class="eyebrow">OBSERVE O QUE CADA CARTA ACRESCENTA</span><p>Os três lugares abaixo organizam nossa comparação. Não são uma regra para todas as tiragens.</p>'+trioImages(lesson,true)+'</div>'
 +'<div id="trio-root" data-trio-id="'+e(id)+'">'+(r.finished?report(lesson,r):r.view==='writing'?writing(lesson,r):choices(lesson,r))+'</div>'
 +'<footer class="trio-footer"><p>Não existe uma frase obrigatória para combinar cartas. A leitura precisa considerar o desenho, o sentido tradicional e a situação perguntada.</p><div>'+lesson.cards.map(c=>'<a href="#/carta/'+e(c.slug)+'">Estudar '+e(bySlug.get(c.slug).name)+' no Atlas ↗</a>').join('')+'</div></footer>'+(notice?'<p role="status">'+e(notice)+'</p>':'')+'</div>';
}
export function trioScenarioPage(id){return scenarioMarkup(id);}
function redraw(){
 const root=document.getElementById('trio-root');if(!root)return;
 const id=root.dataset.trioId,lesson=trioById(id),r=readLesson(getState(),id);
 if(!lesson)return;
 root.innerHTML=r.finished?report(lesson,r):r.view==='writing'?writing(lesson,r):choices(lesson,r);
 root.querySelector('h2')?.focus?.({preventScroll:true});
}
export function handleTrioClick(target){
 const btn=target?.closest?.('[data-trio-choice],[data-trio-submit],[data-trio-hint],[data-trio-write],[data-trio-model],[data-trio-finish]');
 if(!btn)return false;
 const root=document.getElementById('trio-root');if(!root)return false;
 const id=root.dataset.trioId,state=getState();
 let updated=state;
 if(btn.hasAttribute('data-trio-choice'))updated=toggleTrioChoice(state,id,Number(btn.dataset.trioChoice));
 if(btn.hasAttribute('data-trio-submit'))updated=submitTrioChoices(state,id);
 if(btn.hasAttribute('data-trio-hint'))updated=useTrioHint(state,id);
 if(btn.hasAttribute('data-trio-write'))updated=openTrioWriting(state,id);
 if(btn.hasAttribute('data-trio-model'))updated=revealTrioExample(state,id);
 if(btn.hasAttribute('data-trio-finish'))updated=finishTrio(state,id);
 if(JSON.stringify(updated)!==JSON.stringify(state)){save(updated);redraw();}
 return true;
}
export function handleTrioInput(target){
 if(target?.id!=='trio-draft')return false;
 const id=target.dataset.trioDraft;
 if(!trioById(id))return false;
 save(writeTrio(getState(),id,target.value));
 const length=target.value.trim().length;
 const message=document.getElementById('trio-writing-length');
 if(message)message.textContent=length+' caracteres de conteúdo. '+(length>=80?'Você pode comparar com o exemplo.':'Escreva pelo menos 80 caracteres para comparar com o exemplo.');
 const button=document.querySelector('[data-trio-model]');
 if(button)button.disabled=length<80;
 return true;
}
export function handleTrioChange(target){
 if(!target?.hasAttribute?.('data-trio-check'))return false;
 const id=document.getElementById('trio-root')?.dataset.trioId;
 if(!trioById(id))return false;
 save(markTrioCriterion(getState(),id,Number(target.dataset.trioCheck),target.checked));
 return true;
}
