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
