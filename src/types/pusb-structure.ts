export interface Role {
  id: string;
  parent_id: number;
  level: number;
  name: string;
  status: string;
  highlight: string;
  description: string;
}

export interface RoleRequest {
  parent_id: number;
  level: number;
  name: string;
  highlight: string;
  description: string;
}
