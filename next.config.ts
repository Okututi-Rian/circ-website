import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  // Use the compiler API because the CLI subprocess returns empty --showConfig
  // output in this build environment.
  experimental: {
    useTypeScriptCli: false,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
