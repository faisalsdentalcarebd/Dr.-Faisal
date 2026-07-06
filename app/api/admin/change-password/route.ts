import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { currentPassword, newPassword } = await req.json()

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { data: admin } = await supabaseAdmin
    .from('admin_users')
    .select('id, password_hash')
    .eq('email', token.email as string)
    .single()

  if (!admin) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const valid = await bcrypt.compare(currentPassword, admin.password_hash)
  if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })

  const newHash = await bcrypt.hash(newPassword, 12)

  await supabaseAdmin
    .from('admin_users')
    .update({ password_hash: newHash, updated_at: new Date().toISOString() })
    .eq('id', admin.id)

  return NextResponse.json({ success: true })
}
