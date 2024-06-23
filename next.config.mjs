// next.config.mjs
import nextPWA from "next-pwa";

// const isDev = process.env.NODE_ENV === 'development';
const isDev = false;

export default nextPWA({
  dest: "public",
  disable: isDev,
  // Other Next.js configurations can go here
});
