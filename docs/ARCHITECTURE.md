# ARCANA — Arquitetura técnica proposta

**Status:** especificação preliminar; não programar a plataforma antes da aprovação dos protótipos e contratos de dados.

## Diretrizes
Site estático, modular e distribuível no GitHub Pages. Usar HTML/CSS/JavaScript nativos e ES Modules antes de considerar frameworks. Evitar um único HTML enorme.

## Estrutura de destino (não implementada)
```text
/
├── index.html
├── assets/
│   ├── cards/
│   ├── images/
│   └── fonts/
├── styles/
│   ├── tokens.css
│   ├── base.css
│   └── components.css
├── src/
│   ├── app/
│   ├── ui/
│   ├── atlas/
│   ├── activities/
│   ├── spreads/
│   └── storage/
├── content/
│   ├── curriculum.json
│   ├── lessons/
│   └── cards/
├── docs/
└── tests/
```

## Contratos previstos
- Carta: identificador estável, número na tradição RWS, nome PT-BR, naipe ou Maior, referência visual, símbolos, textos originais e proveniência.
- Aula: ID, módulo, objetivos, pré-requisitos, blocos, atividades vinculadas, fontes e estágio de revisão.
- Atividade: ID, mecânica, dados de entrada, feedback explicativo, estado, validações e recuperação após interrupções.
- Progresso: versão de schema, aulas concluídas, avaliações, preferências de leitura, revisões pendentes, data de atualização.

## Navegação e caminhos
Todos os arquivos, imports e assets devem funcionar também quando o repositório estiver sob um subcaminho `/Arcana/` no GitHub Pages; evitar URLs absolutas apontando para a raiz do domínio. Não presumir ambiente com backend.

## Dados e privacidade
Na primeira versão, usar armazenamento local somente quando necessário, com exportação/importação posterior. Não coletar identificadores ou dados sensíveis. Nenhum modelo pago necessário para corrigir atividades factuais.

## Cuidados
Uma interpretação subjetiva não pode receber automaticamente um selo absoluto de 'correto'. As respostas interpretativas terão feedback por critérios explícitos; a revisão das fontes é responsabilidade editorial, separada do motor de jogo.

## Manutenção
Documentos por responsabilidade, IDs estáveis, alterações pequenas, testes a cada sprint, versionamento de dados e um registro de decisões. O agente de implementação recebe somente os documentos necessários à tarefa.
