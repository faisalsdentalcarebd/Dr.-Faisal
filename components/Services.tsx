'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import {
  X, Tag, HelpCircle, Calendar, CheckCircle2, Stethoscope,
  Calculator, MessageCircle, Phone, ChevronDown, Info,
  ArrowRight, Crown, Anchor, AlignCenter, Activity,
  Sparkles, Scissors, ShieldCheck, type LucideIcon,
} from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ICON_MAP: Record<string, LucideIcon> = {
  'crown-bridge-restoration': Crown,
  'dental-implants': Anchor,
  'fixed-orthodontics-braces': AlignCenter,
  'root-canal-treatment': Activity,
  'scaling-polishing': Sparkles,
  'tooth-extraction': Scissors,
  'tooth-filling-restoration': ShieldCheck,
}

// ── Types ─────────────────────────────────────────────────────────────────────
type ServiceDisplay = {
  id: string
  calcId: string
  icon: LucideIcon
  title: string
  tag: string
  price: string
  image: string
  alt: string
  shortDesc: string
  why: string
  when: string
  expect: string
  benefits: string[]
}

function mapDBService(s: {
  slug: string; name: string; tag: string; description: string
  why_needed: string; when_needed: string; benefits: string
  image_url: string; price_min: number; price_max: number; unit: string
}): ServiceDisplay {
  const priceStr = s.price_min && s.price_max
    ? `৳${s.price_min.toLocaleString('en-BD')} – ৳${s.price_max.toLocaleString('en-BD')} / ${s.unit}`
    : ''
  return {
    id: s.slug,
    calcId: s.slug,
    icon: ICON_MAP[s.slug] || Stethoscope,
    title: s.name,
    tag: s.tag || '',
    price: priceStr,
    image: s.image_url || '/images/services/1. Crown & Bridge.jpg',
    alt: s.name,
    shortDesc: s.description || '',
    why: s.why_needed || '',
    when: s.when_needed || '',
    expect: s.description || '',
    benefits: s.benefits
      ? s.benefits.split('\n').map((b: string) => b.replace(/^[•\-*]\s*/, '').trim()).filter(Boolean)
      : [],
  }
}

// ── Service Data (fallback) ────────────────────────────────────────────────────
const HARDCODED_SERVICE_DATA: ServiceDisplay[] = [
  {
    id: 'crown',
    calcId: 'crown',
    icon: Crown,
    title: 'Crown & Bridge Restoration',
    tag: 'Most Popular',
    price: '৳15,000 – ৳40,000 / unit',
    image: '/images/services/1. Crown & Bridge.jpg',
    alt: 'Crown and bridge dental restoration',
    shortDesc: 'Rebuild damaged or missing teeth with precision-crafted prosthetics matched to your natural smile.',
    why: 'Untreated damaged or missing teeth lead to bone loss, bite misalignment, and progressive deterioration of surrounding teeth. A crown or bridge halts this damage immediately.',
    when: 'When a tooth is cracked, severely decayed, broken, or missing entirely. Also recommended after root canal treatment to protect the treated tooth.',
    expect: '2–3 clinic visits. Impressions taken, temporary crown placed, final crown fitted and cemented. Minimal discomfort. Results last 10–15+ years.',
    benefits: ['Restores full chewing function', 'Natural appearance and colour match', 'Prevents further bone loss', 'Long-lasting 10–15 year lifespan'],
  },
  {
    id: 'implant',
    calcId: 'implant',
    icon: Anchor,
    title: 'Dental Implants',
    tag: 'Premium · Permanent',
    price: '৳80,000 – ৳1,50,000 / implant',
    image: '/images/services/2. Dental Implant.jpg',
    alt: 'Dental implant specialist Gulshan Dhaka',
    shortDesc: 'The gold-standard permanent solution for missing teeth — titanium root fused directly into your jawbone.',
    why: 'Unlike dentures or bridges, implants replace the tooth root itself — preserving jawbone, preventing facial sagging, and providing a lifetime solution that feels and functions like a natural tooth.',
    when: 'Recommended for any missing tooth where sufficient jawbone exists. Ideal for patients who want a permanent, maintenance-free solution without damaging adjacent teeth.',
    expect: 'Multi-stage process over 3–6 months. Implant placed, healing period, abutment fitted, final crown attached. Internationally-sourced implant systems used.',
    benefits: ['Permanent — lasts a lifetime', 'Preserves jawbone structure', 'No impact on adjacent teeth', 'Natural look and feel'],
  },
  {
    id: 'ortho',
    calcId: 'ortho',
    icon: AlignCenter,
    title: 'Fixed Orthodontics (Braces)',
    tag: 'Alignment',
    price: '৳40,000 – ৳1,00,000',
    image: '/images/services/3. Fixed Orthodontics.jpg',
    alt: 'Fixed orthodontic braces treatment Dhaka',
    shortDesc: 'Precision teeth alignment using fixed braces — correcting bite, spacing, and crowding for a perfect smile.',
    why: 'Misaligned teeth cause uneven wear, difficulty cleaning, gum disease risk, and jaw pain. Orthodontic treatment corrects these issues permanently.',
    when: 'Best started early but effective at any age. Recommended for crowded teeth, gaps, overbite, underbite, or crooked teeth.',
    expect: 'Treatment duration 12–24 months. Monthly adjustment visits. Modern brackets are smaller and more comfortable than traditional braces.',
    benefits: ['Corrects bite and alignment permanently', 'Easier to clean teeth post-treatment', 'Prevents long-term jaw issues', 'Boosts confidence with a straighter smile'],
  },
  {
    id: 'rct',
    calcId: 'rct',
    icon: Activity,
    title: 'Root Canal Treatment',
    tag: 'Pain Relief',
    price: '৳8,000 – ৳20,000 / tooth',
    image: '/images/services/4. Root Canal Treatments.jpg',
    alt: 'Root canal treatment Gulshan Dhaka',
    shortDesc: 'Save an infected or severely damaged tooth — eliminating pain and preserving your natural tooth.',
    why: 'An infected tooth pulp causes severe pain and spreads bacteria to surrounding bone if untreated. Root canal removes the infection, saves the tooth, and stops the spread.',
    when: 'When you experience severe toothache, sensitivity to hot/cold, darkened tooth, or have a confirmed pulp infection on X-ray.',
    expect: '1–2 visits. Painless under local anaesthesia. Canals cleaned, shaped, and sealed. Crown placed afterward to protect the tooth.',
    benefits: ['Eliminates severe dental pain', 'Saves your natural tooth', 'Stops infection from spreading', 'Near-painless modern procedure'],
  },
  {
    id: 'scaling',
    calcId: 'scaling',
    icon: Sparkles,
    title: 'Scaling & Polishing',
    tag: 'Hygiene · Preventive',
    price: '৳3,000 – ৳6,000 / session',
    image: '/images/services/5. Dental Scaling.jpg',
    alt: 'Professional dental scaling and cleaning',
    shortDesc: 'Professional-grade removal of plaque, tartar, and stains — the cornerstone of long-term oral health.',
    why: 'Daily brushing cannot remove calcified tartar deposits. Untreated tartar causes gum disease, tooth decay, bad breath, and eventually tooth loss.',
    when: 'Recommended every 6 months for all adults. More frequent for smokers, diabetics, or patients with existing gum disease.',
    expect: '30–45 minute session. Ultrasonic scaler removes tartar, followed by polishing paste. No anaesthesia required for most patients.',
    benefits: ['Prevents gum disease and cavities', 'Removes deep stains for brighter teeth', 'Fresh breath immediately', 'Early detection of dental issues'],
  },
  {
    id: 'extraction',
    calcId: 'extraction',
    icon: Scissors,
    title: 'Tooth Extraction',
    tag: 'Surgical',
    price: '৳3,000 – ৳8,000 / tooth',
    image: '/images/services/6. Tooth Extaction.jpg',
    alt: 'Safe tooth extraction Gulshan Dhaka',
    shortDesc: 'Safe, precise removal of severely damaged, infected, or wisdom teeth — with minimal discomfort.',
    why: 'Severely damaged, infected, or impacted teeth that cannot be saved must be removed to prevent infection spread and protect surrounding teeth.',
    when: 'When a tooth is beyond restoration, causing crowding, blocking orthodontic treatment, or when wisdom teeth are impacted.',
    expect: 'Single visit. Local anaesthesia ensures comfort. Simple extractions take minutes; surgical extractions for impacted teeth take 30–60 min.',
    benefits: ['Eliminates source of pain and infection', 'Fast healing with proper aftercare', 'Preserves surrounding tooth health', 'Wisdom tooth removal prevents future crowding'],
  },
  {
    id: 'filling',
    calcId: 'filling',
    icon: ShieldCheck,
    title: 'Tooth Filling (Restoration)',
    tag: 'Restoration',
    price: '৳2,000 – ৳8,000 / tooth',
    image: '/images/services/7. Dental Fillings.jpg',
    alt: 'Tooth coloured composite filling Dhaka',
    shortDesc: 'Repair cavities and minor chips with tooth-coloured composite fillings that blend invisibly with your smile.',
    why: 'Untreated cavities grow larger, eventually reaching the pulp and requiring root canal or extraction. Early filling is the fastest, cheapest fix.',
    when: 'As soon as a cavity is detected — the smaller it is treated, the simpler and less costly the procedure.',
    expect: 'Single visit. Decay removed, tooth cleaned, composite resin layered and shaped, hardened with UV light. Zero downtime.',
    benefits: ['Stops cavity from growing larger', 'Tooth-coloured — invisible result', 'Single appointment, fast procedure', 'Highly durable composite material'],
  },
]

// ── Inline Calculator ─────────────────────────────────────────────────────────
type CalcService = { id: string; label: string; unit: string; min: number; max: number; note: string; flat?: boolean }

const FALLBACK_CALC_SERVICES: CalcService[] = [
  { id: 'crown',      label: 'Crown & Bridge Restoration',   unit: 'unit',      min: 15000,  max: 40000,  note: 'Per tooth/unit' },
  { id: 'implant',    label: 'Dental Implant',               unit: 'implant',   min: 80000,  max: 150000, note: 'Per implant (titanium)' },
  { id: 'ortho',      label: 'Fixed Orthodontics (Braces)',  unit: 'treatment', min: 40000,  max: 100000, note: 'Full treatment, both arches', flat: true },
  { id: 'rct',        label: 'Root Canal Treatment',         unit: 'tooth',     min: 8000,   max: 20000,  note: 'Per tooth' },
  { id: 'scaling',    label: 'Dental Scaling & Cleaning',    unit: 'session',   min: 3000,   max: 6000,   note: 'Per session' },
  { id: 'extraction', label: 'Tooth Extraction',             unit: 'tooth',     min: 3000,   max: 8000,   note: 'Per tooth' },
  { id: 'filling',    label: 'Tooth-Coloured Filling',       unit: 'tooth',     min: 2000,   max: 8000,   note: 'Per tooth (composite)' },
]

function fmt(n: number) { return '৳' + n.toLocaleString('en-BD') }

function InlineCalculator({ preselectedId, calcServices }: { preselectedId: string; calcServices: CalcService[] }) {
  const services = calcServices.length > 0 ? calcServices : FALLBACK_CALC_SERVICES
  const firstId = services.find(s => s.id === preselectedId) ? preselectedId : services[0]?.id || preselectedId
  const [selectedId, setSelectedId] = useState(firstId)
  const [quantity, setQuantity] = useState(1)
  const [dropOpen, setDropOpen] = useState(false)

  const selected = services.find(s => s.id === selectedId) || services[0]!
  const qty = selected.flat ? 1 : Math.max(1, quantity)
  const minTotal = selected.min * qty
  const maxTotal = selected.max * qty
  const waMsg = encodeURIComponent(
    `Hello, I am interested in ${selected.label}${!selected.flat ? ` (${qty} ${selected.unit}${qty > 1 ? 's' : ''})` : ''}. Can you confirm the exact cost? Thank you.`
  )

  return (
    <div className="mt-6 rounded-2xl border border-dental-border overflow-hidden">
      <div className="flex items-center gap-3 bg-dental-blue/8 px-6 py-4 border-b border-dental-border">
        <div className="w-9 h-9 rounded-xl bg-dental-blue/10 flex items-center justify-center">
          <Calculator size={17} className="text-dental-blue" />
        </div>
        <span className="font-bold text-dental-heading text-sm">Cost Estimator</span>
      </div>

      <div className="grid sm:grid-cols-2">
        {/* Left — selectors */}
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-dental-border space-y-4">
          {/* Dropdown */}
          <div className="relative">
            <label className="text-[10px] font-bold text-dental-body uppercase tracking-widest mb-1.5 block">Treatment</label>
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className="w-full flex items-center justify-between gap-2 bg-dental-alt border border-dental-border rounded-xl px-4 py-3 text-left hover:border-dental-blue transition-colors focus:outline-none"
            >
              <span className="font-semibold text-dental-heading text-sm truncate">{selected.label}</span>
              <ChevronDown size={14} className={`text-dental-body flex-shrink-0 transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {dropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-dental-border rounded-xl shadow-card-hover overflow-y-auto max-h-56"
                >
                  {services.map(s => (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedId(s.id); setQuantity(1); setDropOpen(false) }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left text-xs transition-colors ${
                        s.id === selectedId ? 'bg-dental-blue/8 text-dental-blue font-semibold' : 'text-dental-heading hover:bg-dental-alt'
                      }`}
                    >
                      <span>{s.label}</span>
                      <span className="text-dental-body ml-2 flex-shrink-0">{s.note}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quantity */}
          {!selected.flat && (
            <div>
              <label className="text-[10px] font-bold text-dental-body uppercase tracking-widest mb-1.5 block">
                Number of {selected.unit}s
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-dental-alt border border-dental-border text-dental-heading font-bold text-lg flex items-center justify-center hover:border-dental-blue transition-colors"
                >−</button>
                <span className="text-2xl font-extrabold text-dental-heading w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(20, quantity + 1))}
                  className="w-10 h-10 rounded-xl bg-dental-blue text-white font-bold text-lg flex items-center justify-center hover:bg-dental-blue-dark transition-colors"
                >+</button>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
            <Info size={12} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 text-[11px] leading-relaxed">{selected.note}. Exact cost confirmed after clinical evaluation.</p>
          </div>
        </div>

        {/* Right — result */}
        <div className="p-6 bg-dental-alt flex flex-col justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-dental-body uppercase tracking-widest mb-3">Estimated Range</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId + qty}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-1">
                  <span className="text-3xl font-extrabold text-dental-blue tracking-tight">{fmt(minTotal)}</span>
                  <span className="text-dental-body font-semibold mx-2">—</span>
                  <span className="text-3xl font-extrabold text-dental-heading tracking-tight">{fmt(maxTotal)}</span>
                </div>
                <p className="text-dental-body text-xs">
                  {selected.flat ? 'Full treatment estimate' : `${qty} ${selected.unit}${qty > 1 ? 's' : ''}`}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 h-2 bg-dental-border rounded-full overflow-hidden">
              <motion.div
                key={selectedId + qty}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#1B6FC9,#60a5fa)' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          <a
            href={`https://wa.me/8801817102030?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-dental-blue hover:bg-dental-blue-dark text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
          >
            <MessageCircle size={15} />
            Confirm Price on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Service Row ───────────────────────────────────────────────────────────────
function ServiceRow({
  service, index, onOpen,
}: {
  service: ServiceDisplay
  index: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const flip = index % 2 === 1
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      onClick={onOpen}
      animate={inView
        ? { opacity: 1, rotateX: 0, y: 0, scale: 1 }
        : { opacity: 0, rotateX: 20, y: 50, scale: 0.97 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
      className="grid sm:grid-cols-2 rounded-3xl overflow-hidden cursor-pointer group shadow-card hover:shadow-card-hover transition-shadow duration-300 mb-6"
    >
      {/* Image side */}
      <div className={`relative h-64 sm:h-72 overflow-hidden ${flip ? 'sm:order-2' : ''}`}>
        <Image
          src={service.image}
          alt={service.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        {/* Number overlay */}
        <div className="absolute top-5 left-5 text-6xl font-black text-white/15 leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Text side */}
      <div className={`bg-white p-8 sm:p-10 flex flex-col justify-center transition-colors duration-300 group-hover:bg-dental-alt/60 ${flip ? 'sm:order-1' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-dental-blue/10 flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-dental-blue" />
          </div>
          <span className="text-[10px] font-black text-dental-blue bg-dental-blue/8 px-3 py-1.5 rounded-full uppercase tracking-widest">
            {service.tag}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-dental-heading mb-3 leading-tight">
          {service.title}
        </h3>
        <p className="text-dental-body text-sm leading-relaxed mb-5">
          {service.shortDesc}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-dental-blue font-bold text-sm">{service.price}</span>
          <span className="inline-flex items-center gap-1.5 text-dental-blue font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function ServiceModal({
  service, calcServices, onClose,
}: {
  service: ServiceDisplay | null
  calcServices: CalcService[]
  onClose: () => void
}) {
  const [showCalc, setShowCalc] = useState(false)

  if (!service) return null
  const Icon = service.icon

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(10px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) { setShowCalc(false); onClose() } }}
        >
          <motion.div
            initial={{ scale: 0.88, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.88, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl w-full max-w-[860px] max-h-[92vh] overflow-y-auto shadow-[0_40px_120px_rgba(0,0,0,0.35)] relative"
          >
            {/* Close */}
            <button
              onClick={() => { setShowCalc(false); onClose() }}
              className="sticky top-4 float-right mr-4 mt-4 w-10 h-10 rounded-full bg-black/8 hover:bg-black/16 border-none cursor-pointer flex items-center justify-center transition-colors z-10"
            >
              <X size={18} className="text-dental-heading" />
            </button>

            {/* Hero image */}
            <div className="relative h-64 sm:h-72 rounded-t-3xl overflow-hidden">
              <Image src={service.image} alt={service.alt} fill className="object-cover" sizes="860px" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            </div>

            {/* Body */}
            <div className="px-8 sm:px-10 pb-10 -mt-4 relative">
              {/* Tag + title */}
              <span className="inline-flex items-center gap-1.5 bg-dental-blue/10 text-dental-blue text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">
                <Tag size={10} /> {service.tag}
              </span>

              <div className="flex items-start gap-3 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-dental-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={20} className="text-dental-blue" />
                </div>
                <h2 className="text-3xl font-black text-dental-heading leading-tight">{service.title}</h2>
              </div>

              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-bold px-4 py-2 rounded-xl mb-6">
                Estimated Cost: <span>{service.price}</span>
              </div>

              {/* 4-grid info cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-dental-alt border border-dental-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-dental-blue text-[11px] font-black uppercase tracking-widest mb-3">
                    <HelpCircle size={13} /> Why You Need It
                  </div>
                  <p className="text-dental-body text-sm leading-relaxed">{service.why}</p>
                </div>
                <div className="bg-dental-alt border border-dental-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-dental-blue text-[11px] font-black uppercase tracking-widest mb-3">
                    <Calendar size={13} /> When To Get It
                  </div>
                  <p className="text-dental-body text-sm leading-relaxed">{service.when}</p>
                </div>
                <div className="bg-dental-alt border border-dental-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-dental-blue text-[11px] font-black uppercase tracking-widest mb-3">
                    <CheckCircle2 size={13} /> Key Benefits
                  </div>
                  <ul className="space-y-1.5">
                    {service.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2 text-dental-body text-sm">
                        <CheckCircle2 size={12} className="text-dental-blue flex-shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-dental-alt border border-dental-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-dental-blue text-[11px] font-black uppercase tracking-widest mb-3">
                    <Stethoscope size={13} /> What To Expect
                  </div>
                  <p className="text-dental-body text-sm leading-relaxed">{service.expect}</p>
                </div>
              </div>

              {/* Inline Calculator — toggle */}
              <AnimatePresence>
                {showCalc && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <InlineCalculator preselectedId={service.calcId} calcServices={calcServices} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => setShowCalc(!showCalc)}
                  className="inline-flex items-center gap-2 bg-dental-blue hover:bg-dental-blue-dark text-white font-bold py-3.5 px-6 rounded-2xl transition-colors text-sm shadow-blue"
                >
                  <Calculator size={15} />
                  {showCalc ? 'Hide Calculator' : 'See Cost Calculator'}
                </button>
                <a
                  href="https://wa.me/8801817102030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3.5 px-6 rounded-2xl transition-colors text-sm"
                >
                  <MessageCircle size={15} />
                  WhatsApp Dr. Faisal
                </a>
                <a
                  href="tel:01817102030"
                  className="inline-flex items-center gap-2 border-2 border-dental-blue text-dental-blue hover:bg-dental-blue/8 font-bold py-3 px-5 rounded-2xl transition-colors text-sm"
                >
                  <Phone size={15} />
                  01817-102030
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Services() {
  const [serviceData, setServiceData] = useState<ServiceDisplay[]>(HARDCODED_SERVICE_DATA)
  const [calcServices, setCalcServices] = useState<CalcService[]>(FALLBACK_CALC_SERVICES)
  const [activeService, setActiveService] = useState<ServiceDisplay | null>(null)

  useEffect(() => {
    Promise.all([
      supabase.from('services').select('*').order('sort_order', { ascending: true }),
      supabase.from('prices').select('*').order('label', { ascending: true }),
    ]).then(([{ data: svcData }, { data: priceData }]) => {
      // Build price lookup by service_id (matches slug in services table)
      const priceMap: Record<string, { min: number; max: number; unit: string; note: string }> = {}
      if (priceData && priceData.length > 0) {
        priceData.forEach((p: { service_id: string; label: string; unit: string; min: number; max: number; note: string }) => {
          priceMap[p.service_id] = { min: p.min, max: p.max, unit: p.unit, note: p.note }
        })
        setCalcServices(priceData.map((p: { service_id: string; label: string; unit: string; min: number; max: number; note: string }) => ({
          id: p.service_id,
          label: p.label,
          unit: p.unit,
          min: p.min,
          max: p.max,
          note: p.note || `Per ${p.unit}`,
          flat: p.unit === 'treatment',
        })))
      }
      if (svcData && svcData.length > 0) {
        setServiceData(svcData.map(s => {
          const p = priceMap[s.slug]
          return mapDBService({
            ...s,
            price_min: p?.min ?? s.price_min,
            price_max: p?.max ?? s.price_max,
            unit: p?.unit ?? s.unit,
          })
        }))
      }
    })
  }, [])

  return (
    <>
      <section id="services" className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="section-label mb-4">Our Services</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dental-heading leading-tight tracking-tight"
              >
                Every Treatment,{' '}
                <span className="gradient-text">Done Right</span>
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xs md:text-right"
            >
              <p className="text-dental-body text-sm leading-relaxed mb-3">
                From your first consultation to your final smile — Dr. Faisal delivers international-standard results in Dhaka.
              </p>
              <Link href="/services" className="inline-flex items-center gap-2 text-dental-blue font-semibold text-sm hover:gap-3 transition-all duration-200">
                View All Services <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* Cinema Stack rows */}
          <div>
            {serviceData.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={i}
                onOpen={() => setActiveService(service)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      <ServiceModal service={activeService} calcServices={calcServices} onClose={() => setActiveService(null)} />
    </>
  )
}
