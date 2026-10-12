/**
 * ARCANA — Sprint 10: Cartas em Diálogo
 *
 * Sete exercícios de comparação, agrupados pelos quatro capítulos da Jornada.
 * Diferenças entre cenas e atitudes: textos didáticos originais do ARCANA,
 * inspirados no estudo das imagens RWS (Pollack como eixo; Naiff como contraste).
 * Não há combinações fixas nem afirmações sobre o futuro.
 */
export const dialogueChapters=Object.freeze([
 {id:'portal',title:'Começar e colocar em prática',intro:'Uma carta mostra alguém começando um caminho; outra mostra ferramentas à disposição. Compare as duas ideias.',journey:'portal',taskIds:['comeco-acao']},
 {id:'acao',title:'Agir, escutar e construir',intro:'Descubra como atitudes diferentes podem se complementar no cotidiano.',journey:'acao',taskIds:['agir-observar','criar-organizar']},
 {id:'mudanca',title:'Escolher, encerrar e reajustar',intro:'Às vezes uma mudança exige avaliar fatos; em outras, aceitar um fim e reorganizar a rotina.',journey:'mudanca',taskIds:['mudanca-criterio','fim-equilibrio']},
 {id:'integracao',title:'Da ruptura à reconstrução',intro:'Observe o contraste entre cenas difíceis e imagens que apontam possibilidades de reconstrução.',journey:'integracao',taskIds:['ruptura-cuidado','incerteza-clareza']}
]);
export const dialogueTasks=Object.freeze({
 'comeco-acao':{
  cards:['o-louco','o-mago'],title:'Começar não é o mesmo que agir',
  first:'O Louco caminha perto de uma borda. Isso lembra curiosidade e a coragem de dar o primeiro passo, com riscos a observar.',
  second:'O Mago está diante de objetos que pode utilizar. Isso lembra iniciativa e uso de recursos disponíveis.',
  relation:'As duas cartas podem conversar sobre um começo. O Louco coloca a possibilidade em movimento; O Mago pergunta como transformar essa possibilidade em ação.',
  example:'Você decidiu criar um podcast, mas ainda precisa escolher como começar.',
  prompt:'Qual interpretação usa as duas cartas para pensar nesse projeto?',
  options:[
   {text:'O Louco confirma que o podcast será popular, e O Mago garante dinheiro.',why:'Nenhuma das cartas confirma resultados futuros. A ideia é comparar o começo e os recursos para agir.'},
   {text:'O Louco lembra a coragem de começar; O Mago pede um plano com os equipamentos e habilidades disponíveis.',why:'Exato: você relacionou a caminhada do Louco ao começo e a mesa do Mago aos recursos para realizar a ideia.'},
   {text:'O Mago proíbe começar até que todas as condições estejam perfeitas.',why:'Ter ferramentas não significa precisar de condições perfeitas. O Mago ajuda a pensar no que já está disponível.'}
  ],answer:1,hint:'Procure uma resposta que fale tanto de dar o primeiro passo quanto de usar recursos concretos.'
 },
 'agir-observar':{
  cards:['o-mago','a-sacerdotisa'],title:'Quando agir e quando escutar?',
  first:'O Mago gesticula diante dos instrumentos da mesa. Ele pode lembrar iniciativa e ações que dependem de nossa escolha.',
  second:'A Sacerdotisa está sentada entre colunas e diante de um véu. Ela pode lembrar atenção, pausa e busca de informação.',
  relation:'Uma situação pode pedir ação e escuta ao mesmo tempo. As cartas não obrigam a escolher só uma das duas atitudes.',
  example:'Você recebeu um convite de trabalho, mas ainda não conhece todos os detalhes do contrato.',
  prompt:'O que as duas cartas, juntas, podem ajudar você a fazer?',
  options:[
   {text:'Assinar imediatamente, porque O Mago manda agir.',why:'Ação sem informações pode ser precipitada. A Sacerdotisa lembra a importância de investigar.'},
   {text:'Rejeitar o convite, porque A Sacerdotisa manda ficar parado.',why:'Observar não é recusar tudo. A dupla mostra a possibilidade de perguntar e agir quando houver informações.'},
   {text:'Ler o contrato, tirar dúvidas e depois planejar os próximos passos.',why:'Certo: observar e perguntar é uma atitude; organizar recursos para começar é outra. Elas podem trabalhar juntas.'}
  ],answer:2,hint:'Combine a atenção da figura sentada com os instrumentos disponíveis ao Mago.'
 },
 'criar-organizar':{
  cards:['a-imperatriz','o-imperador'],title:'Cuidar de algo e organizar seu crescimento',
  first:'A Imperatriz aparece cercada de vegetação. O cenário pode lembrar aquilo que cresce quando recebe cuidados.',
  second:'O Imperador está sentado num trono de pedra. A firmeza da cena pode lembrar estrutura, regras e responsabilidades.',
  relation:'Cultivar uma ideia requer atenção e condições favoráveis; sustentá-la também pode exigir organização.',
  example:'Um grupo criou uma horta comunitária, mas as plantas não estão sendo regadas regularmente.',
  prompt:'Que leitura reúne melhor a contribuição de ambas as cartas?',
  options:[
   {text:'Criar uma escala de cuidados e acompanhar as necessidades das plantas.',why:'Isso mesmo: a horta precisa de cuidado continuado (Imperatriz) e de uma organização que o sustente (Imperador).'},
   {text:'Deixar a horta sem regras, pois cuidar de plantas dispensa acordos.',why:'Cuidar da horta não exclui combinar responsabilidades. O Imperador lembra justamente a estrutura.'},
   {text:'Decidir que o líder tem razão em tudo, sem ouvir o grupo.',why:'A ideia de organização não significa autoridade sem diálogo. A Imperatriz também chama atenção às necessidades reais.'}
  ],answer:0,hint:'Pense em como combinar o cuidado diário com regras que o tornem possível.'
 },
 'mudanca-criterio':{
  cards:['a-roda-da-fortuna','a-justica'],title:'O que muda e o que podemos decidir',
  first:'A Roda da Fortuna está no centro de uma cena que sugere movimento. Ela pode lembrar mudanças que não controlamos.',
  second:'A Justiça segura uma balança e uma espada. Isso pode lembrar comparação de fatos e decisões com consequências.',
  relation:'Nem tudo depende de nossas ações, mas podemos avaliar informações e decidir como responder ao que mudou.',
  example:'O preço de um curso aumentou inesperadamente, e você precisa rever o orçamento.',
  prompt:'Como as duas cartas podem ajudar a pensar nessa situação?',
  options:[
   {text:'Aceitar qualquer preço, porque a Roda sempre determina nosso destino.',why:'Mudanças externas não eliminam a capacidade de examinar opções e tomar decisões.'},
   {text:'Reconhecer o aumento e comparar custos, alternativas e prioridades antes de decidir.',why:'Certo: a Roda lembra a mudança externa; a balança da Justiça ajuda a pesar alternativas.'},
   {text:'Concluir que alguém está cometendo um crime só porque apareceu A Justiça.',why:'A carta não demonstra que houve crime. A balança pode funcionar como imagem para comparar informações.'}
  ],answer:1,hint:'Separe o fato externo — o aumento do preço — da decisão que depende de você.'
 },
 'fim-equilibrio':{
  cards:['a-morte','a-temperanca'],title:'Encerrar uma etapa e encontrar um novo ritmo',
  first:'A Morte mostra uma figura esquelética diante de pessoas que reagem. A imagem pode lembrar o fim de uma etapa.',
  second:'A Temperança mostra água passando de um recipiente para outro. O gesto pode lembrar ajuste, cuidado e moderação.',
  relation:'Após uma mudança importante, não basta perceber o que terminou: pode ser necessário reorganizar o cotidiano.',
  example:'Você concluiu um projeto longo e percebeu que está muito cansado.',
  prompt:'Qual reflexão respeita o significado das duas cartas?',
  options:[
   {text:'A Morte garante uma tragédia, e A Temperança só adia o problema.',why:'A Morte não é previsão de tragédia. O contraste pode falar de encerramento e reorganização da rotina.'},
   {text:'Terminar um projeto significa que nunca mais será preciso descansar.',why:'A mudança não resolve automaticamente o cansaço. A Temperança lembra a necessidade de ajustar o ritmo.'},
   {text:'Reconhecer o fim do projeto e reorganizar trabalho, descanso e próximos planos.',why:'Boa leitura: uma carta ajuda a nomear o encerramento; a outra, a pensar em ajustes depois dele.'}
  ],answer:2,hint:'Uma carta fala de fim de ciclo; a outra mostra um gesto cuidadoso de dosagem.'
 },
 'ruptura-cuidado':{
  cards:['a-torre','a-estrela'],title:'Depois de uma ruptura, o que fazer?',
  first:'A Torre é atingida por um raio e sua estrutura é abalada. A cena pode lembrar uma mudança repentina.',
  second:'A Estrela mostra uma pessoa distribuindo água numa paisagem aberta. Pode lembrar calma, cuidado e esperança.',
  relation:'Reconhecer um problema importante pode ser o primeiro passo; reconstruir envolve ações possíveis e tempo.',
  example:'Um grupo perdeu seu local de encontro e precisa organizar outro espaço.',
  prompt:'Qual interpretação combina a ruptura e a possibilidade de recuperação?',
  options:[
   {text:'Reconhecer a perda do espaço e procurar apoio e soluções para recomeçar.',why:'Certo: a Torre permite nomear a ruptura; a Estrela ajuda a pensar em cuidados e reconstrução possíveis.'},
   {text:'Prever que outro acidente acontecerá no próximo encontro.',why:'A Torre não prevê acidentes. A proposta é pensar numa dificuldade real e numa forma de reagir a ela.'},
   {text:'Acreditar que a esperança dispensa procurar um novo espaço.',why:'A Estrela pode falar de esperança, mas isso não substitui passos práticos ou ajuda de outras pessoas.'}
  ],answer:0,hint:'Pense numa resposta que reconheça a dificuldade sem prometer desastre nem solução mágica.'
 },
 'incerteza-clareza':{
  cards:['a-lua','o-sol'],title:'Distinguir dúvidas e informações claras',
  first:'A Lua mostra um caminho, animais e pouca clareza. Isso pode lembrar medo, dúvida e informações incompletas.',
  second:'O Sol ilumina uma cena aberta. A imagem pode lembrar clareza, alegria e a possibilidade de tornar algo visível.',
  relation:'Uma ideia útil é perguntar o que ainda é suposição e o que já conseguimos observar ou verificar.',
  example:'Chegou uma mensagem confusa sobre a data de uma atividade importante.',
  prompt:'Que leitura usa A Lua e O Sol sem inventar fatos?',
  options:[
   {text:'A Lua prova que o remetente está mentindo.',why:'Uma imagem de incerteza não permite saber o que outra pessoa pensa ou se ela mentiu.'},
   {text:'Conferir a data com a organização e separar a mensagem confusa da informação confirmada.',why:'Exato: a Lua ajuda a reconhecer a dúvida; o Sol lembra a clareza que buscamos ao verificar a informação.'},
   {text:'O Sol garante que a atividade acontecerá exatamente como você imagina.',why:'O Sol pode lembrar clareza, mas não garante um acontecimento futuro.'}
  ],answer:1,hint:'Uma carta lembra incerteza; a outra, clareza. O que você pode fazer para verificar a situação?'
 }
});
export const findDialogueChapter=id=>dialogueChapters.find(c=>c.id===id)||null;
export const dialogueTaskIds=Object.freeze(dialogueChapters.flatMap(c=>c.taskIds));
