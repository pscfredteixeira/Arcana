# Sprint 9 — Jornada dos 22 Arcanos Maiores

**Projeto:** ARCANA — Escola Interativa de Tarô  
**Data:** 12 de outubro de 2026

## Objetivo
Transformar os Arcanos Maiores de um conjunto de fichas de consulta em um percurso de aprendizagem. O estudante deve aprender a **observar, compreender e aplicar** o significado de cada carta com uma experiência mobile-first, sem precisar conhecer tarô previamente.

## Organização didática
A sequência foi organizada em **quatro partes**:
- **0 — O começo de uma jornada:** O Louco.
- **I–VII — Aprender a agir e escolher:** Mago, Sacerdotisa, Imperatriz, Imperador, Hierofante, Enamorados e Carro.
- **VIII–XIV — Compreender os próprios limites:** Força, Eremita, Roda da Fortuna, Justiça, Enforcado, Morte e Temperança.
- **XV–XXI — Questionar, reconstruir e integrar:** Diabo, Torre, Estrela, Lua, Sol, Julgamento e Mundo.

A organização **0 + 7 + 7 + 7** dialoga com o estudo sequencial dos Maiores de Rachel Pollack, mas **não é uma afirmação de que a vida humana segue etapas necessárias**. O baralho principal da escola é Rider–Waite–Smith: **A Força VIII, A Justiça XI**. Nei Naiff é apresentado como perspectiva complementar, com seu próprio método de seis caminhos.

## Uma parada por carta
Cada uma das 22 paradas tem:
1. **Olhe a imagem:** instrução para reconhecer detalhes observáveis no desenho.
2. **Entenda o significado:** explicação simples, seguida de justificativa visual e exemplo cotidiano.
3. **Pratique:** uma situação nova e três alternativas; o feedback relaciona significado e cenário, sem promessas de adivinhação.
4. **Compare:** ao concluir, uma diferença ou relação com uma carta vizinha ajuda a construir a sequência.
5. **Anote (opcional):** campo curto para o aluno registrar com suas palavras o que aprendeu.

O mapa permite visitar qualquer carta sem bloquear os capítulos futuros. Para registrar uma carta como estudada, é preciso avançar pelas etapas e responder corretamente ao exercício. Isso é **progresso de atividade**, não certificado de domínio da interpretação.

## Interface
As telas usam a identidade editorial vinho e creme do ARCANA, preservando as imagens do Atlas. Os capítulos mostram quantas cartas foram concluídas. A tela individual usa uma imagem grande no desktop e uma imagem compacta com leitura confortável no celular. Não há tarefas que dependam de arrastar objetos.

**Links internos:**
- `#/jornada`: visão geral das 22 cartas.
- `#/jornada/o-louco`: primeiro capítulo / primeira carta.
- `#/jornada/<slug>`: cada parada.
- A área `#/aprender` e `#/meu-estudo` têm acesso à nova jornada.

## Progresso e dados
Chave: `arcana-major-journey-v1`. Armazena carta visitada, etapa atual, escolhas respondidas, cartas concluídas e anotações curtas. A normalização rejeita cartas inexistentes, notas acima do limite e falsificações simples de conclusão sem resposta correta. O backup do ARCANA inclui a nova chave; backups antigos continuam compatíveis. O armazenamento continua **local ao navegador**, sem login ou sincronização.

PWA: cache atualizado para `arcana-app-shell-v9`, contendo dados, lógica, interface e CSS do Sprint 9.

## Arquivos criados
- `src/journey/majorJourneyData.js` — capítulos, 22 questões, descrições e feedback.
- `src/journey/majorJourneyLogic.js` — progresso local, respostas, validação e salvamento.
- `src/journey/majorJourneyUI.js` — mapa, estações e três etapas por carta.
- `styles/majorJourney.css` — responsividade e estética.
- `tests/majorJourney.test.mjs` — cobertura das 22 cartas e integração de backup/PWA.
- `tests/majorJourneyFlow.test.mjs` — simulação de um percurso real de aprendizagem.

## Pontos de atenção
As atividades propõem **uma pergunta objetiva por carta**; isso ensina a relação entre cena e significado, mas não basta para provar domínio interpretativo. Em outro sprint, podemos ampliar a transferência para pares de cartas, situações contrastantes e revisões posteriores. Não há evidência de teste pedagógico em pessoas reais nem confirmação de auditoria manual de acessibilidade no iPhone; ambos são trabalhos pendentes.

**Fontes de orientação:** Rachel Pollack, *Setenta e oito graus de sabedoria*, capítulos dos Maiores, especialmente a leitura sequencial e as relações entre cartas; Nei Naiff, *Curso completo de tarô*, lições sobre os seis caminhos, para contraste. Todos os exercícios e explicações são textos originais do ARCANA, não citações dos autores.
