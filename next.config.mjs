/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.joinsafelink.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "joinsafelink.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
