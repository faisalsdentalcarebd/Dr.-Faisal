import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('before_after_cases')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

async function uploadFile(file: File, prefix: 'before' | 'after'): Promise<{ url: string; filename: string }> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const filename = `before-after/${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  const { error } = await supabase.storage.from('gallery').upload(filename, buffer, {
    contentType: file.type,
    upsert: false,
  })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage.from('gallery').getPublicUrl(filename)
  return { url: data.publicUrl, filename }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const fd = await req.formData()
  const label = (fd.get('label') as string) || ''
  const beforeFile = fd.get('before') as File | null
  const afterFile = fd.get('after') as File | null

  if (!beforeFile || !afterFile) {
    return NextResponse.json({ error: 'Both before and after images are required' }, { status: 400 })
  }

  try {
    const [beforeResult, afterResult] = await Promise.all([
      uploadFile(beforeFile, 'before'),
      uploadFile(afterFile, 'after'),
    ])

    const { data: existing } = await supabase.from('before_after_cases').select('id', { count: 'exact' })
    const sort_order = existing?.length ?? 0

    const { error } = await supabase.from('before_after_cases').insert({
      label,
      before_url: beforeResult.url,
      after_url: afterResult.url,
      before_filename: beforeResult.filename,
      after_filename: afterResult.filename,
      sort_order,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, before_filename, after_filename } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  await Promise.all([
    before_filename ? supabase.storage.from('gallery').remove([before_filename]) : Promise.resolve(),
    after_filename ? supabase.storage.from('gallery').remove([after_filename]) : Promise.resolve(),
  ])
  const { error } = await supabase.from('before_after_cases').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
