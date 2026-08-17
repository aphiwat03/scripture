import { Category } from '../types'

export const componentsCategory: Category = {
  id: 'components',
  name: 'Components',
  icon: '🧩',
  description: 'React components ที่มาพร้อมกับ Next.js สำหรับเพิ่มประสิทธิภาพและการใช้งานเฉพาะด้าน',
  commands: [
    {
      id: 'link',
      name: '<Link>',
      description: 'คอมโพเนนต์สำหรับการนำทาง (Navigation) ระหว่างหน้าแบบ Client-side และรองรับการทำ prefetching',
      syntax: 'import Link from "next/link"',
      examples: [
        {
          title: 'การใช้งาน Link พื้นฐาน',
          language: 'tsx',
          code: `import Link from 'next/link'

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/">หน้าแรก</Link>
      </li>
      <li>
        {/* ใช้ตัวแปรพลวัตสำหรับ href */}
        <Link href={\`/blog/\${postId}\`}>
          อ่านบล็อก
        </Link>
      </li>
      <li>
        {/* ปิดการใช้งาน prefetch */}
        <Link href="/dashboard" prefetch={false}>
          แดชบอร์ด
        </Link>
      </li>
      <li>
        {/* แทนที่ history stack ปัจจุบัน ไม่สามารถกด Back กลับมาได้ */}
        <Link href="/login" replace>
          เข้าสู่ระบบ
        </Link>
      </li>
    </ul>
  )
}`
        }
      ]
    },
    {
      id: 'image',
      name: '<Image>',
      description: 'คอมโพเนนต์สำหรับแสดงรูปภาพที่ถูกปรับขนาด บีบอัดขนาดไฟล์ และโหลดแบบ lazy-loading โดยอัตโนมัติ',
      syntax: 'import Image from "next/image"',
      notes: 'หากโหลดรูปภาพจากภายนอก (Remote URL) ต้องเพิ่มโดเมนใน remotePatterns ของ next.config.js และต้องกำหนดค่า width/height หรือใช้โหมด fill เสมอ',
      examples: [
        {
          title: 'รูปภาพที่อยู่ภายในโปรเจกต์ (Local Images)',
          language: 'tsx',
          code: `import Image from 'next/image'
import profilePic from './me.png'
 
export default function Profile() {
  return (
    <Image
      src={profilePic}
      alt="ภาพโปรไฟล์"
      // ขนาด width และ height จะถูกคำนวณอัตโนมัติจากไฟล์
      placeholder="blur" // แสดงภาพเบลอระหว่างโหลด
    />
  )
}`
        },
        {
          title: 'รูปภาพจากภายนอก (Remote Images)',
          language: 'tsx',
          code: `import Image from 'next/image'
 
export default function ProductCard() {
  return (
    <div className="product-image-container relative h-48 w-full">
      {/* ต้องกำหนดขนาดเสมอ หรือใช้ fill (ครอบเต็ม container แม่) */}
      <Image
        src="https://example.com/product-image.jpg"
        alt="รูปสินค้า"
        fill
        className="object-cover" // ใช้ object-cover กับ Tailwind เมื่อใช้ fill
      />
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'script',
      name: '<Script>',
      description: 'จัดการสคริปต์จากภายนอก (Third-party Scripts) ด้วยการโหลดอย่างมีประสิทธิภาพ',
      syntax: 'import Script from "next/script"',
      examples: [
        {
          title: 'การโหลดสคริปต์ (Analytics)',
          language: 'tsx',
          code: `import Script from 'next/script'
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        {children}
        
        {/* afterInteractive (ค่าเริ่มต้น): โหลดเมื่อเริ่มมีการ interactive ได้แล้ว */}
        <Script src="https://example.com/analytics.js" />
        
        {/* lazyOnload: โหลดภายหลังแบบเงียบๆ ช่วงที่เบราว์เซอร์ว่าง */}
        <Script 
          src="https://example.com/chatbot.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  )
}`
        }
      ]
    }
  ]
}
