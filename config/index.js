import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  password: process.env.PASSWORD,
  domain: process.env.DOMAIN,
  verificationEmail: process.env.VERIFICATION_EMAIL,
  sendgrid: {
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL,
  },
};
