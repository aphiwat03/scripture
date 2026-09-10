import { Category } from '../types';

export const crudCategory: Category = {
  id: 'crud',
  name: 'CRUD & Nested Writes',
  icon: '📝',
  description: 'การเพิ่ม อ่าน แก้ไข ลบ ข้อมูล และการใช้งานคำสั่งแบบซ้อนกัน',
  commands: [
    {
      id: 'basic-crud',
      name: 'Basic CRUD (Create, Read, Update, Delete)',
      description: 'คำสั่งพื้นฐานในการจัดการข้อมูล (findUnique, findMany, create, update, delete)',
      syntax: 'prisma.model.findMany()',
      examples: [
        {
          title: 'การอ่าน (Read)',
          language: 'typescript',
          code: `// ดึงตาม Primary Key หรือ Unique field เท่านั้น
const user = await prisma.user.findUnique({
  where: { id: 1 },
})

// ดึงตัวแรกที่เจอตามเงื่อนไข
const firstAdmin = await prisma.user.findFirst({
  where: { role: 'ADMIN' },
})

// ดึงหลายตัว
const activeUsers = await prisma.user.findMany({
  where: { isActive: true },
})`
        },
        {
          title: 'การสร้าง อัปเดต และลบ (Create, Update, Delete)',
          language: 'typescript',
          code: `// สร้าง 1 ตัว
const newPost = await prisma.post.create({
  data: { title: 'Hello', authorId: 1 },
})

// อัปเดตหลายตัวพร้อมกัน (updateMany)
const updated = await prisma.post.updateMany({
  where: { published: false },
  data: { published: true },
})

// ลบตัวเดียว
await prisma.user.delete({
  where: { id: 5 },
})`
        }
      ]
    },
    {
      id: 'upsert',
      name: 'Upsert (อัปเดต หรือ สร้างใหม่)',
      description: 'ถ้ามีข้อมูลอยู่แล้วให้อัปเดต ถ้ายังไม่มีให้สร้างใหม่เลย (ช่วยลดโค้ดแบบ if-else ตรวจสอบก่อน)',
      syntax: 'prisma.model.upsert({ where, update, create })',
      examples: [
        {
          title: 'การใช้ Upsert',
          language: 'typescript',
          code: `const user = await prisma.user.upsert({
  // เช็กว่ามีอีเมลนี้หรือยัง
  where: { email: 'alice@prisma.io' },
  // ถ้ามีแล้ว -> แค่อัปเดตชื่อ
  update: { name: 'Alice the Great' },
  // ถ้ายังไม่มี -> สร้างใหม่ด้วยข้อมูลเหล่านี้
  create: {
    email: 'alice@prisma.io',
    name: 'Alice',
  },
})`
        }
      ]
    },
    {
      id: 'include-select',
      name: 'Include vs Select (ดึงข้อมูลเจาะลึก)',
      description: 'การดึงข้อมูลจากตารางที่เกี่ยวข้องกัน และการเลือกเฉพาะคอลัมน์ที่ต้องการ (ข้อจำกัด: ห้ามใช้ include และ select ในคำสั่งเดียวกัน)',
      syntax: 'include: {}, select: {}',
      examples: [
        {
          title: 'การดึงตารางลูกพ่วงมาด้วย (Include)',
          language: 'typescript',
          code: `// ได้ User ทุกคอลัมน์ + เอา Post ของ User นั้นพ่วงมาด้วย (เหมือน Join ตาราง)
const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true, // ดึงโพสต์ทั้งหมด
    profile: {
      // Nested Select: ลึกลงไป ดึงเฉพาะไบโอใน profile
      select: { bio: true }
    }
  },
})`
        },
        {
          title: 'การเลือกดึงเฉพาะคอลัมน์ (Select)',
          language: 'typescript',
          code: `// คืนค่าเฉพาะคอลัมน์ id และ name เท่านั้น (ประหยัดแบนด์วิดท์)
const minifiedUsers = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    // ยังสามารถดึง relation ได้เหมือน include
    posts: {
      select: { title: true }
    }
  },
})`
        }
      ]
    },
    {
      id: 'nested-writes',
      name: 'Nested Writes (connect, connectOrCreate)',
      description: 'สร้างตารางต้นทาง พร้อมกับสร้างหรือเชื่อมโยงตารางปลายทางในคำสั่งเดียว',
      syntax: 'connect, create, connectOrCreate',
      examples: [
        {
          title: 'สร้าง User พร้อมตั้งค่า Post ในคราวเดียว',
          language: 'typescript',
          code: `const newUser = await prisma.user.create({
  data: {
    name: 'Bob',
    email: 'bob@example.com',
    posts: {
      // 1. สร้างโพสต์ใหม่พร้อมกับ User เลย
      create: [{ title: 'My first post' }],
      
      // 2. เชื่อมโพสต์ที่ id 5 ให้เป็นของ User คนนี้ด้วย
      connect: [{ id: 5 }],
      
      // 3. ถ้าเจอหมวดหมู่นี้ให้เชื่อม ถ้าไม่เจอให้สร้างใหม่
      // connectOrCreate: { ... }
    },
  },
})`
        }
      ]
    },
    {
      id: 'aggregations',
      name: 'Aggregations (count, sum, groupBy)',
      description: 'การคำนวณสรุปผลยอดรวม, ค่าเฉลี่ย, และการจัดกลุ่มข้อมูล',
      syntax: 'prisma.model.aggregate()',
      examples: [
        {
          title: 'หาผลรวมและค่าเฉลี่ย',
          language: 'typescript',
          code: `// 1. นับจำนวนโพสต์ทั้งหมดของ User 1
const count = await prisma.post.count({
  where: { authorId: 1 },
})

// 2. หาผลรวม และค่าเฉลี่ยราคา
const stats = await prisma.order.aggregate({
  _sum: { totalAmount: true },
  _avg: { totalAmount: true },
  _max: { totalAmount: true },
  where: { status: 'COMPLETED' }
})

// 3. จัดกลุ่ม (Group By)
const groupUsers = await prisma.user.groupBy({
  by: ['role'], // แบ่งกลุ่มตาม Role
  _count: { _all: true }, // นับจำนวนในแต่ละกลุ่ม
})
// ผลลัพธ์: [{ role: 'ADMIN', _count: { _all: 2 } }, { role: 'USER', _count: { _all: 10 } }]`
        }
      ]
    }
  ]
};
