# ARCANA — Sprint 6: Meu Estudo, acessibilidade e backup

**Data:** 10 de outubro de 2026  
**Entrega:** painel individual sem login, acompanhamento das atividades disponíveis, preferências visuais e recuperação de dados por arquivo.

## Funcionalidades implementadas

### 1. Meu Estudo
A área `#/meu-estudo` foi adicionada como quinto item da navegação principal. A página *Sobre* permanece disponível pelo rodapé. O painel apresenta:
- **Aula disponível:** uma aula atualmente implementada, *A arte de olhar*, com marcação explícita de conclusão. Não marca como concluída simplesmente ao abrir a página.
- **Laboratório da aula:** etapa atual (zero a três), consultando os dados já gravados na aula.
- **Diamante dos Arcanos:** identifica se o jogo já foi concluído, segundo o estado local.
- **Diário da Mesa:** quantidade de leituras guardadas, validada pelo mesmo schema da Mesa de Tiragens.

**Não** há barra de progresso total da formação: os demais módulos não estão prontos. Os indicadores mostram somente o que está disponível, para não insinuar que um curso de quinze módulos foi concluído.

### 2. Conclusão explícita da primeira aula
No final de *A arte de olhar*, o estudante pode marcar ou desmarcar a aula como concluída. A preferência é guardada na chave `arcana-lesson-completed-v1`. Isso não altera os três exercícios já existentes nem o texto salvo no caderno.

### 3. Preferências de leitura
A nova página reúne controles com botões de tamanho confortável:
- Quatro tamanhos do texto das aulas: Pequena, Padrão, Grande, Muito grande. Reaproveita a chave `arcana-font` do Sprint 2.
- Contraste original ou alto, via atributos de tema e variáveis CSS.
- Movimento conforme o sistema ou movimento reduzido manualmente; respeita também `prefers-reduced-motion`.

**Limite:** as configurações melhoram o contraste e a legibilidade, mas não constituem uma auditoria completa de WCAG 2.2 AA. A escala de fonte tem como alvo os textos de leitura, não todas as legendas e elementos da interface.

### 4. Exportar backup
O estudante pode gerar um arquivo JSON de backup com os registros locais reconhecidos pelo projeto. O arquivo é criado no próprio navegador e pode ser armazenado em seu dispositivo. **Não** é enviado a um serviço remoto.

As chaves atualmente exportadas são:
- `arcana-font`
- `arcana-ui-preferences-v1`
- `arcana-lesson-completed-v1`
- `arcana-firstlook-step`
- `arcana-firstlook-notes`
- `arcana-diamond-v1`
- `arcana-spread-session-v1`
- `arcana-spread-archive-v1`

Os dados são validados e, quando aplicável, normalizados antes da geração do backup. Arquivos com dados inválidos não são exportados silenciosamente.

### 5. Importar backup
Um arquivo exportado em outro navegador/aparelho pode ser selecionado por formulário. O sistema:
1. Lê um arquivo JSON de até 400 KB.
2. Verifica identificador, versão, campos reconhecidos e limites de tamanho.
3. Confere integridade de progresso, jogo e tiragens por módulos de validação.
4. Apresenta **confirmação explícita** de que os registros locais serão substituídos.
5. Aplica a restauração, com tentativa de desfazer a operação se ocorrer erro de gravação.
6. Recarrega o site após restaurar, para que os módulos dos jogos leiam o novo estado.

Importação não mistura automaticamente registros de dois aparelhos. Ela **substitui** as chaves reconhecidas: fazer um backup do navegador atual antes é recomendado. O arquivo pode conter anotações pessoais em texto puro e deve ser guardado com cuidado.

### 6. Ajustes de acessibilidade
- O foco do teclado passa ao conteúdo principal após a navegação por rotas.
- O diálogo de ampliação do Atlas mantém o foco em seu botão de fechamento ao pressionar Tab, e permite sair com Escape.
- A rolagem guiada respeita preferência manual por movimento reduzido.
- Os novos controles têm rótulos visíveis, estados `aria-pressed`, `role=status` e áreas de toque adequadas.
- A navegação inferior continua com cinco destinos para preservar a legibilidade no celular.

## Arquitetura
Arquivos novos:
- `src/study/studyData.js` — schemas, progresso, backup e restauração.
- `src/study/studyUI.js` — tela, eventos e controles de preferências.
- `styles/study.css` — layout responsivo e modos de acessibilidade.
- `tests/sprint6.test.mjs` — cobertura de backup, privacidade, estados, navegação, preferências e falha de gravação.
- `docs/SPRINT6_REPORT.md` — este relatório.

Arquivos atualizados:
- `src/app/main.js`
- `src/ui/templates.js`
- `src/ui/fullLesson.js`
- `index.html`
- `tests/site.test.mjs`
- `docs/ROADMAP.md`
- `README.md`

## Verificações e limites
- O repositório executa testes de Node.js 22 automaticamente no GitHub Actions, sem dependências adicionais.
- Foram adicionados testes para criação e restauração de backup, permissões de chaves, preferências, marcação da aula, rejeição de arquivos inválidos e interrupções de armazenamento.
- A validação manual no Safari/iPhone ainda está pendente. Não declarar conformidade WCAG 2.2 AA ou funcionamento perfeito do download no iOS sem essa verificação.
- O backup não equivale a sincronização; não existe conta de estudante, nuvem, criptografia nem versão no servidor.
- Progresso de outros módulos só será mostrado quando os conteúdos estiverem efetivamente disponíveis.
- A importação de dados de uma versão futura poderá exigir migração; a versão atual é `1`.
- Mudanças nos arquivos não incluem cópias dos livros de Rachel Pollack ou Nei Naiff.

## Checklist de aceitação no celular
- Abrir `#/meu-estudo` e verificar os quatro números de progresso.
- Ir à aula e marcar conclusão; voltar ao painel e observar `1/1`; desmarcar e verificar reversão.
- Ajustar fonte para Muito grande, ativar alto contraste e reduzir movimentos; navegar e confirmar persistência.
- Gerar o backup, confirmar que o dispositivo o recebeu e salvar em pasta segura.
- Restaurar um backup **somente depois de criar uma cópia do estado atual**; confirmar a substituição e verificar aula, jogo e diário.
- Conferir que as páginas de Atlas, jogo Diamante e Mesa continuam funcionando.

## Próximo sprint
**Sprint 7 — Expansão e revisão editorial:** priorizar mais aulas completas, ampliar os estudos de cada carta do Atlas, revisar imagens e relações entre conteúdos, testar acessibilidade com aparelhos reais e consolidar a formação sem sacrificar a modularidade.
