import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Phone } from 'lucide-react'
import { services } from '@/lib/data'
import BookingForm from '@/components/BookingForm'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://faisalsdentalcare.com/services/${params.slug}`,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${service.title} at Faisal's Dental Care, Gulshan-1, Dhaka`,
        },
      ],
    },
    alternates: {
      canonical: `https://faisalsdentalcare.com/services/${params.slug}`,
    },
  }
}

export default function ServicePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  const otherServices = services.filter((s) => s.slug !== params.slug).slice(0, 3)

  return (
    <div className="pt-20 page-enter">
      {/* Hero */}
      <section className="relative py-20 bg-dental-heading overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors duration-200">
            <ArrowLeft size={14} />
            Back to Services
          </Link>
          <div className="max-w-2xl">
            <span className="section-label !text-white !bg-white/15 !border-white/25 mb-4">{service.number}/ Service</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              {service.title}
            </h1>
            <p className="text-white/70 leading-relaxed mb-8">{service.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Book This Service →</Link>
              <a href="tel:01817102030" className="btn-outline flex items-center gap-2">
                <Phone size={15} />
                Call: 01817-102030
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Image
                src={service.image}
                alt={service.alt}
                width={600}
                height={420}
                className="rounded-3xl object-cover w-full h-[400px] shadow-card-hover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-dental-heading">
                About {service.title} at Faisal&apos;s Dental Care
              </h2>
              <p className="text-dental-body leading-relaxed">{service.description}</p>
              <div className="space-y-3">
                {[
                  'Performed by Dr. Faisal — FICD Fellow, 28 years of experience',
                  'International-standard techniques from Spain, India & Thailand',
                  'Specialist-level care in a modern clinical environment',
                  'Convenient location at Niketan, Gulshan-1, Dhaka',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle size={17} className="text-dental-blue flex-shrink-0 mt-0.5" />
                    <span className="text-dental-body text-sm">{point}</span>
                  </div>
                ))}
              </div>
              <div className="glass-blue rounded-2xl p-5">
                <div className="font-semibold text-dental-heading text-sm mb-1">Consulting Hours</div>
                <div className="text-dental-body text-sm">4:00 PM – 8:00 PM · Saturday – Thursday</div>
                <div className="text-dental-body text-sm">Friday: By Appointment Only</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-dental-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dental-heading mb-8">Other Services</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group bg-white rounded-2xl border border-dental-border p-5 hover:border-dental-blue hover:shadow-glass transition-all duration-300">
                <span className="service-number text-xs">{s.number}/</span>
                <h3 className="font-bold text-dental-heading text-sm mt-1 group-hover:text-dental-blue transition-colors duration-200">{s.shortTitle}</h3>
                <p className="text-dental-body text-xs mt-1 line-clamp-2">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingForm />
    </div>
  )
}
