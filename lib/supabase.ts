import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

export type Booking = {
  id: string
  name: string
  phone: string
  service: string | null
  preferred_date: string | null
  message: string | null
  status: string
  created_at: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  category: string | null
  published: boolean
  cover_image_url?: string
  created_at: string
}

export type ContactSubmission = {
  id: string
  name: string
  phone: string
  email: string | null
  message: string
  created_at: string
}
