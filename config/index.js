import dotenv from 'dotenv';
dotenv.config();

console.log(process.env);

export default {
  port: process.env.PORT,
  sendgrid: {
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL,
  },
};
