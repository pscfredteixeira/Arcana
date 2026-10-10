import {firstLookContent as lesson} from '../lessons/firstLookContent.js';
import {cards} from '../data/cards.js';
import {cardImage,escapeHTML as esc} from './templates.js';

const questions=[
{prompt:'Qual frase é uma observação direta da imagem?',options:['O viajante está perto de uma borda rochosa.','O viajante sabe que terá sorte.','O viajante é uma pessoa irresponsável.'],answer:0,feedback:'A posição na paisagem é verificável. Sentimentos, traços pessoais e previsões exigem hipóteses e contexto.'},
{prompt:'Qual afirmação interpreta a borda com cautela?',options:['Ela sempre anuncia um acidente.','Ela pode sugerir risco ou uma passagem ao desconhecido.','Ela não admite interpretações diferentes.'],answer:1,feedback:'Você relacionou um elemento visível a possíveis sentidos, sem transformar o símbolo em previsão.'},
{prompt:'Alguém quer iniciar um curso. Qual leitura é contextual e responsável?',options:['O curso certamente terminará mal.','A carta garante sucesso.','O movimento sugere abertura; a borda pede atenção aos desafios do início.'],answer:2,feedback:'Essa resposta articula a imagem à situação e reconhece abertura e risco sem prever resultados.'}
];
const storage=(key,value)=>{
 try {if(value===undefined)return localStorage.getItem(key); localStorage.setItem(key,String(value));}catch{return null;}
};
let state={step:Math.min(3,Math.max(0,Number(storage('arcana-firstlook-step'))||0)),picked:-1};
const chapter=s=>'<section class="arcana-chapter" id="'+esc(s.id)+'"><span class="eyebrow">'+esc(s.eyebrow)+'</span><h2>'+esc(s.title)+'</h2>'+s.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+'<aside class="lesson-principle"><strong>Para guardar</strong><p>'+esc(s.principle)+'</p></aside></section>';
const citation=b=>'<p><strong>'+esc(b.author)+' — <em>'+esc(b.work)+'</em>.</strong> '+esc(b.where)+' '+esc(b.role)+'</p>';
export function fullLessonPage(){
 const f=cards[0];
 const comparison=cards.slice(0,3).map((c,i)=>'<article><a href="#/carta/'+c.slug+'">'+cardImage(c)+'</a><h3>'+esc(c.name)+'</h3><p>'+esc(lesson.contrasts[i].note)+'</p></article>').join('');
 const samples=lesson.cases.map(c=>'<article><h3>'+esc(c.context)+'</h3><dl><dt>O que vejo</dt><dd>'+esc(c.observation)+'</dd><dt>Hipótese</dt><dd>'+esc(c.inference)+'</dd><dt>Pergunta</dt><dd>'+esc(c.question)+'</dd></dl></article>').join('');
 const outcomes=lesson.outcomes.map(x=>'<li>'+esc(x)+'</li>').join('');
 const links=lesson.sections.map(c=>'<li><a href="#'+c.id+'" data-anchor="'+c.id+'">'+esc(c.title)+'</a></li>').join('');
 return '<div class="container"><header class="page-intro"><div class="breadcrumb"><a href="#/aprender">Aprender</a> / <span>Fundamentos · Aula 1</span></div></header><div class="lesson-layout"><article class="lesson-article prose full-lesson"><header class="article-head"><span class="eyebrow">'+esc(lesson.status)+'</span><h1>'+esc(lesson.title)+'.</h1><p class="dek">'+esc(lesson.subtitle)+'</p><p class="article-meta">'+esc(lesson.readingTime)+'</p><div class="lesson-outcomes"><h2>O que você vai aprender</h2><ul>'+outcomes+'</ul></div></header>'
 +chapter(lesson.sections[0])
 +'<figure class="lesson-feature-art"><div class="lesson-feature-card">'+cardImage(f)+'</div><figcaption><span class="eyebrow">Imagem em foco</span><h3>O Louco — 0</h3><p>Observe a direção do movimento, o cão, o terreno e a paisagem. Descreva primeiro; interprete depois.</p><a class="text-link" href="#/carta/o-louco">Ampliar no Atlas →</a></figcaption></figure>'
 +chapter(lesson.sections[1])+chapter(lesson.sections[2])
 +'<section class="arcana-chapter"><span class="eyebrow">Comparação</span><h2>Três posturas, três perguntas</h2><p>Que diferenças você nota entre o movimento do Louco, os recursos diante do Mago e a postura da Sacerdotisa?</p><div class="lesson-contrast-grid">'+comparison+'</div></section>'
 +lesson.sections.slice(3).map(chapter).join('')
 +'<section class="arcana-chapter"><span class="eyebrow">Exemplos</span><h2>Uma carta, três contextos</h2><p>Repare como o mesmo conjunto visual permite hipóteses diferentes quando a pergunta muda.</p><div class="lesson-examples">'+samples+'</div></section>'
 +'<section id="laboratorio" class="arcana-lab"><span class="eyebrow">Laboratório · três etapas</span><h2>O primeiro olhar</h2><p>Escolha uma resposta por vez. Cada decisão recebe explicação e você poderá tentar novamente.</p><div id="firstlook-exercise" aria-live="polite"></div></section>'
 +'<section id="conclusao" class="arcana-chapter lesson-closing"><span class="eyebrow">Seu caderno</span><h2>Construa uma leitura sua</h2><p>Imagine uma pessoa prestes a iniciar um projeto. Descreva um detalhe do Louco, formule uma hipótese, justifique-a e escreva uma pergunta aberta. Não há gabarito único.</p><label for="lesson-notes">Minha observação e minha hipótese</label><textarea id="lesson-notes" maxlength="3000" rows="6" placeholder="Eu observo… Isso pode sugerir… Uma pergunta seria…">'+esc(storage('arcana-firstlook-notes')||'')+'</textarea><p id="notes-status" aria-live="polite" class="note">Suas anotações ficam apenas neste navegador.</p><div class="study-prompt"><h3>Critérios para revisar</h3><p>Seu texto separa observação de hipótese? Cita a imagem? Considera o contexto? Reconhece outras possibilidades e evita previsões absolutas?</p></div></section>'
 +'<section id="fontes" class="lesson-bibliography"><span class="eyebrow">Fontes</span><h2>Diálogo com os autores</h2>'+lesson.bibliography.map(citation).join('')+'<p>Texto e atividades originais do ARCANA. Interpretações simbólicas não são previsões verificadas. As referências bibliográficas descrevem as edições de estudo fornecidas.</p></section><p><a class="button" href="#/atlas">Explorar o Atlas →</a></p></article>'
 +'<aside class="article-sidebar"><h2>Seu espaço de leitura</h2><p class="note">Ajuste a fonte.</p><div class="font-controls" role="group" aria-label="Tamanho do texto"><button data-font="small" aria-label="Fonte pequena">A−</button><button data-font="normal" aria-label="Fonte padrão">A</button><button data-font="large" aria-label="Fonte grande">A+</button><button data-font="larger" aria-label="Fonte muito grande">A++</button></div><ul>'+links+'<li><a href="#laboratorio" data-anchor="laboratorio">Laboratório interativo</a></li><li><a href="#conclusao" data-anchor="conclusao">Caderno de estudo</a></li><li><a href="#fontes" data-anchor="fontes">Fontes</a></li></ul><p class="note">Você pode continuar depois. Seu progresso é local.</p></aside></div></div>';
}
export function renderLab(){
 const node=document.getElementById('firstlook-exercise');if(!node)return;
 if(state.step===3){node.innerHTML='<div class="lab-complete"><h3>Três etapas concluídas.</h3><p>Você praticou observação, hipótese e contexto. Agora registre uma leitura no caderno.</p><button class="button secondary" data-lab-reset>Refazer desafios</button> <a class="button" href="#conclusao" data-anchor="conclusao">Abrir caderno →</a></div>';return;}
 const q=questions[state.step],chosen=q.options[state.picked];
 const feedback=state.picked<0?'':('<div class="lab-feedback '+(state.picked===q.answer?'is-right':'is-wrong')+'" role="status"><strong>'+(state.picked===q.answer?'Bem fundamentado.':'Tente rever a diferença.')+'</strong><p>'+esc(q.feedback)+'</p></div><div class="lab-actions"><button class="button '+(state.picked===q.answer?'':'secondary')+'" '+(state.picked===q.answer?'data-lab-next':'data-lab-try')+'>'+(state.picked===q.answer?'Continuar →':'Tentar novamente')+'</button></div>');
 node.innerHTML='<div class="lab-progress">Etapa '+(state.step+1)+' de 3<div class="lab-track" role="progressbar" aria-label="Progresso do laboratório" aria-valuemin="0" aria-valuemax="3" aria-valuenow="'+state.step+'"><span style="width:'+(state.step/3*100)+'%"></span></div></div><h3>'+(['Observe','Interprete','Contextualize'][state.step])+'</h3><p class="lab-question">'+esc(q.prompt)+'</p><div class="lab-options" role="group" aria-label="Alternativas">'+q.options.map((o,i)=>'<button data-lab-choice="'+i+'" '+(chosen?'disabled':'')+' class="'+(state.picked===i?(i===q.answer?'chosen-right':'chosen-wrong'):'')+'">'+esc(o)+'</button>').join('')+'</div>'+feedback;
}
export function handleLabClick(t){
 if(t.closest('[data-lab-choice]')){if(state.picked!==-1)return true;state.picked=Number(t.closest('[data-lab-choice]').dataset.labChoice);}
 else if(t.closest('[data-lab-next]')){if(state.picked===questions[state.step]?.answer){state.step++;state.picked=-1;storage('arcana-firstlook-step',state.step);}}
 else if(t.closest('[data-lab-try]'))state.picked=-1;
 else if(t.closest('[data-lab-reset]')){state={step:0,picked:-1};storage('arcana-firstlook-step',0);}
 else return false;
 renderLab();return true;
}
export function saveReflection(s){storage('arcana-firstlook-notes',s.slice(0,3000));const n=document.getElementById('notes-status');if(n)n.textContent='Rascunho salvo neste navegador.';}
