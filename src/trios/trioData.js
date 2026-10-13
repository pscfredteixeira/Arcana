/**
 * ARCANA · Sprint 11: Três Cartas, Uma História.
 * Quatro trios de Arcanos Maiores do Rider–Waite–Smith.
 * Textos originais: as duas leituras adequadas são POSSIBILIDADES,
 * não previsões nem combinações obrigatórias.
 */
export const trioLessons=Object.freeze([
 {
  id:'comecar',title:'Uma ideia que precisa sair do papel',
  kicker:'01 · Começar um projeto',
  situation:'Você quer organizar um pequeno podcast com amigos. A ideia empolga, mas ainda faltam equipamentos, tempo e informações sobre as tarefas.',
  cards:[
   {slug:'o-louco',role:'O começo',observation:'A figura caminha perto da borda de um precipício.',meaning:'Uma ideia nova pode animar, mas pede atenção aos riscos.'},
   {slug:'o-mago',role:'Os recursos',observation:'O personagem está diante de uma mesa cheia de objetos.',meaning:'É hora de olhar as ferramentas e habilidades que já temos.'},
   {slug:'a-sacerdotisa',role:'O que investigar',observation:'Uma figura sentada observa, entre duas colunas e diante de um véu.',meaning:'Algumas decisões exigem informações antes da ação.'}
  ],
  prompt:'Quais DUAS interpretações ajudam a pensar nesse podcast?',
  choices:[
   {text:'Aproveitar o entusiasmo para começar e listar os recursos disponíveis.',valid:true,why:'O Louco ajuda a reconhecer o começo; O Mago lembra os instrumentos e as ações concretas.'},
   {text:'Antes de definir as tarefas, ouvir o grupo e pesquisar o que ainda falta.',valid:true,why:'A Sacerdotisa lembra atenção e pesquisa; essa atitude pode trabalhar junto com a iniciativa do Mago.'},
   {text:'As cartas garantem que o podcast terá muitos ouvintes e dará lucro.',valid:false,why:'Nenhuma das três imagens comprova audiência ou lucro. Essa conclusão inventa um resultado futuro.'}
  ],
  hint:'Uma interpretação pode falar de começar e agir; outra, de escutar antes de decidir. Descarte promessas sobre o futuro.',
  writingPrompt:'Escreva três ou quatro frases explicando como as três cartas ajudam a pensar no projeto. Mencione pelo menos um detalhe visual e uma pergunta prática.',
  model:'O Louco me faz pensar na coragem de lançar uma ideia, mas o precipício lembra que precisamos considerar riscos. A mesa do Mago sugere listar o que já temos para gravar. A Sacerdotisa lembra o valor de ouvir o grupo e pesquisar o que falta. Minha pergunta seria: quais recursos e informações precisamos reunir antes do primeiro episódio?',
  revision:'Uma leitura também poderia começar pela Sacerdotisa, perguntando quais dúvidas precisam ser esclarecidas, e só então passar ao entusiasmo do Louco e à iniciativa do Mago.'
 },
 {
  id:'conviver',title:'Cuidar, organizar e escolher',
  kicker:'02 · Uma tarefa coletiva',
  situation:'Um grupo quer criar uma feira de troca de livros no bairro. Há entusiasmo, mas os horários e as responsabilidades ainda não foram combinados.',
  cards:[
   {slug:'a-imperatriz',role:'O que cultivar',observation:'A personagem está cercada de vegetação e sinais de abundância.',meaning:'Uma atividade cresce quando recebe cuidado e atenção.'},
   {slug:'o-imperador',role:'Como sustentar',observation:'O trono de pedra e a postura firme se destacam na cena.',meaning:'Combinar regras e responsabilidades pode sustentar uma iniciativa.'},
   {slug:'os-enamorados',role:'A escolha coletiva',observation:'Duas pessoas aparecem numa cena de encontro e diferença.',meaning:'Escolhas envolvem desejos, acordos e valores que precisam ser considerados.'}
  ],
  prompt:'Quais DUAS interpretações usam as imagens para pensar nessa feira?',
  choices:[
   {text:'O Imperador indica que um organizador deve mandar sem escutar ninguém.',valid:false,why:'Estrutura e responsabilidade não significam poder absoluto. A escolha do grupo também precisa ser considerada.'},
   {text:'O cuidado com os livros e participantes exige divisão clara de tarefas.',valid:true,why:'A Imperatriz ajuda a pensar no cuidado; o Imperador lembra organização e combinados práticos.'},
   {text:'O grupo pode conversar sobre o que cada pessoa deseja antes de decidir o formato da feira.',valid:true,why:'Os Enamorados ajudam a refletir sobre escolhas e valores, em diálogo com cuidado e organização.'}
  ],
  hint:'Procure uma leitura sobre cuidado e regras práticas e outra sobre ouvir desejos e decidir juntos.',
  writingPrompt:'Explique como as três cartas poderiam ajudar a organizar a feira de livros sem transformar a leitura em uma ordem.',
  model:'A vegetação da Imperatriz lembra que a feira precisa de cuidado com as pessoas e com os livros. O trono do Imperador pode lembrar regras para horários e organização. Os Enamorados colocam a escolha em destaque: quem participa deve poder falar sobre o formato do evento. Eu perguntaria: que acordos ajudam o grupo sem deixar ninguém de fora?',
  revision:'Também é possível destacar primeiro os Enamorados, debatendo os valores da feira, e só depois pensar no cuidado e na organização.'
 },
 {
  id:'decidir',title:'Quando o cenário muda',
  kicker:'03 · Revisar uma decisão',
  situation:'O aluguel de uma sala para aulas aumentou de repente. Você precisa avaliar outras opções sem comprometer todo o orçamento.',
  cards:[
   {slug:'a-roda-da-fortuna',role:'A mudança',observation:'A grande roda domina a imagem, sugerindo movimento e mudança.',meaning:'Nem tudo que acontece depende das nossas escolhas.'},
   {slug:'a-justica',role:'O que comparar',observation:'A figura segura uma balança e uma espada.',meaning:'Informações e critérios ajudam a tomar decisões responsáveis.'},
   {slug:'a-temperanca',role:'O ajuste',observation:'Uma figura transfere água cuidadosamente entre dois recipientes.',meaning:'Pequenos ajustes e equilíbrio podem ajudar a reorganizar a rotina.'}
  ],
  prompt:'Quais DUAS leituras levam a perguntas úteis diante do aluguel?',
  choices:[
   {text:'Anotar as alternativas, comparar os custos e ajustar o plano de gastos.',valid:true,why:'A Roda lembra o aumento inesperado; Justiça e Temperança podem inspirar comparação e ajustes.'},
   {text:'Entender que o aumento não foi escolhido por você, mas a resposta pode ser planejada.',valid:true,why:'A Roda distingue fatores externos; a balança da Justiça lembra a responsabilidade sobre os próximos passos.'},
   {text:'A Roda comprova que os preços cairão logo, portanto não é preciso planejar.',valid:false,why:'Uma roda pode lembrar mudança, mas não comprova quando nem como os preços vão variar.'}
  ],
  hint:'Duas opções ajudam a comparar fatos e agir com equilíbrio. Uma delas promete um futuro que ninguém conhece.',
  writingPrompt:'Relacione as três imagens e formule uma pergunta concreta para ajudar alguém que precisa lidar com esse aumento.',
  model:'A roda me lembra que um preço pode mudar sem que a pessoa tenha controle. A balança da Justiça sugere comparar opções de aluguel com critérios. A água da Temperança me faz pensar em ajustes graduais para não esgotar os recursos. Eu perguntaria: qual alternativa cabe no orçamento sem prejudicar as atividades?',
  revision:'Outra leitura possível é começar pela Temperança, avaliando o que pode ser ajustado agora, e usar a Justiça para decidir entre opções.'
 },
 {
  id:'recomecar',title:'Depois de uma ruptura',
  kicker:'04 · Reconstruir com cuidado',
  situation:'Um projeto cultural perdeu o espaço onde se reunia. As informações sobre a mudança estão incompletas, e as pessoas do grupo estão preocupadas.',
  cards:[
   {slug:'a-torre',role:'O que aconteceu',observation:'Um raio atinge a torre, abalando uma construção que parecia firme.',meaning:'Uma estrutura pode mudar de forma inesperada, exigindo revisão.'},
   {slug:'a-lua',role:'O que ainda não sabemos',observation:'Um caminho aparece entre torres, numa paisagem de pouca clareza.',meaning:'É importante distinguir dúvidas, medos e fatos confirmados.'},
   {slug:'a-estrela',role:'Um cuidado possível',observation:'Uma figura distribui água sob estrelas, num cenário aberto.',meaning:'Esperança e cuidados concretos podem ajudar na reconstrução.'}
  ],
  prompt:'Quais DUAS maneiras de interpretar respeitam o contexto?',
  choices:[
   {text:'A Torre prova que o grupo será destruído, e A Lua indica uma traição secreta.',valid:false,why:'As cartas não provam fatos ocultos nem anunciam destinos inevitáveis. O desenho não permite saber quem traiu alguém.'},
   {text:'Reconhecer a perda do espaço, confirmar as informações e buscar alternativas.',valid:true,why:'A Torre sugere ruptura; A Lua pede clareza; A Estrela pode lembrar a procura de caminhos para reconstruir.'},
   {text:'Acolher a preocupação do grupo e organizar pequenos passos para recuperar a atividade.',valid:true,why:'A Lua pode lembrar a incerteza vivida; A Estrela ajuda a pensar em cuidado, apoio e esperança responsável.'}
  ],
  hint:'Procure duas respostas que reconheçam o problema sem inventar culpados ou prever acontecimentos.',
  writingPrompt:'Escreva como você explicaria o conjunto para alguém preocupado com o projeto, usando as três cartas e uma pergunta prática.',
  model:'A Torre lembra que o grupo perdeu algo importante e terá de reorganizar seus planos. A Lua me faz pensar que ainda existem dúvidas sobre o que realmente aconteceu. A Estrela representa a possibilidade de procurar ajuda e reconstruir aos poucos. Eu perguntaria: quais informações e pessoas podem apoiar um novo começo?',
  revision:'Também podemos começar pela incerteza mostrada na Lua e perceber como a esperança da Estrela não apaga as dificuldades trazidas pela Torre.'
 }
]);
export const trioById=id=>trioLessons.find(x=>x.id===id)||null;
export const trioIds=Object.freeze(trioLessons.map(x=>x.id));
export const trioCriteria=Object.freeze([
 'Expliquei pelo menos um detalhe visível de alguma das três cartas.',
 'Relacionei as três cartas com a situação, sem deixar uma delas de fora.',
 'Formulei uma pergunta ou ação possível, sem afirmar que o futuro está decidido.'
]);
