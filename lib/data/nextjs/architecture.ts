import { Category } from '../types'

export const architectureCategory: Category = {
  id: 'architecture',
  name: 'Architecture',
  icon: '🏗️',
  description: 'สถาปัตยกรรม React Server Components (RSC) และ Client Components',
  commands: [
    {
      id: 'server-components',
      name: 'Server Components',
      description: 'คอมโพเนนต์ที่ทำงาน (Render) บนฝั่ง Server อย่างเดียว (ค่าเริ่มต้น) เป็นหัวใจสำคัญที่ทำให้เว็บเร็วและปลอดภัย',
      syntax: '// ไม่ต้องใส่คำสั่งอะไรพิเศษ',
      examples: [
        {
          title: 'ข้อดีและการใช้งานที่ถูกต้อง',
          language: 'tsx',
          code: `import db from '@/lib/db'
import fs from 'fs'

// 1. ทำงานแบบ async/await ได้ตรงๆ โดยไม่ต้องพึ่ง useEffect
export default async function ProductList() {
  // 2. เข้าถึง Backend ตรงๆ ได้อย่างปลอดภัย (DB, File System, Private API Key)
  // โดยที่ข้อมูลความลับเหล่านี้ "ไม่หลุดไปฝั่ง Client เลย"
  const products = await db.query('SELECT * FROM products')
  
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  )
}`
        }
      ],
      notes: '🔥 ข้อควรจำ: 1. ไม่มี State (useState/useEffect ใช้ไม่ได้) 2. ไม่มี Event (onClick ใช้ไม่ได้) 3. โค้ด JS ของ Component นี้ "ไม่ถูกส่งไปที่ Browser เลย" ทำให้ Bundle Size เล็กลงมหาศาล'
    },
    {
      id: 'client-components',
      name: 'Client Components',
      description: 'คอมโพเนนต์ที่มีการปฏิสัมพันธ์กับผู้ใช้ (Interactive) หรือต้องการใช้ Browser API',
      syntax: '"use client"',
      examples: [
        {
          title: 'การประกาศใช้และการเข้าใจผิดที่พบบ่อย',
          language: 'tsx',
          code: `'use client' // ประกาศสร้าง Boundary 

import { useState } from 'react'
import Helper from './Helper' // ⚠️ ไฟล์นี้จะกลายเป็น Client Component ทันที

export default function Counter() {
  const [count, setCount] = useState(0)

  // ใช้ Browser API เช่น window, localStorage ได้ที่นี่
  return (
    <button onClick={() => setCount(count + 1)}>
      <Helper /> {count}
    </button>
  )
}`
        }
      ],
      notes: '🔥 ความเข้าใจผิดยอดฮิต: 1. "use client" ไม่ได้แปลว่าเรนเดอร์แค่บน Client เท่านั้น แต่มันจะ "ถูกเรนเดอร์ครั้งแรกบน Server ด้วย (SSR)" แล้วค่อยมา Hydrate (เติมชีวิตให้ JS) บน Browser 2. เมื่อแปะ "use client" ไฟล์ลูกทั้งหมดที่ถูก import ต่อจากนี้ จะกลายเป็น Client Bundle ด้วยเสมอ (แม้ไม่ได้เขียน "use client" ไว้ในไฟล์ลูก)'
    },
    {
      id: 'composition',
      name: 'Composition (การใช้สลับกัน)',
      description: 'วิธียัด Server Component เข้าไปใน Client Component อย่างถูกต้อง (Slot Pattern)',
      syntax: '<ClientWrapper><ServerChild /></ClientWrapper>',
      examples: [
        {
          title: 'การใช้ Slot Pattern (children/props)',
          language: 'tsx',
          code: `// ❌ ผิด: ห้าม import Server Component มาใส่ใน Client Component ตรงๆ
// เพราะ Client ไม่รู้จักวิธีรันโค้ดฝั่ง Backend (เช่น ไม่รู้ว่า db คืออะไร)
// import ServerComponent from './ServerComponent'

// ✅ ถูก: โยนเข้าไปทาง Props (เช่น children)
export default function Page() { // <-- นี่คือ Server Component หลัก
  return (
    // ส่ง Server Component เข้าไปเป็น children ของ Client Wrapper
    <ClientWrapper>
      <ServerComponent /> 
    </ClientWrapper>
  )
}`
        }
      ],
      notes: 'เหตุผลที่ทำได้: เพราะฝั่ง Server จะแอบ Render ตัว <ServerComponent /> จนเสร็จเป็น HTML (หรือ RSC Payload) ล่วงหน้าไปก่อนแล้ว จากนั้นค่อยส่งช่องโหว่ (Slot) นั้นไปประกอบร่างกับ Client ทีหลัง'
    },
    {
      id: 'advanced-nuances',
      name: 'ข้อควรระวังขั้นสูง (มักเจอตอนสัมภาษณ์)',
      description: 'รายละเอียดปลีกย่อยที่มักเป็นหลุมพรางในการใช้งานจริง',
      syntax: 'Serialization / Third-party wrappers / Context API',
      examples: [
        {
          title: 'การส่ง Props ระหว่าง Server -> Client',
          language: 'tsx',
          code: `// ⚠️ กฏเหล็ก: Props ต้องเป็น "Serializable" เท่านั้น (แปลงเป็น JSON ได้)
// สิ่งที่ห้ามส่งข้าม Boundary เด็ดขาด:
// ❌ Function (ถ้าอยากให้ Client สั่ง Server ให้ใช้ Server Actions แยกต่างหาก)
// ❌ Date Object ดิบๆ, Class Instance, Map, Set (ต้อง .toJSON() หรือแปลงเป็น string ก่อน)`
        },
        {
          title: 'Third-party Libraries / Context',
          language: 'tsx',
          code: `// 1. Third-party UI Libraries บางตัวที่เก่าไปนิด (ใช้ hooks ข้างใน)
// แต่ไม่ได้แปะ "use client" มาให้ เราต้องสร้าง Wrapper หุ้มเอง!
'use client'
export { Carousel } from 'some-old-ui-lib'

// 2. Context API (createContext)
// สร้างและใช้ได้เฉพาะใน "Client Components" เท่านั้น!
// ถ้าอยากแชร์ข้อมูลฝั่ง Server ให้ใช้วิธีส่ง Props ลึกๆ ลงไป 
// หรือใช้ fetch() ซ้ำๆ เลย (Next.js มี Memoization ทำให้ fetch ซ้ำไม่เสียเวลา)`
        },
        {
          title: '⚠️ ข้อควรระวังขั้นสุดยอด: การ Cache ข้อมูล User',
          language: 'tsx',
          code: `// Data Cache ของ Next.js (เช่น fetch ที่ใช้ force-cache หรือ unstable_cache)
// ถูกแชร์ข้ามผู้ใช้งานทุกคน (Shared across all users) 🌐

// ❌ อันตราย: ผู้ใช้ทุกคนจะเห็นโปรไฟล์ของ User คนแรกที่เข้ามาโหลดหน้านี้!
const res = await fetch(\`https://api.com/profile/\${userId}\`, { cache: 'force-cache' })

// ✅ ถูกต้องสำหรับข้อมูล User-specific:
// ใช้ 'no-store' หรือดึงข้อมูลใหม่เสมอสำหรับหน้าที่ต้องใช้ Session/Auth
const res = await fetch(\`https://api.com/profile/\${userId}\`, { cache: 'no-store' })

// *หมายเหตุ: ถ้าต้องการ Cache ข้อมูลระดับ User แค่ชั่วคราวใน 1 Request (เพื่อไม่ให้ Query DB ซ้ำซ้อน)
// ให้ใช้ React cache() แทน เพราะมันจะผูกติดกับ Request นั้นๆ เท่านั้น ไม่แชร์ข้ามคน`
        }
      ]
    }
  ]
}
