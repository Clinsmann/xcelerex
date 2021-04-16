export interface JWTSignPayload {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  role: string;
  jobTitle?: string;
  institution?: string;
  profileImage?: any;
  agreeToTerms: boolean;
  getUpdates?: boolean;
  isActivated?: boolean;
  token?: string;
  [key: string]: any;
}
