# ARCANA — Design System v0.1

## Identidade aprovada: ARQUIVO VIVO
Uma biblioteca viva de imagens e significados: editorial, contemporânea, sofisticada e silenciosa. Cartas históricas têm destaque; a interface é o suporte da leitura, não o espetáculo.

## Paleta de partida
Valores a validar por contraste e protótipos reais, não tratados como especificação final de acessibilidade.

| Token | Valor inicial | Função |
|---|---|---|
| `--paper` | `#F8F3E9` | Fundo dominante |
| `--sand` | `#E3D7C6` | Painéis secundários |
| `--wine` | `#722F2F` | Ações e destaques |
| `--burgundy` | `#4A1E1E` | Ênfase forte |
| `--charcoal` | `#2B2B2B` | Texto principal |
| `--sage` | `#7A7F6B` | Detalhes e marcações discretas |

Cores nunca serão a única pista de estado; verificar contraste WCAG 2.2 AA caso a caso.

## Tipografia
- **Títulos:** Playfair Display (ou serifada similar com licença adequada).
- **Interface e corpo:** Inter (ou sans-serif equivalente com licença adequada).
- Preferir legibilidade de parágrafos longos, bom espaçamento e comprimento de linha moderado.
- Toda aula terá controles reais para aumentar e diminuir texto, com limites seguros e persistência local futura.

## Elementos de interface
- Barra de navegação mobile, com até cinco destinos principais; estados ativos claros.
- Cards de conteúdo com hierarquia tipográfica, sem excesso de sombra.
- Botões primários vinho, secundários discretos e áreas de toque confortáveis.
- Cartas sempre com proporção preservada, zoom e metadados.
- Abas de estudo: Visão geral, Símbolos, Comparar e Praticar.
- Indicadores de progresso claros e não dependentes de cor.

## Motion
Animação funcional, nunca decorativa em excesso: virar cartas, destacar símbolo, revelar comparação, confirmar seleção e mostrar progresso. Preferir CSS e APIs nativas. Respeitar `prefers-reduced-motion`, evitar saltos e impedir que transições prejudiquem a navegação.

## Diretrizes para jogos
Mobile-first; nunca depender apenas de drag-and-drop. Todo exercício de associação terá alternativa por toque; foco visível e suporte a teclado. Texto explicativo deve continuar legível com ampliação.

## Imagens de referência
Os mockups visuais aprovados são **orientações artísticas**, não especificações literais: textos eventualmente ilustrativos ou inexatos das imagens geradas não devem ser copiados sem revisão. O inventário de imagens utilizáveis na plataforma permanece pendente da verificação de direitos.
