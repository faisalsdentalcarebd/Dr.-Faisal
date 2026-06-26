import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, service, preferred_date, message } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 })
    }

    const { error } = await supabase.from('bookings').insert([
      {
        name: String(name).trim(),
        phone: String(phone).trim(),
        service: service || null,
        preferred_date: preferred_date || null,
        message: message || null,
        status: 'pending',
      },
    ])

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Booking error:', err)
    return NextResponse.json({ error: 'Failed to save booking.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.NEXTAUTH_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
