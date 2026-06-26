export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { ArrowLeft, Phone, Mail, Calendar, MessageSquare } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function BookingsAdmin() {
  const session = await getServerSession()
  if (!session) redirect('/admin/login')

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-dental-alt pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-dental-body hover:text-dental-blue text-sm transition-colors">
            <ArrowLeft size={14} />Back
          </Link>
          <h1 className="text-2xl font-bold text-dental-heading">All Bookings</h1>
          <span className="bg-dental-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full">{bookings?.length ?? 0}</span>
        </div>

        <div className="bg-white rounded-2xl border border-dental-border overflow-hidden">
          {bookings && bookings.length > 0 ? (
            <div className="divide-y divide-dental-border">
              {bookings.map((b) => (
                <div key={b.id} className="p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="font-bold text-dental-heading text-sm">{b.name}</div>
                    <div className="flex items-center gap-1.5 text-dental-body text-xs mt-1">
                      <Phone size={10} />{b.phone}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-dental-body uppercase tracking-wide mb-1">Service</div>
                    <div className="text-dental-heading text-sm">{b.service || '—'}</div>
                    {b.preferred_date && (
                      <div className="flex items-center gap-1 text-dental-body text-xs mt-1">
                        <Calendar size={10} />
                        {new Date(b.preferred_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>
                  <div>
                    {b.message && (
                      <>
                        <div className="text-xs font-semibold text-dental-body uppercase tracking-wide mb-1">Message</div>
                        <div className="text-dental-body text-xs line-clamp-2 italic">&ldquo;{b.message}&rdquo;</div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span className={`inline-block text-xs px-3 py-1.5 rounded-full font-semibold ${b.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                      {b.status}
                    </span>
                    <div className="text-dental-body text-xs">
                      {new Date(b.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center">
              <MessageSquare size={40} className="text-dental-border mx-auto mb-3" />
              <p className="text-dental-body">No bookings yet. They will appear here once patients submit the form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
