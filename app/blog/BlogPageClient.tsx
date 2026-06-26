'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/data'

const categoryColors: Record<string, string> = {
  'Patient Education': 'bg-blue-50 text-dental-blue border-blue-200',
  'Treatment Guide': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'Symptoms & Awareness': 'bg-amber-50 text-amber-600 border-amber-200',
  'Local Guide': 'bg-violet-50 text-violet-600 border-violet-200',
}

export default function BlogPageClient() {
  return (
    <div className="pt-20 page-enter">
      <section className="py-20 bg-dental-alt text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className="section-label mb-5">Dental Tips & Guides</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-dental-heading mb-4"
          >
            Expert Advice From{' '}
            <span className="gradient-text">Dr. Faisal&apos;s Clinic</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-dental-body"
          >
            Helpful dental health information from our specialist prosthodontist in Gulshan-1, Dhaka.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl border border-dental-border overflow-hidden shadow-sm hover:shadow-glass hover:border-dental-blue/30 transition-all duration-300"
              >
                <div className="h-1.5 bg-gradient-to-r from-dental-blue via-blue-400 to-dental-blue" />
                <div className="p-7">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border mb-4 ${categoryColors[post.category] || ''}`}>
                    <Tag size={9} />
                    {post.category}
                  </span>
                  <h2 className="font-bold text-dental-heading text-lg leading-snug mb-3 group-hover:text-dental-blue transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-dental-body text-sm leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-dental-body border-t border-dental-border pt-4 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={11} />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-dental-blue text-sm font-semibold hover:gap-3 transition-all duration-200">
                    Read Full Article <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
