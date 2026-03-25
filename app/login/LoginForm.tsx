"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, LoaderCircle } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/app/components/ui/button";
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_36%),linear-gradient(135deg,_#020617,_#0f172a_55%,_#111827)] px-4 py-10 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/6 shadow-[0_32px_120px_rgba(15,23,42,0.45)] backdrop-blur xl:grid-cols-[1.1fr_0.9fr]">
          <section className="hidden border-r border-white/10 bg-white/6 p-10 xl:block">
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  QuoteHub admin
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-white">
                    Gerencie pedidos de orçamentos.
                  </h1>
                  <p className="max-w-lg text-lg leading-8 text-slate-300">
                    O site continua publico para receber novos pedidos, enquanto
                    o painel admin fica acessivel apenas para usuarios
                    autenticados.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                    Fluxo
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    Login, painel, resposta
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                    Base
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    Quotes + messages
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-200">
                  <LockKeyhole className="h-4 w-4" />
                  Acesso restrito
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white">
                    Entrar no painel
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Use um usuario ja criado no Supabase Auth para acessar o
                    painel de orcamentos.
                  </p>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30"
                    placeholder="admin@empresa.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200" htmlFor="password">
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30"
                    placeholder="Sua senha"
                    autoComplete="current-password"
                    required
                  />
                </div>

                {errorMessage ? (
                  <p className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                    {errorMessage}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                  disabled={isSubmitting}
                >
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

              <p className="text-sm leading-7 text-slate-400">
                O restante do site continua publico em{" "}
                <Link className="text-cyan-300 hover:text-cyan-200" href="/">
                  /
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
