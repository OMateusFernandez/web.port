# Portfólio — Mateus Fernandez

Site estático em HTML, CSS e JavaScript, sem framework, servidor de aplicação ou banco de dados. O visual existente foi preservado. Há dois VLOG/IRL e três Talking Head (quatro YouTube e um MP4 local), sem Shorts ou Watch Edits no About Me.

## Build e prévia local

Use Node.js 24 LTS (mínimo 22), com npm disponível no terminal. Não há dependências a instalar.

```sh
npm run build
npm test
npm run preview
```

Abra http://127.0.0.1:4174/. Para simular um repositório do GitHub Pages:

```sh
npm run preview -- --port 4175 --base /portfolio-test/
```

Abra http://127.0.0.1:4175/portfolio-test/. Encerre a prévia com Ctrl+C. Refaça a build após editar os arquivos; a prévia serve somente `dist/`, sem fallback para os originais. É um servidor de desenvolvimento local, não precisa ser publicado.

## O que é publicado

`scripts/build.mjs` copia `index.html`, `style.css`, `script.js` e os assets referenciados literalmente nos arquivos, preservando caminhos relativos. Acrescenta `.nojekyll`. Não minifica nem transforma imagens, áudio ou vídeos. Ao adicionar mídias em JavaScript, use strings literais `assets/...` para a descoberta da build.

A saída é exclusivamente `dist/`. Antes de recriá-la, o script valida arquivos, capitalização, âncoras, caminhos, sintaxe JavaScript e ausência de referências a localhost, Windows e file://. Recusa links simbólicos na saída e nos assets. Arquivos obsoletos são retirados somente de `dist/`; nunca coloque originais nessa pasta.

A build atual contém 11 arquivos, aproximadamente 26,97 MiB. O MP4 tem 24.333.949 bytes (23,21 MiB); o áudio publicado tem 3.092.602 bytes (2,95 MiB). Nenhuma compressão ou hospedagem externa adicional é necessária para esses tamanhos. A música original não usada e o antigo placeholder permanecem nos originais, mas não entram na build.

O Pages serve mídias estáticas, mas não as transcodifica: a reprodução depende dos codecs suportados pelo navegador. O site está abaixo do limite de 1 GB do Pages e cada mídia está abaixo do limite de 100 MiB por arquivo do Git. Observe também o limite flexível de tráfego de 100 GB/mês. Referências: [limites do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) e [arquivos grandes no GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github). Confirme os direitos de publicação das músicas e mídias.

## Publicar depois, quando autorizado

Nenhum push ou deploy foi realizado. Não havia repositório Git configurado; por isso o workflow usa `main`. Ainda faltam sua conta/organização e o nome do repositório de destino. Nenhuma credencial é armazenada no projeto.

1. Crie um repositório vazio no GitHub na sua conta. Use um repositório público para GitHub Pages gratuito, ou confirme que seu plano permite Pages no repositório privado.
2. No terminal, dentro desta pasta, execute os comandos abaixo quando estiver pronto. A seleção explícita evita incluir `work/`, `outputs/`, instruções internas ou arquivos pessoais:

```sh
git init -b main
git add index.html style.css script.js assets package.json scripts/build.mjs scripts/preview.mjs scripts/test.mjs .github/workflows/deploy.yml .gitignore README.md
git diff --cached --stat
git commit -m "Prepare static portfolio for GitHub Pages"
```

3. Copie a URL real do repositório. Execute `git remote add origin URL_REAL_DO_REPOSITORIO`, substituindo esse marcador. Não coloque tokens na URL. Autentique pelo mecanismo do GitHub no seu computador.
4. No GitHub, selecione **Settings → Pages → Source → GitHub Actions**.
5. Execute `git push -u origin main`. Isso inicia a publicação. Também é possível usar **Actions → Publicar portfólio no GitHub Pages → Run workflow** após enviar os arquivos.
6. Aguarde os jobs `build` e `deploy`. A URL real aparecerá no ambiente `github-pages` e em Settings → Pages. Se usar outra branch principal, ajuste `on.push.branches` antes de enviar.

O workflow usa actions oficiais em versões estáveis verificadas durante a preparação: checkout 7.0.1, setup-node 7.0.0, configure-pages 6.0.0, upload-pages-artifact 5.0.0 e deploy-pages 5.0.1. A publicação usa exclusivamente o artefato `dist/`, permissões limitadas, ambiente `github-pages` e concorrência serializada. Veja [workflows oficiais do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Validação e limites

`npm test` verifica builds idênticas, preservação dos originais usados, retirada de arquivo obsoleto da saída, exclusão de assets não usados, HTTP na raiz e em `/portfolio-test/`, todos os arquivos publicados sem 404, capitalização, bloqueio de arquivos internos e resposta parcial (206) do MP4.

Neste ambiente, Node 24.19.0 estava disponível, mas npm não foi encontrado. Foram executados com sucesso `node scripts/build.mjs` e `node scripts/test.mjs`, exatamente os scripts associados aos comandos npm. A invocação literal por npm não foi validada localmente; no GitHub Actions, setup-node fornece Node e npm.

No navegador local: os cinco cards abriram os modais correspondentes; os quatro embeds apontam para os IDs corretos e mantêm link alternativo para o YouTube. O MP4 iniciou e a música foi pausada durante o modal. Fechamento por botão e Escape foram exercitados. O layout do modal foi verificado em viewport de celular de 390 × 844; isso não substitui um teste em aparelho físico.

Também foram verificados: troca de categorias, tradução PT/EN, abertura por Enter, ciclo de foco com Tab/Shift+Tab, retorno da música ao fechar, MP4 com readyState 4 e tempo avançando (5,47 s), e ausência de erros/warnings nos logs capturados. As rotas raiz e subdiretório foram abertas no navegador. Os testes HTTP confirmaram todos os arquivos locais publicados sem 404; a reprodução efetiva de áudio/vídeo não foi testada em todos os navegadores do mercado.

O player externo do YouTube ficou em branco no ambiente de teste. Portanto, sua reprodução efetiva não foi confirmada; não há evidência suficiente para atribuir a causa a cada vídeo, à rede ou ao navegador. O link “Watch on YouTube”/“Assistir no YouTube” permanece disponível. Restrições de incorporação são externas ao site.

Autoplay com som pode ser bloqueado pelo navegador: a música tenta iniciar, mas pode precisar do primeiro clique/toque/tecla. O site não contorna essa proteção. Mute e volume continuam disponíveis; a música pausa no modal e pode retomar ao fechar se estava em reprodução.

O deploy no GitHub Actions ainda não foi executado, pois a publicação não foi autorizada. Os testes locais não validam configurações de uma conta ou repositório que ainda não foi informado.

## Arquivos da preparação

- Novos: `package.json`, `scripts/build.mjs`, `scripts/preview.mjs`, `scripts/test.mjs`, `.github/workflows/deploy.yml`, `.gitignore` e este README.
- Ajustados: `script.js` (foco no modal e prevenção de retomada de áudio durante abertura) e `index.html` (versão de cache).
- `style.css` e mídias originais não foram alterados nesta preparação.
