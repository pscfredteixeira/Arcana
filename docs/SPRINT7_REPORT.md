# ARCANA — Sprint 7: Formação em expansão

**Data:** 10 de outubro de 2026  
**Área:** currículo / experiências / revisão de fontes.

## Entrega principal
Três novas aulas completas no percurso de Aprender, formando **quatro aulas aprofundadas disponíveis no ARCANA**:

- **O mapa das 78 cartas** (`F-02.01`; `#/aula/mapa-78-cartas`): arquitetura do baralho, Maiores e Menores, figuras da corte, nomenclatura e numeração.
- **O Mago e a Sacerdotisa** (`F-04.01`; `#/aula/mago-e-sacerdotisa`): gestos, recursos, interioridade, diferenças de postura, dualidades na interpretação de Rachel Pollack, leitura contextual e limites de polaridades históricas.
- **Os quatro naipes** (`I-01.01`; `#/aula/quatro-naipes`): naipes, quatro elementos como associações simbólicas, quatro Ases em comparação e contraste entre Rachel Pollack e Ter/Ser/Estar/Ficar de Nei Naiff.

A aula anterior **A arte de olhar** permanece disponível. Cada nova aula possui quatro seções de texto, objetivos específicos, imagens e links ao Atlas, perguntas de aprofundamento, referências por página e um laboratório de **três fases**.

## Jogo / oficina
As três aulas oferecem prática integrada com feedback formativo:
- **Estrutura:** famílias de cartas, contagem, Força/Justiça em duas tradições.
- **Mago e Sacerdotisa:** separar detalhe, hipótese e síntese contextual.
- **Quatro naipes:** *Oficina de Correspondências*, associando quatro Ases a Fogo, Água, Ar e Terra por botões e toques, sem arrastar; depois comparar métodos e analisar um caso.

As respostas corretas e incorretas recebem explicações. A etapa seguinte só é liberada após uma resposta coerente. O aluno pode refazer e preservar em armazenamento local as **etapas concluídas** (não é gravada uma nota de acertos). A conclusão da aula é uma escolha explícita posterior.

## Organização editorial
Conteúdos das três aulas: `src/lessons/sprint7Lessons.js`  
Estado das oficinas: `src/lessons/lessonPractice.js`  
Renderização e interações: `src/ui/expandedCourse.js`  
Estilos mobile-first: `styles/course.css`

A página Aprender foi reformulada em quatro passos disponíveis, sem apresentar as unidades ainda não escritas como publicadas.

O painel **Meu Estudo** agora contabiliza quatro aulas e os exercícios novos, em vez de afirmar que apenas uma aula está disponível. A marcação de conclusão é independente por aula e não apaga as anteriores.

## Backup e compatibilidade
A chave `arcana-lesson-completed-v1` passou a admitir quatro IDs: `F-02.01`, `F-03.01`, `F-04.01`, `I-01.01`. A conclusão anterior `F-03.01` é preservada. Nova chave permitida: `arcana-sprint7-activities-v1`, contendo apenas as etapas concluídas das oficinas. Backups antigos continuam importáveis; a validação normaliza as chaves para a estrutura atual.

As anotações da aula inicial, o Diamante, o diário de tiragens e as configurações de leitura foram preservados.

## Fontes e limitações
Textos e atividades novos, redigidos de maneira original, com Pollack e Naiff como bases distintas. Foram consultados os capítulos e páginas relevantes dos PDFs. Ver [CONTENT_AUDIT.md](CONTENT_AUDIT.md) para rastreabilidade e pendências.

**Não declarado como concluído:** os 15 módulos planejados, monografias de 78 cartas, auditoria de direitos de todas as imagens, inspeção manual em Safari/iPhone ou certificação de acessibilidade WCAG.

## Testes
`tests/sprint7.test.mjs` verifica:
- conteúdo, fontes e IDs das três aulas;
- consistência de perguntas e correspondências;
- renderização das aulas e rotas;
- fases do exercício, bloqueio de avanço sem acerto e recomeço;
- persistência e restauração de dados novos sem destruir progresso anterior;
- integração de estilos e marcações em Meu Estudo.

Os testes são executados no GitHub Actions juntamente com as suites dos sprints anteriores.

## Validação recomendada no celular
1. Abrir `#/aprender` e verificar a ordem das quatro aulas.
2. Ler *O mapa das 78 cartas*, aumentar a fonte e conferir imagens.
3. Completar *O Mago e a Sacerdotisa* e verificar feedback e botões.
4. Em *Os quatro naipes*, fazer as quatro associações sem arrastar.
5. Marcar uma aula como concluída, visitar Meu Estudo e verificar o indicador.
6. Exportar um backup com o progresso novo (e, se necessário, testá-lo em outro navegador depois de salvar o estado anterior).

## Próximas entregas
Expandir aulas dos Maiores e Menores com revisão iconográfica, exercícios abertos guiados e fontes mapeadas, sem tentar publicar todo o currículo sem conferência.
