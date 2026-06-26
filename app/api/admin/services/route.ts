import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

async function uploadImage(file: File, existingUrl?: string): Promise<string> {
  if (existingUrl) {
    const oldPath = existingUrl.split('/storage/v1/object/public/services/')[1]
    if (oldPath) await supabase.storage.from('services').remove([oldPath])
  }
  const ext = file.name.split('.').pop() ?? 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  const { error } = await supabase.storage.from('services').upload(filename, buffer, {
    contentType: file.type,
    upsert: false,
  })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage.from('services').getPublicUrl(filename)
  return data.publicUrl
}

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const fd = await req.formData()
  const name = fd.get('name') as string
  const slug = fd.get('slug') as string
  const description = (fd.get('description') as string) || ''
  const why_needed = (fd.get('why_needed') as string) || ''
  const when_needed = (fd.get('when_needed') as string) || ''
  const benefits = (fd.get('benefits') as string) || ''
  const price_min = Number(fd.get('price_min') ?? 0)
  const price_max = Number(fd.get('price_max') ?? 0)
  const unit = (fd.get('unit') as string) || 'treatment'
  const imageFile = fd.get('image') as File | null

  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

  let image_url = ''
  if (imageFile && imageFile.size > 0) {
    try { image_url = await uploadImage(imageFile) }
    catch (e: unknown) { return NextResponse.json({ error: (e as Error).message }, { status: 500 }) }
  }

  const { data: count } = await supabase.from('services').select('id', { count: 'exact' })
  const sort_order = (count?.length ?? 0)

  const { error } = await supabase.from('services').insert({
    name, slug, description, why_needed, when_needed, benefits,
    image_url, price_min, price_max, unit, sort_order,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const fd = await req.formData()
  const id = fd.get('id') as string
  const name = fd.get('name') as string
  const slug = fd.get('slug') as string
  const description = (fd.get('description') as string) || ''
  const why_needed = (fd.get('why_needed') as string) || ''
  const when_needed = (fd.get('when_needed') as string) || ''
  const benefits = (fd.get('benefits') as string) || ''
  const price_min = Number(fd.get('price_min') ?? 0)
  const price_max = Number(fd.get('price_max') ?? 0)
  const unit = (fd.get('unit') as string) || 'treatment'
  const imageFile = fd.get('image') as File | null
  const existingImageUrl = (fd.get('image_url') as string) || ''

  if (!id || !name) return NextResponse.json({ error: 'ID and name required' }, { status: 400 })

  let image_url = existingImageUrl
  if (imageFile && imageFile.size > 0) {
    try { image_url = await uploadImage(imageFile, existingImageUrl) }
    catch (e: unknown) { return NextResponse.json({ error: (e as Error).message }, { status: 500 }) }
  }

  const { error } = await supabase.from('services').update({
    name, slug, description, why_needed, when_needed, benefits,
    image_url, price_min, price_max, unit,
  }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const items = await req.json() as { id: string; sort_order: number }[]
  for (const item of items) {
    await supabase.from('services').update({ sort_order: item.sort_order }).eq('id', item.id)
  }
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, image_url } = await req.json()
  if (image_url) {
    const path = image_url.split('/storage/v1/object/public/services/')[1]
    if (path) await supabase.storage.from('services').remove([path])
  }
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
