import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/docs/testing/e2e-playwright',
        destination: '/docs/testing/playwright',
        permanent: true,
      },
      {
        source: '/docs/testing/eslint-prettier',
        destination: '/docs/testing/eslint',
        permanent: true,
      },
      {
        source: '/docs/testing/git-hooks-ci',
        destination: '/docs/testing/git-hooks',
        permanent: true,
      },
      {
        source: '/docs/testing/debugging-type-checking',
        destination: '/docs/testing/type-checking',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
