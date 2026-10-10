import {cards} from '../data/cards.js';
import {diamondContent as lesson} from '../data/diamondContent.js';
import {positions,cardSlugs,emptyDiamond,normalizedDiamond,placeCard,clearSlot,allPlaced,gradeBoard,evaluateOption} from './diamondLogic.js';
import {cardImage,escapeHTML as esc} from '../ui/templates.js';

const key='arcana-diamond-v1';
const bySlug=slug=>cards.find(c=>c.slug===slug);
const saved=()=>{
 try {return normalizedDiamond(JSON.parse(localStorage.getItem(key)));}catch{return emptyDiamond();}
};
let state=saved();
let feedback=null;

function persist(){
 try{localStorage.setItem(key,JSON.stringify(state));}catch{}
}
function focusAfter(selector){
 const el=document.querySelector(selector);
 if(el){try{el.focus({preventScroll:true});}catch{el.focus();}}
}
function goToPhase(){
 feedback=null;state.selected=null;state.checked=false;state.axisChoice=null;state.scenarioChoice=null;
 persist();renderDiamond();
 const root=document.getElementById('diamond-root');
 if(root){
  const heading=root.querySelector('[data-dia-focus]');
  if(heading)heading.focus({preventScroll:true});
 }
}
const numeral=c=>c.numeral==='0'?'0':c.numeral;
const trayCard=slug=>{
 const c=bySlug(slug);
 const placed=Object.values(state.board).includes(slug);
 const selected=state.selected===slug;
 return '<button type="button" data-dia-pick="'+esc(slug)+'" class="diamond-pick'+(selected?' is-selected':'')+'" aria-pressed="'+selected+'" aria-label="Selecionar '+esc(c.name)+(placed?', carta atualmente posicionada':'')+'"><span class="diamond-pick-image">'+cardImage(c)+'</span><strong>'+esc(c.name)+'</strong><small>'+(placed?'No tabuleiro · tocar para mover': 'Toque para escolher')+'</small></button>';
};
function boardCard(pos,interactive){
 const c=bySlug(state.board[pos]);const label=lesson.placements[pos].name;
 const wrong=interactive&&state.checked&&state.board[pos]!==lesson.placements[pos].card;
 const empty=!c;
 const face=c?'<span class="diamond-slot-art">'+cardImage(c)+'</span><span class="diamond-slot-cardname">'+esc(c.name)+'</span>':'<span class="diamond-slot-plus" aria-hidden="true">+</span><span class="diamond-slot-empty">Escolher posição</span>';
 return '<button type="button" data-dia-slot="'+pos+'" class="diamond-slot '+pos+(empty?' empty':' filled')+(wrong?' is-wrong':'')+'" '+(interactive?'':'disabled')+' aria-label="'+esc(label)+': '+(c?esc(c.name):'posição vazia')+(interactive?'. Toque para colocar a carta selecionada ou retirar esta carta.':'')+'"><span class="diamond-slot-title">'+esc(label)+'</span>'+face+'</button>';
}
function gameBoard(interactive=true){
 return '<div class="diamond-board" role="group" aria-label="Diamante de quatro cartas. Topo, esquerda, direita e base."><div class="diamond-board-lines" aria-hidden="true"></div>'
  +boardCard('top',interactive)+boardCard('left',interactive)
  +'<div class="diamond-heart" aria-hidden="true"><span class="diamond-heart-shape">✧</span><span>ARCANA</span></div>'
  +boardCard('right',interactive)+boardCard('bottom',interactive)+'</div>';
}
function progress(){
 const current=state.step==='compose'?0:state.step==='axes'?1:2;
 return '<div class="diamond-progress" aria-label="Etapas do jogo">'+lesson.phases.map((p,i)=>'<div class="diamond-progress-item'+(i<current?' is-done':'')+(i===current?' is-active':'')+'"><span class="diamond-progress-count">'+(i<current?'✓':p.number)+'</span><span class="diamond-progress-text"><strong>'+p.name+'</strong><small>'+p.short+'</small></span></div>').join('')+'</div>';
}
function noteBox(html,className=''){
 return '<div class="diamond-message '+className+'" role="status" aria-live="polite">'+html+'</div>';
}
function compose(){
 const g=state.checked?gradeBoard(state.board):null;
 const boardResult=g&&!g.correct?noteBox('<strong>'+g.matched.length+' de 4 posições correspondem ao esquema.</strong><p>Reveja as posições marcadas. Pollack coloca duas figuras em movimento no eixo vertical e duas figuras de postura mais fixa no eixo horizontal.</p>','is-hint'):'';
 const selected=state.selected?'<strong>'+esc(bySlug(state.selected).name)+'</strong> selecionado. Agora toque em uma das quatro posições.':'Toque em uma carta abaixo e depois na posição desejada.';
 return '<section class="diamond-phase"><div class="diamond-phase-heading"><span class="eyebrow">Etapa 01 · Montagem</span><h2 tabindex="-1" data-dia-focus>Recrie o diamante.</h2><p>Pollack organiza estas quatro cartas como uma cruz. Examine as posturas e experimente montá-la como no livro. Não é uma tiragem para prever acontecimentos.</p></div>'
 +'<div class="diamond-composer"><div class="diamond-visual"><div class="diamond-selection" role="status" aria-live="polite">'+selected+'</div>'+gameBoard(true)+'<p class="diamond-board-caption">As posições são tocáveis. Se quiser mover uma carta, selecione-a novamente e toque na nova posição. Para remover, toque em uma carta colocada sem outra selecionada.</p></div>'
 +'<div class="diamond-palette"><div class="diamond-palette-head"><span class="eyebrow">Acervo da atividade</span><h3>As quatro imagens</h3><p>Escolha uma carta de cada vez. O encaixe funciona por toque ou teclado — não é preciso arrastar.</p></div><div class="diamond-picks">'+cardSlugs.map(trayCard).join('')+'</div></div></div>'+boardResult
 +'<div class="diamond-actions"><button class="button" type="button" data-dia-check '+(allPlaced(state.board)?'':'disabled')+'>Conferir o diamante <span class="arrow" aria-hidden="true">→</span></button><button class="button secondary" data-dia-clear type="button">Limpar posições</button></div></section>';
}
function fixedCards(){
 return '<div class="diamond-minirow">'+cardSlugs.map(slug=>{const c=bySlug(slug);return '<div class="diamond-mini-card">'+cardImage(c)+'<span>'+esc(c.name)+'</span></div>';}).join('')+'</div>';
}
function choiceButtons(options,selected,dataAttr){
 return '<div class="diamond-choices" role="group" aria-label="Alternativas">'+options.map((o,i)=>{
  const isChosen=o.id===selected;
  return '<button type="button" '+dataAttr+'="'+esc(o.id)+'" class="diamond-choice'+(isChosen?' is-selected':'')+'" aria-pressed="'+isChosen+'" '+(selected?'aria-disabled="true"':'')+'><span class="diamond-choice-num">'+String(i+1).padStart(2,'0')+'</span><span>'+esc(o.text)+'</span></button>';
 }).join('')+'</div>';
}
function optionsFeedback(options,choice,continueAction,continueLabel){
 if(!choice)return '';
 const result=evaluateOption(options,choice);
 const positive=result?.correct;
 return noteBox('<strong>'+(positive?'Leitura fundamentada.':'Vale reconsiderar.')+'</strong><p>'+esc(result?.explanation||'')+'</p>','is-'+(positive?'success':'hint'))+'<div class="diamond-actions"><button class="button'+(positive?'':' secondary')+'" type="button" '+(positive?continueAction:'data-dia-retry')+'>'+(positive?continueLabel:'Tentar outra interpretação')+' <span aria-hidden="true">→</span></button></div>';
}
function axes(){
 const a=lesson.axes[state.axisIndex];
 const sentence=state.axisIndex===0?'Observe a linha que vai do início das possibilidades à imagem de integração.':'Agora observe a linha que liga o Mago à Sacerdotisa. Compare as posturas e a composição.';
 return '<section class="diamond-phase"><div class="diamond-phase-heading"><span class="eyebrow">Etapa 02 · Relações · '+(state.axisIndex+1)+' de 2</span><h2 tabindex="-1" data-dia-focus>O que une as figuras?</h2><p>'+esc(sentence)+'</p></div>'
 +'<div class="diamond-axes-layout"><div class="diamond-axes-art"><div class="diamond-axis-label">'+(state.axisIndex===0?'↕ Linha vertical: 0 e XXI':'↔ Linha horizontal: I e II')+'</div>'+fixedCards()+'<p>Na proposta da autora, o desenho do diamante é uma ferramenta de comparação, não uma lei universal sobre pessoas e destinos.</p></div><div class="diamond-question"><span class="eyebrow">'+esc(a.title)+'</span><h3>'+esc(a.question)+'</h3>'+choiceButtons(a.options,state.axisChoice,'data-dia-axis')+optionsFeedback(a.options,state.axisChoice,'data-dia-axis-next',state.axisIndex===0?'Explorar o segundo eixo':'Ir à interpretação')+'</div></div></section>';
}
function scenario(){
 const q=lesson.scenario;
 const correct=state.scenarioChoice?evaluateOption(q.options,state.scenarioChoice)?.correct:false;
 return '<section class="diamond-phase"><div class="diamond-phase-heading"><span class="eyebrow">Etapa 03 · Síntese</span><h2 tabindex="-1" data-dia-focus>Um sentido começa numa pergunta.</h2><p>Coloque os contrastes do diamante em diálogo com uma situação concreta. A atividade avalia a coerência da justificativa, não uma previsão.</p></div>'
 +'<div class="diamond-story"><div class="diamond-story-context"><span class="eyebrow">Cena de estudo · fictícia</span><h3>'+esc(q.heading)+'</h3><p>'+esc(q.situation)+'</p>'+fixedCards()+'</div><div class="diamond-question"><h3>'+esc(q.question)+'</h3>'+choiceButtons(q.options,state.scenarioChoice,'data-dia-scenario')+optionsFeedback(q.options,state.scenarioChoice,'data-dia-scenario-next','Preparar minha síntese')+'</div></div>'
 +(correct?'<div class="diamond-reflection"><h3>Sua interpretação, sem gabarito</h3><label for="diamond-reflection">Escreva uma pergunta que ajude essa pessoa a pensar no projeto. Esta anotação é opcional.</label><textarea id="diamond-reflection" rows="4" maxlength="2000" placeholder="Uma questão que eu faria seria…">'+esc(state.reflection)+'</textarea><p class="diamond-save-note">Fica apenas neste navegador. Nenhuma interpretação pessoal será corrigida automaticamente.</p><div class="diamond-rubric"><strong>Ao revisar, verifique se você:</strong><ul>'+q.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div></div>':'')+'</section>';
}
function completed(){
 const notes=state.reflection.trim();
 return '<section class="diamond-result"><div class="diamond-result-mark" aria-hidden="true">✦</div><span class="eyebrow">Jornada concluída · ARCANA</span><h2 tabindex="-1" data-dia-focus>O diamante ganhou sentido.</h2><p>Você organizou quatro imagens, investigou dois eixos e construiu uma interpretação que não depende de promessas sobre o futuro.</p>'
 +'<div class="diamond-takeaways"><article><strong>01</strong><span>Composição visual</span><p>Você reconstruiu o esquema proposto por Rachel Pollack.</p></article><article><strong>02</strong><span>Comparação</span><p>Você distinguiu unidade, dualidade e relações entre posturas.</p></article><article><strong>03</strong><span>Interpretação</span><p>Você preferiu uma hipótese contextualizada a uma previsão.</p></article></div>'
 +(notes?'<div class="diamond-user-note"><span class="eyebrow">Seu registro</span><p>'+esc(notes)+'</p></div>':'')
 +'<p class="diamond-result-caution">Conclusão deste exercício não equivale a certificação profissional. Você pode refazer e comparar outras respostas.</p><div class="diamond-actions"><a class="button" href="#/atlas">Revisitar o Atlas →</a><button class="button secondary" data-dia-reset type="button">Jogar novamente</button><a class="text-link" href="#/praticas">Voltar às práticas</a></div></section>';
}

export function practicesHub(){
 const base=bySlug('o-louco');
 const world=bySlug('o-mundo');
 return '<div class="container"><header class="page-intro practices-intro"><span class="eyebrow">Laboratório de experiências</span><h1>Conhecer também é <em>experimentar.</em></h1><p class="lead">Aqui as cartas deixam de ser uma lista para decorar. Os jogos propõem escolhas, relações e descobertas — sempre com uma explicação para cada resultado.</p></header>'
 +'<section class="practices-feature"><div class="practices-feature-art"><div class="practice-floating-card one">'+cardImage(base)+'</div><div class="practice-floating-card two">'+cardImage(world)+'</div><div class="practices-feature-seal" aria-hidden="true">◇</div></div><div class="practices-feature-copy"><span class="eyebrow">Jogo 01 · Disponível agora</span><h2>O Diamante<br>dos Arcanos.</h2><p>Reorganize quatro cartas segundo o esquema de Rachel Pollack, descubra relações entre elas e pratique uma leitura contextualizada em três fases.</p><div class="practices-feature-tags"><span>3 etapas</span><span>10–15 minutos</span><span>Sem arrastar</span></div><a class="button" href="#/praticas/diamante">Entrar no jogo <span aria-hidden="true">→</span></a></div></section>'
 +'<div class="section-head practices-more-heading"><div><span class="eyebrow">Experiências futuras</span><h2>Um laboratório em expansão.</h2></div><p>Os próximos jogos serão implementados por etapas, com conteúdo e feedback fundamentados.</p></div><div class="feature-grid"><article class="feature"><span class="ordinal">02 / Planejado</span><h3>Fábrica de símbolos</h3><p>Investigue como detalhes visuais alteram as possibilidades de uma carta.</p><span class="feature-end">Em desenvolvimento</span></article><article class="feature"><span class="ordinal">03 / Planejado</span><h3>Seis caminhos</h3><p>Compare a organização dos Arcanos Maiores proposta por Nei Naiff.</p><span class="feature-end">Em desenvolvimento</span></article><article class="feature"><span class="ordinal">04 / Planejado</span><h3>Mesa de leitura</h3><p>Construa interpretações em tiragens guiadas com critérios explícitos.</p><span class="feature-end">Em desenvolvimento</span></article></div></div>';
}
export function diamondGamePage(){
 return '<div class="container"><div class="page-intro diamond-intro"><div class="breadcrumb"><a href="#/praticas">Práticas</a> <span aria-hidden="true">/</span> Diamante dos Arcanos</div><span class="eyebrow diamond-label">Jornada interativa · Leitura de imagens</span><h1>O Diamante<br><em>dos Arcanos.</em></h1><p class="lead">'+esc(lesson.subtitle)+' Reconstrua a composição, observe os contrastes e experimente formular hipóteses.</p><div class="diamond-meta"><span>⏱ Aproximadamente 10–15 min</span><span>◌ 3 etapas</span><span>◇ Salvo neste navegador</span></div></div><div class="diamond-game-shell">'+progress()+'<div id="diamond-root" class="diamond-root" aria-label="Atividade Diamante dos Arcanos"></div></div><footer class="diamond-attribution"><strong>Nota de método.</strong> Atividade original inspirada na tiragem de quatro cartas proposta por Rachel Pollack em <em>Setenta e oito graus de sabedoria</em>, capítulo 1 (pp. 31–33 da edição brasileira; PDF de trabalho pp. 32–34). O arranjo tem valor simbólico e didático; não há pretensão de prever acontecimentos. <a href="#/aula/primeiro-olhar">Retomar a aula de observação →</a></footer></div>';
}
export function renderDiamond(){
 const root=document.getElementById('diamond-root');if(!root)return;
 root.innerHTML=state.step==='compose'?compose():state.step==='axes'?axes():state.step==='scenario'?scenario():completed();
}
export function handleDiamondClick(target){
 const pick=target.closest('[data-dia-pick]');const slot=target.closest('[data-dia-slot]');
 const check=target.closest('[data-dia-check]');const clear=target.closest('[data-dia-clear]');
 const axis=target.closest('[data-dia-axis]'),axisNext=target.closest('[data-dia-axis-next]');
 const scenario=target.closest('[data-dia-scenario]'),scenarioNext=target.closest('[data-dia-scenario-next]');
 const retry=target.closest('[data-dia-retry]'),reset=target.closest('[data-dia-reset]');
 if(!pick&&!slot&&!check&&!clear&&!axis&&!axisNext&&!scenario&&!scenarioNext&&!retry&&!reset)return false;
 if(pick&&state.step==='compose'){
  state.selected=pick.dataset.diaPick===state.selected?null:pick.dataset.diaPick;
  state.checked=false;persist();renderDiamond();focusAfter('[data-dia-pick="'+(state.selected||pick.dataset.diaPick)+'"]');
 }else if(slot&&state.step==='compose'){
  const pos=slot.dataset.diaSlot;
  if(state.selected){state.board=placeCard(state.board,pos,state.selected);state.selected=null;}
  else{state.board=clearSlot(state.board,pos);}
  state.checked=false;persist();renderDiamond();focusAfter('[data-dia-slot="'+pos+'"]');
 }else if(clear&&state.step==='compose'){state.board=emptyDiamond().board;state.selected=null;state.checked=false;persist();renderDiamond();focusAfter('[data-dia-pick="o-louco"]');}
 else if(check&&state.step==='compose'&&allPlaced(state.board)){
  const grade=gradeBoard(state.board);
  if(grade.correct){state.step='axes';state.axisIndex=0;goToPhase();}
  else{state.checked=true;persist();renderDiamond();focusAfter('[data-dia-check]');}
 }else if(axis&&state.step==='axes'&&!state.axisChoice){
  state.axisChoice=axis.dataset.diaAxis;renderDiamond();focusAfter('[data-dia-axis="'+state.axisChoice+'"]');
 }else if(axisNext&&state.step==='axes'){
  const item=lesson.axes[state.axisIndex];
  if(evaluateOption(item.options,state.axisChoice)?.correct){
   if(state.axisIndex===0){state.axisIndex=1;state.axisChoice=null;}
   else{state.step='scenario';}
   goToPhase();
  }
 }else if(scenario&&state.step==='scenario'&&!state.scenarioChoice){
  state.scenarioChoice=scenario.dataset.diaScenario;renderDiamond();focusAfter('[data-dia-scenario="'+state.scenarioChoice+'"]');
 }else if(scenarioNext&&state.step==='scenario'){
  if(evaluateOption(lesson.scenario.options,state.scenarioChoice)?.correct){state.step='complete';state.completed=true;goToPhase();}
 }else if(retry){
  if(state.step==='axes')state.axisChoice=null;
  if(state.step==='scenario')state.scenarioChoice=null;
  renderDiamond();focusAfter('.diamond-choice');
 }else if(reset){state=emptyDiamond();feedback=null;persist();goToPhase();}
 return true;
}
export function handleDiamondInput(target){
 if(target.id!=='diamond-reflection')return false;
 state.reflection=target.value.slice(0,2000);persist();return true;
}
export function getDiamondSnapshot(){return JSON.parse(JSON.stringify(state));}
