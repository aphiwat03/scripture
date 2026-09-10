import { Category } from '../types';

export const securityCategory: Category = {
  id: 'security',
  name: 'Security & Injection',
  icon: '🛡️',
  description: 'การป้องกันช่องโหว่ความปลอดภัยระดับฐานข้อมูล และการจัดการสิทธิ์เข้าถึง',
  commands: [
    {
      id: 'sql-injection',
      name: 'SQL Injection Prevention',
      description: 'วิธีป้องกันแฮกเกอร์แทรกคำสั่ง SQL ประสงค์ร้ายเข้ามาทางกล่องข้อความกรอกข้อมูล',
      syntax: 'Parameterized Query',
      examples: [
        {
          title: 'ความแตกต่างของโค้ดที่โดนแฮก vs ปลอดภัย',
          language: 'sql',
          code: `/* 
❌ ห้ามทำ: (String Concatenation) เอาข้อความมาต่อกันดื้อๆ
ถ้าแฮกเกอร์กรอก email เป็น: a' OR '1'='1
Query จะกลายเป็น: SELECT * FROM users WHERE email = 'a' OR '1'='1';
ผลคือ ดึงข้อมูลได้ทั้งตารางเลย!
*/

/* 
✅ วิธีที่ถูกต้อง: Prepared Statement / Parameterized Query
(ในโค้ด Node.js, Python, PHP แทบทุกภาษาจะมีให้ใช้)
DB จะมองสิ่งที่เราส่งเข้าไปเป็น "ข้อความล้วน" เท่านั้น ไม่เอาไปรันคำสั่งเด็ดขาด
*/
-- 1. เตรียมคำสั่งล่วงหน้า
PREPARE get_user (TEXT) AS SELECT * FROM users WHERE email = $1;
-- 2. ส่งค่าเข้าไปรัน
EXECUTE get_user('a'' OR ''1''=''1'); -- จะหาอีเมลชื่อแปลกๆ นี้ตรงๆ (หาไม่เจอแน่นอน ปลอดภัย!)`
        }
      ]
    },
    {
      id: 'user-privileges',
      name: 'User Privileges (GRANT/REVOKE)',
      description: 'หลักการ Principle of Least Privilege: ให้สิทธิ์น้อยที่สุดเท่าที่พนักงานคนนั้นจำเป็นต้องใช้',
      syntax: 'GRANT ... ON ... TO',
      examples: [
        {
          title: 'สร้าง User ให้อ่านได้อย่างเดียว (Read-Only)',
          language: 'sql',
          code: `-- 1. สร้าง User ใหม่สำหรับคนวิเคราะห์ข้อมูล
CREATE USER 'data_analyst'@'%' IDENTIFIED BY 'password';

-- 2. ให้สิทธิ์ "ดูข้อมูล" (SELECT) ได้แค่อย่างเดียวเท่านั้น
GRANT SELECT ON production_db.* TO 'data_analyst'@'%';

-- 3. ยกเลิกสิทธิ์บางอย่าง (ถ้ามีสิทธิ์เกิน)
REVOKE DELETE, DROP ON production_db.* FROM 'data_analyst'@'%';

-- 4. บังคับให้โหลดสิทธิ์ใหม่
FLUSH PRIVILEGES;`
        }
      ]
    }
  ]
};
