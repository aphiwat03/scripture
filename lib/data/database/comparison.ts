import { Category } from '../types';

export const comparisonCategory: Category = {
  id: 'comparison',
  name: 'ตารางเปรียบเทียบ (Postgres vs MySQL)',
  icon: '⚖️',
  description: 'สรุปหมัดต่อหมัด ฟีเจอร์ไหนใครมี ใครดีกว่า (สำหรับตอบสัมภาษณ์ System Design)',
  commands: [
    {
      id: 'vs-table',
      name: 'หมัดต่อหมัด (Feature vs Feature)',
      description: 'ตารางสรุปข้อแตกต่างสำคัญ',
      syntax: 'Postgres vs MySQL',
      examples: [
        {
          title: 'ตารางเปรียบเทียบ',
          language: 'text',
          code: `[ฟีเจอร์]                   | [🐘 PostgreSQL]                | [🐬 MySQL (InnoDB)]
----------------------------------------------------------------------------------------
สถาปัตยกรรม (Architecture)   | Process-based (กิน RAM เยอะกว่า)| Thread-based (เบากว่า)
JSON                      | มี JSONB (Index ได้ เร็วมาก)     | มี JSON (แต่ไม่ทรงพลังเท่า)
Arrays (TEXT[])           | มี (เป็น Native)               | ไม่มี (ต้องทำตาราง 1:N)
Materialized Views        | มี (แบคอัปผลลัพธ์ลงดิสก์ได้)       | ไม่มี (มีแค่ View ธรรมดา)
Full-Text Search          | ระดับเทพ (ไม่ต้องง้อ Elastic)     | มี แต่พื้นฐาน
Extensions (ปลั๊กอิน)        | เยอะและทรงพลังมาก (PostGIS)    | น้อยกว่า
Default Isolation Level   | READ COMMITTED               | REPEATABLE READ
Phantom Read Prevention   | ใช้ Serializable ถึงจะกันได้      | กันได้ตั้งแต่ Repeatable Read (ด้วย Gap Lock)
Storage Engine            | มีแค่อันเดียว (Postgres)         | เลือกได้ (InnoDB, MyISAM, Memory)
UPSERT Command            | ON CONFLICT DO UPDATE          | ON DUPLICATE KEY UPDATE`
        }
      ]
    },
    {
      id: 'when-to-use',
      name: 'สรุป: ควรเลือกใช้ตัวไหนตอนไหน?',
      description: 'คำตอบที่ผู้สัมภาษณ์อยากได้ยินที่สุดเวลาถูกถามให้เลือก Technology',
      syntax: 'Use Case',
      examples: [
        {
          title: 'วิธีตัดสินใจในชีวิตจริง',
          language: 'text',
          code: `ควรเลือก 🐘 PostgreSQL เมื่อ:
1. ระบบมีความซับซ้อนสูง มีความสัมพันธ์ของข้อมูลแบบยั้วเยี้ย
2. อยากเก็บข้อมูลแบบ NoSQL (JSON) ปนๆ กับ SQL ในที่เดียวกัน
3. มีการเก็บและค้นหาพิกัดแผนที่ (ต้องพึ่ง PostGIS)
4. ต้องการคิวรีวิเคราะห์ข้อมูลโหดๆ (OLAP-lite) หรือ Window functions ซับซ้อน

ควรเลือก 🐬 MySQL เมื่อ:
1. ทำเว็บ/แอปพลิเคชันทั่วไปที่เน้นอ่านข้อมูลเร็วๆ (Read-heavy) 
2. ต้องการทำระบบ Cluster / Replication (Master-Slave) ที่เซ็ตอัปง่ายและชุมชนกว้างขวาง
3. โปรเจกต์มีข้อจำกัดเรื่อง RAM เซิร์ฟเวอร์น้อยๆ (MySQL กินทรัพยากรตั้งต้นน้อยกว่า)
4. คนในทีมถนัดเครื่องมือ Ecosystem ของ MySQL เดิมอยู่แล้ว`
        }
      ]
    }
  ]
};
