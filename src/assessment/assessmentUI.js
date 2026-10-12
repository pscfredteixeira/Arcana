import {cards} from '../data/cards.js';
import {cardImage,escapeHTML as esc} from '../ui/templates.js';
import {assessmentItems,transferTask} from './assessmentData.js';
import {
 ASSESSMENT_KEY,MAX_WRITING,loadAssessment,storeAssessment,
 initialAssessment,startAssessment,chooseAssessment,revealHint,nextAssessment,
 saveAssessmentWriting,showAssessmentExample,checkAssessmentCriterion,
 finishAssessment,resultsAssessment,isResolved,answerStatus
} from './assessmentLogic.js';

const bySlug=new Map(cards.map(c=>[c.slug,c]));
let state=null,resetPending=false,notice='';
const getState=()=>{if(state===null)state=loadAssessment(localStorage);return state;};
const save=s=>{state=s;if(!storeAssessment(localStorage,s))notice='O navegador não conseguiu salvar seu progresso. Você ainda pode continuar nesta tela.';};
const statuses={'sozinho':'Sem ajuda','com-apoio':'Com ajuda','revisar':'Precisa revisar','pendente':'Não respondida'};
const cardFrame=slug=>'<div class="assessment-card-art">'+cardImage(bySlug.get(slug))+'</div>';
const goTop=()=>{
 const root=document.getElementById('assessment-root');
 root?.scrollIntoView?.({block:'start',behavior:'auto'});
 root?.querySelector('[data-assessment-focus]')?.focus?.({preventScroll:true});
};
const progress=(step,total)=>'<div class="assessment-progress"><span>Etapa '+step+' de '+total+'</span><div role="progressbar" aria-valuemin="0" aria-valuemax="'+total+'" aria-valuenow="'+step+'" aria-label="Etapas da avaliação"><span style="width:'+(step/total*100)+'%"></span></div></div>';
function welcome(){
 const previous=Object.keys(getState().responses).length;
 return '<section class="assessment-welcome"><div class="assessment-welcome-copy"><span class="eyebrow">DIAGNÓSTICO DE APRENDIZAGEM · INICIANTE</span><h2 tabindex="-1" data-assessment-focus>O que você realmente aprendeu?</h2><p>Esta avaliação não é uma prova para passar ou reprovar. Ela ajuda você a descobrir o que já sabe e o que vale a pena revisar.</p><div class="assessment-overview"><div><strong>01</strong><span>Quatro perguntas sobre conhecimento, imagem e significado</span></div><div><strong>02</strong><span>Uma carta nova para interpretar por escrito</span></div><div><strong>03</strong><span>Um resultado com orientações para continuar estudando</span></div></div><p class="assessment-fine">As perguntas são corrigidas pelo site. Seu texto livre não recebe uma nota automática. Você pode consultar uma dica, mas o relatório diferencia respostas dadas sem ajuda das respostas com apoio.</p><button type="button" class="button" data-assessment-start>'+(previous?'Continuar avaliação':'Começar avaliação')+' →</button></div><div class="assessment-welcome-art">'+cardFrame('tres-de-ouros')+'<span>Observar é diferente de decorar.</span></div></section>';
}
function question(){
 const s=getState(),q=assessmentItems[s.index];
 if(!q)return '';
 const r=s.responses[q.id]||{attempts:[],hintUsed:false},lastId=r.attempts.at(-1);
 const last=q.options.find(o=>o.id===lastId),resolved=isResolved(q,r);
 const status=answerStatus(q,r);
 const canTry=!resolved&&r.attempts.length<3;
 const feedback=last?'<div class="assessment-feedback '+(last.correct?'is-success':'is-review')+'" role="status" aria-live="polite"><strong>'+(last.correct?'Você acertou. Veja por quê.':resolved?'Vamos revisar esta ideia.':'Ainda não. Entenda o motivo e tente outra resposta.')+'</strong><p>'+esc(last.why)+'</p>'+(status==='revisar'?'<p><strong>Resposta explicada:</strong> '+esc(q.options.find(x=>x.correct)?.text||'')+' '+esc(q.rationale)+'</p>':'')+'</div>':'';
 return '<section class="assessment-question">'+progress(s.index+1,5)+'<div class="assessment-question-layout"><div class="assessment-question-art">'+cardFrame(q.card)+'<span>'+esc(bySlug.get(q.card)?.name||'')+'</span></div><div class="assessment-question-main"><span class="eyebrow">COMPETÊNCIA '+String(s.index+1).padStart(2,'0')+' · '+esc(q.competency.toUpperCase())+'</span><h2 tabindex="-1" data-assessment-focus>'+esc(q.prompt)+'</h2><p class="assessment-assist-text">Escolha a melhor resposta. Se errar, você verá o motivo e poderá tentar outra alternativa.</p><div class="assessment-options" role="group" aria-label="Respostas da avaliação">'+q.options.map((o,i)=>{
 const tried=r.attempts.includes(o.id),chosen=lastId===o.id;
 return '<button type="button" data-assessment-choice="'+o.id+'" class="'+(chosen?(o.correct?'selected-correct':'selected-wrong'):'')+'" '+(!canTry||tried?'disabled':'')+' aria-label="Alternativa '+(i+1)+': '+esc(o.text)+'"><span>'+String(i+1).padStart(2,'0')+'</span><span>'+esc(o.text)+'</span></button>';
 }).join('')+'</div>'+feedback
 +(canTry?'<div class="assessment-hint-area">'+(r.hintUsed?'<div class="assessment-hint"><strong>Dica</strong><p>'+esc(q.hint)+'</p></div>':'<button type="button" class="assessment-hint-button" data-assessment-hint>Preciso de uma dica →</button>')+'</div>':'<div class="assessment-next"><span class="assessment-result-pill '+status+'">'+esc(statuses[status])+'</span><button type="button" class="button" data-assessment-next>'+(s.index===3?'Ir para a interpretação escrita':'Próxima pergunta')+' →</button></div>')
 +'</div></div></section>';
}
function writing(){
 const s=getState(),card=bySlug.get(transferTask.card),length=s.writing.trim().length;
 return '<section class="assessment-transfer">'+progress(5,5)+'<div class="assessment-transfer-head"><span class="eyebrow">DESAFIO FINAL · SUA INTERPRETAÇÃO</span><h2 tabindex="-1" data-assessment-focus>'+esc(transferTask.title)+'</h2><p>Até agora você escolheu respostas. Agora tente explicar sozinho, usando uma carta diferente das anteriores. Não há palavras secretas para acertar.</p></div><div class="assessment-transfer-grid"><div class="assessment-transfer-art">'+cardFrame(card.slug)+'<strong>'+esc(card.name)+'</strong><a href="#/carta/'+esc(card.slug)+'">Estudar esta carta no Atlas ↗</a></div><div class="assessment-transfer-task"><span class="eyebrow">SITUAÇÃO PARA PENSAR</span><p>'+esc(transferTask.setup)+'</p><h3>'+esc(transferTask.question)+'</h3><label for="assessment-writing">Minha interpretação</label><textarea id="assessment-writing" data-assessment-writing rows="7" maxlength="'+MAX_WRITING+'" placeholder="'+esc(transferTask.starter)+'">'+esc(s.writing)+'</textarea><p class="assessment-writing-count" id="assessment-writing-count" role="status">'+length+' caracteres de conteúdo. Escreva pelo menos 45 para comparar com um exemplo.</p>'
 +(s.sampleRevealed?'<div class="assessment-model"><strong>Exemplo de uma interpretação possível</strong><p>'+esc(transferTask.example)+'</p><p>Seu texto não precisa ser igual a este. Verifique se o raciocínio está claro.</p></div><div class="assessment-rubric"><strong>Conferindo meu próprio texto</strong><p>Marque apenas os critérios que você realmente conseguiu cumprir. Isto é uma autoavaliação, não uma nota corrigida pelo ARCANA.</p>'+transferTask.criteria.map((c,i)=>'<label class="assessment-check"><input type="checkbox" data-assessment-check="'+i+'" '+(s.checks.includes(i)?'checked':'')+'><span>'+esc(c)+'</span></label>').join('')+'</div><button type="button" class="button" data-assessment-finish>Ver o que aprendi →</button>':'<button type="button" class="button" data-assessment-model '+(length<45?'disabled':'')+'>Comparar com um exemplo resolvido →</button>')
 +'</div></div></section>';
}
function result(){
 const s=getState(),r=resultsAssessment(s);
 const summary=r.counts.sozinho===4?'Você acertou as quatro perguntas sem ajuda.':r.counts.revisar?'Você concluiu a avaliação e encontrou assuntos que vale a pena rever.':'Você concluiu a avaliação e usou algumas orientações para aprender.';
 return '<section class="assessment-report">'+progress(5,5)+'<span class="eyebrow">SEU RETORNO DE APRENDIZAGEM</span><h2 tabindex="-1" data-assessment-focus>O que você já sabe — e o que estudar agora.</h2><p class="assessment-report-lede">'+esc(summary)+'</p><div class="assessment-report-numbers"><div><strong>'+r.counts.sozinho+' / 4</strong><span>respostas certas sem ajuda, na primeira tentativa</span></div><div><strong>'+r.counts.apoio+' / 4</strong><span>respostas certas usando dica ou uma nova tentativa</span></div><div><strong>'+r.counts.revisar+' / 4</strong><span>assuntos que pedem revisão</span></div></div>'
 +'<h3>Como você foi em cada habilidade</h3><div class="assessment-skill-list">'+r.rows.map(row=>'<article><div><strong>'+esc(row.competency)+'</strong><span class="assessment-result-pill '+row.status+'">'+esc(statuses[row.status])+'</span></div><a href="'+row.review.url+'">'+esc(row.review.text)+' →</a></article>').join('')+'</div>'
 +'<section class="assessment-writing-report"><span class="eyebrow">INTERPRETAÇÃO LIVRE</span><h3>Seu texto sobre '+esc(bySlug.get(transferTask.card).name)+'</h3><blockquote>'+esc(s.writing)+'</blockquote><p>Você marcou <strong>'+r.writing.checked+' de '+r.writing.criteriaTotal+' critérios</strong> na sua própria revisão. O ARCANA não corrigiu automaticamente esta resposta escrita.</p>'+(r.writing.checked<r.writing.criteriaTotal?'<p>Volte ao Atlas e confira o desenho, o significado e a pergunta que você formulou. Seu texto pode ser melhorado sem precisar adivinhar um futuro.</p>':'<p>Você identificou os três pontos que uma interpretação fundamentada deve conter. Vale conferir seu texto novamente depois de alguns dias.</p>')+'<a href="'+transferTask.review.url+'">Rever o Seis de Espadas →</a></section>'
 +'<div class="assessment-report-end"><h3>Próximo passo</h3><p>'+(r.counts.revisar||r.counts.apoio?'Escolha uma habilidade em que você usou ajuda ou precisou revisar. Estude a carta e refaça a avaliação depois.':'Agora pratique com outras cartas do Atlas, tentando explicar o desenho com suas próprias palavras.')+'</p><div class="assessment-report-actions"><a class="button" href="#/meu-estudo">Voltar ao Meu estudo →</a><a class="button secondary" href="#/atlas">Explorar outras cartas</a><button class="button secondary" type="button" data-assessment-reset>Refazer esta avaliação</button></div></div></section>';
}
export function assessmentPage(){
 return '<div class="container assessment-page"><header class="page-intro assessment-page-heading"><div class="breadcrumb"><a href="#/aprender">Aprender</a> / Avaliação de aprendizagem</div><span class="eyebrow">ARCANA · PRÁTICA REFLEXIVA</span><h1>Avalie o que<br><em>você aprendeu.</em></h1><p class="lead">Observe, explique e use o que estudou. O objetivo é compreender, não decorar respostas.</p></header><div id="assessment-root" aria-label="Avaliação de aprendizagem" aria-live="polite"></div><p class="assessment-privacy">Suas respostas ficam neste navegador, sem login ou envio a um servidor. As perguntas objetivas são corrigidas pelo site; a interpretação escrita recebe apenas orientações de autoavaliação.</p></div>';
}
export function renderAssessment(){
 const root=document.getElementById('assessment-root');if(!root)return;
 const s=getState();
 root.innerHTML=(s.phase==='welcome'?welcome():s.phase==='questions'?question():s.phase==='writing'?writing():result())
 +(resetPending?'<div class="assessment-reset-confirm" role="alert"><p>Refazer a avaliação vai substituir as respostas e o resultado anterior neste navegador. Deseja continuar?</p><button type="button" class="button" data-assessment-confirm>Sim, refazer</button> <button type="button" class="button secondary" data-assessment-cancel>Cancelar</button></div>':'')
 +(notice?'<p class="assessment-storage-note" role="status">'+esc(notice)+'</p>':'');
}
const redraw=()=>{renderAssessment();goTop();};
export function handleAssessmentClick(target){
 const t=target?.closest?.('[data-assessment-start],[data-assessment-choice],[data-assessment-hint],[data-assessment-next],[data-assessment-model],[data-assessment-finish],[data-assessment-reset],[data-assessment-confirm],[data-assessment-cancel]');
 if(!t)return false;
 const s=getState();
 if(t.hasAttribute('data-assessment-start')){save(startAssessment(s));redraw();}
 else if(t.hasAttribute('data-assessment-choice')){save(chooseAssessment(s,t.dataset.assessmentChoice));renderAssessment();}
 else if(t.hasAttribute('data-assessment-hint')){save(revealHint(s));renderAssessment();}
 else if(t.hasAttribute('data-assessment-next')){save(nextAssessment(s));redraw();}
 else if(t.hasAttribute('data-assessment-model')){save(showAssessmentExample(s));renderAssessment();}
 else if(t.hasAttribute('data-assessment-finish')){save(finishAssessment(s));redraw();}
 else if(t.hasAttribute('data-assessment-reset')){resetPending=true;renderAssessment();}
 else if(t.hasAttribute('data-assessment-confirm')){resetPending=false;save(initialAssessment());redraw();}
 else if(t.hasAttribute('data-assessment-cancel')){resetPending=false;renderAssessment();}
 return true;
}
export function handleAssessmentInput(target){
 if(target?.id!=='assessment-writing')return false;
 save(saveAssessmentWriting(getState(),target.value));
 const length=state.writing.trim().length;
 const count=document.getElementById('assessment-writing-count');
 if(count)count.textContent=length+' caracteres de conteúdo. '+(length>=45?'Você já pode comparar com o exemplo.':'Escreva pelo menos 45 para comparar com um exemplo.');
 const model=document.querySelector('[data-assessment-model]');
 if(model)model.disabled=length<45;
 return true;
}
export function handleAssessmentChange(target){
 if(!target?.hasAttribute?.('data-assessment-check'))return false;
 const id=Number(target.dataset.assessmentCheck);
 save(checkAssessmentCriterion(getState(),id,target.checked));
 return true;
}
export function assessmentSnapshot(){return JSON.parse(JSON.stringify(getState()));}
