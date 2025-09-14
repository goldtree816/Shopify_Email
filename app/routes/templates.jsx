import { json } from "@remix-run/node";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey("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");

export const loader = async () => {
  return null;
};

export const action = async ({ request }) => {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await sgMail.send({
      to,
      from: "kamalbasyal987@gmail.com",
      subject,
      html,
    });

    return json({ success: true });
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error);

    return json(
      {
        success: false,
        error: error.response?.body || { message: error.message },
      },
      { status: 500 }
    );
  }
};
