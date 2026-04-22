import "../globals.css";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthProvider, type Session } from "@mywell/auth";
import { NotificationProvider } from "@mywell/notifications";
import { SocketProvider } from "@mywell/realtime";
import { ThemeProvider } from "@mywell/ui";
import { QueryProvider } from "@/providers/query-provider";

async function readSession(): Promise<Session | null> {
  const store = await cookies();
  const raw = store.get("__mywell_session")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const session = await readSession();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <QueryProvider>
              <AuthProvider initialSession={session}>
                <SocketProvider
                  url={process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4001"}
                >
                  <NotificationProvider>{children}</NotificationProvider>
                </SocketProvider>
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
