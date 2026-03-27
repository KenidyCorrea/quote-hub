"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, LoaderCircle } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/app/components/ui/button";
import { loginStyles } from "@/app/hooks/use-styles";
import { createSupabaseBrowserClient } from "@/app/lib/supabase/browser";

function getSafeRedirectPath(nextPath: string | null) {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/admin";
  }

  return nextPath;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createSupabaseBrowserClient();
  const redirectTo = useMemo(
    () => getSafeRedirectPath(searchParams.get("next")),
    [searchParams],
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.replace(redirectTo);
    router.refresh();
  };

  return (
    <>
      <style>{loginStyles}</style>

      <main className="lg-root">
        <div className="lg-bg" />
        <div className="lg-noise" />

        <div className="lg-shell">
          <div className="lg-topbar">
            <div className="lg-brand">QuoteHub Admin</div>
            <Link className="lg-link" href="/">
              Voltar ao site
            </Link>
          </div>

          <section className="lg-panel">
            <div className="lg-aside">
              <div>
                <div className="lg-badge">
                  <span className="lg-badge-text">Acesso restrito</span>
                </div>

                <div className="mt-8">
                  <h2 className="lg-side-title">
                    Entre para gerenciar <em>orcamentos</em>
                  </h2>
                  <p className="lg-side-copy">
                    O site publico continua captando novos pedidos enquanto o
                    time acompanha detalhes, historico e respostas na area
                    administrativa.
                  </p>
                </div>
              </div>

              <div className="lg-points">
                <div className="lg-point">
                  <span className="lg-point-label">Fluxo</span>
                  <div className="lg-point-value">Login, painel, resposta</div>
                </div>
                <div className="lg-point">
                  <span className="lg-point-label">Base</span>
                  <div className="lg-point-value">Quotes e mensagens centralizadas</div>
                </div>
                <div className="lg-point">
                  <span className="lg-point-label">Origem</span>
                  <div className="lg-point-value">Pedidos enviados pela landing page</div>
                </div>
              </div>
            </div>

            <div className="lg-form-card">
              <div className="lg-form-head">
                <div className="lg-badge">
                  <LockKeyhole className="h-4 w-4 text-[#e6b830]" />
                  <span className="lg-badge-text">Entrar no painel</span>
                </div>
                <h2 className="lg-form-title">Acesse sua conta</h2>
                <p className="lg-form-desc">
                  Use seu e-mail e senha para continuar. Se a autenticacao for
                  concluida, voce sera redirecionado para a area administrativa.
                </p>
              </div>

              <form className="lg-form" onSubmit={handleSubmit}>
                <div className="lg-field">
                  <label className="lg-label" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="lg-input"
                    placeholder="admin@empresa.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="lg-field">
                  <label className="lg-label" htmlFor="password">
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="lg-input"
                    placeholder="Sua senha"
                    autoComplete="current-password"
                    required
                  />
                </div>

                {errorMessage ? <p className="lg-error">{errorMessage}</p> : null}

                <Button type="submit" className="lg-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>

            </div>
          </section>
        </div>
      </main>
    </>
  );
}
