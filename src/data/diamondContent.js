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
   question:'Na leitura proposta por Pollack, o que une simbolicamente o Louco (0) e o Mundo (XXI)?',
   options:[
    {id:'a',text:'Representam dois modos simbólicos de unidade: potencialidade inicial e integração.',correct:true,explanation:'A autora relaciona o zero a possibilidades ainda não definidas e o Mundo à integração dos opostos. É uma leitura simbólica específica.'},
    {id:'b',text:'São cartas com o mesmo desenho, sem diferenças de postura.',correct:false,explanation:'As figuras compartilham uma qualidade de movimento, mas têm composições distintas. Compare roupas, cenário e posição.'},
    {id:'c',text:'Comprovam que o destino da pessoa já está determinado.',correct:false,explanation:'O capítulo trata de símbolos e desenvolvimento, não de uma garantia sobre eventos futuros.'}
   ]},
  {id:'horizontal',title:'Eixo horizontal',cards:['O Mago','A Sacerdotisa'],
   question:'Que relação Pollack observa entre o Mago (I) e a Sacerdotisa (II)?',
   options:[
    {id:'a',text:'O Mago simboliza o futuro; a Sacerdotisa descreve o passado de maneira literal.',correct:false,explanation:'A relação descrita não é uma fórmula temporal literal. Olhe as posturas e o contraste entre as cartas.'},
    {id:'b',text:'Constituem uma dualidade de estados mais fixos, colocada em relação ao eixo vertical.',correct:true,explanation:'Isso corresponde ao esquema do capítulo. A autora emprega polaridades simbólicas próprias de sua tradição, que não devem ser tomadas como categorias humanas universais.'},
    {id:'c',text:'As duas cartas representam exatamente a mesma atitude, sem tensão.',correct:false,explanation:'A comparação tem sentido justamente porque os símbolos e posições não são idênticos.'}
   ]}
 ],
 scenario:{
  heading:'E se o diamante fosse uma pergunta?',
  situation:'Uma pessoa quer iniciar um trabalho criativo. Tem muitas possibilidades e energia, mas sente dificuldade para escolher um caminho e trabalhar com constância.',
  question:'Qual resposta usa os dois eixos como ferramenta de reflexão, sem prever o futuro?',
  options:[
   {id:'a',text:'O Louco garante que ela terá sucesso; o Mundo confirma que tudo terminará bem.',correct:false,explanation:'A proposta transforma o símbolo em certeza sobre resultados. O exercício pede hipóteses fundamentadas, não garantias.'},
   {id:'b',text:'A abertura do Louco pode inspirar o início; a atenção do Mago aos recursos e a pausa da Sacerdotisa oferecem contrastes; o Mundo levanta a pergunta sobre integração.',correct:true,explanation:'Você fez as cartas dialogarem, relacionou-as à situação e preservou a natureza interpretativa do exercício.'},
   {id:'c',text:'A Sacerdotisa prova que a pessoa deve abandonar a ideia e nunca agir.',correct:false,explanation:'Uma única figura não determina a vida do consulente. A comparação entre cartas deve ampliar perguntas, não encerrar escolhas.'}
  ],
  reflection:'Que gesto pequeno poderia transformar a possibilidade do Louco em uma ação do Mago, sem abandonar a escuta da Sacerdotisa? O que significaria integrar essas atitudes no Mundo?',
  rubric:['Use ao menos dois detalhes das imagens.','Diferencie uma hipótese de uma certeza.','Conecte a leitura ao trabalho criativo, não a uma previsão.']
 }
});