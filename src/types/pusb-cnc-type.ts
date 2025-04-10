export interface CNC {
  id: string;
  short_name: string;
  full_name: string;
  image: string;
  category: string;
  highlight: string;
  description: string;
  instagram: string;
  status: boolean;
}

export interface CNCRequest {
  short_name: string;
  full_name: string;
  image: string;
  category: string;
  highlight: string;
  description: string;
  instagram: string;
}

export interface WorkplanCNC {
  id: number;
  cnc_id: number;
  title: string;
  description: string;
  duration: string;
  date_parse: string;
  status: boolean;
}

export interface WorkplanCNCRequest {
  title: string;
  description: string;
  duration: string;
  date: string;
}
