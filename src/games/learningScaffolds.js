/**
 * ARCANA | Apoio pedagógico para exercícios e jogos.
 * Ensino antes da pergunta: objetivo explícito, exemplo resolvido,
 * pista opcional e explicação de erros — sem depender de hover ou arrastar.
 * O HTML é escapado, e a dica pode ser lida por teclado e VoiceOver.
 */
import {escapeHTML as esc} from '../ui/templates.js';

export function learningScaffold({title='Antes de responder',explanation,example,hint}){
 if(typeof explanation!=='string'||!explanation.trim())throw Error('Explicação inicial obrigatória');
 return '<aside class="practice-teach-first" aria-label="Orientação antes do exercício">'
  +'<span class="eyebrow">ENTENDA ANTES DE TENTAR</span>'
  +'<h4>'+esc(title)+'</h4><p>'+esc(explanation)+'</p>'
  +(example?'<div class="practice-worked-example"><strong>Exemplo explicado</strong><p>'+esc(example)+'</p></div>':'')
  +(hint?'<details class="practice-optional-hint"><summary>Preciso de uma dica <span aria-hidden="true">+</span></summary><p>'+esc(hint)+'</p></details>':'')
  +'</aside>';
}
export const beginnerExercises=Object.freeze({
 firstLook:[
  {title:'Observar é descrever, não adivinhar',explanation:'Você vai escolher a frase que mostra um detalhe que qualquer pessoa consegue conferir no desenho.',example:'“O Louco carrega uma pequena bolsa” é observação. “A bolsa significa que ele ficará rico” já é uma interpretação sem prova.',hint:'Procure a alternativa que descreve algo visível. Não precisa supor como o personagem se sente nem o que vai acontecer.'},
  {title:'O mesmo detalhe pode lembrar uma ideia',explanation:'A borda do precipício é visível. Associá-la a risco é uma interpretação possível, não a previsão de um acidente.',example:'“A ponte pode lembrar uma passagem” é uma interpretação. “A ponte garante uma viagem amanhã” é uma previsão sem base.',hint:'Uma boa hipótese usa palavras como “pode” ou “lembra”, e não “sempre acontece” ou “garante”.'},
  {title:'Relacione a imagem com a pergunta',explanation:'Na situação do exercício, a pessoa está começando um curso. Pense no entusiasmo de iniciar algo e nos cuidados necessários.',example:'Em vez de dizer “você vai passar”, pergunte “como você pode se organizar para estudar?”.',hint:'Procure a opção que reconhece o começo e também os desafios. Nenhuma carta pode garantir sucesso ou fracasso.'}
 ],
 course:{
  'mapa-78-cartas':[
   {title:'Entenda os dois grupos',explanation:'Um baralho tem 78 cartas: 22 Maiores e 56 Menores. Os Menores formam quatro grupos chamados naipes.',example:'Imagine 78 fichas. Ao separar as 22 cartas com nomes como O Louco, sobram 56 fichas.',hint:'Faça a conta 78 menos 22. O resultado é a quantidade de Menores.'},
   {title:'Conte as cartas de um naipe',explanation:'Cada naipe tem 14 cartas: dez numeradas (Ás a Dez) e quatro figuras da corte (Valete, Cavaleiro, Rainha e Rei).',example:'O naipe de Copas tem Ás, Dois, Três... Dez, mais quatro figuras. São 14.',hint:'Conte primeiro as dez cartas numeradas e depois acrescente as quatro figuras.'},
   {title:'Nomes iguais podem ter números diferentes',explanation:'No Rider–Waite–Smith, A Força é VIII e A Justiça é XI. No sistema apresentado por Naiff, essas posições mudam.',example:'Um livro pode escrever Justiça VIII e outro Justiça XI: confira a tradição de cada um antes de pensar em erro.',hint:'A questão é sobre a ordem usada por cada baralho, não sobre qual autor está “certo”.'}
  ],
  'mago-e-sacerdotisa':[
   {title:'Primeiro, descreva a imagem',explanation:'A pergunta pede algo visível na carta O Mago. Objetos, roupas e gestos podem ser observados; pensamentos e previsões não.',example:'“Há ferramentas sobre a mesa” é observação. “O personagem certamente terá sucesso” não é.',hint:'Escolha a frase que você conseguiria demonstrar apontando para o desenho.'},
   {title:'A Sacerdotisa fala de observar antes de agir',explanation:'A carta mostra uma figura sentada entre colunas, com um véu atrás. Esses detalhes podem lembrar pausa, atenção e assuntos ainda não compreendidos.',example:'Diante de uma proposta sem informações suficientes, você pode fazer perguntas antes de decidir.',hint:'Procure uma leitura que usa o desenho para formular uma pergunta, sem afirmar que alguém esconde um segredo.'},
   {title:'Agir e observar podem caminhar juntos',explanation:'O Mago pode lembrar iniciativa. A Sacerdotisa pode lembrar escuta e investigação. Uma situação pode exigir as duas atitudes.',example:'Antes de iniciar um emprego, reúna informações; depois, organize os recursos para começar.',hint:'A resposta mais cuidadosa não transforma nenhuma das cartas em ordem absoluta.'}
  ],
  'quatro-naipes':[
   {title:'Aprenda as quatro correspondências',explanation:'Nesta tradição de estudo: Paus lembra ação e Fogo; Copas lembra sentimentos e Água; Espadas lembra pensamento e Ar; Ouros lembra recursos concretos e Terra.',example:'Se a questão é dinheiro para uma mudança, pense em Ouros e Terra. Se é o que você sente com a mudança, pense em Copas e Água.',hint:'Lembre dos objetos: bastão = Paus/Fogo; taça = Copas/Água; lâmina = Espadas/Ar; moeda = Ouros/Terra.'},
   {title:'Autores podem dar ênfases diferentes',explanation:'Pollack associa Paus à atividade e à iniciativa. Naiff também usa Fogo em Paus, mas o insere em seu plano espiritual.',example:'Duas pessoas podem estudar a mesma carta e usar métodos diferentes, desde que deixem claro qual método estão seguindo.',hint:'Procure a alternativa que reconhece uma diferença de ênfase sem dizer que só existe uma interpretação.'},
   {title:'Use cada naipe como uma pergunta',explanation:'Os naipes ajudam a separar aspectos de uma situação: Ouros = recursos; Espadas = escolhas; Copas = afetos; Paus = ação.',example:'Ao mudar de casa, confira os custos (Ouros), organize decisões (Espadas), pense nos vínculos (Copas) e planeje o começo (Paus).',hint:'Evite as alternativas que prometem acontecimentos certos ou dão ordens com base nas cartas.'}
  ]
 },
 diamond:{
  compose:{title:'Como funciona o diamante?',explanation:'Nesta atividade, você monta a disposição de quatro cartas apresentada por Rachel Pollack. Duas formam a linha vertical e duas ficam lado a lado.',example:'O Louco representa o começo e fica na parte de cima; O Mundo representa a conclusão e fica embaixo. O Mago e A Sacerdotisa são comparados na linha horizontal.',hint:'Topo: O Louco. Base: O Mundo. À esquerda: O Mago. À direita: A Sacerdotisa. Você pode consultar esta dica e montar com calma.'},
  vertical:{title:'Começo e conclusão',explanation:'O Louco tem o número zero e costuma falar de possibilidades iniciais. O Mundo tem o número XXI e costuma lembrar conclusão e integração.',example:'Uma pessoa começa a aprender algo (Louco), pratica e, mais tarde, reúne o que aprendeu num resultado (Mundo).',hint:'A relação é entre início e conclusão; nenhuma das cartas garante fatos do futuro.'},
  horizontal:{title:'Fazer e observar',explanation:'O Mago aparece diante de ferramentas; A Sacerdotisa está sentada entre colunas. Pollack usa esse contraste para estudar duas atitudes diferentes.',example:'Ao preparar um projeto, usamos recursos (Mago) e também paramos para analisar informações (Sacerdotisa).',hint:'Busque uma alternativa que reconheça o contraste entre as figuras, sem dizer que elas são iguais ou que representam passado/futuro literais.'},
  scenario:{title:'Uma leitura reúne os sentidos',explanation:'A situação fala de um projeto criativo. Pense no que cada carta acrescenta: começar, agir, observar e reunir aprendizados.',example:'Uma pergunta útil seria: “Que primeiro passo posso dar e que informações ainda preciso buscar?”.',hint:'A resposta mais cuidadosa reúne as cartas e faz perguntas, em vez de prometer sucesso ou mandar abandonar o projeto.'}
 }
});
export const atelierTeaching=Object.freeze({
 'o-louco':{explanation:'O Louco costuma falar de começo, curiosidade e atenção aos riscos. A borda, o cão e a bolsa ajudam a explicar essas ideias.',example:'Alguém quer começar a estudar em outra cidade. Pode pesquisar despesas e procurar apoio antes de se mudar.',hint:'Procure uma resposta que diga o que a imagem PODE sugerir, sem prometer acidentes nem ações de outra pessoa.'},
 'o-mago':{explanation:'O Mago costuma falar de iniciativa: ele tem ferramentas sobre a mesa e pode começar a usá-las.',example:'Quem quer pintar um quadro precisa conhecer os materiais e dar o primeiro passo.',hint:'Uma boa resposta relaciona a mesa a recursos e o gesto a ação; o desenho não garante lucros.'},
 'a-sacerdotisa':{explanation:'A Sacerdotisa costuma falar de atenção e espera: ela está sentada entre colunas, diante de um véu.',example:'Se uma proposta de trabalho está incompleta, você pode pedir detalhes antes de responder.',hint:'A postura e o véu não provam que há crime ou segredos. Procure a pergunta mais cuidadosa.'}
});
export function pathTeaching(p){
 if(!p||typeof p.range!=='string')return null;
 const roman='I = 1, V = 5, X = 10, XVII = 17, XVIII = 18, XXI = 21.';
 return {
  title:'Leia primeiro o número das cartas',
  explanation:'No mapa de Nei Naiff, o caminho '+p.name+' reúne o número '+p.range+'. Procure nas opções uma carta cuja numeração pertença a essa faixa. Aqui seguimos os números do Rider–Waite–Smith.',
  example:'Exemplo de como ler: VI é 6. Se um grupo inclui VI, o número 6 está dentro dele. '+roman,
  hint:'Procure o algarismo romano impresso na opção. Compare-o com a faixa '+p.range+' antes de pensar no significado da figura.'
 };
}
