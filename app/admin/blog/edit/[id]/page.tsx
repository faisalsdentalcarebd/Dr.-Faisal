export const dynamic = 'force-dynamic'

import { redirect, notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { createClient } from '@supabase/supabase-js'
import EditBlogPostClient from './EditBlogPostClient'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface Props {
  params: { id: string }
}

export default async function EditBlogPostPage({ params }: Props) {
  const session = await getServerSession()
  if (!session) redirect('/admin/login')

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .maybeSingle()

  if (!post) notFound()

  return <EditBlogPostClient initialPost={post} />
}
