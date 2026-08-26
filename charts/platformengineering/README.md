# Platform Engineering Brasil — Helm chart

Instala o portal estático usando a imagem Nginx sem privilégios publicada no GHCR.

## Instalação pelo repositório

```bash
helm upgrade --install platformengineering ./charts/platformengineering \
  --namespace platformengineering \
  --create-namespace
```

## Instalação pelo OCI registry

Após a publicação de uma release:

```bash
helm upgrade --install platformengineering \
  oci://ghcr.io/ndawpa/charts/platformengineering \
  --version 0.1.0 \
  --namespace platformengineering \
  --create-namespace
```

## Exemplo com Ingress

```bash
helm upgrade --install platformengineering ./charts/platformengineering \
  --namespace platformengineering \
  --create-namespace \
  --set ingress.enabled=true \
  --set ingress.className=nginx \
  --set ingress.hosts[0].host=platformengineering.com.br
```

Para configurações maiores, crie um arquivo próprio:

```yaml
image:
  tag: sha-cd042ce

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: platformengineering.com.br
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: platformengineering-tls
      hosts:
        - platformengineering.com.br

podDisruptionBudget:
  enabled: true

networkPolicy:
  enabled: true
```

```bash
helm upgrade --install platformengineering ./charts/platformengineering \
  -n platformengineering --create-namespace -f production-values.yaml
```

Prefira uma tag `sha-*` ou `digest` imutável em produção. `latest` é apenas o valor inicial para facilitar o primeiro deploy.
