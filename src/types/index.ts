export interface Startup {
  id: string;
  title: string;
  description: string;
  painPoints: string[];
  likes: number;
  userId: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}