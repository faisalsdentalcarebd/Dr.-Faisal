'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Stethoscope, Plus, Pencil, Trash2, X, Save, Loader2,
  CheckCircle, XCircle, ImageIcon, ChevronUp, ChevronDown, AlertCircle,
} from 'lucide-react'

// ── Existing website services — shown by default ─────────────────────────────
const HARDCODED_SERVICES = [
  {
    id: 'crown', name: 'Crown & Bridge Restoration', slug: 'crown-bridge-restoration',
    tag: 'Most Popular',
    description: 'Rebuild damaged or missing teeth with precision-crafted prosthetics matched to your natural smile.',
    why_needed: 'Untreated damaged or missing teeth lead to bone loss, bite misalignment, and progressive deterioration of surrounding teeth. A crown or bridge halts this damage immediately.',
    when_needed: 'When a tooth is cracked, severely decayed, broken, or missing entirely. Also recommended after root canal treatment to protect the treated tooth.',
    benefits: '• Restores full chewing function\n• Natural appearance and colour match\n• Prevents further bone loss\n• Long-lasting 10–15 year lifespan',
    image_url: '/images/services/1. Crown & Bridge.jpg',
    price_min: 15000, price_max: 40000, unit: 'unit', sort_order: 0,
  },
  {
    id: 'implant', name: 'Dental Implants', slug: 'dental-implants',
    tag: 'Premium · Permanent',
    description: 'The gold-standard permanent solution for missing teeth — titanium root fused directly into your jawbone.',
    why_needed: 'Unlike dentures or bridges, implants replace the tooth root itself — preserving jawbone, preventing facial sagging, and providing a lifetime solution that feels and functions like a natural tooth.',
    when_needed: 'Recommended for any missing tooth where sufficient jawbone exists. Ideal for patients who want a permanent, maintenance-free solution without damaging adjacent teeth.',
    benefits: '• Permanent — lasts a lifetime\n• Preserves jawbone structure\n• No impact on adjacent teeth\n• Natural look and feel',
    image_url: '/images/services/2. Dental Implant.jpg',
    price_min: 80000, price_max: 150000, unit: 'implant', sort_order: 1,
  },
  {
    id: 'ortho', name: 'Fixed Orthodontics (Braces)', slug: 'fixed-orthodontics-braces',
    tag: 'Alignment',
    description: 'Precision teeth alignment using fixed braces — correcting bite, spacing, and crowding for a perfect smile.',
    why_needed: 'Misaligned teeth cause uneven wear, difficulty cleaning, gum disease risk, and jaw pain. Orthodontic treatment corrects these issues permanently.',
    when_needed: 'Best started early but effective at any age. Recommended for crowded teeth, gaps, overbite, underbite, or crooked teeth.',
    benefits: '• Corrects bite and alignment permanently\n• Easier to clean teeth post-treatment\n• Prevents long-term jaw issues\n• Boosts confidence with a straighter smile',
    image_url: '/images/services/3. Fixed Orthodontics.jpg',
    price_min: 40000, price_max: 100000, unit: 'treatment', sort_order: 2,
  },
  {
    id: 'rct', name: 'Root Canal Treatment', slug: 'root-canal-treatment',
    tag: 'Pain Relief',
    description: 'Save an infected or severely damaged tooth — eliminating pain and preserving your natural tooth.',
    why_needed: 'An infected tooth pulp causes severe pain and spreads bacteria to surrounding bone if untreated. Root canal removes the infection, saves the tooth, and stops the spread.',
    when_needed: 'When you experience severe toothache, sensitivity to hot/cold, darkened tooth, or have a confirmed pulp infection on X-ray.',
    benefits: '• Eliminates severe dental pain\n• Saves your natural tooth\n• Stops infection from spreading\n• Near-painless modern procedure',
    image_url: '/images/services/4. Root Canal Treatments.jpg',
    price_min: 8000, price_max: 20000, unit: 'tooth', sort_order: 3,
  },
  {
    id: 'scaling', name: 'Scaling & Polishing', slug: 'scaling-polishing',
    tag: 'Hygiene · Preventive',
    description: 'Professional-grade removal of plaque, tartar, and stains — the cornerstone of long-term oral health.',
    why_needed: 'Daily brushing cannot remove calcified tartar deposits. Untreated tartar causes gum disease, tooth decay, bad breath, and eventually tooth loss.',
    when_needed: 'Recommended every 6 months for all adults. More frequent for smokers, diabetics, or patients with existing gum disease.',
    benefits: '• Prevents gum disease and cavities\n• Removes deep stains for brighter teeth\n• Fresh breath immediately\n• Early detection of dental issues',
    image_url: '/images/services/5. Dental Scaling.jpg',
    price_min: 3000, price_max: 6000, unit: 'session', sort_order: 4,
  },
  {
    id: 'extraction', name: 'Tooth Extraction', slug: 'tooth-extraction',
    tag: 'Surgical',
    description: 'Safe, precise removal of severely damaged, infected, or wisdom teeth — with minimal discomfort.',
    why_needed: 'Severely damaged, infected, or impacted teeth that cannot be saved must be removed to prevent infection spread and protect surrounding teeth.',
    when_needed: 'When a tooth is beyond restoration, causing crowding, blocking orthodontic treatment, or when wisdom teeth are impacted.',
    benefits: '• Eliminates source of pain and infection\n• Fast healing with proper aftercare\n• Preserves surrounding tooth health\n• Wisdom tooth removal prevents future crowding',
    image_url: '/images/services/6. Tooth Extaction.jpg',
    price_min: 3000, price_max: 8000, unit: 'tooth', sort_order: 5,
  },
  {
    id: 'filling', name: 'Tooth Filling (Restoration)', slug: 'tooth-filling-restoration',
    tag: 'Restoration',
    description: 'Repair cavities and minor chips with tooth-coloured composite fillings that blend invisibly with your smile.',
    why_needed: 'Untreated cavities grow larger, eventually reaching the pulp and requiring root canal or extraction. Early filling is the fastest, cheapest fix.',
    when_needed: 'As soon as a cavity is detected — the smaller it is treated, the simpler and less costly the procedure.',
    benefits: '• Stops cavity from growing larger\n• Tooth-coloured — invisible result\n• Single appointment, fast procedure\n• Highly durable composite material',
    image_url: '/images/services/7. Dental Fillings.jpg',
    price_min: 2000, price_max: 8000, unit: 'tooth', sort_order: 6,
  },
]

type Service = {
  id: string
  name: string
  slug: string
  tag?: string
  description: string
  why_needed: string
  when_needed: string
  benefits: string
  image_url: string
  price_min: number
  price_max: number
  unit: string
  sort_order: number
  source?: 'hardcoded' | 'supabase'
}

const EMPTY_FORM = {
  name: '', slug: '', tag: '', description: '', why_needed: '', when_needed: '',
  benefits: '', image_url: '', price_min: 0, price_max: 0, unit: 'treatment',
}

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>(
    HARDCODED_SERVICES.map(s => ({ ...s, source: 'hardcoded' as const }))
  )
  const [supabaseOk, setSupabaseOk] = useState<boolean | null>(null)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    fetch('/api/admin/services')
      .then(r => r.json())
      .then((data: Service[]) => {
        setSupabaseOk(true)
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.map(s => ({ ...s, source: 'supabase' as const })))
        }
        // else keep hardcoded as display
      })
      .catch(() => setSupabaseOk(false))
  }, [])

  const reload = () => {
    fetch('/api/admin/services')
      .then(r => r.json())
      .then((data: Service[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.map(s => ({ ...s, source: 'supabase' as const })))
        }
      })
  }

  const openAdd = () => {
    setForm(EMPTY_FORM)
    setImageFile(null)
    setImagePreview('')
    setEditing(null)
    setModal('add')
  }

  const openEdit = (s: Service) => {
    setForm({
      name: s.name, slug: s.slug, tag: s.tag || '',
      description: s.description, why_needed: s.why_needed,
      when_needed: s.when_needed, benefits: s.benefits,
      image_url: s.image_url, price_min: s.price_min,
      price_max: s.price_max, unit: s.unit,
    })
    setImageFile(null)
    setImagePreview(s.image_url || '')
    setEditing(s)
    setModal('edit')
  }

  const closeModal = () => { setModal(null); setEditing(null) }

  const set = (k: string, v: string | number) => setForm(prev => ({ ...prev, [k]: v }))

  const handleNameChange = (v: string) => {
    setForm(prev => ({ ...prev, name: v, slug: slugify(v) }))
  }

  const handleImage = (file: File) => {
    if (!file.type.startsWith('image/')) { showToast('Images only', false); return }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) { showToast('Name is required', false); return }

    if (supabaseOk === false) {
      showToast('Supabase table not set up yet — run the SQL migration first', false)
      return
    }

    setSaving(true)
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
    if (imageFile) fd.append('image', imageFile)
    if (editing && editing.source === 'supabase') fd.append('id', editing.id)

    const res = await fetch('/api/admin/services', {
      method: (editing && editing.source === 'supabase') ? 'PUT' : 'POST',
      body: fd,
    })
    const data = await res.json()
    setSaving(false)
    if (data.success) {
      showToast(editing ? 'Service updated!' : 'Service added!')
      closeModal()
      reload()
    } else {
      showToast(data.error || 'Failed to save', false)
    }
  }

  const handleDelete = async (s: Service) => {
    if (s.source === 'hardcoded') {
      showToast('Run the SQL migration to manage built-in services', false)
      return
    }
    if (!confirm(`Delete "${s.name}"? This cannot be undone.`)) return
    setDeleting(s.id)
    const res = await fetch('/api/admin/services', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: s.id, image_url: s.image_url }),
    })
    const data = await res.json()
    setDeleting(null)
    if (data.success) { showToast('Service deleted'); reload() }
    else showToast('Delete failed', false)
  }

  const move = async (id: string, dir: 'up' | 'down') => {
    if (supabaseOk === false) return
    const idx = services.findIndex(s => s.id === id)
    if (dir === 'up' && idx === 0) return
    if (dir === 'down' && idx === services.length - 1) return
    const next = [...services]
    const swap = dir === 'up' ? idx - 1 : idx + 1
    ;[next[idx], next[swap]] = [next[swap], next[idx]]
    const updated = next.map((s, i) => ({ ...s, sort_order: i }))
    setServices(updated)
    if (updated.some(s => s.source === 'supabase')) {
      await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated.filter(s => s.source === 'supabase').map(s => ({ id: s.id, sort_order: s.sort_order }))),
      })
    }
  }

  return (
    <div className="min-h-screen bg-dental-alt">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-dental-heading">Services Manager</h1>
            <span className="bg-dental-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full">{services.length}</span>
          </div>
          <button onClick={openAdd} className="btn-primary flex items-center gap-2 !py-2.5 !px-5 !text-sm">
            <Plus size={14} /> Add Service
          </button>
        </div>

        {/* Setup notice if Supabase table not ready */}
        {supabaseOk === false && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-6 text-sm text-amber-800 flex items-start gap-3">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-amber-600" />
            <div>
              <strong>One-time setup needed.</strong> Run this SQL in your Supabase dashboard (SQL Editor) to enable editing:
              <pre className="mt-2 bg-amber-100 rounded p-3 text-xs overflow-x-auto whitespace-pre-wrap font-mono">{`create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name text not null, slug text unique not null,
  tag text default '', description text default '',
  why_needed text default '', when_needed text default '',
  benefits text default '', image_url text default '',
  price_min integer default 0, price_max integer default 0,
  unit text default 'treatment', sort_order integer default 0,
  created_at timestamptz default now()
);
-- Also create a storage bucket named "services" (public)`}</pre>
              <p className="mt-2 text-xs text-amber-700">Until then, this panel shows your current website services as read-only preview.</p>
            </div>
          </div>
        )}

        {supabaseOk === true && services.some(s => s.source === 'hardcoded') && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 text-sm text-blue-700 flex items-start gap-3">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <div>
              <strong>Table is ready</strong> but empty — showing your website&apos;s current 7 services as preview. To manage them from here, run the seed SQL to load them into Supabase, then edits will be reflected live on the website.
            </div>
          </div>
        )}

        {supabaseOk === null && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 text-sm text-blue-700">
            Showing current website services. Checking Supabase connection...
          </div>
        )}

        {/* Service list */}
        <div className="space-y-3">
          {services.map((s, idx) => (
            <div key={s.id} className={`bg-white rounded-2xl border p-5 flex items-start gap-5 ${s.source === 'hardcoded' ? 'border-dental-border' : 'border-dental-blue/30'}`}>

              {/* Reorder (only if Supabase) */}
              <div className="flex flex-col gap-1 pt-1 flex-shrink-0">
                <button onClick={() => move(s.id, 'up')} disabled={idx === 0 || s.source === 'hardcoded'}
                  className="w-6 h-6 rounded flex items-center justify-center text-dental-body hover:text-dental-heading hover:bg-dental-alt disabled:opacity-20 transition-all">
                  <ChevronUp size={14} />
                </button>
                <button onClick={() => move(s.id, 'down')} disabled={idx === services.length - 1 || s.source === 'hardcoded'}
                  className="w-6 h-6 rounded flex items-center justify-center text-dental-body hover:text-dental-heading hover:bg-dental-alt disabled:opacity-20 transition-all">
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Image */}
              <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-dental-alt border border-dental-border">
                {s.image_url ? (
                  s.image_url.startsWith('/') ? (
                    <img src={s.image_url} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <Image src={s.image_url} alt={s.name} width={80} height={80} className="object-cover w-full h-full" />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={24} className="text-dental-border" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-dental-heading text-sm">{s.name}</span>
                  {s.tag && <span className="text-[10px] bg-dental-blue/8 text-dental-blue font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">{s.tag}</span>}
                  {s.source === 'hardcoded' && (
                    <span className="text-[10px] bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">Built-in</span>
                  )}
                </div>
                <div className="text-dental-body text-xs mt-0.5 font-mono opacity-60">/services/{s.slug}</div>
                {s.description && <p className="text-dental-body text-xs mt-1.5 line-clamp-2">{s.description}</p>}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs bg-dental-alt text-dental-body px-2 py-0.5 rounded-full border border-dental-border">
                    ৳{s.price_min.toLocaleString()} – ৳{s.price_max.toLocaleString()} / {s.unit}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(s)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-dental-body hover:text-dental-blue hover:bg-blue-50 transition-all"
                  title={s.source === 'hardcoded' ? 'Edit (saves to Supabase)' : 'Edit'}>
                  <Pencil size={14} />
                </button>
                {s.source === 'supabase' && (
                  <button onClick={() => handleDelete(s)} disabled={deleting === s.id}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-dental-body hover:text-red-500 hover:bg-red-50 transition-all">
                    {deleting === s.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto" style={{ background: 'rgba(15,23,42,0.6)' }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-4">
            <div className="flex items-center justify-between px-7 py-5 border-b border-dental-border">
              <h2 className="font-bold text-dental-heading text-lg">
                {modal === 'add' ? 'Add New Service' : `Edit: ${editing?.name}`}
              </h2>
              <button onClick={closeModal} className="w-8 h-8 rounded-lg flex items-center justify-center text-dental-body hover:bg-dental-alt transition-all">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">

              {editing?.source === 'hardcoded' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 flex items-start gap-2">
                  <AlertCircle size={13} className="flex-shrink-0 mt-0.5 text-amber-600" />
                  This is a built-in service. Saving will create an editable copy in Supabase. Run the Supabase SQL migration first.
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Service Name *</label>
                  <input type="text" required value={form.name} onChange={e => handleNameChange(e.target.value)}
                    placeholder="e.g. Dental Implant" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Tag (badge)</label>
                  <input type="text" value={form.tag} onChange={e => set('tag', e.target.value)}
                    placeholder="e.g. Most Popular" className="form-input" />
                </div>
              </div>

              <div>
                <label className="form-label">URL Slug</label>
                <input type="text" value={form.slug} onChange={e => set('slug', e.target.value)}
                  placeholder="dental-implant" className="form-input font-mono text-sm" />
              </div>

              <div>
                <label className="form-label">Short Description</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)}
                  placeholder="A brief overview of this service..." rows={2} className="form-input resize-none" />
              </div>

              <div>
                <label className="form-label">Why Is This Needed?</label>
                <textarea value={form.why_needed} onChange={e => set('why_needed', e.target.value)}
                  placeholder="Explain the medical/dental reason..." rows={3} className="form-input resize-none" />
              </div>

              <div>
                <label className="form-label">When Should a Patient Get This?</label>
                <textarea value={form.when_needed} onChange={e => set('when_needed', e.target.value)}
                  placeholder="Symptoms or situations that indicate this service..." rows={3} className="form-input resize-none" />
              </div>

              <div>
                <label className="form-label">Benefits / What to Expect</label>
                <textarea value={form.benefits} onChange={e => set('benefits', e.target.value)}
                  placeholder="Key benefits (one per line, start with •)..." rows={4} className="form-input resize-none font-mono text-sm" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Min Price (৳)</label>
                  <input type="number" value={form.price_min} onChange={e => set('price_min', Number(e.target.value))}
                    min={0} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Max Price (৳)</label>
                  <input type="number" value={form.price_max} onChange={e => set('price_max', Number(e.target.value))}
                    min={0} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Per (unit)</label>
                  <input type="text" value={form.unit} onChange={e => set('unit', e.target.value)}
                    placeholder="treatment" className="form-input" />
                </div>
              </div>

              <div>
                <label className="form-label">Service Photo</label>
                <div
                  className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all hover:border-dental-blue hover:bg-blue-50/30"
                  style={{ borderColor: imagePreview ? '#1B6FC9' : undefined }}
                  onClick={() => fileRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-dental-border">
                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <p className="text-dental-heading text-sm font-semibold">Photo selected</p>
                        <p className="text-dental-body text-xs mt-0.5">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon size={24} className="text-dental-border" />
                      <p className="text-dental-body text-sm">Click to upload a photo</p>
                      <p className="text-dental-body text-xs">JPG, PNG, WebP — max 10MB</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleImage(f); e.target.value = '' }} />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 !py-3 !px-6">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {saving ? 'Saving...' : modal === 'add' ? 'Add Service' : 'Save Changes'}
                </button>
                <button type="button" onClick={closeModal} className="text-dental-body hover:text-dental-heading text-sm transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold ${toast.ok ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
          {toast.ok ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}
