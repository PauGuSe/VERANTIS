
export interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface AuditItem {
  name: string;
  description: string;
}

export enum SectionId {
  HERO = 'hero',
  SERVICES = 'services',
  AUDITS = 'audits',
  ABOUT = 'about',
  CONTACT = 'contact'
}
