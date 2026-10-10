# ARCANA

**Escola interativa de tarô — Sprint 6 implementado**

O ARCANA será uma plataforma educacional pública, em português brasileiro, para aprender tarô do básico ao avançado por meio de conteúdo aprofundado, exploração visual, jogos pedagógicos e prática interpretativa.

## Decisões aprovadas
- **Baralho de referência:** Rider–Waite–Smith (RWS).
- **Referência interpretativa principal:** Rachel Pollack, *Setenta e oito graus de sabedoria*.
- **Perspectiva complementar:** Nei Naiff, *Curso completo de tarô*, distinguindo os métodos quando divergem.
- **Direção de arte:** Arquivo Vivo — identidade editorial clara, fundo tipo papel, vinho/bordô e cartas em destaque.
- **Público:** do iniciante ao avançado.
- **Experiência:** aulas, atlas de cartas, jogos e simulador de tiragens.
- **Lançamento inicial:** website público sem login, preparado para GitHub Pages.
- **Tecnologia prevista:** HTML, CSS e JavaScript modular (ES Modules).
- **Qualidade:** mobile-first, ajustes de tamanho de fonte, acessibilidade e autonomia do aluno.

## Documentos
- [Plano do produto](docs/MASTER_PLAN.md)
- [Currículo preliminar](docs/CURRICULUM.md)
- [Sistema visual](docs/DESIGN_SYSTEM.md)
- [Arquitetura técnica](docs/ARCHITECTURE.md)
- [Plano de sprints](docs/ROADMAP.md)
- [Registro de decisões](docs/DECISIONS.md)
- [Direitos autorais e recursos visuais](docs/ASSET_POLICY.md)
- [Instruções para o agente implementador](docs/AGENT_HANDOFF.md)
- [Relatório do Sprint 1](docs/SPRINT1_REPORT.md)
- [Relatório do Sprint 2](docs/SPRINT2_REPORT.md)
- [Relatório do Sprint 3](docs/SPRINT3_REPORT.md)
- [Relatório do Sprint 4](docs/SPRINT4_REPORT.md)
- [Relatório do Sprint 5](docs/SPRINT5_REPORT.md)
- [Relatório do Sprint 6](docs/SPRINT6_REPORT.md)
- [Interações e mecânicas educativas](docs/INTERACTIONS.md)
- [Manifesto de imagens](docs/ASSET_MANIFEST.md)

## Status — Sprint 5
**Site público no GitHub Pages:** https://pscfredteixeira.github.io/Arcana/

O ARCANA já possui a identidade visual **Arquivo Vivo**, navegação responsiva, aula aprofundada *A arte de olhar*, Atlas das 78 cartas RWS, jogo *Diamante dos Arcanos* e a Mesa de Tiragens com 3 ou 5 posições e diário de estudo local.

O projeto **não é ainda uma formação completa**. Faltam novos módulos de conteúdo, expansão de jogos, revisões carta a carta, melhoria da acessibilidade e testes de usabilidade em aparelhos reais.

- [Resumo do Sprint 5](docs/SPRINT5_REPORT.md)
- [Relatório do Sprint 4](docs/SPRINT4_REPORT.md)
- [Manifesto de imagens](docs/ASSET_MANIFEST.md)
- [Acompanhar testes automáticos](https://github.com/pscfredteixeira/Arcana/actions)

## Princípio pedagógico
A aprendizagem deve seguir **observar → reconhecer convenções → conectar símbolos → interpretar em contexto → justificar → rever hipóteses**. Interpretações abertas terão feedback fundamentado, não um único gabarito artificial.

## Conteúdo e direitos
Os livros de referência não serão copiados nem distribuídos neste repositório. O material publicado será redigido de forma original, com referências bibliográficas. A licença de cada imagem ou outra mídia deverá ser verificada antes do uso.

---
Planejamento iniciado em 10/10/2026.

## Execução dos testes
Para quem trabalha no código com Node.js 22 ou superior: `npm test`. O site é estático e usa ES Modules; para executar fora do GitHub Pages, sirva o diretório em um servidor HTTP local.

## Novidade do Sprint 2
A primeira aula completa **A arte de olhar** já está integrada ao percurso **Aprender**. Inclui seis capítulos originais, referências a Rachel Pollack e Nei Naiff, laboratório interativo em três etapas e caderno privado no navegador. A aula pode ser aberta em `#/aula/primeiro-olhar`. A plataforma segue em desenvolvimento e outras aulas serão adicionadas por etapa.

## Novidade do Sprint 3
O **Atlas Vivo** agora exibe 78 cartas RWS, filtros por categoria e naipe, busca, fichas individuais, zoom e **Lupa Simbólica**. As seis cartas iniciais têm detalhes específicos; as demais têm um primeiro ponto de observação geral. O texto das 72 cartas acrescidas é introdutório e será aprofundado em etapas editoriais futuras. Ver [Relatório Sprint 3](docs/SPRINT3_REPORT.md).

## Sprint 4 — Primeiro jogo completo
Na área **Práticas**, o [Diamante dos Arcanos](https://pscfredteixeira.github.io/Arcana/#/praticas/diamante) propõe uma jornada em três fases. O estudante monta quatro cartas da configuração de Rachel Pollack (Louco no topo, Mago à esquerda, Sacerdotisa à direita, Mundo na base), investiga os dois eixos e constrói uma interpretação contextual. Inclui feedback fundamentado, tentativas ilimitadas, anotações livres e progresso armazenado no próprio navegador. Não é necessário arrastar cartas.

Próximos passos: validar os detalhes de interface em celulares, executar os testes Node e desenvolver a mesa de tiragens do Sprint 5.

## Sprint 5 — Mesa de Tiragens
A [Mesa de Tiragens](https://pscfredteixeira.github.io/Arcana/#/praticas/mesa), disponível em Práticas, oferece duas disposições pedagógicas originais: **Três Perspectivas** (3 cartas) e **Mapa de Perspectivas** (5 cartas). É possível escolher um baralho de 78 cartas ou apenas os 22 Arcanos Maiores, revelar imagens por toque, registrar hipóteses, escrever uma síntese e guardar até 15 leituras no diário local do navegador. O desenho dos modelos não é atribuído a Rachel Pollack nem a Nei Naiff.

O projeto agora conta com um workflow GitHub Actions para executar `npm test` a cada atualização. O primeiro ciclo desse workflow, incluindo os testes do Sprint 5, terminou com sucesso. Ainda são necessárias inspeção e validação de aparência em iPhone e testes aprofundados de acessibilidade.

## Sprint 6 — Meu Estudo e cópia de segurança
Em [Meu Estudo](https://pscfredteixeira.github.io/Arcana/#/meu-estudo), o estudante acompanha a primeira aula, suas três etapas, o jogo Diamante e a quantidade de tiragens guardadas. A conclusão de aula depende de uma marcação explícita.

O painel acrescenta tamanhos de fonte para leitura, modo de alto contraste, redução manual de animações e **exportação/importação de um backup JSON** dos dados locais. O arquivo é criado pelo navegador e não enviado a um servidor. **Importar substitui os registros locais existentes**; exporte uma cópia antes de restaurar. As anotações podem conter dados pessoais, por isso o backup deve ser guardado em local seguro.

Esses indicadores abrangem apenas as atividades atualmente disponíveis. O ARCANA ainda não tem todo o currículo, login ou sincronização entre aparelhos. Consulte [SPRINT6_REPORT.md](docs/SPRINT6_REPORT.md) para a política de dados, os limites e o checklist de validação no celular.
