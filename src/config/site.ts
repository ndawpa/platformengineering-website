export const SITE = {
  name: 'Platform Engineering Brasil',
  shortName: 'Platform Engineering',
  description: 'Guias, ferramentas e conteúdo técnico sobre Kubernetes, Cloud, DevOps, SRE, Terraform, GitOps e Platform Engineering.',
  url: 'https://platformengineering.com.br',
  locale: 'pt_BR',
  language: 'pt-BR',
  author: 'Platform Engineering Brasil',
  social: {
    github: 'https://github.com/ndawpa',
  },
  contentRepository: 'https://github.com/ndawpa/platformengineering-website',
  analytics: {
    enabled: false,
    cloudflareToken: '',
  },
  newsletter: {
    enabled: false,
    action: '',
  },
  navigation: [
    { label: 'Comece aqui', href: '/comece-aqui/' },
    { label: 'Artigos', href: '/artigos/' },
    { label: 'Guias', href: '/guias/' },
    { label: 'Labs', href: '/labs/' },
    { label: 'Ferramentas', href: '/ferramentas/' },
    { label: 'Roadmap', href: '/roadmap/platform-engineer/' },
    { label: 'Sobre', href: '/sobre/' },
  ],
} as const;

export const CATEGORIES = [
  'Platform Engineering', 'Kubernetes', 'Docker', 'Linux', 'Terraform', 'AWS', 'Azure', 'DevOps',
  'SRE', 'GitOps', 'CI/CD', 'Observability', 'DevSecOps',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CONTENT_LEVELS = ['Iniciante', 'Intermediário', 'Avançado'] as const;

export const AUTHORS = {
  'platform-engineering-brasil': {
    name: 'Platform Engineering Brasil',
    role: 'Equipe editorial',
    bio: 'Conteúdo técnico aberto sobre construção e operação de plataformas, com revisão humana e foco em decisões reproduzíveis.',
    expertise: ['Platform Engineering', 'Kubernetes', 'DevOps', 'SRE'],
  },
} as const;
