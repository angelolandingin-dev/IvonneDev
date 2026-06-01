export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
}

export interface Skill {
  category: string;
  items: string[];
}
