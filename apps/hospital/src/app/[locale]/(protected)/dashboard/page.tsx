"use client";
import { RoleGuard, useLogout, useSession } from "@mywell/auth";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@mywell/ui";
import { useNotify } from "@mywell/notifications";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter, useParams } from "next/navigation";
import { APP_TITLE, REQUIRED_ROLES } from "@/config/roles";

export default function DashboardPage() {
  const session = useSession();
  const logout = useLogout();
  const notify = useNotify();
  const t = useTranslations("common");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const params = useParams<{ locale: string }>();

  const switchLocale = () => {
    const next = params.locale === "vi" ? "en" : "vi";
    router.replace(`/${next}/dashboard`);
  };

  return (
    <RoleGuard
      roles={REQUIRED_ROLES}
      fallback={<main className="p-8 text-danger">403 — {t("logout")}</main>}
    >
      <main className="mx-auto max-w-3xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>{APP_TITLE}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p>
              {t("welcome", { name: session?.displayName ?? "Guest" })}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {t("theme")}: {theme ?? "system"}
              </Button>
              <Button variant="outline" onClick={switchLocale}>
                {t("language")}: {params.locale}
              </Button>
              <Button onClick={() => notify.success("Hello", "Toast from dashboard")}>
                Toast test
              </Button>
              <Button variant="danger" onClick={() => logout()}>
                {t("logout")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </RoleGuard>
  );
}
