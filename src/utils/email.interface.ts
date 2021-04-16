export interface EmailFormat {
  to: string;
  form?: string;
  subject: string;
  template?: string;
  [name: string]: string;
}
