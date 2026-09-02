import { Category } from '../types'

export const stylingOptimizationCategory: Category = {
  id: 'styling-and-optimization',
  name: 'Styling & Optimization',
  icon: '✨',
  description: 'การจัดการ CSS, ฟอนต์, รูปภาพ และ Metadata เพื่อประสิทธิภาพสูงสุด',
  commands: [
    {
      id: 'css-styling',
      name: 'CSS Styling',
      description: 'Next.js รองรับการเขียน CSS ได้หลายแบบ ทั้ง Global CSS, CSS Modules และ Tailwind CSS (ได้รับความนิยมสูงสุด)',
      syntax: 'import "./globals.css" / styles.module.css',
      examples: [
        {
          title: 'CSS Modules (หลีกเลี่ยงชื่อ Class ซ้ำซ้อน)',
          language: 'tsx',
          code: `// styles.module.css
/* .container { background: red; } */

import styles from './styles.module.css'

export default function Component() {
  // จะถูกแปลงเป็น class ที่สุ่มตัวอักษร เช่น class="styles_container__a1b2c"
  return <div className={styles.container}>Hello</div>
}`
        },
        {
          title: 'Tailwind CSS (ค่าเริ่มต้นของ Next.js)',
          language: 'tsx',
          code: `export default function Component() {
  return <div className="p-4 bg-blue-500 text-white rounded-lg">Hello</div>
}`
        }
      ]
    },
    {
      id: 'image-optimization',
      name: 'Image Optimization',
      description: 'ใช้ `<Image>` แทน `<img>` เพื่อประโยชน์: ปรับขนาด/รูปแบบอัตโนมัติ (WebP), Lazy Load ให้เสมอ, และลดปัญหา Layout Shift',
      syntax: 'import Image from "next/image"',
      examples: [
        {
          title: 'การโหลดภาพพื้นฐาน',
          language: 'tsx',
          code: `import Image from 'next/image'
import profilePic from './me.png' // ไฟล์ในเครื่อง (ได้ width/height อัตโนมัติ)

export default function Page() {
  return (
    <>
      <Image src={profilePic} alt="My Profile" />
      
      {/* ภาพจากเว็บภายนอก ต้องระบุ width/height และตั้ง remotePatterns ใน next.config */}
      <Image 
        src="https://example.com/logo.png" 
        alt="Logo" 
        width={500} 
        height={500} 
      />
    </>
  )
}`
        }
      ],
      notes: 'สำหรับภาพจากเว็บนอก อย่าลืมไปเพิ่ม `remotePatterns` ใน `next.config.ts` ไม่งั้นจะโหลดภาพไม่ขึ้น'
    },
    {
      id: 'font-optimization',
      name: 'Font Optimization',
      description: 'ใช้ \`next/font\` เพื่อดึงฟอนต์มาเก็บไว้ในฝั่งเซิร์ฟเวอร์ (Self-hosting) ตอน Build ทำให้หน้าเว็บไม่เกิดอาการตัวอักษรกระตุก (FOUT) และไม่ต้องเชื่อม Google Fonts ฝั่งผู้ใช้',
      syntax: 'import { Inter } from "next/font/google"',
      examples: [
        {
          title: 'การใช้งาน Google Fonts',
          language: 'tsx',
          code: `// app/layout.tsx
import { Inter, Noto_Sans_Thai } from 'next/font/google'

// โหลดฟอนต์ (สามารถตั้งค่า weight หรือ subsets ได้)
const inter = Inter({ subsets: ['latin'] })
const notoSansThai = Noto_Sans_Thai({ 
  subsets: ['thai'],
  weight: ['400', '700'],
  variable: '--font-noto-thai' // สร้าง CSS Variable ไว้ใช้กับ Tailwind
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ยัดชื่อ class ฟอนต์ใส่ <body>
    <html lang="en" className={notoSansThai.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}`
        }
      ]
    },
    {
      id: 'metadata-og',
      name: 'Metadata & OG Images',
      description: 'นอกจากการเขียน \`export const metadata\` แล้ว เรายังสามารถใส่ไฟล์รูปพิเศษเพื่อให้ Next.js จัดการ Open Graph (ภาพตอนแชร์ลิงก์ลง Social Media) ให้ทันที',
      syntax: 'opengraph-image.png / twitter-image.png',
      examples: [
        {
          title: 'วิธีง่ายที่สุด: ใช้ File-based Metadata',
          language: 'text',
          code: `app/
├── favicon.ico
├── opengraph-image.png   # ภาพตอนแชร์ลิงก์ Facebook/Line (1200x630)
├── twitter-image.png     # ภาพตอนแชร์ลิงก์ Twitter (X)
├── sitemap.xml           # สร้างไฟล์แผนผังเว็บได้เลย
└── page.tsx`
        },
        {
          title: 'สร้างรูป OG Image แบบ Dynamic',
          language: 'tsx',
          code: `// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
 
export const alt = 'Blog Post Image'
export const size = { width: 1200, height: 630 }
 
export default async function Image({ params }: { params: { slug: string } }) {
  // สร้างรูปภาพจากโค้ด HTML (JSX) และ Tailwind ได้สดๆ!
  return new ImageResponse(
    (
      <div style={{ fontSize: 128, background: 'white', width: '100%', height: '100%', display: 'flex' }}>
        Hello {params.slug}
      </div>
    ),
    { ...size }
  )
}`
        }
      ],
      seeAlso: ['metadata-api']
    }
  ]
}
