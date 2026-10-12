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
1:'O Ás é a primeira carta numerada de um naipe. Em muitas imagens, ele apresenta uma possibilidade de começo. Veja o que é oferecido e pense no que precisaria acontecer para essa ideia se tornar real.',
2:'O Dois mostra duas unidades do mesmo naipe. Pode ajudar a pensar em uma escolha, troca ou equilíbrio. Observe a cena para descobrir se as duas partes estão cooperando ou enfrentando um problema.',
3:'O Três mostra três unidades. Em muitas cartas, isso abre espaço para uma ação compartilhada ou para os resultados de algo que começou. O desenho desta carta ajuda a descobrir qual é o caso.',
4:'O Quatro costuma ajudar a pensar em manter alguma coisa organizada. Mas a mesma segurança que protege também pode prender. Veja se as figuras parecem confortáveis ou limitadas.',
5:'O Cinco é muitas vezes uma carta de desafio. Ele pode mostrar discussões, perdas ou falta de recursos. O tipo de dificuldade muda conforme o naipe e o que a cena apresenta.',
6:'O Seis costuma mostrar o que acontece depois de uma dificuldade ou movimento anterior. Observe se a carta fala de ajuda, passagem, reconhecimento ou relações entre pessoas.',
7:'O Sete pede atenção ao caminho escolhido. Às vezes precisamos insistir; em outras, pensar melhor nas opções. Olhe primeiro para o que a personagem faz.',
8:'O Oito costuma mostrar alguma coisa em andamento. Pode haver movimento, estudo, trabalho ou limites que precisam ser enfrentados. Descubra qual situação está presente nesta imagem.',
9:'O Nove costuma lembrar algo que já foi vivido e acumulado. A pessoa pode estar satisfeita, protegida ou cansada. O naipe e a cena mostram qual dessas ideias fica mais forte.',
10:'O Dez fecha a sequência das dez cartas numeradas do naipe. Isso pode significar realização ou excesso. Não pense que todo final é feliz ou ruim: veja o que acontece no desenho.'
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
