# Prompt para preparar a build e o deploy no GitHub Pages

Copie o texto abaixo na tarefa que terá acesso à pasta deste portfólio.

---

Prepare este portfólio para publicação no GitHub Pages. Implemente a build e a configuração de deploy, sem redesenhar o site.

Contexto: o projeto é estático, com `index.html`, `style.css`, `script.js` e a pasta `assets/`. Não depende de React, servidor de aplicação ou banco de dados. Preserve essa arquitetura. Inspecione primeiro o estado atual, pois ele pode ter recebido alterações.

Requisitos:

1. Preserve o visual escuro e minimalista, a foto em degradê, os idiomas PT/EN, o typing, as animações, o áudio com mute/volume e os contatos. Mantenha VLOG/IRL e Talking Head, sem Shorts e sem o antigo vídeo “Watch Edits” no About Me.
2. Crie uma build estática reproduzível com `npm run build`, usando um script Node sem dependências desnecessárias. Gere `dist/` com `index.html`, `style.css`, `script.js` e apenas os assets usados, mantendo os caminhos relativos. Gere também `.nojekyll`. O processo deve atualizar os arquivos e retirar arquivos obsoletos somente dentro da pasta de saída validada; nunca apague os originais.
3. Garanta funcionamento tanto na raiz de um domínio quanto em `https://USUARIO.github.io/REPOSITORIO/`. Elimine referências de produção a localhost, caminhos do Windows e URLs `file://`. Valide maiúsculas/minúsculas dos nomes de arquivos e links internos.
4. Preserve o play dos vídeos no modal. Verifique YouTube, vídeo MP4 local, fechamento por botão/Escape, teclado e celular. Mantenha o link alternativo para abrir no YouTube quando o player externo restringir a reprodução. Não afirme que todos os vídeos reproduzem se só conseguiu verificar a abertura do modal. O áudio de fundo deve pausar durante o vídeo e respeitar as restrições de autoplay do navegador.
5. Crie `.github/workflows/deploy.yml` usando as actions oficiais e versões estáveis atuais: checkout, configuração do Pages, build, upload do artefato `dist/` e deploy. Use `workflow_dispatch` e push para a branch principal real do repositório; se ainda não houver repositório, documente a escolha de `main`. Configure `contents: read`, `pages: write`, `id-token: write`, o ambiente `github-pages`, dependência entre build/deploy e concorrência de publicação.
6. Inclua `.gitignore` apropriado. Não publique pastas de trabalho, outputs temporários, instruções internas, credenciais ou a pasta inteira do computador. Verifique o tamanho dos arquivos e o suporte das mídias pelo Pages antes de propor compressão ou hospedagem externa. Não exclua nem substitua meus vídeos sem necessidade.
7. Execute a build, sirva `dist/` por HTTP e teste também em um subdiretório que simule o nome do repositório. Verifique os botões, os cinco cards atuais, a troca de categoria/idioma e a ausência de erros JavaScript ou arquivos locais com 404. Corrija falhas encontradas e diferencie falhas do site de restrições externas do YouTube.
8. Entregue um README em português com os comandos de build/prévia e o passo a passo para enviar o projeto e selecionar Settings → Pages → Source → GitHub Actions. Informe os arquivos alterados e o que foi efetivamente validado.

Prepare todos os arquivos e valide localmente. Não faça push ou publique neste momento. Se não houver repositório Git configurado, não invente uma conta, URL ou credencial: entregue o pacote pronto e indique a informação que falta para a publicação. Não use outro provedor de hospedagem.

Referência oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
