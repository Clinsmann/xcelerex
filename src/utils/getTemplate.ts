import { activateAccount, accountActivated, resetPassword } from './templates';

export type TokenTypes = 'ACCOUNT_ACTIVATION' | 'PASSWORD_RESET';
export interface EmailPayloadData {
  to: string;
  from: string;
  subject: string;
  template: string;
  [name: string]: string;
}

export interface EmailPayload {
  type: string;
  token?: string;
  data: EmailPayloadData | any;
}

export const getEmailPayload = ({ type, token = null, data }: EmailPayload) => {
  const payload = {
    appName: process.env.APP_NAME,
    userName: `${data.firstName} ${data.lastName}`
  };

  switch (type) {
    case 'ACCOUNT_ACTIVATION':
      return {
        to: data.email,
        from: process.env.EMAIL_SENDER,
        subject: 'ACCOUNT ACTIVATION',
        template: activateAccount({
          ...payload,
          activationUrl: `${process.env.FRONTEND_HOST}/activate-account/${token}`,
        })
      };

    case 'ACCOUNT_ACTIVATED':
      return {
        to: data.email,
        from: process.env.EMAIL_SENDER,
        subject: 'ACOUNT ACTIVATION SUCCESSFUL',
        template: accountActivated(payload)
      }

    case 'PASSWORD_RESET':
      return {
        to: data.email,
        from: process.env.EMAIL_SENDER,
        subject: 'RESET PASSWORD',
        template: resetPassword({
          ...payload,
          passwordResetUrl: `${process.env.FRONTEND_HOST}/reset-password/${token}`
        })
      }
  }
}
