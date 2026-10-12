/**
 * Sprint 9 — Jornada dos 22 Arcanos Maiores.
 * A organização em 0 + três grupos de sete dialoga com a leitura sequencial
 * apresentada por Rachel Pollack. Textos e atividades são autorais do ARCANA.
 * Sistema de numeração do RWS: Força VIII; Justiça XI.
 */
export const journeyChapters=Object.freeze([
 {id:'portal',eyebrow:'00 / PONTO DE PARTIDA',title:'O começo de uma jornada',subtitle:'Uma carta para descobrir como iniciamos aquilo que ainda não conhecemos.',range:'O Louco · 0',slugs:['o-louco'],question:'O que significa começar sem ter todas as respostas?'},
 {id:'acao',eyebrow:'01 / PRIMEIRO GRUPO',title:'Aprender a agir e escolher',subtitle:'Ferramentas, cuidado, regras, encontros e direção.',range:'I a VII',slugs:['o-mago','a-sacerdotisa','a-imperatriz','o-imperador','o-hierofante','os-enamorados','o-carro'],question:'Como transformamos possibilidades em escolhas e ações?'},
 {id:'mudanca',eyebrow:'02 / SEGUNDO GRUPO',title:'Compreender os próprios limites',subtitle:'Coragem, espera, consequências e a necessidade de mudar de perspectiva.',range:'VIII a XIV',slugs:['a-forca','o-eremita','a-roda-da-fortuna','a-justica','o-enforcado','a-morte','a-temperanca'],question:'O que fazemos quando controlar tudo já não é possível?'},
 {id:'integracao',eyebrow:'03 / TERCEIRO GRUPO',title:'Questionar, reconstruir e integrar',subtitle:'Vínculos difíceis, rupturas, esperança e conclusão de uma etapa.',range:'XV a XXI',slugs:['o-diabo','a-torre','a-estrela','a-lua','o-sol','o-julgamento','o-mundo'],question:'Como olhar para uma mudança e reorganizar o que aprendemos?'}
]);

// As escolhas foram redigidas para exigir uma relação com a imagem, não adivinhação.
export const journeyTasks=Object.freeze({
'o-louco':{
 focus:'Olhe o pé próximo da borda, o cão e a pequena bolsa.',
 observation:'A figura caminha perto de um precipício. O movimento sugere começo; a borda lembra que ainda existem riscos.',
 contrast:'O Mago, a próxima carta, já tem ferramentas diante de si: começar e organizar recursos não são exatamente a mesma coisa.',
 scenario:'Você se matriculou num curso novo e ainda não conhece as dificuldades. Qual atitude combina com O Louco?',
 options:['Desistir, porque qualquer novidade será perigosa.','Começar com curiosidade, procurando informações e se preparando.','Ter certeza de que será aprovado só porque começou.'],
 answer:1,why:'A imagem mostra movimento e proximidade de um risco. Ela permite pensar em coragem com preparação, não em perigo inevitável nem sucesso garantido.'
},
'o-mago':{
 focus:'Observe a mesa com objetos e o gesto das duas mãos.',
 observation:'O Mago está diante de ferramentas. Esse detalhe ajuda a entender a iniciativa: transformar uma possibilidade em trabalho concreto.',
 contrast:'O Louco chama atenção para começar. O Mago acrescenta a pergunta: quais recursos vou usar?',
 scenario:'Você quer criar uma revista digital. O que o Mago ajuda a perguntar?',
 options:['Quais ferramentas e conhecimentos eu já tenho para começar?','Quem vai garantir que a revista será um sucesso?','Como descobrir o futuro exato do projeto?'],
 answer:0,why:'Os objetos sobre a mesa lembram recursos disponíveis. O Mago se relaciona a agir com o que temos, sem prometer um resultado.'
},
'a-sacerdotisa':{
 focus:'Veja as duas colunas, o véu e a figura sentada.',
 observation:'A postura é mais quieta do que a do Mago. Ela ajuda a pensar em ouvir, observar e reunir informações.',
 contrast:'O Mago está associado à iniciativa; A Sacerdotisa, à atenção antes de decidir. Uma situação pode pedir as duas coisas.',
 scenario:'Um contrato chegou incompleto. Qual atitude faz sentido ao estudar A Sacerdotisa?',
 options:['Assinar imediatamente, porque a carta sempre indica sorte.','Concluir que alguém mente, sem fazer perguntas.','Ler com calma e pedir as informações que faltam.'],
 answer:2,why:'A figura sentada e o véu podem lembrar paciência e coisas ainda não compreendidas. Isso não comprova que existe um segredo.'
},
'a-imperatriz':{
 focus:'Repare nas plantas, na água e no espaço ao redor da personagem.',
 observation:'A paisagem fértil lembra cuidado e crescimento. Aquilo que se desenvolve precisa de condições favoráveis.',
 contrast:'A Sacerdotisa destaca a atenção; A Imperatriz ajuda a pensar no que fazemos para nutrir uma ideia ou relação.',
 scenario:'Uma pessoa quer manter uma horta comunitária. O que A Imperatriz lembra?',
 options:['Que a horta crescerá sem atenção.','Que cultivar exige tempo, cuidado e condições adequadas.','Que as plantas garantem riqueza futura.'],
 answer:1,why:'A vegetação da carta é uma imagem de cultivo. Crescimento não significa resultado automático: também envolve trabalho contínuo.'
},
'o-imperador':{
 focus:'Observe o trono de pedra, as montanhas e a postura firme.',
 observation:'O cenário apresenta estruturas sólidas. Por isso, o Imperador pode lembrar regras, organização e responsabilidade.',
 contrast:'A Imperatriz fala de nutrir o crescimento; O Imperador ajuda a pensar na estrutura que sustenta esse crescimento.',
 scenario:'Um grupo criativo tem boas ideias, mas não consegue cumprir prazos. O que O Imperador sugere?',
 options:['Combinar tarefas, responsabilidades e limites claros.','Ignorar acordos para preservar a espontaneidade.','Acreditar que toda autoridade é sempre correta.'],
 answer:0,why:'O trono firme sustenta a ideia de organização. Isso não justifica autoritarismo nem significa que regras não devam mudar.'
},
'o-hierofante':{
 focus:'Veja a figura central em posição de ensino e as duas pessoas diante dela.',
 observation:'A cena lembra a transmissão de conhecimentos e costumes dentro de um grupo.',
 contrast:'O Imperador organiza regras; O Hierofante coloca em foco como aprendemos e transmitimos tradições.',
 scenario:'Você começa uma formação e encontra explicações antigas. Como o Hierofante pode ajudar?',
 options:['Repetir tudo sem nunca questionar.','Acreditar que não precisamos aprender com ninguém.','Estudar a tradição e fazer perguntas sobre o que recebe.'],
 answer:2,why:'A presença de quem ensina e de quem aprende lembra a importância da transmissão. Conhecer uma tradição não impede o pensamento crítico.'
},
'os-enamorados':{
 focus:'Observe as duas figuras, a presença alada e as árvores diferentes.',
 observation:'O encontro envolve diferenças e uma escolha. O sentido pode ir além de um relacionamento romântico.',
 contrast:'O Hierofante representa valores transmitidos por um grupo; Os Enamorados ajudam a perguntar quais valores orientam sua escolha.',
 scenario:'Você recebeu duas propostas de estudo e precisa escolher. Qual leitura é mais útil?',
 options:['A carta confirma que encontrará um grande amor.','Comparar desejos, compromissos e valores envolvidos na decisão.','Escolher a primeira opção sem considerar consequências.'],
 answer:1,why:'A cena de encontro e contraste permite pensar em decisões que importam. Não serve para revelar qual alternativa o destino escolheu.'
},
'o-carro':{
 focus:'Observe o condutor e as duas esfinges diante do veículo.',
 observation:'As esfinges são diferentes. Conduzi-las lembra reunir forças e escolher uma direção.',
 contrast:'Os Enamorados destacam a escolha; O Carro pergunta como avançar depois de decidir.',
 scenario:'Você aceitou um projeto com várias tarefas concorrentes. O que O Carro sugere?',
 options:['Organizar prioridades e manter uma direção clara.','Fazer tudo rapidamente sem definir prioridades.','Entender a carta como promessa de vitória.'],
 answer:0,why:'O condutor e as esfinges lembram coordenação. Direção é mais do que pressa, e o desenho não garante vitória.'
},
'a-forca':{
 focus:'Veja a pessoa tocando a boca do leão sem demonstrar agressividade.',
 observation:'A cena combina a potência do animal com um gesto cuidadoso. Isso sugere firmeza sem violência.',
 contrast:'O Carro pode falar de conduzir forças em direção a um objetivo; A Força pergunta como lidar com a força sem precisar dominar pela agressão.',
 scenario:'Uma discussão ficou tensa. Qual atitude é uma leitura possível de A Força?',
 options:['Ameaçar a outra pessoa.','Aceitar qualquer tratamento para evitar conflito.','Defender limites com firmeza e respeito.'],
 answer:2,why:'A relação entre pessoa e leão lembra coragem e autocontrole. Isso não obriga ninguém a suportar abuso.'
},
'o-eremita':{
 focus:'Veja a lanterna e a pessoa sozinha na paisagem.',
 observation:'A lanterna não ilumina o mundo inteiro. Ela pode sugerir pesquisa, atenção e conhecimento passo a passo.',
 contrast:'A Força trata de como enfrentamos dificuldades; O Eremita lembra que algumas respostas pedem tempo para pensar.',
 scenario:'Você precisa decidir sobre um tema que conhece pouco. Qual caminho combina com O Eremita?',
 options:['Reservar tempo para estudar e procurar orientação.','Decidir sem informações para não parecer inseguro.','Isolar-se para sempre e evitar conversas.'],
 answer:0,why:'A lanterna representa uma pequena luz num ambiente vasto. Ela lembra investigar, e não a necessidade de saber tudo de uma vez.'
},
'a-roda-da-fortuna':{
 focus:'Observe a grande roda central e as figuras em diferentes posições.',
 observation:'Uma roda pode girar: nem tudo permanece no mesmo lugar. A carta permite pensar em mudanças que dependem também do mundo ao redor.',
 contrast:'O Eremita busca orientação; A Roda lembra que o cenário pode mudar enquanto estamos aprendendo.',
 scenario:'Uma mudança econômica afetou seus planos. O que a Roda ajuda a distinguir?',
 options:['Que todos os acontecimentos são culpa sua.','O que posso decidir e o que depende de condições externas.','Que a sorte resolverá tudo sem ação.'],
 answer:1,why:'A roda pode lembrar mudanças e ciclos. O sentido útil é reconhecer o que controlamos e o que escapa às nossas decisões.'
},
'a-justica':{
 focus:'Observe a balança e a espada nas mãos da figura.',
 observation:'A balança ajuda a pensar em comparar fatos; a espada pode lembrar a decisão que vem depois.',
 contrast:'A Roda destaca acontecimentos que mudam; A Justiça pergunta como avaliar escolhas e consequências.',
 scenario:'Dois colegas discordam sobre tarefas. O que A Justiça sugere?',
 options:['Decidir imediatamente sem ouvir os dois.','Afirmar que a carta indica quem está mentindo.','Analisar informações e criar critérios claros para dividir o trabalho.'],
 answer:2,why:'A balança permite associar a carta à comparação. A espada lembra a responsabilidade de decidir com base em critérios.'
},
'o-enforcado':{
 focus:'Observe o corpo suspenso por um pé e a posição invertida.',
 observation:'Ver alguém de cabeça para baixo muda nossa perspectiva. A carta pode lembrar a importância de interromper uma repetição e olhar de outro modo.',
 contrast:'A Justiça compara e decide; O Enforcado pergunta se antes disso é preciso reconsiderar o modo de olhar.',
 scenario:'Uma solução não funciona apesar de várias tentativas. O que O Enforcado pode sugerir?',
 options:['Fazer uma pausa e experimentar outra maneira de entender o problema.','Aceitar para sempre uma situação injusta.','Concluir que a vida ficará parada.'],
 answer:0,why:'A posição invertida lembra uma visão diferente. Uma pausa pode ajudar, mas não é uma obrigação de aceitar sofrimentos.'
},
'a-morte':{
 focus:'Observe a figura esquelética e as reações das pessoas na paisagem.',
 observation:'A imagem é forte porque apresenta uma mudança diante da qual ninguém continua exatamente na mesma situação.',
 contrast:'O Enforcado sugere alterar o ponto de vista; A Morte permite pensar num ciclo que realmente terminou.',
 scenario:'Uma atividade que fazia parte da sua rotina acabou. O que A Morte pode significar?',
 options:['Que a carta prevê a morte física de alguém.','Reconhecer o encerramento e pensar em como lidar com a mudança.','Que toda perda deve ser comemorada.'],
 answer:1,why:'O nome e a imagem podem assustar. No estudo, a carta é usada para pensar em encerramentos e transformações, não para prever mortes.'
},
'a-temperanca':{
 focus:'Observe a passagem cuidadosa de água de um recipiente para outro.',
 observation:'O gesto sugere dosagem, ajustes e continuidade. A carta costuma lembrar equilíbrio construído aos poucos.',
 contrast:'A Morte pode representar um encerramento; A Temperança pergunta como reorganizar a vida depois de mudanças.',
 scenario:'Você está cansado ao conciliar trabalho e estudo. Qual escolha combina com A Temperança?',
 options:['Continuar sem dormir, porque a disciplina resolve tudo.','Abandonar todos os compromissos imediatamente.','Revisar a rotina e ajustar descanso, tarefas e prioridades.'],
 answer:2,why:'Verter a água com cuidado lembra a importância do ritmo e do ajuste. Equilíbrio não é fazer tudo perfeitamente.'
},
'o-diabo':{
 focus:'Observe as correntes e a relação entre as três figuras.',
 observation:'As correntes sugerem ligação e possível restrição. A carta ajuda a pensar quando um desejo ou hábito começa a limitar escolhas.',
 contrast:'A Temperança ajuda a regular recursos; O Diabo pergunta se algo está se tornando difícil de interromper.',
 scenario:'Um hábito consome muito tempo e prejudica atividades importantes. Qual pergunta combina com O Diabo?',
 options:['Qual prazer esse hábito oferece e que consequências ele traz?','Qual pessoa é malvada, segundo a carta?','Qual punição sobrenatural vai acontecer?'],
 answer:0,why:'As correntes ajudam a pensar em dependência e liberdade. A carta não serve para julgar moralmente pessoas ou provar manipulações.'
},
'a-torre':{
 focus:'Observe a construção atingida pelo raio e as pessoas em queda.',
 observation:'A torre parecia firme, mas está sendo abalada. Isso ajuda a pensar no que acontece quando uma estrutura falha.',
 contrast:'O Diabo aponta para vínculos que restringem; A Torre mostra uma estrutura sendo questionada por uma ruptura.',
 scenario:'Uma equipe descobre um problema grave no sistema em que trabalhava. O que A Torre pode lembrar?',
 options:['Que um desastre inevitável acontecerá amanhã.','Que é hora de investigar falhas e reconstruir aquilo que não funciona.','Que toda mudança destrói para sempre uma vida.'],
 answer:1,why:'A construção atingida sugere a necessidade de revisar as bases. A carta não comprova que uma catástrofe vai ocorrer.'
},
'a-estrela':{
 focus:'Observe a figura distribuindo água sob um céu cheio de estrelas.',
 observation:'O gesto é calmo e a paisagem é aberta. A carta pode lembrar esperança e recuperação gradual.',
 contrast:'Depois da ruptura da Torre, A Estrela permite pensar em pequenos atos de reconstrução.',
 scenario:'Após uma fase cansativa, alguém tenta reorganizar a vida. O que A Estrela sugere?',
 options:['Que todo problema se resolverá instantaneamente.','Que não é preciso pedir ajuda a ninguém.','Recuperar o ânimo por meio de cuidados e pequenos passos possíveis.'],
 answer:2,why:'A água distribuída pode lembrar gestos continuados de cuidado. Esperança não é garantia de resultados.'
},
'a-lua':{
 focus:'Observe o caminho, as torres, os animais e a iluminação incerta.',
 observation:'A paisagem não é completamente clara. A Lua pode lembrar dúvidas, medos e interpretações que ainda precisam ser verificadas.',
 contrast:'A Estrela sugere um horizonte de esperança; A Lua chama atenção para o que continua difícil de enxergar.',
 scenario:'Chegou uma informação contraditória sobre seu trabalho. Como A Lua ajuda?',
 options:['Separar os fatos das suposições e procurar informações confiáveis.','Concluir que alguém está mentindo porque saiu A Lua.','Tomar uma decisão com base apenas no medo.'],
 answer:0,why:'A pouca clareza da cena lembra incerteza. Interpretar não é afirmar que conhecemos as intenções de outra pessoa.'
},
'o-sol':{
 focus:'Observe a criança e a grande fonte de luz que ilumina a cena.',
 observation:'A imagem é mais aberta e luminosa. O Sol pode lembrar alegria, clareza e reconhecimento de algo realizado.',
 contrast:'A Lua destaca dúvidas; O Sol ajuda a pensar no que podemos ver e compartilhar com mais clareza.',
 scenario:'Você terminou um projeto e vai apresentá-lo ao público. O que O Sol pode representar?',
 options:['Certeza absoluta de que todas as pessoas vão gostar.','A oportunidade de mostrar o trabalho e reconhecer a conquista.','Que qualquer crítica será impossível.'],
 answer:1,why:'A luz amplia a visibilidade. Isso ajuda a falar de expressão e alegria sem prometer aprovação.'
},
'o-julgamento':{
 focus:'Observe a trombeta da figura alada e as pessoas respondendo ao chamado.',
 observation:'A cena parece apresentar um sinal ao qual as pessoas respondem. Pode lembrar rever o que ocorreu e assumir decisões.',
 contrast:'O Sol ilumina uma conquista; O Julgamento convida a olhar o percurso e reconhecer responsabilidades.',
 scenario:'Depois de receber uma avaliação crítica, você quer melhorar. Que atitude combina com O Julgamento?',
 options:['Concluir que a carta declarou que você é uma pessoa ruim.','Ignorar as críticas porque só a sua intenção importa.','Revisar decisões, reconhecer consequências e planejar mudanças.'],
 answer:2,why:'O chamado na imagem ajuda a pensar em resposta e revisão, não em condenação automática de uma pessoa.'
},
'o-mundo':{
 focus:'Observe a figura central dentro de uma forma oval e os quatro seres ao redor.',
 observation:'Elementos diferentes compõem um conjunto. O Mundo costuma lembrar o fechamento de uma etapa e a integração de aprendizados.',
 contrast:'O Julgamento pergunta o que precisa ser revisto; O Mundo permite reunir o que foi aprendido, sem exigir perfeição.',
 scenario:'Você concluiu uma formação e está pensando no próximo projeto. O que O Mundo pode representar?',
 options:['Reconhecer a conclusão de um ciclo e perceber o que aprendeu.','Ter certeza de que nunca precisará estudar mais.','Aceitar que tudo ficará imutável para sempre.'],
 answer:0,why:'A figura central e o conjunto ao redor ajudam a imaginar integração. Concluir uma etapa não significa saber tudo.'
}
});
export const journeyOrder=Object.freeze(journeyChapters.flatMap(ch=>ch.slugs));
export const journeyChapterOf=slug=>journeyChapters.find(ch=>ch.slugs.includes(slug))||null;
