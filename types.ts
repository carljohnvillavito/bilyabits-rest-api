export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiItem {
  id: string;
  method: ApiMethod;
  name: string;
  route: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  apis: ApiItem[];
}
