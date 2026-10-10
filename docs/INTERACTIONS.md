# ARCANA — Interações e mecânicas educativas

## Diamante dos Arcanos (Sprint 4)
**Fonte do esquema:** Pollack, *Setenta e oito graus de sabedoria*, cap. 1, pp. 31–33 da edição impressa.  
**Objetivo de aprendizagem:** reconhecer posições visuais, comparar eixos simbólicos e formular hipóteses sem confundir significado com previsão.  
**Rotas:** catálogo `#/praticas`; jogo `#/praticas/diamante`.

### Mecânica e regras
- **Compor:** selecionar uma das quatro cartas do baralho; tocar em topo, esquerda, direita ou base; corrigir sem penalidade. Verificar somente quando as quatro posições estão ocupadas. A posição corresponde ao **arranjo escolhido pela autora**, não a uma convenção universal para toda tiragem.
- **Relacionar:** responder a dois problemas de comparação. O primeiro destaca o eixo vertical (Louco–Mundo); o segundo, o eixo horizontal (Mago–Sacerdotisa). Resposta incorreta mostra fundamento da divergência e permite outra tentativa.
- **Interpretar:** escolher uma síntese contextualizada para uma situação fictícia. Feedback explica a qualidade argumentativa. Anotação aberta e autorrevisão são opcionais; sem classificação artificial de conteúdo subjetivo.
- **Retomar/refazer:** salvar estado e texto apenas no navegador; permitir reinício explícito.

### Contrato do estado
```json
{
  "step": "compose",
  "board": {"top": null, "left": null, "right": null, "bottom": null},
  "selected": null,
  "checked": false,
  "axisIndex": 0,
  "axisChoice": null,
  "scenarioChoice": null,
  "reflection": "",
  "completed": false
}
```
`step`: `compose`, `axes`, `scenario` ou `complete`. Na reidratação, respostas provisórias são descartadas, mas a fase concluída, posições e caderno são preservados. Quaisquer dados malformados são normalizados. Versão persistida: chave `arcana-diamond-v1`.

### Acessibilidade e experiência
Controles nativos com foco visível, rótulos e alvos de toque; sem dependência de gestos complexos. Feedback em bloco `role=status`, suporte a `prefers-reduced-motion` e layout responsivo. O aluno pode mover qualquer carta, repetir questões e reiniciar a experiência. Teste real com tecnologias assistivas permanece pendente.

### Cuidados interpretativos
Tradições específicas devem ser identificadas. O capítulo de Pollack emprega dualidades simbólicas históricas; o jogo evita transformá-las em afirmações universais sobre identidades humanas. A atividade é de leitura e comparação, não de adivinhação, diagnóstico ou aconselhamento profissional.

## Próximos jogos
A Fábrica de Símbolos e os Seis Caminhos aparecem como **planejados**, não implementados. Antes de criar cada um, documentar objetivos observáveis, fonte, estado, feedback, navegação sem arrastar e critérios de teste.

## Mesa de Tiragens (Sprint 5)
**Rota:** `#/praticas/mesa`. **Fonte pedagógica:** ARCANA, adaptações originais para estudo da interpretação contextual; as duas disposições não são apresentadas como métodos originais de Pollack ou Naiff.

**Modalidades:** Três Perspectivas (Contexto → Tensão → Possibilidade) e Mapa de Perspectivas (Questão → Contraste → Recurso → Alternativa → Síntese). Baralho RWS completo (78) ou apenas os Arcanos Maiores (22), todos na orientação normal.

**Estados:** `setup` (modelo, baralho e pergunta opcional), `table` (cartas sorteadas de forma exclusiva, viradas e exploradas com registro por posição), `review` (todas as cartas reveladas, revisão das notas e síntese). Só é permitido ir à síntese após mostrar todas as cartas.

**Persistência:** `arcana-spread-session-v1` e `arcana-spread-archive-v1` em localStorage. O diário armazena até quinze leituras; a sessão e o histórico são normalizados. Confirmação antes de começar outra tiragem ou excluir um registro. Nenhum backend ou login.

**Acessibilidade:** botões e formulários nativos, sem requisito de arrastar, legendas legíveis, feedback e progresso com `role=status`/`progressbar`, animação desabilitada por `prefers-reduced-motion`. Auditoria manual e tecnologia assistiva real pendentes.

**Avaliação:** interpretação aberta não recebe nota automática; a interface oferece sugestões, exemplos de detalhe observável, hipótese contextual e rubrica de autoavaliação. Perguntas e textos não são enviados a servidores, mas também não são criptografados.

Ver [SPRINT5_REPORT.md](SPRINT5_REPORT.md).
