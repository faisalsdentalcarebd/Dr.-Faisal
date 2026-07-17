import type { MetadataRoute } from 'next'
import { services } from '@/lib/data'
import { blogPosts } from '@/lib/data'

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://faisalsdentalcare.com' : 'http://localhost:3001'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/services`, lastModified: new Date(), priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' as const },
  ]

  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  const blogPages = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
