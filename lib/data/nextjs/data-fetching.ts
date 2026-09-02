import { Category } from '../types'

export const dataFetchingCategory: Category = {
  id: 'data-fetching',
  name: 'Data Fetching',
  icon: '📡',
  description: 'การดึงข้อมูล แคช (Caching) การทำ Revalidation และ Server Actions',
  commands: [
    {
      id: 'fetch-api',
      name: 'Fetching Data (Server)',
      description: 'ใน Server Components สามารถใช้ \`fetch\` API ธรรมดาพร้อมกับ \`async/await\` ได้เลย Next.js ได้ทำการปรับแต่ง \`fetch\` (extend) เพิ่มเติมให้',
      syntax: 'const data = await fetch("https://api.example.com/data")',
      examples: [
        {
          title: 'ดึงข้อมูลแบบพื้นฐาน',
          language: 'tsx',
          code: `export default async function Page() {
  // ดึงข้อมูลฝั่งเซิร์ฟเวอร์
  const res = await fetch('https://api.github.com/users/vercel')
  
  if (!res.ok) {
    throw new Error('Failed to fetch data') // จะไปตกที่ error.tsx
  }
  
  const user = await res.json()
  
  return <main>{user.name}</main>
}`
        }
      ]
    },
    {
      id: 'caching',
      name: 'Caching',
      description: 'Next.js จะทำการแคชข้อมูลจากการ \`fetch\` โดยอัตโนมัติ (ในบางกรณี) เราสามารถตั้งค่าการแคชได้',
      syntax: 'fetch(url, { cache: "force-cache" | "no-store" })',
      examples: [
        {
          title: 'แคชข้อมูลแบบถาวร (force-cache)',
          language: 'tsx',
          code: `// ข้อมูลจะถูกแคชไว้ตลอดกาล (เทียบเท่า Static Site Generation)
const res = await fetch('https://api.example.com/data', { cache: 'force-cache' })`
        },
        {
          title: 'ดึงข้อมูลใหม่ทุกครั้ง (no-store)',
          language: 'tsx',
          code: `// ไม่ใช้แคช ดึงใหม่ทุกครั้งที่มี Request (เทียบเท่า Server-Side Rendering)
const res = await fetch('https://api.example.com/data', { cache: 'no-store' })`
        }
      ]
    },
    {
      id: 'revalidating',
      name: 'Revalidating',
      description: 'การสั่งให้แคชหมดอายุ (Revalidate) เพื่อดึงข้อมูลใหม่ มี 2 แบบคืออิงตามเวลา (Time-based) และสั่งเอง (On-demand)',
      syntax: 'fetch(url, { next: { revalidate: 3600 } }) / revalidatePath()',
      examples: [
        {
          title: 'Time-based Revalidation (ISR)',
          language: 'tsx',
          code: `// แคชข้อมูลไว้ แต่จะไปดึงใหม่ถ้าเวลาผ่านไปเกิน 3600 วินาที (1 ชั่วโมง)
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }
})`
        },
        {
          title: 'On-demand Revalidation (สั่งล้างแคชด้วยมือ)',
          language: 'tsx',
          code: `import { revalidatePath, revalidateTag } from 'next/cache'

// มักใช้ใน Server Actions หลังจากทำการ Update ฐานข้อมูลเสร็จ
export async function updatePost() {
  await db.update(...)
  
  // ล้างแคชหน้านี้ เพื่อให้ข้อมูลใหม่ปรากฏ
  revalidatePath('/posts') 
  // หรือ revalidateTag('posts-tag')
}`
        }
      ]
    },
    {
      id: 'server-actions',
      name: 'Mutating Data (Server Actions)',
      description: 'วิธีเรียกใช้โค้ดฝั่งเซิร์ฟเวอร์จาก Client (เช่น Submit Form) โดยไม่ต้องสร้าง API Route เอง',
      syntax: '"use server"',
      examples: [
        {
          title: 'การสร้างและการใช้ Server Action',
          language: 'tsx',
          code: `// app/actions.ts (ไฟล์สำหรับ Action โดยเฉพาะ)
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  
  // บันทึกลงฐานข้อมูล
  await db.posts.insert({ title })
  
  // สั่งล้างแคชหน้าแรก
  revalidatePath('/')
}

// app/page.tsx (ใช้ใน Component)
import { createPost } from './actions'

export default function Page() {
  // สังเกตว่านำ action มาผูกกับ form action ได้เลย
  return (
    <form action={createPost}>
      <input type="text" name="title" />
      <button type="submit">Submit</button>
    </form>
  )
}`
        }
      ],
      notes: 'Server Actions ทำงานด้วยวิธีเบื้องหลังคือ ส่ง POST Request (multipart/form-data) กลับไปที่ Next.js รันโค้ดฝั่งเซิร์ฟเวอร์อย่างปลอดภัย'
    }
  ]
}
