export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { LayoutDashboard, CalendarDays, FileText, LogOut, Phone, Clock, ImageIcon, DollarSign } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function AdminDashboard() {
  const session = await getServerSession()
  if (!session) redirect('/admin/login')

  const [{ count: bookingCount }, { count: blogCount }, { count: galleryCount }] = await Promise.all([
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('gallery_images').select('*', { count: 'exact', head: true }),
  ])

  const { data: recentBookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-dental-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-dental-heading">Admin Dashboard</h1>
            <p className="text-dental-body text-sm">Faisal&apos;s Dental Care — Management Panel</p>
          </div>
          <Link href="/api/auth/signout" className="btn-outline-blue !text-sm !py-2 !px-4 flex items-center gap-2">
            <LogOut size={14} /> Sign Out
          </Link>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-5 mb-10">
          {[
            { icon: CalendarDays, label: 'Total Bookings', value: bookingCount ?? 0, color: 'bg-blue-50 text-dental-blue' },
            { icon: FileText, label: 'Blog Posts', value: blogCount ?? 0, color: 'bg-emerald-50 text-emerald-600' },
            { icon: ImageIcon, label: 'Gallery Photos', value: galleryCount ?? 0, color: 'bg-purple-50 text-purple-600' },
            { icon: Clock, label: 'Pending Bookings', value: recentBookings?.filter(b => b.status === 'pending').length ?? 0, color: 'bg-amber-50 text-amber-600' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-6 border border-dental-border">
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <div className="text-3xl font-extrabold text-dental-heading">{value}</div>
              <div className="text-dental-body text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Nav Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <Link href="/admin/bookings" className="bg-white rounded-2xl p-6 border border-dental-border hover:border-dental-blue hover:shadow-glass transition-all duration-300 group">
            <CalendarDays size={24} className="text-dental-blue mb-3" />
            <h3 className="font-bold text-dental-heading group-hover:text-dental-blue transition-colors">Bookings →</h3>
            <p className="text-dental-body text-xs mt-1">View and manage all appointment requests.</p>
          </Link>
          <Link href="/admin/blog" className="bg-white rounded-2xl p-6 border border-dental-border hover:border-dental-blue hover:shadow-glass transition-all duration-300 group">
            <FileText size={24} className="text-dental-blue mb-3" />
            <h3 className="font-bold text-dental-heading group-hover:text-dental-blue transition-colors">Blog Posts →</h3>
            <p className="text-dental-body text-xs mt-1">Publish and manage dental articles.</p>
          </Link>
          <Link href="/admin/gallery" className="bg-white rounded-2xl p-6 border border-dental-border hover:border-purple-400 hover:shadow-glass transition-all duration-300 group">
            <ImageIcon size={24} className="text-purple-500 mb-3" />
            <h3 className="font-bold text-dental-heading group-hover:text-purple-600 transition-colors">Gallery →</h3>
            <p className="text-dental-body text-xs mt-1">Upload and manage clinic photos.</p>
          </Link>
          <Link href="/admin/prices" className="bg-white rounded-2xl p-6 border border-dental-border hover:border-emerald-400 hover:shadow-glass transition-all duration-300 group">
            <DollarSign size={24} className="text-emerald-500 mb-3" />
            <h3 className="font-bold text-dental-heading group-hover:text-emerald-600 transition-colors">Prices →</h3>
            <p className="text-dental-body text-xs mt-1">Update treatment cost ranges.</p>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-dental-border overflow-hidden">
          <div className="p-6 border-b border-dental-border">
            <h2 className="font-bold text-dental-heading">Recent Bookings</h2>
          </div>
          {recentBookings && recentBookings.length > 0 ? (
            <div className="divide-y divide-dental-border">
              {recentBookings.map((b) => (
                <div key={b.id} className="p-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-dental-heading text-sm">{b.name}</div>
                    <div className="text-dental-body text-xs flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1"><Phone size={10} />{b.phone}</span>
                      {b.service && <span>{b.service}</span>}
                    </div>
                    {b.message && <div className="text-dental-body text-xs mt-1 line-clamp-1 italic">&ldquo;{b.message}&rdquo;</div>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-semibold ${b.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                      {b.status}
                    </span>
                    <div className="text-dental-body text-xs mt-1">
                      {new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-dental-body text-sm">No bookings yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
