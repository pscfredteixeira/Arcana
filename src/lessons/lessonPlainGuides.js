// Explicações rápidas dos temas das aulas. Lidas ANTES do texto aprofundado.
export const lessonPlainGuides={
'inteiro':['O tarô tem 78 cartas. As 22 cartas com nomes como O Louco são os Maiores. As outras 56 são os Menores.','Se você separar as cartas em dois montes, terá 22 de um lado e 56 do outro.'],
'quatro-grupos':['As 56 cartas menores são divididas em quatro naipes: Paus, Copas, Espadas e Ouros. Cada naipe tem 14 cartas.','Pense em quatro pastas, cada uma com 14 fichas.'],
'ordem':['Baralhos diferentes podem mudar a ordem de algumas cartas. Nesta escola, A Força é VIII (8) e A Justiça é XI (11).','Se outro livro usar números trocados, primeiro confira qual baralho ele está estudando.'],
'o-que-muda':['Os Maiores costumam abrir temas amplos; os Menores ajudam a olhar aspectos do cotidiano. Essa é uma forma de organizar o estudo, não uma regra para toda leitura.','O Mago pode levar à ideia de iniciativa; o Três de Ouros pode levar à ideia de trabalho em equipe.'],
'gestos':['O Mago costuma representar iniciativa: perceber o que você tem e começar a agir.','Se você quer fazer um projeto, pense em quais recursos já tem e qual tarefa pode iniciar.'],
'entre-colunas':['A Sacerdotisa costuma representar observação e paciência antes de decidir.','Se uma proposta ainda está confusa, procure as informações que faltam antes de dizer sim.'],
'polaridade':['As duas cartas podem ser usadas juntas: às vezes você precisa agir; em outros momentos, precisa escutar e esperar.','Em um trabalho novo, faça um plano (Mago), mas leia todas as condições (Sacerdotisa).'],
'caso':['O significado da carta muda de destaque conforme a situação perguntada. Isso não quer dizer que ela preveja o resultado.','Se você já tem informações, talvez seja hora de agir. Se não as tem, o melhor passo pode ser investigar.'],
'naipes-na-imagem':['Cada naipe é um grupo de cartas. Aprender a reconhecer o objeto do naipe ajuda a encontrar a carta no baralho.','Paus mostram bastões; Copas mostram taças; Espadas mostram lâminas; Ouros mostram moedas ou discos.'],
'associacoes':['Paus costumam falar de ação. Copas, de sentimentos. Espadas, de pensamentos e conflitos. Ouros, de dinheiro, trabalho e recursos.','Ao pensar numa mudança de casa, Ouros lembra os gastos; Copas lembra as relações; Espadas lembra as decisões; Paus lembra a iniciativa.'],
'naiff':['Nei Naiff é um autor que usa uma maneira própria de organizar os quatro naipes. Você não precisa decorar esse sistema no primeiro dia.','Guarde primeiro o básico: Paus = ação, Copas = sentimentos, Espadas = pensamento, Ouros = recursos. Depois compare os autores.'],
'misturas':['Uma situação real pode envolver vários assuntos ao mesmo tempo. Por isso, diferentes naipes podem ajudar a olhar aspectos diferentes dela.','Uma mudança de emprego envolve dinheiro, escolhas, sentimentos e coragem para agir.'],
'primeiro-contato':['Primeiro olhe o desenho. Depois leia o significado. Por fim, pense como essa ideia se relaciona com uma situação.','Na carta O Louco: vejo alguém caminhando; a carta fala de começo; talvez eu esteja pensando em iniciar um curso.'],
'olhar-o-louco':['O Louco costuma representar começos, curiosidade e riscos de experimentar algo novo.','O personagem caminha perto de um precipício: começar algo pode ser animador, mas também exige atenção.'],
'numero-zero':['O zero do Louco é usado simbolicamente como uma ideia de início: algo ainda está começando a tomar forma.','Uma pessoa que se matricula no primeiro dia de aula ainda não sabe tudo o que aprenderá.'],
'cartas-em-conversa':['Quando duas cartas aparecem juntas, podemos comparar seus significados. Não precisamos pensar que uma anula a outra.','O Louco pode falar de começar; O Mago, de transformar esse começo em ação.'],
'naiff-e-as-escolas':['Existem baralhos diferentes, com desenhos e numerações que podem mudar. Saber qual está sendo usado evita confusão.','Se o seu livro mostra A Justiça como VIII e nosso Atlas mostra XI, você não leu errado: são tradições diferentes.'],
'hipoteses-responsaveis':['Uma carta pode ajudar você a formular perguntas, mas não prova o que outra pessoa pensa nem garante acontecimentos futuros.','Em vez de dizer “vou conseguir o emprego”, pergunte “como posso me preparar para a entrevista?”.']
};
export function plainGuideForSection(id){return lessonPlainGuides[id]||null;}
