# ARCANA — Relatório do Sprint 5

**Data:** 10 de outubro de 2026  
**Tema:** Mesa de Tiragens didática (ARCANA)  
**Status:** implementação entregue no repositório, testes automatizados em GitHub Actions aprovados; avaliação visual em iPhone ainda a realizar.

## O que foi desenvolvido

A área **Práticas** agora oferece acesso à **Mesa de Tiragens** em `#/praticas/mesa`, sem desativar o Diamante dos Arcanos.

### Duas disposições didáticas
1. **Três Perspectivas (3 cartas):** Contexto → Tensão → Possibilidade.
2. **Mapa de Perspectivas (5 cartas):** Questão → Contraste → Recurso → Alternativa → Síntese.

**Atenção ao método:** esses nomes e essas estruturas são **adaptações pedagógicas originais** do ARCANA. Não são apresentadas como a Cruz Celta nem como tiragens tradicionais específicas de Rachel Pollack ou Nei Naiff. O estudo das imagens utiliza o Rider–Waite–Smith e nossa progressão didática de observação, hipótese e contextualização.

### Percurso do estudante
- Escolher entre os dois modelos e entre o baralho inteiro de **78 cartas** ou os **22 Arcanos Maiores**.
- Formular uma pergunta aberta opcional (limite de 500 caracteres).
- Preparar uma disposição sem repetição de carta; as cartas começam viradas para baixo.
- Revelar por toque ou botão, uma a uma, sem usar arrastar e soltar.
- Selecionar uma posição para ler sua função, descrição visual da carta, hipótese interpretativa e sugestão de estudo.
- Escrever anotações próprias por posição, com gravação automática em armazenamento local.
- Depois de revelar todas as cartas, abrir o caderno de síntese com os registros, as imagens e uma rubrica para revisar a interpretação.
- Guardar a leitura num **diário privado no navegador** (até 15 registros), consultável em acordeões.
- Excluir um registro mediante confirmação ou iniciar outra tiragem mediante confirmação. Registros guardados sobrevivem à reinicialização da sessão.

### Regras e segurança
- A seleção de cartas não tem posição invertida neste sprint; todas são lidas na orientação padrão. Isso não é uma afirmação de que inversões nunca devam ser usadas em outras tradições.
- A distribuição é feita por embaralhamento Fisher–Yates, sem substituição. Utiliza `crypto.getRandomValues` quando disponível e fallback padrão do navegador.
- Nenhuma resposta subjetiva recebe pontuação automática. O propósito é construir uma interpretação justificada, não prever um acontecimento.
- As perguntas, anotações e leituras ficam em `localStorage`, sem upload a servidor. Limpar dados do navegador pode apagá-las; não existe login ou sincronização entre aparelhos.
- Os campos de usuário são escapados antes de ser exibidos no HTML. O estado persistido passa por validação de formato e identificação das cartas.
- O sistema exige revelar todas as cartas antes de permitir a síntese final.
- A interface preserva a linguagem **ARCANA**: papel/papiro, vinho/bordô, serifadas, contraste entre papel de estudo e mesa escura, botões adequados ao toque e texto legível.

## Arquitetura
Arquivos novos:
- `src/data/spreadDefinitions.js` — dados de posições, objetivos e instruções.
- `src/spreads/spreadLogic.js` — normalização, sorteio sem reposição, etapas e histórico.
- `src/spreads/spreadUI.js` — interface, renderização, eventos e diário.
- `styles/spreads.css` — estilos responsivos exclusivos da mesa.
- `tests/sprint5.test.mjs` — testes de mecânica, integridade de dados e jornada.
- `.github/workflows/test.yml` — CI com Node.js 22, `npm test`.
- `docs/SPRINT5_REPORT.md` — este relatório.

Arquivos atualizados: `index.html`, `src/app/main.js`, `src/games/diamondGame.js`, `src/ui/templates.js`, `tests/site.test.mjs` e documentos de acompanhamento.

## Testes
- Testes reais do GitHub Actions: **sucesso** no workflow `Verificar ARCANA` após integrar o código.
- Suite dos sprints anteriores executada novamente no mesmo fluxo, incluindo correção de uma antiga asserção que esperava apenas seis cartas no Atlas.
- Verificações adicionais de sintaxe, modelos de sessão, sorteio de três e cinco cartas, registro, recuperação e reinício.
- **Pendente:** inspeção visual, acessibilidade completa, carregamento de imagens e usabilidade em um aparelho real. Aprovação automatizada não equivale a certificação WCAG.

## Limites
- Não implementa Cruz Celta de dez cartas; uma versão histórica exigirá documentação das posições e referência à tradição adotada.
- Não existem cartas invertidas, geração de interpretação por IA, armazenamento remoto, conta de estudante, exportação ou sincronização.
- O diário mantém até 15 leituras; novos registros substituem os mais antigos quando o limite é alcançado.
- Dados sensíveis não devem ser escritos no caderno; o armazenamento é local, mas não criptografado.
- Textos das 72 cartas adicionadas ao Atlas no Sprint 3 são introdutórios e ainda precisam de aprofundamento editorial.
- As imagens históricas ainda são carregadas do Wikimedia Commons; a disponibilidade externa pode afetar sua exibição.

## Critérios para revisão do usuário
Abrir `#/praticas/mesa` no iPhone; escolher três cartas; escrever uma pergunta; revelar e registrar; concluir e guardar no diário; abrir o registro; criar outra tiragem de cinco cartas; testar botões e áreas de texto em tela pequena. Depois revisar legibilidade, disposição das cartas e eventuais problemas de funcionamento.

**Sprint 6 planejado:** aperfeiçoar acessibilidade, progresso de estudo, configurações de leitura e backup/recuperação locais; a priorização será decidida após feedback sobre a Mesa.
