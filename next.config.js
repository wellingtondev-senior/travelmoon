/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['travelmoon.nyc3.digitaloceanspaces.com'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'travelmoon.vercel.app'
            }
        ],
    },
}

module.exports = nextConfig
