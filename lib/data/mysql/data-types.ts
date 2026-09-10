import { Category } from '../types';

export const dataTypesCategory: Category = {
  id: 'data-types',
  name: 'Data Types & Pitfalls',
  icon: '📦',
  description: 'ประเภทข้อมูลของ MySQL และหลุมพรางที่พบเจอบ่อยใน Production (Timezone, Charset)',
  commands: [
    {
      id: 'datetime-timestamp',
      name: 'DATETIME vs TIMESTAMP (หลุมพราง Timezone)',
      description: 'ความแตกต่างของการเก็บเวลา ซึ่งสร้างปัญหาให้ Dev เยอะที่สุดเวลาย้าย Server!',
      syntax: 'DATETIME, TIMESTAMP',
      examples: [
        {
          title: 'ความแตกต่างที่ต้องระวัง',
          language: 'text',
          code: `1. DATETIME
- เก็บข้อมูลเหมือน "ข้อความ" (เช่น '2024-01-01 12:00:00') ดิบๆ
- เซิร์ฟเวอร์จะ Timezone อะไร มันก็โชว์ค่านี้เป๊ะๆ ไม่มีการแปลงกลับไปมา!

2. TIMESTAMP
- เก็บข้อมูลเป็นจำนวนวินาที (UTC) เบื้องหลัง
- เวลาเรียกดู: MySQL จะดึงค่า UTC นั้นมา บวก/ลบ กับ Timezone ของเซิร์ฟเวอร์ก่อนโชว์ให้คุณ!
- ⚠️ หลุมพราง: ถ้าย้าย Database ไปเซิร์ฟเวอร์ที่ตั้ง Timezone ต่างกัน ค่าที่ SELECT ออกมาจะเปลี่ยนไปทันที!`
        }
      ]
    },
    {
      id: 'utf8mb4',
      name: 'Charset (utf8 vs utf8mb4)',
      description: 'ปัญหาเรื่อง Character Set ที่ทำให้ Insert อีโมจิ หรือภาษาจีนบางตัวไม่ได้',
      syntax: 'CHARSET=utf8mb4',
      examples: [
        {
          title: 'ทำไมต้องใช้ utf8mb4?',
          language: 'sql',
          code: `/*
ในอดีต (MySQL เก่าๆ): utf8 ของ MySQL นั้นเป็นตัวปลอม! มันรองรับสูงสุดแค่ 3-bytes ต่อตัวอักษร
ทำให้เวลา Insert อีโมจิ (😊) ซึ่งใช้ 4-bytes จะเจอปัญหา Data truncated error ทันที

วิธีแก้ (ปัจจุบัน): ต้องใช้ utf8mb4 เสมอ!
*/

CREATE TABLE comments (
  id INT PRIMARY KEY,
  content VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
        }
      ]
    },
    {
      id: 'json-enum',
      name: 'JSON & ENUM',
      description: 'การใช้งาน JSON และ ENUM ใน MySQL',
      syntax: 'JSON, ENUM(...)',
      examples: [
        {
          title: 'การใช้งานข้อมูลประเภทพิเศษ',
          language: 'sql',
          code: `-- 1. JSON (มีตั้งแต่ MySQL 5.7+)
-- ต่างจาก Postgres ตรงที่ MySQL เก็บเป็น Tree ภายใน ไม่ได้อิสระเท่า JSONB ของ Postgres
CREATE TABLE events (
  id INT PRIMARY KEY,
  data JSON
);
SELECT data->>'$.name' FROM events; -- ดึงข้อมูลจากคีย์ name

-- 2. ENUM (เก็บค่าได้เฉพาะที่กำหนด)
-- ข้อดี: ประหยัดพื้นที่จัดเก็บมาก (เก็บเป็นตัวเลขเบื้องหลัง 1, 2, 3)
-- ⚠️ ข้อเสีย: ถ้าอยากเพิ่มค่าใหม่ (ALTER TABLE) อาจล็อกตารางและใช้เวลานานในตารางใหญ่ๆ
CREATE TABLE users (
  role ENUM('USER', 'ADMIN', 'SUPERADMIN')
);`
        }
      ]
    }
  ]
};
