import { Category } from '../types';

export const transactionsCategory: Category = {
  id: 'transactions',
  name: 'Transactions, Locking & Deadlocks',
  icon: '🔒',
  description: 'กลไกระดับลึกของ InnoDB, Isolation Levels และ Gap Lock อันลือลั่น',
  commands: [
    {
      id: 'isolation-levels',
      name: 'Isolation Levels (REPEATABLE READ)',
      description: 'ระดับความเข้มงวดของ Transaction (ค่า Default ของ MySQL แตกต่างจากเจ้าอื่น!)',
      syntax: 'SET TRANSACTION ISOLATION LEVEL ...',
      examples: [
        {
          title: 'ความแตกต่างของ Default Isolation',
          language: 'sql',
          code: `/*
ค่า Default ของ MySQL (InnoDB) คือ REPEATABLE READ!
(ในขณะที่ Postgres หรือ Oracle ใช้ READ COMMITTED)

สิ่งที่ REPEATABLE READ ของ MySQL ทำ:
- รับประกันว่า อ่านข้อมูลแถวเดิมกี่รอบก็ได้ค่าเดิมเสมอ (ใช้ MVCC)
- ⚠️ พิเศษ: ป้องกัน Phantom Read ให้ด้วยกลไก Gap Lock (ในมาตรฐาน SQL ปกติต้องระดับ Serializable ถึงจะกันได้)
*/`
        }
      ]
    },
    {
      id: 'gap-lock',
      name: 'Gap Lock & Next-Key Locking',
      description: 'ฟีเจอร์กันผี (Phantom Read) ของ InnoDB ที่ชอบสร้างปัญหา Deadlock แบบไม่รู้ตัว!',
      syntax: 'Gap Lock',
      examples: [
        {
          title: 'การล็อกแบบจองพื้นที่ (ช่องว่าง)',
          language: 'sql',
          code: `/*
สมมติมีตารางเก็บ ID: 10, 20, 30

Transaction A สั่ง:
SELECT * FROM table WHERE id BETWEEN 15 AND 25 FOR UPDATE;

เกิดอะไรขึ้น?:
MySQL จะไม่ล็อกแค่แถว 20! มันจะกางอาณาเขตล็อก "ช่องว่าง (Gap)" ระหว่าง (10 ถึง 20) และ (20 ถึง 30) ด้วย!
เรียกว่า Next-Key Lock

ผลกระทบ:
ถ้า Transaction B พยายาม INSERT id = 18 เข้ามา...
B จะถูกบล็อก (ค้าง) ทันที! แม้ว่าแถว 18 จะยังไม่เคยมีอยู่จริงก็ตาม
(นี่คือเหตุผลที่เกิด Deadlock บ่อยมากเวลาทำ Concurrent Insert รัวๆ)
*/`
        }
      ]
    },
    {
      id: 'deadlock-debugging',
      name: 'Deadlock Debugging',
      description: 'คำสั่งหาเบาะแสเมื่อเกิดปัญหางูกินหาง (Deadlock) สองฝั่งรอข้อมูลกันไปมา',
      syntax: 'SHOW ENGINE INNODB STATUS',
      examples: [
        {
          title: 'ดึง Log สถานะ Deadlock ครั้งล่าสุด',
          language: 'sql',
          code: `-- รันคำสั่งนี้เพื่อดูรายละเอียดเบื้องลึกของ InnoDB engine
SHOW ENGINE INNODB STATUS;

/* 
ในผลลัพธ์ให้เลื่อนหาหมวด:
------------------------
LATEST DETECTED DEADLOCK
------------------------
มันจะบอกเลยว่า Transaction 1 ล็อกอะไรอยู่และกำลังรออะไร 
และ Transaction 2 ล็อกอะไรอยู่และกำลังรออะไร 
ช่วยให้เรากลับไปแก้โค้ดถูกจุด
*/`
        }
      ]
    }
  ]
};
