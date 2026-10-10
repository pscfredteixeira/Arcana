# ARCANA — Sprint 4: O Diamante dos Arcanos

**Data:** 10/10/2026  
**Entrega:** primeira experiência de jogo educacional completa, com etapas, estados, feedback e persistência local.

## Resultado do sprint
A área **Práticas** passou a apresentar uma experiência interativa funcional. O jogo **O Diamante dos Arcanos** adapta, de forma autoral, a comparação de quatro Arcanos Maiores usada por Rachel Pollack: O Louco (0), O Mago (I), A Sacerdotisa (II) e O Mundo (XXI).

**Fonte da estrutura:** Rachel Pollack, *Setenta e oito graus de sabedoria*, capítulo 1, *A tiragem de quatro cartas*, pp. 31–33 da edição impressa (pp. 32–34 do PDF de trabalho fornecido). A disposição foi conferida visualmente no PDF:
- **Topo:** O Louco.
- **Esquerda:** O Mago.
- **Direita:** A Sacerdotisa.
- **Base:** O Mundo.

O capítulo distingue duas figuras em movimento, no eixo vertical, de duas figuras comparativamente fixas, no eixo horizontal, propondo unidade/potencialidade/integração e dualidade simbólica. A interpretação no ARCANA é atribuída à autora e não apresentada como lei universal ou previsão.

## Como funciona

### Fase 1 — Compor
O aluno escolhe uma carta entre quatro e a coloca no diamante tocando na posição. Não existe requisito de arrastar: toda interação é botão, compatível com toque e teclado. É possível mover, retirar ou limpar cartas. Ao conferir, posições divergentes recebem contorno visual e retorno descritivo do número de posições correspondentes. O aluno pode experimentar de novo sem perder pontos; não há pontuação arbitrária.

### Fase 2 — Relacionar
O sistema mostra **o eixo vertical com duas cartas na vertical** e, em seguida, **o eixo horizontal com duas cartas lado a lado**. Em cada um, o aluno distingue interpretações simbólicas fundamentadas de leituras literais ou deterministas. Uma escolha inadequada retorna explicação e permite nova tentativa. A fase só avança ao selecionar uma alternativa justificada.

### Fase 3 — Interpretar
Uma situação fictícia sobre iniciar um trabalho criativo pede uma hipótese que articule as cartas e o contexto. O sistema explica a qualidade da justificativa. O aluno pode escrever uma pergunta em um campo aberto e revisar a própria resposta por critérios claros, **sem nota automática para interpretação subjetiva**.

### Conclusão
Resumo das três competências trabalhadas, registro opcional da reflexão e opção de refazer ou visitar o Atlas. Progresso e texto localmente persistidos em `localStorage` (`arcana-diamond-v1`). A atividade não exige login nem serviços pagos.

## Integridade do projeto
- Reutilização das cartas e imagens já catalogadas pelo Atlas.
- HTML, lógica de estado e material pedagógico em módulos separados.
- Estilos específicos para o jogo, sem substituir as cores ou componentes do ARCANA.
- Rota direta: `#/praticas/diamante`; catálogo em `#/praticas`.
- Nova interface responsiva, com cartões de seleção, tabuleiro e feedback legível.
- Respeito à configuração global `prefers-reduced-motion`.
- Os textos antigos da página inicial e "Sobre" foram atualizados para refletir os sprints 2–4.

## Arquivos adicionados
- `src/data/diamondContent.js`: instruções, explicações, questões e fonte da atividade.
- `src/games/diamondLogic.js`: transições e correção de posições.
- `src/games/diamondGame.js`: telas, eventos e persistência.
- `styles/games.css`: layout desktop e mobile.
- `tests/sprint4.test.mjs`: verificações de arranjo, estados, transições, regras e integração.
- `docs/SPRINT4_REPORT.md`.

## Arquivos modificados
- `src/app/main.js`: rotas e eventos do jogo.
- `src/ui/templates.js`: descrições atualizadas.
- `index.html`: estilos da área Práticas.
- `docs/ROADMAP.md` e `README.md`: acompanhamento.

## Verificações realizadas
- Inspeção visual da página do capítulo no PDF fornecido para confirmar o arranjo das quatro cartas.
- Sintaxe dos módulos JavaScript: **aprovada** na verificação com `new Function` após remoção de `import/export`.
- Execução simulada da jornada com DOM e armazenamento de teste: **aprovada** para composição incorreta, recuperação, dois eixos, escolha incorreta, reflexão, conclusão e salvamento.
- Os testes oficiais de Node foram adicionados ao repositório; sua execução com `npm test` e revisão em navegador real ainda devem ser confirmadas no ambiente de publicação.

## Critérios para validação no celular
1. Abrir `#/praticas` e seguir para **O Diamante dos Arcanos**.
2. Na montagem, selecionar uma carta e uma posição sem precisar arrastar.
3. Errar uma posição e conferir; perceber claramente o feedback e conseguir corrigir.
4. Acertar o tabuleiro e reconhecer visualmente os eixos vertical e horizontal.
5. Concluir os dois desafios de interpretação e a situação contextual.
6. Escrever um registro, concluir e reabrir a página: o progresso deve estar salvo.
7. Refazer a atividade; testar com fonte ampliada, leitor de tela/teclado se disponíveis.

## Limitações
- Os comentários do jogo representam uma adaptação didática de Pollack, não uma reprodução dos exercícios do livro.
- A escrita livre não é avaliada automaticamente; a pessoa recebe critérios de autorrevisão.
- Salvamento local não sincroniza entre dispositivos e se perde caso o armazenamento seja apagado.
- O jogo faz uso de imagens hospedadas no Wikimedia Commons; a estabilidade da conexão afeta sua exibição, embora exista fallback textual.
- Acessibilidade e usabilidade móveis ainda necessitam inspeção real; a implementação de botões e `aria-live` não representa certificação WCAG 2.2 AA.
- Mesa de tiragens, segundo jogo e currículo completo não fazem parte deste sprint.

## Próximo incremento recomendado
Revisar a experiência no celular, ajustar quaisquer problemas de toque/leitura e, na sequência, preparar a mesa de tiragens didática do Sprint 5.
