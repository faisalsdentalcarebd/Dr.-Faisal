'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Upload, Trash2, ImageIcon, CheckCircle, XCircle, Loader2 } from 'lucide-react'

type GalleryImage = {
  id: string
  url: string
  caption: string
  filename: string
  created_at: string
}

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [caption, setCaption] = useState('')
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/gallery')
    const data = await res.json()
    setImages(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

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
    if (data.success) { showToast('Image uploaded!'); setCaption(''); load() }
    else showToast(data.error || 'Upload failed', false)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }, [caption])

  const handleDelete = async (img: GalleryImage) => {
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

  return (
    <div className="min-h-screen bg-dental-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-dental-heading">Gallery Manager</h1>
          <span className="bg-dental-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full">{images.length}</span>
        </div>

        {/* Upload Zone */}
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

        {/* Grid */}
        <div className="bg-white rounded-2xl border border-dental-border overflow-hidden">
          <div className="p-6 border-b border-dental-border">
            <h2 className="font-bold text-dental-heading">All Gallery Images</h2>
            <p className="text-dental-body text-xs mt-1">These appear live on the website gallery section.</p>
          </div>
          {loading ? (
            <div className="p-16 text-center"><Loader2 size={28} className="text-dental-blue animate-spin mx-auto" /></div>
          ) : images.length === 0 ? (
            <div className="p-16 text-center">
              <ImageIcon size={40} className="text-dental-border mx-auto mb-3" />
              <p className="text-dental-body text-sm">No images uploaded yet. Add your first photo above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
              {images.map(img => (
                <div key={img.id} className="group relative rounded-xl overflow-hidden border border-dental-border bg-dental-alt aspect-square">
                  <Image src={img.url} alt={img.caption} fill className="object-cover" sizes="260px" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                    <button onClick={() => handleDelete(img)} className="self-end w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors">
                      <Trash2 size={13} className="text-white" />
                    </button>
                    {img.caption && <p className="text-white text-xs font-semibold line-clamp-2">{img.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
