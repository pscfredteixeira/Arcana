# ARCANA — Sprint 8: experiências elaboradas

**Data:** 10 de outubro de 2026
**Entrega:** dois jogos interativos novos, integrados ao laboratório Práticas, com explicações pedagógicas, composição visual, progresso salvo e acesso em celular.

## O que mudou

### Ateliê dos Símbolos — `#/praticas/atelie`
Uma experiência de investigação iconográfica em três arcanos do Rider–Waite–Smith: O Louco, O Mago e A Sacerdotisa.

O estudante escolhe a carta, encontra **três pontos de interesse** posicionados sobre sua imagem, ou acessa esses pontos por uma **lista de botões**; cada ponto revela três camadas: aquilo que se vê, uma interpretação possível e uma pergunta aberta. Após colecionar as três evidências, precisa escolher uma hipótese adequada a uma situação fictícia. Uma resposta inadequada traz justificativa e opção para tentar novamente. A experiência se completa quando as três cartas forem estudadas (nove descobertas).

A lista de pontos evita dependência de precisão na imagem e permite uso por toque, teclado ou leitores de tela. Detalhes/posições são específicos para a edição RWS. O jogo salva quais cartas já foram concluídas, além do ponto atual, sem exigir login.

**Fonte e delimitação:** Rachel Pollack, *Setenta e oito graus de sabedoria*, capítulos iniciais, na leitura relacional das imagens. Os marcadores, as três situações e a estrutura da atividade são uma criação pedagógica original do ARCANA. Não são citações ou tiragens tradicionais de Pollack.

### Os Seis Caminhos — `#/praticas/seis-caminhos`
Uma jornada visual por seis conjuntos de Arcanos Maiores na organização de Nei Naiff, *Curso completo de tarô*, lições 6–11 (PDF de trabalho: pp. 47, 59, 68, 77, 89 e 93):

| Estação | Nome de Naiff | Faixa de arcanos na convenção do autor | Carta de síntese usada no jogo |
|---|---|---|---|
| 1 | Vontade | I–V | O Mago (I) |
| 2 | Livre-arbítrio | VI | Os Enamorados (VI) |
| 3 | Prazer | VII–XI | O Carro (VII) |
| 4 | Dor | XII–XVI | A Torre (XVI) |
| 5 | Esperança | XVII | A Estrela (XVII) |
| 6 | Evolução | XVIII–XXI | O Mundo (XXI) |

A trilha tem seis estações com um mapa que se preenche progressivamente. Cada missão apresenta três cartas possíveis; acertar libera a explicação e a próxima estação. Depois das seis estações, uma questão-síntese diferencia a organização simbólica de Naiff de uma previsão literal sobre a vida. O estado é salvo localmente.

**Limite metodológico importante:** o ARCANA usa a numeração Rider–Waite–Smith nas imagens exibidas. Nei Naiff trabalha também com convenções de outros baralhos; Força/Justiça podem ocupar posições diferentes. A divisão por faixas e nomes é creditada à proposta de Naiff, não apresentada como estrutura universal. O Louco (0) se relaciona simbolicamente aos ciclos, mas não é colocado de forma arbitrária em uma faixa numérica do jogo.

## Design e acessibilidade
- Identidade Arquivo Vivo: papel, vinho, iluminação quente, serifada editorial e realce delicado de progresso.
- Estética de coleção, mesa de imagens e trilha de seis estações, **não apenas perguntas simples em sequência**.
- Cartas RWS em primeiro plano, alvos com dimensão confortável para toque, layout responsivo e alternativas textuais de cada hotspot.
- Estados visíveis (escolhido, visitado, correto, incorreto), feedback pedagógico por texto, indicações de progresso e opção de refazer.
- Sem uso obrigatório de arrastar; ações executadas por botões nativos.
- Respeito a `prefers-reduced-motion` e ao modo manual de reduzir movimento.
- Persistência no navegador e suporte ao backup do Meu Estudo.

## Arquitetura e arquivos
Novos módulos:
- `src/games/explorationsData.js`
- `src/games/explorationsLogic.js`
- `src/games/atelierGame.js`
- `src/games/sixPathsGame.js`
- `styles/explorations.css`
- `tests/explorations.test.mjs`

Modificados:
- `src/app/main.js` — duas rotas, renderização e eventos.
- `src/games/diamondGame.js` — catálogo de Práticas com as duas novidades.
- `src/study/studyData.js` — progresso e backup.
- `src/study/studyUI.js` — novos cartões de acompanhamento.
- `index.html` — folha de estilo.
- `README.md`, `docs/ROADMAP.md`, `docs/INTERACTIONS.md`.

## Dados locais
- `arcana-atelier-v1`: carta atual, evidências visitadas e lista de cartas concluídas.
- `arcana-six-paths-v1`: estação atual, etapa final e conclusão.

As chaves são incluídas no backup JSON local. A restauração substitui os registros atuais do ARCANA após confirmação, como na versão anterior.

## Testes e limites
Os testes automatizados verificam a integridade dos nove pontos, correspondência das seis faixas, bloqueio de avanço em erro, feedback, retomada, conclusão e backup, além de regressões de sprints anteriores.

**A revisão visual manual no iPhone/Safari e a inspeção das coordenadas reais dos nove pontos sobre as imagens são pendentes.** Esses testes de UI são necessários para confirmar a precisão dos hotspots em cada tamanho de tela. Aprovação do CI não equivale a conformidade WCAG nem a uma auditoria gráfica completa. A plataforma ainda não possui o currículo inteiro nem monografias completas das 78 cartas.

## Testes recomendados ao usuário
1. Abrir o Ateliê, escolher O Louco, tocar nos três círculos e verificar se as explicações correspondem visualmente a cada detalhe. Alternar com a lista textual.
2. Escolher uma hipótese incorreta e observar o feedback; depois selecionar a interpretação contextualizada.
3. Concluir O Mago e A Sacerdotisa. Reabrir Meu Estudo e verificar 3/3 cartas.
4. Percorrer os Seis Caminhos e escolher uma carta incorreta para testar a explicação; concluir as seis estações.
5. Recarregar a página e conferir se o progresso foi preservado.
6. Se for exportar um backup, verificar se o arquivo contém as chaves dos novos jogos e guardá-lo de maneira segura.
