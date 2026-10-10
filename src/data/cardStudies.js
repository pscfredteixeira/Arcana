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
'Separar o que está presente na imagem daquilo que o leitor acrescenta.',
'Interpretar como hipótese contextualizada, nunca como diagnóstico ou previsão comprovada.',
'Comparar cartas e tradições antes de transformar uma palavra-chave em regra.'
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
 return 'Como figura da corte, '+court+' pode representar atitudes, maneiras de agir ou funções numa história. Não é necessário associar a carta a uma pessoa de idade ou gênero específicos; as cortes são um vocabulário simbólico e variam entre tradições.';
}
export function getCardStudy(c){
 const item=allStudies[c.slug];
 if(!item)return null;
 if(c.arcana==='major'){
  return {
   type:'major',visual:item.visual,main:item.depth,tension:item.tension,
   case:item.example,question:item.explore,
   structure:'Os 22 Maiores formam um campo de imagens nomeadas, com sequências e relações possíveis. Em Pollack, podem ser observados como etapas de experiência e consciência, sem supor que toda pessoa viva uma jornada idêntica. Naiff organiza parte dos Maiores em seis caminhos com títulos e faixas próprios.',
   comparative:'Na organização RWS desta escola, A Força é VIII e A Justiça XI. Naiff trabalha com uma sequência que as apresenta em outra posição. O nome e o desenho da carta devem ser considerados antes de transportar interpretações entre baralhos.',
   sources:'Rachel Pollack, Setenta e oito graus de sabedoria, Parte I, capítulos 1–6; Nei Naiff, Curso completo de tarô, lições 6–11 (organização dos Maiores). Estas passagens são orientação geral de estudo, não atribuição de cada parágrafo ao autor.'
  };
 }
 const suit=suitStudies[c.suit];
 return {
  type:'minor',visual:c.sight,main:item.reading,tension:item.counter,
  case:item.case,question:item.question,
  suit:suit,rank:rankText(c),
  structure:'Cada um dos quatro naipes possui dez cartas numeradas e quatro figuras da corte. No Rider-Waite-Smith, Pamela Colman Smith desenhou cenas em muitas das cartas numeradas, abrindo relações que ultrapassam a contagem de objetos. O significado nasce do diálogo entre a cena, o naipe, a pergunta e outras cartas.',
  comparative:'A associação '+(c.suit==='paus'?'Paus–Fogo':c.suit==='copas'?'Copas–Água':c.suit==='espadas'?'Espadas–Ar':'Ouros–Terra')+' pertence à convenção de estudo adotada aqui. Nei Naiff distingue os planos material, mental, sentimental e espiritual e utiliza os Menores como auxiliares dos Maiores em seu método de pares. Pollack dá destaque à leitura das cenas e às combinações. São enfoques diferentes; nenhum substitui a observação desta carta.',
  sources:'Rachel Pollack, Setenta e oito graus de sabedoria, Parte II, capítulos 7–10 (cenas e quatro naipes); Nei Naiff, Curso completo de tarô, estudo dos Menores e lição eletiva 4 (quatro planos). As reflexões específicas nesta ficha são autorais e não citações literais.'
 };
}
export const editorialPrinciples=Object.freeze(paths);
