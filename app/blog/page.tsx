import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import BlogPageClient from './BlogPageClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Dental Health Tips & Guides | Faisal's Dental Care Dhaka",
  description:
    "Read expert dental health articles by Dr. Faisal — prosthodontist with 28 years of experience in Gulshan, Dhaka. Tips on implants, braces, and oral care.",
  openGraph: {
    title: "Dental Health Tips & Guides | Faisal's Dental Care Dhaka",
    description:
      "Read expert dental health articles by Dr. Faisal — prosthodontist with 28 years of experience in Gulshan, Dhaka. Tips on implants, braces, and oral care.",
    url: 'https://faisalsdentalcare.com/blog',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Dental Health Blog by Dr. Faisal — Gulshan-1, Dhaka",
      },
    ],
  },
  alternates: {
    canonical: 'https://faisalsdentalcare.com/blog',
  },
}

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return <BlogPageClient initialPosts={posts || []} />
}
