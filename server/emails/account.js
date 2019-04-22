const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'digantpatel92@gmail.com',
    subject: 'Welcome to the App!',
    text: `Hola, great to see you! ${name}`
  })
}

const sendGoodByeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'digantpatel92@gmail.com',
    subject: 'Sorry  to hear, you are no longer linked with our app!',
    text: `${name}, can you please share the reason of leaving?`
  })
}

module.exports = {sendWelcomeEmail, sendGoodByeEmail};