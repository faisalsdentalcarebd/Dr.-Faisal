'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import MobileBookingBar from '@/components/ui/MobileBookingBar'
import JsonLd from '@/components/JsonLd'
import Preloader from '@/components/Preloader'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <Preloader />
      <JsonLd />
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileBookingBar />
    </>
  )
}
