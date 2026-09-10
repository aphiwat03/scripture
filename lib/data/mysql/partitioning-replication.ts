import { Category } from '../types';

export const partitioningReplicationCategory: Category = {
  id: 'partitioning-replication',
  name: 'Partitioning & Replication',
  icon: '🔁',
  description: 'การแบ่งตารางรองรับข้อมูลมหาศาล และสถาปัตยกรรมก๊อปปี้ฐานข้อมูล (Master/Slave)',
  commands: [
    {
      id: 'partitioning',
      name: 'Table Partitioning (Range)',
      description: 'สับตารางที่โคตรใหญ่ให้เป็นตารางย่อยๆ (เช่น สับเป็นปี) เพื่อให้ค้นหาได้ไวขึ้นและลบข้อมูลง่ายขึ้น',
      syntax: 'PARTITION BY RANGE (expr)',
      examples: [
        {
          title: 'แบ่งพาร์ทิชันตามปีที่เกิดรายการ',
          language: 'sql',
          code: `-- สร้างตารางและสั่งสับแยกเป็นชิ้นๆ ตามปี (ปี 2022, 2023, 2024...)
CREATE TABLE order_history (
  id INT NOT NULL,
  order_date DATE NOT NULL,
  amount DECIMAL(10,2)
)
PARTITION BY RANGE (YEAR(order_date)) (
  PARTITION p2022 VALUES LESS THAN (2023),
  PARTITION p2023 VALUES LESS THAN (2024),
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- ถ้ายากลบข้อมูลเก่าทิ้งทั้งหมดของปี 2022 (เร็วมาก ไม่กระทบระบบ)
-- ALTER TABLE order_history DROP PARTITION p2022;`
        }
      ]
    },
    {
      id: 'replication',
      name: 'Binlog-based Replication',
      description: 'ระบบหลังบ้านที่ MySQL ใช้ส่งการเปลี่ยนแปลงจาก Master (คนเขียน) ไปให้ Slave (คนอ่าน)',
      syntax: 'SBR vs RBR',
      examples: [
        {
          title: 'ความแตกต่างของรูปแบบ Binlog',
          language: 'text',
          code: `MySQL Replication ใช้ Binlog (Binary Log) มีรูปแบบการจดบันทึก 3 แบบ:

1. Statement-based (SBR): 
จด "คำสั่ง SQL" ส่งไปรันปลายทาง (เช่น INSERT ... NOW())
-> ⚠️ ข้อเสีย: ฟังก์ชันบางอย่าง (เช่น NOW(), RAND()) พอไปรันเครื่องปลายทาง อาจได้ค่าไม่ตรงกับต้นฉบับ!

2. Row-based (RBR) - *Default ตั้งแต่ 5.7+*:
จด "ผลลัพธ์ข้อมูลจริงๆ ของแถวนั้น" ส่งไปเลย (เช่น แถวที่ 5 คอลัมน์ date เปลี่ยนเป็น 2024-01-01)
-> ✅ ข้อดี: ข้อมูลเป๊ะ 100% แน่นอน
-> ข้อเสีย: ถ้าอัปเดต 1 ล้านแถว Log จะบวมมหาศาล

3. Mixed: 
ระบบสลับใช้ RBR ผสม SBR อัตโนมัติตามความเหมาะสม`
        }
      ]
    },
    {
      id: 'replication-lag',
      name: 'Replication Lag & Read-your-writes',
      description: 'ปัญหาโลกแตกของการแยก Master/Slave และแพทเทิร์นวิธีแก้',
      syntax: 'Architecture Pattern',
      examples: [
        {
          title: 'ปัญหาเซฟแล้วโหลดหน้าใหม่แต่ข้อมูลเก่าโผล่!',
          language: 'text',
          code: `ปัญหา Replication Lag (Delay):
เมื่อ User กด Save -> ข้อมูลถูกเขียนลง Master
จังหวะนั้นหน้าเว็บโหลดใหม่ แล้ววิ่งไปอ่าน (SELECT) จากเครื่อง Slave
แต่เครื่อง Slave ยังดูดข้อมูลจาก Master มาไม่เสร็จ! (ใช้เวลาเสี้ยววิ) 
ทำให้ User เห็นข้อมูลเก่าเหมือนไม่ได้เซฟ

วิธีแก้ (Read-your-writes Pattern):
ในฝั่งโค้ด Backend: ให้ทำเครื่องหมาย (Cookie หรือ Redis) ว่า User คนนี้เพิ่งเขียนข้อมูลมานะ 
ภายในระยะเวลา 5 วินาทีหลังจากเขียน "ให้บังคับ User คนนี้ไปดึง (SELECT) จาก Master โดยตรงเลย!"`
        }
      ]
    }
  ]
};
