import { Category } from '../types';

export const advancedCategory: Category = {
  id: 'advanced',
  name: 'Advanced & Ecosystem',
  icon: '🚀',
  description: 'เทคนิคขั้นสูง, การดัก Error, Transactions และลูกเล่นระดับลึก',
  commands: [
    {
      id: 'error-handling',
      name: 'Error Handling (PrismaClientKnownRequestError)',
      description: 'การดักจับข้อผิดพลาดที่เกิดขึ้นบ่อยอย่างเป็นระบบ',
      syntax: 'e instanceof Prisma.PrismaClientKnownRequestError',
      examples: [
        {
          title: 'ดักจับ Unique Constraint Violation (P2002)',
          language: 'typescript',
          code: `import { Prisma } from '@prisma/client'

try {
  await prisma.user.create({
    data: { email: 'duplicate@email.com' },
  })
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: มีข้อมูลซ้ำในฟิลด์ที่เซ็ตค่า unique ไว้
    if (e.code === 'P2002') {
      console.log('อีเมลนี้ถูกใช้งานไปแล้วในระบบ (ซ้ำในคอลัมน์:', e.meta?.target, ')')
    }
    // P2025: อัปเดตหรือลบข้อมูลที่ไม่พบ
    else if (e.code === 'P2025') {
      console.log('ไม่พบข้อมูลที่จะกระทำ')
    }
  }
  throw e
}`
        }
      ]
    },
    {
      id: 'transactions',
      name: 'Transactions ($transaction)',
      description: 'การมัดรวมหลายๆ Query ให้ทำงานเป็นก้อนเดียวกัน ถ้ามีอันไหนพัง ให้ย้อนกลับ (Rollback) ทั้งหมด ป้องกันข้อมูลไม่สมบูรณ์',
      syntax: 'prisma.$transaction([...])',
      examples: [
        {
          title: 'รันหลาย Query โอนเงินให้สำเร็จทั้งหมด',
          language: 'typescript',
          code: `// โอนเงินจาก A ไป B: ถ้าบรรทัดหักเงินสำเร็จ แต่บรรทัดเพิ่มเงินพัง เงินจะเด้งกลับอัตโนมัติ!
const [decreaseA, increaseB] = await prisma.$transaction([
  prisma.account.update({
    where: { id: 'A' },
    data: { balance: { decrement: 500 } },
  }),
  prisma.account.update({
    where: { id: 'B' },
    data: { balance: { increment: 500 } },
  }),
])`
        },
        {
          title: 'Interactive Transaction (ใช้ Logic คั่นกลางได้)',
          language: 'typescript',
          code: `await prisma.$transaction(async (tx) => {
  // 1. ดึงยอดมาก่อน (ใช้พารามิเตอร์ tx แทน prisma!)
  const sender = await tx.account.findUnique({ where: { id: 'A' } })
  
  // 2. เช็กยอดว่าพอไหม
  if (!sender || sender.balance < 500) {
    throw new Error('เงินไม่พอ!') // โยน Error จะทำลาย Transaction นี้ทิ้งทันที
  }
  
  // 3. ทำการโอน
  await tx.account.update({ /* decrement */ })
  await tx.account.update({ /* increment */ })
})`
        }
      ]
    },
    {
      id: 'raw-sql',
      name: 'Raw SQL ($queryRaw, $executeRaw)',
      description: 'เขียนคำสั่ง SQL เพียวๆ สำหรับงานที่ใช้ฟังก์ชันของ Prisma ปกติไม่ได้ หรือ Query ซับซ้อนจัดๆ',
      syntax: 'prisma.$queryRaw\`SELECT ...\`',
      examples: [
        {
          title: 'ยิง SQL ปลอดภัย (ป้องกัน SQL Injection)',
          language: 'typescript',
          code: `// 1. ดึงข้อมูล ($queryRaw)
const email = 'alice@example.com'
// ตัวแปรที่ส่งผ่าน Template Literal จะถูก Parameterized ให้ปลอดภัยอัตโนมัติ!
const result = await prisma.$queryRaw\`SELECT * FROM User WHERE email = \${email}\`

// 2. รันคำสั่งที่ไม่มีการคืนค่ามา ($executeRaw)
const affectedRows = await prisma.$executeRaw\`UPDATE User SET status = 'INACTIVE' WHERE age > 60\``
        }
      ]
    },
    {
      id: 'client-extensions',
      name: 'Client Extensions ($extends)',
      description: 'เพิ่มฟังก์ชันพิเศษหรือแก้ไขพฤติกรรมของ Prisma แบบคัสตอม (มาแทนที่ Middleware แบบเก่า)',
      syntax: 'prisma.$extends({})',
      examples: [
        {
          title: 'สร้าง Computed Field (เพิ่มคอลัมน์เสมือน)',
          language: 'typescript',
          code: `const prisma = new PrismaClient().$extends({
  result: {
    user: {
      fullName: {
        // สิ่งที่จะคืนกลับมาตอนดึง (ต้องใช้คอลัมน์จริงอะไรบ้าง)
        needs: { firstName: true, lastName: true },
        // ฟังก์ชันคำนวณ
        compute(user) {
          return \`\${user.firstName} \${user.lastName}\`
        },
      },
    },
  },
})

// ใช้งานได้เลย ระบบจะพ่น fullName กลับมาให้ด้วย!
const user = await prisma.user.findFirst()
console.log(user.fullName)`
        }
      ]
    },
    {
      id: 'type-utilities',
      name: 'Type Utilities (Prisma.ModelGetPayload)',
      description: 'เครื่องมือแกะ Type ที่อ้างอิงกับ Query ทำให้ใช้งาน TypeScript ได้อย่างเต็มประสิทธิภาพโดยไม่ต้องเขียน Type เองให้เหนื่อย',
      syntax: 'Prisma.UserGetPayload<...>',
      examples: [
        {
          title: 'แกะ Type ที่มี Include ซ้อนกัน',
          language: 'typescript',
          code: `import { Prisma } from '@prisma/client'

// 1. ประกาศตัวแปรรับแค่ Select หรือ Include ที่ต้องการ
const userWithPostsArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { posts: true },
})

// 2. แกะ Type ออกมา! (Type นี้จะมองเห็นแค่ property ที่เรา include)
type UserWithPosts = Prisma.UserGetPayload<typeof userWithPostsArgs>

// นำไปใช้ทำ Type ให้ Component หรือ Parameter ได้เลย
function displayUser(user: UserWithPosts) {
  console.log(user.posts.length)
}`
        }
      ]
    }
  ]
};
