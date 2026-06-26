import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, message } = body

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Name, phone, and message are required.' }, { status: 400 })
    }

    const { error } = await supabase.from('contact_submissions').insert([
      {
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : null,
        message: String(message).trim(),
      },
    ])

    if (error) throw error
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Failed to save submission.' }, { status: 500 })
  }
}
