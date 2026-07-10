import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Award, BookOpen, Clock, Globe, GraduationCap, Shield, Star } from 'lucide-react'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: "About Dr. Faisal — FICD Prosthodontist Dhaka",
  description:
    "Meet Dr. Sheikh Md. Shahriar Quader (Dr. Faisal) — Professor, FICD Fellow, 28 years of prosthodontic expertise in Gulshan, Dhaka.",
  openGraph: {
    title: "About Dr. Faisal — FICD Prosthodontist Dhaka",
    description:
      "Meet Dr. Sheikh Md. Shahriar Quader (Dr. Faisal) — Professor, FICD Fellow, 28 years of prosthodontic expertise in Gulshan, Dhaka.",
    url: 'https://faisalsdentalcare.com/about',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Faisal — FICD Fellow Prosthodontist, Gulshan-1, Dhaka',
      },
    ],
  },
  alternates: {
    canonical: 'https://faisalsdentalcare.com/about',
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
