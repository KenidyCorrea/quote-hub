import { NextResponse } from "next/server";

import { sendReplyEmail } from "@/app/lib/resend";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

type ReplyRequestBody = {
  message?: string;
  quoteId?: string;
};

function buildReplyEmailText(name: string, message: string) {
  return [
    `Oi, ${name}.`,
    "",
    "Recebemos sua solicitacao e estamos respondendo abaixo:",
    "",
    message,
    "",
    "Se precisar complementar algo, basta responder este e-mail.",
  ].join("\n");
}

function buildReplyEmailHtml(name: string, message: string) {
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return [
    `<div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">`,
    `<p>Oi, ${safeName}.</p>`,
    "<p>Recebemos sua solicitacao e estamos respondendo abaixo:</p>",
    `<p>${safeMessage}</p>`,
    "<p>Se precisar complementar algo, basta responder este e-mail.</p>",
    "</div>",
  ].join("");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nao autenticado." }, { status: 401 });
  }

  const body = (await request.json()) as ReplyRequestBody;
  const quoteId = body.quoteId?.trim();
  const message = body.message?.trim();

  if (!quoteId || !message) {
    return NextResponse.json(
      { error: "quoteId e message sao obrigatorios." },
      { status: 400 },
    );
  }

  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .select("id, name, email")
    .eq("id", quoteId)
    .single();

  if (quoteError || !quote) {
    return NextResponse.json(
      { error: quoteError?.message ?? "Quote nao encontrado." },
      { status: 404 },
    );
  }

  const { data: insertedMessage, error: insertError } = await supabase
    .from("quote_messages")
    .insert({
      message,
      quote_id: quote.id,
      user_id: user.id,
    })
    .select("id, quote_id, user_id, message, created_at")
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  const nextUpdatedAt = new Date().toISOString();
  const { error: statusError } = await supabase
    .from("quotes")
    .update({
      status: "answered",
      updated_at: nextUpdatedAt,
    })
    .eq("id", quote.id);

  let emailError: string | null = null;

  try {
    await sendReplyEmail({
      html: buildReplyEmailHtml(quote.name, message),
      replyTo: user.email ?? undefined,
      subject: "Resposta ao seu pedido de orcamento",
      text: buildReplyEmailText(quote.name, message),
      to: quote.email,
    });
  } catch (error) {
    emailError = error instanceof Error ? error.message : "Falha ao enviar e-mail.";
  }

  return NextResponse.json({
    data: insertedMessage,
    emailError,
    statusError: statusError?.message ?? null,
    updatedAt: nextUpdatedAt,
  });
}
