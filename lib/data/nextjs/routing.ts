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
      name: 'Catch-all & Optional Catch-all',
      description: 'รับ URL หลายๆ ชั้นพร้อมกัน แล้วจับมัดรวมเป็น Array (มีประโยชน์มากเวลาทำหน้าเว็บที่ URL ซ้อนกันลึกๆ และไม่แน่นอน เช่น หน้า Docs หรือ Category สินค้า)',
      syntax: '[...slug] และ [[...slug]]',
      examples: [
        {
          title: 'Catch-all Routes [...slug] (เอาไปทำอะไร?)',
          language: 'tsx',
          code: `// 📁 ไฟล์: app/docs/[...slug]/page.tsx

// 📌 คำอธิบาย: 
// แทนที่เราจะต้องสร้างโฟลเดอร์ลึกๆ แบบ /docs/[category]/[subcategory]/[id] 
// เราใช้ [...slug] ทีเดียวจบ มันจะกวาด URL ทุกชั้นต่อจาก /docs/ มาเป็น Array ให้เลย

export default async function DocsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  
  // สมมติผู้ใช้เข้าเว็บ: /docs/api/button/v2
  // ค่าของ slug จะเป็น: ['api', 'button', 'v2']
  
  // 💡 เอาไปใช้งานจริง (ตัวอย่าง):
  // 1. นำ Array ไปต่อกันเป็น path เพื่อดึงไฟล์ Markdown ขึ้นมาอ่าน
  const filePath = \`content/\${slug.join('/')}.md\`
  // const file = await fs.readFile(filePath)
  
  return (
    <div>
      <h1>คุณกำลังเปิดไฟล์: {filePath}</h1>
      <p>จำนวนชั้นของ URL: {slug.length}</p>
    </div>
  )
}`
        },
        {
          title: '🔥 Optional Catch-all [[...slug]]',
          language: 'tsx',
          code: `// ไฟล์: app/shop/[[...slug]]/page.tsx
// จุดที่ต่างคือ: รองรับ "Path ว่าง" (Root) ด้วย
// - เข้า /shop -> slug เป็น undefined (ไม่ติด 404!)
// - เข้า /shop/clothes/shirts -> slug เป็น ['clothes', 'shirts']

export default async function ShopPage({ params }: { params: Promise<{ slug?: string[] }> }) {
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
      description: 'ใช้ทำ Layout แยกกลุ่มโดยที่ URL ยังเหมือนเดิม ไม่ใช่แค่การจัดระเบียบโฟลเดอร์',
      syntax: 'app/(marketing)/page.tsx',
      examples: [
        {
          title: 'แยก Layout โดย URL ไม่เปลี่ยน',
          language: 'txt',
          code: `app/
  (marketing)/
    layout.tsx     # Layout แบบที่ 1 (เช่น มีแบนเนอร์โฆษณา)
    about/page.tsx # URL: /about
    page.tsx       # URL: /
  (admin)/
    layout.tsx     # Layout แบบที่ 2 (เช่น มี Sidebar แอดมิน)
    dashboard/page.tsx # URL: /dashboard`
        }
      ],
      notes: 'ประโยชน์สูงสุดคือการแบ่ง Layout ให้กับหน้าที่ URL ระดับเดียวกัน (Root level) โดยไม่ต้องเอา Layout ไปใส่ซ้ำๆ ในทุกหน้า'
    },
    {
      id: 'nested-layouts',
      name: 'Nested Layouts',
      description: 'โครงสร้าง Layout ที่ซ้อนทับกันได้หลายชั้น',
      syntax: 'app/**/layout.tsx',
      examples: [
        {
          title: 'โครงสร้าง Layout ซ้อนกัน',
          language: 'tsx',
          code: `// 1. Root Layout (app/layout.tsx) - คลุมทั้งหมด
export default function RootLayout({ children }) { return <body>{children}</body> }

// 2. Dashboard Layout (app/dashboard/layout.tsx) - คลุมเฉพาะส่วน dashboard
export default function DashboardLayout({ children }) { 
  return <section><Sidebar />{children}</section> 
}`
        }
      ],
      notes: '⚠️ จุดที่คนงงบ่อย: Layout จะ "ไม่ Re-render" เมื่อผู้ใช้เปลี่ยนหน้า (Page) ที่อยู่ภายใต้ Layout เดียวกัน! ทำให้ State (เช่น ข้อมูลฟอร์ม, สถานะเปิด/ปิดเมนู) ที่อยู่ใน Layout ยังคงอยู่เหมือนเดิม (ไม่ถูกรีเซ็ต)'
    },
    {
      id: 'parallel-routes',
      name: 'Parallel Routes @folder',
      description: 'เรนเดอร์หลายหน้า (Page) พร้อมกันใน Layout เดียวกัน (เช่น หน้าจอที่มี Dashboard หลายๆ ส่วนประกอบกัน)',
      syntax: 'app/@analytics/page.tsx',
      examples: [
        {
          title: 'การส่ง Slot เข้าไปใน Layout',
          language: 'tsx',
          code: `// โครงสร้างไฟล์:
// app/layout.tsx
// app/@analytics/page.tsx
// app/@team/page.tsx

export default function Layout({
  children,
  analytics, // ถูกดึงมาจากโฟลเดอร์ @analytics
  team       // ถูกดึงมาจากโฟลเดอร์ @team
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children} {/* หน้า page.tsx ปกติ */}
      <div className="flex gap-4">
        {analytics}
        {team}
      </div>
    </>
  )
}`
        }
      ],
      notes: 'ใช้บ่อยในการทำ Dashboard ที่ซับซ้อน หรือการเปิด Modal ทับหน้าเดิม'
    },
    {
      id: 'intercepting-routes',
      name: 'Intercepting Routes (.)folder',
      description: 'เปิด Route ใหม่แบบ Modal ทับหน้าปัจจุบัน (คล้าย Instagram ที่กดรูปแล้วเด้ง Modal แต่พอกด Refresh จะเข้าหน้าเต็มของรูปนั้น)',
      syntax: '(.)folder หรือ (..)folder',
      examples: [
        {
          title: 'การดักจับเส้นทาง (มักใช้คู่กับ Parallel Routes)',
          language: 'txt',
          code: `app/
  feed/
    page.tsx           # หน้า Feed ปกติ
    @modal/            # Parallel route สำหรับแสดง Modal
      (..)photo/       # ดักจับ (Intercept) URL /photo
        [id]/page.tsx  # หน้า Modal แสดงรูป
  photo/
    [id]/page.tsx      # หน้าแสดงรูปเพียวๆ (ถ้าผู้ใช้กด Refresh หรือเข้าลิงก์ตรงๆ)`
        }
      ],
      notes: 'เมื่อผู้ใช้คลิกลิงก์จากหน้า /feed ไปที่ /photo/123 ระบบจะไม่เปลี่ยนหน้าเต็ม แต่จะโหลด (..)photo มาแสดงใน @modal แทน (ให้ความรู้สึกรวดเร็ว)'
    },
    {
      id: 'link-navigation',
      name: '<Link> Navigation',
      description: 'เปลี่ยนหน้าโดยไม่โหลดหน้าเว็บใหม่ทั้งหมด พร้อมระบบ Prefetch',
      syntax: 'import Link from "next/link"',
      examples: [
        {
          title: 'พฤติกรรมการ Prefetch',
          language: 'tsx',
          code: `import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      {/* 1. Default: เมื่อลิงก์นี้ "เลื่อนเข้ามาในจอ (Viewport)" Next.js จะแอบโหลด Layout/ข้อมูลมารอไว้เบื้องหลัง (ไวมาก!) */}
      <Link href="/about">เกี่ยวกับเรา</Link>
      
      {/* 2. ปิด Prefetch: หากหน้านั้นมีข้อมูลหนักมากๆ หรือไม่ค่อยมีคนกด เพื่อประหยัดเน็ตผู้ใช้และเซิร์ฟเวอร์ */}
      <Link href="/dashboard" prefetch={false}>
        แดชบอร์ด
      </Link>
    </nav>
  )
}`
        }
      ]
    }
  ]
}
