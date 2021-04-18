export interface JWTSignPayload {
  firstName: string;
  lastName: string;
  email: string;
  isActivated?: boolean;
  token?: string;
  [key: string]: any;
}
