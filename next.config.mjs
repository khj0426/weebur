/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_CDN_IMAGE_HOST_NAME,
        port: "",
        pathname: "/product-images/**",
      },
    ],
  },
};

export default nextConfig;
