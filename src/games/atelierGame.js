import {cards} from '../data/cards.js';
import {ateliers,ATELIER_KEY} from './explorationsData.js';
import {ATELIER_IDS,initialAtelier,normalizeAtelier,atelierVisit,atelierChoose,atelierComplete} from './explorationsLogic.js';
import {cardImage,escapeHTML as e} from '../ui/templates.js';

const bySlug=new Map(cards.map(c=>[c.slug,c]));
const stored=()=>{try{return normalizeAtelier(JSON.parse(localStorage.getItem(ATELIER_KEY)));}catch{return initialAtelier();}};
let state=stored();
let activePoint=null,answerIndex=-1;
const current=()=>ateliers.find(a=>a.slug===state.selected);
const save=()=>{try{localStorage.setItem(ATELIER_KEY,JSON.stringify(state));}catch{}};
const clearTransient=()=>{activePoint=null;answerIndex=-1;};
const stamp=(title,text)=>'<span class="atelier-stamp"><span aria-hidden="true">✧</span><strong>'+e(title)+'</strong><small>'+e(text)+'</small></span>';
function cardPreview(a){return cardImage(bySlug.get(a.slug));}
function choosing(){
 const done=state.completed.length;
 return '<section class="x-choose"><div class="x-heading"><span class="eyebrow">CAPÍTULO 01 / OBSERVAR</span><h2 tabindex="-1" data-x-focus>Um detalhe muda tudo.</h2><p>Escolha uma carta. Investigue três pontos de sua imagem, junte suas descobertas e formule uma hipótese para uma situação. Você pode começar por qualquer uma.</p></div><div class="x-choice-row">'+ateliers.map((a,i)=>'<button type="button" data-atelier-start="'+e(a.slug)+'" class="x-choose-card"><span class="x-choose-visual">'+cardPreview(a)+'</span><span class="x-choose-text"><span class="eyebrow">'+e(a.eyebrow)+'</span><strong>'+e(a.imageName)+'</strong><small>'+e(a.theme)+'</small><span class="x-choose-link">'+(state.completed.includes(a.slug)?'✓ Revistar imagem':'Investigar imagem')+' →</span></span></button>').join('')+'</div><div class="x-bottom-caption"><span>'+done+' de 3 imagens investigadas</span><div class="x-progress-dots" aria-label="'+done+' de 3 cartas concluídas">'+ateliers.map(a=>'<span class="'+(state.completed.includes(a.slug)?'complete':'')+'"></span>').join('')+'</div></div>'
 +(done===3?'<div class="x-all-finished"><span class="eyebrow">Acervo completo</span><h3>Três imagens. Nove detalhes.</h3><p>Você estudou imagens como evidências para construir hipóteses, em vez de buscar respostas prontas.</p><button type="button" class="button secondary" data-atelier-reset>Refazer toda a experiência</button><a class="button" href="#/praticas/seis-caminhos">Conhecer os Seis Caminhos →</a></div>':'')+'</section>';
}
function inspect(){
 const a=current(),card=bySlug.get(a.slug);
 const p=a.points.find(z=>z.id===activePoint);
 return '<section class="x-inspect"><header class="x-stage-head"><span class="eyebrow">01 / Colecionar evidências</span><h2 tabindex="-1" data-x-focus>O que a imagem mostra?</h2><p>'+e(a.intro)+'</p></header><div class="x-investigation"><div class="x-image-panel"><div class="x-image-top"><span>RIDER–WAITE–SMITH / '+e(card.numeral)+'</span><span>Três pontos para descobrir</span></div><div class="x-magnifier"><div class="x-magnifier-img">'+cardImage(card,true)+'</div>'+a.points.map((z,i)=>'<button type="button" data-atelier-point="'+e(z.id)+'" class="x-marker '+(state.seen.includes(z.id)?'seen':'')+(activePoint===z.id?' active':'')+'" style="--px:'+z.x+'%;--py:'+z.y+'%" aria-label="Detalhe '+(i+1)+': '+e(z.name)+'" aria-pressed="'+(activePoint===z.id)+'">'+(state.seen.includes(z.id)?'✓':i+1)+'</button>').join('')+'</div><p class="x-image-caption">Toque nos círculos da carta ou escolha um detalhe na lista ao lado.</p></div><div class="x-evidence-side"><span class="eyebrow">'+e(a.eyebrow)+'</span><h3>'+e(a.imageName)+'</h3><p>'+e(a.theme)+'</p><div class="x-evidence-list" role="group" aria-label="Selecionar detalhes da carta">'+a.points.map((z,i)=>'<button type="button" data-atelier-point="'+e(z.id)+'" class="'+(activePoint===z.id?'is-active':'')+'"><span class="x-evidence-index">'+(state.seen.includes(z.id)?'✓':String(i+1).padStart(2,'0'))+'</span><span>'+e(z.name)+'</span><span aria-hidden="true">↗</span></button>').join('')+'</div><div class="x-evidence-panel" aria-live="polite">'+(p?'<span class="eyebrow">DETALHE ENCONTRADO</span><h4>'+e(p.name)+'</h4><div class="x-evidence-part"><strong>O que se vê</strong><p>'+e(p.observable)+'</p></div><div class="x-evidence-part"><strong>Uma leitura possível</strong><p>'+e(p.interpretation)+'</p></div><div class="x-evidence-part"><strong>Uma pergunta</strong><p>'+e(p.question)+'</p></div>':'<span class="eyebrow">AGUARDANDO DESCOBERTA</span><p>Escolha um dos três pontos e veja como passamos de uma observação para uma hipótese simbólica.</p>')+'</div><div class="x-evidence-bottom"><span role="status">'+state.seen.length+' de 3 detalhes observados</span><button type="button" class="button" data-atelier-bridge '+(state.seen.length===3?'':'disabled')+'>Conectar descobertas →</button></div></div></div></section>';
}
function bridge(){
 const a=current();const guess=a.bridge.options[answerIndex];
 return '<section class="x-bridge"><div class="x-stage-head"><span class="eyebrow">02 / Pensar com a imagem</span><h2 tabindex="-1" data-x-focus>O que podemos concluir?</h2><p>A mesma imagem abre diferentes interpretações. Agora ela encontra uma situação concreta. A escolha mais cuidadosa deve reconhecer o detalhe e os limites do que ele permite supor.</p></div><div class="x-bridge-body"><div class="x-evidence-summary"><span class="eyebrow">CADERNO DE INDÍCIOS</span><div class="x-bridge-card">'+cardPreview(a)+'</div>'+a.points.map((p,i)=>'<div class="x-collected"><span>'+String(i+1).padStart(2,'0')+'</span><div><strong>'+e(p.name)+'</strong><p>'+e(p.observable)+'</p></div></div>').join('')+'</div><div class="x-bridge-question"><span class="eyebrow">SITUAÇÃO FICTÍCIA</span><h3>'+e(a.bridge.context)+'</h3><p>Qual interpretação transforma detalhes visuais em uma hipótese útil, sem tratar a carta como previsão?</p><div class="x-answers" role="group" aria-label="Hipóteses de interpretação">'+a.bridge.options.map((o,i)=>'<button type="button" data-atelier-answer="'+i+'" '+(answerIndex>=0?'disabled':'')+' class="'+(answerIndex===i?(o.valid?'right':'wrong'):'')+'"><span>'+String.fromCharCode(65+i)+'</span><span>'+e(o.text)+'</span></button>').join('')+'</div>'+(guess?'<div class="x-feedback '+(guess.valid?'right':'wrong')+'" role="status"><strong>'+(guess.valid?'Boa leitura: observação, hipótese e contexto.':'Ainda há um salto na conclusão.')+'</strong><p>'+e(guess.why)+'</p></div><div class="x-feedback-action"><button type="button" class="button '+(guess.valid?'':'secondary')+'" data-atelier-'+(guess.valid?'finish':'retry')+'>'+(guess.valid?'Guardar esta descoberta →':'Tentar uma nova leitura')+'</button></div>':'')+'</div></div></section>';
}
export function atelierPage(){
 return '<div class="container x-page"><header class="page-intro x-intro"><div class="breadcrumb"><a href="#/praticas">Práticas</a><span>/</span>Ateliê dos Símbolos</div><span class="eyebrow">EXPERIÊNCIA 02 · OBSERVAR / INTERPRETAR</span><h1>Ateliê<br><em>dos Símbolos.</em></h1><p class="lead">Uma oficina de imagens, indícios e perguntas. Aprenda a notar o que outras leituras rápidas deixam passar.</p><div class="x-intro-meta"><span>3 cartas · 9 pontos visuais</span><span>Escolhas explicadas</span><span>Sem arrastar</span></div></header><div id="atelier-root" aria-label="Jogo Ateliê dos Símbolos"></div><aside class="x-game-footnote"><strong>Sobre o método:</strong> imagens do Rider-Waite-Smith de Pamela Colman Smith. As propostas de observar gestos, cenas e relações dialogam com Rachel Pollack em <em>Setenta e oito graus de sabedoria</em>, capítulos iniciais. Os nove detalhes, situações e desafios são atividades didáticas próprias do ARCANA. Não prevê resultados.</aside></div>';
}
export function renderAtelier(){
 const root=document.getElementById('atelier-root');
 if(!root)return;
 root.innerHTML=state.phase==='inspect'?inspect():state.phase==='connect'?bridge():choosing();
}
function transition(){
 save();renderAtelier();
 document.querySelector('#atelier-root [data-x-focus]')?.focus({preventScroll:true});
}
export function handleAtelierClick(target){
 const start=target.closest?.('[data-atelier-start]');
 const point=target.closest?.('[data-atelier-point]');
 const bridgeBtn=target.closest?.('[data-atelier-bridge]');
 const answer=target.closest?.('[data-atelier-answer]');
 const retry=target.closest?.('[data-atelier-retry]');
 const finish=target.closest?.('[data-atelier-finish]');
 const reset=target.closest?.('[data-atelier-reset]');
 if(![start,point,bridgeBtn,answer,retry,finish,reset].some(Boolean))return false;
 if(start){state=atelierChoose(state,start.dataset.atelierStart);clearTransient();transition();}
 else if(point&&state.phase==='inspect'){
  activePoint=point.dataset.atelierPoint;
  state=atelierVisit(state,activePoint);
  save();renderAtelier();
  document.querySelector('.x-evidence-panel')?.scrollIntoView?.({block:'nearest',behavior:'auto'});
 }else if(bridgeBtn&&state.phase==='inspect'&&state.seen.length===3){state.phase='connect';clearTransient();transition();}
 else if(answer&&state.phase==='connect'&&answerIndex<0){
  const n=Number(answer.dataset.atelierAnswer);if(Number.isInteger(n)&&n>=0&&n<current().bridge.options.length){answerIndex=n;renderAtelier();}
 }else if(retry){answerIndex=-1;renderAtelier();}
 else if(finish&&state.phase==='connect'&&current().bridge.options[answerIndex]?.valid){state=atelierComplete(state);clearTransient();transition();}
 else if(reset){state=initialAtelier();clearTransient();transition();}
 return true;
}
export function atelierSnapshot(){return JSON.parse(JSON.stringify(state));}
