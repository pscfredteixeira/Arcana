# ARCANA — Avaliação formativa de aprendizagem

## Finalidade

A nova avaliação inicial verifica se a pessoa consegue **reconhecer a estrutura do tarô, observar uma carta sem confundir imagem e previsão, explicar o significado com base na cena e transferir o raciocínio para uma situação cotidiana**. Além das quatro perguntas objetivas, a pessoa escreve uma interpretação de uma carta diferente e confere a resposta mediante uma rubrica simples. Não é uma prova de adivinhação, diagnóstico pessoal ou certificação.

## Fluxo e critérios

1. **Reconhecer o baralho:** distinguir 22 Maiores e 56 Menores.
2. **Observar a imagem:** descrever o Cinco de Copas sem adivinhar fatos.
3. **Explicar um significado:** justificar a colaboração no Três de Ouros a partir das pessoas que aparecem na cena.
4. **Aplicar a uma situação:** relacionar o Sete de Ouros à avaliação dos resultados de um estudo.
5. **Escrever com suas palavras:** usar o Seis de Espadas numa situação inédita. O aluno descreve o desenho, liga um detalhe a um significado e propõe uma pergunta sem garantir acontecimentos futuros.

O resultado objetivo registra três tipos de evidência:
- **Sem ajuda:** acerto na primeira tentativa, sem abrir dica.
- **Com ajuda:** acerto usando dica ou após um erro.
- **Precisa revisar:** dois erros antes do acerto ou três tentativas sem conseguir acertar (se uma atividade tiver alternativas suficientes).

Os itens objetivos admitem até três escolhas **diferentes**. A interface explica o erro; o estudante pode tentar outra opção, e a passagem fica bloqueada até a questão ser resolvida. O sistema nunca oferece um falso certificado de domínio.

A interpretação escrita tem **um exemplo resolvido após o aluno escrever pelo menos 45 caracteres**, seguido de três critérios de autoavaliação: observação, relação desenho-significado e pergunta responsável. O ARCANA registra os critérios marcados, mas **não atribui nota automática à resposta livre**. O texto pode ser diferente do exemplo.

## Feedback e retomada

Ao concluir, o aluno vê as quatro habilidades individualizadas, o grau de apoio necessário e links diretos para aulas ou fichas do Atlas relacionadas à necessidade de revisão. Pode voltar após algum tempo, consultar as fontes e refazer a avaliação. Ao pedir para refazer, recebe uma confirmação de que a tentativa anterior será substituída.

## Armazenamento e privacidade

Rota: `#/avaliacao`, acessível em **Aprender**, **Práticas** e **Meu estudo**.

A tentativa é salva em `localStorage`, sob `arcana-learning-assessment-v1`. Inclui escolhas, uso de dicas, resposta escrita, critérios marcados e conclusão. Esse dado foi integrado à lista de chaves permitidas no backup original do ARCANA. Backups anteriores continuam compatíveis e nada é enviado a um servidor. O cache PWA foi atualizado para a versão 8, incluindo os novos módulos, estilos e a interface da avaliação.

## Arquivos

- `src/assessment/assessmentData.js`: questões, explicações, alternativas e critérios.
- `src/assessment/assessmentLogic.js`: estado, validação, evolução, resultado e persistência.
- `src/assessment/assessmentUI.js`: interface e eventos da avaliação.
- `styles/assessment.css`: identidade editorial responsiva.
- `tests/assessment.test.mjs`, `tests/assessmentFlow.test.mjs`: fluxos, classificação, backup, integração e experiência com interação simulada.
- `src/study/studyData.js`, `src/study/studyUI.js`, `src/app/main.js`, `src/ui/templates.js`, `src/games/diamondGame.js`, `index.html` e `sw.js`: integrações.

## Próximas possibilidades

Esta versão avalia **entendimento inicial**. Um curso completo poderá adotar bancos de questões equivalentes por tema, exercícios com cartas escolhidas aleatoriamente e avaliações de revisão após dias de estudo. Para saber se o ensino realmente funciona, ainda é necessário observar estudantes iniciantes e pedir que expliquem os desenhos com suas palavras. Simulações e testes automáticos validam a implementação, mas **não provam aprendizagem humana**.

**Referências pedagógicas do conteúdo:** Rider–Waite–Smith como baralho principal; Rachel Pollack, *Setenta e oito graus de sabedoria*, e Nei Naiff, *Curso completo de tarô*, como bases complementares de estudo. As situações, rubricas e alternativas são textos autorais do ARCANA; não se atribuem citações ou regras de pontuação aos autores.
