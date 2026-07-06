import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { data: admin } = await supabaseAdmin
          .from('admin_users')
          .select('id, email, password_hash')
          .eq('email', credentials.email.toLowerCase().trim())
          .single()

        if (!admin) return null

        const valid = await bcrypt.compare(credentials.password, admin.password_hash)
        if (!valid) return null

        return { id: admin.id, name: 'Admin', email: admin.email }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8,
  },
  secret: process.env.NEXTAUTH_SECRET,
}
