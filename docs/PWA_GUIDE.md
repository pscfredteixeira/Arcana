# ARCANA no iPhone — instalação como aplicativo

O ARCANA é um aplicativo web instalável (PWA). Não é um aplicativo nativo publicado na App Store.

## Instalar usando o Safari
1. Abra https://pscfredteixeira.github.io/Arcana/ no Safari do iPhone.
2. Toque no botão de **Compartilhar** (ou no menu da página, conforme a versão do Safari).
3. Escolha **Adicionar à Tela de Início**.
4. Caso o iOS ofereça a opção **Abrir como App da Web**, deixe-a ativada.
5. Confirme em **Adicionar**. O ícone vinho e dourado do ARCANA aparecerá na tela inicial.

O site apresenta um convite próprio na primeira visita pelo Safari. Ele é explicativo: sites não têm permissão para abrir automaticamente o diálogo de instalação do iOS. Se o convite tiver sido dispensado, o rodapé mantém o link **Instalar ARCANA no celular**.

## Android
Em navegadores compatíveis, use **Instalar aplicativo** no menu. O manifesto inclui ícones PNG de 192×192 e 512×512 e modo standalone.

## Offline
O ARCANA usa service worker e cache para disponibilizar o núcleo do site após uma visita com conexão. **Não é um aplicativo totalmente offline:** imagens do baralho, fonts remotas e qualquer recurso não armazenado previamente podem depender de internet. O cache não substitui a rede nem garante acesso a todos os conteúdos.

## Anotações e progresso
O progresso continua sendo guardado localmente. A instalação pode gerar um espaço de armazenamento separado do Safari. Se você já tem tiragens, cadernos ou progresso em outro navegador, abra **Meu Estudo → Exportar meu estudo** e guarde o arquivo JSON antes de instalar. Depois, se a versão instalada não mostrar esses registros, use **Meu Estudo → Importar um backup**. A importação substitui os registros ARCANA atuais da instalação; faça cópia antes.

## Imagem oficial
A arte aprovada do ARCANA foi convertida para:
- `icons/icon-180.png` — ícone do iPhone/iPad;
- `icons/icon-192.png` — ícone para PWA;
- `icons/icon-512.png` — ícone maior e instaladores compatíveis.

O arquivo `icons/icon-source.jpg` conserva uma versão compacta **sem moldura clara** do símbolo aprovado, com o fundo vinho até as bordas. A automação `.github/workflows/build-icons.yml` cria as versões PNG automaticamente quando a fonte é alterada. O ícone mantém o desenho celestial em vinho e dourado, sem letras ou subtítulo.

## Validação
- Manifesto e metadados verificados por testes automatizados.
- Geração dos três PNGs no GitHub Actions: concluída com sucesso.
- Testes de integridade de tamanhos e presença dos assets: configurados em `tests/pwa.test.mjs`.
- Verificação visual e processo manual de instalação no iPhone: ainda devem ser testados em aparelho real.

## Ajuste de compartilhamento e atualização do ícone
O iOS deve usar `apple-touch-icon.png` (180×180) na raiz, além dos ícones do manifesto, e a prévia de compartilhamento passa a ter `og:image` próprio apontando para o ícone de 512×512. Links versionados com `?v=5` ajudam a evitar reutilização de imagens antigas. Os ícones também passam a incluir `icons/icon-32.png` para favicon.
