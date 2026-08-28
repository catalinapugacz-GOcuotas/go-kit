import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { login, signup } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresá con tu email y contraseña, o creá una cuenta nueva.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">
                {decodeURIComponent(error)}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <Button formAction={login} type="submit" className="w-full">
                Ingresar
              </Button>
              <Button
                formAction={signup}
                type="submit"
                variant="outline"
                className="w-full"
              >
                Crear cuenta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
