import type { NextConfig } from "next";

const rawBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.NODE_ENV === "production" && process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
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
