export interface News {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  thumbnail: string;
  image: string;
  publish_date: string;
  status: boolean;
}

export interface NewsSave {
  title: string;
  category: string;
  description: string;
  content: string;
  thumbnail: string;
  image: string;
  publish_date: Date;
}
