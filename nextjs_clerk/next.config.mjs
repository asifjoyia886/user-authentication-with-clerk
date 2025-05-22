/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/console(.*))',
          destination: '/dashboard',
          permanent: false,
        },
        {
          source: '/signin',
          destination: '/login',
          permanent: false,
        },
        {
          source: '/sing-in',  // Aapne spelling mistake kiya hai, `sing-in` → `signin`
          destination: '/login',
          permanent: false,
        },
        {
          source: '/sign-up',
          destination: '/register',
          permanent: false,
        },
        {
          source: '/signup',
          destination: '/register',
          permanent: false,
        },
      ];
    }
  };
  
  export default nextConfig;
  