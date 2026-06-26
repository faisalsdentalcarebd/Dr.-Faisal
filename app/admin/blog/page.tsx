export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { FileText, CheckCircle, XCircle, PlusCircle } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function BlogAdmin() {
  const session = await getServerSession()
  if (!session) redirect('/admin/login')

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-dental-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-dental-heading">Blog Posts</h1>
            <span className="bg-dental-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full">{posts?.length ?? 0}</span>
          </div>
          <Link href="/admin/blog/new" className="btn-primary flex items-center gap-2 !py-2.5 !px-5 !text-sm">
            <PlusCircle size={14} /> New Post
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-dental-border overflow-hidden">
          {posts && posts.length > 0 ? (
            <div className="divide-y divide-dental-border">
              {posts.map((post) => (
                <div key={post.id} className="p-6 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-bold text-dental-heading text-sm mb-1">{post.title}</div>
                    {post.category && (
                      <span className="text-xs bg-dental-alt text-dental-body px-2 py-0.5 rounded-full">{post.category}</span>
                    )}
                    {post.excerpt && (
                      <p className="text-dental-body text-xs mt-2 line-clamp-2">{post.excerpt}</p>
                    )}
                    <p className="text-dental-body text-xs mt-1 font-mono opacity-60">/blog/{post.slug}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {post.published ? (
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs px-3 py-1.5 rounded-full font-semibold border border-green-200">
                        <CheckCircle size={11} />Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-500 text-xs px-3 py-1.5 rounded-full font-semibold border border-gray-200">
                        <XCircle size={11} />Draft
                      </span>
                    )}
                    <div className="text-dental-body text-xs">
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center">
              <FileText size={40} className="text-dental-border mx-auto mb-3" />
              <p className="text-dental-body text-sm mb-4">No blog posts yet.</p>
              <Link href="/admin/blog/new" className="btn-primary inline-flex items-center gap-2 !py-2.5 !px-5 !text-sm">
                <PlusCircle size={14} /> Write Your First Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
