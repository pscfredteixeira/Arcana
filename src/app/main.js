import {cards,findCard} from '../data/cards.js';
import {siteHeader,siteFooter,homePage,learnPage,lessonPage,atlasPage,atlasCards,detailPage,practicePage,aboutPage,missingPage} from '../ui/templates.js';

const app=document.getElementById('app');
const getHashPath=()=>decodeURIComponent(location.hash.slice(1).split('?')[0]||'/');
const getRoute=()=>{
  const path=getHashPath();
  if(path==='/')return {active:'home',content:homePage(),title:'Arquivo Vivo'};
  if(path==='/aprender')return {active:'learn',content:learnPage(),title:'Aprender'};
  if(path==='/aula/primeiro-olhar')return {active:'learn',content:lessonPage(),title:'O primeiro olhar'};
  if(path==='/atlas')return {active:'atlas',content:atlasPage(),title:'Atlas'};
  if(path==='/praticas')return {active:'practice',content:practicePage(),title:'Práticas'};
  if(path==='/sobre')return {active:'about',content:aboutPage(),title:'Sobre'};
  if(path.startsWith('/carta/')){
    const c=findCard(path.slice(7));
    if(c)return {active:'atlas',content:detailPage(c),title:c.name};
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
 const route=getRoute();
 document.title=`${route.title} — ARCANA`;
 app.innerHTML=siteHeader(route.active)+`<main tabindex="-1" id="main">${route.content}</main>`+siteFooter();
 changeFont(fontPreference());
 window.scrollTo({top:0,left:0,behavior:'auto'});
}
app.addEventListener('input',event=>{
 if(event.target?.id==='atlas-search')updateAtlas(event.target.value);
});
app.addEventListener('click',event=>{
 const btn=event.target.closest('button[data-font]');
 if(btn){changeFont(btn.dataset.font);return;}
 const anchor=event.target.closest('a[data-anchor]');
 if(anchor){
   event.preventDefault();
   const target=document.getElementById(anchor.dataset.anchor);
   if(target)target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 }
});
app.addEventListener('error',event=>{
 const img=event.target;
 if(img instanceof HTMLImageElement&&img.matches('[data-card-image]'))img.closest('.card-image-shell')?.classList.add('is-error');
},true);
window.addEventListener('hashchange',render);
render();
