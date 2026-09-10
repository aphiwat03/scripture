import { Category } from '../types';

export const dataTypesCategory: Category = {
  id: 'data-types',
  name: 'Data Types สุดล้ำ (Postgres-specific)',
  icon: '📦',
  description: 'ประเภทข้อมูลพิเศษที่มีเฉพาะใน PostgreSQL (JSONB, Arrays, UUID)',
  commands: [
    {
      id: 'jsonb',
      name: 'JSONB (Binary JSON)',
      description: 'เก็บข้อมูล JSON ในรูปแบบ Binary ช่วยให้อ่านและค้นหาได้เร็วกว่า JSON แบบธรรมดา (Text) และรองรับการทำ Indexing',
      syntax: 'JSONB',
      examples: [
        {
          title: 'การสร้างตารางและค้นหาข้อมูลใน JSONB',
          language: 'sql',
          code: `-- 1. สร้างตาราง
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);

-- 2. Insert ข้อมูล
INSERT INTO users (profile) VALUES 
('{"name": "Alice", "age": 25, "tags": ["admin", "dev"]}'),
('{"name": "Bob", "age": 30, "tags": ["user"]}');

-- 3. ค้นหาค่าข้างใน JSON (->> ได้ค่าเป็น text)
SELECT profile->>'name' AS name FROM users WHERE CAST(profile->>'age' AS INTEGER) > 28;

-- 4. ค้นหาว่ามี tag 'admin' ใน Array หรือไม่ (ใช้ @> "contains")
SELECT * FROM users WHERE profile->'tags' @> '"admin"';`
        }
      ]
    },
    {
      id: 'arrays-uuid',
      name: 'Arrays & UUID',
      description: 'เก็บข้อมูลแบบ Array (ไม่ต้องสร้างตารางแยกถ้าย่อยเกินไป) และใช้ UUID แบบ Native',
      syntax: 'TEXT[], UUID',
      examples: [
        {
          title: 'การใช้งาน Array และ UUID',
          language: 'sql',
          code: `-- ต้องลง extension ก่อนใช้ uuid_generate_v4() ใน PG ต่ำกว่า 13
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  -- ใน PG 13+ ใช้ gen_random_uuid() ได้เลย
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tags TEXT[] -- เก็บเป็น Array
);

INSERT INTO products (name, tags) 
VALUES ('Laptop', ARRAY['electronics', 'computer']);

-- ค้นหาข้อมูลที่มี tag 'electronics' (ใช้ = ANY)
SELECT * FROM products WHERE 'electronics' = ANY(tags);`
        }
      ]
    },
    {
      id: 'range-enum',
      name: 'Range Types & ENUM',
      description: 'ประเภทข้อมูลสำหรับการเก็บ "ช่วง" (เช่น ช่วงเวลา, ช่วงตัวเลข) และ ENUM',
      syntax: 'INT4RANGE, TSRANGE, TYPE ... AS ENUM',
      examples: [
        {
          title: 'การใช้งาน Range',
          language: 'sql',
          code: `-- 1. ENUM
CREATE TYPE order_status AS ENUM ('PENDING', 'SHIPPED', 'DELIVERED');

-- 2. Range (เก็บช่วงข้อมูล)
CREATE TABLE room_bookings (
  id SERIAL PRIMARY KEY,
  room_id INT,
  -- tsrange = Timestamp Range
  booked_period TSRANGE
);

-- ใส่ข้อมูล (รูปแบบ: [start, end) -> รวม start ไม่รวม end)
INSERT INTO room_bookings (room_id, booked_period) 
VALUES (101, '[2024-01-01 14:00, 2024-01-01 16:00)');

-- ตรวจสอบว่าเวลานี้ห้องว่างไหม (ใช้ @> เช็คว่า Range ครอบคลุมเวลาที่ถามไหม)
SELECT * FROM room_bookings 
WHERE booked_period @> '2024-01-01 15:00'::TIMESTAMP;`
        }
      ]
    }
  ]
};
