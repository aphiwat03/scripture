import { Category } from '../types'

export const routingCategory: Category = {
  id: 'routing',
  name: 'Routing',
  icon: '🗯️',
  description: 'การจัดการเส้นทาง URL ใน Next.js App Router',
  commands: [
    {
      id: 'dynamic-routes',
      name: 'Dynamic Routes [slug]',
      description: 'เส้นทาง URL แบบ dynamic โดยใช้วงเล็บ [] เช่น [id] หรือ [slug]',
      syntax: 'app/blog/[slug]/page.tsx',
      notes: '⚠️ Next.js 16: params เป็น Promise ต้อง await params เสมอ',
      examples: [
        {
          title: 'หน้าเพจที่ดึงข้อมูลตามพารามิเตอร์ (Next.js 16+)',
          language: 'tsx',
          code: `export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // ต้อง await params ใน Next.js 16+
  const { slug } = await params
  
  return <h1>โพสต์: {slug}</h1>
}`
        },
        {
          title: 'การสร้างหน้าแบบ Static (SSG) ด้วย generateStaticParams',
          language: 'tsx',
          code: `export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  
  // คืนค่า array ของพารามิเตอร์เพื่อบอก Next.js ว่าจะสร้างหน้าไหนบ้าง
  return posts.map((post) => ({
    slug: post.slug,
  }))
}`
        }
      ]
    },
    {
      id: 'catch-all-routes',
      name: 'Catch-all Routes [...slug]',
      description: 'รับ URL segment หลายชั้นและรวมเป็น Array เดียวกันด้วยจุด 3 จุด [...]',
      syntax: 'app/docs/[...slug]/page.tsx',
      examples: [
        {
          title: 'ดักจับเส้นทางซ้อนกัน (Nested Paths)',
          language: 'tsx',
          code: `// ไฟล์: app/docs/[...slug]/page.tsx
// หากเข้า URL /docs/api/nextjs
export default async function DocsPage({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}) {
  const { slug } = await params
  
  // slug จะเป็น ['api', 'nextjs']
  return <h1>เนื้อหา: {slug.join('/')}</h1>
}`
        },
        {
          title: 'Optional Catch-all [[...slug]]',
          language: 'tsx',
          code: `// ไฟล์: app/shop/[[...slug]]/page.tsx
// สามารถเข้า URL /shop ได้ด้วยโดยไม่ติด 404 (ถ้าเป็น [...slug] จะต้องมีอย่างน้อย 1 segment)
export default async function ShopPage({ 
  params 
}: { 
  params: Promise<{ slug?: string[] }> 
}) {
  const { slug } = await params
  
  if (!slug) {
    return <h1>หน้าร้านค้าหลัก</h1>
  }
  
  return <h1>หมวดหมู่: {slug.join(' > ')}</h1>
}`
        }
      ]
    },
    {
      id: 'route-groups',
      name: 'Route Groups (group)',
      description: 'จัดกลุ่ม routes ในโฟลเดอร์โดยไม่กระทบ URL หลักด้วยการใช้วงเล็บ ()',
      syntax: 'app/(marketing)/page.tsx',
      examples: [
        {
          title: 'จัดโครงสร้างแอปโดยไม่มีผลต่อ URL',
          language: 'txt',
          code: `app/
  (marketing)/     # จะไม่ปรากฏใน URL
    about/page.tsx # URL: /about
    page.tsx       # URL: /
  (admin)/         # จะไม่ปรากฏใน URL
    dashboard/page.tsx # URL: /dashboard`
        },
        {
          title: 'แยก Layout ตามกลุ่มการใช้งาน',
          language: 'tsx',
          code: `// app/(marketing)/layout.tsx
// Layout สำหรับกลุ่มผู้ใช้งานทั่วไป
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'nested-layouts',
      name: 'Nested Layouts',
      description: 'โครงสร้าง layout ที่สามารถซ้อนทับกันได้หลายชั้นใน App Router',
      syntax: 'app/**/layout.tsx',
      examples: [
        {
          title: 'โครงสร้าง Layout ซ้อนกัน',
          language: 'tsx',
          code: `// 1. Root Layout (app/layout.tsx) - คลุมทั้งหมด
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

// 2. Dashboard Layout (app/dashboard/layout.tsx) - คลุมเฉพาะส่วน dashboard
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <AdminSidebar />
      <main>{children}</main>
    </section>
  )
}

// ผลลัพธ์: RootLayout > DashboardLayout > Page`
        }
      ]
    },
    {
      id: 'link-navigation',
      name: '<Link> Navigation',
      description: 'Navigation ประสิทธิภาพสูงของ Next.js ที่เปลี่ยนหน้าโดยไม่โหลดหน้าเว็บใหม่ทั้งหมด',
      syntax: 'import Link from "next/link"',
      examples: [
        {
          title: 'การใช้งาน <Link> เบื้องต้น',
          language: 'tsx',
          code: `import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      {/* ใช้ <Link> แทน <a> เสมอสำหรับการนำทางในแอป */}
      <Link href="/">หน้าแรก</Link>
      <Link href="/about">เกี่ยวกับเรา</Link>
      <Link href="/dashboard" prefetch={false}>
        แดชบอร์ด (ไม่ prefetch)
      </Link>
    </nav>
  )
}`
        }
      ]
    }
  ]
}
