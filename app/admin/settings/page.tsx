'use client'

import { useState } from 'react'
import { KeyRound, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('idle')

    if (next !== confirm) {
      setStatus('error')
      setMessage('New passwords do not match.')
      return
    }
    if (next.length < 8) {
      setStatus('error')
      setMessage('New password must be at least 8 characters.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('Password updated successfully. Use your new password next time you log in.')
        setCurrent(''); setNext(''); setConfirm('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dental-alt py-10 px-6 sm:px-10">
      <div className="max-w-xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-dental-heading">Settings</h1>
          <p className="text-dental-body text-sm mt-1">Manage your admin account</p>
        </div>

        <div className="bg-white rounded-2xl border border-dental-border p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <KeyRound size={18} className="text-dental-blue" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-dental-heading">Change Password</h2>
              <p className="text-xs text-dental-body">Choose a strong password you'll remember</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-dental-body uppercase tracking-wider block mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={current}
                  onChange={e => setCurrent(e.target.value)}
                  required
                  className="w-full bg-white border border-dental-border rounded-xl px-4 py-3 text-sm text-dental-heading placeholder-gray-400 focus:outline-none focus:border-dental-blue pr-10 focus:ring-1 focus:ring-dental-blue"
                  placeholder="Enter current password"
                />
                <button type="button" onClick={() => setShowCurrent(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dental-body hover:text-dental-heading">
                  {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-dental-body uppercase tracking-wider block mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNext ? 'text' : 'password'}
                  value={next}
                  onChange={e => setNext(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-white border border-dental-border rounded-xl px-4 py-3 text-sm text-dental-heading placeholder-gray-400 focus:outline-none focus:border-dental-blue pr-10 focus:ring-1 focus:ring-dental-blue"
                  placeholder="Minimum 8 characters"
                />
                <button type="button" onClick={() => setShowNext(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dental-body hover:text-dental-heading">
                  {showNext ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-dental-body uppercase tracking-wider block mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                className="w-full bg-white border border-dental-border rounded-xl px-4 py-3 text-sm text-dental-heading placeholder-gray-400 focus:outline-none focus:border-dental-blue focus:ring-1 focus:ring-dental-blue"
                placeholder="Re-enter new password"
              />
            </div>

            {status !== 'idle' && (
              <div className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm border ${
                status === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {status === 'success'
                  ? <CheckCircle size={15} className="mt-0.5 flex-shrink-0" />
                  : <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />}
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dental-blue hover:bg-dental-blue-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors mt-2"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
