import "dotenv/config";
import { createTransport } from "nodemailer";

const sendEmail = (to, subject, text) => {
  const transporter = createTransport({
    host: process.env.HOST,
    port: process.env.PORT_SMTP,
    auth: {
      user: process.env.TRANSP_USER,
      pass: process.env.SMTP_KEY_LB_ART,
    },
  });

  const mailOptions = {
    from: process.env.TRANSP_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("E-mail envoyé : " + info.response);
    }
  });
};

// Fonction pour envoyer l'e-mail de l'utilisateur et une copie
const send = (toEmail) => {
  const userMailOptions = {
    from: process.env.TRANSP_USER,
    to: toEmail,
    subject: "Contact Lise Braun",
    text: "Bonjour, merci d'avoir contacté Lise Braun Art !\n Nous vous tiendrons au courant des newsletters et promotions en cours. A très bientôt",
    html: "<p>Bonjour, merci d'avoir contacté Lise Braun Art !\n Nous vous tiendrons au courant des newsletters et promotions en cours. A très bientôt<p>",
  };

  console.log(userMailOptions);
  sendEmail(userMailOptions.to, userMailOptions.subject, userMailOptions.text);
};

export { send, sendEmail };
