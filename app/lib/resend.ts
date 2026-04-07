type ResendEmailPayload = {
  html: string;
  replyTo?: string;
  subject: string;
  text: string;
  to: string;
};

function requireEnv(
  value: string | undefined,
  name: "RESEND_API_KEY" | "RESEND_FROM_EMAIL",
) {
  if (!value) {
    throw new Error(`Missing Resend environment variable: ${name}.`);
  }

  return value;
}

export function getResendEnv() {
  return {
    apiKey: requireEnv(process.env.RESEND_API_KEY, "RESEND_API_KEY"),
    fromEmail: requireEnv(process.env.RESEND_FROM_EMAIL, "RESEND_FROM_EMAIL"),
    replyToEmail: process.env.RESEND_REPLY_TO_EMAIL?.trim() || undefined,
  };
}

export async function sendReplyEmail(payload: ResendEmailPayload) {
  const { apiKey, fromEmail, replyToEmail } = getResendEnv();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      html: payload.html,
      reply_to: payload.replyTo ?? replyToEmail,
      subject: payload.subject,
      text: payload.text,
      to: [payload.to],
    }),
  });

  if (response.ok) {
    return;
  }

  let errorMessage = "Nao foi possivel enviar o e-mail pelo Resend.";

  try {
    const responseBody = (await response.json()) as {
      error?: { message?: string };
      message?: string;
    };

    errorMessage =
      responseBody.error?.message ?? responseBody.message ?? errorMessage;
  } catch {
    // Keep the fallback error when the response body is not JSON.
  }

  throw new Error(errorMessage);
}
