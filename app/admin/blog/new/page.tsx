'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileText, Save, Loader2, CheckCircle, XCircle } from 'lucide-react'

const CATEGORIES = ['General Dentistry', 'Implants', 'Orthodontics', 'Cosmetic', 'Oral Health', 'Patient Tips']

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function NewBlogPost() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', category: '', published: false,
  })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  const set = (k: string, v: string | boolean) => setForm(prev => ({ ...prev, [k]: v }))

  const handleTitleChange = (v: string) => {
    setForm(prev => ({ ...prev, title: v, slug: slugify(v) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { showToast('Title is required', false); return }
    if (!form.slug.trim()) { showToast('Slug is required', false); return }
    setSaving(true)
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setSaving(false)
    if (data.success) {
      showToast('Post created!')
      setTimeout(() => router.push('/admin/blog'), 1200)
    } else {
      showToast(data.error || 'Failed to save', false)
    }
  }

  return (
    <div className="min-h-screen bg-dental-alt pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog" className="inline-flex items-center gap-2 text-dental-body hover:text-dental-blue text-sm transition-colors">
              <ArrowLeft size={14} />Back
            </Link>
            <h1 className="text-2xl font-bold text-dental-heading">New Blog Post</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-2xl border border-dental-border p-6 space-y-5">
            <div>
              <label className="form-label">Title *</label>
              <input type="text" required value={form.title} onChange={e => handleTitleChange(e.target.value)}
                placeholder="e.g. Why Dental Implants Are Worth It" className="form-input" />
            </div>

            <div>
              <label className="form-label">URL Slug *</label>
              <input type="text" required value={form.slug} onChange={e => set('slug', e.target.value)}
                placeholder="why-dental-implants-are-worth-it" className="form-input font-mono text-sm" />
              <p className="text-dental-body text-xs mt-1">Auto-generated from title. This is the URL: /blog/{form.slug || 'your-slug'}</p>
            </div>

            <div>
              <label className="form-label">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="form-input">
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="form-label">Short Excerpt</label>
              <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)}
                placeholder="A brief 1-2 sentence summary shown on the blog listing page..."
                rows={2} className="form-input resize-none" />
            </div>

            <div>
              <label className="form-label">Full Content</label>
              <textarea value={form.content} onChange={e => set('content', e.target.value)}
                placeholder="Write the full blog post here..."
                rows={12} className="form-input resize-y font-mono text-sm" />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => set('published', !form.published)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.published ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${form.published ? 'left-6' : 'left-1'}`} />
              </button>
              <span className="text-sm font-medium text-dental-heading">
                {form.published ? 'Published — visible on the website' : 'Draft — not visible yet'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 !py-3 !px-6">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? 'Saving...' : 'Save Post'}
            </button>
            <Link href="/admin/blog" className="text-dental-body hover:text-dental-heading text-sm transition-colors">
              Cancel
            </Link>
          </div>
        </form>
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
