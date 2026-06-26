import type { Metadata } from 'next'
import BookingForm from '@/components/BookingForm'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: "Contact Faisal's Dental Care | Gulshan-1, Dhaka",
  description:
    "Book an appointment at Faisal's Dental Care, Niketan, Gulshan-1, Dhaka. Call 01817-102030 or book online. Available Sat–Thu, 4 PM–8 PM.",
  openGraph: {
    title: "Contact Faisal's Dental Care | Gulshan-1, Dhaka",
    description:
      "Book an appointment at Faisal's Dental Care, Niketan, Gulshan-1, Dhaka. Call 01817-102030 or book online. Available Sat–Thu, 4 PM–8 PM.",
    url: 'https://faisalsdentalcare.com/contact',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Book an appointment at Faisal's Dental Care, Gulshan-1, Dhaka",
      },
    ],
  },
  alternates: {
    canonical: 'https://faisalsdentalcare.com/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-20 page-enter">
      <div className="py-12 bg-dental-alt text-center">
        <span className="section-label mb-4">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-dental-heading mt-2">
          Book Your <span className="gradient-text">Appointment</span>
        </h1>
        <p className="text-dental-body mt-3 max-w-md mx-auto">
          We confirm appointments within 2 hours. Available Saturday–Thursday, 4:00 PM – 8:00 PM at Niketan, Gulshan-1, Dhaka.
        </p>
      </div>
      <BookingForm />
      <FAQ />
    </div>
  )
}
