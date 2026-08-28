import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-4 text-center dark:bg-black">
      <h1 className="text-3xl font-semibold tracking-tight">
        Boiler template
      </h1>
      <p className="max-w-md text-muted-foreground">
        Punto de partida del proyecto. Iniciá sesión para acceder al panel.
      </p>
      <Button render={<Link href="/login">Iniciar sesión</Link>} />
    </div>
  );
}
