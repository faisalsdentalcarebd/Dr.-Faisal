import type { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: "Dental Services Gulshan Dhaka | Faisal's Dental Care",
  description:
    "Crown & Bridge, Dental Implants, Fixed Orthodontics, Root Canal & more — specialist dental services at Faisal's Dental Care, Gulshan-1, Dhaka.",
  openGraph: {
    title: "Dental Services Gulshan Dhaka | Faisal's Dental Care",
    description:
      "Crown & Bridge, Dental Implants, Fixed Orthodontics, Root Canal & more — specialist dental services at Faisal's Dental Care, Gulshan-1, Dhaka.",
    url: 'https://faisalsdentalcare.com/services',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Dental Services at Faisal's Dental Care, Gulshan-1, Dhaka",
      },
    ],
  },
  alternates: {
    canonical: 'https://faisalsdentalcare.com/services',
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
