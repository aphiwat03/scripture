import { Category } from '../types';

export const ddlCategory: Category = {
  id: 'ddl',
  name: 'DDL (Data Definition)',
  icon: '🏗️',
  description: 'คำสั่งนิยามโครงสร้างฐานข้อมูล (CREATE, ALTER, DROP)',
  commands: [
    {
      id: 'create-table',
      name: 'CREATE TABLE',
      description: 'สร้างตารางใหม่พร้อมกำหนดโครงสร้างและ Constraints',
      syntax: 'CREATE TABLE table_name (column1 datatype constraints, ...)',
      examples: [
        {
          title: 'สร้างตารางพนักงานพื้นฐาน',
          language: 'sql',
          code: `CREATE TABLE employees (
  id          INT           PRIMARY KEY AUTO_INCREMENT,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  UNIQUE NOT NULL,
  department  VARCHAR(50),
  salary      DECIMAL(10,2) DEFAULT 0,
  created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP
);`
        },
        {
          title: 'สร้างตารางพร้อม Foreign Key',
          language: 'sql',
          code: `CREATE TABLE orders (
  id          INT           PRIMARY KEY AUTO_INCREMENT,
  customer_id INT           NOT NULL,
  total       DECIMAL(10,2) NOT NULL,
  order_date  DATE          NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);`
        },
        {
          title: 'CREATE TABLE AS SELECT (คัดลอกโครงสร้าง+ข้อมูล)',
          language: 'sql',
          code: `CREATE TABLE employees_backup AS
SELECT * FROM employees WHERE created_at < '2023-01-01';`
        }
      ],
      notes: 'Data Types ที่ใช้บ่อย: INT/BIGINT (จำนวนเต็ม), VARCHAR(n) (ข้อความจำกัดความยาว), TEXT (ข้อความยาว), DECIMAL(p,s) (ทศนิยมแม่นยำ), DATETIME/TIMESTAMP (วันที่+เวลา), BOOLEAN (true/false) | Constraints: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT',
      seeAlso: ['alter-table', 'drop-table', 'index']
    },
    {
      id: 'alter-table',
      name: 'ALTER TABLE',
      description: 'แก้ไขโครงสร้างตารางที่มีอยู่แล้ว (เพิ่มคอลัมน์, เปลี่ยนชนิดข้อมูล, ลบคอลัมน์)',
      syntax: 'ALTER TABLE table_name ADD/MODIFY/DROP COLUMN ...',
      examples: [
        {
          title: 'เพิ่มคอลัมน์ใหม่',
          language: 'sql',
          code: `ALTER TABLE employees ADD COLUMN phone VARCHAR(20);`
        },
        {
          title: 'แก้ไขชนิดข้อมูลคอลัมน์',
          language: 'sql',
          code: `-- MySQL
ALTER TABLE employees MODIFY COLUMN salary DECIMAL(12,2) NOT NULL;

-- PostgreSQL
ALTER TABLE employees ALTER COLUMN salary TYPE DECIMAL(12,2);`
        },
        {
          title: 'เปลี่ยนชื่อคอลัมน์',
          language: 'sql',
          code: `-- MySQL 8.0+
ALTER TABLE employees RENAME COLUMN salary TO monthly_salary;

-- PostgreSQL
ALTER TABLE employees RENAME COLUMN salary TO monthly_salary;`
        },
        {
          title: 'ลบคอลัมน์',
          language: 'sql',
          code: `ALTER TABLE employees DROP COLUMN phone;`
        },
        {
          title: 'เพิ่ม Constraint',
          language: 'sql',
          code: `ALTER TABLE employees ADD CONSTRAINT chk_salary CHECK (salary >= 0);
ALTER TABLE employees ADD CONSTRAINT fk_dept FOREIGN KEY (department_id) REFERENCES departments(id);`
        }
      ],
      notes: '⚠️ ALTER TABLE บนตารางใหญ่อาจล็อคตารางชั่วคราว ควรทำในช่วง Low Traffic | PostgreSQL มีข้อจำกัดน้อยกว่า MySQL ในการ ALTER บางประเภท',
      seeAlso: ['create-table', 'drop-table']
    },
    {
      id: 'drop-table',
      name: 'DROP TABLE',
      description: 'ลบตารางออกจากฐานข้อมูลทั้งโครงสร้างและข้อมูล',
      syntax: 'DROP TABLE [IF EXISTS] table_name',
      examples: [
        {
          title: 'ลบตาราง',
          language: 'sql',
          code: `DROP TABLE employees;`
        },
        {
          title: 'ลบตารางโดยไม่ให้ Error ถ้าไม่มีตาราง',
          language: 'sql',
          code: `DROP TABLE IF EXISTS temp_employees;`
        },
        {
          title: 'ความแตกต่างของ DROP, TRUNCATE, DELETE',
          language: 'sql',
          code: `-- DROP: ลบทั้งตาราง (โครงสร้าง + ข้อมูล)
DROP TABLE temp_data;

-- TRUNCATE: ลบทุกแถวแต่เก็บโครงสร้างไว้
TRUNCATE TABLE temp_data;

-- DELETE: ลบแถวตามเงื่อนไข
DELETE FROM temp_data WHERE id > 100;`
        }
      ],
      notes: '🔴 DROP ไม่สามารถ ROLLBACK ได้ใน MySQL | ถ้ามี FOREIGN KEY อ้างอิงอยู่จะ DROP ไม่ได้ ต้องลบ constraint ก่อน',
      seeAlso: ['create-table', 'alter-table']
    },
    {
      id: 'index',
      name: 'INDEX',
      description: 'โครงสร้างข้อมูลที่ช่วยเพิ่มความเร็วในการค้นหา (เหมือนดัชนีในหนังสือ)',
      syntax: 'CREATE [UNIQUE] INDEX index_name ON table (column)',
      examples: [
        {
          title: 'สร้าง Index บนคอลัมน์ที่ค้นหาบ่อย',
          language: 'sql',
          code: `CREATE INDEX idx_employees_department ON employees (department);
-- ทำให้ WHERE department = '...' เร็วขึ้น`
        },
        {
          title: 'Unique Index (ป้องกันค่าซ้ำ)',
          language: 'sql',
          code: `CREATE UNIQUE INDEX idx_employees_email ON employees (email);`
        },
        {
          title: 'Composite Index (หลายคอลัมน์)',
          language: 'sql',
          code: `-- สร้าง Index สำหรับ Query ที่ filter ด้วยทั้ง department และ salary
CREATE INDEX idx_dept_salary ON employees (department, salary);`
        },
        {
          title: 'ดู Index ที่มีอยู่',
          language: 'sql',
          code: `-- MySQL
SHOW INDEX FROM employees;

-- PostgreSQL
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'employees';`
        },
        {
          title: 'ลบ Index',
          language: 'sql',
          code: `DROP INDEX idx_employees_department ON employees; -- MySQL
DROP INDEX idx_employees_department; -- PostgreSQL`
        }
      ],
      notes: '✅ Index ช่วยเร็วขึ้น: WHERE, JOIN ON, ORDER BY | ⚠️ Index ทำให้ INSERT/UPDATE/DELETE ช้าลงเล็กน้อย เพราะต้อง update index | Primary Key สร้าง Index อัตโนมัติ',
      seeAlso: ['create-table', 'explain-query']
    },
    {
      id: 'constraints',
      name: 'Constraints',
      description: 'กฎเกณฑ์ที่บังคับใช้กับข้อมูลในตารางเพื่อรักษาความถูกต้อง (Data Integrity)',
      syntax: 'column_name datatype CONSTRAINT_TYPE',
      examples: [
        {
          title: 'ประเภทของ Constraints',
          language: 'sql',
          code: `CREATE TABLE products (
  id          INT           PRIMARY KEY AUTO_INCREMENT,  -- Primary Key: unique + NOT NULL
  sku         VARCHAR(50)   UNIQUE NOT NULL,            -- Unique: ห้ามซ้ำ
  name        VARCHAR(100)  NOT NULL,                   -- NOT NULL: ห้ามว่าง
  price       DECIMAL(10,2) CHECK (price >= 0),         -- CHECK: เงื่อนไขกำหนดเอง
  category_id INT           REFERENCES categories(id),  -- Foreign Key: อ้างอิงตารางอื่น
  status      VARCHAR(20)   DEFAULT 'active'            -- DEFAULT: ค่าเริ่มต้น
);`
        },
        {
          title: 'ON DELETE CASCADE vs ON DELETE RESTRICT',
          language: 'sql',
          code: `-- CASCADE: ถ้าลบ parent, ลบ child ด้วย
FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE CASCADE

-- RESTRICT: ป้องกันการลบ parent ถ้ายังมี child
FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE RESTRICT

-- SET NULL: ถ้าลบ parent ให้ set เป็น NULL
FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE SET NULL`
        }
      ],
      notes: 'PRIMARY KEY = UNIQUE + NOT NULL | Foreign Key ใช้รักษา Referential Integrity | CHECK constraint ไม่รองรับใน MySQL เวอร์ชันเก่า',
      seeAlso: ['create-table', 'alter-table']
    }
  ]
};
