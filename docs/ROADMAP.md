# ARCANA — Roadmap de sprints

**Regra:** nenhum sprint reconstrói arbitrariamente os componentes aprovados no anterior; cada etapa gera uma demonstração testável.

| Sprint | Meta | Condição de conclusão |
|---|---|---|
| 0 | Auditoria de conteúdo, arquitetura, licenças, plano e contratos | Fontes mapeadas, decisões e requisitos rastreáveis |
| 1 | Design System e navegação responsiva | Código de home, aula e atlas publicado no repositório; validação visual real e GitHub Pages ainda pendentes |
| 2 | Primeira aula com conteúdo original revisado | Aula completa, laboratório de 3 etapas, caderno e fontes publicados; validação visual real pendente |
| 3 | Atlas visual interativo inicial | 78 cartas, filtros, fichas e lupa publicados; revisão visual, acessibilidade e aprofundamento por carta pendentes |
| 4 | Primeiro jogo pedagógico | Diamante dos Arcanos em três fases, toque/teclado, feedback e salvamento local publicados; validação no celular pendente |
| 5 | Mesa de tiragens didática | Dois modelos de 3 e 5 cartas, revelação guiada, registro por posição e diário local implementados; revisão em celular pendente |
| 6 | Progresso local e acessibilidade | Preferências, persistência, contraste, foco e movimento reduzido |
| 7 | Ampliação de aulas, cartas e atividades | Conteúdo revisado e publicável por módulos |

## Situação após o Sprint 1
A primeira versão foi implementada em HTML/CSS/JavaScript modular, com navegação, seis cartas, busca e aula demonstrativa. A revisão estática de sintaxe e a renderização dos templates passaram nos testes realizados com os módulos carregados. A validação no navegador (desktop e celular) e a ativação do GitHub Pages seguem pendentes. Detalhes em [SPRINT1_REPORT.md](SPRINT1_REPORT.md).

## Próximas entregas
1. Habilitar GitHub Pages e testar navegação real.
2. Ajustar detalhes de contraste, fonte e layout após avaliação no celular.
3. Revisar e aprofundar primeira aula do Sprint 2, incluindo objetivos, fontes e atividades.
4. Definir a mecânica inicial do laboratório para os próximos sprints.

## Gestão de qualidade
Ao término de cada sprint, registrar arquivos modificados, demonstração, testes, problemas conhecidos e próxima tarefa. Não afirmar conclusão apenas porque os arquivos existem.

## Sprint 2 — andamento (10/10/2026)
Aula completa *A arte de olhar* publicada, com seis capítulos, comparação visual, três exercícios graduais com feedback e registro individual no navegador. As páginas de fonte foram verificadas por amostragem nas obras fornecidas. Sintaxe e renderização dos templates passaram em verificações programáticas; testes automatizados disponíveis. Consulte [SPRINT2_REPORT.md](SPRINT2_REPORT.md). A conferência no iPhone ainda deve ser feita.

## Sprint 3 — andamento (10/10/2026)
Atlas das 78 cartas, filtros por naipe, lupa com pontos simbólicos, fichas e zoom publicados. Seis cartas possuem marcadores específicos e 72 têm uma exploração visual geral inicial. As descrições das 72 cartas são resumos introdutórios originais, não o curso aprofundado. Consulte [SPRINT3_REPORT.md](SPRINT3_REPORT.md). A revisão de todas as imagens e o teste real no celular permanecem pendentes.

## Sprint 4 — Diamante dos Arcanos (10/10/2026)
Primeiro jogo pedagógico publicado em `#/praticas/diamante`, com montagem de quatro cartas segundo Rachel Pollack, exploração dos eixos vertical e horizontal, interpretação de situação contextual e caderno opcional. Progresso local sem login. Código modular com regras puras e testes de transição. Ver [SPRINT4_REPORT.md](SPRINT4_REPORT.md) e [INTERACTIONS.md](INTERACTIONS.md).

**Pendente antes do próximo sprint:** revisão visual e de usabilidade em celular, verificação da publicação GitHub Pages e execução dos testes de Node em ambiente local/CI.

## Sprint 5 — Mesa de Tiragens (10/10/2026)
Publicada em `#/praticas/mesa`, com **Três Perspectivas** e **Mapa de Perspectivas**. Ambas são estruturas didáticas originais, com escolha entre os 22 Maiores e todas as 78 cartas, distribuição sem repetição, interpretação por posição, síntese e até 15 registros no diário local. Ver [SPRINT5_REPORT.md](SPRINT5_REPORT.md).

**Verificação:** primeiro workflow GitHub Actions criado no projeto, executando testes Node. Execução bem-sucedida; validação visual em dispositivos e WCAG plena ainda pendentes. Próxima etapa: priorizar progresso, acessibilidade e opções de backup local no Sprint 6.
