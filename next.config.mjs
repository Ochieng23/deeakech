/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          port: "",
          pathname: "/**",
        },
        {
            protocol: "https",
            hostname: "img.youtube.com",
            port: "",
            pathname: "/**",
          },
        
      ],
    },
  };
  
  export default nextConfig;
  