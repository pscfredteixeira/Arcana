# ARCANA — Revisão pedagógica de linguagem (10/10/2026)

## Diagnóstico

**Problema principal:** as explicações colocavam o aluno diante de termos como "hipótese contextual", "interioridade", "iconografia", "polaridade simbólica", "relação interpretativa" e "tradição esotérica" antes de definir claramente o significado das cartas. As páginas tinham conteúdo editorial, mas não respondiam logo à pergunta mais natural de um iniciante: **"O que esta carta significa?"** A preocupação correta em evitar previsões deterministas acabou, em alguns textos, obscurecendo o conteúdo em vez de ensiná-lo.

A orientação pedagógica adotada agora é: **definição direta → exemplo cotidiano → observação da imagem → explicação aprofundada → variações e limites → atividade**. Isso não substitui os livros. Os significados diretos são resumos autorais para orientação inicial; os autores são consultados em contraste nos níveis mais profundos.

## Amostra antes e depois

| Local | Antes, exemplo do problema | Agora, como começa |
|---|---|---|
| O Louco | "uma imagem de movimento e abertura ao desconhecido" | "**Começos, curiosidade e coragem de experimentar algo novo.** É como entrar em um curso..." |
| A Sacerdotisa | "a cena valoriza a contenção e aquilo que nem sempre é dito" | "**Observar, escutar e reunir informações antes de tomar uma decisão.** Você recebeu uma proposta..." |
| A Justiça | "medida, consequência..." | "**Avaliar fatos, assumir consequências e procurar decisões equilibradas.** Dois colegas discordam..." |
| Cinco de Copas | "uma figura observa taças derramadas..." | "**Tristeza e decepção por algo perdido, sem que tudo tenha necessariamente acabado.** Um plano fracassou..." |
| Oito de Ouros | "uma figura produz objetos em sequência..." | "**Prática, dedicação e aperfeiçoamento de uma habilidade.** Você melhora porque treina..." |

As caixas de significado simples aparecem antes do aprofundamento e, também, em destaque antes da imagem dentro da ficha da carta, para favorecer a leitura no celular.

## Áreas revisadas

**Início.** A abertura fala diretamente com quem não conhece tarô. Há um botão evidente "Nunca estudou tarô? Comece aqui", além de caminhos para as aulas e o Atlas. Menus continuam com cinco destinos principais para não prejudicar a navegação no celular.

**Comece aqui.** Página nova `#/comece-aqui`: definição inicial de tarô, composição 22+56=78, explicação completa do Louco, três passos simples (Olhe → Entenda → Relacione), dicionário de 14 termos e indicação da ordem recomendada das primeiras aulas.

**Atlas.** Todas as 78 cartas agora possuem uma primeira camada com significado explícito **único por carta** e um exemplo cotidiano. A camada anterior, extensa, permanece abaixo, com as explicações visuais e as diferentes hipóteses. A busca do Atlas também considera a definição simples, não apenas nomes e palavras-chave.

**Aulas.** As 18 seções disponíveis nas quatro aulas receberam caixas "Em palavras simples" e exemplos concretos antes dos parágrafos originais. Foram simplificados alguns rótulos, objetivos, instruções do laboratório e caminhos de acesso ao glossário.

**Jogos.** Introduções e feedback nos jogos Diamante, Ateliê dos Símbolos e Seis Caminhos foram reformulados para explicar o objetivo e a ação solicitada antes do vocabulário conceitual. A mecânica interativa existente foi preservada.

**Mesa de Tiragens.** O painel de leitura agora mostra o significado simples e exemplo da carta sorteada, antes de pedir que o aluno escreva uma interpretação. Os textos salvos do aluno continuam guardados localmente.

**Meu Estudo.** A apresentação do progresso ficou mais direta e próxima da linguagem de uso.

**Rodapé.** Link permanente para "Comece aqui" disponível em qualquer página.

## Regras editoriais para conteúdo novo

1. A primeira explicação deve responder em português corrente: "Esta carta costuma falar de...", em frase afirmativa inteligível e sem mistério proposital.
2. Dar **pelo menos um exemplo que poderia acontecer no cotidiano**, com verbos concretos.
3. Definir uma palavra técnica na primeira ocorrência; preferir "significado" a "interpretação contextualizada" quando o aluno ainda está começando.
4. Não esconder a leitura tradicional com ressalvas em todos os parágrafos. Apresentar o significado básico primeiro; depois os limites e as leituras alternativas.
5. Quando um autor é nomeado, identificar sua contribuição sem atribuir a ele frases editoriais não verificadas.
6. Separar observação ("há três espadas no desenho") de interpretação ("pode representar tristeza").
7. Ensinar antes de avaliar. Se o aluno errar, explicar a resposta em linguagem simples e permitir tentar de novo.
8. Respeitar celulares: significado no início, blocos curtos, fonte legível, botões grandes, acesso ao glossário e detalhes opcionais.

## Limites e pendências — não esconder

Esta atualização é uma **primeira revisão transversal de legibilidade**, e não uma validação linguística humana integral de cada frase do projeto. Os ensaios aprofundados ainda preservam termos de teoria e trechos densos: a camada simples foi posicionada antes para proteger o iniciante, mas uma etapa futura poderá reescrevê-los integralmente em linguagem progressiva.

Também ficam pendentes: revisar manualmente as definições contra cada capítulo dos livros; testar as aulas com pessoas que nunca viram tarô; conferir a experiência real de Safari/iPhone e VoiceOver; medir o entendimento após cada explicação (não apenas acertos de múltipla escolha); e criar uma pesquisa curta de compreensão por seção.

**Fontes usadas:** Rachel Pollack, *Setenta e oito graus de sabedoria* (partes I e II, PDF fornecido); Nei Naiff, *Curso completo de tarô* (estrutura do baralho, Maiores, Menores e sistemas de interpretação, PDF fornecido). Não se considera que as 78 definições rápidas tenham sido atribuídas individualmente a esses autores; são introduções didáticas próprias do ARCANA com convenções amplamente utilizadas no estudo do RWS.

## Validação automatizada

`tests/beginner.test.mjs` verifica correspondência das 78 definições e exemplos às cartas reais, cobertura de 18 capítulos, presença do guia e da nova rota e integração à navegação. `tests/cardStudies.test.mjs` protege a sequência explicação simples → conteúdo aprofundado. Os testes **não substituem** teste de compreensão com estudantes reais.
