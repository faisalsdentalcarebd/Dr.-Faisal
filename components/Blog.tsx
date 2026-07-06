'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/data'
import { BlogPost } from '@/lib/supabase'

const categoryColors: Record<string, string> = {
  'Patient Education': 'bg-blue-50 text-dental-blue border-blue-200',
  'Treatment Guide': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'Symptoms & Awareness': 'bg-amber-50 text-amber-600 border-amber-200',
  'Local Guide': 'bg-violet-50 text-violet-600 border-violet-200',
}

interface BlogProps {
  posts?: BlogPost[]
}

export default function Blog({ posts }: BlogProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'center center'] })
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [1.25, 1])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={sectionRef} id="blog" className="py-28 bg-dental-alt overflow-hidden" style={{ perspective: 1400 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="overflow-hidden" style={{ perspective: 1000 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label mb-4">Dental Tips & Guides</span>
            </motion.div>
            <motion.h2
              style={{ scale: headingScale, opacity: headingOpacity, transformOrigin: 'left center' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dental-heading tracking-tight leading-tight"
            >
              Expert Advice From{' '}
              <span className="gradient-text">Dr. Faisal&apos;s Clinic</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <Link href="/blog" className="inline-flex items-center gap-2 text-dental-blue font-semibold text-sm hover:gap-3 transition-all duration-200">
              View All Articles <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Blog Cards — 3D depth entrance */}
        <div className="grid md:grid-cols-3 gap-6" style={{ perspective: 1000 }}>
          {(posts && posts.length > 0 ? posts : blogPosts.slice(0, 3)).map((post: any, i) => {
            const postDate = post.date || post.created_at
            const postReadTime = post.readTime || (() => {
              if (!post.content) return '3 min read'
              const words = post.content.trim().split(/\s+/).length
              return `${Math.max(1, Math.ceil(words / 200))} min read`
            })()

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 80, rotateX: 18, scale: 0.92, z: -60 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, z: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ y: -8, scale: 1.025, transition: { duration: 0.25 } }}
                className="group bg-white rounded-2xl border border-dental-border overflow-hidden cursor-pointer shadow-sm hover:shadow-card-hover hover:border-dental-blue/30 transition-shadow duration-300"
              >
                <div className="h-1.5 bg-gradient-to-r from-dental-blue via-blue-400 to-dental-blue group-hover:from-dental-blue-dark transition-all duration-500" />

                <div className="p-6">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border mb-4 ${categoryColors[post.category || ''] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    <Tag size={9} />
                    {post.category || 'Patient Tips'}
                  </span>

                  <h3 className="font-bold text-dental-heading text-base leading-snug mb-3 group-hover:text-dental-blue transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-dental-body text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-dental-body border-t border-dental-border pt-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {new Date(postDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {postReadTime}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-dental-blue text-sm font-semibold mt-4 hover:gap-3 transition-all duration-200"
                  >
                    Read Article <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
