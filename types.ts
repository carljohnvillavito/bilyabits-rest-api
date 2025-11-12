export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Parameter {
  name: string;
  type: 'string' | 'number' | 'boolean';
  description: string;
  required: boolean;
}

export interface ApiItem {
  id: string;
  method: ApiMethod;
  name: string;
  route: string;
  description: string;
  parameters?: Parameter[];
}

export interface Category {
  id: string;
  name: string;
  apis: ApiItem[];
}