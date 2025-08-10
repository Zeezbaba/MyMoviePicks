import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "**", // matches all paths under the hostname
      },
      {
        protocol: "https",
        hostname: "static1.srcdn.com",
        port: "",
        pathname: "**", // matches all paths under the hostname
      },
      {
        protocol: "https",
        hostname: "i.guim.co.uk",
        port: "",
        pathname: "**", // matches all paths under the hostname
      },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        port: "",
        pathname: "**", // matches all paths under the hostname
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "**", // matches all paths under the hostname
      },

      

    ],
  },
  reactStrictMode: true,
};

export default withNextVideo(nextConfig);