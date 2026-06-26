'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Save, CheckCircle, XCircle, Loader2 } from 'lucide-react'

type Price = {
  id: string
  service_id: string
  label: string
  unit: string
  min: number
  max: number
  note: string
}

export default function PricesAdmin() {
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    fetch('/api/admin/prices')
      .then(r => r.json())
      .then(d => { setPrices(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  const update = (id: string, field: 'min' | 'max', value: string) => {
    setPrices(prev => prev.map(p => p.id === id ? { ...p, [field]: Number(value) } : p))
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

  const fmt = (n: number) => '৳' + n.toLocaleString('en-BD')

  return (
    <div className="min-h-screen bg-dental-alt pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="inline-flex items-center gap-2 text-dental-body hover:text-dental-blue text-sm transition-colors">
              <ArrowLeft size={14} />Back
            </Link>
            <h1 className="text-2xl font-bold text-dental-heading">Manage Prices</h1>
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="btn-primary flex items-center gap-2 !py-2.5 !px-5"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 text-sm text-blue-700">
          <strong>How this works:</strong> Edit the minimum and maximum prices for each service below. Changes are reflected on the website cost calculator immediately after saving.
        </div>

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
              <p className="text-dental-body text-sm">No prices found. Run the Supabase schema to seed default prices.</p>
            </div>
          ) : (
            <div className="divide-y divide-dental-border">
              {prices.map(p => (
                <div key={p.id} className="p-5 sm:flex sm:items-center sm:gap-6">
                  <div className="flex-1 mb-3 sm:mb-0">
                    <div className="font-semibold text-dental-heading text-sm">{p.label}</div>
                    <div className="text-dental-body text-xs mt-0.5">{p.note} · per {p.unit}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <label className="text-xs text-dental-body block mb-1">Min (৳)</label>
                      <input
                        type="number"
                        value={p.min}
                        onChange={e => update(p.id, 'min', e.target.value)}
                        className="form-input !py-2 !px-3 w-32 text-sm"
                      />
                    </div>
                    <div className="text-dental-body text-sm mt-4">—</div>
                    <div>
                      <label className="text-xs text-dental-body block mb-1">Max (৳)</label>
                      <input
                        type="number"
                        value={p.max}
                        onChange={e => update(p.id, 'max', e.target.value)}
                        className="form-input !py-2 !px-3 w-32 text-sm"
                      />
                    </div>
                    <div className="mt-4 text-xs text-dental-body whitespace-nowrap">
                      = {fmt(p.min)} – {fmt(p.max)}
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
