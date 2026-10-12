/**
 * ARCANA · Diamante dos Arcanos — conteúdo pedagógico original.
 * Inspirado na configuração de quatro cartas do cap. 1 de Rachel Pollack,
 * Setenta e oito graus de sabedoria, pp. 31–33 da edição impressa
 * (PDF de trabalho, pp. 32–34).
 * Não reproduz os parágrafos do livro.
 */
export const diamondContent = Object.freeze({
 title:'O Diamante dos Arcanos',
 subtitle:'Quatro imagens. Duas linhas. Muitas possibilidades.',
 author:'Rachel Pollack',
 source:'Setenta e oito graus de sabedoria, capítulo 1: A tiragem de quatro cartas (edição impressa, pp. 31–33; PDF de trabalho, pp. 32–34).',
 placements:{
   top:{card:'o-louco',name:'Topo',idea:'No eixo vertical, o Louco representa a abertura do potencial, antes de uma forma definida.'},
   left:{card:'o-mago',name:'Esquerda',idea:'Na lateral esquerda, o Mago participa da oposição horizontal proposta por Pollack.'},
   right:{card:'a-sacerdotisa',name:'Direita',idea:'Na lateral direita, a Sacerdotisa forma a outra posição da dualidade horizontal.'},
   bottom:{card:'o-mundo',name:'Base',idea:'Na base vertical, o Mundo figura a integração simbólica da experiência.'}
 },
 phases:[
  {number:'01',name:'Compor',short:'Disponha as cartas no diamante original.'},
  {number:'02',name:'Relacionar',short:'Investigue o sentido dos dois eixos.'},
  {number:'03',name:'Interpretar',short:'Experimente uma leitura no contexto.'}
 ],
 axes:[
  {id:'vertical',title:'Eixo vertical',cards:['O Louco','O Mundo'],
   question:'Na comparação feita por Rachel Pollack, o que O Louco e O Mundo podem representar?',
   options:[
    {id:'a',text:'O Louco pode lembrar o começo cheio de possibilidades. O Mundo pode lembrar a conclusão e o que foi aprendido.',correct:true,explanation:'Isso resume a comparação feita por Pollack: a primeira carta abre possibilidades e a última pode representar a reunião da experiência. É uma interpretação simbólica, não um destino obrigatório.'},
    {id:'b',text:'As duas cartas mostram exatamente o mesmo desenho, sem diferença alguma.',correct:false,explanation:'Os desenhos são diferentes. Olhe para o lugar onde as pessoas estão e para a posição de seus corpos.'},
    {id:'c',text:'Comprovam que o destino da pessoa já está determinado.',correct:false,explanation:'O capítulo trata de símbolos e desenvolvimento, não de uma garantia sobre eventos futuros.'}
   ]},
  {id:'horizontal',title:'Eixo horizontal',cards:['O Mago','A Sacerdotisa'],
   question:'Qual diferença aparece quando comparamos O Mago e A Sacerdotisa?',
   options:[
    {id:'a',text:'O Mago sempre prevê o futuro e A Sacerdotisa sempre descreve o passado.',correct:false,explanation:'As cartas não funcionam como relógio. Compare as posturas: uma figura faz gestos diante de ferramentas, a outra está sentada.'},
    {id:'b',text:'O Mago pode lembrar ação; A Sacerdotisa, observação e espera. Pollack compara essas duas atitudes.',correct:true,explanation:'É essa a comparação do livro: duas maneiras de se relacionar com uma situação. As duas atitudes podem existir na mesma pessoa.'},
    {id:'c',text:'As duas cartas representam exatamente a mesma atitude e não há diferença a observar.',correct:false,explanation:'A comparação tem sentido justamente porque os símbolos e posições não são idênticos.'}
   ]}
 ],
 scenario:{
  heading:'E se o diamante fosse uma pergunta?',
  situation:'Uma pessoa quer iniciar um trabalho criativo. Tem muitas possibilidades e energia, mas sente dificuldade para escolher um caminho e trabalhar com constância.',
  question:'Qual resposta ajuda a pensar no projeto, usando as cartas sem prometer o futuro?',
  options:[
   {id:'a',text:'O Louco garante que ela terá sucesso; o Mundo confirma que tudo terminará bem.',correct:false,explanation:'A proposta transforma o símbolo em certeza sobre resultados. O exercício pede hipóteses fundamentadas, não garantias.'},
   {id:'b',text:'O Louco lembra começar; O Mago lembra usar recursos; A Sacerdotisa lembra parar para pensar; O Mundo ajuda a perguntar como juntar tudo o que foi aprendido.',correct:true,explanation:'Boa leitura: você explicou o sentido de cada carta e ligou essas ideias ao projeto, sem prometer resultado.'},
   {id:'c',text:'A Sacerdotisa prova que a pessoa deve abandonar a ideia e nunca agir.',correct:false,explanation:'A carta não pode decidir a vida de alguém. Ela ajuda a formular perguntas, não a impor uma escolha.'}
  ],
  reflection:'Que gesto pequeno poderia transformar a possibilidade do Louco em uma ação do Mago, sem abandonar a escuta da Sacerdotisa? O que significaria integrar essas atitudes no Mundo?',
  rubric:['Use ao menos dois detalhes das imagens.','Diferencie uma hipótese de uma certeza.','Conecte a leitura ao trabalho criativo, não a uma previsão.']
 }
});