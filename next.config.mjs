/** @type {import('next').NextConfig} */
const nextConfig = {
	//output: 'export',
	//basePath: '/health_stone',
	//assetPrefix: '/health_stone/',
	images: {
		unoptimized: false,
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost:3000',
				port: '3000',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'www.superherodb.com',
				port: '',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
