export interface Workplan {
  id: string;
  thumbnail: string;
  public_id: string;
  title: string;
  description: string;
  status: boolean;
}

export interface WorkplanRequest {
  thumbnail: string;
  title: string;
  description: string;
}
