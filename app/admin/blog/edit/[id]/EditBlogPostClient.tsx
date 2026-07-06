'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Save, Trash2, Loader2, CheckCircle, XCircle, ImageIcon } from 'lucide-react'

const CATEGORIES = ['General Dentistry', 'Implants', 'Orthodontics', 'Cosmetic', 'Oral Health', 'Patient Tips']

interface EditBlogPostClientProps {
  initialPost: {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    published: boolean
    cover_image_url: string
  }
}

export default function EditBlogPostClient({ initialPost }: EditBlogPostClientProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    id: initialPost.id,
    title: initialPost.title,
    slug: initialPost.slug,
    excerpt: initialPost.excerpt || '',
    content: initialPost.content || '',
    category: initialPost.category || '',
    published: initialPost.published || false,
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>(initialPost.cover_image_url || '')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  const set = (k: string, v: string | boolean) => setForm(prev => ({ ...prev, [k]: v }))

  const insertFormat = (type: 'bold' | 'h2' | 'h3' | 'list') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selected = text.substring(start, end)

    let replacement = ''
    if (type === 'bold') {
      replacement = `**${selected || 'bold text'}**`
    } else if (type === 'h2') {
      replacement = `\n## ${selected || 'Heading'}\n`
    } else if (type === 'h3') {
      replacement = `\n### ${selected || 'Subheading'}\n`
    } else if (type === 'list') {
      replacement = `\n- ${selected || 'List item'}\n`
    }

    const newContent = text.substring(0, start) + replacement + text.substring(end)
    setForm(prev => ({ ...prev, content: newContent }))

    setTimeout(() => {
      textarea.focus()
      const offset = replacement.length - selected.length
      textarea.setSelectionRange(start, end + offset)
    }, 50)
  }

  const handleCoverImage = (file: File) => {
    if (!file.type.startsWith('image/')) { showToast('Images only', false); return }
    if (file.size > 10 * 1024 * 1024) { showToast('Max 10MB', false); return }
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { showToast('Title is required', false); return }
    if (!form.slug.trim()) { showToast('Slug is required', false); return }
    setSaving(true)

    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
    if (coverFile) fd.append('cover_image', coverFile)

    try {
      const res = await fetch('/api/admin/blog', { method: 'PUT', body: fd })
      const data = await res.json()
      setSaving(false)
      if (data.success) {
        showToast('Post updated successfully!')
        setTimeout(() => router.push('/admin/blog'), 1200)
      } else {
        showToast(data.error || 'Failed to save', false)
      }
    } catch (err) {
      setSaving(false)
      showToast('An error occurred while saving', false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return
    setDeleting(true)

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: form.id })
      })
      const data = await res.json()
      setDeleting(false)
      if (data.success) {
        showToast('Post deleted successfully!')
        setTimeout(() => router.push('/admin/blog'), 1200)
      } else {
        showToast(data.error || 'Failed to delete', false)
      }
    } catch (err) {
      setDeleting(false)
      showToast('An error occurred while deleting', false)
    }
  }

  return (
    <div className="min-h-screen bg-dental-alt">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-dental-heading">Edit Blog Post</h1>
          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
          >
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete Post
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-2xl border border-dental-border p-6 space-y-5">
            <div>
              <label className="form-label">Title *</label>
              <input type="text" required value={form.title} onChange={e => set('title', e.target.value)}
                placeholder="e.g. Why Dental Implants Are Worth It" className="form-input" />
            </div>

            <div>
              <label className="form-label">URL Slug *</label>
              <input type="text" required value={form.slug} onChange={e => set('slug', e.target.value)}
                placeholder="why-dental-implants-are-worth-it" className="form-input font-mono text-sm" />
              <p className="text-dental-body text-xs mt-1">This forms the link address: /blog/{form.slug || 'your-slug'}</p>
            </div>

            <div>
              <label className="form-label">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="form-input">
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Cover Image */}
            <div>
              <label className="form-label">Cover Image</label>
              <div
                className="border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-dental-blue hover:bg-blue-50/30"
                style={{ borderColor: coverPreview ? '#1B6FC9' : undefined }}
                onClick={() => fileRef.current?.click()}
              >
                {coverPreview ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden">
                    <img src={coverPreview} alt="cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 rounded-xl">
                      <p className="text-white text-sm font-semibold">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center gap-2">
                    <ImageIcon size={28} className="text-dental-border" />
                    <p className="text-dental-body text-sm">Click to upload a cover image</p>
                    <p className="text-dental-body text-xs">JPG, PNG, WebP — max 10MB — recommended 1200×630px</p>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverImage(f); e.target.value = '' }} />
            </div>

            <div>
              <label className="form-label">Short Excerpt</label>
              <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)}
                placeholder="A brief 1-2 sentence summary shown on the blog listing page..."
                rows={2} className="form-input resize-none" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="form-label !mb-0">Full Content</label>
                <span className="text-[10px] text-dental-blue bg-blue-50 border border-blue-100 rounded-lg px-2 py-0.5 font-medium">Auto-formats Markdown</span>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex items-center gap-1.5 p-2 bg-dental-alt border-t border-x border-dental-border rounded-t-xl">
                <button
                  type="button"
                  onClick={() => insertFormat('bold')}
                  className="px-3 py-1.5 text-xs font-bold text-dental-heading bg-white hover:bg-dental-blue hover:text-white border border-dental-border rounded-lg transition-all shadow-sm"
                  title="Make Selected Text Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('h2')}
                  className="px-2.5 py-1.5 text-xs font-bold text-dental-heading bg-white hover:bg-dental-blue hover:text-white border border-dental-border rounded-lg transition-all shadow-sm"
                  title="Insert Main Heading (H2)"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('h3')}
                  className="px-2.5 py-1.5 text-xs font-bold text-dental-heading bg-white hover:bg-dental-blue hover:text-white border border-dental-border rounded-lg transition-all shadow-sm"
                  title="Insert Subheading (H3)"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('list')}
                  className="px-2.5 py-1.5 text-xs font-bold text-dental-heading bg-white hover:bg-dental-blue hover:text-white border border-dental-border rounded-lg transition-all shadow-sm"
                  title="Insert Bullet List"
                >
                  • List
                </button>
              </div>

              <textarea 
                ref={textareaRef}
                value={form.content} 
                onChange={e => set('content', e.target.value)}
                placeholder="Write the full blog post here..."
                rows={15} 
                className="form-input rounded-b-xl rounded-t-none border-t-0 resize-y text-sm leading-relaxed" 
              />
              
              {/* Formatting Helper Tip Card */}
              <div className="mt-2 bg-dental-alt border border-dental-border rounded-xl p-4 text-[11px] text-dental-body space-y-1.5 leading-relaxed">
                <p className="font-bold text-dental-heading mb-1 text-xs">Easy Content Formatting Tips:</p>
                <p>• <strong>To highlight key text or SEO words in bold:</strong> Wrap them in double asterisks, like <code className="bg-white px-1.5 py-0.5 rounded border">**best dental surgeon in Bangladesh**</code>.</p>
                <p>• <strong>To create a main heading:</strong> Start a new paragraph line with <code className="bg-white px-1.5 py-0.5 rounded border">## </code> (e.g. <code className="bg-white px-1.5 py-0.5 rounded border">## Why Implants are the Best Choice</code>).</p>
                <p>• <strong>To create a subheading:</strong> Start a new paragraph line with <code className="bg-white px-1.5 py-0.5 rounded border">### </code> (e.g. <code className="bg-white px-1.5 py-0.5 rounded border">### Stage 1: Diagnosis</code>).</p>
                <p>• <strong>To create a bulleted list:</strong> Write the list items in a single paragraph block, starting each list line with <code className="bg-white px-1.5 py-0.5 rounded border">- </code> (e.g. <code className="bg-white px-1.5 py-0.5 rounded border">- Pain-free extraction</code>).</p>
              </div>
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
              {saving ? 'Updating...' : 'Save Changes'}
            </button>
            <Link href="/admin/blog" className="text-dental-body hover:text-dental-heading text-sm transition-colors font-medium">
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
