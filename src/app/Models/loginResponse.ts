export interface UserInfo {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  role_name: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: UserInfo;
}