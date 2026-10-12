# ARCANA — Sprint pedagógico: aprender antes de responder

**Data:** 12 de outubro de 2026

## Objetivo
Corrigir uma falha pedagógica da plataforma: o estudante recebia perguntas e jogos antes de entender com clareza a ideia que precisava utilizar. Esta etapa mantém a identidade visual aprovada, a estrutura dos quatro módulos disponíveis e o progresso já salvo.

## Alterações implementadas

**1. Exemplos antes das perguntas.** Criado um componente compartilhado de orientação didática, com três partes: explicação em português corrente, exemplo resolvido e dica opcional. A dica é aberta pelo aluno usando o elemento HTML `details` / `summary`, compatível com toque, teclado e leitores de tela. A orientação aparece antes das alternativas, sem esconder a pergunta.

**2. Aula A arte de olhar.** Cada uma das três questões apresenta um exemplo que distingue observação, interpretação e previsão. As alternativas incorretas agora recebem **justificativas diferentes**, que explicam por que a opção escolhida não serve, em vez de mostrar a mesma mensagem para todos os erros.

**3. Laboratórios das três outras aulas.** As nove etapas receberam orientações ligadas ao conteúdo da aula. O exercício de associar naipe e elemento ganhou um exemplo antes da atividade e, quando o aluno escolhe o elemento errado, recebe uma explicação com a associação correta.

**4. Ateliê dos Símbolos.** Acrescentado um exemplo sobre a diferença entre observar um elemento da imagem e interpretá-lo. Nas três perguntas finais, o estudante encontra explicação e dica específicas para O Louco, O Mago e A Sacerdotisa antes das alternativas.

**5. Diamante dos Arcanos.** Agora há uma explicação clara do esquema de Pollack para posicionar quatro cartas. Cada uma das duas comparações e a situação final tem uma orientação própria, exemplo e dica. As perguntas sobre os eixos foram reescritas para substituir “potencialidade inicial”, “dualidade de estados” e expressões abstratas por início, conclusão, ação e observação, preservando a configuração simbólica de origem e as respostas corretas.

**6. Seis Caminhos de Nei Naiff.** Cada uma das seis estações ensina a ler o intervalo de algarismos romanos antes de pedir que o aluno encontre a carta. A mensagem de erro explica por que o número escolhido está fora da faixa. A questão final ensina explicitamente que os seis caminhos são um mapa de estudo, não previsão da vida do estudante.

**7. Mesa de Tiragens.** Explicação de uma tiragem antes da escolha do modelo; exemplo resolvido de como escrever observação e interpretação depois de revelar uma carta; exemplo de como relacionar duas cartas antes da síntese escrita.

**8. Responsividade e PWA.** Novos estilos dentro de `styles/beginner.css`, com foco em leitura no celular. O service worker foi atualizado para a versão de cache `arcana-app-shell-v7` e inclui `src/games/learningScaffolds.js` para que o novo conteúdo fique disponível no aplicativo instalado depois da atualização.

## Integração técnica
- `src/games/learningScaffolds.js`: fonte única de orientações e gerador escapado de HTML.
- `src/ui/fullLesson.js`, `src/ui/expandedCourse.js`: exemplos e feedback.
- `src/games/atelierGame.js`, `src/games/diamondGame.js`, `src/games/sixPathsGame.js`: ensino antes das escolhas.
- `src/data/diamondContent.js`: questões do Diamante em linguagem acessível.
- `src/spreads/spreadUI.js`: exemplos antes da interpretação livre.
- `styles/beginner.css` e `sw.js`: estilos e cache.
- `tests/learningSupport.test.mjs`: teste de cobertura das orientações (3 + 9 + 4 + 3 + 6 etapas), conteúdo escapado, opção acessível de dica, integração, preservação das respostas corretas e disponibilidade em cache.

## Critério pedagógico para os próximos sprints
Cada atividade deve responder nesta ordem: **o que vou aprender? → um exemplo resolvido → o que devo fazer? → uma dica se eu precisar → por que a resposta funcionou ou não? → tentar de novo**.

Erros não devem receber apenas mensagens como “incorreto” ou “reconsidere”. Sempre explicar qual ideia foi confundida. Exercícios interpretativos não devem prometer que um resultado simbólico prevê acontecimentos concretos.

## Validação
- GitHub Actions: **71 testes executados; 71 passaram; 0 falharam** no commit `01a0f7d7d77955f005ebbb7fd0e651a78c0414fe`.
- A publicação no GitHub Pages foi iniciada. Conferir status de deploy antes de afirmar que a versão está no ar.
- Nenhuma chave de progresso no localStorage foi alterada ou apagada.

## Limitações e trabalho seguinte
A cobertura por testes automatizados indica que os componentes, os dados e os fluxos de regressão estão íntegros. Não prova que estudantes reais aprenderam. Uma próxima etapa recomendada é conduzir um teste de compreensão com iniciantes: pedir a descrição do desenho, explicação do significado em palavras próprias e aplicação a uma situação, sem ajuda. Também faltam avaliações práticas de VoiceOver e leitura de textos em aparelhos reais com fontes ampliadas.

As estruturas estudadas dialogam com Rachel Pollack (*Setenta e oito graus de sabedoria*, capítulos iniciais e a tiragem de quatro cartas) e Nei Naiff (*Curso completo de tarô*, lições 6–11 e estudo dos Menores). As orientações, exemplos e perguntas são textos didáticos próprios do ARCANA, não transcrições dos livros.
