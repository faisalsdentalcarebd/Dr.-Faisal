import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://faisalsdentalcare.com' : 'http://localhost:3001'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
