export type ProjectCategory = 
  | 'Tools Automation'
  | 'Web Company Profile'
  | 'Design Graphic'
  | 'Content AI'
  | 'AI Solution'
  | 'AI Systems'
  | 'Engineering'
  | 'Digital Products'
  | 'Website Development'
  | 'Mobile Application'
  | 'Custom Software'
  | 'Digital Platform'
  | 'Branding'
  | (string & {});

export type CategoryFilter = 
  | 'All'
  | 'Tools Automation'
  | 'Web Company Profile'
  | 'Design Graphic'
  | 'Content AI'
  | string;

export interface CaseStudy {
  client?: string;
  timeline?: string;
  role?: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  isDemo?: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  category: ProjectCategory;
  project_url?: string;
  technologies: string[];
  featured: boolean;
  created_at: string;
  updated_at?: string;
  case_study?: CaseStudy;
}

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  technologies: string[];
  badge: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  review: string;
  rating: number;
  projectReference?: string;
  badge: string;
}
