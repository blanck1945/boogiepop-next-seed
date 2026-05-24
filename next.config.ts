import type { NextConfig } from 'next'

const rawBasePath = process.env.NEXT_BASE_PATH?.trim() ?? ''
const basePath =
  rawBasePath === '' || rawBasePath === '/'
    ? undefined
    : `/${rawBasePath.replace(/^\/+|\/+$/g, '')}`

const nextConfig: NextConfig = {
  output: 'standalone',
  ...(basePath ? { basePath } : {}),
}

export default nextConfig
