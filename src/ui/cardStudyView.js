import {getCardStudy,editorialPrinciples} from '../data/cardStudies.js';
import {escapeHTML as e} from './templates.js';

const section=(number,title,text,id)=>'<section class="study-deep-section" id="'+id+'"><div class="study-section-marker" aria-hidden="true">'+number+'</div><div class="study-section-body"><h2>'+e(title)+'</h2><p>'+e(text)+'</p></div></section>';
const vignette=(title,text,klass)=>'<article class="study-vignette '+klass+'"><span class="eyebrow">'+e(title)+'</span><p>'+e(text)+'</p></article>';

export function renderCardStudy(c){
 const study=getCardStudy(c);
 if(!study)return '<p>Esta carta está aguardando revisão editorial aprofundada.</p>';
 const isMinor=study.type==='minor';
 const lede=isMinor?'Uma leitura construída a partir da cena, do naipe e do contexto.':'Uma investigação sobre como a imagem se organiza, quais relações ela sugere e onde uma interpretação precisa ter cuidado.';
 return '<div class="atlas-deep-reading">'
  +'<div class="atlas-reading-intro"><span class="eyebrow">CADERNO DE SÍMBOLOS · '+(isMinor?'ARCANOS MENORES':'ARCANOS MAIORES')+'</span><h2>Uma carta para <em>estudar,</em> não decorar.</h2><p>'+lede+'</p></div>'
  +(isMinor?'<div class="atlas-suit-brief"><div><span class="eyebrow">NAIPE / ELEMENTO SIMBÓLICO</span><strong>'+e(c.suit.toUpperCase())+' · '+e(study.suit.element)+'</strong></div><p><strong>Campo de questões:</strong> '+e(study.suit.field)+'. '+e(study.suit.scope)+'</p></div>':'')
  +'<div class="atlas-study-flow">'
  +section('01','Olhe antes de interpretar',study.visual,'atlas-observar')
  +section('02','O que a imagem coloca em jogo?',study.main,'atlas-compreender')
  +(isMinor?section('03','Naipe e posição na sequência',study.rank,'atlas-estrutura'):'')
  +'<div class="atlas-study-pair">'+vignette('A tensão que não deve ser apagada',study.tension,'atlas-tension')+vignette('Um exemplo da vida cotidiana',study.case,'atlas-case')+'</div>'
  +'<div class="atlas-study-prompt"><span aria-hidden="true" class="atlas-study-spark">✦</span><div><span class="eyebrow">EXPERIMENTO DE LEITURA</span><h3>Uma pergunta melhor que uma palavra-chave.</h3><p>'+e(study.question)+'</p></div></div>'
  +'<details class="atlas-study-context"><summary><span class="atlas-details-icon" aria-hidden="true">◇</span><span>Como esta carta se encaixa no baralho?</span><span aria-hidden="true">+</span></summary><div class="atlas-study-context-inner"><p>'+e(study.structure)+'</p>'+(isMinor?'<p>Além disso, observe a pergunta transversal deste naipe: '+e(study.suit.prompt)+'</p>':'')+'</div></details>'
  +'<details class="atlas-study-context"><summary><span class="atlas-details-icon" aria-hidden="true">✧</span><span>Pollack e Naiff: dois modos de estudar</span><span aria-hidden="true">+</span></summary><div class="atlas-study-context-inner"><p>'+e(study.comparative)+'</p></div></details>'
  +'<div class="atlas-method-check"><span class="eyebrow">ANTES DE FECHAR SUA INTERPRETAÇÃO</span><ol>'+editorialPrinciples.map(p=>'<li>'+e(p)+'</li>').join('')+'</ol></div>'
  +'<section class="atlas-reading-sources"><span class="eyebrow">BIBLIOGRAFIA E CRITÉRIO EDITORIAL</span><p>'+e(study.sources)+'</p><p><strong>Nota:</strong> os estudos destas fichas são textos didáticos originais do ARCANA. As referências acima orientam o aprofundamento e o contraste entre métodos; não representam uma atribuição textual de cada significado aos autores. A interpretação simbólica não comprova acontecimentos futuros ou fatos sobre terceiros.</p></section>'
  +'</div></div>';
}
