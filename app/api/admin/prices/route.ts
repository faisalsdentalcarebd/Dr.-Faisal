import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('prices')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { label, service_id, unit, min, max, note } = body
  if (!label || !service_id) return NextResponse.json({ error: 'label and service_id required' }, { status: 400 })

  const { data: existing } = await supabase.from('prices').select('id', { count: 'exact' })
  const sort_order = existing?.length ?? 0

  const { error } = await supabase.from('prices').insert({
    label, service_id, unit: unit || 'treatment',
    min: min || 0, max: max || 0,
    note: note || `Per ${unit || 'treatment'}`,
    sort_order,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const prices = await req.json()
  const errors: string[] = []
  for (const p of prices) {
    const { error } = await supabase
      .from('prices')
      .update({ min: p.min, max: p.max, label: p.label, unit: p.unit, note: p.note })
      .eq('id', p.id)
    if (error) errors.push(error.message)
  }
  if (errors.length) return NextResponse.json({ error: errors.join('; ') }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const { error } = await supabase.from('prices').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
