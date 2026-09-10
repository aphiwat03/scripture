import { Category } from '../types';

export const constraintsCategory: Category = {
  id: 'constraints',
  name: 'Constraints & Integrity',
  icon: '📐',
  description: 'กฎการควบคุมความถูกต้องของข้อมูล (Constraints) และ Foreign Keys',
  commands: [
    {
      id: 'check-unique',
      name: 'CHECK & UNIQUE Composite',
      description: 'บังคับตรวจสอบเงื่อนไข (เช่น อายุห้ามติดลบ) และป้องกันการซ้ำกันข้ามหลายคอลัมน์',
      syntax: 'CHECK(expr), UNIQUE(col1, col2)',
      examples: [
        {
          title: 'สร้างเงื่อนไขจำกัดข้อมูล',
          language: 'sql',
          code: `CREATE TABLE employess (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  department_id INT,
  
  -- บังคับอายุต้องเกิน 18
  CONSTRAINT chk_age CHECK (age >= 18),
  
  -- บังคับว่า 1 แผนก ห้ามมีชื่อคนซ้ำกัน (Composite Unique)
  CONSTRAINT uq_dept_name UNIQUE (department_id, name)
);`
        }
      ]
    },
    {
      id: 'foreign-key-actions',
      name: 'Foreign Key Cascade Actions',
      description: 'การจัดการข้อมูลเมื่อแถวต้นทาง (Parent) ถูกลบหรือแก้ไข',
      syntax: 'ON DELETE CASCADE | SET NULL | RESTRICT',
      examples: [
        {
          title: 'ตัวเลือก ON DELETE',
          language: 'sql',
          code: `CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  author_id INT,
  
  -- CASCADE: ถ้า User โดนลบ Post นี้จะโดนลบทิ้งไปด้วยทันที
  -- SET NULL: ถ้า User โดนลบ ให้เปลี่ยน author_id เป็น NULL แทน
  -- RESTRICT: ห้ามลบ User เด็ดขาดถ้ายังมี Post นี้อ้างอิงอยู่!
  CONSTRAINT fk_author 
    FOREIGN KEY(author_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE
);`
        }
      ]
    },
    {
      id: 'exclusion-constraint',
      name: 'EXCLUSION Constraint (เฉพาะ Postgres)',
      description: 'เก่งกว่า UNIQUE ป้องกันข้อมูลที่มีการ "ทับซ้อนกัน" (Overlapping) เช่น การจองห้องช่วงเวลาชนกัน',
      syntax: 'EXCLUDE USING gist (...)',
      examples: [
        {
          title: 'ป้องกันการจองห้องพักเวลาชนกัน',
          language: 'sql',
          code: `CREATE EXTENSION btree_gist; -- ต้องลงก่อน

CREATE TABLE room_bookings (
  room_id INT,
  booking_period TSRANGE,
  
  -- บังคับว่า ถ้าห้องเดียวกัน (room_id = room_id) 
  -- และเวลาทับซ้อนกัน (booking_period && booking_period)
  -- ห้ามให้ INSERT ผ่านเด็ดขาด!
  EXCLUDE USING gist (
    room_id WITH =,
    booking_period WITH &&
  )
);`
        }
      ]
    }
  ]
};
