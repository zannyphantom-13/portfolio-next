/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Google user profile pictures (for Supabase Google OAuth)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Supabase storage
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    // Allow unoptimized external images to fall back gracefully
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
