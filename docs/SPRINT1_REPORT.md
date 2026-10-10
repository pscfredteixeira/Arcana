# ARCANA — Sprint 1: Primeira versão visual navegável

**Data:** 10/10/2026  
**Status:** arquivos de implementação entregues; verificação de navegador e publicação pública pendentes.

## O que foi implementado
- Página inicial editorial na linguagem Arquivo Vivo (papiro, vinho, serifada Playfair Display e interface Inter).
- Cabeçalho responsivo e navegação por cinco áreas; em celulares a navegação passa para uma barra inferior.
- Página de apresentação do percurso formativo, com distinção entre aula disponível e módulos futuros.
- Aula introdutória demonstrativa *O primeiro olhar*, com texto original e controles de tamanho da fonte armazenados no navegador.
- Atlas inicial com seis Arcanos Maiores do RWS, busca por nome/tema e ficha individual de carta.
- Fichas com questões de observação, autoria das imagens e links para a página original do Wikimedia Commons.
- Páginas informativas de Práticas (em preparação) e Sobre.
- Estrutura modular: HTML de entrada, folhas de estilo por responsabilidade, JavaScript separado em dados, templates e roteamento.
- Rotas por hash (`#/...`) e caminhos relativos para funcionamento em subdiretório do GitHub Pages.
- Alternativa visual em caso de falha no carregamento de alguma imagem externa.
- Testes automatizados estáticos usando Node.js e `node --test`.

## Arquivos
```text
index.html
package.json
styles/tokens.css
styles/base.css
styles/components.css
src/app/main.js
src/ui/templates.js
src/data/cards.js
tests/site.test.mjs
docs/ASSET_MANIFEST.md
docs/SPRINT1_REPORT.md
```

## Limites e pendências
- **GitHub Pages não foi habilitado por esta implementação.** É necessário confirmar a configuração *Settings → Pages*; o código já está na branch `main`, na raiz.
- **Não houve teste manual em navegadores reais/dispositivos reais**, nem validação completa de acessibilidade WCAG 2.2 AA.
- Imagens vêm do Wikimedia Commons por URLs externas, então dependem de conexão e disponibilidade do servidor. O sistema exibe um fallback textual se a imagem não carregar.
- O Atlas tem apenas **seis** cartas nesta etapa.
- A aula é demonstrativa; conteúdo completo, avaliações e referências por seção serão preparados no Sprint 2.
- Não existem jogos, simulador de tiragem, login, backend ou progresso de curso.
- Testes `node --test` inspecionam estrutura e funções, mas não substituem teste de renderização do navegador.
- Os mockups anteriores são referências de direção visual, não arquivos de interface reproduzidos pixel a pixel.

## Como testar localmente
`npm test` (Node.js 18+) executa testes estáticos. Para abrir o site, usar um servidor HTTP estático na raiz; `index.html` usa ES Modules e pode não funcionar se aberto diretamente como arquivo (`file://`).

## Próxima etapa
1. Habilitar e conferir o GitHub Pages.
2. Inspecionar a versão publicada no celular e desktop.
3. Corrigir eventuais problemas de fonte, imagens ou disposição responsiva.
4. Validar aparência com o proprietário antes de seguir para o Sprint 2.
