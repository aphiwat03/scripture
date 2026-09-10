import { Category } from '../types';

export const constraintsProceduresCategory: Category = {
  id: 'constraints-procedures',
  name: 'Constraints & Procedures',
  icon: '⚙️',
  description: 'การจัดการข้อมูลซ้ำ, Constraints และการเขียน Stored Procedures/Triggers',
  commands: [
    {
      id: 'on-duplicate-key',
      name: 'INSERT ... ON DUPLICATE KEY UPDATE',
      description: 'ท่าไม้ตาย UPSERT ของฝั่ง MySQL (เหมือน ON CONFLICT ของ Postgres)',
      syntax: 'ON DUPLICATE KEY UPDATE',
      examples: [
        {
          title: 'Insert หรือ Update ถ้ามีข้อมูลอยู่แล้ว',
          language: 'sql',
          code: `INSERT INTO daily_stats (date, view_count) 
VALUES ('2024-01-01', 1)
-- ถ้ามีวันที่ 2024-01-01 (ซึ่งเซ็ตเป็น Primary Key) อยู่ในระบบแล้ว ให้บวก 1 ทับไปเลย
ON DUPLICATE KEY UPDATE 
view_count = view_count + 1;`
        }
      ]
    },
    {
      id: 'check-constraint',
      name: 'CHECK Constraints (MySQL 8.0.16+)',
      description: 'เมื่อก่อน MySQL อนุญาตให้เขียน CHECK แต่ไม่ยอมตรวจสอบจริง! แต่ตอนนี้เช็คจริงแล้ว',
      syntax: 'CHECK(expr)',
      examples: [
        {
          title: 'บังคับเงื่อนไขข้อมูล',
          language: 'sql',
          code: `CREATE TABLE accounts (
  id INT PRIMARY KEY,
  balance DECIMAL(10,2),
  
  -- บังคับว่ายอดเงินห้ามติดลบเด็ดขาด (มีผลจริงใน MySQL 8.0.16 ขึ้นไป)
  CONSTRAINT chk_positive_balance CHECK (balance >= 0)
);`
        }
      ]
    },
    {
      id: 'stored-procedures',
      name: 'Stored Procedures & Exception Handling',
      description: 'เขียนฟังก์ชันโปรแกรมมิ่ง (มี If, Loop) เซฟเก็บไว้ใน Database ให้เรียกใช้ง่ายๆ',
      syntax: 'DELIMITER // ... CREATE PROCEDURE',
      examples: [
        {
          title: 'สร้างกระบวนการโอนเงินและดักจับ Error',
          language: 'sql',
          code: `-- ต้องเปลี่ยนเครื่องหมายจบคำสั่งชั่วคราว ไม่งั้น MySQL จะนึกว่าจบคำสั่งไปแล้วกลางทาง
DELIMITER //

CREATE PROCEDURE TransferMoney(
  IN sender_id INT, 
  IN receiver_id INT, 
  IN amount DECIMAL
)
BEGIN
  -- ประกาศการจัดการ Error (ถ้ายิง SQL ล้มเหลว ให้ ROLLBACK อัตโนมัติ)
  DECLARE EXIT HANDLER FOR SQLEXCEPTION 
  BEGIN
    ROLLBACK;
    SELECT 'Transaction failed' AS status;
  END;

  START TRANSACTION;
  
  -- หักเงิน
  UPDATE accounts SET balance = balance - amount WHERE id = sender_id;
  -- เพิ่มเงิน
  UPDATE accounts SET balance = balance + amount WHERE id = receiver_id;
  
  COMMIT;
  SELECT 'Transaction success' AS status;
END //

DELIMITER ;

-- วิธีเรียกใช้:
-- CALL TransferMoney(1, 2, 500);`
        }
      ]
    }
  ]
};
