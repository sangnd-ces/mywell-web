"use client";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@mywell/ui";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import { APP_TITLE } from "@/config/roles";

export default function LoginPage() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    router.replace(`/${params.locale}/dashboard`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{APP_TITLE} · {t("signIn")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input type="password" placeholder={t("password")} required />
            <Button disabled={loading} type="submit">
              {loading ? tc("loading") : t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
