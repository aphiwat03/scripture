import { Category } from '../types';

export const transactionsCategory: Category = {
  id: 'transactions',
  name: 'Transactions & Concurrency',
  icon: '🔒',
  description: 'การควบคุม Concurrency (การทำงานพร้อมกันหลายคน), Isolation Levels และการล็อกแถว',
  commands: [
    {
      id: 'isolation-levels',
      name: 'Isolation Levels (READ COMMITTED ฯลฯ)',
      description: 'ระดับความเข้มงวดในการล็อก Transaction เพื่อป้องกันปัญหา (Anomaly) เช่น Dirty Read, Phantom Read',
      syntax: 'SET TRANSACTION ISOLATION LEVEL ...',
      examples: [
        {
          title: '3 ระดับพื้นฐานและ Anomaly ที่มันป้องกัน',
          language: 'sql',
          code: `/*
1. READ COMMITTED (ค่าเริ่มต้นของ Postgres)
- ป้องกัน: Dirty Read (ห้ามอ่านข้อมูลคนอื่นที่กำลังแก้แต่ยังไม่ Commit)
- ทำไม Postgres ไม่เจอ Dirty Read?: เพราะระบบ MVCC จัดการเวอร์ชันข้อมูลให้เนียนๆ อยู่แล้ว

2. REPEATABLE READ
- ป้องกันเพิ่ม: Non-repeatable Read (อ่านข้อมูลเดิม 2 รอบใน 1 transaction ต้องได้ค่าเดิมเสมอ แม้มีใครมาอัปเดตก็ตาม)

3. SERIALIZABLE (เข้มงวดสุด โอกาส Deadlock สูง)
- ป้องกันเพิ่ม: Phantom Read (มีแถวโผล่มาใหม่หรือหายไประหว่างเรา Query)
*/

BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- ทำงาน...
COMMIT;`
        }
      ]
    },
    {
      id: 'row-locking',
      name: 'Row Locking (FOR UPDATE)',
      description: 'การล็อกข้อมูลบางแถวไม่ให้ใครมาแก้จนกว่าเราจะทำเสร็จ (Pessimistic Locking)',
      syntax: 'SELECT ... FOR UPDATE',
      examples: [
        {
          title: 'จองคิว / ดึงงานจากคิว (Skip Locked)',
          language: 'sql',
          code: `-- 1. การล็อกปกติ (ถ้าคนอื่นล็อกแถวนี้อยู่ เราจะ "รอ" จนกว่าเขาจะ Commit/Rollback)
SELECT * FROM products WHERE id = 1 FOR UPDATE;

-- 2. การดึงงานจาก Job Queue แบบกระจายศูนย์ (ใครมาล็อกไว้ ฉันข้ามไปเอาอันถัดไปเลย ไม่รอ!)
SELECT id FROM jobs 
WHERE status = 'PENDING' 
FOR UPDATE SKIP LOCKED 
LIMIT 1;
-- 👆 เป็นเทคนิคระดับเทพที่ทำให้ Postgres กลายเป็น Message Queue ขนาดย่อมได้`
        }
      ]
    }
  ]
};
