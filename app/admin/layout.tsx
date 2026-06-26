import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#f1f5f9' }}>
      <AdminSidebar />
      <div className="flex-1 overflow-auto min-w-0">
        {children}
      </div>
    </div>
  )
}
