"use strict";

const nodeMailer = require('nodemailer');

let transport = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f4762309a00d51",
      pass: "e04521f217d77e"
    }
  });



module.exports = transport;