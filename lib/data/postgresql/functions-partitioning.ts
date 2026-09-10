import { Category } from '../types';

export const functionsPartitioningCategory: Category = {
  id: 'functions-partitioning',
  name: 'Functions, Partitioning & Replication',
  icon: '⚙️',
  description: 'การแบ่งโต๊ะข้อมูล (Partition), การเขียน Triggers (PL/pgSQL) และ Upsert',
  commands: [
    {
      id: 'plpgsql-triggers',
      name: 'Functions & Triggers (PL/pgSQL)',
      description: 'ภาษาฝังตัวสำหรับเขียนลอจิกคล้ายโปรแกรมมิ่ง (if, for loop) ใน DB',
      syntax: 'CREATE FUNCTION ... CREATE TRIGGER',
      examples: [
        {
          title: 'สร้าง Trigger อัปเดต updated_at อัตโนมัติ',
          language: 'sql',
          code: `-- 1. สร้างฟังก์ชัน (บอกว่าถ้าถูกเรียก ให้แก้ updated_at เป็นเวลาปัจจุบัน)
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. สร้าง Trigger ผูกเข้ากับตาราง users เมื่อมีคน UPDATE
CREATE TRIGGER trigger_update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();`
        }
      ]
    },
    {
      id: 'partitioning',
      name: 'Table Partitioning (การแบ่งพาร์ทิชัน)',
      description: 'แบ่งตารางใหญ่ออกเป็นตารางย่อยๆ ตามช่วงข้อมูล (เช่น ปี, เดือน) เพื่อให้สแกนข้อมูลเร็วขึ้น (Partition Pruning)',
      syntax: 'PARTITION BY RANGE | LIST | HASH',
      examples: [
        {
          title: 'แบ่งตารางตามช่วงปี (Range Partitioning)',
          language: 'sql',
          code: `-- 1. สร้างตารางแม่ (ห้ามใส่ข้อมูลเข้าตรงๆ)
CREATE TABLE sales (
  id SERIAL,
  sale_date DATE NOT NULL,
  amount NUMERIC
) PARTITION BY RANGE (sale_date);

-- 2. สร้างตารางลูกรองรับข้อมูลแต่ละปี
CREATE TABLE sales_2023 PARTITION OF sales
  FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE sales_2024 PARTITION OF sales
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- เวลา Query SELECT * FROM sales WHERE sale_date = '2023-05-01'
-- ระบบจะวิ่งไปสแกนแค่ใน sales_2023 ทันที (ข้าม 2024 ไปเลย)`
        }
      ]
    },
    {
      id: 'upsert',
      name: 'UPSERT (ON CONFLICT)',
      description: 'ท่าไม้ตายสำหรับ ถ้ามีข้อมูลอยู่แล้วให้อัปเดต ถ้ายังไม่มีให้แทรกใหม่ (ป้องกัน Error ซ้ำ)',
      syntax: 'INSERT ... ON CONFLICT DO UPDATE',
      examples: [
        {
          title: 'เพิ่มผู้ใช้ หรือ อัปเดตวันล็อกอินล่าสุด',
          language: 'sql',
          code: `INSERT INTO users (email, login_count)
VALUES ('test@example.com', 1)
-- กรณีอีเมล (ซึ่งถูกเซ็ต UNIQUE ไว้) มีอยู่แล้วในระบบ ให้มาทำ DO UPDATE แทน
ON CONFLICT (email) 
DO UPDATE SET 
  login_count = users.login_count + 1,
  last_login = NOW();`
        }
      ]
    },
    {
      id: 'replication',
      name: 'Replication (แนวคิดเบื้องต้น)',
      description: 'การทำระบบ Master/Slave (ก๊อปปี้ฐานข้อมูลเพื่อกระจายโหลดและแบ็คอัป)',
      syntax: 'Streaming vs Logical',
      examples: [
        {
          title: 'ความแตกต่าง',
          language: 'text',
          code: `1. Streaming Replication (Physical)
เป็นการก๊อปปี้ข้อมูลระดับ Block ดิสก์ (เอาไฟล์ WAL มาเรียงทับ) 
-> ข้อดี: เป๊ะ 100%, เร็วมาก
-> ข้อเสีย: เครื่อง Master/Slave ต้องใช้ Postgres เวอร์ชันเดียวกันเป๊ะ

2. Logical Replication
เป็นการแปลงการเปลี่ยนแปลง (เช่น INSERT/UPDATE) เป็นคำสั่งแล้วส่งไปรันที่ปลายทาง
-> ข้อดี: เลือกได้ว่าจะก๊อปเฉพาะ "บางตาราง", ส่งข้ามเวอร์ชันได้ (เหมาะกับการ Upgrade DB แบบไม่ดาวน์ไทม์)`
        }
      ]
    }
  ]
};
