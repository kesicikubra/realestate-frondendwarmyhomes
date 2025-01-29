/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.jp',
          },
        ],
      },
      webpack(config){
        config.module.rules.push({
            test:/.svg$/i,
            use:["@svgr/webpack"],
        })
      
        return config
    },
    
};

export default nextConfig;
