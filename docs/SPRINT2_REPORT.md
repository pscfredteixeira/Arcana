# ARCANA — Sprint 2: aula completa e laboratório do primeiro olhar

**Data:** 10 de outubro de 2026  
**Entrega:** primeira aula aprofundada, interações com feedback, caderno pessoal e fontes.

## Entregas implementadas
- Aula **A arte de olhar: do que vemos ao que podemos interpretar**, integrada à rota existente `#/aula/primeiro-olhar`.
- Seis capítulos com explicações autorais, objetivos pedagógicos e sínteses.
- Exploração visual de O Louco e comparação com O Mago e A Sacerdotisa.
- Três exemplos de interpretação com contextos distintos.
- Laboratório em **três etapas**: (1) descrição verificável, (2) hipótese simbólica fundamentada, (3) interpretação contextual. Feedback explicativo e tentativa adicional.
- Caderno de estudo com texto livre e orientação de revisão sem gabarito único.
- Progresso do laboratório e rascunho salvos localmente no navegador (`localStorage`).
- Layout responsivo, botões grandes e uso por teclado; respeito ao modo de movimento reduzido já existente.
- Conteúdo separado de marcação de interface, estilos e motor de atividade.

## Referências de trabalho
- Rachel Pollack, *Setenta e oito graus de sabedoria*: capítulo 1, tiragem de quatro cartas (PDF pp. 33–35), capítulo 3, Louco e arcanos iniciais (PDF pp. 47–53); abordagem da leitura contextual (PDF pp. 30–32).
- Nei Naiff, *Curso completo de tarô*: lições de classificação dos baralhos e estrutura do tarô (PDF pp. 15–18, 23–28).

**Importante:** o texto e os exemplos são próprios; não há cópia de páginas ou textos extensos dos livros no repositório. A página explicita que interpretações de autores são hipóteses simbólicas, não fatos previsíveis.

## Arquivos novos
- `src/lessons/firstLookContent.js`
- `src/ui/fullLesson.js`
- `styles/lesson.css`
- `tests/sprint2.test.mjs`

## Arquivos atualizados
- `index.html` — folha de estilo da aula.
- `src/app/main.js` — nova aula, eventos do laboratório e rascunho.
- `src/ui/templates.js` — cartão do curso atualizado.
- `docs/ROADMAP.md` — progresso do projeto.

## Limitações / verificações pendentes
- Conferência de sintaxe JavaScript realizada, sem erros.
- Teste de navegador e revisão de responsividade **em aparelho real** ainda necessários.
- Testes Node disponíveis em `npm test`; a execução completa em ambiente Node ainda precisa ser confirmada.
- O laboratório avalia as três escolhas factuais; o texto interpretativo aberto não recebe nota automática. A pessoa faz a revisão guiada.
- O rascunho é salvo no navegador; limpar dados do navegador pode apagá-lo. Não existe sincronização ou conta.
- Esta entrega não constitui o curso completo: módulos e cartas restantes serão publicados gradualmente.

## Critérios de aceitação
Abrir `#/aula/primeiro-olhar` na versão publicada; percorrer os seis capítulos, executar três etapas do laboratório, registrar um texto, navegar ao Atlas e voltar à aula mantendo o rascunho. Validar fonte grande e pequenas telas.
