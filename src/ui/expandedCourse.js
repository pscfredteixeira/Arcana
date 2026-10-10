import {plainGuideForSection} from '../lessons/lessonPlainGuides.js';
import {cards} from '../data/cards.js';
import {extendedLessons,lessonBySlug} from '../lessons/sprint7Lessons.js';
import {PRACTICE_KEY,blankPractice,readPractices,savePractices,progressOf,getExpectedChoice} from '../lessons/lessonPractice.js';
import {cardImage,escapeHTML as e} from './templates.js';

const bySlug=slug=>cards.find(c=>c.slug===slug);
const byKey=()=>lessonBySlug(decodeURIComponent(location.hash.split('/aula/')[1]||'').split('?')[0]);
let selectedChoice=null;
let chosenMatch=null;
let choiceFeedback=null;
let matches={};
let matchFeedback='';
let runtimeLessonId=null;
const countSteps=lesson=>lesson.activity.length;

function figure(cardsSlugs){
 const arr=cardsSlugs.map(bySlug).filter(Boolean);
 return '<figure class="course-gallery"><div class="course-gallery-grid columns-'+arr.length+'">'+arr.map(c=>'<a href="#/carta/'+e(c.slug)+'" title="Explorar '+e(c.name)+' no Atlas" class="course-gallery-card">'+cardImage(c)+'<span>'+e(c.name)+'</span></a>').join('')+'</div><figcaption>Imagens históricas de Pamela Colman Smith, Rider-Waite-Smith. Toque em uma carta para vê-la no Atlas Vivo. A origem de cada imagem está informada na página da carta.</figcaption></figure>';
}
function section(s){
 const guide=plainGuideForSection(s.id);
 const front=guide?'<aside class="beginner-chapter-summary"><strong>Em palavras simples</strong><p>'+e(guide[0])+'</p><small><strong>Exemplo:</strong> '+e(guide[1])+'</small></aside>':'';
 return '<section class="arcana-chapter course-chapter" id="'+e(s.id)+'"><span class="eyebrow">'+e(s.label)+'</span><h2>'+e(s.title)+'</h2>'+front+s.paragraphs.map(p=>'<p>'+e(p)+'</p>').join('')+'<aside class="lesson-principle"><strong>Para guardar</strong><p>'+e(s.principle)+'</p></aside></section>';
}
function note(item){
 return '<details class="course-insight"><summary><span class="course-insight-symbol" aria-hidden="true">✧</span><span><strong>'+e(item.title)+'</strong><small>'+e(item.text)+'</small></span><span class="course-insight-toggle" aria-hidden="true">+</span></summary><p>'+e(item.answer)+'</p></details>';
}
function source(item){return '<li><strong>'+e(item.author)+' — <em>'+e(item.work)+'</em></strong><span>'+e(item.pages)+'</span><p>'+e(item.purpose)+'</p></li>';}
const previousFor=slug=>{
 const index=extendedLessons.findIndex(c=>c.slug===slug);
 return index===0?['A arte de olhar','#/aula/primeiro-olhar']:[extendedLessons[index-1].title,'#/aula/'+extendedLessons[index-1].slug];
};
const nextFor=slug=>{
 const index=extendedLessons.findIndex(c=>c.slug===slug);
 return index===extendedLessons.length-1?null:extendedLessons[index+1];
};
export function expandedLessonPage(lesson){
 const prev=previousFor(lesson.slug),next=nextFor(lesson.slug);
 const goals=lesson.objectives.map(g=>'<li>'+e(g)+'</li>').join('');
 const sectionLinks=lesson.sections.map(s=>'<li><a href="#'+e(s.id)+'" data-anchor="'+e(s.id)+'">'+e(s.title)+'</a></li>').join('');
 const future=next?'<a class="button" href="#/aula/'+e(next.slug)+'">Próxima aula: '+e(next.title)+' →</a>':'<a class="button" href="#/aprender">Ver o percurso →</a>';
 return '<div class="container"><div class="page-intro course-breadcrumb"><div class="breadcrumb"><a href="#/aprender">Aprender</a> <span>/</span> '+e(lesson.module)+'</div></div>'
 +'<div class="lesson-layout course-layout"><article class="lesson-article prose full-lesson course-lesson"><header class="article-head course-title"><span class="eyebrow">'+e(lesson.level)+' · '+e(lesson.module)+'</span><h1>'+e(lesson.title)+'.</h1><p class="dek">'+e(lesson.subtitle)+'</p><div class="article-meta">'+e(lesson.minutes)+' · Atividade interativa</div><p class="course-lede">'+e(lesson.lede)+'</p><div class="beginner-lesson-nav">É seu primeiro contato com tarô? <a href="#/comece-aqui">Leia o guia com palavras simples e exemplos</a>.</div><div class="lesson-outcomes"><h2>O que você vai aprender</h2><ul>'+goals+'</ul></div></header>'
 +section(lesson.sections[0])+figure(lesson.illustrations)+lesson.sections.slice(1,3).map(section).join('')
 +'<div class="course-pauses"><span class="eyebrow">Caderno de perguntas</span><h2>Uma pausa para investigar</h2><div class="course-insights">'+lesson.notes.map(note).join('')+'</div></div>'
 +lesson.sections.slice(3).map(section).join('')
 +'<section class="course-activity" id="curso-lab"><span class="eyebrow">Laboratório interativo · três fases</span><h2>Aprender fazendo.</h2><p>Responda uma pergunta por vez. Se errar, você verá uma explicação e poderá tentar de novo. Não precisa saber tudo antes de começar.</p><div id="course-practice-root" aria-live="polite"></div></section>'
 +'<section class="lesson-bibliography course-bibliography" id="bibliografia"><span class="eyebrow">Fontes e método</span><h2>O diálogo com os livros</h2><ul>'+lesson.bibliography.map(source).join('')+'</ul><p>Textos, perguntas e exemplos são autorais do ARCANA. As páginas indicadas correspondem aos PDFs de trabalho fornecidos. As associações esotéricas e psicológicas são tradições interpretativas atribuídas aos autores, não afirmações científicas comprovadas.</p></section>'
 +'<div id="lesson-mark-control" data-lesson-id="'+e(lesson.id)+'"></div><nav class="course-next" aria-label="Continuar a formação"><a href="'+prev[1]+'" class="button secondary">← '+e(prev[0])+'</a>'+future+'</nav></article>'
 +'<aside class="article-sidebar" aria-label="Ferramentas da aula"><h2>Seu espaço de leitura</h2><p class="note">Ajuste o tamanho do texto de maneira confortável.</p><div class="font-controls" role="group" aria-label="Tamanho da fonte"><button data-font="small" aria-label="Fonte pequena">A−</button><button data-font="normal" aria-label="Fonte padrão">A</button><button data-font="large" aria-label="Fonte grande">A+</button><button data-font="larger" aria-label="Fonte muito grande">A++</button></div><ul>'+sectionLinks+'<li><a href="#curso-lab" data-anchor="curso-lab">Laboratório interativo</a></li><li><a href="#bibliografia" data-anchor="bibliografia">Fontes e método</a></li></ul><p class="note">O aprendizado pode continuar em seu ritmo, sem precisar de login.</p></aside></div></div>';
}
function clearTransient(){
 selectedChoice=null;chosenMatch=null;choiceFeedback=null;matchFeedback='';matches={};
}
function ensureLesson(lesson){
 if(runtimeLessonId!==lesson.id){runtimeLessonId=lesson.id;clearTransient();}
}
function progress(lesson,step){
 return '<div class="course-step-progress"><span>Etapa '+(step+1)+' de '+countSteps(lesson)+'</span><div role="progressbar" aria-label="Etapas concluídas" aria-valuemin="0" aria-valuemax="'+countSteps(lesson)+'" aria-valuenow="'+step+'" class="course-step-track"><span style="width:'+(step/countSteps(lesson)*100)+'%"></span></div></div>';
}
function choice(activity,lesson,step){
 const answered=selectedChoice!==null;
 const chosen=activity.options[selectedChoice];
 return '<div class="course-quiz"><span class="eyebrow">'+e(activity.title)+'</span><h3>'+e(activity.question)+'</h3><div class="course-quiz-answers" role="group" aria-label="Alternativas">'+activity.options.map((o,i)=>'<button type="button" data-course-choice="'+i+'" '+(answered?'disabled':'')+' class="'+(selectedChoice===i?(o.right?'correct':'incorrect'):'')+'"><span class="course-quiz-index">'+String(i+1).padStart(2,'0')+'</span><span>'+e(o.text)+'</span></button>').join('')+'</div>'
 +(chosen?'<div class="course-feedback '+(chosen.right?'correct':'incorrect')+'" role="status"><strong>'+(chosen.right?'Você construiu uma relação consistente.':'Vamos olhar novamente.')+'</strong><p>'+e(chosen.why)+'</p></div><div class="course-quiz-actions"><button type="button" class="button '+(chosen.right?'':'secondary')+'" data-course-'+(chosen.right?'next':'retry')+'>'+(chosen.right?'Continuar →':'Tentar outra resposta')+'</button></div>':'')+'</div>';
}
function match(activity,lesson,step){
 const finished=activity.items.every(item=>matches[item.id]===item.answer);
 const question='<span class="eyebrow">'+e(activity.title)+'</span><h3>'+e(activity.question)+'</h3><p>Toque em uma carta e depois no elemento correspondente. Não é necessário arrastar.</p>';
 const itemCards=activity.items.map(item=>{
  const c=bySlug(item.card);
  const ok=matches[item.id]===item.answer;
  return '<button data-course-match-item="'+e(item.id)+'" type="button" '+(ok?'disabled':'')+' class="course-match-card '+(ok?'matched':chosenMatch===item.id?'active':'')+'" aria-pressed="'+(chosenMatch===item.id)+'"><span class="course-match-art">'+cardImage(c)+'</span><strong>'+e(item.label)+'</strong><span class="course-match-state">'+(ok?'✓ '+e(item.answer):'Selecionar')+'</span></button>';
 }).join('');
 const targets=activity.options.map(opt=>'<button type="button" data-course-match-target="'+e(opt)+'" '+(finished?'disabled':'')+'>'+e(opt)+'</button>').join('');
 return '<div class="course-match"><div class="course-match-head">'+question+'</div><div class="course-match-grid">'+itemCards+'</div><div class="course-match-targets"><span>Agora escolha o elemento para <strong>'+(chosenMatch?e(activity.items.find(x=>x.id===chosenMatch)?.label||''):'a carta selecionada')+'</strong>:</span><div class="course-match-options" role="group" aria-label="Elementos">'+targets+'</div></div><p class="course-match-feedback" aria-live="polite">'+e(matchFeedback||'Cada combinação reconhecida fica assinalada em verde.')+'</p>'
 +(finished?'<div class="course-feedback correct"><strong>Quatro correspondências encontradas.</strong><p>Essas associações pertencem a uma tradição simbólica. Agora podemos compará-las entre autores e em diferentes perguntas.</p></div><button type="button" class="button" data-course-next>Próxima etapa →</button>':'')+'</div>';
}
function finale(lesson){
 return '<div class="course-completed"><span class="course-complete-icon" aria-hidden="true">✧</span><span class="eyebrow">Três etapas concluídas</span><h3>Um novo olhar para as cartas.</h3><p>Você percorreu os conceitos centrais desta aula. Se também leu o texto e fez as reflexões, pode marcar a aula como concluída em seguida. Os exercícios não substituem sua interpretação pessoal.</p><div class="course-completed-actions"><button type="button" class="button secondary" data-course-restart>Refazer as atividades</button><a class="button" href="#/meu-estudo">Acompanhar meu estudo →</a></div></div>';
}
export function renderCoursePractice(){
 const node=document.getElementById('course-practice-root');
 if(!node)return;
 const lesson=byKey();
 if(!lesson)return;
 ensureLesson(lesson);
 const data=progressOf(localStorage,lesson.id);
 if(data.completed){node.innerHTML=finale(lesson);return;}
 const step=data.step;
 if(step>=lesson.activity.length){node.innerHTML=finale(lesson);return;}
 node.innerHTML=progress(lesson,step)+(lesson.activity[step].kind==='match'?match(lesson.activity[step],lesson,step):choice(lesson.activity[step],lesson,step));
}
function advance(lesson){
 const current=progressOf(localStorage,lesson.id);
 const step=Math.min(lesson.activity.length,current.step+1);
 const map=readPractices(localStorage);
 map[lesson.id]={step,completed:step===lesson.activity.length};
 if(!savePractices(localStorage,map)){matchFeedback='O navegador não conseguiu salvar o progresso. Verifique suas configurações.';}
 clearTransient();renderCoursePractice();
 const root=document.getElementById('course-practice-root');
 root?.scrollIntoView({block:'start',behavior:'auto'});
}
export function handleCourseClick(target){
 const choiceBtn=target.closest?.('[data-course-choice]');
 const matchItem=target.closest?.('[data-course-match-item]');
 const matchTarget=target.closest?.('[data-course-match-target]');
 const retry=target.closest?.('[data-course-retry]');
 const next=target.closest?.('[data-course-next]');
 const restart=target.closest?.('[data-course-restart]');
 if(![choiceBtn,matchItem,matchTarget,retry,next,restart].some(Boolean))return false;
 const lesson=byKey();if(!lesson)return false;ensureLesson(lesson);
 const state=progressOf(localStorage,lesson.id);
 const activity=lesson.activity[state.step];
 if(restart){
  const map=readPractices(localStorage);map[lesson.id]=blankPractice();
  savePractices(localStorage,map);clearTransient();renderCoursePractice();return true;
 }
 if(state.completed||!activity)return true;
 if(choiceBtn&&activity.kind==='choice'&&selectedChoice===null){
  const id=Number(choiceBtn.dataset.courseChoice);
  if(Number.isInteger(id)&&id>=0&&id<activity.options.length){selectedChoice=id;renderCoursePractice();}
 }else if(retry&&activity.kind==='choice'){selectedChoice=null;renderCoursePractice();}
 else if(next){
  if(activity.kind==='choice'&&activity.options[selectedChoice]?.right===true)advance(lesson);
  if(activity.kind==='match'&&activity.items.every(x=>matches[x.id]===x.answer))advance(lesson);
 }else if(matchItem&&activity.kind==='match'){
  const item=activity.items.find(x=>x.id===matchItem.dataset.courseMatchItem);
  if(item&&matches[item.id]!==item.answer){chosenMatch=item.id;matchFeedback='Naipe '+item.label+' selecionado. Qual elemento corresponde a ele?';renderCoursePractice();}
 }else if(matchTarget&&activity.kind==='match'){
  const item=activity.items.find(x=>x.id===chosenMatch);
  if(!item){matchFeedback='Escolha primeiro uma das cartas.';renderCoursePractice();return true;}
  const picked=matchTarget.dataset.courseMatchTarget;
  if(item.answer===picked){matches[item.id]=picked;matchFeedback=item.why;chosenMatch=null;}
  else{matchFeedback='Essa associação não corresponde à convenção estudada. Observe o naipe e tente novamente.';}
  renderCoursePractice();
 }
 return true;
}
