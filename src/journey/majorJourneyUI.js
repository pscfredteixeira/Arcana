import {loadDialogue,dialogueProgress} from '../dialogue/dialogueLogic.js';
import {cards} from '../data/cards.js';
import {getBeginnerMeaning} from '../data/beginnerMeanings.js';
import {accessibleCardProse} from '../data/accessibleCardProse.js';
import {cardImage,escapeHTML as e} from '../ui/templates.js';
import {journeyChapters,journeyOrder,journeyTasks,journeyChapterOf} from './majorJourneyData.js';
import {
 initialMajorJourney,loadMajorJourney,storeMajorJourney,normalizeMajorJourney,
 visitMajor,advanceMajor,chooseMajor,saveMajorNote,majorProgress,maxNoteLength
} from './majorJourneyLogic.js';

const majorBySlug=new Map(cards.filter(c=>c.arcana==='major').map(c=>[c.slug,c]));
const read=()=>{try{return loadMajorJourney(localStorage)}catch{return initialMajorJourney()}};
let notice='';
function save(next){
 try{if(!storeMajorJourney(localStorage,next))notice='Não foi possível salvar o progresso neste aparelho.';}
 catch{notice='Não foi possível salvar o progresso neste aparelho.';}
}
const nextSlug=slug=>journeyOrder[journeyOrder.indexOf(slug)+1]||null;
const previousSlug=slug=>journeyOrder[journeyOrder.indexOf(slug)-1]||null;
const countCompleted=(group,s)=>group.slugs.filter(x=>s.completed.includes(x)).length;
const chapterDescription=chapter=>'<span class="eyebrow">'+e(chapter.eyebrow)+'</span><h3>'+e(chapter.title)+'</h3><p>'+e(chapter.subtitle)+'</p>';

export function majorJourneyHub(){
 const state=read(),progress=majorProgress(state);
 const reviews=dialogueProgress(loadDialogue(localStorage));
 return '<div class="container major-journey"><header class="page-intro journey-header"><div class="breadcrumb"><a href="#/aprender">Aprender</a> / Jornada dos Maiores</div><span class="eyebrow">SPRINT 9 · FORMAÇÃO INTERATIVA</span><h1>Uma jornada por<br><em>22 cartas.</em></h1><p class="lead">Vamos estudar os 22 Arcanos Maiores um a um. Em cada carta você vai observar o desenho, entender o significado, conhecer um exemplo e responder a uma pergunta.</p><p>Você não precisa decorar tudo nem acreditar que as cartas preveem acontecimentos. Esta é uma maneira organizada de aprender os significados e as relações entre as imagens.</p></header>'
 +'<section class="journey-summary" aria-label="Seu progresso na jornada"><div><span class="eyebrow">SEU CAMINHO ATÉ AQUI</span><strong>'+progress.completed+' <small>de 22</small></strong><span>cartas estudadas com exercício concluído</span></div><div class="journey-summary-right"><div class="journey-progress-track" role="progressbar" aria-label="Cartas concluídas" aria-valuenow="'+progress.completed+'" aria-valuemin="0" aria-valuemax="22"><span style="width:'+progress.percent+'%"></span></div><p>'+ (progress.finished?'Você percorreu as 22 cartas. Pode voltar e rever qualquer uma.':'Você pode avançar na ordem sugerida ou abrir uma carta específica. Nada fica bloqueado.') +'</p><a class="button" href="#/jornada/'+(progress.next||'o-louco')+'">'+(progress.finished?'Revisitar O Louco':'Continuar de onde parei')+' →</a></div></section>'
 +'<section class="journey-about"><h2>Como a jornada foi organizada?</h2><p>Começamos pelo Louco, de número zero. Depois estudamos três grupos de sete cartas: I–VII, VIII–XIV e XV–XXI. Essa organização dialoga com uma leitura sequencial estudada por Rachel Pollack. Não significa que a vida de todas as pessoas siga exatamente essas etapas.</p><p>Usamos as imagens Rider–Waite–Smith. Aqui, <strong>A Força é VIII (8) e A Justiça é XI (11)</strong>. Nei Naiff apresenta uma organização diferente em seus seis caminhos, que você poderá comparar em <a href="#/praticas/seis-caminhos">outra atividade</a>.</p></section>'
 +journeyChapters.map((ch,i)=>'<section class="journey-chapter" id="major-chapter-'+e(ch.id)+'"><div class="journey-chapter-header"><div><span class="eyebrow">'+e(ch.eyebrow)+' · '+e(ch.range)+'</span><h2>'+e(ch.title)+'</h2><p>'+e(ch.subtitle)+'</p><blockquote>'+e(ch.question)+'</blockquote></div><span class="journey-chapter-count">'+countCompleted(ch,state)+'/'+ch.slugs.length+' <small>cartas</small></span></div><div class="journey-stop-grid">'+ch.slugs.map(slug=>{
  const c=majorBySlug.get(slug),done=state.completed.includes(slug);
  return '<a class="journey-stop '+(done?'done':'')+'" href="#/jornada/'+e(slug)+'" aria-label="'+e(c.name)+(done?', estudo concluído':'')+'"><span class="journey-stop-art">'+cardImage(c)+'</span><span class="journey-stop-content"><small>'+e(c.numeral)+'</small><strong>'+e(c.name)+'</strong><span class="journey-stop-status">'+(done?'✓ Estudada':'Explorar carta →')+'</span></span></a>';
 }).join('')+'</div><div class="journey-review-link"><div><strong>Revisão deste capítulo: cartas em diálogo</strong><p>Compare duas imagens e resolva situações para ver o que aprendeu. '+(reviews.chapters[i].finished?'Você já concluiu esta revisão.':'Você pode fazê-la no seu ritmo.')+'</p></div><a class="button secondary" href="#/praticas/cartas-em-dialogo/'+e(ch.id)+'">'+(reviews.chapters[i].finished?'Revisitar revisão':'Revisar este capítulo')+' →</a></div></section>').join('')
 +'<footer class="journey-final-note"><p>As explicações e os exercícios desta jornada são textos didáticos originais do ARCANA. Rachel Pollack e Nei Naiff são referências de estudo, não autores de cada frase desta atividade.</p><a href="#/atlas">Consultar todas as cartas no Atlas →</a></footer></div>';
}
const stageBar=(stage)=>'<nav class="journey-stages" aria-label="Etapas desta carta"><span class="'+(stage==='observe'?'active':'')+'">01 · Observar</span><span class="'+(stage==='understand'?'active':'')+'">02 · Entender</span><span class="'+(stage==='practice'?'active':'')+'">03 · Praticar</span></nav>';
const panelObserve=(card,task)=>'<section class="journey-learning-panel"><span class="eyebrow">ETAPA 01 · VEJA A IMAGEM</span><h2>O que você consegue observar?</h2><p>Olhe a carta com calma. Ainda não precisa decidir o que ela significa.</p><div class="journey-focus"><strong>Procure no desenho:</strong><p>'+e(task.focus)+'</p></div><p>Tente dizer com suas palavras o que aparece. Depois você verá como o desenho ajuda a explicar o significado.</p><button type="button" class="button" data-major-stage>Entendi o desenho · Ver a explicação →</button></section>';
const panelUnderstand=(card,task)=>{
 const meaning=getBeginnerMeaning(card),text=accessibleCardProse[card.slug];
 return '<section class="journey-learning-panel"><span class="eyebrow">ETAPA 02 · ENTENDA O SIGNIFICADO</span><h2>O que significa '+e(card.name)+'?</h2><p class="journey-meaning">'+e(meaning?.meaning||card.meaning)+'</p><div class="journey-explain"><strong>Por que esse significado?</strong><p>'+e(task.observation)+'</p><p>'+e(text||card.meaning)+'</p></div><div class="journey-example"><strong>Um exemplo do dia a dia</strong><p>'+e(meaning?.example||'Pense numa situação em que esta ideia pode ajudar.')+'</p></div><p>O significado é uma possibilidade de leitura da imagem, não uma garantia do que vai acontecer.</p><button type="button" class="button" data-major-stage>Agora quero praticar →</button></section>';
};
const panelPractice=(card,task,state)=>{
 const attempts=state.attempts[card.slug]||[],last=attempts.at(-1);
 const done=state.completed.includes(card.slug),selected=Number.isInteger(last)?task.options[last]:null;
 return '<section class="journey-learning-panel journey-practice"><span class="eyebrow">ETAPA 03 · APLIQUE O QUE APRENDEU</span><h2>Agora é sua vez.</h2><p>'+e(task.scenario)+'</p><p class="journey-task-label">Escolha a resposta que melhor relaciona a situação ao significado da carta.</p><div class="journey-answers" role="group" aria-label="Alternativas desta carta">'+task.options.map((option,i)=>{
  const tried=attempts.includes(i);
  return '<button type="button" data-major-choice="'+i+'" '+(done||tried?'disabled':'')+' class="'+(tried?(i===task.answer?'correct':'incorrect'):'')+'"><span>'+String(i+1).padStart(2,'0')+'</span><span>'+e(option)+'</span></button>';
 }).join('')+'</div>'
 +(selected!==null?'<div class="journey-feedback '+(done?'correct':'incorrect')+'" role="status" aria-live="polite"><strong>'+(done?'Você entendeu a relação entre a carta e a situação.':'Ainda não. Vamos olhar a imagem outra vez.')+'</strong><p>'+(done?e(task.why):'A alternativa escolhida não explica a situação usando os elementos principais da carta. Lembre: '+e(task.observation)+' Tente outra resposta.')+'</p></div>':'')
 +(done?'<div class="journey-finished"><span class="eyebrow">CARTA CONCLUÍDA</span><h3>O que esta carta acrescenta à jornada?</h3><p>'+e(task.contrast)+'</p><label for="major-note">Minha descoberta (opcional)</label><textarea id="major-note" data-major-note="'+e(card.slug)+'" maxlength="'+maxNoteLength+'" rows="3" placeholder="Escreva com suas palavras o que aprendeu.">'+e(state.notes[card.slug]||'')+'</textarea><p class="journey-save-note">Sua anotação é salva neste navegador e entra no backup do ARCANA.</p><div class="journey-next-actions"><a class="button" href="#/jornada/'+e(nextSlug(card.slug)||'')+'" '+(!nextSlug(card.slug)?'hidden':'')+'>Ir para a próxima carta →</a><a class="button secondary" href="#/jornada">Voltar ao mapa</a><a class="journey-atlas-link" href="#/carta/'+e(card.slug)+'">Estudar mais no Atlas ↗</a></div>'+(nextSlug(card.slug)?'':'<p><strong>Você chegou ao fim das 22 cartas!</strong> Volte ao mapa para rever o que concluiu.</p>')+'</div>':'')
 +'</section>';
};
function stationMarkup(slug,state){
 const card=majorBySlug.get(slug),task=journeyTasks[slug],ch=journeyChapterOf(slug);
 if(!card||!task||!ch)return '<p>Esta carta não foi encontrada. <a href="#/jornada">Voltar ao mapa</a>.</p>';
 const s=state.current===slug?state:visitMajor(state,slug);
 const progress=majorProgress(s);
 return '<div class="container major-journey journey-station"><div class="journey-station-top"><a href="#/jornada">← Ver as 22 cartas</a><span>'+progress.completed+' de 22 concluídas</span></div><div class="journey-station-heading"><span class="eyebrow">'+e(ch.eyebrow)+' · '+e(ch.title)+'</span><h1 tabindex="-1" data-major-focus>'+e(card.numeral)+' <em>'+e(card.name)+'</em></h1><p>'+e(ch.question)+'</p></div>'+stageBar(s.stage)
 +'<div class="journey-station-grid"><div class="journey-station-image">'+cardImage(card,true)+'<p>Observe os detalhes do baralho Rider–Waite–Smith, ilustrado por Pamela Colman Smith.</p><a href="#/carta/'+e(slug)+'">Ver a ficha completa desta carta ↗</a></div><div class="journey-station-content">'+(s.stage==='observe'?panelObserve(card,task):s.stage==='understand'?panelUnderstand(card,task):panelPractice(card,task,s))+'</div></div><nav class="journey-neighbor-nav" aria-label="Navegar entre cartas">'+(previousSlug(slug)?'<a href="#/jornada/'+e(previousSlug(slug))+'">← '+e(majorBySlug.get(previousSlug(slug)).name)+'</a>':'<span>Primeira carta</span>')+(nextSlug(slug)?'<a href="#/jornada/'+e(nextSlug(slug))+'">'+e(majorBySlug.get(nextSlug(slug)).name)+' →</a>':'<span>Última carta</span>')+'</nav><p class="journey-source">Estudo autoral do ARCANA. Eixo: imagens Rider–Waite–Smith e leitura sequencial inspirada por Rachel Pollack; método de Nei Naiff apresentado separadamente para comparação.</p>'+(notice?'<p role="status">'+e(notice)+'</p>':'')+'</div>';
}
export function majorStationPage(slug){
 if(!majorBySlug.has(slug))return '';
 const state=read();
 return '<div id="major-journey-root" data-major-slug="'+e(slug)+'">'+stationMarkup(slug,state)+'</div>';
}
function redraw(){
 const root=document.getElementById('major-journey-root');
 if(!root)return;
 const slug=root.dataset.majorSlug;
 root.innerHTML=stationMarkup(slug,read());
 // Do not push history or reset scroll; retain the current card's context.
 root.querySelector('[data-major-focus]')?.focus?.({preventScroll:true});
}
export function handleMajorJourneyClick(target){
 const btn=target?.closest?.('[data-major-stage],[data-major-choice]');
 if(!btn)return false;
 const root=document.getElementById('major-journey-root');
 if(!root)return false;
 const slug=root.dataset.majorSlug;
 let s=read();
 if(s.current!==slug)s=visitMajor(s,slug);
 if(btn.hasAttribute('data-major-stage'))s=advanceMajor(s);
 if(btn.hasAttribute('data-major-choice'))s=chooseMajor(s,slug,Number(btn.dataset.majorChoice));
 save(s);redraw();
 return true;
}
export function handleMajorJourneyInput(target){
 if(target?.id!=='major-note')return false;
 const slug=target.dataset.majorNote;
 if(!journeyOrder.includes(slug))return false;
 const s=read();
 if(!s.completed.includes(slug))return false;
 save(saveMajorNote(s,slug,target.value));
 return true;
}
