import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Debug environment variables
console.log("========== MAIL CONFIG ==========");
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);
console.log("=================================");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Gmail App Password
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP ERROR");
    console.error(error);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

export { transporter };

// Helper function for displaying remaining OTP time
export const formatRemainingTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return minutes > 0
    ? `${minutes}min ${seconds}s`
    : `${seconds}s`;
};