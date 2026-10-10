/**
 * ARCANA — Atelier de Símbolos e Seis Caminhos.
 * Didática e exemplos autorais. O estudo iconográfico RWS é orientado por
 * Rachel Pollack, Setenta e oito graus de sabedoria (caps. 1–3).
 * Divisão em caminhos segundo Nei Naiff, Curso completo de tarô
 * (lições 6–11; PDF de trabalho, p. 47, 59, 68, 77, 89 e 93).
 * Os exercícios não são tiragens históricas dos autores.
 */
export const ATELIER_KEY='arcana-atelier-v1';
export const PATHS_KEY='arcana-six-paths-v1';
export const ateliers=[
 {
  slug:'o-louco',imageName:'O Louco',eyebrow:'01 / O limiar',theme:'Entre a possibilidade e o risco',
  intro:'As imagens podem sustentar ideias diferentes. Investigue o que aparece, antes de decidir o sentido.',
  points:[
   {id:'borda',x:76,y:73,name:'A borda',observable:'Há uma passagem junto à borda rochosa.',interpretation:'O limite pode inspirar perguntas sobre o que ainda não conhecemos.',question:'Que informações faltam antes do próximo passo?'},
   {id:'animal',x:76,y:81,name:'O pequeno animal',observable:'Um animal aparece próximo ao viajante.',interpretation:'A companhia pode ser lida como apoio ou alerta, dependendo do contexto.',question:'Que sinais e apoios estão por perto?'},
   {id:'bagagem',x:59,y:28,name:'A pequena bagagem',observable:'A figura carrega uma pequena bolsa presa a um bastão.',interpretation:'Essa escolha visual pode convidar a examinar os recursos com que começamos.',question:'O que já tenho para iniciar o percurso?'}
  ],
  bridge:{context:'Uma pessoa está pensando em mudar de cidade para estudar.',options:[
   {text:'A borda demonstra que a mudança provocará um acidente.',valid:false,why:'Uma imagem simbólica não determina acontecimentos reais.'},
   {text:'A borda pode inspirar a pergunta sobre riscos e informações ainda desconhecidas; o movimento sugere abertura ao começo.',valid:true,why:'Esta hipótese conecta observações, contexto e uma pergunta útil, sem antecipar o resultado.'},
   {text:'O animal prova que um amigo a acompanhará na viagem.',valid:false,why:'A presença de um animal na carta não comprova ações futuras de outras pessoas.'}
  ]}
 },
 {
  slug:'o-mago',imageName:'O Mago',eyebrow:'02 / Os recursos',theme:'O que posso mobilizar?',
  intro:'O Mago nos convida a observar ferramentas, gestos e a maneira de apresentar uma ação.',
  points:[
   {id:'maos',x:51,y:27,name:'Os dois gestos',observable:'Uma mão se ergue, enquanto a outra aponta para a terra.',interpretation:'Pollack relaciona a figura à passagem do potencial à ação dirigida.',question:'Qual ideia precisa se tornar um gesto concreto?'},
   {id:'mesa',x:53,y:75,name:'A mesa',observable:'Há objetos de diferentes naipes diante da personagem.',interpretation:'A variedade de instrumentos pode representar recursos disponíveis.',question:'Que recursos já estão ao meu alcance?'},
   {id:'infinito',x:53,y:14,name:'O sinal do infinito',observable:'Acima da figura aparece um símbolo semelhante a um oito deitado.',interpretation:'É possível estudar esse sinal como parte do repertório esotérico da imagem, sem atribuir-lhe poderes demonstrados.',question:'Que símbolo da imagem merece uma pesquisa própria?'}
  ],
  bridge:{context:'Uma pessoa quer começar um pequeno projeto artístico e dispõe de materiais, mas ainda não iniciou.',options:[
   {text:'A mesa pode ajudar a reconhecer os recursos disponíveis; os gestos levantam a pergunta sobre como começar.',valid:true,why:'Você conectou o que está na imagem a uma hipótese contextual e verificável como pergunta.'},
   {text:'O Mago comprova que o projeto será lucrativo.',valid:false,why:'O simbolismo não substitui informações sobre custo, público ou resultados.'},
   {text:'O sinal do infinito prova que não há limites para o orçamento.',valid:false,why:'Símbolos não eliminam restrições materiais.'}
  ]}
 },
 {
  slug:'a-sacerdotisa',imageName:'A Sacerdotisa',eyebrow:'03 / O intervalo',theme:'O valor da pausa e da escuta',
  intro:'Observe os limites do espaço, a composição frontal e a postura da personagem.',
  points:[
   {id:'colunas',x:24,y:31,name:'As colunas',observable:'Duas colunas diferentes delimitam a figura central.',interpretation:'As colunas permitem investigar contrastes e dualidades na leitura de Pollack.',question:'Que perspectivas precisam ser consideradas em conjunto?'},
   {id:'veu',x:72,y:55,name:'O véu',observable:'Um tecido ornamentado separa a figura do espaço ao fundo.',interpretation:'O tecido pode abrir uma reflexão sobre o que está aparente e o que ainda requer atenção.',question:'Que informação ainda não está disponível?'},
   {id:'postura',x:52,y:62,name:'A postura',observable:'A personagem aparece sentada em posição frontal.',interpretation:'A imobilidade visível pode suscitar hipóteses sobre pausa e observação, não sobre passividade da pessoa.',question:'O que vale a pena observar antes de agir?'}
  ],
  bridge:{context:'Uma pessoa recebeu uma proposta de trabalho, mas ainda não conhece seus detalhes.',options:[
   {text:'O véu mostra que a empresa está escondendo um crime.',valid:false,why:'A carta não fornece prova sobre a conduta de terceiros.'},
   {text:'Estar sentada na carta significa que a pessoa deve recusar a proposta.',valid:false,why:'Uma postura visual não determina a escolha de outra pessoa.'},
   {text:'O véu e a pausa podem inspirar perguntas sobre as condições ainda desconhecidas antes de decidir.',valid:true,why:'A imagem se transforma em uma hipótese de estudo que preserva os limites da interpretação.'}
  ]}
 }
];
export const sixPaths=[
 {id:'vontade',name:'Vontade',range:'I–V',subtitle:'O começo das capacidades',representative:'o-mago',description:'Na organização de Naiff, a primeira sequência reúne os arcanos de I a V. É um modo de pensar as etapas iniciais de constituição da vontade.',question:'Que recurso ou capacidade ganha forma nesta etapa?',options:['o-mago','a-estrela','a-torre'],color:'vinho'},
 {id:'livre-arbitrio',name:'Livre-arbítrio',range:'VI',subtitle:'O ponto da escolha',representative:'os-enamorados',description:'Naiff separa o arcano VI como um caminho próprio, associado à escolha. É uma construção metodológica, não uma definição fixa de todas as decisões.',question:'O que muda quando consideramos uma escolha?',options:['o-carro','os-enamorados','o-eremita'],color:'areia'},
 {id:'prazer',name:'Prazer',range:'VII–XI',subtitle:'Experiências em movimento',representative:'o-carro',description:'A sequência de VII a XI forma o caminho do prazer no método de Naiff. O nome não implica que todas as cartas sejam alegres ou produzam prazer na vida real.',question:'Que diferentes movimentos compõem essa experiência?',options:['o-mundo','o-carro','a-morte'],color:'sálvia'},
 {id:'dor',name:'Dor',range:'XII–XVI',subtitle:'Impasses e rupturas',representative:'a-torre',description:'XII a XVI integram o caminho da dor na proposta de Naiff. São imagens para estudar crise e transformação simbólica, não prever sofrimento.',question:'Como reconhecer uma ruptura sem transformá-la em sentença?',options:['a-torre','o-sol','a-imperatriz'],color:'terracota'},
 {id:'esperanca',name:'Esperança',range:'XVII',subtitle:'Reorientar o olhar',representative:'a-estrela',description:'Naiff dá ao arcano XVII um caminho próprio, o da esperança. A Estrela pode inspirar a ideia de retomada sem prometer resultados.',question:'Que pequenos gestos podem sustentar uma retomada?',options:['a-lua','o-diabo','a-estrela'],color:'lavanda'},
 {id:'evolucao',name:'Evolução',range:'XVIII–XXI',subtitle:'Integrações e novos ciclos',representative:'o-mundo',description:'O último grupo vai de XVIII a XXI. O Louco, numerado 0 na tradição RWS, pode ser colocado em relação ao fim e ao recomeço do percurso.',question:'Que síntese se abre novamente para outras perguntas?',options:['o-mundo','a-justica','o-mago'],color:'ouro'}
];
export const sixPathsSynthesis={
 prompt:'Depois de conhecer os seis caminhos, qual leitura respeita a proposta de Naiff?',
 options:[
  {text:'Cada pessoa terá obrigatoriamente estes seis acontecimentos na mesma ordem.',valid:false,why:'Os caminhos são uma organização interpretativa de Naiff, não uma sequência obrigatória de fatos da vida.'},
  {text:'Os seis grupos servem como mapa de estudo dos Arcanos Maiores; podemos comparar as imagens, sabendo que há outras organizações do tarô.',valid:true,why:'Você distinguiu um método simbólico de uma previsão e preservou a possibilidade de comparar tradições.'},
  {text:'Uma carta no caminho da Dor prova que algo ruim acontecerá.',valid:false,why:'O nome do grupo não serve como diagnóstico, previsão ou sentença.'}
 ]};
