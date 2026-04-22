import type { Locale } from "./config";

type MessageDict = Record<string, unknown>;

export async function loadMessages(locale: Locale): Promise<MessageDict> {
  const [common, auth, errors] = await Promise.all([
    import(`./messages/${locale}/common.json`).then((m) => m.default),
    import(`./messages/${locale}/auth.json`).then((m) => m.default),
    import(`./messages/${locale}/errors.json`).then((m) => m.default),
  ]);
  return { common, auth, errors };
}
