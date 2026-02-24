export interface CreateNewsDTO {
  title: string;
  subtitle?: string;
  text?: string;
  category_id: number;
  client_id: number;
}

export interface GetByIdNewsDTO {
  id: number;
  title: string;
  subtitle?: string;
  text?: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  client_id: number;
}

export interface UpdateNewsDTO {
  title?: string;
  subtitle?: string;
  text?: string;
  category_id?: number;
}