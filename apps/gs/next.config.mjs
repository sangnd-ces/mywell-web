import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n-request.ts");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    "@mywell/ui",
    "@mywell/auth",
    "@mywell/api-client",
    "@mywell/realtime",
    "@mywell/i18n",
    "@mywell/notifications",
    "@mywell/validation",
    "@mywell/config",
  ],
};
export default withNextIntl(config);
