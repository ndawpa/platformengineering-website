# PlatformEngineering.com.br

Portal brasileiro de conteúdo técnico sobre Platform Engineering, DevOps, SRE, Cloud, Kubernetes, Infrastructure as Code, CI/CD, GitOps, Observability e DevSecOps.

O MVP é totalmente estático: não usa banco de dados, backend, autenticação, CMS nem trackers. Artigos ficam versionados em Markdown/MDX e passam pelo mesmo fluxo de revisão do código.

## Stack

- Astro 6 e TypeScript strict
- Tailwind CSS 4
- MDX e Astro Content Collections
- Shiki, incluído no Astro, para syntax highlighting
- Sitemap e RSS oficiais do ecossistema Astro
- GitHub Actions
- Cloudflare Pages
- Sharp para gerar imagens Open Graph estáticas
- YAML para o validador executado no navegador

O JavaScript entregue ao navegador é restrito às interações necessárias: tema, menu móvel, busca local, cópia de código e ferramenta Base64.

## Requisitos

- Node.js 22.12 ou superior
- npm 10 ou superior

## Instalação e desenvolvimento

```bash
npm install
npm run dev
```

O servidor local informa o endereço, normalmente `http://localhost:4321`.

## Validação e build

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
npm test
```

O build estático é gerado em `dist/`. O comando `build` também executa o typecheck para impedir publicação com erros de tipos ou de conteúdo.

## Arquitetura

```text
src/
├── components/          # UI pequena e reutilizável
├── config/              # Identidade, navegação, categorias e links
├── content/
│   └── articles/        # Markdown/MDX organizado por categoria/slug
├── layouts/             # Base SEO e layout editorial
├── pages/               # Rotas estáticas do Astro
├── styles/              # CSS global e tipografia editorial
├── content.config.ts    # Schema e loader da coleção
└── utils/               # URLs, datas, ordenação e leitura estimada
labs/                    # Ambientes reproduzíveis dos Lab Guides
scripts/                 # Auditorias de links e metadados
public/
├── _headers             # Headers de segurança e cache no Cloudflare
├── favicon.svg
├── og-default.svg
└── robots.txt
```

Áreas futuras como vagas, cursos, produtos, premium, comunidade, patrocinadores e afiliados devem ganhar rotas e coleções próprias quando forem implementadas. Elas não têm placeholders públicos no MVP para evitar promessas vazias.

Seus feature flags reservados ficam em `src/config/features.ts`. Ativar um flag isoladamente não publica uma funcionalidade: ele existe para centralizar disponibilidade quando cada módulo for realmente criado.

## Como criar um artigo

Crie um arquivo em `src/content/articles/<categoria>/<slug>.mdx`. O caminho vira a URL; por exemplo:

```text
src/content/articles/kubernetes/crashloopbackoff.mdx
→ /artigos/kubernetes/crashloopbackoff/
```

Use este frontmatter:

```yaml
---
title: "Título claro e específico"
description: "Resumo de até 180 caracteres."
publishedAt: 2026-08-25
updatedAt: 2026-08-25
author: "Platform Engineering Brasil"
category: "Kubernetes"
tags:
  - kubernetes
  - troubleshooting
draft: true
featured: false
level: "Intermediário"
prerequisites:
  - Conhecimento básico do tema
objectives:
  - Resultado de aprendizado verificável
series: "Nome da série"
seriesOrder: 1
sources:
  - title: "Documentação oficial"
    url: "https://example.com/docs"
revisionNotes:
  - date: 2026-08-25
    note: "O que mudou nesta revisão."
reviewedBy: "Equipe editorial"
reviewAt: 2027-02-26
testedWith:
  - "Kubernetes 1.35"
labRepository: "https://github.com/example/lab"
---
```

Defina `draft: false` apenas depois da revisão técnica e editorial. O schema é validado durante o build. Headings `##` e `###` alimentam automaticamente o índice e recebem links. Blocos cercados por três crases recebem syntax highlighting e botão de cópia.

Componentes MDX, como `Callout`, podem ser importados de `src/components`. Mantenha Markdown simples quando um componente não agregar semântica.

`level`, objetivos e fontes aparecem na página. Artigos com a mesma `series` recebem navegação anterior/próximo conforme `seriesOrder`. Cada artigo gera uma imagem social PNG em `/og/<id>.png` durante o build.

`reviewAt` torna a revisão periódica obrigatória: a auditoria editorial falha quando a data vence. Use `testedWith` apenas para versões realmente verificadas e `labRepository` quando houver um laboratório reproduzível.

## Roadmap editorial

Todos os clusters e pautas planejados ficam em `src/config/editorial.ts` e são apresentados publicamente em `/roadmap/editorial/`. Registrar uma pauta não a transforma em artigo: apenas conteúdos pesquisados e revisados devem receber `draft: false`.

## Como criar uma categoria

1. Adicione o nome em `CATEGORIES`, no arquivo `src/config/site.ts`.
2. Se necessário, adicione a categoria à navegação ou à curadoria da homepage.
3. Crie artigos usando exatamente o nome registrado.

A rota `/categorias/<slug>/` é gerada automaticamente, inclusive enquanto ainda não houver artigos.

## Como adicionar uma ferramenta

1. Crie uma página em `src/pages/ferramentas/<slug>.astro`.
2. Mantenha o processamento local sempre que a tarefa permitir.
3. Carregue scripts apenas nessa página e forneça labels, estados acessíveis e tratamento de erro.
4. Adicione um `ToolCard` em `src/pages/ferramentas/index.astro` e, se for relevante, na homepage.

A implementação Base64 mostra o padrão: HTML funcional, TypeScript pequeno e nenhuma dependência externa.

## Busca

A busca gera um índice compacto a partir da coleção durante o build e filtra título, descrição, categoria e tags no navegador. Use `/`, `Ctrl+K` ou `Cmd+K` para acessá-la. A biblioteca também possui filtros por categoria e nível. Não há serviço externo ou custo operacional. Se o acervo crescer a ponto de afetar o payload, o componente pode ser substituído por Pagefind sem alterar o modelo de conteúdo.

## Guias e progresso

Guias são compostos a partir do campo `series` dos artigos. A página do guia pode manter progresso no `localStorage`, sem conta ou identificação do visitante. O guia de fundamentos em `src/pages/guias/fundamentos-platform-engineering.astro` serve como referência.

## Laboratórios locais

Lab Guides ficam em `src/content/labs/` e seus arquivos executáveis em `labs/<categoria>/<slug>/`. A rota `/labs/` lista os exercícios disponíveis. Cada lab deve operar em namespace ou ambiente isolado, declarar versões testadas, validar o resultado e oferecer um procedimento de limpeza.

Para adicionar um laboratório:

1. Crie o guia MDX em `src/content/labs/<categoria>/<slug>.mdx`.
2. Adicione manifests e automação em `labs/<categoria>/<slug>/`.
3. Use `repositoryPath` no frontmatter para conectar o guia aos arquivos.
4. Teste `setup`, checkpoints, `verify`, `cleanup` e `destroy` em uma máquina sem estado prévio.
5. Nunca inclua secrets, contas cloud reais ou comandos que operem em um contexto Kubernetes não verificado.

O primeiro exemplo, `labs/kubernetes/crashloopbackoff`, usa kind e um namespace exclusivo. Essa separação permitirá adicionar futuramente um executor interativo sem acoplar o conteúdo editorial à infraestrutura de provisionamento.

## Autores, revisão e contribuições

Autores são centralizados em `AUTHORS`, no arquivo `src/config/site.ts`. Artigos apontam para o perfil da equipe editorial, mostram fontes e histórico de revisão e oferecem um link para edição no GitHub. Atualize `contentRepository` antes de publicar caso o repositório definitivo tenha outro endereço.

A política pública está em `/politica-editorial/`. Templates de pull request e correção editorial ficam em `.github/`.

## SEO e performance

O projeto gera canonical, sitemap, robots, RSS, Open Graph, Twitter Cards, schema `WebSite`, schema `Article` e breadcrumbs estruturados. Todas as rotas editoriais são HTML estático. A imagem social e o favicon são SVG locais, e não há fonte remota bloqueando renderização.

Antes de publicar, atualize em `src/config/site.ts` o endereço do repositório GitHub, caso o projeto use outra organização.

## Deploy no Cloudflare Pages

Conecte o repositório no Cloudflare Pages com:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: `22`

Não é necessário adapter, pois todo o site é pré-renderizado. O arquivo `public/_headers` é copiado para o build e configura segurança e cache. Configure o domínio `platformengineering.com.br` no painel e mantenha `site` em `astro.config.ts` sincronizado com o domínio canônico.

## Container e Kubernetes

O `Dockerfile` faz o build do Astro em uma etapa Node.js e copia somente os arquivos estáticos para uma imagem Nginx sem privilégios. O container:

- executa como UID `101`, sem root;
- escuta na porta `8080`;
- oferece `GET /healthz` para liveness e readiness probes;
- entrega o `404.html` do portal para rotas inexistentes;
- comprime respostas textuais;
- aplica cache imutável em `/_astro/` e `/og/`;
- replica os headers de segurança usados no Cloudflare Pages.

Build e teste local:

```bash
docker build -t platformengineering-brasil:local .
docker run --rm -p 8080:8080 platformengineering-brasil:local
curl --fail http://localhost:8080/healthz
```

Parâmetros esperados pelos manifestos Kubernetes:

```yaml
ports:
  - name: http
    containerPort: 8080
readinessProbe:
  httpGet:
    path: /healthz
    port: http
livenessProbe:
  httpGet:
    path: /healthz
    port: http
securityContext:
  runAsNonRoot: true
  allowPrivilegeEscalation: false
  capabilities:
    drop: ["ALL"]
```

Para publicar em um registry, use uma tag imutável, preferencialmente o SHA do commit:

```bash
docker build -t registry.example.com/platformengineering/site:<git-sha> .
docker push registry.example.com/platformengineering/site:<git-sha>
```

O workflow `.github/workflows/container.yml` automatiza esse processo no GitHub. Pushes para `main` publicam no GHCR para `linux/amd64` e `linux/arm64` com:

```text
ghcr.io/<owner>/<repository>:sha-<commit>
ghcr.io/<owner>/<repository>:latest
```

Tags Git no formato `v1.2.3` também geram tags semânticas `1.2.3` e `1.2`. O workflow inclui cache, SBOM e provenance. Caso o pacote deva ser público, altere sua visibilidade nas configurações de Packages do GitHub após a primeira publicação.

### Deploy com Helm

O chart em `charts/platformengineering/` cria Deployment, Service e ServiceAccount. Ingress, autoscaling, PodDisruptionBudget e NetworkPolicy são opcionais. Os defaults usam duas réplicas, probes em `/healthz`, recursos conservadores e a imagem pública do projeto no GHCR.

Instalação diretamente deste repositório:

```bash
helm upgrade --install platformengineering ./charts/platformengineering \
  --namespace platformengineering \
  --create-namespace \
  --set image.tag=sha-<commit>
```

Para habilitar um Ingress:

```bash
helm upgrade --install platformengineering ./charts/platformengineering \
  --namespace platformengineering \
  --create-namespace \
  --set image.tag=sha-<commit> \
  --set ingress.enabled=true \
  --set ingress.className=nginx \
  --set ingress.hosts[0].host=platformengineering.com.br
```

O workflow `.github/workflows/helm.yml` valida o chart em pull requests e publica versões no GHCR quando uma tag `vX.Y.Z` é criada. Após a primeira publicação, o cluster pode instalar o chart OCI sem clonar o repositório:

```bash
helm upgrade --install platformengineering \
  oci://ghcr.io/ndawpa/charts/platformengineering \
  --version 0.1.0 \
  --namespace platformengineering \
  --create-namespace
```

Consulte `charts/platformengineering/README.md` e `values.yaml` para configurar registry privado, pull secrets, TLS, recursos, scheduling e políticas de disponibilidade/rede.

## CI/CD e fluxo editorial

O workflow `.github/workflows/quality.yml` executa instalação reproduzível, typecheck, lint e build em pull requests e pushes para `main`.

Fluxo editorial recomendado:

```text
Ideia → draft MDX → pull request → revisão técnica humana → merge → deploy
```

Agentes de IA podem criar branches e rascunhos, mas a revisão humana deve validar comandos, versões, segurança, fontes e clareza antes de remover `draft: true`.

## Analytics e newsletter

Nenhum analytics é habilitado por padrão. Para Cloudflare Web Analytics, defina `SITE.analytics.enabled` e o token em `src/config/site.ts`. O componente só é incluído quando ambos estão configurados.

A newsletter segue o mesmo princípio. `SITE.newsletter.enabled` e `action` habilitam o formulário para um endpoint HTTPS externo. Escolha um provedor com double opt-in e publique uma política de privacidade antes de ativar. Sem configuração, a página oferece RSS.

## Qualidade automatizada

- `npm run typecheck`: Astro e TypeScript.
- `npm run lint`: JavaScript, TypeScript e Astro.
- `npm run check:links`: links e assets internos no build.
- `npm run check:content`: metadados editoriais obrigatórios.
- `npm test`: build e auditorias locais.
- GitHub Actions: todas as verificações e Lighthouse CI.
- Dependabot: npm e GitHub Actions.

O Lighthouse CI audita homepage, artigo técnico e ferramenta, com limites para performance, acessibilidade, boas práticas e SEO.
