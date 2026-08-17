import { Category } from '../types'

export const fileConventionsCategory: Category = {
  id: 'file-conventions',
  name: 'File Conventions',
  icon: '📄',
  description: 'ข้อกำหนดของไฟล์ (File Conventions) พิเศษใน App Router',
  commands: [
    {
      id: 'layout',
      name: 'layout.tsx',
      description: 'Layout ที่ใช้ร่วมกันในหลาย page และจะไม่ถูก re-render เมื่อเปลี่ยนหน้า',
      syntax: 'export default function Layout({ children }: { children: React.ReactNode })',
      examples: [
        {
          title: 'Root Layout (app/layout.tsx)',
          language: 'tsx',
          code: `// Root layout จำเป็นต้องมีแท็ก html และ body
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}`
        },
        {
          title: 'Nested Layout (app/dashboard/layout.tsx)',
          language: 'tsx',
          code: `// Layout ย่อย จะถูกหุ้มด้วย layout ที่อยู่ชั้นนอกกว่า
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-800 text-white">Dashboard Nav</nav>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'page',
      name: 'page.tsx',
      description: 'ไฟล์สำหรับกำหนดหน้า UI (Page) ที่จะถูกแสดงผลในเส้นทาง URL นั้นๆ',
      syntax: 'export default function Page()',
      notes: 'ใน Next.js 16 ตัวแปร params และ searchParams ถูกเปลี่ยนเป็น Promise ที่ต้องถูก await',
      examples: [
        {
          title: 'หน้าเว็บพื้นฐาน',
          language: 'tsx',
          code: `export default function AboutPage() {
  return (
    <main>
      <h1>เกี่ยวกับเรา</h1>
      <p>นี่คือหน้าเกี่ยวกับเราของเว็บไซต์</p>
    </main>
  )
}`
        },
        {
          title: 'การอ่านค่า params และ searchParams',
          language: 'tsx',
          code: `// หน้าสำหรับแสดงสินค้า
export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // ⚠️ ต้องใช้ await ก่อนใช้งานพารามิเตอร์ใน Next.js 16
  const { id } = await params
  const { sort, page } = await searchParams
  
  return (
    <div>
      <h1>รหัสสินค้า: {id}</h1>
      <p>เรียงตาม: {sort}</p>
      <p>หน้าที่: {page}</p>
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'loading',
      name: 'loading.tsx',
      description: 'สร้าง Loading UI ชั่วคราว (Suspense boundary) ระหว่างรอข้อมูลโหลดในหน้านั้น',
      syntax: 'export default function Loading()',
      examples: [
        {
          title: 'Skeleton Loading',
          language: 'tsx',
          code: `// app/dashboard/loading.tsx
export default function Loading() {
  // แสดง Skeleton UI เพื่อบอกให้ผู้ใช้รู้ว่าข้อมูลกำลังโหลด
  return (
    <div className="space-y-4">
      <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-32 w-full bg-gray-200 animate-pulse rounded"></div>
      <div className="h-32 w-full bg-gray-200 animate-pulse rounded"></div>
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'error',
      name: 'error.tsx',
      description: 'ดักจับข้อผิดพลาด (Error Boundary) ระหว่างเรนเดอร์ และแยกการแสดงผลเมื่อเกิดข้อผิดพลาดออกจาก UI ส่วนที่เหลือ',
      syntax: 'export default function Error({ error, reset }: { error: Error, reset: () => void })',
      notes: '⚠️ ไฟล์ error.tsx จะต้องใส่ "use client" ไว้บรรทัดแรกเสมอ',
      examples: [
        {
          title: 'Error Boundary Component',
          language: 'tsx',
          code: `'use client' // Error components ต้องเป็น client components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // บันทึกข้อผิดพลาดไปยังระบบ log
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>มีบางอย่างผิดปกติ!</h2>
      <button
        // ลองพยายามเรนเดอร์หน้านั้นใหม่อีกครั้ง
        onClick={() => reset()}
      >
        ลองใหม่
      </button>
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'not-found',
      name: 'not-found.tsx',
      description: 'ปรับแต่ง UI แสดงผลสำหรับข้อผิดพลาด 404 (Not Found)',
      syntax: 'export default function NotFound()',
      examples: [
        {
          title: 'Custom 404 Page',
          language: 'tsx',
          code: `// app/not-found.tsx
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-bold">ไม่พบหน้านี้</h2>
      <p>หน้าที่คุณพยายามเข้าถึงไม่มีอยู่หรือถูกลบไปแล้ว</p>
      <Link href="/" className="text-blue-500 hover:underline">
        กลับสู่หน้าแรก
      </Link>
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'metadata-api',
      name: 'Metadata API',
      description: 'กำหนด Metadata เช่น ชื่อหน้าเว็บ (title) คำอธิบาย (description) สำหรับการทำ SEO',
      syntax: 'export const metadata: Metadata = {}',
      notes: 'ไม่ต้องใส่ <head> tag เอง Next.js จะแทรกในตำแหน่งที่เหมาะสมให้',
      examples: [
        {
          title: 'Static Metadata',
          language: 'tsx',
          code: `import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Next.js ข้อมูลเบื้องต้น',
  description: 'เรียนรู้วิธีการใช้งาน Next.js เพื่อสร้างเว็บระดับโปร',
}`
        },
        {
          title: 'Dynamic Metadata (generateMetadata)',
          language: 'tsx',
          code: `import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}
 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params
  
  // ดึงข้อมูลเพื่อสร้าง metadata ตามพารามิเตอร์
  const product = await fetchProduct(id)
 
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.imageUrl],
    },
  }
}`
        }
      ]
    }
  ]
}
