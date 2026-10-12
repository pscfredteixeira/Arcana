import {accessibleCardProse} from './accessibleCardProse.js';
import {majorStudies} from './cardStudyMajors.js';
import {minorStudies,suitStudies} from './cardStudyMinorsA.js';
import {minorStudiesRest} from './cardStudyMinorsB.js';

/**
 * Estudos originais do ARCANA, produzidos a partir das cenas do
 * Rider–Waite–Smith. Não são traduções nem paráfrases diretas dos livros.
 * Pollack, Setenta e oito graus de sabedoria, parte I (Maiores), parte II
 * (Menores): base para o método humanístico de observar e relacionar.
 * Nei Naiff, Curso completo de tarô, lições 3–11 (estrutura dos Maiores),
 * 12–21 (Menores e sistema), e lição eletiva 4 (planos): perspectiva
 * complementar e DIVERGENTE de Pollack em detalhes importantes.
 */
export const allStudies=Object.freeze({...majorStudies,...minorStudies,...minorStudiesRest});
const paths=[
'Primeiro diga o que aparece no desenho. Depois explique o que isso pode significar.',
'Lembre que um significado é uma possibilidade de leitura, não uma garantia do que vai acontecer.',
'Se estiver em dúvida, compare com outra carta e pergunte que parte da situação ainda precisa entender.'
];
const courtNouns={11:'Valete/Pajem',12:'Cavaleiro',13:'Rainha',14:'Rei'};
const numberLearning={
1:'Nos Ases, a imagem costuma apresentar o naipe como potencialidade ou oferta. Uma possibilidade só se torna experiência quando encontra situações concretas.',
2:'O Dois cria uma relação: acordo, impasse, equilíbrio ou confronto entre posições que ainda precisam ser examinadas.',
3:'O Três sugere desdobramentos, cooperação ou efeitos da interação; observe quem participa e como o movimento se organiza.',
4:'O Quatro permite observar estruturas e condições de estabilidade, mas também limites e a possibilidade de estagnação.',
5:'O Cinco destaca fricções e dificuldades que exigem reorganização; a cena específica dirá se predominam perda, conflito ou desafio.',
6:'O Seis convida a olhar os efeitos de um processo e as relações sociais envolvidas: apoio, travessia, reconhecimento ou troca.',
7:'O Sete frequentemente exige revisão de estratégia, escolhas ou expectativas. O número não basta para definir o valor da experiência.',
8:'O Oito desloca o foco para um processo em andamento: trabalho, ação, limites ou uma travessia que pede continuidade.',
9:'O Nove abre perguntas sobre experiências acumuladas, satisfação, defesa ou autonomia, conforme o naipe e sua imagem.',
10:'O Dez apresenta uma fase de intensidade ou fechamento no interior do naipe; conclusão não implica necessariamente conforto.'
};
function rankText(c){
 if(c.rank<=10)return numberLearning[c.rank]||'Observe os elementos numerados e as relações entre eles.';
 const court=courtNouns[c.rank];
 return 'Esta é uma figura da corte: '+court+'. No tarô, as figuras da corte podem lembrar maneiras de agir ou papéis que alguém assume. Não precisam indicar uma pessoa com idade ou gênero específico. Observe o que a personagem está fazendo nesta imagem antes de tirar uma conclusão.';
}
export function getCardStudy(c){
 const item=allStudies[c.slug];
 if(!item)return null;
 if(c.arcana==='major'){
  return {
   type:'major',visual:c.sight,main:accessibleCardProse[c.slug]||item.depth,advanced:item.depth,advancedVisual:item.visual,tension:item.tension,
   case:item.example,question:item.explore,
   structure:'Os Arcanos Maiores são as 22 cartas com nomes, como O Louco e A Justiça. Você pode estudar cada uma separadamente ou compará-las como uma sequência. Rachel Pollack explora essas relações entre imagens. Nei Naiff apresenta seis grupos para estudar os Maiores. São maneiras de organizar os significados, não acontecimentos que todas as pessoas terão de viver.',
   comparative:'Nem todos os livros usam a mesma ordem das cartas. No baralho Rider–Waite–Smith, A Força é a carta VIII (8) e A Justiça é a carta XI (11). Nei Naiff apresenta essas duas cartas com a ordem invertida. Para comparar livros, observe o nome e a figura da carta, não só seu número.',
   sources:'Rachel Pollack, Setenta e oito graus de sabedoria, Parte I, capítulos 1–6; Nei Naiff, Curso completo de tarô, lições 6–11 (organização dos Maiores). Estas passagens são orientação geral de estudo, não atribuição de cada parágrafo ao autor.'
  };
 }
 const suit=suitStudies[c.suit];
 return {
  type:'minor',visual:c.sight,main:accessibleCardProse[c.slug]||item.reading,advanced:item.reading,tension:item.counter,
  case:item.case,question:item.question,
  suit:suit,rank:rankText(c),
  structure:'Os Arcanos Menores têm quatro naipes: Paus, Copas, Espadas e Ouros. Cada um tem dez cartas numeradas e quatro figuras da corte (Valete, Cavaleiro, Rainha e Rei). Muitas cartas mostram cenas com pessoas e objetos. Primeiro, olhe o que acontece; depois, veja como a cena ajuda a entender o significado.',
  comparative:'A associação '+(c.suit==='paus'?'Paus–Fogo':c.suit==='copas'?'Copas–Água':c.suit==='espadas'?'Espadas–Ar':'Ouros–Terra')+' pertence à convenção de estudo adotada aqui. Nei Naiff usa quatro campos para explicar situações: recursos materiais, pensamentos, sentimentos e espiritualidade. Em seu método, os Menores ajudam a detalhar a leitura dos Maiores. Pollack destaca a importância de olhar as cenas e comparar cartas. Os autores usam maneiras diferentes de ensinar. No começo, basta saber que existem métodos variados e observar a imagem da carta que está estudando.',
  sources:'Rachel Pollack, Setenta e oito graus de sabedoria, Parte II, capítulos 7–10 (cenas e quatro naipes); Nei Naiff, Curso completo de tarô, estudo dos Menores e lição eletiva 4 (quatro planos). As reflexões específicas nesta ficha são autorais e não citações literais.'
 };
}
export const editorialPrinciples=Object.freeze(paths);
