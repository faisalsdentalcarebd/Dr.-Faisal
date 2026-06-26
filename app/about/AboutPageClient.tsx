'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Award, BookOpen, Clock, Globe, GraduationCap, Shield, CheckCircle, MapPin } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'

const credentials = [
  { label: 'BDS', sub: 'Dhaka Dental College, 1997', icon: GraduationCap },
  { label: 'MS (Prosthodontics)', sub: 'Bangladesh Medical University', icon: BookOpen },
  { label: 'BCS (Health)', sub: 'Bangladesh Civil Service, 2005', icon: Shield },
  { label: 'FICD', sub: 'Fellow, International College of Dentists, USA (2019)', icon: Award },
  { label: 'BMDC Reg. No.: 981', sub: 'Registered Dental Specialist', icon: CheckCircle },
  { label: '28 Years Experience', sub: 'Clinical & Academic Excellence', icon: Clock },
  { label: 'Associate Professor & HoD', sub: 'Shaheed Suhrawardy Medical College Hospital', icon: GraduationCap },
  { label: 'International Training', sub: 'India · Thailand · Spain', icon: Globe },
]

const career = [
  { role: 'Associate Professor & Head, Dept. of Prosthodontics', place: 'Shaheed Suhrawardy Medical College Hospital, Dhaka', current: true },
  { role: 'Faculty Member', place: 'Bangladesh Medical University', current: false },
  { role: 'Faculty Member', place: 'Sher-e-Bangla Medical College', current: false },
  { role: 'Faculty Member', place: 'Pioneer Dental College', current: false },
  { role: 'Faculty Member', place: 'Dhaka Dental College', current: false },
]

const training = [
  { subject: 'Dental Implants', locations: 'India, Thailand & Spain', icon: '🦷' },
  { subject: 'Fixed Orthodontics', locations: 'International Programs', icon: '⚙️' },
  { subject: 'Periodontology', locations: 'India, Thailand & Spain', icon: '🔬' },
  { subject: 'International Seminars & Symposiums', locations: 'Multiple Countries', icon: '🌍' },
]

const bioParagraphs = [
  'Dr. Sheikh Md. Shahriar Quader is one of Bangladesh\'s foremost Prosthodontists, with 28 years of distinguished clinical and academic experience in restorative dentistry, crown and bridge prosthetics, and dental implantology. Widely known as Dr. Faisal, he is the founder and principal consultant of Faisal\'s Dental Care — a specialist dental clinic serving patients in Niketan, Gulshan-1, Dhaka-1212.',
  'Dr. Faisal completed his Bachelor of Dental Surgery (BDS) at Dhaka Dental College in 1997, establishing a foundation in clinical dentistry that would grow over nearly three decades into subspecialty expertise at the highest level. He subsequently completed his postgraduate MS in Prosthodontics at Bangladesh Medical University, deepening his mastery of complex dental restorations, full-mouth rehabilitation, and prosthetic dentistry. He also holds a BCS (Health) designation, having joined the Bangladesh government health service in 2005.',
  'In 2019, Dr. Faisal was awarded fellowship by the International College of Dentists (FICD), USA — a prestigious honour granted to dental professionals who demonstrate exceptional professional achievement, ethics, and service to the community. He holds BMDC Registration Number 981.',
]

const careerParagraph = 'Alongside his private practice, Dr. Faisal currently serves as Associate Professor and Head of the Department of Prosthodontics at Shaheed Suhrawardy Medical College Hospital, Dhaka — where he supervises postgraduate dental education and contributes to the advancement of prosthodontic care in Bangladesh. He has previously served at Bangladesh Medical University, Sher-e-Bangla Medical College, Pioneer Dental College, and Dhaka Dental College.'

const trainingParagraph = 'Dr. Faisal has pursued advanced specialty training internationally — studying dental implant techniques in India, Thailand, and Spain; advanced fixed orthodontics through international training programs; and periodontology from leading institutions in India, Thailand, and Spain. He has participated in numerous international and national seminars, symposiums, and hands-on clinical programs, ensuring that his practice reflects the most current evidence-based standards in dentistry.'

const consultingParagraph = 'At Faisal\'s Dental Care, consulting hours are 4:00 PM to 8:00 PM, Saturday through Thursday. Friday appointments are available by special arrangement. To book a consultation, call 01817-102030 or use the appointment form on our website.'

/* ── Reusable animated section heading ── */
function SectionHeading({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="overflow-hidden mb-8">
      <motion.h2
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl font-bold text-dental-heading"
      >
        {children}
      </motion.h2>
    </div>
  )
}

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-dental-blue z-[9999] origin-left"
      style={{ scaleX }}
    />
  )
}

export default function AboutPageClient() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '20%'])

  return (
    <div className="pt-20 page-enter">
      <ScrollProgress />

      {/* ── Hero Section ── */}
      <section ref={heroRef} className="relative py-24 bg-dental-alt overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-dental-blue/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="section-label mb-5">About Dr. Faisal</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl font-extrabold text-dental-heading leading-tight"
                >
                  Dr. Sheikh Md. Shahriar Quader
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-dental-blue font-semibold text-lg mb-1"
              >
                BDS · MS (Prosthodontics) · BCS (Health) · FICD
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                className="text-dental-body text-sm mb-6"
              >
                Prosthodontist | Crown & Bridge Specialist | Dental Implantologist<br />
                Associate Professor & Head, Dept. of Prosthodontics<br />
                Shaheed Suhrawardy Medical College Hospital, Dhaka
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-3 glass-blue rounded-xl px-5 py-3 mb-8"
              >
                <Award size={22} className="text-dental-blue flex-shrink-0" />
                <div>
                  <div className="font-bold text-dental-heading text-sm">FICD Fellow — 2019</div>
                  <div className="text-dental-body text-xs">International College of Dentists, USA</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.52 }}
                className="flex flex-wrap gap-4"
              >
                <MagneticButton href="/contact" className="btn-primary" strength={0.25}>
                  Book Appointment →
                </MagneticButton>
                <a href="tel:01817102030" className="btn-outline-blue">
                  Call: 01817-102030
                </a>
              </motion.div>
            </div>

            {/* Doctor Photo with parallax */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
                <motion.div style={{ y: heroImgY }}>
                  <Image
                    src="/images/doctors/Dr. Faisal At his Chamber.jpeg"
                    alt="Dr. Faisal at his dental clinic in Niketan, Gulshan-1, Dhaka"
                    width={600}
                    height={700}
                    className="object-cover w-full h-[500px]"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-dental-heading/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={13} className="text-dental-blue" />
                      <span className="text-dental-heading text-xs font-semibold">Consulting at</span>
                    </div>
                    <div className="text-dental-heading font-bold text-sm">Faisal&apos;s Dental Care</div>
                    <div className="text-dental-body text-xs">House #50, Road #03, Block-B, Niketan, Gulshan-1</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Full Bio ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Education & Qualifications</SectionHeading>

          <div className="space-y-6 text-dental-body leading-relaxed text-base">
            {bioParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <div className="mt-14">
            <SectionHeading>Academic & Professional Career</SectionHeading>
            <motion.p
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-dental-body leading-relaxed text-base"
            >
              {careerParagraph}
            </motion.p>
          </div>

          <div className="mt-14">
            <SectionHeading>International Training & Fellowship</SectionHeading>
            <motion.p
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-dental-body leading-relaxed text-base"
            >
              {trainingParagraph}
            </motion.p>
          </div>

          <div className="mt-14">
            <SectionHeading>Consulting at Faisal&apos;s Dental Care, Niketan, Gulshan-1</SectionHeading>
            <motion.p
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-dental-body leading-relaxed text-base"
            >
              {consultingParagraph}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Credentials Grid ── */}
      <section className="py-20 bg-dental-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-bold text-dental-heading"
            >
              Credentials & Qualifications
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {credentials.map(({ label, sub, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 50, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-5 border border-dental-border hover:border-dental-blue hover:shadow-glass transition-all duration-300 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-dental-blue/10 flex items-center justify-center mb-3 group-hover:bg-dental-blue transition-all duration-300">
                  <Icon size={18} className="text-dental-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="font-bold text-dental-heading text-sm mb-1">{label}</div>
                <div className="text-dental-body text-xs leading-snug">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Timeline ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-bold text-dental-heading"
            >
              Academic Career
            </motion.h2>
          </div>
          <div className="relative">
            {/* Timeline line — animates in height */}
            <motion.div
              className="absolute left-5 top-0 w-0.5 bg-dental-border"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <div className="space-y-6">
              {career.map(({ role, place, current }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-6 pl-14"
                >
                  <motion.div
                    className={`absolute left-3.5 top-1.5 w-3 h-3 rounded-full border-2 ${current ? 'bg-dental-blue border-dental-blue' : 'bg-white border-dental-border'}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2, type: 'spring', bounce: 0.5 }}
                  />
                  <div className={`rounded-xl p-4 border flex-1 ${current ? 'bg-dental-booking border-dental-blue/30' : 'bg-dental-alt border-dental-border'}`}>
                    <div className={`font-semibold text-sm mb-0.5 ${current ? 'text-dental-blue' : 'text-dental-heading'}`}>
                      {role} {current && <span className="text-xs font-medium bg-dental-blue text-white px-2 py-0.5 rounded-full ml-2">Current</span>}
                    </div>
                    <div className="text-dental-body text-xs">{place}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── International Training ── */}
      <section className="py-20 bg-dental-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-bold text-dental-heading"
            >
              International Training
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {training.map(({ subject, locations, icon }, i) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, y: 50, rotateX: 15, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 border border-dental-border text-center hover:shadow-glass hover:border-dental-blue/30 transition-all duration-300 cursor-default"
              >
                <motion.div
                  className="text-3xl mb-3"
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.25, type: 'spring', bounce: 0.4 }}
                >
                  {icon}
                </motion.div>
                <div className="font-bold text-dental-heading text-sm mb-1">{subject}</div>
                <div className="text-dental-blue text-xs font-medium">{locations}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-dental-blue text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto px-4"
        >
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-bold text-white"
            >
              Ready to Meet Dr. Faisal?
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/80 mb-8"
          >
            Book your consultation at Faisal&apos;s Dental Care, Gulshan-1, Dhaka — 4:00 PM to 8:00 PM, Sat–Thu.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.42 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-dental-blue font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              Book Your Appointment →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
