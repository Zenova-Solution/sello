import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1]
const shouldUseRepoBasePath =
  process.env.NODE_ENV === "production" &&
  !!repoName &&
  !repoName.endsWith(".github.io")

const rawBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : shouldUseRepoBasePath
      ? `/${repoName}`
      : "";

const basePath = rawBasePath === "/" ? "" : (rawBasePath || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
};

export default nextConfig;
