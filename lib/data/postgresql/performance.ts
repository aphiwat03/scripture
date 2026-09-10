import { Category } from '../types';

export const performanceCategory: Category = {
  id: 'performance',
  name: 'Performance & Optimization',
  icon: '⚡',
  description: 'การอ่าน Query Plan, สร้าง Index เฉพาะทาง, และกลไก VACUUM/MVCC',
  commands: [
    {
      id: 'explain-analyze',
      name: 'EXPLAIN ANALYZE',
      description: 'คำสั่งอ่านแผนการทำงาน (Query Plan) ว่าฐานข้อมูลประมวลผลยังไง และบอก "เวลาที่รันจริง"',
      syntax: 'EXPLAIN ANALYZE SELECT ...',
      examples: [
        {
          title: 'วิธีจับผิดคอขวด (Bottleneck)',
          language: 'sql',
          code: `EXPLAIN ANALYZE 
SELECT * FROM users WHERE age > 30;

/* 
สิ่งที่ต้องมองหาในผลลัพธ์:
1. Seq Scan (Sequential Scan): กวาดหาทั้งตารางแบบเส้นตรง (ถ้าตารางใหญ่ถือว่าแย่)
2. Index Scan: วิ่งไปหาที่ Index ทันที (ดีมาก)
3. Bitmap Heap Scan: ใช้ควบคู่กับ Bitmap Index Scan ดึงเป็นบล็อก (ดีปานกลาง)
4. Execution Time: เวลาทั้งหมดที่ใช้จริง
*/`
        }
      ]
    },
    {
      id: 'advanced-indexes',
      name: 'Advanced Indexes (GIN, GiST, Partial)',
      description: 'ประเภทของ Index ขั้นสูง (นอกเหนือจาก B-Tree)',
      syntax: 'CREATE INDEX ... USING ...',
      examples: [
        {
          title: 'การสร้าง Index แบบต่างๆ',
          language: 'sql',
          code: `-- 1. GIN (Generalized Inverted Index): สำคัญมากสำหรับ JSONB และ Arrays
CREATE INDEX idx_user_tags ON users USING GIN (tags);

-- 2. GiST: สำคัญมากสำหรับ Spatial Data (พิกัดแผนที่ PostGIS) และ Range types
CREATE INDEX idx_room_booking ON bookings USING GiST (booked_period);

-- 3. Partial Index: ทำ Index "แค่บางแถว" เท่านั้น (ประหยัดพื้นที่สุดๆ)
-- เหมาะสำหรับสถานะที่มีน้อยแต่ค้นหาบ่อย เช่น ค้นหาใบเสร็จที่ "ยังไม่จ่ายเงิน"
CREATE INDEX idx_unpaid_invoices ON invoices (status) WHERE status = 'UNPAID';`
        }
      ]
    },
    {
      id: 'materialized-views',
      name: 'Materialized Views',
      description: 'View ธรรมดาจะประมวลผลใหม่ทุกครั้งที่ถูกเรียก (ช้า) แต่ Materialized View จะคำนวณและ "เซฟผลลัพธ์ลงดิสก์" เลย (เร็วมากเหมือนอ่านตารางปกติ)',
      syntax: 'CREATE MATERIALIZED VIEW',
      examples: [
        {
          title: 'การสร้างและการรีเฟรช',
          language: 'sql',
          code: `-- 1. สร้างแคชรายงานยอดขายรายเดือน (ประมวลผลหนัก)
CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT DATE_TRUNC('month', order_date) as month, SUM(amount) as total
FROM orders
GROUP BY DATE_TRUNC('month', order_date);

-- 2. เวลาเรียกดูข้อมูล จะเร็วมาก (เพราะดึงจากดิสก์)
SELECT * FROM monthly_sales_summary;

-- 3. ⚠️ ข้อควรระวัง: ข้อมูลจะ "ไม่อัปเดต" อัตโนมัติ!
-- ต้องสั่ง REFRESH สม่ำเสมอ (เช่น สั่งทุกคืนตอนเที่ยงคืนผ่าน Cron job)
REFRESH MATERIALIZED VIEW monthly_sales_summary;

-- (ทริค) ถ้าสร้าง Unique Index ไว้ จะสั่ง CONCURRENTLY ได้ (หน้าเว็บจะไม่ล็อกค้างตอน Refresh)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_summary;`
        }
      ]
    },
    {
      id: 'vacuum-mvcc',
      name: 'VACUUM & MVCC (Database Bloat)',
      description: 'MVCC ของ Postgres เก็บแถวเวอร์ชันเก่าไว้เมื่อถูก UPDATE/DELETE ทำให้ดิสก์บวม (Bloat) ต้องมี VACUUM มาคอยล้าง',
      syntax: 'VACUUM FULL',
      examples: [
        {
          title: 'สถาปัตยกรรมการล้างขยะ',
          language: 'sql',
          code: `/*
MVCC (Multi-Version Concurrency Control):
เมื่อคุณ UPDATE ข้อมูล Postgres จะไม่ลบทับแถวเดิม! 
มันจะสร้างแถวใหม่ (Live tuple) แล้วซ่อนแถวเก่า (Dead tuple) เอาไว้
เมื่อซ่อนสะสมไปเรื่อยๆ ขนาดตารางจะ "บวม" เรียกว่า Table Bloat
*/

-- 1. คำสั่งรวบรวมขยะและคืนพื้นที่ให้ OS (แต่จะ Lock Table! ห้ามรันตอนคนใช้เยอะ)
VACUUM FULL users;

-- 2. คำสั่งเคลียร์ขยะแบบเบาๆ (ระบบมักจะรัน Autovacuum เองอยู่แล้วเบื้องหลัง)
VACUUM users;

-- 3. อัปเดตสถิติให้ Query Planner ฉลาดขึ้น (มักใช้คู่กับ VACUUM)
ANALYZE users;`
        }
      ]
    }
  ]
};
