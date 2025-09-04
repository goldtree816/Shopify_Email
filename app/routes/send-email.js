import { json } from "@remix-run/node";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const action = async ({ request }) => {
  try {
    const body = await request.json();
    const { to, subject, html } = body;
    const msg = {
      to,
      from: process.env.SENDGRID_FROM, 
      subject,
      html,
    };
    await sgMail.send(msg);
    return json({ success: true });
  } catch (error) {
    console.error("SendGrid Error:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
};
