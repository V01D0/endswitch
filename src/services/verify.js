const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const nodemailer = require("nodemailer");

const id = nanoid(12);

const token = jwt.sign(
  {
    data: id,
  },
  "secret",
  { expiresIn: "3d" }
);

const transporter = nodemailer.createTransport({
  port: 25,
  host: "localhost",
  tls: {
    rejectUnauthorized: false,
  },
});

const mailOptions = {
  from: `endswitch@${process.env.DOMAIN}`,
  to: `${process.env.OWNER}`,
  subject: id,
  text:
    `Dear Owner,\nClick on the link in this email to verify that you are not dead.\n` +
    ` If you fail to do so within 3 days of this mail being sent to you,` +
    ` a mail will go to the recipients that you've added in the database and they will receive what you've configured endswitch to send them.`,
  html: `<p>Click on <a href="/verify/${token}">this link</a> to verify your existence.</p>`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Message sent: %s`, info.messageId);
});

const verifyToken = (t) => {
  try {
    const decoded = jwt.verify(t, "secret");
    // SUCCESS
    console.log(decoded);
  } catch (error) {
    if (error.message === "jwt expired") {
      // LATE
    }
  }
};
