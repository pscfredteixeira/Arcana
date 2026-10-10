# ARCANA — Sprint 3: Atlas Vivo

**Data:** 10 de outubro de 2026.

## Entrega
- Catálogo de **78 cartas Rider–Waite–Smith**: 22 Arcanos Maiores e 56 Arcanos Menores.
- Filtros: Todos, Maiores, Paus, Copas, Espadas e Ouros.
- Busca por nome e conceitos, normalizada para acentos.
- Ficha individual para todas as cartas, com descrição da cena, introdução interpretativa original e pergunta aberta.
- **Lupa Simbólica**: áreas numeradas tocáveis e por teclado sobre a carta; explicações dos detalhes. Seis cartas iniciais têm áreas específicas; outras 72 contam inicialmente com um ponto geral de observação.
- Ampliação de imagem em diálogo/modal, botão Fechar e tecla Escape.
- Sugestões de cartas do mesmo conjunto para comparação.
- Estilos mobile-first sem mudar a direção ARCANA.

## Fontes visuais
Iconografia de Pamela Colman Smith, Rider–Waite–Smith (1910), a partir de páginas do Wikimedia Commons. Nomenclatura dos arquivos segue a coleção **Rider-Waite-Smith tarot deck (TaionWC)** e páginas individuais. As páginas de O Louco, Os Enamorados, Ás de Paus, Ás de Copas e Rei de Ouros foram conferidas como amostra; **a verificação individual dos 78 arquivos no navegador permanece pendente**, com alternativa textual quando a imagem não carregar.

Não confundir obras históricas em domínio público com releituras/recolorações modernas, que podem ter direitos independentes.

## Maturidade editorial
As primeiras seis cartas preservam descrições e perguntas anteriores. As outras 72 receberam **descrições introdutórias originais**, hipóteses de leitura e perguntas, destinadas à exploração inicial. Não representam ainda estudos aprofundados e referenciados carta a carta por Pollack e Naiff; isso está previsto para expansão editorial futura. Diferenças entre métodos permanecem identificadas no currículo.

## Testes e limites
- Catálogo gerado com 78 entradas, IDs e slugs únicos.
- Verificações de sintaxe JS e renderização HTML do Atlas, filtros e fichas concluídas sem erro.
- Testes automatizados declarados em `tests/sprint3.test.mjs` (`npm test`).
- A validação visual em navegadores móveis e de todos os links externos não foi concluída no momento do commit. Lupa e zoom devem ser testados em aparelhos reais.
- O modal oferece fechar via botão e Escape; auditoria completa de gerenciamento de foco, leitores de tela e WCAG 2.2 AA continua pendente.
- As imagens são buscadas do Commons em tempo de uso, com fallback. Para um produto estável, avaliar cópias locais com licença auditada e dimensionamento responsivo.

## Próximo passo
Abrir o site no celular, testar filtro, busca, imagens, lupa e zoom, registrar erros e corrigir. Depois refinar os pontos simbólicos em mais cartas e avançar para jogos de aprendizagem mais complexos.
