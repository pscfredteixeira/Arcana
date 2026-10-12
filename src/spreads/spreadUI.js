import {learningScaffold} from '../games/learningScaffolds.js';
import {getBeginnerMeaning} from '../data/beginnerMeanings.js';
import {cards} from '../data/cards.js';
import {spreads} from '../data/spreadDefinitions.js';
import {freshReading,normalizeReading,drawReading,revealAt,allRevealed,enterReview,reviseNotes,archiveReading,normalizeArchive} from './spreadLogic.js';
import {cardImage,escapeHTML as esc} from '../ui/templates.js';

const sessionKey='arcana-spread-session-v1';
const historyKey='arcana-spread-archive-v1';
const allSlugs=cards.map(c=>c.slug);
const bySlug=new Map(cards.map(c=>[c.slug,c]));
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
let session=normalizeReading(read(sessionKey,null),allSlugs);
let history=normalizeArchive(read(historyKey,[]),allSlugs);
let resetPending=false;
let deletePending=null;
let message='';
const saveSession=()=>write(sessionKey,session);
const saveHistory=()=>write(historyKey,history);
function randomUnit(){
 if(globalThis.crypto?.getRandomValues){
  const x=new Uint32Array(1);globalThis.crypto.getRandomValues(x);return x[0]/4294967296;
 }
 return Math.random();
}
const current=()=>spreads[session.spreadId]||spreads.tres;
function cardBack(){
 return '<div class="spread-back" aria-hidden="true"><div class="spread-back-frame"><span class="spread-back-emblem">◇</span><span class="spread-back-label">ARCANA</span><span class="spread-back-dots">✧ · ✧</span></div></div>';
}
function intro(){
 return '<header class="page-intro spread-page-intro"><div class="breadcrumb"><a href="#/praticas">Práticas</a><span>/</span>Mesa de Tiragens</div><span class="eyebrow">Laboratório de interpretação</span><h1>Uma mesa para<br><em>pensar com as cartas.</em></h1><p class="lead">Escolha uma disposição, revele as imagens e construa uma leitura passo a passo. As cartas abrem perguntas; não determinam o futuro.</p></header>';
}
function setup(){
 const chosen=current();
 const mini=cards.slice(0,3);
 return '<section class="spread-setup"><div class="spread-intro-art"><div class="spread-intro-art-disc"></div><div class="spread-intro-art-cards">'+mini.map((c,i)=>'<div class="spread-intro-art-card art-'+i+'">'+cardImage(c)+'</div>').join('')+'</div><span class="spread-art-caption">Observar · Relacionar · Interpretar</span></div>'
 +'<div class="spread-setup-content"><span class="eyebrow">01 / Preparação</span><h2>Primeiro, escolha o seu percurso.</h2>'+learningScaffold({title:'O que é uma tiragem?',explanation:'Uma tiragem é um exercício com cartas em lugares diferentes. Cada lugar representa uma pergunta, e você lê o significado da carta pensando nessa pergunta.',example:'Se uma posição pergunta “O que já tenho?”, uma carta sobre trabalho pode levar você a listar recursos disponíveis.',hint:'Não precisa acreditar em previsão. Comece pelo modelo de três cartas, faça uma pergunta simples e revele uma imagem por vez.'})+'<p>Uma tiragem é uma maneira de organizar perguntas em posições. Aqui usamos modelos didáticos originais, não uma previsão automática de acontecimentos.</p>'
 +'<div class="spread-patterns" role="group" aria-label="Escolha a disposição">'+Object.values(spreads).map(p=>'<button type="button" class="spread-pattern'+(session.spreadId===p.id?' selected':'')+'" data-spread-pattern="'+p.id+'" aria-pressed="'+(session.spreadId===p.id)+'"><span class="spread-pattern-number">'+p.count.toString().padStart(2,'0')+'</span><strong>'+esc(p.title)+'</strong><span>'+esc(p.subtitle)+'</span><small>'+esc(p.estimated)+' · '+p.count+' cartas</small></button>').join('')+'</div>'
 +'<div class="spread-config"><div class="spread-config-label"><strong>Quais cartas entrarão na mesa?</strong><p>Os 22 Arcanos Maiores ou todo o baralho de 78 cartas.</p></div><div class="spread-deck-options" role="group" aria-label="Baralho da prática"><button type="button" data-spread-deck="all" aria-pressed="'+(session.deck==='all')+'">78 cartas</button><button type="button" data-spread-deck="major" aria-pressed="'+(session.deck==='major')+'">22 Maiores</button></div></div>'
 +'<label class="spread-question-label" for="spread-question"><strong>Qual pergunta você quer investigar?</strong><span>Opcional. Prefira perguntas abertas, como “O que preciso considerar antes de começar este projeto?”.</span></label><textarea id="spread-question" rows="3" maxlength="500" placeholder="O que posso observar sobre…">'+esc(session.question)+'</textarea>'
 +'<p class="spread-privacy">Seu texto será guardado apenas neste navegador. Evite registrar informações sensíveis.</p><div class="spread-actions"><button class="button" data-spread-deal type="button">Preparar '+chosen.count+' cartas <span aria-hidden="true">→</span></button><a href="#/praticas" class="button secondary">Voltar às práticas</a></div></div></section>';
}
function cardSlot(pos,i){
 const slug=session.drawn[i],c=bySlug.get(slug);
 const visible=session.revealed[i];
 const selected=session.selected===i;
 return '<button class="spread-slot '+(visible?'is-revealed':'is-hidden')+(selected?' is-selected':'')+'" type="button" data-spread-slot="'+i+'" aria-pressed="'+selected+'" aria-label="Posição '+(i+1)+': '+esc(pos.name)+'. '+(visible?'Carta '+esc(c?.name||'desconhecida')+'. Exibir estudo.':'Carta fechada, toque para revelar.')+'">'
 +'<span class="spread-slot-index">'+String(i+1).padStart(2,'0')+' · '+esc(pos.name)+'</span><span class="spread-slot-art">'+(visible&&c?cardImage(c):cardBack())+'</span>'
 +'<span class="spread-slot-footer">'+(visible&&c?esc(c.name):'Revelar carta')+'</span></button>';
}
function tableGuidance(){
 const def=current(),idx=session.selected,pos=def.positions[idx],c=bySlug.get(session.drawn[idx]);
 if(!session.revealed[idx])return '<section class="spread-inspector"><span class="eyebrow">Posição '+(idx+1)+' de '+def.count+'</span><h3>'+esc(pos.name)+'</h3><p>'+esc(pos.prompt)+'</p><div class="spread-inspector-empty"><span aria-hidden="true">✧</span><p>Esta carta ainda está fechada. Toque nela ou use o botão “Revelar próxima”.</p><button type="button" data-spread-reveal="'+idx+'" class="button secondary">Revelar esta carta →</button></div></section>';
 return '<section class="spread-inspector" aria-label="Exploração da carta selecionada"><span class="eyebrow">Posição '+(idx+1)+' de '+def.count+'</span><h3>'+esc(pos.name)+' · '+esc(c.name)+'</h3><p class="spread-inspector-question">'+esc(pos.prompt)+'</p><div class="spread-inspector-grid"><div><h4>Primeiro, observe</h4><p>'+esc(c.sight)+'</p></div><div><h4>O que esta carta costuma significar?</h4><p>'+esc(getBeginnerMeaning(c)?.meaning||c.meaning)+'</p><p><strong>Exemplo:</strong> '+esc(getBeginnerMeaning(c)?.example||'Pense numa situação real que tenha relação com essa ideia.')+'</p></div></div>'+learningScaffold({title:'Como escrever minha primeira interpretação?',explanation:'Leia o significado básico da carta e observe o desenho. Depois relacione essas ideias à pergunta desta posição, usando palavras simples.',example:'Se a carta é O Louco e a pergunta é sobre um curso, você pode escrever: “Vejo alguém começando um caminho; isso me faz pensar em estudar e conhecer os riscos”.',hint:'Complete: “Eu vejo ... na carta. Isso me lembra ... . Na minha situação, posso perguntar ...”.'})+'<div class="spread-inspector-callout"><strong>Para refletir</strong><p>'+esc(pos.helper)+'</p></div><label for="spread-position-note"><strong>Meu registro desta posição</strong><span>Associe um detalhe visual a uma hipótese e à questão escolhida.</span></label><textarea id="spread-position-note" data-spread-note="'+esc(pos.id)+'" rows="4" maxlength="1500" placeholder="Vejo… Isso pode sugerir…">'+esc(session.notes[pos.id]||'')+'</textarea><div class="spread-inspector-foot"><span class="spread-privacy">Rascunho salvo neste navegador.</span><a href="#/carta/'+esc(c.slug)+'" class="text-link">Explorar no Atlas ↗</a></div></section>';
}
function table(){
 const def=current();const total=session.revealed.filter(Boolean).length;
 const next=session.revealed.indexOf(false);
 const status=total===def.count?'Todas as imagens estão visíveis. Agora você pode reunir as interpretações.':total===0?'Comece tocando em uma carta fechada.':'Continue revelando as cartas, uma por vez.';
 return '<section class="spread-workspace"><div class="spread-workspace-heading"><span class="eyebrow">02 / Exploração visual</span><h2>'+esc(def.title)+'</h2><p>'+esc(def.summary)+'</p>'+(session.question?'<div class="spread-current-question"><strong>Sua pergunta:</strong> '+esc(session.question)+'</div>':'')+'</div>'
 +'<div class="spread-progress"><span role="status" aria-live="polite">'+total+' de '+def.count+' cartas reveladas</span><div class="spread-progress-track" role="progressbar" aria-valuenow="'+total+'" aria-valuemin="0" aria-valuemax="'+def.count+'" aria-label="Cartas reveladas"><span style="width:'+(100*total/def.count)+'%"></span></div></div>'
 +'<div class="spread-table-surface"><div class="spread-table-header"><span>MESA DE ESTUDO · ARCANA</span><span>'+esc(def.title.toUpperCase())+'</span></div><div class="spread-card-grid '+(def.count===5?'spread-five':'spread-three')+'">'+def.positions.map((pos,i)=>cardSlot(pos,i)).join('')+'</div><div class="spread-table-footer">Cada posição é uma pergunta; cada carta oferece uma imagem para pensar.</div></div>'
 +'<div class="spread-table-tools" aria-label="Controles de revelação"><p role="status" aria-live="polite">'+esc(message||status)+'</p><div class="spread-actions">'+(next>=0?'<button type="button" class="button" data-spread-reveal="'+next+'">Revelar próxima <span aria-hidden="true">→</span></button>':'<button type="button" class="button" data-spread-review>Escrever minha síntese →</button>')+'<button class="button secondary" type="button" data-spread-reset>Nova tiragem</button></div></div>'
 +tableGuidance()+resetConfirmation()+'</section>';
}
function review(){
 const def=current();
 const items=def.positions.map((pos,i)=>{
  const c=bySlug.get(session.drawn[i]);
  return '<article class="spread-review-position"><div class="spread-review-card">'+cardImage(c)+'</div><div class="spread-review-text"><span class="eyebrow">Posição '+String(i+1).padStart(2,'0')+'</span><h3>'+esc(pos.name)+' · '+esc(c.name)+'</h3><p>'+esc(pos.prompt)+'</p><div class="spread-review-tips"><strong>Na imagem:</strong> '+esc(c.sight)+'</div><label for="spread-note-'+esc(pos.id)+'">Sua hipótese e suas observações</label><textarea id="spread-note-'+esc(pos.id)+'" data-spread-note="'+esc(pos.id)+'" rows="3" maxlength="1500" placeholder="Este detalhe me faz pensar em…">'+esc(session.notes[pos.id]||'')+'</textarea></div></article>';
 }).join('');
 const savedNotice=session.savedId?'Esta leitura já está no seu diário local. Se mudar algum texto, salve novamente.':'Você pode guardar a leitura neste navegador. Nenhum texto é enviado ao ARCANA.';
 return '<section class="spread-review"><div class="spread-review-heading"><span class="eyebrow">03 / Interpretação</span><h2>Seu caderno de leitura.</h2>'+learningScaffold({title:'Como juntar as cartas?',explanation:'Agora compare as imagens que você revelou. Anote o que é parecido ou diferente, depois relacione esse contraste com sua pergunta.',example:'Uma carta sobre começar algo e outra sobre trabalho em equipe podem lembrar que um novo projeto precisa tanto de iniciativa quanto de colaboração.',hint:'Se não souber o que escrever, retome a explicação básica de cada carta e tente completar: “Uma carta fala de ... . A outra lembra ... . Juntas, elas me fazem perguntar ...”.'})+'<p>Examine as posições como um conjunto. Descreva primeiro o que vê e só então formule hipóteses. Não há resposta única para a escrita livre.</p>'+(session.question?'<div class="spread-current-question"><strong>Sua pergunta:</strong> '+esc(session.question)+'</div>':'')+'</div>'
 +'<div class="spread-review-list">'+items+'</div><section class="spread-synthesis"><span class="eyebrow">Síntese final</span><h3>O que muda quando as cartas dialogam?</h3><p>Procure uma relação ou um contraste entre pelo menos duas imagens. Termine com uma pergunta aberta ou uma possibilidade de ação.</p><label for="spread-synthesis">Minha síntese</label><textarea id="spread-synthesis" rows="6" maxlength="3000" placeholder="Ao colocar as imagens em relação, observo…">'+esc(session.synthesis)+'</textarea><div class="spread-rubric"><strong>Antes de guardar, confira:</strong><ul><li>Citei pelo menos um detalhe visível de cada carta que usei?</li><li>Separei o que observei da interpretação que proponho?</li><li>Conectei a leitura à questão apresentada?</li><li>Evitei tratar hipóteses simbólicas como previsões certas?</li></ul></div><p class="spread-privacy" aria-live="polite">'+esc(message||savedNotice)+'</p><div class="spread-actions"><button type="button" class="button" data-spread-save>Guardar no meu diário <span aria-hidden="true">→</span></button><button type="button" class="button secondary" data-spread-back>Rever a mesa</button><button type="button" class="button secondary" data-spread-reset>Nova tiragem</button></div></section>'+resetConfirmation()+'</section>';
}
function resetConfirmation(){
 return resetPending?'<div class="spread-confirm" role="alert"><strong>Começar outra tiragem?</strong><p>O rascunho desta mesa será substituído. As leituras que você guardou no diário permanecerão disponíveis.</p><div class="spread-actions"><button class="button" data-spread-reset-confirm>Sim, recomeçar</button><button class="button secondary" data-spread-reset-cancel>Continuar nesta mesa</button></div></div>':'';
}
function formatDate(iso){
 const d=new Date(iso);
 return Number.isFinite(d.valueOf())?d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'}):'Leitura guardada';
}
function journal(){
 if(!history.length)return '<section class="spread-journal" id="diario"><span class="eyebrow">Seu arquivo pessoal</span><h2>Diário de tiragens.</h2><p>Suas leituras salvas aparecerão aqui, neste aparelho. Nenhuma leitura foi registrada ainda.</p></section>';
 return '<section class="spread-journal" id="diario"><div class="section-head"><div><span class="eyebrow">Seu arquivo pessoal</span><h2>Diário de tiragens.</h2></div><p>Até 15 registros neste navegador. Abra um para rever suas observações.</p></div><div class="spread-journal-list">'+history.map((item,index)=>{
  const reading=item.reading,def=spreads[reading.spreadId];
  return '<details class="spread-journal-entry" data-journal-id="'+esc(item.id)+'"><summary><span class="spread-journal-num">'+String(index+1).padStart(2,'0')+'</span><span><strong>'+esc(def.title)+'</strong><small>'+esc(formatDate(item.createdAt))+(reading.question?' · '+esc(reading.question.slice(0,90)):'')+'</small></span><span aria-hidden="true" class="spread-journal-chevron">+</span></summary><div class="spread-journal-body">'+def.positions.map((pos,i)=>'<div class="spread-journal-row"><strong>'+esc(pos.name)+' · '+esc(bySlug.get(reading.drawn[i])?.name||'Carta')+'</strong><p>'+esc(reading.notes[pos.id]||'Sem anotação nesta posição.')+'</p></div>').join('')+'<div class="spread-journal-row"><strong>Síntese</strong><p>'+esc(reading.synthesis||'Sem síntese escrita.')+'</p></div><div class="spread-journal-delete">'+(deletePending===item.id?'<span role="alert">Excluir este registro permanentemente deste navegador?</span> <button type="button" data-spread-delete-confirm="'+esc(item.id)+'">Confirmar exclusão</button> <button type="button" data-spread-delete-cancel>Cancelar</button>':'<button type="button" data-spread-delete="'+esc(item.id)+'">Excluir registro</button>')+'</div></div></details>';
 }).join('')+'</div><p class="spread-privacy">Os registros não sincronizam entre aparelhos. Limpar os dados do navegador pode apagá-los.</p></section>';
}
export function spreadPage(){
 return '<div class="container">'+intro()+'<div id="spread-root" aria-label="Mesa de tiragens"></div><div id="spread-journal-root"></div><div class="spread-attribution"><p><strong>Como estudamos:</strong> o ARCANA usa a iconografia Rider–Waite–Smith e a distinção entre observação e interpretação trabalhada em nossa primeira aula, dialogando com Rachel Pollack e Nei Naiff. As disposições desta mesa foram desenhadas para fins didáticos e <strong>não</strong> são apresentadas como tiragens históricas desses autores.</p><p>Esta ferramenta não substitui orientações médicas, psicológicas, jurídicas ou financeiras.</p></div></div>';
}
export function renderSpread(){
 const root=document.getElementById('spread-root');if(!root)return;
 root.innerHTML=session.phase==='setup'?setup():session.phase==='table'?table():review();
 const j=document.getElementById('spread-journal-root');
 if(j){
  const openIds=Array.from(j.querySelectorAll?.('details.spread-journal-entry[open]')||[]).map(d=>d.dataset.journalId);
  j.innerHTML=journal();
  if(openIds.length)for(const detail of (j.querySelectorAll?.('details.spread-journal-entry')||[])){if(openIds.includes(detail.dataset.journalId))detail.open=true;}
  if(deletePending){const pending=Array.from(j.querySelectorAll?.('details.spread-journal-entry')||[]).find(d=>d.dataset.journalId===deletePending);if(pending)pending.open=true;}
 }
}
export function handleSpreadInput(target){
 if(target.id==='spread-question'){session.question=target.value.slice(0,500);session.savedId=null;saveSession();return true;}
 const note=target.getAttribute?.('data-spread-note');
 if(note){session=reviseNotes(session,note,target.value);message='Seu rascunho foi salvo neste navegador.';saveSession();return true;}
 if(target.id==='spread-synthesis'){session.synthesis=target.value.slice(0,3000);session.savedId=null;message='Síntese salva neste navegador.';saveSession();return true;}
 return false;
}
export function handleSpreadClick(target){
 const pattern=target.closest?.('[data-spread-pattern]');
 const deck=target.closest?.('[data-spread-deck]');
 const deal=target.closest?.('[data-spread-deal]');
 const slot=target.closest?.('[data-spread-slot]');
 const reveal=target.closest?.('[data-spread-reveal]');
 const reviewBtn=target.closest?.('[data-spread-review]');
 const back=target.closest?.('[data-spread-back]');
 const save=target.closest?.('[data-spread-save]');
 const reset=target.closest?.('[data-spread-reset]');
 const yes=target.closest?.('[data-spread-reset-confirm]');
 const no=target.closest?.('[data-spread-reset-cancel]');
 const remove=target.closest?.('[data-spread-delete]');
 const confirmRemove=target.closest?.('[data-spread-delete-confirm]');
 const cancelRemove=target.closest?.('[data-spread-delete-cancel]');
 if(![pattern,deck,deal,slot,reveal,reviewBtn,back,save,reset,yes,no,remove,confirmRemove,cancelRemove].some(Boolean))return false;
 const previouslyRevealed=session.revealed.filter(Boolean).length;
 if(pattern&&session.phase==='setup'){
  const question=session.question,deckSelection=session.deck;
  session=freshReading(pattern.dataset.spreadPattern);session.question=question;session.deck=deckSelection;
 }else if(deck&&session.phase==='setup'){session.deck=deck.dataset.spreadDeck==='major'?'major':'all';}
 else if(deal&&session.phase==='setup'){
  session=drawReading(session,cards,randomUnit);message='As cartas estão distribuídas e fechadas. Toque para revelar a primeira.';
 }else if((slot||reveal)&&session.phase==='table'){
  const index=Number((slot||reveal).dataset.spreadSlot??reveal?.dataset.spreadReveal);
  if(Number.isInteger(index)&&index>=0&&index<session.drawn.length){
   session=revealAt(session,index);
   message=session.revealed.filter(Boolean).length>previouslyRevealed?'Carta revelada. Observe antes de interpretar.':'Posição selecionada. Releia os detalhes.';
  }
 }else if(reviewBtn&&session.phase==='table'){session=enterReview(session);message='Agora construa a síntese relacionando as cartas.';}
 else if(back&&session.phase==='review'){session.phase='table';}
 else if(save&&session.phase==='review'){
  const id=session.savedId||('leitura-'+Date.now().toString(36)+'-'+Math.floor(Math.random()*1000000).toString(36));
  const now=new Date().toISOString();
  history=archiveReading(session,history,id,now);
  session.savedId=id;saveHistory();message='Leitura guardada no diário deste navegador.';
 }else if(reset){resetPending=true;}
 else if(yes){session=freshReading();resetPending=false;message='';}
 else if(no){resetPending=false;}
 else if(remove){deletePending=remove.dataset.spreadDelete;}
 else if(confirmRemove){
  history=history.filter(x=>x.id!==confirmRemove.dataset.spreadDeleteConfirm);
  if(session.savedId===confirmRemove.dataset.spreadDeleteConfirm)session.savedId=null;
  deletePending=null;saveHistory();message='Registro excluído deste navegador.';
 }else if(cancelRemove){deletePending=null;}
 saveSession();renderSpread();
 return true;
}
export function getSpreadSnapshot(){return JSON.parse(JSON.stringify({session,history}));}
