/**
 * ARCANA / Sprint 5
 * Duas disposições autorais para estudo. Não se apresentam como tiragens históricas
 * atribuídas a Pollack ou Naiff. A ordem das cartas não prevê acontecimentos.
 */
export const spreads = Object.freeze({
  tres: {
    id:'tres',
    title:'Três Perspectivas',
    subtitle:'Uma questão, três maneiras de pensar.',
    count:3,
    estimated:'8–12 min',
    summary:'Examine contexto, tensão e uma possibilidade de ação. É uma adaptação didática, não uma previsão de passado, presente e futuro.',
    positions:[
      {id:'contexto',name:'Contexto',prompt:'Que aspecto da situação já está presente e merece ser descrito?',helper:'Olhe o que aparece na carta. O que essa imagem ajuda a observar sobre o contexto?'},
      {id:'tensao',name:'Tensão',prompt:'Que contraste, dúvida ou limite pode ser investigado?',helper:'Em vez de supor um obstáculo inevitável, formule uma hipótese aberta.'},
      {id:'caminho',name:'Possibilidade',prompt:'Que pergunta útil ou pequeno passo pode surgir?',helper:'Transforme sua leitura em uma pergunta ou opção, não em uma garantia de futuro.'}
    ]
  },
  cinco: {
    id:'cinco',
    title:'Mapa de Perspectivas',
    subtitle:'Cinco posições para aprofundar uma questão.',
    count:5,
    estimated:'12–20 min',
    summary:'Uma estrutura autoral em cinco posições para relacionar fatores, recursos e alternativas sem transformar o tarô em resposta definitiva.',
    positions:[
      {id:'questao',name:'Questão',prompt:'Que aspecto central da pergunta precisa ser compreendido?',helper:'Escolha um detalhe da imagem que ajude a descrever a questão.'},
      {id:'tensao',name:'Contraste',prompt:'Que tensão ou ponto de vista diferente aparece?',helper:'Uma tensão não precisa ser um problema fatal. Procure relações entre imagens.'},
      {id:'recurso',name:'Recurso',prompt:'Que habilidade, atitude ou apoio pode ser considerado?',helper:'Relacione um detalhe verificável da carta a um recurso possível.'},
      {id:'alternativa',name:'Alternativa',prompt:'Que outro caminho ou interpretação merece espaço?',helper:'Imagine outra leitura plausível antes de concluir.'},
      {id:'sintese',name:'Síntese',prompt:'Que pergunta integradora fica depois de observar o conjunto?',helper:'Não responda como se as cartas previssem um resultado: reúna possibilidades.'}
    ]
  }
});
export const spreadIds=Object.keys(spreads);
