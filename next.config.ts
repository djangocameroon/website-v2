import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin({
  locales: ["en", "fr"],
  defaultLocale: "en"
});

const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8912");

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
      },
      // User-generated content (blog covers, event photos, avatars) can live on
      // arbitrary media hosts; tighten this once the production media host is known.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default withNextIntl(nextConfig);
