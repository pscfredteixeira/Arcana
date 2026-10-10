import {renderCardStudy} from './cardStudyView.js';
import {cards} from '../data/cards.js';
import {cardImage,escapeHTML as e} from './templates.js';

const kinds=[['all','Todos'],['major','Maiores'],['paus','Paus'],['copas','Copas'],['espadas','Espadas'],['ouros','Ouros']];
const accents={
 'o-louco':[{x:53,y:15,t:'O sol',d:'A luz participa da composição da jornada. Em uma leitura simbólica, pode sugerir abertura e visibilidade.'},{x:76,y:68,t:'A borda',d:'O limite do terreno pode provocar perguntas sobre risco e desconhecido.'},{x:73,y:80,t:'O cão',d:'O animal acompanha o movimento. Sua presença permite perguntar sobre apoio, atenção e alerta.'}],
 'o-mago':[{x:52,y:22,t:'O gesto',d:'O contraste entre a mão erguida e a mão apontada à terra sugere relações entre ideia e ação.'},{x:51,y:79,t:'A mesa',d:'Os instrumentos disponíveis podem inspirar perguntas sobre recursos e habilidades.'}],
 'a-sacerdotisa':[{x:24,y:31,t:'As colunas',d:'A dualidade das colunas organiza o cenário e convida a observar contrastes.'},{x:68,y:59,t:'O véu',d:'A separação do fundo pode abrir uma reflexão sobre o que está visível e o que permanece oculto.'}],
 'a-imperatriz':[{x:72,y:79,t:'A paisagem',d:'A vegetação compõe uma cena associada a crescimento e cultivo.'}],
 'o-imperador':[{x:50,y:62,t:'O trono',d:'A estrutura de pedra pode sustentar reflexões sobre estabilidade, autoridade e rigidez.'}],
 'o-hierofante':[{x:54,y:79,t:'As figuras',d:'A disposição entre personagens ajuda a pensar sobre transmissão, rito e aprendizado.'}]
};
const cardType=c=>c.arcana==='major'?'Arcano Maior':'Arcano Menor · '+({paus:'Paus',copas:'Copas',espadas:'Espadas',ouros:'Ouros'}[c.suit]||'');
const grouped=kind=>kind==='all'?cards:kind==='major'?cards.filter(c=>c.arcana==='major'):cards.filter(c=>c.suit===kind);
let atlasState={kind:'all',query:''};
let focusPoint=0;
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
const filtered=()=>grouped(atlasState.kind).filter(c=>normalize([c.name,c.tagline,...c.keywords].join(' ')).includes(normalize(atlasState.query)));
export function atlasCardsExpanded(list){
 return list.length?list.map(c=>'<article class="atlas-item"><a href="#/carta/'+c.slug+'" aria-label="Explorar '+e(c.name)+'">'+cardImage(c)+'<span class="roman">'+e(c.numeral)+'</span><span class="name">'+e(c.name)+'</span></a></article>').join(''):'<div class="empty-state">Nenhuma carta encontrada. Experimente outra busca ou categoria.</div>';
}
export function atlasPageExpanded(){
 return '<div class="container"><header class="page-intro"><span class="eyebrow">Arquivo visual · 78 cartas</span><h1>Atlas de cartas.</h1><p class="lead">Explore os 22 Arcanos Maiores e os 56 Menores. Observe imagens, compare cartas e experimente a Lupa Simbólica nas fichas.</p></header><div class="atlas-filters" role="group" aria-label="Filtrar as cartas">'+kinds.map(k=>'<button type="button" class="atlas-filter" data-kind="'+k[0]+'" aria-pressed="'+(atlasState.kind===k[0])+'">'+k[1]+'</button>').join('')+'</div><div class="atlas-tools"><label class="search-field"><span class="sr-only">Buscar cartas por nome ou conceito</span><span aria-hidden="true" class="search-icon">⌕</span><input id="atlas-search" type="search" placeholder="Buscar uma carta ou tema…" value="'+e(atlasState.query)+'" autocomplete="off"></label><span class="atlas-count" id="atlas-count" role="status">'+filtered().length+' de 78 cartas</span></div><div class="atlas-grid" id="atlas-grid">'+atlasCardsExpanded(filtered())+'</div><p class="atlas-copyright">Imagens históricas de Pamela Colman Smith (Rider–Waite–Smith), consultadas no Wikimedia Commons. As fichas contêm estudos autorais aprofundados de imagens, possibilidades, limites e situações práticas. São hipóteses interpretativas, não previsões. As imagens dependem da disponibilidade do arquivo externo.</p></div>';
}
const lens=c=>accents[c.slug]||[{x:50,y:50,t:'Observe a composição',d:c.sight+' Relacione o que vê a uma pergunta; não confunda hipótese simbólica com fato.'}];
export function atlasDetailExpanded(c){
 const list=lens(c);const hasMarkers=Boolean(accents[c.slug]);focusPoint=0;
 const related=c.arcana==='major'?cards.filter(x=>x.arcana==='major'&&x.slug!==c.slug).slice(Math.max(0,c.rank-1),Math.max(0,c.rank-1)+3):cards.filter(x=>x.suit===c.suit&&x.slug!==c.slug).slice(0,3);
 return '<div class="container"><div class="page-intro"><div class="breadcrumb"><a href="#/atlas">Atlas</a> / '+e(cardType(c))+'</div></div><div class="atlas-detail"><article class="atlas-art-side"><div class="atlas-zoom-top"><span class="eyebrow">Exploração visual</span><button type="button" data-open-zoom="'+e(c.slug)+'" class="text-link atlas-zoom-button">Ampliar carta ↗</button></div><div class="atlas-lens-image" id="atlas-lens-image">'+cardImage(c,true)+(hasMarkers?list.map((p,i)=>'<button type="button" data-spot="'+i+'" style="--x:'+p.x+'%;--y:'+p.y+'%" aria-label="Explorar detalhe: '+e(p.t)+'" aria-pressed="'+(i===0)+'"><span>'+(i+1)+'</span></button>').join(''):'')+'</div><p class="atlas-touch-hint">'+(hasMarkers?'Toque em um marcador numerado para estudar um detalhe.':'Imagem sem marcadores sobrepostos. Use Ampliar carta para observar melhor.')+'</p><div class="atlas-lens-info" id="atlas-lens-info"><span class="eyebrow">Detalhe 1 de '+list.length+'</span><h3>'+e(list[0].t)+'</h3><p>'+e(list[0].d)+'</p></div></article><article class="atlas-details-copy prose"><span class="eyebrow">'+e(cardType(c))+' · '+e(c.numeral)+'</span><h1>'+e(c.name)+'</h1><p class="atlas-tagline">'+e(c.tagline)+'</p><div class="atlas-pill-row">'+c.keywords.map(k=>'<span class="tag">'+e(k)+'</span>').join('')+'</div>'+renderCardStudy(c)+'<h2>Comparar e relacionar</h2><p>Observe as cartas próximas e procure diferenças de gesto, ambiente e posição. Uma semelhança visual pode abrir perguntas, não estabelecer uma regra universal.</p><div class="atlas-related">'+related.map(x=>'<a href="#/carta/'+x.slug+'">'+cardImage(x)+'<span>'+e(x.name)+'</span></a>').join('')+'</div><p class="atlas-source"><strong>Imagem:</strong> '+e(c.imageLicense)+' <a href="'+e(c.commons)+'" target="_blank" rel="noopener noreferrer">Ver arquivo e licença ↗</a></p><a class="button secondary" href="#/atlas">← Voltar ao Atlas</a></article></div></div><div class="atlas-lightbox" id="atlas-lightbox" role="dialog" aria-modal="true" aria-label="Carta ampliada: '+e(c.name)+'" hidden><div class="lightbox-top"><span>'+e(c.name)+'</span><button type="button" id="close-atlas-zoom" aria-label="Fechar carta ampliada">Fechar ×</button></div><div class="lightbox-image">'+cardImage(c,true)+'</div><p>Toque em Fechar ou pressione Esc para retornar.</p></div>';
}
export function handleAtlasChange(target){
 if(target.id==='atlas-search'){atlasState.query=target.value;updateGrid();return true;}
 return false;
}
export function handleAtlasClick(target){
 const filter=target.closest('[data-kind]');
 if(filter){atlasState.kind=filter.dataset.kind;document.querySelectorAll('[data-kind]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.kind===atlasState.kind)));updateGrid();return true;}
 const spot=target.closest('[data-spot]');
 if(spot){const c=getCurrentCard();if(!c)return true;const points=lens(c),n=Number(spot.dataset.spot),p=points[n];if(!p)return true;focusPoint=n;document.querySelectorAll('[data-spot]').forEach(x=>x.setAttribute('aria-pressed',String(Number(x.dataset.spot)===n)));const panel=document.getElementById('atlas-lens-info');if(panel)panel.innerHTML='<span class="eyebrow">Detalhe '+(n+1)+' de '+points.length+'</span><h3>'+e(p.t)+'</h3><p>'+e(p.d)+'</p>';return true;}
 if(target.closest('[data-open-zoom]')){const box=document.getElementById('atlas-lightbox');if(box){box.hidden=false;document.body.classList.add('atlas-modal-open');box.querySelector('#close-atlas-zoom')?.focus();}return true;}
 if(target.closest('#close-atlas-zoom')){closeZoom();return true;}
 if(target.id==='atlas-lightbox'){closeZoom();return true;}
 return false;
}
function getCurrentCard(){const slug=decodeURIComponent(location.hash.split('/carta/')[1]||'').split('?')[0];return cards.find(c=>c.slug===slug);}
function updateGrid(){const grid=document.getElementById('atlas-grid'),count=document.getElementById('atlas-count');if(grid)grid.innerHTML=atlasCardsExpanded(filtered());if(count)count.textContent=filtered().length+' de 78 cartas';}
export function closeZoom(){const box=document.getElementById('atlas-lightbox');if(box&&!box.hidden){box.hidden=true;document.body.classList.remove('atlas-modal-open');document.querySelector('[data-open-zoom]')?.focus();}}
export function resetAtlasScroll(){document.body.classList.remove('atlas-modal-open');}
