# ARCANA — Currículo preliminar

**Status:** proposta inicial, a revisar após auditoria detalhada dos livros de referência. O programa terá três níveis e quinze módulos. O número de aulas ainda não está fixado.

## Fundamentos
- **F-01 História e usos do tarô:** fatos históricos, tradições e hipóteses sobre origem.
- **F-02 Estrutura do baralho:** 22 Arcanos Maiores, 56 Menores, naipes e figuras da corte.
- **F-03 Aprender a ver:** observar personagens, gestos, cores, objetos e composição antes de interpretar.
- **F-04 Arcanos Maiores I:** Louco, Mago, Sacerdotisa e relações iniciais.
- **F-05 Arcanos Maiores II:** sequência e relações entre os demais trunfos.
- **F-06 Primeiras leituras:** perguntas abertas, combinação de cartas e registro de hipóteses.

## Intermediário
- **I-01 Quatro naipes:** Bastões, Copas, Espadas e Pentáculos no RWS.
- **I-02 Números e progressões:** relações simbólicas entre cartas numeradas.
- **I-03 Cartas da corte:** papéis, atitudes e interpretação contextual.
- **I-04 Cartas em diálogo:** contraste, repetição e tensão em pares e trios.
- **I-05 Tiragens fundamentais:** posições, formulação de perguntas e síntese.

## Avançado
- **A-01 Métodos e escolas:** variantes, divergências entre tradições e cartas invertidas.
- **A-02 Narrativas complexas:** conjuntos de cartas e hipóteses concorrentes.
- **A-03 Estudos de caso:** exercícios com perguntas fictícias contextualizadas.
- **A-04 Autonomia, ética e portfólio:** responsabilidade, limites, reflexão e revisão de leituras.

## Fontes, sem fusão indevida
Rachel Pollack, *Setenta e oito graus de sabedoria*: referência principal para simbologia visual RWS, arquétipos, relações e leitura contextual.

Nei Naiff, *Curso completo de tarô*: referência complementar para progressão técnica, seis caminhos dos Arcanos Maiores, quatro degraus (Ter, Ser, Estar, Ficar), metodologia e exercícios.

A numeração de Justiça e Força, assim como as cartas invertidas, deve preservar a identificação do sistema empregado. Não reatribuir como consenso aquilo que é interpretação particular.

## Modelo mínimo de cada aula
ID estável; título; objetivo observável; pré-requisitos; fontes e páginas verificadas; texto original; imagem com licença; exploração visual; exercício; feedback; avaliação; critério de conclusão; relações com outros conteúdos.

## Exercícios iniciais candidatos
- **Diamante dos Arcanos:** inspirado na comparação Louco–Mago–Sacerdotisa–Mundo, no primeiro capítulo de Pollack; aprender a comparar eixos.
- **Seis Caminhos:** classificação dos Arcanos Maiores na organização de Naiff, explicitada como perspectiva do autor.
- **Ter, Ser, Estar, Ficar:** ligar elementos, naipes e planos em um laboratório interativo, segundo a classificação de Naiff.

Essas atividades serão descritas tecnicamente antes de começar o código.

## Aulas aprofundadas publicadas até o Sprint 7

| Ordem de leitura sugerida | Unidade | Estado | Rota |
|---|---|---|---|
| 01 | F-02.01 — O mapa das 78 cartas | Aula + laboratório de 3 fases | `#/aula/mapa-78-cartas` |
| 02 | F-03.01 — A arte de olhar | Aula + laboratório de 3 fases | `#/aula/primeiro-olhar` |
| 03 | F-04.01 — O Mago e a Sacerdotisa | Aula + laboratório de 3 fases | `#/aula/mago-e-sacerdotisa` |
| 04 | I-01.01 — Os quatro naipes | Aula + Oficina de Correspondências em 3 fases | `#/aula/quatro-naipes` |

**Nota:** I-01 está em nível intermediário, mas é oferecida como quarta porta de entrada visual. Essa ordem de navegação não significa que todos os pré-requisitos dos módulos intermediários tenham sido concluídos. A sequência abrangente continua em elaboração. Marcadores de conclusão são decisões do aluno, não certificados.

O conteúdo de cada uma das três novas aulas está em `src/lessons/sprint7Lessons.js`. Rastreabilidade dos livros e pendências editoriais: [CONTENT_AUDIT.md](CONTENT_AUDIT.md).

## Sprint 9 — Jornada dos 22 Maiores (12/10/2026)

Disponível em `#/jornada`: o Louco e três grupos de sete cartas (I–VII, VIII–XIV, XV–XXI), com observação da imagem, explicação em linguagem corrente, exercício com feedback e anotação opcional por carta. Progresso integrado a Meu estudo e backup. A divisão é uma proposta didática que dialoga com Pollack, não uma regra universal sobre a vida humana. Ver [SPRINT9_REPORT.md](SPRINT9_REPORT.md).

## Sprint 10 — Cartas em Diálogo (12/10/2026)

Disponível em `#/praticas/cartas-em-dialogo`: sete exercícios de comparação em quatro revisões que correspondem aos capítulos da Jornada. Duas cartas lado a lado, exemplos cotidianos, feedback específico, dica opcional, síntese do capítulo e anotações. A oficina é independente do avanço na Jornada e seu progresso é armazenado localmente com backup. Ver [SPRINT10_REPORT.md](SPRINT10_REPORT.md).

**Próxima etapa possível:** ampliar para trios de cartas e justificativas escritas, combinadas com revisão espaçada. O curso completo de quinze módulos continua em expansão.
