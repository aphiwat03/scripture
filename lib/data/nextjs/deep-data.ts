import { Category } from '../types'

export const deepDataCategory: Category = {
  id: 'deep-data',
  name: 'Advanced Caching & Data',
  icon: '🗄️',
  description: 'การจัดการระบบ Cache ที่ซับซ้อนของ Next.js และการดึงข้อมูลหลากหลายรูปแบบ',
  commands: [
    {
      id: 'caching-model',
      name: 'Caching Model (รู้ลึกเรื่องแคช)',
      description: 'Next.js 15 (และ 14) มีระบบ Cache ซ้อนกันถึง 4 ชั้น ซึ่งทำให้เว็บเร็วมาก แต่ก็ชวนสับสนได้',
      syntax: 'Request Memoization -> Data Cache -> Full Route Cache -> Router Cache',
      examples: [
        {
          title: '4 ลำดับชั้นของ Caching',
          language: 'text',
          code: `1. Request Memoization (Server): เมื่อเรียก fetch() URL เดิมซ้ำกันในรอบการ Render เดียวกัน Next.js จะดึงข้อมูลจริงแค่ครั้งเดียว
2. Data Cache (Server): เก็บผลลัพธ์ของ fetch() ข้าม Request และข้ามผู้ใช้ (ตั้งค่าด้วย force-cache, no-store)
3. Full Route Cache (Server): เก็บผลลัพธ์ HTML ของทั้งหน้าเว็บเอาไว้เลย (เสมือน SSG) 
4. Router Cache (Client): เบราว์เซอร์ของผู้ใช้จะจำหน้าที่เคยไปมาแล้วชั่วคราว ทำให้กดย้อนกลับแล้วหน้ามาทันทีไม่โหลดใหม่`
        }
      ]
    },
    {
      id: 'isr',
      name: 'ISR (Incremental Static Regeneration)',
      description: 'กระบวนการสร้างหน้าเว็บใหม่ (Rebuild) บนพื้นหลัง (Background) เมื่อแคชเดิมหมดอายุ ทำให้ User คนถัดไปได้เห็นข้อมูลใหม่โดยที่เว็บไม่เคยค้างรอ',
      syntax: 'export const revalidate = 60',
      examples: [
        {
          title: 'การตั้งค่า ISR ในระดับหน้าเว็บ',
          language: 'tsx',
          code: `// หน้าเว็บนี้จะถูกแคชไว้ และจะแอบสร้างใหม่เบื้องหลังหากมีคนเข้าชมหลังผ่านไป 60 วินาที
export const revalidate = 60 

export default async function Page() {
  const data = await db.query('...')
  return <div>{data}</div>
}`
        }
      ]
    },
    {
      id: 'cache-components',
      name: 'Cache / React cache()',
      description: 'ถ้าไม่ได้ใช้ \`fetch\` (เช่นเรียก Database ตรงๆ) แต่อยากให้มัน Memoize เหมือน fetch สามารถใช้คำสั่ง \`cache()\` ของ React ได้',
      syntax: 'import { cache } from "react"',
      examples: [
        {
          title: 'การหุ้ม Database Query ด้วย cache()',
          language: 'tsx',
          code: `import { cache } from 'react'
import db from '@/lib/db'

// หุ้มฟังก์ชันด้วย cache()
export const getUser = cache(async (id: string) => {
  return await db.user.findUnique({ where: { id } })
})

// นำ getUser(1) ไปเรียกใช้หลายๆ ที่ใน Components ต่างๆ 
// Query จะวิ่งไปที่ Database เพียงแค่ครั้งเดียวต่อรอบการ Render!`
        }
      ],
      notes: 'ใน Next.js ยังมี \`unstable_cache\` สำหรับการแคชข้อมูลลง Data Cache แบบถาวรข้าม Request ด้วย'
    },
    {
      id: 'use-cache-directive',
      name: '"use cache" Directive (Next.js 15)',
      description: 'คำสั่งใหม่ใน Next.js 15 (Experimental) ที่ใช้แคชผลลัพธ์ของฟังก์ชัน หรือแม้กระทั่ง Component ทั้งก้อน โดยอิงตาม Input ที่ส่งเข้าไป (มาแทนที่ unstable_cache)',
      syntax: '"use cache"',
      examples: [
        {
          title: 'การแคช Component (Cache Components)',
          language: 'tsx',
          code: `// ระบุ "use cache" ไว้บนสุดของไฟล์ หรือข้างใน Component ก็ได้
export async function WeatherWidget({ city }: { city: string }) {
  'use cache'
  
  // โค้ดในนี้จะถูกรันแค่ครั้งแรกที่เรียกด้วย city นั้นๆ
  // ครั้งต่อไป Next.js จะหยิบผลลัพธ์ HTML เดิมมาแสดงเลย!
  const weather = await fetchWeather(city)
  
  return <div>อากาศที่ {city}: {weather.temp}</div>
}`
        },
        {
          title: 'การแคช Function ระดับข้อมูล',
          language: 'tsx',
          code: `import db from '@/lib/db'

export async function getUserProfile(id: string) {
  'use cache' // แคชผลลัพธ์ของฟังก์ชันนี้ผูกกับตัวแปร id
  
  const user = await db.user.findById(id)
  return user
}`
        }
      ],
      notes: '🔥 ข้อควรระวัง: คล้ายกับ Data Cache ทั่วไป ข้อมูลที่ถูกแคชด้วย "use cache" จะถูกแชร์ข้ามผู้ใช้ (Global) ดังนั้นห้ามใช้กับข้อมูลที่เป็นความลับส่วนตัว (เช่น Session) เด็ดขาด!'
    },
    {
      id: 'prefetching',
      name: 'Prefetching',
      description: 'เทคนิคที่ช่วยให้กดลิงก์แล้วหน้าใหม่มาทันที เพราะ Next.js แอบโหลดข้อมูลหน้านั้นมารอไว้ล่วงหน้า',
      syntax: '<Link prefetch={true} />',
      examples: [
        {
          title: 'พฤติกรรมการ Prefetch',
          language: 'tsx',
          code: `import Link from 'next/link'

// 1. ค่าเริ่มต้น (Hover หรือมองเห็นในจอ): 
// โหลดเฉพาะ Layout เบื้องหลัง (Route segment) แอบมารอไว้
<Link href="/about">About</Link>

// 2. บังคับโหลดเต็มรูปแบบ (Full Route): 
// โหลดทั้งหน้ามาเตรียมไว้เลย (ระวังเปลืองเน็ตผู้ใช้ถ้ามีลิงก์เยอะๆ)
<Link href="/dashboard" prefetch={true}>Dashboard</Link>

// 3. ปิดการโหลดล่วงหน้า (เหมาะกับหน้าข้อมูลหนักๆ หรือหน้าที่คนไม่ค่อยกด)
<Link href="/logout" prefetch={false}>Logout</Link>`
        }
      ]
    },
    {
      id: 'client-fetching',
      name: 'Client-side Data Fetching',
      description: 'เมื่อต้องการดึงข้อมูลฝั่ง Client โดยตรง (เช่น ข้อมูลที่มีการอัปเดตแบบ Real-time ข้อมูลตาม User หรือหน้าที่เป็น "use client")',
      syntax: 'SWR หรือ React Query',
      examples: [
        {
          title: 'ใช้ SWR (สร้างโดยทีม Next.js)',
          language: 'tsx',
          code: `'use client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Profile() {
  // ดึงข้อมูลฝั่งผู้ใช้ (มีระบบ retry, focus revalidation ให้ฟรี)
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  
  return <div>Hello {data.name}</div>
}`
        }
      ],
      notes: 'แนะนำให้ใช้ SWR หรือ React Query เสมอ แทนการใช้ useEffect + fetch เองธรรมดา เพราะจัดการสถานะ Loading/Error/Cache ได้ดีกว่ามาก'
    }
  ]
}
