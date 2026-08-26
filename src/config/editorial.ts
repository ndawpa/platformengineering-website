import type { Category } from './site';

export type EditorialStatus = 'published' | 'next' | 'planned';

export interface EditorialTopic {
  title: string;
  category: Category;
  status: EditorialStatus;
  cluster: string;
}

export const EDITORIAL_CLUSTERS = [
  {
    name: 'Fundamentos de Platform Engineering',
    description: 'Produto, arquitetura, adoção e operação de plataformas internas.',
    topics: [
      'O que é uma Internal Developer Platform?', 'Golden paths: benefícios e riscos', 'Platform as a Product',
      'Como identificar a necessidade de uma plataforma', 'Arquitetura de uma plataforma interna',
      'Métricas de sucesso e adoção', 'Erros comuns ao iniciar Platform Engineering', 'Build vs Buy para plataformas internas',
    ],
  },
  {
    name: 'Kubernetes Troubleshooting',
    description: 'Diagnóstico baseado em evidências para workloads e clusters.',
    topics: [
      'Pods em Pending', 'ImagePullBackOff e ErrImagePull', 'OOMKilled', 'Falhas de readiness e liveness probes',
      'Problemas de DNS no cluster', 'Services sem endpoints', 'Debug de Ingress', 'Problemas de storage e PVC',
      'Diagnóstico de scheduling', 'Uso de kubectl debug', 'Checklist de incidentes Kubernetes',
    ],
  },
  {
    name: 'Terraform em produção',
    description: 'Estado, módulos, testes, entrega e segurança de infraestrutura como código.',
    topics: [
      'State remoto e locking', 'Estratégias para múltiplos ambientes', 'Como criar módulos sustentáveis',
      'Versionamento de módulos', 'Import e migração de recursos', 'moved, import e check blocks',
      'Segurança de secrets no state', 'Terraform no CI/CD', 'Testes com terraform test',
      'Terraform vs OpenTofu', 'Como revisar um plano Terraform', 'Estratégias para evitar drift',
    ],
  },
  {
    name: 'GitOps com Argo CD',
    description: 'Reconciliação, repositórios, segurança e operação em escala.',
    topics: [
      'Arquitetura do Argo CD', 'Application e ApplicationSet', 'Estrutura de repositórios GitOps',
      'Helm vs Kustomize', 'App of Apps', 'Sync waves e hooks', 'Secrets com External Secrets ou SOPS',
      'Rollback e disaster recovery', 'Multi-cluster', 'RBAC e AppProject', 'Observabilidade do Argo CD',
      'Erros comuns de reconciliação',
    ],
  },
  {
    name: 'Observability e SRE',
    description: 'Sinais, objetivos de confiabilidade e resposta operacional.',
    topics: [
      'Métricas, logs e traces', 'OpenTelemetry', 'RED, USE e Four Golden Signals', 'Como definir SLIs e SLOs',
      'Error budgets', 'Alertas baseados em sintomas', 'Burn-rate alerts', 'Postmortems sem culpabilização',
      'Gestão de incidentes', 'Prometheus e cardinalidade', 'Grafana para times de plataforma',
      'Observabilidade da própria plataforma',
    ],
  },
  {
    name: 'CI/CD e software supply chain',
    description: 'Entrega segura, artefatos verificáveis e identidade de pipelines.',
    topics: [
      'Anatomia de um pipeline moderno', 'Trunk-based development', 'Estratégias de deployment',
      'Blue-green, canary e rolling update', 'Artefatos imutáveis', 'SBOM', 'Assinatura com Cosign', 'SLSA',
      'Scanning de imagens', 'Provenance', 'OIDC entre GitHub Actions e cloud', 'Segurança de runners',
      'Ambientes e aprovações',
    ],
  },
  {
    name: 'Cloud para plataformas',
    description: 'Fundações cloud orientadas a plataformas internas.',
    topics: [
      'Landing zones', 'Identidade e federação', 'Arquitetura multi-account e multi-subscription',
      'Rede para clusters Kubernetes', 'Gestão de custos da plataforma', 'EKS vs AKS', 'Workload Identity',
      'Secrets e KMS ou Key Vault', 'DNS e certificados', 'Multi-cloud sem abstrações artificiais',
    ],
  },
  {
    name: 'Developer Experience',
    description: 'Experiência, catálogo, self-service e pesquisa com usuários internos.',
    topics: [
      'Como medir Developer Experience', 'Carga cognitiva', 'DevEx e DORA', 'Catálogo de serviços',
      'Scorecards', 'Templates de software', 'Documentação como produto', 'Self-service com guardrails',
      'Backstage: quando usar e quando evitar', 'Pesquisa com desenvolvedores internos',
      'APIs de plataforma e contratos',
    ],
  },
] as const;

export const PRIORITY_PUBLICATIONS = [
  'O que é uma Internal Developer Platform?', 'Platform as a Product', 'Golden paths: benefícios e riscos',
  'OOMKilled', 'Pods em Pending', 'State remoto e locking', 'Estrutura de repositórios GitOps',
  'Como definir SLIs e SLOs', 'Métricas de sucesso e adoção', 'Software supply chain',
] as const;
