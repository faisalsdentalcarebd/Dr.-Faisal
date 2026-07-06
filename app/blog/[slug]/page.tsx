import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Tag, Phone, MapPin } from 'lucide-react'
import { blogPosts } from '@/lib/data'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const articleContent: Record<string, string> = {
  'find-dentist-near-me-gulshan-dhaka': `
If you have ever typed "dentist near me" or "dentist nearby Dhaka" into your phone, you already know the problem. The results are overwhelming — dozens of listings, mixed reviews, no clear way to know who is actually qualified. Choosing the wrong dentist for a complex procedure can mean years of discomfort and unnecessary expense. Choosing the right one can change your quality of life.

This guide — written based on Dr. Faisal's 28 years of specialist clinical experience — gives you a clear framework for making the right decision.

## What "Nearby" Should Actually Mean to You

Proximity matters, but it is not the only factor. A dental clinic five minutes from your home is only convenient if they are qualified to handle your specific problem. For routine cleanings and basic fillings, a general dentist nearby is perfectly appropriate. But for crowns, bridges, implants, orthodontics, or anything involving missing or heavily damaged teeth, you need to ask a different question: Is this dentist a specialist?

The difference between seeing a general dentist and a Prosthodontist for a complex case is not just technical — it is the difference between a short-term fix and a long-term solution.

## General Dentist vs Specialist — The Difference Patients Miss

Bangladesh has thousands of general dentists. It has far fewer Prosthodontists — dental specialists who have completed additional years of postgraduate training in restoring and replacing teeth.

A general dentist provides excellent routine care and is the right choice for most everyday dental needs. A Prosthodontist is trained to manage the full picture: how your bite works as a system, how to plan implants around bone density, how to fit crowns that last 15 or more years rather than five. For patients with missing teeth, severely damaged teeth, or complex bite problems, a specialist makes a measurable difference in outcome.

## 5 Questions to Ask Before Choosing a Dental Clinic Near You

**1. What is their postgraduate qualification?**
Look for a BDS degree plus a recognised specialist qualification — MS, MDS, or an international fellowship. Dr. Faisal holds BDS, MS in Prosthodontics, and FICD — Fellow of the International College of Dentists, USA.

**2. Have they trained internationally?**
Dental techniques, materials, and clinical protocols advance rapidly. A dentist with international training brings exposure to standards and procedures that are not always available through local training alone. Dr. Faisal has trained in implantology in India, Thailand, and Spain.

**3. Do they have experience with your specific problem?**
Ask directly: "How many implants have you placed?" or "Do you routinely handle orthodontic cases?" A specialist clinic with a defined scope of practice will consistently deliver better outcomes than a generalist practice that attempts everything.

**4. Is the clinic easy to reach from your area?**
Faisal's Dental Care is located in Niketan, Gulshan-1 — one of the most accessible addresses in Dhaka for patients coming from Gulshan, Banani, Baridhara, DOHS, Badda, and surrounding areas.

**5. Can you reach them easily to book or ask questions?**
A clinic that is hard to contact before you are a patient is unlikely to be better once you are one. At Faisal's Dental Care, appointments are confirmed within 2 hours via WhatsApp at 01817-102030.

## Why Patients Across Dhaka Choose Faisal's Dental Care

Dr. Sheikh Md. Shahriar Quader — known to his patients as Dr. Faisal — has spent 28 years treating complex dental cases at his specialist clinic in Gulshan-1. As Associate Professor and Head of the Department of Prosthodontics at Shaheed Suhrawardy Medical College Hospital, and a Fellow of the International College of Dentists USA, he brings a level of qualification that is rare in Dhaka.

His clinic offers a focused range of specialist services — Crown & Bridge restorations, Dental Implants, Fixed Orthodontics, Root Canal Treatment, Dental Scaling, Tooth Extraction, and Dental Fillings — all performed by a single experienced specialist who understands your full dental history and long-term needs.

## How to Book an Appointment

Consulting hours are 4:00 PM to 8:00 PM, Saturday through Thursday. Friday appointments are available by prior arrangement.

To book: WhatsApp or call 01817-102030, or email faisalsdentalcare@gmail.com. The team confirms slots within 2 hours during clinic hours.

Faisal's Dental Care — House # 50, Road # 03, Block-B, Niketan, Gulshan-1, Dhaka-1212.
  `,
  'what-is-prosthodontics': `
When most people think of dentistry, they picture routine check-ups, fillings, and cleanings. But there is an entire world of specialist dental care that handles the complex cases — the missing teeth, the broken smiles, the full-mouth rehabilitations that require years of advanced training to do right. That specialty is called Prosthodontics.

## What Does a Prosthodontist Do?

A Prosthodontist is a dental specialist who has completed a full undergraduate dental degree (BDS) followed by several additional years of postgraduate training specifically in the restoration and replacement of teeth. This training covers crowns, bridges, dental implants, dentures, and full-mouth rehabilitation.

## How is a Prosthodontist Different from a General Dentist?

A general dentist provides excellent routine care — and is often the right professional for simple fillings, cleanings, and basic extractions. But when a case involves multiple missing teeth, complex bite problems, implant planning, or aesthetic reconstructions involving crowns and bridges, a Prosthodontist's specialist training means:

- More precise diagnosis of how all the teeth work together as a system
- Better planning for long-term function, not just immediate repair
- Higher-quality prosthetic outcomes that look and feel more natural
- Greater experience managing complications and complex cases

## Who Should See a Prosthodontist?

You may benefit from seeing a Prosthodontist if you are missing one or more teeth and considering implants or a bridge, have broken or severely worn teeth that need crowns, are unhappy with how your smile looks, or have been told your case is complex by your general dentist.

## Dr. Faisal's Prosthodontic Practice in Dhaka

At Faisal's Dental Care in Gulshan-1, Dr. Sheikh Md. Shahriar Quader brings 28 years of specialist Prosthodontic experience to patients across Dhaka. As Associate Professor and Head of the Department of Prosthodontics at Shaheed Suhrawardy Medical College Hospital — and a Fellow of the International College of Dentists, USA — Dr. Faisal is uniquely positioned to handle the full range of prosthodontic cases with precision and care.
  `,
  'implants-vs-crown-bridge': `
Losing a tooth is more than a cosmetic concern. It affects how you chew, how you speak, and over time, even the shape of your jaw. The good news is that modern dentistry offers two excellent options for replacing a missing tooth: dental implants and crown & bridge restorations.

## What Is a Dental Implant?

A dental implant is a titanium post surgically placed into the jawbone to serve as an artificial tooth root. Once the implant fuses with the bone, a custom crown is attached on top — creating a replacement tooth that looks, feels, and functions like a natural tooth.

Key features of dental implants: permanent and durable (can last a lifetime), does not involve the neighbouring teeth, prevents bone loss in the jaw, feels completely natural when chewing and speaking, and requires a surgical procedure and healing period.

## What Is a Crown & Bridge?

A dental bridge uses the teeth on either side of the gap as anchors, with an artificial tooth bridged between them. All three units are made as a single connected piece and cemented into place.

Key features: no surgery required, faster treatment timeline, well-established and highly effective, requires reshaping adjacent teeth, does not prevent jawbone loss under the gap over time.

## How to Choose?

The right choice depends on several factors: whether surrounding teeth are healthy, sufficient jawbone density, willingness to undergo surgery, budget, and long-term considerations. As an internationally trained Prosthodontist and Dental Implantologist, Dr. Faisal has placed hundreds of dental implants and fitted thousands of crowns and bridges. His approach is always to recommend what is best for your long-term oral health.

Book a consultation at Faisal's Dental Care, Gulshan-1, Dhaka for a personalised assessment.
  `,
  'root-canal-warning-signs': `
The words "root canal" make most patients anxious. But here is the truth: a root canal does not cause pain — it relieves it. The pain you feel before the procedure is from the infection inside your tooth. The procedure itself, performed under local anaesthesia, is designed to eliminate that infection and save your natural tooth.

## 6 Signs You May Need Root Canal Treatment

**1. Severe, Persistent Toothache**
A dull, throbbing ache that doesn't go away — especially if it is deep inside the tooth or radiates to your jaw, ear, or surrounding teeth — is a classic sign of pulp infection.

**2. Sensitivity That Lingers**
If sensitivity to cold or heat lingers for more than a few seconds, it suggests the nerve inside the tooth is inflamed or damaged.

**3. Darkening of the Tooth**
A tooth that becomes visibly darker than those around it may be dying from the inside.

**4. Swelling Near the Tooth**
Puffiness or a pimple-like bump on the gum near a painful tooth indicates infection may be spreading.

**5. Pain When Touching or Biting**
Significant pain when pressure is applied to the tooth suggests inflammation inside the root.

**6. A Previously Cracked or Injured Tooth Becoming Painful**
Old injuries can cause pulp damage that appears years later.

## What Happens During Root Canal Treatment?

Dr. Faisal applies local anaesthetic, accesses the inside of the tooth, removes the infected pulp, cleans and shapes the root canals, fills and seals the canals, then places a crown to protect the treated tooth. The entire procedure typically takes one to two appointments.

If you are experiencing any of these symptoms, please do not delay. Early root canal treatment is simpler, less costly, and far more likely to save your natural tooth.

Contact Faisal's Dental Care in Gulshan-1, Dhaka today — House # 50, Road # 03, Block-B, Niketan, Gulshan-1, Dhaka-1212. Call: 01817-102030.
  `,
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let post: any = null
  
  const { data: dbPost } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .maybeSingle()

  if (dbPost) {
    post = {
      title: dbPost.title,
      slug: dbPost.slug,
      excerpt: dbPost.excerpt,
      date: dbPost.created_at,
    }
  } else {
    post = blogPosts.find((p) => p.slug === params.slug)
  }

  if (!post) return {}
  const desc = post.metaDescription ?? post.excerpt ?? undefined
  return {
    title: `${post.title} | Faisal's Dental Care`,
    description: desc,
    openGraph: {
      title: `${post.title} | Faisal's Dental Care`,
      description: desc,
      url: `https://faisalsdentalcare.com/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ["Dr. Sheikh Md. Shahriar Quader"],
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `https://faisalsdentalcare.com/blog/${params.slug}`,
    },
  }
}

const categoryColors: Record<string, string> = {
  'Patient Education': 'bg-blue-50 text-dental-blue border-blue-200',
  'Treatment Guide': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'Symptoms & Awareness': 'bg-amber-50 text-amber-600 border-amber-200',
  'Local Guide': 'bg-violet-50 text-violet-600 border-violet-200',
}

export default async function BlogPostPage({ params }: Props) {
  let post: any = null
  let content = ''
  
  const { data: dbPost } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .maybeSingle()

  if (dbPost) {
    post = {
      id: dbPost.id,
      title: dbPost.title,
      slug: dbPost.slug,
      category: dbPost.category,
      date: dbPost.created_at,
      excerpt: dbPost.excerpt,
      image: dbPost.cover_image_url || null,
      imageAlt: dbPost.title,
    }
    content = dbPost.content || ''
  } else {
    const mockPost = blogPosts.find((p) => p.slug === params.slug)
    if (!mockPost) notFound()
    post = mockPost
    content = articleContent[params.slug] || mockPost.excerpt || ''
  }

  const postDate = post.date || post.created_at
  const postReadTime = post.readTime || (() => {
    const words = content.trim().split(/\s+/).length
    return `${Math.max(1, Math.ceil(words / 200))} min read`
  })()

  const paragraphs = content.trim().split('\n\n')

  return (
    <div className="pt-20 page-enter">
      {/* Header */}
      <section className="py-16 bg-dental-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-dental-body hover:text-dental-blue text-sm mb-6 transition-colors duration-200">
            <ArrowLeft size={13} />
            Back to Blog
          </Link>

          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border mb-4 ${categoryColors[post.category || ''] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            <Tag size={9} />
            {post.category || 'Patient Tips'}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-dental-heading leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-5 text-xs text-dental-body">
            <span className="flex items-center gap-1.5"><Calendar size={11} />
              {new Date(postDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5"><Clock size={11} />{postReadTime}</span>
            <span className="text-dental-blue font-semibold">Dr. Faisal · Gulshan-1, Dhaka</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {(post as any).image && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-dental-border shadow-sm">
              <Image
                src={(post as any).image}
                alt={(post as any).imageAlt || post.title}
                width={800}
                height={420}
                className="w-full h-auto"
                priority
              />
            </div>
          )}
          <div className="prose prose-lg max-w-none">
            {(() => {
              const renderItalics = (text: string): any[] => {
                const italicParts = text.split(/(_.*?_)/g)
                return italicParts.map((iPart, iIdx) => {
                  if (iPart.startsWith('_') && iPart.endsWith('_')) {
                    return <em key={`i-${iIdx}`} className="italic">{iPart.slice(1, -1)}</em>
                  }
                  return iPart
                })
              }

              const renderInlineStyles = (text: string): any[] => {
                const boldParts = text.split(/(\*\*.*?\*\*)/g)
                return boldParts.flatMap((bPart, bIdx) => {
                  if (bPart.startsWith('**') && bPart.endsWith('**')) {
                    const content = bPart.slice(2, -2)
                    return [<strong key={`b-${bIdx}`} className="font-bold text-dental-heading">{renderItalics(content)}</strong>]
                  }
                  return renderItalics(bPart)
                })
              }

              const renderFormattedText = (text: string): any => {
                const uParts = text.split(/(<u>.*?<\/u>)/g)
                return uParts.flatMap((uPart, uIdx) => {
                  if (uPart.startsWith('<u>') && uPart.endsWith('</u>')) {
                    const content = uPart.slice(3, -4)
                    return [<u key={`u-${uIdx}`}>{renderInlineStyles(content)}</u>]
                  }
                  return renderInlineStyles(uPart)
                })
              }

              return paragraphs.map((para, i) => {
                if (para.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold text-dental-heading mt-8 mb-4">{renderFormattedText(para.replace('## ', ''))}</h2>
                }
                if (para.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-bold text-dental-heading mt-6 mb-3">{renderFormattedText(para.replace('### ', ''))}</h3>
                }
                if (para.startsWith('#### ')) {
                  return <h4 key={i} className="text-lg font-bold text-dental-heading mt-4 mb-2">{renderFormattedText(para.replace('#### ', ''))}</h4>
                }
                if (para.startsWith('**') && para.endsWith('**')) {
                  return <h3 key={i} className="text-lg font-bold text-dental-heading mt-6 mb-2">{renderFormattedText(para.replace(/\*\*/g, ''))}</h3>
                }
                if (para.includes('\n-')) {
                  const lines = para.split('\n')
                  return (
                    <div key={i}>
                      {lines[0] && <p className="text-dental-body leading-relaxed mb-2">{renderFormattedText(lines[0])}</p>}
                      <ul className="space-y-1.5 mb-4 ml-4">
                        {lines.slice(1).filter(l => l.startsWith('-')).map((l, j) => (
                          <li key={j} className="text-dental-body text-sm flex items-start gap-2">
                            <span className="text-dental-blue mt-1.5">•</span>
                            <span>{renderFormattedText(l.replace(/^-\s/, ''))}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                }
                return <p key={i} className="text-dental-body leading-relaxed mb-4">{renderFormattedText(para)}</p>
              })
            })()}
          </div>

          {/* Author Card */}
          <div className="mt-12 glass-blue rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-dental-blue flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <div className="font-bold text-dental-heading">Dr. Sheikh Md. Shahriar Quader (Dr. Faisal)</div>
                <div className="text-dental-body text-sm">BDS · MS Prosthodontics · FICD (USA) · 28 Years Experience</div>
                <div className="text-dental-blue text-xs font-medium mt-1">Associate Professor & HoD, Shaheed Suhrawardy Medical College Hospital</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-dental-blue/20">
              <a href="tel:01817102030" className="inline-flex items-center gap-2 text-dental-blue text-sm font-semibold hover:underline">
                <Phone size={13} />01817-102030
              </a>
              <span className="flex items-center gap-1.5 text-dental-body text-sm">
                <MapPin size={13} className="text-dental-blue" />
                Niketan, Gulshan-1, Dhaka-1212
              </span>
            </div>
          </div>

          {/* Back CTA */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact" className="btn-primary">Book Appointment →</Link>
            <Link href="/blog" className="btn-outline-blue">More Articles →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
