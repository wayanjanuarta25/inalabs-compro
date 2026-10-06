import { Project, ServiceItem, TestimonialItem } from '@/types/project';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1a90c5c8-1122-4a0b-8d19-91890ef00001',
    title: 'MDMC Relawan Platform',
    slug: 'mdmc-relawan-platform',
    image: '/uploads/1790658512773-px8lmc.png',
    description: 'Platform pengelolaan data relawan MDMC yang aman, terstruktur, dan siap mendukung koordinasi kebencanaan dari daerah hingga tingkat nasional.',
    category: 'Website Development',
    project_url: 'https://github.com/wayanjanuarta25/mdmcbali-monitoring-relawan',
    technologies: ['Next.js'],
    featured: true,
    created_at: '2026-03-15T08:00:00Z',
    case_study: {
      client: 'Enterprise Intelligence Showcase',
      timeline: '8 Weeks',
      role: 'Full Lifecycle AI Engineering & UX Design',
      challenge: 'Modern leadership teams face decision fragmentation caused by disconnected data sources and sluggish reporting pipelines.',
      solution: 'Constructed an end-to-end multi-agent orchestration pipeline with vector database indexing, hybrid semantic search, and streaming analytics with sub-second latency.',
      results: [
        'Demonstrated 72% reduction in query resolution latency during benchmark testing',
        'Implemented zero-leakage enterprise data partitioning with strict RLS',
        'Built full streaming markdown parser with interactive artifact execution'
      ],
      metrics: [
        { label: 'Latency Drop', value: '-72%' },
        { label: 'Test Accuracy', value: '98.4%' },
        { label: 'Data Points', value: '10M+' }
      ],
      isDemo: true
    },
    updated_at: '2026-09-29T05:08:54.837Z'
  }
];

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    tagline: 'Intelligent Enterprise Agents',
    description: 'Building intelligent systems using artificial intelligence to automate business processes, ingest unstructured data, and power autonomous customer interactions.',
    iconName: 'Cpu',
    badge: 'Flagship Capability',
    features: [
      'Custom LLM Fine-Tuning & Prompt Engineering',
      'Retrieval-Augmented Generation (RAG) Architecture',
      'Autonomous Multi-Agent Workflow Orchestration',
      'Computer Vision & Predictive Analytics Models'
    ],
    technologies: ['OpenAI', 'Python', 'FastAPI', 'pgvector', 'LangChain', 'HuggingFace']
  },
  {
    id: 'web-development',
    title: 'Web Development',
    tagline: 'High-Performance Web Platforms',
    description: 'Creating modern websites, web applications, and enterprise platforms engineered for lightning speed, dynamic interactivity, and bulletproof security.',
    iconName: 'Globe',
    badge: 'Core Specialty',
    features: [
      'Next.js 15 App Router & Server Components',
      'Full-Stack TypeScript Development',
      'Interactive Micro-Animations with Framer Motion',
      'SEO Engineered Architecture with Perfect Core Web Vitals'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis']
  },
  {
    id: 'mobile-application',
    title: 'Mobile Application',
    tagline: 'Cross-Platform Mobile Experiences',
    description: 'Developing scalable mobile experiences for Android and iOS that captivate users with fluid 60fps animations, biometric authentication, and offline capability.',
    iconName: 'Smartphone',
    badge: 'Native Feel',
    features: [
      'Cross-Platform React Native & Flutter Engineering',
      'Native Device Hardware & Sensor Integration',
      'Offline-First Data Sync & Encrypted Storage',
      'App Store & Google Play Automated CI/CD Publishing'
    ],
    technologies: ['React Native', 'Expo', 'Flutter', 'Firebase', 'GraphQL', 'Swift/Kotlin']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'Premium Digital Experiences',
    description: 'Designing beautiful interfaces with excellent user experiences that balance aesthetics, emotional resonance, and frictionless conversion.',
    iconName: 'Layers',
    badge: 'Design Excellence',
    features: [
      'Futuristic Dark-Mode & Glassmorphism Design Systems',
      'User Journey Mapping & Usability Wireframing',
      'Interactive High-Fidelity Prototypes in Figma',
      'Comprehensive Design Token Specifications'
    ],
    technologies: ['Figma', 'Framer', 'Design Tokens', 'Storybook', 'Micro-interactions']
  },
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    tagline: 'Tailored Enterprise Systems',
    description: 'Building customized software solutions based on unique business needs, complex workflows, and enterprise compliance requirements.',
    iconName: 'Code',
    badge: 'Scalable Systems',
    features: [
      'Event-Driven Microservices Architecture',
      'High-Throughput API Gateway Engineering',
      'Legacy Modernization & Database Migration',
      'Role-Based Multi-Tenant Enterprise Security'
    ],
    technologies: ['Node.js', 'NestJS', 'Go', 'Docker', 'Kubernetes', 'PostgreSQL']
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    tagline: 'Ecosystem Modernization',
    description: 'Helping companies modernize their digital ecosystem through strategic cloud migration, process automation, and data modernization.',
    iconName: 'Zap',
    badge: 'Strategic Impact',
    features: [
      'Technology Stack Audit & Architecture Roadmap',
      'Cloud Native Infrastructure on AWS / GCP',
      'CI/CD Pipelines & Automated Testing Suites',
      'Continuous Performance & Cost Optimization'
    ],
    technologies: ['AWS', 'GCP', 'Docker', 'Terraform', 'GitHub Actions', 'Datadog']
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Budi Hartono',
    role: 'Chief Technology Officer',
    company: 'FinVortex Global (Demo Client)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    review: 'Inalabs Indonesia engineered our high-frequency analytics portal with extraordinary finesse. The speed, dark cyber UI, and zero-latency data stream gave us a major edge in investor pitches.',
    rating: 5,
    projectReference: 'Nexus Enterprise SaaS Portal',
    badge: 'Verified Showcase Review'
  },
  {
    id: 'test-2',
    name: 'Sarah Wijaya',
    role: 'VP of Product',
    company: 'NeoLogix Health (Demo Client)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    review: 'Their deep understanding of both AI model deployment and modern frontend engineering is rare in the region. They turned our concept into a production-grade interface in record time.',
    rating: 5,
    projectReference: 'PulseMed AI Diagnostics',
    badge: 'Verified Showcase Review'
  },
  {
    id: 'test-3',
    name: 'Reza Pratama',
    role: 'Head of Digital Innovation',
    company: 'Astraea Retail Group (Demo Client)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    review: 'Working with Inalabs felt like collaborating with a top-tier Silicon Valley engineering team. Our headless commerce load times plummeted and the customer feedback has been phenomenal.',
    rating: 5,
    projectReference: 'Veloce Headless Commerce',
    badge: 'Verified Showcase Review'
  }
];
