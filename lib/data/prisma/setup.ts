import { Category } from '../types';

export const setupCategory: Category = {
  id: 'setup',
  name: 'Setup & CLI',
  icon: '⚙️',
  description: 'การติดตั้ง ตั้งค่าการเชื่อมต่อฐานข้อมูล และคำสั่ง CLI ที่สำคัญ',
  commands: [
    {
      id: 'init',
      name: 'Installation & Initialization',
      description: 'คำสั่งติดตั้งและเริ่มใช้งาน Prisma ในโปรเจกต์',
      syntax: 'npx prisma init',
      examples: [
        {
          title: 'ติดตั้งและสร้างไฟล์เริ่มต้น',
          language: 'bash',
          code: `# 1. ติดตั้ง Prisma CLI เป็น dev dependency
npm install prisma --save-dev

# 2. ติดตั้ง Prisma Client สำหรับใช้งานในโค้ด
npm install @prisma/client

# 3. สร้างไฟล์ prisma/schema.prisma และไฟล์ .env
npx prisma init`
        }
      ]
    },
    {
      id: 'connection-string',
      name: 'Database Connection & .env',
      description: 'รูปแบบการเขียน Connection String เพื่อเชื่อมต่อกับ Database ชนิดต่างๆ',
      syntax: 'DATABASE_URL="schema://user:pass@host:port/dbname"',
      examples: [
        {
          title: 'ตัวอย่าง .env สำหรับแต่ละ Database',
          language: 'env',
          code: `# PostgreSQL
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

# MySQL
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"

# SQLite (ระบุ path ของไฟล์ฐานข้อมูล)
DATABASE_URL="file:./dev.db"

# MongoDB (ต้องการ replicaSet)
DATABASE_URL="mongodb+srv://root:randompassword@cluster0.ab1cd.mongodb.net/mydb?retryWrites=true&w=majority"`
        }
      ]
    },
    {
      id: 'singleton',
      name: 'Prisma Client Singleton (Next.js)',
      description: 'วิธีสร้าง Prisma Client ที่ถูกต้องใน Next.js ป้องกันปัญหา "Too many connections" เวลากด Save แล้วโปรเจกต์ Hot Reload รัวๆ',
      syntax: 'globalThis.prisma',
      examples: [
        {
          title: 'การสร้างไฟล์ prisma.ts กลาง',
          language: 'typescript',
          code: `import { PrismaClient } from '@prisma/client'

// แปะประเภทให้ globalThis (สำหรับ TypeScript)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// ใช้ของเดิมถ้ามีอยู่แล้ว หรือสร้างใหม่ถ้ายังไม่มี
export const prisma = globalForPrisma.prisma || new PrismaClient()

// ถ้าไม่ได้อยู่โหมด Production ให้เก็บ instance ไว้ใน global
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma`
        }
      ],
      notes: 'ใน Next.js ให้ Import ตัวแปร \`prisma\` จากไฟล์นี้ไปใช้แทนการ \`new PrismaClient()\` ในทุกๆ หน้า'
    },
    {
      id: 'cli-commands',
      name: 'CLI Commands (validate & generate)',
      description: 'คำสั่งตรวจสอบความถูกต้องของ Schema และสร้าง TypeScript types',
      syntax: 'prisma format / prisma generate',
      examples: [
        {
          title: 'คำสั่งที่ใช้บ่อยระหว่างเขียนโค้ด',
          language: 'bash',
          code: `# 1. จัดรูปแบบไฟล์ schema.prisma ให้สวยงามและเช็ก syntax เบื้องต้น
npx prisma format

# 2. ตรวจสอบว่า Schema ถูกต้องหรือไม่ (ใช้ก่อน push)
npx prisma validate

# 3. สร้าง TypeScript Client ใหม่ (ต้องรันทุกครั้งที่แก้ Schema)
npx prisma generate`
        }
      ]
    },
    {
      id: 'migration',
      name: 'Migration (dev vs deploy vs push)',
      description: 'ความแตกต่างของคำสั่งอัปเดตโครงสร้างฐานข้อมูล ทั้งตอนเขียนโค้ด และตอนขึ้น Production',
      syntax: 'prisma migrate',
      examples: [
        {
          title: '3 คำสั่งจัดการ Database',
          language: 'bash',
          code: `# ใช้ตอนเขียนโค้ด (Development): 
# สร้างไฟล์ Migration (.sql) และรันเข้า DB พร้อมกัน
npx prisma migrate dev --name init

# ใช้ตอนขึ้น Production:
# จะไม่สร้างไฟล์ใหม่ แต่จะเอารันไฟล์ Migration ที่ค้างอยู่เข้า DB จริง
npx prisma migrate deploy

# ใช้ทำ Prototype ไวๆ (ไม่แนะนำสำหรับ Prod):
# ดัน Schema เข้า DB ทันทีโดยไม่แคร์ว่าต้องสร้างไฟล์ Migration
npx prisma db push`
        }
      ]
    },
    {
      id: 'seed',
      name: 'Database Seeding',
      description: 'การเขียน Script จำลองข้อมูลเริ่มต้น (Mock data) ลง Database',
      syntax: 'prisma db seed',
      examples: [
        {
          title: '1. เพิ่มตั้งค่าใน package.json',
          language: 'json',
          code: `"prisma": {
  "seed": "ts-node prisma/seed.ts"
}`
        },
        {
          title: '2. เขียนไฟล์ prisma/seed.ts',
          language: 'typescript',
          code: `import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })
  console.log({ alice })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })`
        },
        {
          title: '3. รันคำสั่งเพิ่มข้อมูล',
          language: 'bash',
          code: `npx prisma db seed`
        }
      ]
    }
  ]
};
