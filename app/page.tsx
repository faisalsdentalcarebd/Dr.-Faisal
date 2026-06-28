import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import Services from '@/components/Services'
import CostCalculator from '@/components/CostCalculator'
import WhyChoose from '@/components/WhyChoose'
import VideoSection from '@/components/VideoSection'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import BookingForm from '@/components/BookingForm'
import FAQ from '@/components/FAQ'
import Gallery from '@/components/Gallery'
import BeforeAfter from '@/components/BeforeAfter'

export const metadata: Metadata = {
  title: "Prosthodontist in Gulshan Dhaka | Faisal's Dental Care",
  description:
    "Expert Crown, Bridge & Dental Implant specialist in Gulshan-1, Dhaka. 28 years · FICD Fellow (USA). Book your appointment at Faisal's Dental Care.",
  keywords: [
    'dentist Gulshan', 'dentist near me Gulshan', 'dentist nearby Dhaka',
    'dental clinic Gulshan-1', 'dr faisal dentist', 'prosthodontist Dhaka',
    'dental implant specialist Gulshan', 'crown and bridge Dhaka',
    'FICD dentist Bangladesh', "Faisal's Dental Care",
    'fixed orthodontics Dhaka', 'root canal Gulshan',
  ],
  openGraph: {
    title: "Prosthodontist in Gulshan Dhaka | Faisal's Dental Care",
    description:
      "Expert Crown, Bridge & Dental Implant specialist in Gulshan-1, Dhaka. 28 years · FICD Fellow (USA). Book your appointment at Faisal's Dental Care.",
    url: 'https://faisalsdentalcare.com',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: "Faisal's Dental Care" }],
  },
  alternates: { canonical: 'https://faisalsdentalcare.com' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Services />
      <CostCalculator />
      <WhyChoose />
      <VideoSection />
      <About />
      <Testimonials />
      <Blog />
      <BookingForm />
      <FAQ />
      <Gallery />
      <BeforeAfter />
    </>
  )
}
