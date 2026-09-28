export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    about: string;
    services: string;
    projects: string;
    contact: string;
    initiateProject: string;
    toggleThemeLight: string;
    toggleThemeDark: string;
    switchLang: string;
  };
  hero: {
    kickerStudio: string;
    kickerLocation: string;
    titleMain: string;
    titleHighlight: string;
    description: string;
    startProject: string;
    selectedProjects: string;
    metricsProjects: string;
    metricsIndustries: string;
    metricsYears: string;
    metricsYearsLabel: string;
    sculptureBadge: string;
    sculptureStatus: string;
    sculptureTitle: string;
    sculptureDesc: string;
    sculptureSys: string;
  };
  about: {
    kicker: string;
    title1: string;
    title2: string;
    story1: string;
    story2: string;
    badgeStudio: string;
    badgeLocation: string;
    capabilitiesTitle: string;
    capabilitiesSub: string;
    capabilities: Array<{
      index: string;
      title: string;
      description: string;
    }>;
  };
  services: {
    kicker: string;
    title1: string;
    title2: string;
    subtitle: string;
    items: Array<{
      number: string;
      title: string;
      headline: string;
      description: string;
      technologies: string[];
      colSpan: string;
    }>;
  };
  portfolio: {
    kicker: string;
    title: string;
    filters: {
      all: string;
      toolsAutomation: string;
      webCompanyProfile: string;
      designGraphic: string;
      contentAI: string;
    };
    featuredBadge: string;
    yearStack: string;
  };
  trust: {
    kicker: string;
    title: string;
    subtitle: string;
    sectorPrefix: string;
    sectors: Array<{
      name: string;
      location: string;
    }>;
  };
  contact: {
    kicker: string;
    title1: string;
    title2: string;
    description: string;
    generalInquiries: string;
    directLine: string;
    studioHQ: string;
    studioHQValue: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    scopeLabel: string;
    scopeOptions: Array<{
      value: string;
      label: string;
    }>;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    inquiryReceived: string;
    thankYou: string;
    thankYouDesc: string;
    sendAnother: string;
  };
  footer: {
    brandDesc: string;
    studioIndex: string;
    idxAbout: string;
    idxServices: string;
    idxProjects: string;
    idxContact: string;
    comms: string;
    allRightsReserved: string;
    colophon: string;
  };
  whatsappCTA: {
    lineTitle: string;
    lineDesc: string;
    chatBtn: string;
    defaultMsg: string;
  };
  projectDetail: {
    backToProjects: string;
    engagementPartner: string;
    defaultPartner: string;
    timeline: string;
    defaultTimeline: string;
    techLibraries: string;
    visitLive: string;
    requestSimilar: string;
    demoDisclaimer: string;
    challengeBadge: string;
    challengeTitle: string;
    solutionBadge: string;
    solutionTitle: string;
    resultsBadge: string;
    resultsTitle: string;
    exploreMore: string;
    published: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      about: 'Tentang',
      services: 'Layanan',
      projects: 'Portofolio',
      contact: 'Kontak',
      initiateProject: 'Mulai Proyek',
      toggleThemeLight: 'Mode Terang',
      toggleThemeDark: 'Mode Gelap',
      switchLang: 'Ganti Bahasa',
    },
    hero: {
      kickerStudio: 'Studio Produk Digital',
      kickerLocation: 'Jakarta • Tokyo R&D',
      titleMain: 'Membangun Produk Digital',
      titleHighlight: 'Yang Berdampak.',
      description:
        'Inalabs Indonesia merancang dan mengembangkan platform digital, sistem perangkat lunak, dan solusi berbasis AI untuk bisnis yang visioner.',
      startProject: 'Mulai Proyek',
      selectedProjects: 'Proyek Pilihan',
      metricsProjects: 'Proyek Selesai',
      metricsIndustries: 'Sektor Industri',
      metricsYears: 'Tahun',
      metricsYearsLabel: 'Membangun Produk',
      sculptureBadge: 'GMB. 01 // KINETIK INTI',
      sculptureStatus: 'AKTIF',
      sculptureTitle: 'Laboratorium Inovasi',
      sculptureDesc: 'Protokol R&D • Kisi Spasial Sintetis',
      sculptureSys: 'INA-SYS // 2026',
    },
    about: {
      kicker: '[ 01 — MANIFESTO STUDIO ]',
      title1: 'Teknologi berpadu dengan',
      title2: 'kreativitas.',
      story1:
        'Inalabs Indonesia adalah studio rekayasa digital yang membantu organisasi mentransformasikan gagasan menjadi pengalaman digital yang terukur dan berkinerja tinggi.',
      story2:
        'Kami beroperasi di persimpangan arsitektur sistem tingkat tinggi dan desain antarmuka sensorik yang ekspresif. Alih-alih mengandalkan template siap pakai, kami membangun produk digital yang dirancang khusus dengan standar rekayasa tanpa kompromi.',
      badgeStudio: 'STUDIO INDEPENDEN',
      badgeLocation: 'BERDIRI 2021 • JAKARTA',
      capabilitiesTitle: 'Kemampuan Utama',
      capabilitiesSub: '[ SISTEM × KREATIF ]',
      capabilities: [
        {
          index: '01',
          title: 'Tools Automation',
          description:
            'Otomasi alur kerja digital, bot cerdas, integrasi API, dan tools kustom untuk mengefisiensikan operasional bisnis tanpa hambatan manual.',
        },
        {
          index: '02',
          title: 'Web Company Profile',
          description:
            'Website profil perusahaan modern, interaktif, responsif, dan elegan untuk membangun kredibilitas serta representasi digital bisnis Anda.',
        },
        {
          index: '03',
          title: 'Design Graphic',
          description:
            'Identitas visual, materi promosi kreatif, aset branding, dan grafis antarmuka berkualitas tinggi dengan estetika visual yang kuat dan memikat.',
        },
        {
          index: '04',
          title: 'Content AI',
          description:
            'Produksi konten cerdas berbasis kecerdasan buatan, copywriting strategis, aset visual AI, dan personalisasi konten terukur untuk pemasaran digital.',
        },
      ],
    },
    services: {
      kicker: '[ 02 — KEAHLIAN ]',
      title1: 'Direkayasa dengan',
      title2: 'presisi tanpa kompromi.',
      subtitle:
        'Empat disiplin utama yang bersinergi dalam satu studio untuk mengubah tantangan kompleks menjadi pengalaman digital elegan.',
      items: [
        {
          number: '01',
          title: 'AI & Otomasi',
          headline: 'Membangun alur kerja cerdas dan sistem bisnis otomatis.',
          description:
            'Kami merancang pipeline agen otonom, pencarian vektor kustom, dan loop keputusan enterprise otomatis yang mengubah data mentah menjadi eksekusi strategis bernilai tinggi.',
          technologies: ['Autonomous Agents', 'Vector Search', 'LangGraph', 'Enterprise RLS', 'Python'],
          colSpan: 'lg:col-span-7',
        },
        {
          number: '02',
          title: 'Produk Digital',
          headline: 'Platform web dan aplikasi enterprise generasi terkini.',
          description:
            'Aplikasi web siap produksi yang dibangun dengan framework termutakhir, dirancang untuk menangani beban konkurensi tinggi dengan performa instan tanpa jeda.',
          technologies: ['Next.js App Router', 'React 19', 'TypeScript', 'GraphQL', 'Edge Runtime'],
          colSpan: 'lg:col-span-5',
        },
        {
          number: '03',
          title: 'Desain Pengalaman',
          headline: 'Antarmuka intuitif yang disukai dan nyaman digunakan.',
          description:
            'Sistem desain yang dikerjakan dengan dedikasi penuh pada hierarki tipografi, mikro-interaksi responsif, aksesibilitas, dan kesederhanaan visual yang elegan.',
          technologies: ['Design Tokens', 'Spatial UX', 'Sensory Motion', 'Figma Systems', 'Human-Centric'],
          colSpan: 'lg:col-span-5',
        },
        {
          number: '04',
          title: 'Rekayasa Sistem',
          headline: 'Infrastruktur teknologi yang andal, aman, dan terukur.',
          description:
            'Microservices terdistribusi, orkestrasi cloud zero-trust, message broker throughput tinggi, dan partisi database yang dirancang untuk uptime 99.99%.',
          technologies: ['Distributed Go', 'PostgreSQL / pgvector', 'Redis', 'Docker', 'Event Streams'],
          colSpan: 'lg:col-span-7',
        },
      ],
    },
    portfolio: {
      kicker: '[ 03 — PORTOFOLIO ]',
      title: 'Proyek Pilihan',
      filters: {
        all: 'Semua',
        toolsAutomation: 'Tools Automation',
        webCompanyProfile: 'Web Company Profile',
        designGraphic: 'Design Graphic',
        contentAI: 'Content AI',
      },
      featuredBadge: 'PROYEK UNGGULAN // 2026',
      yearStack: 'Tahun / Teknologi',
    },
    trust: {
      kicker: '[ 04 — REPUTASI ]',
      title: 'Dipercaya oleh tim yang membangun masa depan.',
      subtitle: 'DIREKAYASA DI BAWAH STANDAR KETAT ENTERPRISE',
      sectorPrefix: 'SEKTOR',
      sectors: [
        { name: 'Fintech & Perbankan Digital', location: 'Singapore / Jakarta' },
        { name: 'Protokol AI Otonom', location: 'Tokyo R&D' },
        { name: 'Infrastruktur Cloud & SOC', location: 'APAC Terdistribusi' },
        { name: 'Sistem Rantai Pasok Skala Besar', location: 'Asia Tenggara' },
        { name: 'Platform Enterprise Komposabel', location: 'Global' },
      ],
    },
    contact: {
      kicker: '[ 05 — MEMULAI ]',
      title1: 'Punya ide proyek',
      title2: 'yang ingin diwujudkan?',
      description:
        'Kami berkolaborasi dengan founder visioner dan pemimpin enterprise untuk menciptakan produk digital transformatif. Hubungi kami untuk mewujudkan visi dan ambisi Anda.',
      generalInquiries: 'Pertanyaan Umum',
      directLine: 'Jalur Langsung / WhatsApp',
      studioHQ: 'Kantor Studio',
      studioHQValue: 'Jl. Raya Kalibata 2-9, RT.1, Rawajati, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12750',
      nameLabel: 'Nama Lengkap *',
      namePlaceholder: 'contoh: Budi Santoso / Kevin Sanjaya',
      emailLabel: 'Email Kerja / Perusahaan *',
      emailPlaceholder: 'nama@perusahaan.com',
      scopeLabel: 'Ruang Lingkup Proyek',
      scopeOptions: [
        { value: 'Tools Automation', label: 'Tools Automation & Otomasi Alur Kerja' },
        { value: 'Web Company Profile', label: 'Web Company Profile & Portal Bisnis' },
        { value: 'Design Graphic', label: 'Design Graphic & Identitas Visual' },
        { value: 'Content AI', label: 'Content AI & Pemasaran Generatif' },
      ],
      messageLabel: 'Gambaran / Detail Proyek',
      messagePlaceholder: 'Ceritakan tujuan proyek, estimasi linimasa, dan konteks teknis yang diharapkan...',
      submitBtn: 'Kirimkan Pesan',
      submittingBtn: 'Mengirimkan Pesan...',
      inquiryReceived: '[ PESAN DITERIMA ]',
      thankYou: 'Terima kasih telah menghubungi kami.',
      thankYouDesc:
        'Tim teknis kami telah menerima ringkasan proyek Anda. Kami akan meninjau kebutuhan teknis dan merespons dalam 1x24 jam kerja.',
      sendAnother: 'Kirim pesan lainnya →',
    },
    footer: {
      brandDesc:
        'Studio produk digital yang dirancang untuk perusahaan bertumbuh dan founder ambisius. Sistem perangkat lunak, antarmuka sensorik, dan otomasi cerdas.',
      studioIndex: 'Indeks Studio',
      idxAbout: '01 // Tentang Studio',
      idxServices: '02 // Bidang & Layanan',
      idxProjects: '03 // Proyek Pilihan',
      idxContact: '04 // Kontak & Pertanyaan',
      comms: 'Komunikasi',
      allRightsReserved: 'Hak cipta dilindungi undang-undang.',
      colophon: 'STUDIO DIGITAL FUTURISTIK • EDISI 2026',
    },
    whatsappCTA: {
      lineTitle: 'Jalur Langsung Studio',
      lineDesc:
        'Terhubung langsung dengan tim direktur rekayasa untuk mendiskusikan kelayakan proyek, ruang lingkup, atau arsitektur teknis.',
      chatBtn: 'Mulai Chat WhatsApp',
      defaultMsg: 'Halo Inalabs Indonesia, kami ingin berkonsultasi mengenai proyek rekayasa digital / sistem AI.',
    },
    projectDetail: {
      backToProjects: 'Kembali ke Semua Proyek',
      engagementPartner: 'Mitra Kolaborasi',
      defaultPartner: 'Mitra Enterprise Inalabs',
      timeline: 'Durasi / Linimasa',
      defaultTimeline: '8 - 12 Minggu',
      techLibraries: 'Teknologi & Library:',
      visitLive: 'Kunjungi Solusi Langsung',
      requestSimilar: 'Konsultasi Proyek Serupa',
      demoDisclaimer:
        'Studi Kasus Demonstrasi: Menggambarkan standar arsitektur dan kapabilitas implementasi Inalabs Indonesia.',
      challengeBadge: 'TANTANGAN',
      challengeTitle: 'Tantangan & Batasan Masalah',
      solutionBadge: 'SOLUSI TEKNIS',
      solutionTitle: 'Implementasi Arsitektur',
      resultsBadge: 'DAMPAK & HASIL',
      resultsTitle: 'Hasil Rekayasa & Pencapaian',
      exploreMore: 'Jelajahi Studi Kasus Lainnya',
      published: 'Dipublikasikan',
    },
  },
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      initiateProject: 'Initiate Project',
      toggleThemeLight: 'Light Mode',
      toggleThemeDark: 'Dark Mode',
      switchLang: 'Switch Language',
    },
    hero: {
      kickerStudio: 'Digital Product Studio',
      kickerLocation: 'Jakarta • Tokyo R&D',
      titleMain: 'Building Digital Products',
      titleHighlight: 'That Matter.',
      description:
        'Inalabs Indonesia designs and develops digital platforms, software systems, and AI-powered solutions for ambitious businesses.',
      startProject: 'Start a Project',
      selectedProjects: 'Selected Projects',
      metricsProjects: 'Projects',
      metricsIndustries: 'Industries',
      metricsYears: 'Years',
      metricsYearsLabel: 'Building Products',
      sculptureBadge: 'FIG. 01 // KINETIC CORE',
      sculptureStatus: 'ONLINE',
      sculptureTitle: 'Innovation Laboratory',
      sculptureDesc: 'R&D Protocol • Synthetic Spatial Lattice',
      sculptureSys: 'INA-SYS // 2026',
    },
    about: {
      kicker: '[ 01 — STUDIO MANIFESTO ]',
      title1: 'Technology meets',
      title2: 'creativity.',
      story1:
        'Inalabs Indonesia is a digital engineering studio helping organizations transform ideas into scalable digital experiences.',
      story2:
        'We operate at the intersection of deep systems architecture and expressive sensory interface design. Rather than relying on boilerplate templates, we construct tailored digital assets with uncompromising engineering standards and quiet confidence.',
      badgeStudio: 'INDEPENDENT STUDIO',
      badgeLocation: 'EST. 2021 • JAKARTA',
      capabilitiesTitle: 'Core Capabilities',
      capabilitiesSub: '[ SYSTEMS × CREATIVE ]',
      capabilities: [
        {
          index: '01',
          title: 'Tools Automation',
          description:
            'Digital workflow automation, custom bots, API integrations, and tailored operational tools designed to eliminate manual bottlenecks.',
        },
        {
          index: '02',
          title: 'Web Company Profile',
          description:
            'Modern, interactive, responsive, and elegant company profile websites engineered to elevate your business credibility and brand presence.',
        },
        {
          index: '03',
          title: 'Design Graphic',
          description:
            'Visual identity systems, promotional creative assets, brand design, and high-impact graphic design tailored for standout brand perception.',
        },
        {
          index: '04',
          title: 'Content AI',
          description:
            'AI-powered content generation pipelines, strategic copywriting, generative visual assets, and scalable content personalization for digital marketing.',
        },
      ],
    },
    services: {
      kicker: '[ 02 — EXPERTISE ]',
      title1: 'Engineered with',
      title2: 'obsessive rigor.',
      subtitle:
        'Four core disciplines united under one studio roof to transform complex challenges into effortless digital reality.',
      items: [
        {
          number: '01',
          title: 'AI & Automation',
          headline: 'Building intelligent workflows and business systems.',
          description:
            'We architect autonomous multi-agent pipelines, custom vector search indexing, and automated enterprise decision loops that turn raw data into strategic execution.',
          technologies: ['Autonomous Agents', 'Vector Search', 'LangGraph', 'Enterprise RLS', 'Python'],
          colSpan: 'lg:col-span-7',
        },
        {
          number: '02',
          title: 'Digital Products',
          headline: 'Web platforms and enterprise applications.',
          description:
            'Production-ready web applications built on modern frameworks, designed to handle high concurrency with zero layout shift and instant state reconciliation.',
          technologies: ['Next.js App Router', 'React 19', 'TypeScript', 'GraphQL', 'Edge Runtime'],
          colSpan: 'lg:col-span-5',
        },
        {
          number: '03',
          title: 'Experience Design',
          headline: 'Interfaces that people enjoy using.',
          description:
            'Design systems crafted with obsessive attention to typographic hierarchy, micro-interactions, accessibility, and visual restraint.',
          technologies: ['Design Tokens', 'Spatial UX', 'Sensory Motion', 'Figma Systems', 'Human-Centric'],
          colSpan: 'lg:col-span-5',
        },
        {
          number: '04',
          title: 'Engineering',
          headline: 'Reliable scalable technology infrastructure.',
          description:
            'Distributed microservices, zero-trust cloud orchestration, high-throughput message brokers, and database partitioning built for 99.99% uptime.',
          technologies: ['Distributed Go', 'PostgreSQL / pgvector', 'Redis', 'Docker', 'Event Streams'],
          colSpan: 'lg:col-span-7',
        },
      ],
    },
    portfolio: {
      kicker: '[ 03 — PORTFOLIO ]',
      title: 'Selected Projects',
      filters: {
        all: 'All',
        toolsAutomation: 'Tools Automation',
        webCompanyProfile: 'Web Company Profile',
        designGraphic: 'Design Graphic',
        contentAI: 'Content AI',
      },
      featuredBadge: 'FEATURED PROJECT // 2026',
      yearStack: 'Year / Stack',
    },
    trust: {
      kicker: '[ 04 — REPUTATION ]',
      title: 'Trusted by teams building the future.',
      subtitle: 'ENGINEERED UNDER RIGID ENTERPRISE STANDARDS',
      sectorPrefix: 'SECTOR',
      sectors: [
        { name: 'Fintech & Digital Banking', location: 'Singapore / Jakarta' },
        { name: 'Autonomous AI Protocols', location: 'Tokyo R&D' },
        { name: 'Cloud Infrastructure & SOC', location: 'APAC Distributed' },
        { name: 'High-Throughput Supply Systems', location: 'Southeast Asia' },
        { name: 'Composable Enterprise Platforms', location: 'Global' },
      ],
    },
    contact: {
      kicker: '[ 05 — INITIATE ]',
      title1: 'Have a project',
      title2: 'in mind?',
      description:
        'We collaborate with visionary founders and enterprise leaders to craft transformative digital products. Let us know how we can bring your ambitions to life.',
      generalInquiries: 'General Inquiries',
      directLine: 'Direct Line / WhatsApp',
      studioHQ: 'Studio Headquarters',
      studioHQValue: 'Jl. Raya Kalibata 2-9, RT.1, Rawajati, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12750',
      nameLabel: 'Your Name *',
      namePlaceholder: 'Kenji Sato / Sarah Jenkins',
      emailLabel: 'Work Email *',
      emailPlaceholder: 'name@company.com',
      scopeLabel: 'Project Scope',
      scopeOptions: [
        { value: 'Tools Automation', label: 'Tools Automation & Workflow Optimization' },
        { value: 'Web Company Profile', label: 'Web Company Profile & Business Portals' },
        { value: 'Design Graphic', label: 'Design Graphic & Visual Identity' },
        { value: 'Content AI', label: 'Content AI & Generative Marketing' },
      ],
      messageLabel: 'Project Overview',
      messagePlaceholder: 'Tell us about your objectives, timeline, and current technical context...',
      submitBtn: 'Send Inquiry',
      submittingBtn: 'Transmitting Brief...',
      inquiryReceived: '[ INQUIRY RECEIVED ]',
      thankYou: 'Thank you for reaching out.',
      thankYouDesc:
        'Our engineering team has received your brief. We will review your requirements and respond within 24 business hours.',
      sendAnother: 'Send another inquiry →',
    },
    footer: {
      brandDesc:
        'Digital product studio engineered for high-growth enterprises and ambitious founders. Software systems, interfaces, and intelligent automation.',
      studioIndex: 'Studio Index',
      idxAbout: '01 // About Studio',
      idxServices: '02 // Disciplines & Services',
      idxProjects: '03 // Selected Projects',
      idxContact: '04 // Contact & Inquiries',
      comms: 'Communications',
      allRightsReserved: 'All rights reserved.',
      colophon: 'MINIMAL FUTURISTIC DIGITAL STUDIO • 2026 EDITION',
    },
    whatsappCTA: {
      lineTitle: 'Direct Studio Line',
      lineDesc:
        'Connect directly with an engineering director to discuss project viability, scopes, or technical architectures.',
      chatBtn: 'Start Direct Chat',
      defaultMsg: 'Hello Inalabs Indonesia, we would like to discuss a digital engineering / AI product project.',
    },
    projectDetail: {
      backToProjects: 'Back to All Projects',
      engagementPartner: 'Engagement Partner',
      defaultPartner: 'Inalabs Enterprise Partner',
      timeline: 'Duration / Timeline',
      defaultTimeline: '8 - 12 Weeks',
      techLibraries: 'Technologies & Libraries:',
      visitLive: 'Visit Live Solution',
      requestSimilar: 'Request Similar Project',
      demoDisclaimer:
        'Demonstration Case Study: Illustrates Inalabs Indonesia architectural standards and implementation capability.',
      challengeBadge: 'THE CHALLENGE',
      challengeTitle: 'Problem & Constraints',
      solutionBadge: 'THE SOLUTION',
      solutionTitle: 'Architectural Implementation',
      resultsBadge: 'DELIVERY IMPACT',
      resultsTitle: 'Engineered Results & Milestones',
      exploreMore: 'Explore More Case Studies',
      published: 'Published',
    },
  },
};
