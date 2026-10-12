# Sprint 10 — Cartas em Diálogo e revisões da Jornada

**Data:** 12 de outubro de 2026  
**Status:** implementado no repositório. Publicação e testes devem ser conferidos no GitHub Actions após qualquer alteração.

## Objetivo pedagógico

Depois de estudar isoladamente os 22 Arcanos Maiores, o estudante precisa aprender a **comparar cartas sem decorar combinações fixas**. Uma dupla de cartas é usada para reconhecer diferenças nas imagens, formular relações possíveis e aplicar os significados a situações do cotidiano, sem inferir fatos sobre terceiros ou prever o futuro.

## Oficina nova

A rota `#/praticas/cartas-em-dialogo` abre a oficina e apresenta **sete comparações em quatro revisões**, acompanhando os capítulos do Sprint 9:

| Revisão | Cartas comparadas | Conhecimento praticado |
|---|---|---|
| Começar e colocar em prática | O Louco + O Mago | Desejo de começar e uso de recursos |
| Agir, escutar e construir | O Mago + A Sacerdotisa | Iniciativa e pesquisa antes de decidir |
| Agir, escutar e construir | A Imperatriz + O Imperador | Cuidado e estrutura |
| Escolher, encerrar e reajustar | A Roda da Fortuna + A Justiça | Mudanças externas e critérios de decisão |
| Escolher, encerrar e reajustar | A Morte + A Temperança | Encerramento e reorganização |
| Da ruptura à reconstrução | A Torre + A Estrela | Crise e cuidados para reconstruir |
| Da ruptura à reconstrução | A Lua + O Sol | Incerteza, fatos e clareza |

Cada atividade mostra **duas imagens RWS**, descreve o que cada uma representa, explica a possível ligação, apresenta um exemplo cotidiano e pede uma escolha entre três alternativas. Os erros recebem **explicações específicas**. O estudante pode consultar uma dica sem perder a possibilidade de concluir; o progresso diferencia **acertos de primeira, sem dica** dos que precisaram de apoio. A resposta correta apresenta feedback positivo antes de passar à próxima atividade.

Os capítulos são independentes: não há bloqueio para quem ainda não concluiu as 22 cartas. Após terminar uma revisão, aparecem os conceitos aprendidos e um campo opcional de anotação com até 400 caracteres. Não há promessa de que completar questões objetivas equivale a dominar interpretações complexas.

## Navegação e experiência mobile-first

O acesso à oficina foi incluído em **Aprender**, **Práticas**, **Meu estudo** e **ao final de cada capítulo da Jornada**. Um mapa de quatro revisões apresenta o progresso e permite entrar ou voltar livremente.

No celular, cada dupla é apresentada em duas linhas, com imagem compacta à esquerda e texto legível à direita; não é necessário arrastar cartas ou rolar lateralmente. Botões e estados de erro/acerto são identificados em texto, não apenas por cor. A última correção foi manter o feedback do acerto visível até a pessoa tocar para continuar.

## Persistência e segurança dos dados

Chave local: `arcana-dialogue-v1`. São armazenados tentativas por exercício, uso de dica e notas de cada revisão. A lógica valida IDs e respostas; evita contagem repetida da mesma alternativa. O dado novo é incluído no backup JSON de **Meu estudo**, sem alterar ou limpar registros anteriores. Backups de versões mais antigas permanecem aceitos. A nova versão da cache PWA é `arcana-app-shell-v10`.

## Arquivos

- `src/dialogue/dialogueData.js`: capítulos, pares, situações, respostas e explicações.
- `src/dialogue/dialogueLogic.js`: progresso, validação, feedback e armazenamento local.
- `src/dialogue/dialogueUI.js`: mapa, comparação visual, perguntas, resumo e notas.
- `styles/dialogue.css`: identidade visual e responsividade.
- `tests/dialogue.test.mjs`: cobertura dos sete pares, lógica, fluxo de tela, backup, rotas e cache.
- Integração em `src/app/main.js`, `src/ui/templates.js`, `src/games/diamondGame.js`, `src/journey/majorJourneyUI.js`, `src/study/studyData.js`, `src/study/studyUI.js`, `index.html` e `sw.js`.

## Referências e limites

As ilustrações são do Rider–Waite–Smith, de Pamela Colman Smith. Comparar posturas, figuras e sentidos dialoga com propostas de estudo de Rachel Pollack, *Setenta e oito graus de sabedoria*. Nei Naiff, *Curso completo de tarô*, é apresentado como método de estudo distinto na atividade dos Seis Caminhos. Todas as perguntas, casos e explicações da oficina são redação original do ARCANA, não transcrições nem formulações atribuídas literalmente aos autores.

Ainda precisamos verificar manualmente a navegação com VoiceOver/Safari em iPhone e testar o entendimento com alunos sem experiência. Sete pares são uma primeira oficina, não uma formação completa sobre combinações. Um próximo sprint pode incluir **trios de cartas, situações ambíguas, justificativas escritas e revisão espaçada**.
