import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/app/lib/supabase/server";

import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return <LoginForm />;
}
