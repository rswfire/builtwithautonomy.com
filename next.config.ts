import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["builtwithautonomy.local"],
    reactCompiler: true,
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
};

export default nextConfig;
