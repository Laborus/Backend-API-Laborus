const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
// const crypto = require("crypto");

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// OTP code

// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };

// const otpCode = generateOTP();

const msg = {
  to: "mma.murilo@gmail.com",
  from: {
    name: "Laborus",
    email: process.env.FROM_MAIL,
  },
  templateId: process.env.TEMPLATE_MAIL_ID,
  //   dynamicTemplateData: {
  //     code: `Seu código: ${otpCode}`,
  //   },
};

const sendMailer = async () => {
  try {
    await sgMail.send(msg);
    console.log("E-mail enviado com sucesso.");
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("Erro de envio de e-mail");
    }
  }
};

sendMailer();
