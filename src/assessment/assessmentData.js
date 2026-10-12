/**
 * ARCANA — Avaliação de aprendizagem 1.
 * Quatro capacidades observáveis e uma interpretação escrita de transferência.
 * Textos autorais baseados nos significados introdutórios do baralho RWS.
 * Não é prova de adivinhação nem certificação.
 */
export const assessmentItems=Object.freeze([
 {
  id:'estrutura',competency:'Reconhecer o baralho',card:'as-de-copas',
  prompt:'Você recebeu um baralho de tarô com 78 cartas. Qual alternativa descreve corretamente a divisão do baralho?',
  options:[
   {id:'a',text:'22 Arcanos Maiores e 56 Arcanos Menores.',correct:true,why:'Certo: são 22 Maiores e 56 Menores. Os Menores se dividem em quatro naipes de 14 cartas.'},
   {id:'b',text:'56 Arcanos Maiores e 22 Arcanos Menores.',correct:false,why:'Você inverteu os grupos. Os Maiores são 22; os Menores são 56, organizados em quatro naipes.'},
   {id:'c',text:'78 Arcanos Maiores; os Menores são outro baralho.',correct:false,why:'As 78 cartas são o conjunto todo. Nesse total estão tanto os Maiores quanto os Menores.'}
  ],
  hint:'Pense na conta: 22 + 56 = 78. Qual parte tem 22 cartas?',
  rationale:'Arcano é o nome tradicional de uma carta. Maior e Menor são os dois grandes grupos do baralho.',
  review:{text:'Rever a divisão do baralho',url:'#/aula/mapa-78-cartas'}
 },
 {
  id:'observacao',competency:'Observar antes de interpretar',card:'cinco-de-copas',
  prompt:'Veja o Cinco de Copas. Qual frase descreve algo que realmente aparece no desenho, sem adivinhar o que acontecerá?',
  options:[
   {id:'a',text:'A pessoa perderá todas as amizades.',correct:false,why:'O desenho não revela acontecimentos futuros nem permite afirmar o que acontecerá com as amizades de uma pessoa.'},
   {id:'b',text:'Uma figura olha para taças caídas, enquanto outras permanecem de pé.',correct:true,why:'Essa frase é observação: podemos apontar as taças e a figura na imagem. O significado vem depois.'},
   {id:'c',text:'A pessoa está condenada à tristeza para sempre.',correct:false,why:'Uma carta não mostra o destino de alguém. A cena inclui taças caídas e taças que ainda estão em pé.'}
  ],
  hint:'Uma observação é algo que você consegue apontar com o dedo no desenho. Não fale do futuro da personagem.',
  rationale:'Descrever a imagem não é o mesmo que interpretar o que ela poderia representar.',
  review:{text:'Praticar a observação do desenho',url:'#/aula/primeiro-olhar'}
 },
 {
  id:'significado',competency:'Explicar o significado',card:'tres-de-ouros',
  prompt:'No Três de Ouros, vemos pessoas participando de um trabalho numa construção. Por que essa carta costuma falar de colaboração?',
  options:[
   {id:'a',text:'Porque toda carta de Ouros garante sucesso financeiro.',correct:false,why:'Ouros pode lembrar trabalho e recursos, mas não garante dinheiro. O tema de colaboração vem das várias pessoas na cena.'},
   {id:'b',text:'Porque podemos descobrir os pensamentos de cada personagem.',correct:false,why:'A carta não dá acesso aos pensamentos. Observe ações e a presença das pessoas trabalhando juntas.'},
   {id:'c',text:'Porque a cena mostra pessoas contribuindo para uma atividade comum.',correct:true,why:'Isso mesmo. O significado de trabalho em equipe se relaciona ao que as figuras estão fazendo juntas.'}
  ],
  hint:'Procure uma resposta que explique a ligação entre o que as pessoas fazem e o significado da carta.',
  rationale:'Uma interpretação fica mais clara quando explicamos por que o desenho lembra aquela ideia.',
  review:{text:'Rever o Três de Ouros no Atlas',url:'#/carta/tres-de-ouros'}
 },
 {
  id:'aplicacao',competency:'Usar a carta numa situação nova',card:'sete-de-ouros',
  prompt:'Uma pessoa estuda há meses, mas não sabe se deve manter o mesmo método. Como o Sete de Ouros pode ajudar a pensar nessa situação?',
  options:[
   {id:'a',text:'A imagem lembra cultivo e avaliação: ela pode rever resultados e ajustar a maneira de estudar.',correct:true,why:'Certo. A pessoa da carta observa algo que foi cultivado. Isso pode lembrar a importância de avaliar resultados antes de continuar.'},
   {id:'b',text:'A carta garante que a pessoa terá uma nota excelente no próximo exame.',correct:false,why:'Nenhuma carta garante notas. O desenho pode inspirar uma pergunta sobre esforço, avaliação e ajustes.'},
   {id:'c',text:'A carta obriga a abandonar os estudos imediatamente.',correct:false,why:'A imagem não dá ordens. Ela pode servir para avaliar se vale continuar ou mudar o método.'}
  ],
  hint:'No desenho, uma pessoa observa plantas que cultivou. Pense no que fazer depois de avaliar o que cresceu.',
  rationale:'Aplicar o significado não é prever o resultado: é formular uma reflexão ligada ao problema real.',
  review:{text:'Estudar o Sete de Ouros no Atlas',url:'#/carta/sete-de-ouros'}
 }
]);
export const transferTask=Object.freeze({
 card:'seis-de-espadas',
 title:'Agora explique uma carta com suas palavras',
 setup:'Uma pessoa vai mudar de emprego depois de uma fase difícil. Ela espera melhorar, mas ainda sente o peso da experiência anterior.',
 question:'Observe o Seis de Espadas e escreva de três a cinco frases: o que você vê, que significado a imagem pode sugerir e qual pergunta faria a essa pessoa.',
 starter:'Na imagem, eu vejo ... Isso pode lembrar ... Na mudança de emprego, eu perguntaria ...',
 example:'Vejo pessoas atravessando a água num barco com espadas. O deslocamento pode representar uma mudança depois de um período difícil. As espadas seguem no barco, o que me faz pensar que as experiências anteriores não desaparecem de uma vez. Eu perguntaria: que apoios essa pessoa pode levar para o novo trabalho?',
 criteria:Object.freeze([
  'Descrevi pelo menos um detalhe visível da carta.',
  'Expliquei a ligação entre esse detalhe e um significado possível.',
  'Fiz uma pergunta sobre a situação sem prometer um resultado.'
 ]),
 review:{text:'Rever o Seis de Espadas no Atlas',url:'#/carta/seis-de-espadas'}
});
export const allCompetencies=Object.freeze([...assessmentItems.map(i=>i.competency),'Interpretar uma carta diferente']);
