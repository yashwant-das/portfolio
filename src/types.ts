export interface Experience {
  role: string;
  company: string;
  period: string;
  logo?: string;
  highlights?: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  live?: string;
  code?: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export interface Certification {
  name: string;
  organization: string;
  logo?: string;
  credentialUrl?: string;
}

export interface PortfolioData {
  avatar?: string;
  name?: string;
  subtitle?: string;
  email?: string;
  website?: string;
  resume?: string;
  about?: string;
  heroSummary?: string;
  socials?: Record<string, string>;
  experience?: Experience[];
  projects?: Project[];
  skills?: Record<string, string[]> | string[];
  education?: Education[];
  certifications?: Certification[];
}
