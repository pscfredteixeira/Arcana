import {trioHubPage,trioScenarioPage,handleTrioClick,handleTrioInput,handleTrioChange} from '../trios/trioUI.js';
import {dialogueHubPage,dialogueChapterPage,handleDialogueClick,handleDialogueInput} from '../dialogue/dialogueUI.js';
import {majorJourneyHub,majorStationPage,handleMajorJourneyClick,handleMajorJourneyInput} from '../journey/majorJourneyUI.js';
import {assessmentPage,renderAssessment,handleAssessmentClick,handleAssessmentInput,handleAssessmentChange} from '../assessment/assessmentUI.js';
import {beginnerGuidePage} from '../ui/beginnerGuide.js';
import {initPWA} from './pwa.js';
import {atelierPage,renderAtelier,handleAtelierClick} from '../games/atelierGame.js';
import {sixPathsPage,renderSixPaths,handleSixPathsClick} from '../games/sixPathsGame.js';
import {extendedLessons,lessonBySlug} from '../lessons/sprint7Lessons.js';
import {expandedLessonPage,renderCoursePractice,handleCourseClick} from '../ui/expandedCourse.js';
import {studyPage,applyStudyPreferences,handleStudyClick,handleStudyFile,renderStudyControl} from '../study/studyUI.js';
import {spreadPage,renderSpread,handleSpreadClick,handleSpreadInput} from '../spreads/spreadUI.js';
import {practicesHub,diamondGamePage,renderDiamond,handleDiamondClick,handleDiamondInput} from '../games/diamondGame.js';
import {atlasPageExpanded,atlasDetailExpanded,handleAtlasChange,handleAtlasClick,closeZoom,resetAtlasScroll} from '../ui/interactiveAtlas.js';
import {fullLessonPage,renderLab,handleLabClick,saveReflection} from '../ui/fullLesson.js';
import {cards,findCard} from '../data/cards.js';
import {siteHeader,siteFooter,homePage,learnPage,lessonPage,atlasPage,atlasCards,detailPage,practicePage,aboutPage,missingPage} from '../ui/templates.js';

const app=document.getElementById('app');
const getHashPath=()=>decodeURIComponent(location.hash.slice(1).split('?')[0]||'/');
const getRoute=()=>{
  const path=getHashPath();
  if(path==='/')return {active:'home',content:homePage(),title:'Início'};
  if(path==='/comece-aqui')return {active:'learn',content:beginnerGuidePage(),title:'Comece aqui'};
  if(path==='/jornada')return {active:'learn',content:majorJourneyHub(),title:'Jornada dos Arcanos Maiores'};
  if(path.startsWith('/jornada/')){const slug=path.slice(9);const content=majorStationPage(slug);if(content)return {active:'learn',content,title:'Jornada dos Arcanos Maiores'};}
  if(path==='/aprender')return {active:'learn',content:learnPage(),title:'Aprender'};
  if(path==='/aula/primeiro-olhar')return {active:'learn',content:fullLessonPage(),title:'A arte de olhar'};
  if(path.startsWith('/aula/')){const lesson=lessonBySlug(path.slice(6));if(lesson)return {active:'learn',content:expandedLessonPage(lesson),title:lesson.title};}
  if(path==='/atlas')return {active:'atlas',content:atlasPageExpanded(),title:'Atlas'};
  if(path==='/praticas/tres-cartas')return {active:'practice',content:trioHubPage(),title:'Três Cartas, Uma História'};
  if(path.startsWith('/praticas/tres-cartas/')){const content=trioScenarioPage(path.slice('/praticas/tres-cartas/'.length));if(content)return {active:'practice',content,title:'Três Cartas, Uma História'};}
  if(path==='/praticas/cartas-em-dialogo')return {active:'practice',content:dialogueHubPage(),title:'Cartas em Diálogo'};
  if(path.startsWith('/praticas/cartas-em-dialogo/')){const content=dialogueChapterPage(path.slice('/praticas/cartas-em-dialogo/'.length));if(content)return {active:'practice',content,title:'Revisão de capítulo'};}
  if(path==='/praticas')return {active:'practice',content:practicesHub(),title:'Práticas'};
  if(path==='/avaliacao')return {active:'learn',content:assessmentPage(),title:'Avaliação de aprendizagem'};
  if(path==='/praticas/diamante')return {active:'practice',content:diamondGamePage(),title:'Diamante dos Arcanos'};
  if(path==='/praticas/mesa')return {active:'practice',content:spreadPage(),title:'Mesa de Tiragens'};
  if(path==='/praticas/atelie')return {active:'practice',content:atelierPage(),title:'Ateliê dos Símbolos'};
  if(path==='/praticas/seis-caminhos')return {active:'practice',content:sixPathsPage(),title:'Seis Caminhos'};
  if(path==='/meu-estudo')return {active:'study',content:studyPage(),title:'Meu Estudo'};
  if(path==='/sobre')return {active:'',content:aboutPage(),title:'Sobre'};
  if(path.startsWith('/carta/')){
    const c=findCard(path.slice(7));
    if(c)return {active:'atlas',content:atlasDetailExpanded(c),title:c.name};
  }
  return {active:'',content:missingPage(),title:'Página não encontrada'};
};
function fontPreference(){
 try{return localStorage.getItem('arcana-font')||'normal'}catch{return 'normal'}
}
function changeFont(size) {
 const options=['small','normal','large','larger'];
 if(!options.includes(size))return;
 document.body.dataset.font=size;
 document.querySelectorAll('[data-font]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.font===size)));
 try{localStorage.setItem('arcana-font',size)}catch{}
}
function updateAtlas(query){
 const normalized=t=>t.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const filtered=cards.filter(c=>normalized([c.name,c.tagline,...c.keywords].join(' ')).includes(normalized(query.trim())));
 const grid=document.querySelector('#atlas-grid'),count=document.querySelector('#atlas-count');
 if(grid)grid.innerHTML=atlasCards(filtered);
 if(count)count.textContent=`${filtered.length} de ${cards.length} cartas disponíveis`;
}
function render(){
 resetAtlasScroll();
 const route=getRoute();
 document.title=`${route.title} — ARCANA`;
 app.innerHTML=siteHeader(route.active)+`<main tabindex="-1" id="main">${route.content}</main>`+siteFooter();
 applyStudyPreferences();
 renderLab();
 renderAssessment();
 renderCoursePractice();
 renderDiamond();
 renderAtelier();
 renderSixPaths();
 renderSpread();
 renderStudyControl();
 window.scrollTo({top:0,left:0,behavior:'auto'});
 document.getElementById('main')?.focus({preventScroll:true});
}
app.addEventListener('input',event=>{
 if(event.target?.id==='atlas-search')handleAtlasChange(event.target);
 if(event.target?.id==='lesson-notes')saveReflection(event.target.value);
 handleDiamondInput(event.target);
 handleSpreadInput(event.target);
 handleAssessmentInput(event.target);
 handleMajorJourneyInput(event.target);
 handleDialogueInput(event.target);
 handleTrioInput(event.target);
});
app.addEventListener('change',event=>{
  handleTrioChange(event.target);
  handleAssessmentChange(event.target);
 if(event.target?.id==='study-import-file')void handleStudyFile(event.target);
});
app.addEventListener('click',event=>{
  if(handleTrioClick(event.target))return;
  if(handleDialogueClick(event.target))return;
  if(handleMajorJourneyClick(event.target))return;
  if(handleAssessmentClick(event.target))return;
 if(handleAtelierClick(event.target))return;
 if(handleSixPathsClick(event.target))return;
 if(handleCourseClick(event.target))return;
 if(handleStudyClick(event.target))return;
 if(handleSpreadClick(event.target))return;
 if(handleDiamondClick(event.target))return;
 if(handleAtlasClick(event.target))return;
 if(handleLabClick(event.target))return;
 const btn=event.target.closest('button[data-font]');
 if(btn){changeFont(btn.dataset.font);return;}
 const anchor=event.target.closest('a[data-anchor]');
 if(anchor){
   event.preventDefault();
   const target=document.getElementById(anchor.dataset.anchor);
   if(target)target.scrollIntoView({behavior:(document.documentElement.dataset.motion==='reduce'||matchMedia('(prefers-reduced-motion: reduce)').matches)?'auto':'smooth',block:'start'});
 }
});
app.addEventListener('error',event=>{
 const img=event.target;
 if(img instanceof HTMLImageElement&&img.matches('[data-card-image]'))img.closest('.card-image-shell')?.classList.add('is-error');
},true);
window.addEventListener('keydown',event=>{
 const modal=document.getElementById('atlas-lightbox');
 if(event.key==='Escape'){closeZoom();return;}
 if(event.key==='Tab'&&modal&&!modal.hidden){
  event.preventDefault();
  modal.querySelector('#close-atlas-zoom')?.focus();
 }
});
window.addEventListener('hashchange',render);
render();
initPWA();
