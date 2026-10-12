# ARCANA — Segunda revisão pedagógica: do símbolo à explicação

**Data:** 12 de outubro de 2026
**Escopo:** 78 cartas do Atlas e as 18 seções das quatro aulas disponíveis.
**Objetivo:** eliminar a exigência de repertório prévio na camada principal das páginas, preservando o aprofundamento acadêmico opcional.

## O que mudou

1. **78 cartas:** cada ficha apresenta agora uma explicação específica que começa pelo desenho, mostra a ligação com o significado da carta e oferece um exemplo de aplicação, sem anunciar previsões como fatos. São 22 Arcanos Maiores e 56 Menores.
2. **Dupla camada de leitura:** a explicação clara aparece primeiro; os antigos ensaios originais, que discutem interpretações simbólicas com mais densidade, passam a ficar sob o botão **“Quero aprofundar: outra maneira de analisar esta carta”**.
3. **18 capítulos:** os quatro cursos existentes possuem novos textos principais, cada seção com três parágrafos que definem o tema, mostram uma situação cotidiana e esclarecem o limite da interpretação. A versão detalhada anterior continua disponível sob **“Quer se aprofundar nesta parte?”**.
4. **Sequência de ensino:** explicação inicial → observação da cena → por que o desenho sugere aquele significado → exemplo → interpretação alternativa → teoria opcional.
5. **Naipes e números:** simplificadas as explicações gerais de Paus, Copas, Espadas, Ouros, das figuras da corte e dos números de Ás a Dez. A numerologia não determina automaticamente o significado: o desenho da carta continua central.
6. **iPhone/PWA:** a nova versão do service worker inclui todos os arquivos didáticos e muda a chave de cache, de modo que o site instalado atualize o conteúdo sem apagar os registros locais.

## Como devem ser escritos os próximos sprints

Uma explicação para iniciantes **não pode começar** por expressões como “interioridade”, “campo simbólico”, “hipótese contextual”, “polos arquetípicos” ou “potencialidade não fixada”, a menos que o termo seja definido de modo simples antes.

O autor do conteúdo deve responder, nesta ordem:
- **O que significa?** Uma ou duas frases diretas, sem promessas e sem mistério artificial.
- **Por que?** Diga o detalhe visível da carta que sustenta a ligação proposta, ou explique que se trata de uma associação tradicional que não vem diretamente do desenho.
- **Como seria na vida real?** Um exemplo concreto e possível.
- **Que cuidado tomar?** Diferencie a interpretação de uma previsão ou de afirmações sobre terceiros.
- **Quer ir mais fundo?** Só agora introduza Pollack, Naiff, diferenças de métodos e conceitos teóricos específicos.

Nunca atribuir um parágrafo autoral do ARCANA como citação literal a Pollack ou Naiff. Os livros fundamentam o currículo e os métodos; interpretações produzidas para o site devem ser identificadas como textos editoriais. O material não substitui atendimento profissional ou checagem dos fatos.

## Exemplos de progressão

**A Sacerdotisa:** o desenho mostra alguém sentado entre duas colunas → interpretação inicial: parar para escutar, observar e pensar antes de decidir → situação: uma proposta profissional com informações incompletas → aprofundamento opcional: interpretações simbólicas de conhecimento interior em Pollack.

**Cinco de Copas:** a figura observa taças derramadas, mas algumas continuam de pé → interpretação inicial: tristeza diante de uma perda → situação: o encerramento de um projeto → leitura mais profunda: a dor não precisa ser anulada pela presença de alternativas.

**Oito de Ouros:** uma pessoa realiza repetidamente um trabalho manual → interpretação inicial: prática e desenvolvimento de habilidade → situação: melhorar em um instrumento ou aprender tarô por treino e correção → aprofundamento: papel do ofício nas cenas dos Menores.

## Arquivos principais

- `src/data/accessibleMajors.js` — 22 cartas.
- `src/data/accessiblePausCopas.js` — 28 cartas.
- `src/data/accessibleEspadasOuros.js` — 28 cartas.
- `src/data/accessibleCardProse.js` — composição dos 78 textos.
- `src/lessons/accessibleLessonProse.js` — 18 seções, três parágrafos em cada.
- `src/data/cardStudies.js`, `src/ui/cardStudyView.js` — ligação entre texto básico, explicação longa e teoria opcional.
- `src/ui/fullLesson.js`, `src/ui/expandedCourse.js` — renderização das aulas.
- `styles/beginner.css`, `sw.js` — apresentação responsiva e cache da versão atual.
- `tests/pedagogicalDepth.test.mjs` — cobertura automatizada da progressão pedagógica.

## Limites

Esta é uma reescrita editorial ampla da **camada de conteúdo**, não um teste de usabilidade feito com pessoas reais. Ainda seria importante testar com usuários sem experiência: pedir que expliquem uma carta com as próprias palavras, observar se encontram facilmente o significado no iPhone e verificar se compreendem a distinção entre sentido tradicional e afirmação factual. Também resta revisar individualmente as mensagens mais longas dos jogos e as etapas adicionais previstas no currículo.

## Referências

Rachel Pollack, *Setenta e oito graus de sabedoria*, Partes I e II; Nei Naiff, *Curso completo de tarô*, lições dos Arcanos Maiores e Menores, incluindo as quatro correspondências de elementos. As novas explicações são **originais do ARCANA**, orientadas pelo baralho Rider–Waite–Smith, e não traduções ou citações dos livros.
