"use server";
import nodemailer from "nodemailer";

// Create the transporter ONCE and reuse it (Singleton pattern)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

export async function sendEmail(formData: FormData) {
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("textarea") || "No message provided",
    budget: formData.get("budget"),
  };

const htmlContent = `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #000000; -webkit-font-smoothing: antialiased;">

    <div style="border-bottom: 1px solid #000000; padding-bottom: 30px; margin-bottom: 40px;">
      <p style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: #999999; margin: 0 0 10px 0;">Transmission // 01</p>
      <h1 style="font-size: 32px; font-weight: 400; letter-spacing: -0.03em; margin: 0;">New Inquiry.</h1>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 40px;">
      <tr>
        <td width="100%" colspan="2" valign="top" style="padding-bottom: 40px;">
          <p style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #999999; margin: 0 0 10px 0;">Client</p>
          <p style="font-size: 42px; font-weight: 500; letter-spacing: -0.04em; margin: 0; line-height: 1;">${data.name}</p>
        </td>
      </tr>
      <tr>
        <td width="50%" valign="top" style="border-top: 1px solid #e5e5e5; padding-top: 20px; padding-right: 20px;">
          <p style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #999999; margin: 0 0 10px 0;">Contact</p>
          <p style="font-size: 14px; margin: 0 0 4px 0; font-weight: 500; color: #000000;">${data.email}</p>
          <p style="font-size: 14px; color: #666666; margin: 0;">${data.phone}</p>
        </td>
        <td width="50%" valign="top" style="border-top: 1px solid #e5e5e5; border-left: 1px solid #e5e5e5; padding-top: 20px; padding-left: 20px;">
          <p style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #999999; margin: 0 0 10px 0;">Budget Estimate</p>
          <p style="font-size: 14px; margin: 0; font-weight: 500; color: #000000;">$${data.budget}</p>
        </td>
      </tr>
    </table>

    <div style="border-top: 1px solid #000000; padding-top: 30px; margin-bottom: 50px;">
      <p style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #999999; margin: 0 0 15px 0;">Project Brief</p>
      <p style="font-size: 18px; line-height: 1.6; color: #111111; margin: 0; font-weight: 400;">
        ${data.message}
      </p>
    </div>

    <div style="border-top: 1px solid #e5e5e5; padding-top: 20px;">
      <p style="font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #cccccc; margin: 0;">Portfolio v2 &copy; Server Action</p>
    </div>

  </div>
`;

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: "mayanshbangali49@gmail.com", 
      replyTo: data.email as string,
      subject: `Brief: ${data.name} — ${data.budget}`,
      html: htmlContent,
    });
    return { success: true };
  } catch (error) {
    console.error("Mail Error:", error);
    return { success: false };
  }
}