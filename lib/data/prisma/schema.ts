import { Category } from '../types';

export const schemaCategory: Category = {
  id: 'schema',
  name: 'Schema Design',
  icon: '📐',
  description: 'การออกแบบตาราง (Models), ความสัมพันธ์ (Relations), และการกำหนด Attribute ขั้นสูง',
  commands: [
    {
      id: 'attributes',
      name: 'Basic Attributes (@id, @default, @unique)',
      description: 'คุณสมบัติพื้นฐานที่ใช้บ่อยที่สุดในการตั้งค่าคอลัมน์',
      syntax: '@id, @default(autoincrement()), @updatedAt',
      examples: [
        {
          title: 'ตัวอย่าง Model พื้นฐาน',
          language: 'prisma',
          code: `model User {
  // Primary Key แบบตัวเลขรันอัตโนมัติ (1, 2, 3...)
  id        Int      @id @default(autoincrement())
  
  // หรือใช้ UUID (ข้อความสุ่มยาวๆ)
  // id     String   @id @default(uuid())

  // บังคับไม่ให้ซ้ำ (เช่น Email ห้ามซ้ำ)
  email     String   @unique
  
  // สามารถเป็นค่าว่างได้ (Optional / Nullable)
  name      String?
  
  // ตั้งค่าเริ่มต้น
  role      String   @default("USER")

  // บันทึกเวลาที่สร้าง (now() อัตโนมัติ)
  createdAt DateTime @default(now())
  
  // อัปเดตเวลาอัตโนมัติทุกครั้งที่มีการแก้ไข Row นี้
  updatedAt DateTime @updatedAt
}`
        }
      ]
    },
    {
      id: 'enum-map',
      name: 'Enums, Arrays & Mapping (@map)',
      description: 'การสร้างประเภทข้อมูลเฉพาะ (Enum), การใช้ Array และการเปลี่ยนชื่อ Table/Column หลังบ้านไม่ให้กระทบโค้ด',
      syntax: 'enum, @map, @@map',
      examples: [
        {
          title: 'การใช้งาน Enums และ Mapping',
          language: 'prisma',
          code: `// สร้างประเภทข้อมูลที่เลือกได้แค่ตามนี้
enum Role {
  USER
  ADMIN
}

model User {
  id        Int      @id @default(autoincrement())
  role      Role     @default(USER)
  
  // Array ของ String (รองรับเฉพาะบาง DB เช่น PostgreSQL)
  tags      String[]
  
  // แปลงชื่อ: ในโค้ดเรียก "firstName" แต่ใน DB เป็นตารางชื่อ "first_name"
  firstName String   @map("first_name")
  
  // แปลงชื่อ Model: ในโค้ดเรียก "User" แต่ใน DB เป็นตารางชื่อ "users"
  @@map("users")
}`
        }
      ]
    },
    {
      id: 'composite-keys',
      name: 'Composite Keys & Indexes',
      description: 'การรวมหลายๆ คอลัมน์มาทำเป็น Primary Key เดียวกัน หรือสร้าง Index เพื่อเร่งความเร็วค้นหา',
      syntax: '@@id([..]), @@unique([..]), @@index([..])',
      examples: [
        {
          title: 'การสร้างคีย์ผสม',
          language: 'prisma',
          code: `model UserProject {
  userId    Int
  projectId Int
  role      String

  // รวม userId และ projectId เป็น Primary Key ร่วมกัน (ห้ามมีคู่ที่ซ้ำกัน)
  @@id([userId, projectId])
  
  // สร้าง Index ให้ userId ช่วยให้ค้นหาไวขึ้นเวลากรองตาม user
  @@index([userId])
}`
        }
      ]
    },
    {
      id: 'relations',
      name: 'Relations (1:1, 1:N, M:N)',
      description: 'ความสัมพันธ์ระหว่างตาราง (One-to-One, One-to-Many, Many-to-Many)',
      syntax: '@relation(fields: [], references: [])',
      examples: [
        {
          title: 'ความสัมพันธ์ทุกรูปแบบ',
          language: 'prisma',
          code: `model User {
  id      Int      @id @default(autoincrement())
  // 1:1 (User มี Profile ได้ 1 อัน)
  profile Profile? 
  // 1:N (User โพสต์ได้หลาย Post)
  posts   Post[]   
  // M:N (User กดเข้าได้หลาย Group และ Group มีได้หลาย User) แบบอัตโนมัติ
  groups  Group[]  
}

model Profile {
  id     Int  @id @default(autoincrement())
  userId Int  @unique // คอลัมน์ที่เก็บ FK
  user   User @relation(fields: [userId], references: [id])
}

model Post {
  id       Int  @id @default(autoincrement())
  authorId Int  // คอลัมน์ที่เก็บ FK (ไม่ต้อง unique)
  author   User @relation(fields: [authorId], references: [id])
}

model Group {
  id    Int    @id @default(autoincrement())
  users User[] 
}`
        }
      ]
    },
    {
      id: 'self-relation',
      name: 'Self-relation & Referential Actions',
      description: 'ตารางที่อ้างอิงตัวเอง (เช่น ความเห็นย่อย) และการจัดการเมื่อข้อมูลต้นทางถูกลบ (Cascade/SetNull)',
      syntax: 'onDelete: Cascade',
      examples: [
        {
          title: 'Self-relation และการทำ Cascade Delete',
          language: 'prisma',
          code: `model Category {
  id       Int        @id @default(autoincrement())
  name     String
  
  // รหัสหมวดหมู่แม่ (ถ้ามี)
  parentId Int?
  
  // การชี้กลับหา Category ตัวเอง
  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children Category[] @relation("CategoryHierarchy")
}

model Post {
  id       Int  @id @default(autoincrement())
  authorId Int
  
  // ถ้า User(ต้นทาง) ถูกลบ -> ให้ลบ Post นี้ทิ้งตามไปด้วยทันที! (Cascade)
  // ตัวเลือกอื่น: SetNull (กำหนดให้เป็นค่าว่าง), Restrict (ห้ามลบต้นทางถ้ามีปลายทางอยู่)
  author   User @relation(fields: [authorId], references: [id], onDelete: Cascade)
}`
        }
      ]
    }
  ]
};
