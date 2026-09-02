import { Category } from '../types'

export const deepRenderingCategory: Category = {
  id: 'deep-rendering',
  name: 'Rendering & Boundaries',
  icon: '🧠',
  description: 'เจาะลึกปรัชญาการ Render, การกั้นเขตแดน (Boundary) และการส่งข้อมูลแบบสตรีมมิ่ง',
  commands: [
    {
      id: 'rendering-philosophy',
      name: 'Rendering Philosophy',
      description: 'Next.js App Router เปลี่ยนปรัชญาจาก Page-level rendering (SSR/SSG) มาเป็น Component-level rendering (RSC)',
      syntax: 'Server Components vs Client Components',
      examples: [
        {
          title: 'ความแตกต่างของวิธีคิด (Mental Model)',
          language: 'text',
          code: `[อดีต - Pages Router]
- 1 หน้าเว็บ (Page) เลือกว่าจะ Render แบบไหน (SSR หรือ SSG) 
- ข้อมูลทั้งหมดต้องรอให้พร้อมก่อน ถึงจะส่งหน้าเว็บให้ User ได้ (All or Nothing)

[ปัจจุบัน - App Router]
- โค้ดทั้งหมดเป็น Server Components เป็นค่าเริ่มต้น (Render ล่วงหน้าบนฝั่งเซิร์ฟเวอร์ ลด JS ที่ต้องส่ง)
- ส่วนไหนที่ต้องการ Interactive ค่อยเฉือนออกเป็น Client Components
- ผลลัพธ์: โหลดเร็วขึ้น JS เล็กลง และดึงข้อมูลแยกส่วนกันได้`
        }
      ]
    },
    {
      id: 'server-client-boundary',
      name: 'Server and Client Boundary',
      description: 'เส้นแบ่งเขตแดนระหว่าง Server และ Client ที่กำหนดด้วย \`"use client"\` เมื่อข้ามเขตแดน ข้อมูลจะต้องถูกแปลง (Serialize)',
      syntax: '"use client" creates a boundary',
      examples: [
        {
          title: 'ข้อจำกัดการส่ง Props ข้ามเขตแดน',
          language: 'tsx',
          code: `// ❌ ผิด: ส่งฟังก์ชัน (ที่รันบน Server) ไปให้ Client ไม่ได้ (เพราะ Serialize ไม่ได้)
export default function ServerPage() {
  const doSomething = () => console.log('Hi')
  return <ClientButton onClick={doSomething} />
}

// ✅ ถูกต้อง: ใช้ Server Actions ("use server") ถ้าต้องการให้ Client สั่งงาน Server
// หรือ ✅ ถูกต้อง: ดึงข้อมูลบน Server ให้เสร็จ แล้วส่งเป็น String, Number, Array (JSON แบบเรียบๆ) ให้ Client`
        },
        {
          title: 'Interleaving (แซมสลับกัน)',
          language: 'tsx',
          code: `// การส่ง Server Component เข้าไปใน Client Component แบบถูกวิธี
<ClientComponent>
  {/* Server Component นี้จะถูก Render บน Server เสร็จก่อน แล้วค่อยส่ง HTML ไปแทรกใน Client Component */}
  <ServerComponent />
</ClientComponent>`
        }
      ],
      notes: 'กฏเหล็ก: "use client" ไม่ได้แปลว่า Component นั้นจะไม่รันบน Server แต่มันหมายความว่า Component นั้นจะ "ทำงานบน Client ด้วย" (Hydration) เพื่อเพิ่ม Interactive'
    },
    {
      id: 'streaming',
      name: 'Streaming (Suspense)',
      description: 'เทคนิคการสตรีม HTML ทีละส่วนไปยัง Browser ทันทีที่ส่วนนั้นพร้อม ไม่ต้องรอให้เสร็จทั้งหน้า',
      syntax: '<Suspense fallback={<Loading />}>',
      examples: [
        {
          title: 'Streaming ด้วย React Suspense',
          language: 'tsx',
          code: `import { Suspense } from 'react'

export default function Page() {
  return (
    <section>
      {/* ส่วนหัว โหลดเสร็จทันที */}
      <Header />
      
      {/* ส่วนสินค้า (สมมติว่าดึงข้อมูลช้า) จะแสดง "กำลังโหลด..." ก่อน */}
      {/* พอฝั่ง Server ดึงข้อมูลเสร็จ จะส่ง HTML ก้อนนี้ตามไปแปะทีหลังอัตโนมัติ! */}
      <Suspense fallback={<p>กำลังโหลดสินค้า...</p>}>
        <SlowProductList />
      </Suspense>
    </section>
  )
}`
        }
      ],
      notes: 'ไฟล์ loading.tsx ทำงานด้วยกลไก Suspense นี้อยู่เบื้องหลัง โดยมันจะครอบหน้า page.tsx ให้ทั้งหน้าโดยอัตโนมัติ'
    }
  ]
}
