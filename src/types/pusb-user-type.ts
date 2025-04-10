export interface Users {
  ministry_id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserRequest {
  ministry_id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
