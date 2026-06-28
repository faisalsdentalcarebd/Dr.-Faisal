import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function uploadCover(file: File, existingUrl?: string): Promise<string> {
  if (existingUrl) {
    const oldPath = existingUrl.split('/storage/v1/object/public/blog/')[1]
    if (oldPath) await supabase.storage.from('blog').remove([oldPath])
  }
  const ext = file.name.split('.').pop() ?? 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  const { error } = await supabase.storage.from('blog').upload(filename, buffer, {
    contentType: file.type,
    upsert: false,
  })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage.from('blog').getPublicUrl(filename)
  return data.publicUrl
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const contentType = req.headers.get('content-type') ?? ''
  let title = '', slug = '', excerpt = '', content = '', category = '', published = false
  let cover_image_url = ''

  if (contentType.includes('multipart/form-data')) {
    const fd = await req.formData()
    title = (fd.get('title') as string) || ''
    slug = (fd.get('slug') as string) || ''
    excerpt = (fd.get('excerpt') as string) || ''
    content = (fd.get('content') as string) || ''
    category = (fd.get('category') as string) || ''
    published = fd.get('published') === 'true'
    const coverFile = fd.get('cover_image') as File | null
    if (coverFile && coverFile.size > 0) {
      try { cover_image_url = await uploadCover(coverFile) }
      catch (e: unknown) { return NextResponse.json({ error: (e as Error).message }, { status: 500 }) }
    }
  } else {
    const body = await req.json()
    ;({ title, slug, excerpt, content, category, published } = body)
  }

  if (!title || !slug) return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({ title, slug, excerpt, content, category, published: !!published, cover_image_url })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, post: data })
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { id, title, slug, excerpt, content, category, published } = body

  const { data, error } = await supabase
    .from('blog_posts')
    .update({ title, slug, excerpt, content, category, published: !!published })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, post: data })
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  await supabase.from('blog_posts').delete().eq('id', id)
  return NextResponse.json({ success: true })
}
