# ARCANA — Manifesto de imagens (Sprint 1)

**Artista da iconografia original:** Pamela Colman Smith, Rider–Waite–Smith (1910).  
**Hospedagem nesta prévia:** imagens remotas da Wikimedia Commons, com URLs de arquivo e links de procedência.  
**Nota:** a página de cada arquivo declara o status de domínio público para a obra histórica, conforme indicação do Wikimedia Commons. Não extrapolar essa condição para baralhos modernos ou recoloridos por terceiros.

| Carta | Arquivo Wikimedia Commons | Página de atribuição |
|---|---|---|
| O Louco (0) | `RWS Tarot 00 Fool.jpg` | https://commons.wikimedia.org/wiki/File:RWS_Tarot_00_Fool.jpg |
| O Mago (I) | `RWS Tarot 01 Magician.jpg` | https://commons.wikimedia.org/wiki/File:RWS_Tarot_01_Magician.jpg |
| A Sacerdotisa (II) | `RWS Tarot 02 High Priestess.jpg` | https://commons.wikimedia.org/wiki/File:RWS_Tarot_02_High_Priestess.jpg |
| A Imperatriz (III) | `RWS Tarot 03 Empress.jpg` | https://commons.wikimedia.org/wiki/File:RWS_Tarot_03_Empress.jpg |
| O Imperador (IV) | `RWS Tarot 04 Emperor.jpg` | https://commons.wikimedia.org/wiki/File:RWS_Tarot_04_Emperor.jpg |
| O Hierofante (V) | `RWS Tarot 05 Hierophant.jpg` | https://commons.wikimedia.org/wiki/File:RWS_Tarot_05_Hierophant.jpg |

## Política de expansão
Não adicionar outras cartas ou imagens sem registrar procedência e verificar indicação de licença e requisitos de uso. Evitar capturas de páginas dos livros anexados, edições contemporâneas e versões ilustrativas geradas sem conferência.

## Outros recursos
- **Playfair Display** e **Inter** via Google Fonts; verificar disponibilidade e condições de licença no ambiente final.
- Nenhum arquivo de fonte foi distribuído junto ao projeto.

## Sprint 3 — extensão do acervo
A coleção exibida foi ampliada de seis para 78 cartas históricas de Pamela Colman Smith. A tabela completa de nomes de arquivo está declarada em `src/data/atlasCatalogue.js`, complementando as seis primeiras cartas listadas acima. Para arcanos maiores, o padrão é `RWS Tarot NN Nome.jpg`; para menores, `WandsNN.jpg`, `CupsNN.jpg`, `SwordsNN.jpg`, `PentsNN.jpg`, inclusive as figuras de 11 a 14. A amostragem de arquivos foi consultada no Wikimedia Commons, incluindo Os Enamorados, Ás de Paus, Ás de Copas e Rei de Ouros. Os links de cada carta apontam ao arquivo individual. **Conferência visual exaustiva dos 78 arquivos ainda pendente**; o código inclui fallback textual.

Índice original: https://commons.wikimedia.org/wiki/Category:Rider-Waite-Smith_tarot_deck_(TaionWC)
