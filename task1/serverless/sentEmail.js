import * as SibApiV3Sdk from '@getbrevo/brevo';

async function sendEmail(email, buffer) {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  sender = process.env['EMAIL_SENDER'];

  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env['BREVO_API_KEY'],
  );
  

  const imageBufferString = buffer.toString('base64');
  const imgDataUrl = `data:image/png;base64,${imageBufferString}`;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <h3>RPA Task1</h3>
        <p>
          <img src=${imgDataUrl} alt="screenshot_final" />
        </p>
      </body>
      </body>
    </html>
    `;
  sendSmtpEmail.params = { body, subject };
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.sender = {
    email: sender,
    name: 'RPA task1',
  };
  sendSmtpEmail.replyTo = {
    email: sender,
    name: 'RPA task1',
  };
  sendSmtpEmail.to = [{ email }];

  await this.apiInstance.sendTransacEmail(sendSmtpEmail);
}

export default sendEmail;