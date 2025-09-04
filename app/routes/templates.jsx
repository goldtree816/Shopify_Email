import { json } from "@remix-run/node";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const loader = async () => {
  return null;
};


export const action = async ({ request }) => {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      html,
    });

    return json({ success: true });
  } catch (error) {
    console.error("SendGrid error:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
};
