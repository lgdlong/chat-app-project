export interface TokenPayload {
  sub: string;
  username: string;
  displayName: string;
  email: string;
  phone: string;
  picUrl: string;
  status: string;
  exp: number;
  [key: string]: any;
}
