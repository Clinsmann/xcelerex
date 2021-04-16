import { Logger } from '@nestjs/common';
import { EmailFormat } from './email.interface';

const SibApiV3Sdk = require('sib-api-v3-typescript');

export const sendEmail = async (data: EmailFormat) => {
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
  const { to, subject, html, template } = data;

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = template;
  sendSmtpEmail.to = [{ "email": to, "name": to }];
  sendSmtpEmail.headers = { "Content-Type": "application/json" };
  sendSmtpEmail.sender = { "email": process.env.SENDINBLUE_SENDER_EMAIL, name: 'NEST 360' };
  sendSmtpEmail.replyTo = { "email": process.env.SENDINBLUE_REPLY_TO_EMAIL, name: 'NEST 360' };

  apiInstance.sendTransacEmail(sendSmtpEmail).then((data: any) => {
    Logger.log(`Email Message sent: %s ${JSON.stringify(data)}`, 'SendEmailService');
  }, (error: any) => {
    Logger.log(`Error sending mail to: ${to} Error : ${JSON.stringify(error)} `, 'SendEmailService');
  });
}
