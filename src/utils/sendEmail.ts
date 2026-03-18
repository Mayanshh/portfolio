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
    <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; padding: 40px; color: #000; background-color: #fff; border: 1px solid #000;">
      <h1 style="font-size: 14px; text-transform: uppercase; letter-spacing: 3px; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 40px;">New Project Inquiry</h1>
      <div style="margin-bottom: 25px;">
        <p style="font-size: 10px; text-transform: uppercase; color: #888; margin: 0; letter-spacing: 1px;">Client</p>
        <p style="font-size: 20px; font-weight: bold; margin: 5px 0 0 0;">${data.name}</p>
      </div>
      <div style="display: flex; margin-bottom: 25px;">
        <div style="flex: 1;">
          <p style="font-size: 10px; text-transform: uppercase; color: #888; margin: 0; letter-spacing: 1px;">Email / Phone</p>
          <p style="font-size: 15px; margin: 5px 0 0 0;">${data.email} <br/> ${data.phone}</p>
        </div>
        <div style="flex: 1; padding-left: 20px; border-left: 1px solid #eee;">
          <p style="font-size: 10px; text-transform: uppercase; color: #888; margin: 0; letter-spacing: 1px;">Budget Range</p>
          <p style="font-size: 15px; margin: 5px 0 0 0;">$${data.budget}</p>
        </div>
      </div>
      <div style="margin-bottom: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 10px; text-transform: uppercase; color: #888; margin: 0; letter-spacing: 1px;">Message Brief</p>
        <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 0 0; color: #333;">${data.message}</p>
      </div>
      <p style="font-size: 9px; text-transform: uppercase; color: #ccc; margin-top: 50px;">Sent via Portfolio v2 Server Action</p>
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