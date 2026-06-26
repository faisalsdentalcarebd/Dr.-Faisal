import type { Metadata } from 'next'
import { MotionConfig } from 'framer-motion'
import './globals.css'
import SiteShell from './SiteShell'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Prosthodontist in Gulshan Dhaka | Faisal's Dental Care",
    template: "%s | Faisal's Dental Care",
  },
  description:
    "Expert Crown, Bridge & Dental Implant specialist in Gulshan-1, Dhaka. 28 years · FICD Fellow (USA). Book your appointment at Faisal's Dental Care.",
  keywords: [
    'dentist Gulshan',
    'dentist near me Gulshan',
    'dentist nearby Dhaka',
    'dental clinic Gulshan-1',
    'dr faisal dentist',
    'prosthodontist Dhaka',
    'dental implant specialist Gulshan',
    'crown and bridge Dhaka',
    'FICD dentist Bangladesh',
    "Faisal's Dental Care",
    'fixed orthodontics Dhaka',
    'root canal Gulshan',
  ],
  openGraph: {
    siteName: "Faisal's Dental Care",
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Faisal's Dental Care — Prosthodontist in Gulshan-1, Dhaka",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prosthodontist in Gulshan Dhaka | Faisal's Dental Care",
    description:
      "Expert Crown, Bridge & Dental Implant specialist in Gulshan-1, Dhaka. 28 years · FICD Fellow (USA). Book your appointment at Faisal's Dental Care.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
    shortcut: '/images/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-inter antialiased">
        <MotionConfig reducedMotion="user">
          <SiteShell>{children}</SiteShell>
        </MotionConfig>
      </body>
    </html>
  )
}
