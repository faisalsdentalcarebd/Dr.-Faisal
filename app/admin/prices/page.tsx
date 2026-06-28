'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Save, CheckCircle, XCircle, Loader2, Plus, Trash2, X } from 'lucide-react'

type Price = {
  id: string
  service_id: string
  label: string
  unit: string
  min: number
  max: number
  note: string
}

const UNIT_OPTIONS = ['tooth', 'session', 'treatment', 'implant', 'unit', 'arch', 'sitting', 'jaw', 'visit']

const EMPTY_ADD = { label: '', service_id: '', unit: 'tooth', min: 0, max: 0, note: '' }

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function PricesAdmin() {
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState(EMPTY_ADD)
  const [addSaving, setAddSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  const load = () => {
    setLoading(true)
    fetch('/api/admin/prices')
      .then(r => r.json())
      .then(d => { setPrices(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const update = (id: string, field: keyof Price, value: string | number) => {
    setPrices(prev => prev.map(p => p.id === id ? { ...p, [field]: field === 'min' || field === 'max' ? Number(value) : value } : p))
  }

  const save = async () => {
    setSaving(true)
    const res = await fetch('/api/admin/prices', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prices),
    })
    const data = await res.json()
    setSaving(false)
    if (data.success) showToast('Prices saved!')
    else showToast(data.error || 'Save failed', false)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!addForm.label.trim()) { showToast('Label is required', false); return }
    setAddSaving(true)
    const res = await fetch('/api/admin/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...addForm,
        service_id: addForm.service_id || slugify(addForm.label),
        note: addForm.note || `Per ${addForm.unit}`,
      }),
    })
    const data = await res.json()
    setAddSaving(false)
    if (data.success) {
      showToast('Price added!')
      setShowAdd(false)
      setAddForm(EMPTY_ADD)
      load()
    } else {
      showToast(data.error || 'Failed to add', false)
    }
  }

  const handleDelete = async (p: Price) => {
    if (!confirm(`Delete "${p.label}"?`)) return
    setDeletingId(p.id)
    const res = await fetch('/api/admin/prices', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: p.id }),
    })
    const data = await res.json()
    setDeletingId(null)
    if (data.success) { showToast('Deleted'); setPrices(prev => prev.filter(x => x.id !== p.id)) }
    else showToast(data.error || 'Delete failed', false)
  }

  const fmt = (n: number) => '৳' + n.toLocaleString('en-BD')

  return (
    <div className="min-h-screen bg-dental-alt">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-dental-heading">Manage Prices</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdd(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dental-blue text-dental-blue text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              {showAdd ? <X size={14} /> : <Plus size={14} />}
              {showAdd ? 'Cancel' : 'Add Price'}
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="btn-primary flex items-center gap-2 !py-2.5 !px-5"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 text-sm text-blue-700">
          <strong>How this works:</strong> Edit min/max prices below and click Save. Add new rows or delete unused ones. Changes reflect on the website cost calculator immediately.
        </div>

        {/* Add Price Form */}
        {showAdd && (
          <div className="bg-white rounded-2xl border border-dental-blue/30 p-6 mb-6">
            <h3 className="font-bold text-dental-heading mb-5 flex items-center gap-2">
              <Plus size={15} className="text-dental-blue" /> Add New Price Entry
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dental-body uppercase tracking-widest mb-1.5 block">Label *</label>
                  <input
                    type="text"
                    required
                    value={addForm.label}
                    onChange={e => setAddForm(f => ({ ...f, label: e.target.value, service_id: slugify(e.target.value) }))}
                    placeholder="e.g. Dental Filling"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dental-body uppercase tracking-widest mb-1.5 block">Unit</label>
                  <select value={addForm.unit} onChange={e => setAddForm(f => ({ ...f, unit: e.target.value }))} className="form-input">
                    {UNIT_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dental-body uppercase tracking-widest mb-1.5 block">Min (৳)</label>
                  <input type="number" min={0} value={addForm.min} onChange={e => setAddForm(f => ({ ...f, min: Number(e.target.value) }))} className="form-input" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dental-body uppercase tracking-widest mb-1.5 block">Max (৳)</label>
                  <input type="number" min={0} value={addForm.max} onChange={e => setAddForm(f => ({ ...f, max: Number(e.target.value) }))} className="form-input" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dental-body uppercase tracking-widest mb-1.5 block">Note</label>
                  <input type="text" value={addForm.note} onChange={e => setAddForm(f => ({ ...f, note: e.target.value }))} placeholder={`Per ${addForm.unit}`} className="form-input" />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <button type="submit" disabled={addSaving} className="btn-primary flex items-center gap-2 !py-2.5 !px-5 !text-sm">
                  {addSaving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                  {addSaving ? 'Adding...' : 'Add Price'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-dental-border overflow-hidden">
          <div className="p-6 border-b border-dental-border">
            <h2 className="font-bold text-dental-heading flex items-center gap-2">
              <DollarSign size={16} className="text-dental-blue" /> Service Price Ranges
            </h2>
          </div>

          {loading ? (
            <div className="p-16 text-center"><Loader2 size={28} className="text-dental-blue animate-spin mx-auto" /></div>
          ) : prices.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-dental-body text-sm">No prices found. Add one above.</p>
            </div>
          ) : (
            <div className="divide-y divide-dental-border">
              {prices.map(p => (
                <div key={p.id} className="p-5 sm:flex sm:items-center sm:gap-4">
                  <div className="flex-1 mb-3 sm:mb-0">
                    <div className="font-semibold text-dental-heading text-sm">{p.label}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <select
                        value={p.unit}
                        onChange={e => update(p.id, 'unit', e.target.value)}
                        className="text-xs border border-dental-border rounded-lg px-2 py-1 text-dental-body bg-dental-alt focus:outline-none focus:border-dental-blue"
                      >
                        {UNIT_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                      <input
                        type="text"
                        value={p.note}
                        onChange={e => update(p.id, 'note', e.target.value)}
                        className="text-xs border border-dental-border rounded-lg px-2 py-1 text-dental-body bg-dental-alt focus:outline-none focus:border-dental-blue flex-1 max-w-[200px]"
                        placeholder="Note"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <label className="text-xs text-dental-body block mb-1">Min (৳)</label>
                      <input
                        type="number"
                        value={p.min}
                        onChange={e => update(p.id, 'min', e.target.value)}
                        className="form-input !py-2 !px-3 w-28 text-sm"
                      />
                    </div>
                    <div className="text-dental-body text-sm mt-4">—</div>
                    <div>
                      <label className="text-xs text-dental-body block mb-1">Max (৳)</label>
                      <input
                        type="number"
                        value={p.max}
                        onChange={e => update(p.id, 'max', e.target.value)}
                        className="form-input !py-2 !px-3 w-28 text-sm"
                      />
                    </div>
                    <div className="mt-4 text-xs text-dental-body whitespace-nowrap hidden lg:block">
                      = {fmt(p.min)} – {fmt(p.max)}
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => handleDelete(p)}
                        disabled={deletingId === p.id}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-dental-body hover:text-red-500 hover:bg-red-50 transition-all"
                        title="Delete this price"
                      >
                        {deletingId === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
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
