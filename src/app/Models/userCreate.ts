export interface UserCreate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id?: number; // Optional, defaults to 2 (User)
}