import {extendedLessons} from '../lessons/sprint7Lessons.js';
import {cards} from '../data/cards.js';

export const routes = [
  {href:'#/',key:'home',label:'Início',symbol:'⌂'},
  {href:'#/aprender',key:'learn',label:'Aprender',symbol:'▤'},
  {href:'#/atlas',key:'atlas',label:'Atlas',symbol:'▥'},
  {href:'#/praticas',key:'practice',label:'Práticas',symbol:'◇'},
  {href:'#/meu-estudo',key:'study',label:'Meu estudo',symbol:'◷'}
];

export const escapeHTML = text => String(text).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));

export function cardImage(card, eager=false) {
  return `<div class="card-image-shell">
    <img data-card-image src="${escapeHTML(card.image)}" alt="Ilustração histórica: ${escapeHTML(card.name)}, do tarô Rider-Waite-Smith" loading="${eager?'eager':'lazy'}" decoding="async">
    <span class="image-fallback" aria-hidden="true">${escapeHTML(card.name)}</span>
  </div>`;
}

export function siteHeader(active) {
 const logo=`<a class="logo" href="#/" aria-label="ARCANA, página inicial"><span class="logo-main">ARCANA</span></a>`;
 const nav=`<nav aria-label="Navegação principal" class="top-nav">${routes.map(r=>`<a href="${r.href}" ${r.key===active?'aria-current="page"':''}>${r.label}</a>`).join('')}</nav>`;
 const mobile=`<nav aria-label="Navegação inferior" class="mobile-nav">${routes.map(r=>`<a href="${r.href}" ${r.key===active?'aria-current="page"':''}><span aria-hidden="true" class="nav-icon">${r.symbol}</span><span>${r.label}</span></a>`).join('')}</nav>`;
 return `<header class="site-header"><div class="container header-inner">${logo}${nav}<a class="study-top-link" href="#/meu-estudo">Meu estudo ↗</a></div></header>${mobile}`;
}

export function siteFooter(){
 return `<footer class="site-footer"><div class="container footer-inner"><div><span class="brand-wordmark">ARCANA</span><p>Uma escola pública de tarô em construção. Conhecimento simbólico, observação e interpretação com contexto.</p></div><div class="footer-links"><a href="#/comece-aqui">Comece aqui · Guia para iniciantes</a><a href="#/sobre">Sobre o projeto</a><button type="button" class="pwa-footer-link" data-pwa-open>Instalar ARCANA no celular</button><a href="https://commons.wikimedia.org/wiki/Category:Rider-Waite-Smith_tarot_deck_(TaionWC)" target="_blank" rel="noopener noreferrer">Origem das imagens ↗</a><a href="https://github.com/pscfredteixeira/Arcana" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></div></footer>`;
}

export function homePage(){
 return `<section class="hero"><div class="container hero-grid">
 <div class="hero-copy"><div class="eyebrow">Escola aberta de tarô</div><h1>Conhecimento antigo para <em>perguntas atuais.</em></h1><p class="lead">Aprenda tarô do zero. Entenda o significado das 78 cartas, veja exemplos simples e pratique no seu ritmo.</p>
 <div class="hero-actions"><a class="button" href="#/comece-aqui">Nunca estudou tarô? Comece aqui</a><a class="button secondary" href="#/aprender">Ver as aulas <span aria-hidden="true" class="arrow">→</span></a><a class="button secondary" href="#/atlas">Explorar o Atlas</a><a class="study-quick-link" href="#/meu-estudo">Meu estudo ↗</a></div>
 <div class="hero-note"><span class="accent">78</span><span>Cartas explicadas no Atlas: 22 Maiores e 56 Menores. Cada carta tem um significado simples e um estudo mais completo.</span></div></div>
 <div class="hero-art" aria-label="Carta O Louco, primeira ilustração explorada no ARCANA"><div class="orbit"></div><div class="hero-card">${cardImage(cards[0],true)}</div><div class="hero-art-label">Toda jornada começa com um olhar.</div></div></div></section>
 <hr class="editorial-divider">
 <section class="section container"><div class="section-head"><div><div class="eyebrow">Três maneiras de descobrir</div><h2>Aprenda primeiro o básico.<br>Depois, aprofunde.</h2></div><p>Leia explicações fáceis, observe desenhos e pratique. Não precisa conhecer os termos do tarô antes de começar.</p></div>
 <div class="feature-grid">
 <a class="feature" href="#/aprender"><span class="ordinal">01 / Estudar</span><h3>As aulas</h3><p>Comece pelo que é tarô, entenda os grupos de cartas e avance de uma aula por vez.</p><span class="feature-end">Ver as aulas ↗</span></a>
 <a class="feature" href="#/atlas"><span class="ordinal">02 / Explorar</span><h3>As cartas</h3><p>Leia o significado das 78 cartas, com exemplos e explicações do que aparece nas imagens.</p><span class="feature-end">Ver as cartas ↗</span></a>
 <a class="feature" href="#/praticas"><span class="ordinal">03 / Experimentar</span><h3>Os jogos</h3><p>Use jogos e atividades para treinar o que aprendeu nas aulas e nas cartas.</p><span class="feature-end">Jogar agora ↗</span></a>
 </div></section>
 <section class="pale-band"><div class="container quote-band"><blockquote>Uma carta não é apenas aquilo que ela significa. É também aquilo que aprendemos a observar.</blockquote><p>Estudamos a tradição Rider-Waite-Smith com a abordagem de Rachel Pollack como eixo e a contribuição metodológica de Nei Naiff como uma segunda perspectiva. As interpretações serão apresentadas como possibilidades fundamentadas, não certezas absolutas.</p></div></section>
 <section class="section container"><div class="section-head"><div><div class="eyebrow">Primeira exposição</div><h2>Seis portas de entrada.</h2></div><p>Escolha uma carta. Você encontrará uma explicação fácil antes das partes mais detalhadas.</p></div>
 <div class="atlas-grid">${cards.map(c=>`<article class="atlas-item"><a href="#/carta/${c.slug}" aria-label="Explorar ${escapeHTML(c.name)}">${cardImage(c)}<span class="roman">${c.numeral}</span><span class="name">${c.name}</span></a></article>`).join('')}</div>
 <p style="margin-top:30px"><a class="text-link" href="#/atlas">Explorar o Atlas completo da prévia →</a></p></section>`;
}

export function learnPage(){
 const catalog=[
 {id:'F-02.01',number:'01',name:'O mapa das 78 cartas',label:'F-02 · Fundamentos',body:'Descubra por que existem 78 cartas, como elas são divididas e o que significam palavras como “arcano” e “naipe”.',href:'#/aula/mapa-78-cartas'},
 {id:'F-03.01',number:'02',name:'A arte de olhar',label:'F-03 · Fundamentos',body:'Aprenda a olhar uma carta, entender seu significado e relacioná-la com uma situação simples.',href:'#/aula/primeiro-olhar'},
 {id:'F-04.01',number:'03',name:'O Mago e a Sacerdotisa',label:'F-04 · Fundamentos',body:'Entenda duas cartas muito importantes: O Mago fala de agir; A Sacerdotisa ajuda a pensar antes de agir.',href:'#/aula/mago-e-sacerdotisa'},
 {id:'I-01.01',number:'04',name:'Os quatro naipes',label:'I-01 · Intermediário',body:'Aprenda os quatro grupos das cartas menores e o que cada um costuma representar. Depois, pratique num jogo.',href:'#/aula/quatro-naipes'}
 ];
 return '<div class="container"><header class="page-intro"><div class="eyebrow">Programa de formação</div><h1>Aprender a ler<br>as imagens.</h1><p class="lead">Este curso começa do zero. Comece pelas quatro aulas iniciais e siga para uma jornada interativa pelas 22 cartas dos Arcanos Maiores. Se encontrar uma palavra difícil, visite o nosso dicionário.</p></header><div class="eyebrow">Não sabe por onde começar? <a href="#/comece-aqui">Leia primeiro o guia para iniciantes</a></div><h2 class="course-journey-title">Quatro aulas e uma jornada.</h2>'
 +catalog.map(c=>'<article class="curriculum-card"><span class="volume">'+c.number+'</span><div><span class="course-catalog-tag">'+c.label+'</span><h2>'+c.name+'</h2><p>'+c.body+'</p></div><a class="text-link" href="'+c.href+'">Abrir aula →</a></article>').join('')
 +'<article class="curriculum-card journey-catalog-card"><span class="volume">05</span><div><span class="course-catalog-tag">Sprint 9 · Formação dos Maiores</span><h2>Jornada dos 22 Arcanos Maiores</h2><p>Conheça as cartas uma a uma. Observe os desenhos, entenda o significado, resolva situações e acompanhe seu progresso.</p></div><a class="text-link" href="#/jornada">Iniciar jornada →</a></article>'
 +'<article class="curriculum-card"><span class="volume">06</span><div><span class="course-catalog-tag">Sprint 10 · Revisões de capítulo</span><h2>Cartas em Diálogo</h2><p>Compare duas cartas, entenda o que muda entre os desenhos e responda a situações do dia a dia. Sete desafios em quatro revisões.</p></div><a class="text-link" href="#/praticas/cartas-em-dialogo">Comparar cartas →</a></article>'
 +'<article class="curriculum-card"><span class="volume">07</span><div><span class="course-catalog-tag">Sprint 11 · Leitura de três cartas</span><h2>Três Cartas, Uma História</h2><p>Observe três cartas, compare duas interpretações possíveis e escreva sua própria leitura de uma situação. Quatro histórias interativas.</p></div><a class="text-link" href="#/praticas/tres-cartas">Praticar com três cartas →</a></article>'
 +'<article class="curriculum-card assessment-catalog-card"><span class="volume">✓</span><div><span class="course-catalog-tag">Avaliação formativa</span><h2>O que você aprendeu?</h2><p>Quatro perguntas e uma interpretação escrita para descobrir quais habilidades você já domina e o que precisa revisar. Sem nota automática para seu texto.</p></div><a class="text-link" href="#/avaliacao">Fazer avaliação →</a></article>'
 +'<p class="course-catalog-note">Estas quatro aulas e a jornada dos Maiores formam o começo do curso, não a formação inteira. Usamos os livros de Rachel Pollack e Nei Naiff como referências e explicamos quando os autores apresentam ideias diferentes.</p></div>';
}

export function lessonPage(){
 return `<div class="container"><div class="page-intro" style="padding-bottom:0"><div class="breadcrumb"><a href="#/aprender">Aprender</a><span aria-hidden="true">/</span><span>Aula demonstrativa</span></div></div>
 <div class="lesson-layout"><article class="lesson-article prose" id="lesson-content">
 <header class="article-head"><span class="eyebrow">Aula de introdução · Sprint 1</span><h1>O primeiro olhar.</h1><p class="dek">Antes de perguntar o que uma carta quer dizer, descubra o que a imagem realmente mostra.</p><div class="article-meta">Leitura breve · Introdução à observação simbólica</div></header>
 <section id="observar"><h2>Uma imagem antes de um significado</h2><p class="article-paragraph">Quando encontramos uma carta de tarô, é comum procurar imediatamente uma lista de palavras-chave. Ela pode ajudar, mas também corre o risco de encerrar a investigação antes que ela comece.</p><p class="article-paragraph">Experimente outra ordem: primeiro observe a cena, depois descreva seus elementos e, somente então, imagine como cada detalhe poderia contribuir para uma interpretação.</p></section>
 <figure class="inline-figure"><div>${cardImage(cards[0])}</div><figcaption>O Louco, ilustrado por Pamela Colman Smith. Observe a direção do corpo, o pequeno animal, o terreno e o espaço ao redor. Você não precisa descobrir um significado único para começar.</figcaption></figure>
 <section id="detalhes"><h2>Do detalhe à hipótese</h2><p class="article-paragraph">Uma descrição é algo que outra pessoa também pode conferir na imagem. Já uma interpretação é uma hipótese construída a partir dessa descrição e de um contexto.</p><p class="article-paragraph">Por exemplo, a proximidade da borda é um detalhe observável. Associá-la ao risco é uma possibilidade interpretativa. Associá-la a um começo promissor também pode fazer sentido — desde que você explique o caminho dessa leitura.</p></section>
 <aside class="study-prompt" aria-label="Exercício de reflexão"><h3>Experimente observar</h3><p>Olhe para a carta durante alguns segundos. Identifique três elementos visuais. Depois formule duas hipóteses diferentes sobre a mesma cena. O objetivo não é acertar uma palavra secreta, e sim justificar o que você percebeu.</p></aside>
 <section id="contexto"><h2>A pergunta muda a leitura</h2><p class="article-paragraph">O mesmo conjunto de imagens pode ganhar ênfases diferentes conforme a questão investigada. Diante de uma decisão profissional, a imagem pode sugerir iniciativa e cautela; diante de um novo projeto pessoal, abertura e entusiasmo.</p><p class="article-paragraph">Isso não significa que qualquer interpretação seja igualmente boa. Quanto mais clara for a relação entre imagem, tradição simbólica e contexto, mais consistente será o raciocínio.</p></section>
 <section id="continuar"><h2>Continue a explorar</h2><p class="article-paragraph">O próximo passo é olhar o Louco em tamanho maior e observar os seus detalhes. Na ficha da carta, você encontrará questões abertas para exercitar esse modo de ver.</p><a class="button" href="#/carta/o-louco">Explorar O Louco <span aria-hidden="true">→</span></a></section>
 <div style="border-top:1px solid var(--line);margin-top:40px;padding-top:18px;font-size:.75rem;color:var(--muted)">Texto didático original para a prévia visual do ARCANA. Não substitui a aula completa do Sprint 2, quando serão aprofundados os conteúdos e as referências bibliográficas.</div>
 </article>
 <aside class="article-sidebar" aria-label="Ferramentas da aula"><h2>Seu espaço de leitura</h2><p class="note">Escolha o tamanho de texto mais confortável.</p><div class="font-controls" role="group" aria-label="Tamanho da fonte"><button data-font="small" aria-label="Fonte pequena">A−</button><button data-font="normal" aria-label="Fonte padrão">A</button><button data-font="large" aria-label="Fonte grande">A+</button><button data-font="larger" aria-label="Fonte muito grande">A++</button></div><ul><li><a href="#observar" data-anchor="observar">Uma imagem antes de um significado</a></li><li><a href="#detalhes" data-anchor="detalhes">Do detalhe à hipótese</a></li><li><a href="#contexto" data-anchor="contexto">A pergunta muda a leitura</a></li><li><a href="#continuar" data-anchor="continuar">Continue a explorar</a></li></ul><p class="note">O tamanho escolhido é salvo apenas neste navegador.</p></aside>
 </div></div>`;
}

export function atlasPage(term=''){
 const needle=term.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const filtered=cards.filter(c=>[c.name,c.tagline,...c.keywords].join(' ').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(needle));
 return `<div class="container"><header class="page-intro"><span class="eyebrow">O arquivo visual</span><h1>Atlas de cartas.</h1><p class="lead">Aproxime-se das imagens e observe como cada símbolo participa de uma história. Esta prévia apresenta seis Arcanos Maiores; o acervo crescerá por etapas.</p></header>
 <div class="atlas-tools"><label class="search-field"><span class="sr-only">Buscar cartas por nome ou palavra-chave</span><span aria-hidden="true" class="search-icon">⌕</span><input id="atlas-search" type="search" placeholder="Buscar uma carta ou um tema…" autocomplete="off" value="${escapeHTML(term)}"></label><span id="atlas-count" class="atlas-count" role="status">${filtered.length} de 6 cartas disponíveis</span></div>
 <div class="atlas-grid" id="atlas-grid">${atlasCards(filtered)}</div>
 <p style="font-size:.77rem;color:var(--muted);margin-top:30px">Imagens históricas do Rider-Waite-Smith, de Pamela Colman Smith, obtidas no Wikimedia Commons. As demais cartas serão incorporadas mediante revisão editorial e verificação de procedência.</p></div>`;
}

export function atlasCards(list){
 if(!list.length)return '<div class="empty-state">Nenhuma carta encontrada nesta primeira seleção. Experimente outro termo.</div>';
 return list.map(c=>`<article class="atlas-item"><a href="#/carta/${c.slug}" aria-label="Abrir ${escapeHTML(c.name)}">${cardImage(c)}<span class="roman">${c.numeral}</span><span class="name">${escapeHTML(c.name)}</span></a></article>`).join('');
}

export function detailPage(c){
 return `<div class="container"><div class="page-intro"><div class="breadcrumb"><a href="#/atlas">Atlas</a><span aria-hidden="true">/</span><span>Arcanos Maiores</span></div></div>
 <div class="card-detail"><div class="detail-art">${cardImage(c,true)}</div><article class="detail-copy prose"><span class="eyebrow">Arcano Maior · ${escapeHTML(c.numeral)}</span><h1>${escapeHTML(c.name)}</h1><p class="subline">${escapeHTML(c.tagline)}</p><p>${escapeHTML(c.meaning)}</p>
 <div style="display:flex;flex-wrap:wrap;gap:7px;margin:25px 0">${c.keywords.map(k=>`<span class="tag">${escapeHTML(k)}</span>`).join('')}</div>
 <h2>O que observar</h2><p>${escapeHTML(c.sight)}</p>
 <aside class="study-prompt"><h3>Uma pergunta para levar consigo</h3><p>${escapeHTML(c.reflect)}</p></aside>
 <p class="source"><strong>Fonte da imagem:</strong> ${escapeHTML(c.imageLicense)}. <a href="${escapeHTML(c.commons)}" target="_blank" rel="noopener noreferrer">Consultar arquivo e condições de uso ↗</a>.<br>Interpretação de apresentação: texto original, provisório, sujeito à revisão da formação completa.</p>
 <a class="button secondary" href="#/atlas">← Voltar ao Atlas</a></article></div></div>`;
}

export function practicePage(){
 return `<div class="container"><header class="page-intro"><span class="eyebrow">Futura área de experiências</span><h1>Aprender fazendo.</h1><p class="lead">O laboratório reunirá experiências para observar símbolos, combinar cartas e construir interpretações fundamentadas. O projeto está em preparação.</p></header><section class="coming"><span class="tag">Próximos sprints</span><h2>Práticas com sentido.</h2><p>As próximas etapas trarão o Diamante dos Arcanos, exercícios de associação simbólica e uma mesa de tiragens didática. Cada interação terá objetivos, regras e feedback, e funcionará por toque e teclado.</p><a class="button secondary" href="#/aula/primeiro-olhar">Enquanto isso, conheça a aula piloto →</a></section></div>`;
}

export function aboutPage(){
 return `<div class="container"><header class="page-intro"><span class="eyebrow">Nossa proposta</span><h1>O mesmo tarô.<br>Novos olhares.</h1><p class="lead">ARCANA é um projeto de formação pública, visual e progressiva na linguagem simbólica das cartas do tarô.</p></header>
 <div class="prose" style="max-width:750px;margin:0 0 80px"><h2>O que estamos construindo?</h2><p>Uma escola de tarô que trate as imagens como objetos de investigação e não como uma coleção de significados para decorar. A formação avançará dos fundamentos às leituras complexas.</p><h2>Quais são as referências?</h2><p>O baralho principal é o Rider-Waite-Smith, ilustrado por Pamela Colman Smith. O trabalho de Rachel Pollack é a referência interpretativa central do currículo e os métodos de Nei Naiff oferecem uma perspectiva complementar. Quando os autores divergem, apresentaremos a diferença com clareza.</p><h2>O que já funciona?</h2><p>O site já oferece a primeira aula aprofundada, um Atlas com 78 cartas e o jogo Diamante dos Arcanos. Ainda não existe curso completo, mesa de tiragens, contas nem emissão de certificados. Na área Práticas, estão disponíveis o Diamante dos Arcanos e uma Mesa de Tiragens didática, com registros guardados apenas no navegador.</p><h2>Sobre as imagens</h2><p>As seis imagens iniciais são arquivos históricos disponíveis no Wikimedia Commons, creditados individualmente nas páginas das cartas. Não reproduzimos os livros de referência. O material didático público será original.</p><p>Estudo de tarô não substitui orientação médica, psicológica, jurídica ou financeira.</p><p><a class="text-link" href="https://github.com/pscfredteixeira/Arcana" target="_blank" rel="noopener noreferrer">Acompanhar o desenvolvimento no GitHub ↗</a></p></div></div>`;
}

export function missingPage(){
 return `<div class="container"><div class="coming"><span class="eyebrow">Página não encontrada</span><h1>Este caminho ainda não está no arquivo.</h1><p>Volte ao início ou explore uma das cartas disponíveis.</p><a class="button" href="#/">Voltar ao início →</a></div></div>`;
}
