import { Category } from '../types';

export const dmlCategory: Category = {
  id: 'dml',
  name: 'DML (Data Manipulation)',
  icon: '✏️',
  description: 'คำสั่งจัดการข้อมูล (INSERT, UPDATE, DELETE)',
  commands: [
    {
      id: 'insert',
      name: 'INSERT INTO',
      description: 'เพิ่มแถวข้อมูลใหม่เข้าไปในตาราง',
      syntax: 'INSERT INTO table (col1, col2) VALUES (val1, val2)',
      examples: [
        {
          title: 'เพิ่มแถวเดียว',
          language: 'sql',
          code: `INSERT INTO employees (name, department, salary) VALUES ('Charlie', 'Marketing', 65000);`
        },
        {
          title: 'เพิ่มหลายแถวพร้อมกัน',
          language: 'sql',
          code: `INSERT INTO employees (name, department, salary) VALUES ('Dave', 'Engineering', 85000), ('Eve', 'HR', 52000), ('Frank', 'Marketing', 70000);`
        },
        {
          title: 'INSERT จาก SELECT (คัดลอกข้อมูล)',
          language: 'sql',
          code: `INSERT INTO employees_archive (name, department, salary) SELECT name, department, salary FROM employees WHERE created_at < '2020-01-01';`
        }
      ],
      notes: '⚠️ ระบุชื่อคอลัมน์เสมอ อย่าพึ่ง column order | ลำดับของ VALUES ต้องตรงกับลำดับคอลัมน์ที่ระบุ',
      seeAlso: ['update', 'delete']
    },
    {
      id: 'update',
      name: 'UPDATE',
      description: 'แก้ไขข้อมูลในแถวที่มีอยู่แล้วตามเงื่อนไข',
      syntax: 'UPDATE table SET col1 = val1 WHERE condition',
      examples: [
        {
          title: 'แก้ไขเงินเดือนพนักงาน',
          language: 'sql',
          code: `UPDATE employees SET salary = 90000 WHERE id = 2;`
        },
        {
          title: 'แก้ไขหลายคอลัมน์พร้อมกัน',
          language: 'sql',
          code: `UPDATE employees SET salary = 90000, department = 'Senior Engineering' WHERE id = 2;`
        },
        {
          title: 'แก้ไขตามเงื่อนไขจากตารางอื่น (UPDATE JOIN)',
          language: 'sql',
          code: `-- MySQL syntax\nUPDATE employees e INNER JOIN departments d ON e.department_id = d.id SET e.salary = e.salary * 1.1 WHERE d.department_name = 'Engineering';`
        },
        {
          title: '⚠️ UPDATE โดยไม่มี WHERE (อันตราย!)',
          language: 'sql',
          code: `-- อัปเดตทุกแถวในตาราง!\nUPDATE employees SET salary = 0; -- ⚠️ อย่าทำ!`
        }
      ],
      notes: '🔴 สำคัญมาก: ต้องใส่ WHERE เสมอ! UPDATE โดยไม่มี WHERE จะแก้ไขทุกแถวในตาราง ควร SELECT ตรวจสอบก่อนเสมอ',
      seeAlso: ['insert', 'delete', 'where']
    },
    {
      id: 'delete',
      name: 'DELETE',
      description: 'ลบแถวข้อมูลออกจากตารางตามเงื่อนไข',
      syntax: 'DELETE FROM table WHERE condition',
      examples: [
        {
          title: 'ลบแถวตาม ID',
          language: 'sql',
          code: `DELETE FROM employees WHERE id = 5;`
        },
        {
          title: 'ลบหลายแถวด้วยเงื่อนไข',
          language: 'sql',
          code: `DELETE FROM employees WHERE department = 'Temporary' AND created_at < '2023-01-01';`
        },
        {
          title: '⚠️ DELETE โดยไม่มี WHERE (ลบทุกแถว!)',
          language: 'sql',
          code: `-- ลบทุกแถวในตาราง (โครงสร้างยังอยู่)\nDELETE FROM employees; -- ⚠️ อย่าทำ!`
        },
        {
          title: 'ความต่างระหว่าง DELETE, TRUNCATE, DROP',
          language: 'sql',
          code: `-- DELETE: ลบแถวตามเงื่อนไข, สามารถ ROLLBACK ได้\nDELETE FROM employees WHERE id = 1;\n\n-- TRUNCATE: ลบทุกแถว, เร็วกว่า, บาง DB ไม่สามารถ ROLLBACK ได้\nTRUNCATE TABLE temp_data;\n\n-- DROP: ลบทั้งตาราง (โครงสร้าง + ข้อมูล)\nDROP TABLE temp_data;`
        }
      ],
      notes: '🔴 ต้องใส่ WHERE เสมอ! | DELETE สามารถ ROLLBACK ได้ภายใน Transaction | TRUNCATE เร็วกว่าแต่ไม่บันทึก log ทีละแถว',
      seeAlso: ['insert', 'update', 'transactions']
    },
    {
      id: 'merge',
      name: 'MERGE (UPSERT)',
      description: 'รวม INSERT และ UPDATE เข้าด้วยกัน – ถ้ามีข้อมูลให้ UPDATE ถ้าไม่มีให้ INSERT',
      syntax: 'MERGE INTO target USING source ON condition WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...',
      examples: [
        {
          title: 'MERGE (SQL Server / Oracle syntax)',
          language: 'sql',
          code: `MERGE INTO employees AS target\nUSING new_data AS source\nON target.id = source.id\nWHEN MATCHED THEN\n  UPDATE SET target.salary = source.salary, target.department = source.department\nWHEN NOT MATCHED THEN\n  INSERT (name, department, salary) VALUES (source.name, source.department, source.salary);`
        },
        {
          title: 'MySQL / PostgreSQL: INSERT ... ON DUPLICATE KEY / ON CONFLICT',
          language: 'sql',
          code: `-- MySQL\nINSERT INTO employees (id, name, salary) VALUES (1, 'Alice', 60000) ON DUPLICATE KEY UPDATE salary = VALUES(salary);\n\n-- PostgreSQL\nINSERT INTO employees (id, name, salary) VALUES (1, 'Alice', 60000) ON CONFLICT (id) DO UPDATE SET salary = EXCLUDED.salary;`
        }
      ],
      notes: 'MERGE ไม่ใช่มาตรฐาน ANSI ที่ทุก DB รองรับเหมือนกัน | MySQL ใช้ ON DUPLICATE KEY UPDATE | PostgreSQL ใช้ ON CONFLICT',
      seeAlso: ['insert', 'update']
    }
  ]
};
