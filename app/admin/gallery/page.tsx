'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Upload, Trash2, ImageIcon, CheckCircle, XCircle, Loader2, SplitSquareHorizontal } from 'lucide-react'

type GalleryImage = {
  id: string
  url: string
  caption: string
  filename: string
  created_at: string
}

type BeforeAfterCase = {
  id: string
  label: string
  before_url: string
  after_url: string
  before_filename: string
  after_filename: string
  sort_order: number
}

export default function GalleryAdmin() {
  const [tab, setTab] = useState<'general' | 'before-after'>('general')

  // General
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loadingImages, setLoadingImages] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [caption, setCaption] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // Before/After
  const [cases, setCases] = useState<BeforeAfterCase[]>([])
  const [loadingCases, setLoadingCases] = useState(true)
  const [baLabel, setBaLabel] = useState('')
  const [beforeFile, setBeforeFile] = useState<File | null>(null)
  const [afterFile, setAfterFile] = useState<File | null>(null)
  const [beforePreview, setBeforePreview] = useState('')
  const [afterPreview, setAfterPreview] = useState('')
  const [baUploading, setBaUploading] = useState(false)
  const [deletingCase, setDeletingCase] = useState<string | null>(null)
  const beforeRef = useRef<HTMLInputElement>(null)
  const afterRef = useRef<HTMLInputElement>(null)

  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  const loadImages = async () => {
    setLoadingImages(true)
    const res = await fetch('/api/admin/gallery')
    const data = await res.json()
    setImages(Array.isArray(data) ? data : [])
    setLoadingImages(false)
  }

  const loadCases = async () => {
    setLoadingCases(true)
    const res = await fetch('/api/admin/before-after')
    const data = await res.json()
    setCases(Array.isArray(data) ? data : [])
    setLoadingCases(false)
  }

  useEffect(() => { loadImages(); loadCases() }, [])

  // ── General gallery ────────────────────────────────────────────────────────
  const upload = async (file: File) => {
    if (!file.type.startsWith('image/')) { showToast('Only image files allowed', false); return }
    if (file.size > 10 * 1024 * 1024) { showToast('File too large — max 10MB', false); return }
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('caption', caption)
    const res = await fetch('/api/admin/gallery', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.success) { showToast('Image uploaded!'); setCaption(''); loadImages() }
    else showToast(data.error || 'Upload failed', false)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caption])

  const handleDeleteImage = async (img: GalleryImage) => {
    if (!confirm('Delete this photo?')) return
    const res = await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: img.id, filename: img.filename }),
    })
    const data = await res.json()
    if (data.success) { showToast('Image deleted'); setImages(prev => prev.filter(i => i.id !== img.id)) }
    else showToast('Delete failed', false)
  }

  // ── Before/After ───────────────────────────────────────────────────────────
  const pickFile = (which: 'before' | 'after', file: File) => {
    if (!file.type.startsWith('image/')) { showToast('Images only', false); return }
    if (file.size > 2.5 * 1024 * 1024) { showToast('Image too large — max 2.5MB per image', false); return }
    if (which === 'before') { setBeforeFile(file); setBeforePreview(URL.createObjectURL(file)) }
    else { setAfterFile(file); setAfterPreview(URL.createObjectURL(file)) }
  }

  const handleAddCase = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!beforeFile || !afterFile) { showToast('Both images required', false); return }
    setBaUploading(true)
    
    try {
      const fd = new FormData()
      fd.append('label', baLabel)
      fd.append('before', beforeFile)
      fd.append('after', afterFile)
      
      const res = await fetch('/api/admin/before-after', { method: 'POST', body: fd })
      let data
      try {
        data = await res.json()
      } catch (jsonErr) {
        showToast('Server error or connection timed out.', false)
        return
      }

      if (data.success) {
        showToast('Case added!')
        setBaLabel('')
        setBeforeFile(null)
        setAfterFile(null)
        setBeforePreview('')
        setAfterPreview('')
        loadCases()
      } else {
        showToast(data.error || 'Upload failed', false)
      }
    } catch (err: any) {
      showToast(err.message || 'Network error occurred', false)
    } finally {
      setBaUploading(false)
    }
  }

  const handleDeleteCase = async (c: BeforeAfterCase) => {
    if (!confirm(`Delete "${c.label || 'this case'}"?`)) return
    setDeletingCase(c.id)
    const res = await fetch('/api/admin/before-after', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: c.id, before_filename: c.before_filename, after_filename: c.after_filename }),
    })
    const data = await res.json()
    setDeletingCase(null)
    if (data.success) { showToast('Case deleted'); setCases(prev => prev.filter(x => x.id !== c.id)) }
    else showToast('Delete failed', false)
  }

  return (
    <div className="min-h-screen bg-dental-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-dental-heading">Gallery Manager</h1>
          <div className="flex bg-white border border-dental-border rounded-xl overflow-hidden text-sm font-semibold">
            <button
              onClick={() => setTab('general')}
              className={`flex items-center gap-2 px-5 py-2.5 transition-colors ${tab === 'general' ? 'bg-dental-blue text-white' : 'text-dental-body hover:text-dental-heading'}`}
            >
              <ImageIcon size={14} /> General Photos
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === 'general' ? 'bg-white/20 text-white' : 'bg-dental-alt text-dental-body'}`}>{images.length}</span>
            </button>
            <button
              onClick={() => setTab('before-after')}
              className={`flex items-center gap-2 px-5 py-2.5 transition-colors ${tab === 'before-after' ? 'bg-dental-blue text-white' : 'text-dental-body hover:text-dental-heading'}`}
            >
              <SplitSquareHorizontal size={14} /> Before &amp; After
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === 'before-after' ? 'bg-white/20 text-white' : 'bg-dental-alt text-dental-body'}`}>{cases.length}</span>
            </button>
          </div>
        </div>

        {/* ── GENERAL TAB ──────────────────────────────────────────────────── */}
        {tab === 'general' && (
          <>
            <div className="bg-white rounded-2xl border border-dental-border p-6 mb-8">
              <h2 className="font-bold text-dental-heading mb-4 flex items-center gap-2">
                <Upload size={16} className="text-dental-blue" /> Upload New Photo
              </h2>
              <div className="mb-4">
                <label className="form-label">Caption (optional)</label>
                <input type="text" value={caption} onChange={e => setCaption(e.target.value)}
                  placeholder="e.g. Dr. Faisal at his chamber" className="form-input" />
              </div>
              <div
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${dragActive ? 'border-dental-blue bg-blue-50' : 'border-dental-border hover:border-dental-blue hover:bg-blue-50/30'}`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 size={32} className="text-dental-blue animate-spin" />
                    <p className="text-dental-body text-sm">Uploading...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <ImageIcon size={24} className="text-dental-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-dental-heading text-sm">Drag and drop a photo here</p>
                      <p className="text-dental-body text-xs mt-1">or click to browse — JPG, PNG, WebP — max 10MB</p>
                    </div>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = '' }} />
            </div>

            <div className="bg-white rounded-2xl border border-dental-border overflow-hidden">
              <div className="p-6 border-b border-dental-border">
                <h2 className="font-bold text-dental-heading">All Gallery Images</h2>
                <p className="text-dental-body text-xs mt-1">These appear live on the website gallery section.</p>
              </div>
              {loadingImages ? (
                <div className="p-16 text-center"><Loader2 size={28} className="text-dental-blue animate-spin mx-auto" /></div>
              ) : images.length === 0 ? (
                <div className="p-16 text-center">
                  <ImageIcon size={40} className="text-dental-border mx-auto mb-3" />
                  <p className="text-dental-body text-sm">No images uploaded yet. Add your first photo above.</p>
                  <p className="text-dental-body text-xs mt-2 opacity-70">The website currently shows default placeholder images until you upload photos here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
                  {images.map(img => (
                    <div key={img.id} className="group relative rounded-xl overflow-hidden border border-dental-border bg-dental-alt aspect-square">
                      <Image src={img.url} alt={img.caption || 'Gallery image'} fill className="object-cover" sizes="260px" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                        <button onClick={() => handleDeleteImage(img)} className="self-end w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors">
                          <Trash2 size={13} className="text-white" />
                        </button>
                        {img.caption && <p className="text-white text-xs font-semibold line-clamp-2">{img.caption}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── BEFORE/AFTER TAB ─────────────────────────────────────────────── */}
        {tab === 'before-after' && (
          <>
            <div className="bg-white rounded-2xl border border-dental-border p-6 mb-8">
              <h2 className="font-bold text-dental-heading mb-1 flex items-center gap-2">
                <SplitSquareHorizontal size={16} className="text-dental-blue" /> Add Before &amp; After Case
              </h2>
              <p className="text-dental-body text-xs mb-6">Upload a before and after photo pair for a treatment case.</p>
              <form onSubmit={handleAddCase} className="space-y-5">
                <div>
                  <label className="form-label">Case Label (optional)</label>
                  <input type="text" value={baLabel} onChange={e => setBaLabel(e.target.value)}
                    placeholder="e.g. Crown & Bridge Restoration — 42yr Male" className="form-input" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {/* Before */}
                  <div>
                    <label className="form-label">Before Photo *</label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all hover:border-dental-blue hover:bg-blue-50/30 ${beforePreview ? 'border-dental-blue' : 'border-dental-border'}`}
                      onClick={() => beforeRef.current?.click()}
                    >
                      {beforePreview ? (
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                          <Image src={beforePreview} alt="before" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-4">
                          <ImageIcon size={28} className="text-dental-border" />
                          <p className="text-dental-body text-sm font-semibold">Before Photo</p>
                          <p className="text-dental-body text-xs">Click to browse</p>
                        </div>
                      )}
                    </div>
                    <input ref={beforeRef} type="file" accept="image/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) pickFile('before', f); e.target.value = '' }} />
                  </div>
                  {/* After */}
                  <div>
                    <label className="form-label">After Photo *</label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all hover:border-dental-blue hover:bg-blue-50/30 ${afterPreview ? 'border-dental-blue' : 'border-dental-border'}`}
                      onClick={() => afterRef.current?.click()}
                    >
                      {afterPreview ? (
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                          <Image src={afterPreview} alt="after" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-4">
                          <ImageIcon size={28} className="text-dental-border" />
                          <p className="text-dental-body text-sm font-semibold">After Photo</p>
                          <p className="text-dental-body text-xs">Click to browse</p>
                        </div>
                      )}
                    </div>
                    <input ref={afterRef} type="file" accept="image/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) pickFile('after', f); e.target.value = '' }} />
                  </div>
                </div>
                <button type="submit" disabled={baUploading} className="btn-primary flex items-center gap-2 !py-3 !px-6">
                  {baUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {baUploading ? 'Uploading...' : 'Add Case'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl border border-dental-border overflow-hidden">
              <div className="p-6 border-b border-dental-border">
                <h2 className="font-bold text-dental-heading">All Before &amp; After Cases</h2>
                <p className="text-dental-body text-xs mt-1">These appear in the Before &amp; After section on the website.</p>
              </div>
              {loadingCases ? (
                <div className="p-16 text-center"><Loader2 size={28} className="text-dental-blue animate-spin mx-auto" /></div>
              ) : cases.length === 0 ? (
                <div className="p-16 text-center">
                  <SplitSquareHorizontal size={40} className="text-dental-border mx-auto mb-3" />
                  <p className="text-dental-body text-sm">No cases yet. Add your first before &amp; after case above.</p>
                </div>
              ) : (
                <div className="divide-y divide-dental-border">
                  {cases.map(c => (
                    <div key={c.id} className="p-5 flex items-start gap-5">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-dental-body font-semibold uppercase tracking-wider mb-2">Before</p>
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-dental-border">
                            <Image src={c.before_url} alt="before" fill className="object-cover" sizes="300px" />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-dental-body font-semibold uppercase tracking-wider mb-2">After</p>
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-dental-border">
                            <Image src={c.after_url} alt="after" fill className="object-cover" sizes="300px" />
                          </div>
                        </div>
                        {c.label && <p className="col-span-2 text-sm font-semibold text-dental-heading">{c.label}</p>}
                      </div>
                      <button
                        onClick={() => handleDeleteCase(c)}
                        disabled={deletingCase === c.id}
                        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-dental-body hover:text-red-500 hover:bg-red-50 transition-all mt-6"
                        title="Delete case"
                      >
                        {deletingCase === c.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold ${toast.ok ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
          {toast.ok ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}
