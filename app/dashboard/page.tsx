import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createServerSupabase } from "@/lib/supabase/server";

import { signOut } from "../login/actions";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-4 dark:bg-black">
      <p className="text-lg">
        Sesión iniciada como <span className="font-medium">{user.email}</span>
      </p>
      <form action={signOut}>
        <Button type="submit" variant="outline">
          Cerrar sesión
        </Button>
      </form>
    </div>
  );
}
