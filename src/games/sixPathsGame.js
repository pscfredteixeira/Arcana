import {sixPaths,sixPathsSynthesis,PATHS_KEY} from './explorationsData.js';
import {initialJourney,normalizeJourney,advanceJourney,finishJourney} from './explorationsLogic.js';
import {cards} from '../data/cards.js';
import {cardImage,escapeHTML as e} from '../ui/templates.js';

const bySlug=new Map(cards.map(c=>[c.slug,c]));
let state=(()=>{try{return normalizeJourney(JSON.parse(localStorage.getItem(PATHS_KEY)));}catch{return initialJourney();}})();
let chosen=null;
const persist=()=>{try{localStorage.setItem(PATHS_KEY,JSON.stringify(state));}catch{}};
const clear=()=>chosen=null;
function routeMap(){
 return '<div class="six-map" role="list" aria-label="Mapa das seis etapas">'+sixPaths.map((p,i)=>'<div role="listitem" class="six-map-node '+(i<state.step?'done':i===state.step?'current':'locked')+'" aria-current="'+(i===state.step?'step':'false')+'"><span class="six-map-node-number">'+(i<state.step?'✓':String(i+1).padStart(2,'0'))+'</span><span class="six-map-node-name">'+e(p.name)+'</span><small>'+e(p.range)+'</small></div>').join('')+'</div>';
}
function passage(i){
 const p=sixPaths[i];
 return '<div class="six-passage"><span class="eyebrow">ESTAÇÃO '+String(i+1).padStart(2,'0')+' DE 06</span><div class="six-passage-frame"><span>'+e(p.range)+'</span><h2 tabindex="-1" data-six-focus>'+e(p.name)+'</h2><p>'+e(p.subtitle)+'</p></div><div class="six-waymark" aria-hidden="true">✦</div><p class="six-passage-description">'+e(p.description)+'</p><p class="six-passage-question">'+e(p.question)+'</p></div>';
}
function cardChoices(i){
 const p=sixPaths[i];
 const picked=p.options[chosen];
 return '<div class="six-challenge"><span class="eyebrow">ENCONTRE A CARTA-SÍNTESE</span><h3>Qual dessas imagens pertence ao caminho de '+e(p.name)+'?</h3><p>Selecione a carta pela imagem ou pelo nome. A disposição dos caminhos é uma proposta específica de Nei Naiff.</p><div class="six-card-choices" role="group" aria-label="Escolher arcano para esta estação">'+p.options.map((slug,n)=>{
  const card=bySlug.get(slug);
  if(!card)return '';
  return '<button type="button" data-six-pick="'+n+'" class="six-card-option '+(chosen===n?(slug===p.representative?'right':'wrong'):'')+'" '+(chosen!==null?'disabled':'')+'><span class="six-card-art">'+cardImage(card)+'</span><span class="six-card-index">'+e(card.numeral)+'</span><strong>'+e(card.name)+'</strong></button>';
 }).join('')+'</div>'+(picked?'<div class="six-explain '+(picked===p.representative?'right':'wrong')+'" role="status"><strong>'+(picked===p.representative?'Uma correspondência encontrada.':'Observe a posição na sequência.')+'</strong><p>'+(picked===p.representative?e(p.description):'Esta imagem pertence a outra faixa na organização proposta por Naiff. Compare os números e tente novamente.')+'</p></div><div class="six-action"><button type="button" class="button '+(picked===p.representative?'':'secondary')+'" data-six-'+(picked===p.representative?'next':'retry')+'>'+(picked===p.representative?(state.step===5?'Reunir os seis caminhos':'Desbloquear próxima estação'):'Tentar outra imagem')+' →</button></div>':'')+'</div>';
}
function station(){
 return '<div class="six-station"><div class="six-station-copy">'+passage(state.step)+'</div><div class="six-station-game">'+cardChoices(state.step)+'</div></div>';
}
function lastChoice(){
 const picked=sixPathsSynthesis.options[chosen];
 return '<div class="six-synthesis"><span class="eyebrow">A ÚLTIMA DESCOBERTA</span><h2 tabindex="-1" data-six-focus>O caminho é um mapa, não uma sentença.</h2><p>Você percorreu seis grupos dos Arcanos Maiores. Antes de concluir, experimente distinguir a classificação de Naiff de uma previsão sobre a vida de alguém.</p><div class="six-synthesis-gallery">'+sixPaths.map(p=>{const c=bySlug.get(p.representative);return '<div class="six-mini-path"><span>'+e(p.name)+'</span>'+cardImage(c)+'</div>';}).join('')+'</div><h3>'+e(sixPathsSynthesis.prompt)+'</h3><div class="six-last-choices" role="group" aria-label="Síntese dos seis caminhos">'+sixPathsSynthesis.options.map((o,i)=>'<button type="button" data-six-synthesis="'+i+'" '+(chosen!==null?'disabled':'')+' class="'+(chosen===i?(o.valid?'right':'wrong'):'')+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+e(o.text)+'</button>').join('')+'</div>'+(picked?'<div class="six-explain '+(picked.valid?'right':'wrong')+'" role="status"><strong>'+(picked.valid?'Você preservou o método e seus limites.':'Esta conclusão é mais rígida que o método permite.')+'</strong><p>'+e(picked.why)+'</p></div><button type="button" class="button" data-six-'+(picked.valid?'finish':'retry')+'>'+(picked.valid?'Concluir o percurso':'Reconsiderar')+' →</button>':'')+'</div>';
}
function finished(){
 return '<section class="six-finished"><div class="six-finished-orbit" aria-hidden="true">✶</div><span class="eyebrow">SEIS ESTAÇÕES · UM NOVO OLHAR</span><h2 tabindex="-1" data-six-focus>O mapa está aberto.</h2><p>Você percorreu Vontade, Livre-arbítrio, Prazer, Dor, Esperança e Evolução como grupos de estudo de Nei Naiff. Cada nome é uma escolha metodológica, não uma previsão sobre sua vida.</p><div class="six-finished-summary">'+sixPaths.map((p,i)=>'<article><span>'+String(i+1).padStart(2,'0')+'</span><div><strong>'+e(p.name)+'</strong><small>'+e(p.range)+' · '+e(p.subtitle)+'</small></div></article>').join('')+'</div><div class="six-finished-actions"><button type="button" class="button secondary" data-six-reset>Refazer a jornada</button><a class="button" href="#/aula/mapa-78-cartas">Revisitar o curso →</a></div></section>';
}
export function sixPathsPage(){
 return '<div class="container six-page"><header class="page-intro six-intro"><div class="breadcrumb"><a href="#/praticas">Práticas</a><span>/</span>Seis Caminhos</div><span class="eyebrow">EXPERIÊNCIA 03 · CAMINHOS DOS ARCANOS</span><h1>Os Seis<br><em>Caminhos.</em></h1><p class="lead">Uma expedição visual pelos Arcanos Maiores, inspirada na organização de Nei Naiff. Encontre a imagem de cada estação e descubra a lógica do percurso.</p><div class="x-intro-meta"><span>6 estações + síntese</span><span>Cartas em destaque</span><span>Seu caminho é salvo</span></div></header>'+routeMap()+'<div id="six-root" aria-label="Jogo Seis Caminhos"></div><aside class="x-game-footnote"><strong>Fonte do mapa:</strong> Nei Naiff, <em>Curso completo de tarô</em>, lições 6 a 11; PDFs de estudo pp. 47, 59, 68, 77, 89 e 93. A distribuição em estações, desafios e feedback é didática e autoral do ARCANA. Não é uma previsão de acontecimentos pessoais. A numeração RWS de Força (VIII) e Justiça (XI) pode diferir de tradições empregadas por outros autores.</aside></div>';
}
export function renderSixPaths(){
 const root=document.getElementById('six-root');
 if(!root)return;
 root.innerHTML=state.phase==='station'?station():state.phase==='synthesis'?lastChoice():finished();
 // Retain the map's progress visual during a question transition.
 const map=document.querySelector('.six-map');
 if(map)map.outerHTML=routeMap();
}
function stepChange(){
 clear();persist();renderSixPaths();
 document.querySelector('#six-root [data-six-focus]')?.focus({preventScroll:true});
}
export function handleSixPathsClick(target){
 const pick=target.closest?.('[data-six-pick]');
 const next=target.closest?.('[data-six-next]');
 const retry=target.closest?.('[data-six-retry]');
 const synth=target.closest?.('[data-six-synthesis]');
 const finish=target.closest?.('[data-six-finish]');
 const reset=target.closest?.('[data-six-reset]');
 if(![pick,next,retry,synth,finish,reset].some(Boolean))return false;
 if(pick&&state.phase==='station'&&chosen===null){
  const n=Number(pick.dataset.sixPick);
  if(Number.isInteger(n)&&n>=0&&n<sixPaths[state.step].options.length){chosen=n;renderSixPaths();}
 }else if(retry){chosen=null;renderSixPaths();}
 else if(next&&state.phase==='station'&&sixPaths[state.step].options[chosen]===sixPaths[state.step].representative){state=advanceJourney(state,true);stepChange();}
 else if(synth&&state.phase==='synthesis'&&chosen===null){
  const n=Number(synth.dataset.sixSynthesis);
  if(Number.isInteger(n)&&n>=0&&n<sixPathsSynthesis.options.length){chosen=n;renderSixPaths();}
 }else if(finish&&state.phase==='synthesis'&&sixPathsSynthesis.options[chosen]?.valid){state=finishJourney(state,true);stepChange();}
 else if(reset){state=initialJourney();stepChange();}
 return true;
}
export function sixPathsSnapshot(){return JSON.parse(JSON.stringify(state));}
