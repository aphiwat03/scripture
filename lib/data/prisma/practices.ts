import { Category } from '../types';

export const practicesCategory: Category = {
  id: 'practices',
  name: 'Testing & Best Practices',
  icon: '🛡️',
  description: 'แนวทางที่ถูกต้องสำหรับการจัดการปัญหา และการทำ Unit Test',
  commands: [
    {
      id: 'n-plus-one',
      name: 'N+1 Query Problem (Prisma Dataloader)',
      description: 'ปัญหาโลกแตกของการดึงข้อมูลที่ Prisma ช่วยแก้ให้แบบอัตโนมัติ',
      syntax: 'Batching queries',
      examples: [
        {
          title: 'วิธีที่ Prisma ป้องกันปัญหาให้',
          language: 'typescript',
          code: `// สมมติเราดึงผู้ใช้มา 10 คน
const users = await prisma.user.findMany({ take: 10 })

// ❌ ปกติการเขียนลูปแบบนี้จะเกิดปัญหา N+1
// คือ ยิง Query ไปหา User 1 รอบ แล้วต้องยิง Query ไปหา Post อีก 10 รอบ รวมเป็น 11 รอบ
const postsPerUser = await Promise.all(
  users.map(user => prisma.post.findMany({ where: { authorId: user.id } }))
)

// ✨ แต่ Prisma โคตรฉลาด! มันมีระบบ Dataloader ฝังมา
// พอมันเห็นว่าเรายิง Query รัวๆ หน้าตาคล้ายๆ กัน มันจะรวบยอด Batching ให้กลายเป็น:
// SELECT * FROM Post WHERE authorId IN (1,2,3,4...10)
// สรุป: โดนยิง DB แค่ 2 รอบเท่านั้น! (ยิงหา User 1 รอบ + ยิงหา Post 1 รอบ)`
        }
      ],
      notes: 'แต่การใช้ include: { posts: true } ตั้งแต่คำสั่งแรกจะง่ายและประหยัดเวลากว่าเยอะ!'
    },
    {
      id: 'unit-testing',
      name: 'Unit Testing (Mocking Prisma)',
      description: 'วิธี Mock (จำลอง) การเรียก Database ใน Jest เพื่อให้เทสผ่านไวๆ โดยไม่ต้องต่อ DB จริง',
      syntax: 'jest-mock-extended',
      examples: [
        {
          title: 'การเขียน Unit Test พื้นฐาน',
          language: 'typescript',
          code: `// 1. ลงไลบรารี: npm i -D jest-mock-extended

import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

// จำลอง PrismaClient ขึ้นมา (ของปลอม)
const prismaMock = mockDeep<PrismaClient>()

beforeEach(() => {
  mockReset(prismaMock) // ล้างข้อมูลก่อนเทสใหม่ทุกครั้ง
})

test('ควรจะอัปเดตผู้ใช้สำเร็จ', async () => {
  const user = { id: 1, name: 'Rich', email: 'hello@test.com' }
  
  // สอนมันว่า ถ้าโดนเรียก prisma.user.update ให้คืนค่า object นี้กลับไป
  prismaMock.user.update.mockResolvedValue(user)

  // สมมติฟังก์ชันที่คุณเขียนไปเรียกใช้ prisma.user.update
  const result = await updateUser(1, { name: 'Rich' }, prismaMock)

  expect(result.name).toEqual('Rich')
  expect(prismaMock.user.update).toHaveBeenCalledTimes(1)
})`
        }
      ]
    },
    {
      id: 'connection-pooling',
      name: 'Serverless & Connection Pooling',
      description: 'คำเตือนและวิธีแก้เวลาเอาโปรเจกต์ไปรันบน Vercel, AWS Lambda (โหมด Serverless)',
      syntax: 'PgBouncer / Prisma Accelerate',
      examples: [
        {
          title: 'ทำไม Serverless ถึงมีปัญหา?',
          language: 'text',
          code: `ปัญหา: Serverless function ถูกสร้างใหม่ขึ้นมามากมายทุกครั้งที่มีคนเข้าเว็บ และทุก function จะวิ่งไปเปิด Connection สดๆ กับ Database จนโควต้า (Max Connections) เต็มและล่ม!

วิธีแก้:
1. (ฟรี) ใช้ PgBouncer ของ Supabase หรือระบบภายนอก เป็นนายประตูรับแขก (Pooling)
-> เปลี่ยน Connection string โดยใส่ ?pgbouncer=true ต่อท้าย

2. (จ่ายเงิน) ใช้ "Prisma Accelerate" 
-> เปลี่ยน URL จาก postgresql:// เป็น prisma:// และ Prisma จะจัดการเรื่อง Connection Pooling + Edge Caching ให้เลย`
        }
      ]
    }
  ]
};
