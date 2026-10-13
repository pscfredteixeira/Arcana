# Sprint 11 — Três Cartas, Uma História

**Projeto:** ARCANA — Escola Interativa de Tarô  
**Data:** 13 de outubro de 2026

## Objetivo

Ensinar o estudante a relacionar **três imagens Rider–Waite–Smith** sem decorar combinações, confundir símbolos com evidências factuais ou acreditar que só há uma interpretação possível.

A atividade vem depois da Jornada dos 22 Arcanos Maiores e da oficina Cartas em Diálogo, mas fica aberta para o estudante que ainda não concluiu os recursos anteriores.

## Quatro situações

1. **Começar um projeto:** O Louco + O Mago + A Sacerdotisa — entusiasmo, recursos e pesquisa.
2. **Cuidar e organizar em grupo:** A Imperatriz + O Imperador + Os Enamorados — cuidado, estrutura e escolhas.
3. **Responder a uma mudança externa:** A Roda da Fortuna + A Justiça + A Temperança — o que muda, critérios e ajustes.
4. **Reconstruir depois de uma ruptura:** A Torre + A Lua + A Estrela — dificuldades, informações ainda incertas e cuidado possível.

As cartas aparecem com **funções de estudo específicas para cada situação**, e não como posições universais de tiragem ou uma sequência de destino.

## Percurso de cada história

**Primeiro: observar três imagens.** O aluno vê as três cartas lado a lado no desktop e em cartões com texto legível no celular. Cada cartão responde a duas perguntas: “O que aparece no desenho?” e “O que isso pode significar?”.

**Depois: reconhecer interpretações possíveis.** São exibidas três alternativas; **duas** são leituras compatíveis com as imagens e com o caso, e a terceira inventa fatos ou simplifica indevidamente o sentido. O aluno deve selecionar duas respostas. Recebe feedback individual das escolhas e pode corrigir, com dica opcional. Isso treina o reconhecimento da **pluralidade responsável** de interpretações.

**Por fim: justificar por escrito.** O aluno escreve pelo menos 80 caracteres antes de receber um exemplo resolvido. A explicação é comparada com três critérios explícitos:

- Mencionei algum detalhe visível da imagem.
- Considerei as três cartas na situação.
- Fiz uma pergunta ou propus uma ação possível, sem prever acontecimentos.

A conclusão registra **autoavaliação**, não nota automática: não há detecção artificial de “resposta certa” baseada em palavras-chave. Um exemplo alternativo é apresentado ao final para mostrar que a ordem e o foco de uma interpretação podem variar.

## Progresso e privacidade

A oficina tem quatro histórias independentes e pode ser feita na ordem desejada. O resultado de cada uma diferencia acertos diretos sem dica de acertos que precisaram de apoio. Textos, alternativas, uso de pistas e autoavaliações ficam no `localStorage` com chave `arcana-three-cards-v1`.

Foi adicionada a chave à lista de exportação e restauração de **Meu estudo**, preservando a compatibilidade de backups anteriores. Não foi adicionada conta, banco de dados, servidor nem coleta de textos pessoais.

Versão do cache para iPhone/PWA: `arcana-app-shell-v11`, com todos os novos módulos e CSS para possibilitar atualização/offline após a instalação do novo cache.

## Arquivos e rotas

- `src/trios/trioData.js`: quatro histórias, contexto, observações, múltiplas leituras e exemplos.
- `src/trios/trioLogic.js`: seleção de duas respostas, feedback, redação, autoavaliação, persistência e progresso.
- `src/trios/trioUI.js`: interface, interações, texto livre e relatório.
- `styles/trios.css`: identidade editorial e adaptações para celular.
- `tests/trios.test.mjs`: validações de dados, navegação, escrita, backup e simulação de percurso completo.
- `#/praticas/tres-cartas`: início da oficina.
- `#/praticas/tres-cartas/<id>`: história escolhida.
- Acesso na área **Aprender**, na página **Práticas** e em **Meu estudo**.

## Critério de qualidade e trabalhos futuros

Este sprint é uma progressão didática: de uma carta para duas e de duas para três. Ainda não substitui o ensino integral das 56 cartas menores, o estudo aprofundado das figuras da corte nem a avaliação de compreensão com iniciantes reais. A revisão escrita é feita pela própria pessoa; **não afirmamos corrigir interpretação livre com IA nem certificar aprendizado**.

Próximas melhorias possíveis: revisão espaçada dos Maiores, pares com Arcanos Menores, exercícios de escrita com perguntas diferentes e uma leitura que contraste interpretações por autor.

**Referências gerais:** Baralho Rider–Waite–Smith, ilustrado por Pamela Colman Smith; Rachel Pollack, *Setenta e oito graus de sabedoria*; Nei Naiff, *Curso completo de tarô*, como segundo eixo comparativo. As situações, as alternativas e os modelos escritos desta oficina são textos editoriais originais do ARCANA, não reproduções das obras.
