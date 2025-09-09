export interface User {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  role_name?: string;
}