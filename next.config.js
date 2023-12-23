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
                hostname: 'ctoperadora.s3.amazonaws.com'
            }
        ],
    },
}

module.exports = nextConfig
