'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  number: string
  title: string
  description: string
  cta: string
  image: string
  alt: string
  slug: string
  delay?: number
}

export default function ServiceCard({
  number,
  title,
  description,
  cta,
  image,
  alt,
  slug,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
      className="group bg-white rounded-2xl border border-dental-border overflow-hidden cursor-pointer"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
    >
      {/* Image Container */}
      <div className="img-hover-zoom relative overflow-hidden h-48">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Number overlay */}
        <div className="absolute top-3 left-3">
          <span className="glass text-dental-blue text-xs font-bold px-3 py-1.5 rounded-lg">
            {number}/
          </span>
        </div>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dental-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="service-number mb-2">{number}/</div>
        <h3 className="text-base font-bold text-dental-heading mb-2 group-hover:text-dental-blue transition-colors duration-200 leading-snug">
          {title}
        </h3>
        <p className="text-dental-body text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        <Link
          href={`/services/${slug}`}
          className="inline-flex items-center gap-2 text-dental-blue text-sm font-semibold hover:gap-3 transition-all duration-200"
        >
          {cta.replace(' →', '')}
          <ArrowRight
            size={14}
            className="transform group-hover:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </motion.div>
  )
}
