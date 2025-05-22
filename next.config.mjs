/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/heroes',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
