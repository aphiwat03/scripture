import { Category } from '../types';

export const basicCategory: Category = {
  id: 'basic',
  name: 'พื้นฐาน SQL',
  icon: '📋',
  description: 'คำสั่งพื้นฐาน (SELECT, FROM, WHERE, ฯลฯ)',
  commands: [
    {
      id: 'select',
      name: 'SELECT',
      description: 'คำสั่งหลักสำหรับดึงข้อมูลจากตาราง',
      syntax: 'SELECT column1, column2 FROM table_name',
      examples: [
        {
          title: 'ดึงข้อมูลทุกคอลัมน์จากตาราง',
          language: 'sql',
          code: `SELECT * FROM employees;`,
          output: `id | name    | department | salary\n1  | Alice   | HR         | 55000\n2  | Bob     | Engineering| 80000`
        },
        {
          title: 'ดึงเฉพาะบางคอลัมน์',
          language: 'sql',
          code: `SELECT name, salary FROM employees;`,
          output: `name    | salary\nAlice   | 55000\nBob     | 80000`
        },
        {
          title: 'ใช้ alias ให้ชื่อใหม่กับคอลัมน์',
          language: 'sql',
          code: `SELECT name AS employee_name, salary AS monthly_salary FROM employees;`,
          output: `employee_name | monthly_salary\nAlice         | 55000`
        }
      ],
      notes: '⚠️ หลีกเลี่ยง SELECT * ใน Production เพราะดึงข้อมูลเกินความจำเป็นและไม่ระบุโครงสร้าง ให้ระบุชื่อคอลัมน์เสมอ',
      seeAlso: ['where', 'order-by', 'joins']
    },
    {
      id: 'where',
      name: 'WHERE',
      description: 'กรองแถวข้อมูลตามเงื่อนไขที่กำหนด',
      syntax: 'SELECT ... FROM table WHERE condition',
      examples: [
        {
          title: 'กรองด้วยค่าเท่ากัน',
          language: 'sql',
          code: `SELECT * FROM employees WHERE department = 'Engineering';`,
          output: `id | name | department  | salary\n2  | Bob  | Engineering | 80000`
        },
        {
          title: 'กรองด้วยตัวเลขและ AND/OR',
          language: 'sql',
          code: `SELECT * FROM employees WHERE salary > 60000 AND department = 'Engineering';`
        },
        {
          title: 'ใช้ IN เพื่อกรองหลายค่า',
          language: 'sql',
          code: `SELECT * FROM employees WHERE department IN ('HR', 'Engineering', 'Marketing');`
        },
        {
          title: 'ใช้ BETWEEN สำหรับช่วงค่า',
          language: 'sql',
          code: `SELECT * FROM employees WHERE salary BETWEEN 50000 AND 70000;`
        },
        {
          title: 'ใช้ LIKE สำหรับค้นหาข้อความ',
          language: 'sql',
          code: `SELECT * FROM employees WHERE name LIKE 'A%'; -- ขึ้นต้นด้วย A`,
          output: `id | name  | department | salary\n1  | Alice | HR         | 55000`
        },
        {
          title: 'ใช้ IS NULL ตรวจสอบค่า NULL',
          language: 'sql',
          code: `SELECT * FROM employees WHERE manager_id IS NULL; -- หาพนักงานที่ไม่มีหัวหน้า`
        }
      ],
      notes: 'ตัวดำเนินการเปรียบเทียบ: =, !=, <>, <, >, <=, >= | ตัวดำเนินการตรรกะ: AND, OR, NOT | ตัวดำเนินการพิเศษ: LIKE, IN, BETWEEN, IS NULL',
      seeAlso: ['select', 'joins']
    },
    {
      id: 'order-by',
      name: 'ORDER BY',
      description: 'จัดเรียงผลลัพธ์ตามคอลัมน์ที่กำหนด (ASC หรือ DESC)',
      syntax: 'SELECT ... ORDER BY column [ASC|DESC]',
      examples: [
        {
          title: 'เรียงจากมากไปน้อย (Descending)',
          language: 'sql',
          code: `SELECT name, salary FROM employees ORDER BY salary DESC;`,
          output: `name  | salary\nBob   | 80000\nAlice | 55000`
        },
        {
          title: 'เรียงหลายคอลัมน์',
          language: 'sql',
          code: `SELECT name, department, salary FROM employees ORDER BY department ASC, salary DESC;`
        }
      ],
      notes: 'ถ้าไม่ระบุ ASC/DESC จะเรียงแบบ ASC (น้อยไปมาก) โดยค่าเริ่มต้น',
      seeAlso: ['select', 'group-by']
    },
    {
      id: 'group-by',
      name: 'GROUP BY',
      description: 'จัดกลุ่มแถวที่มีค่าเหมือนกันและใช้ร่วมกับ Aggregate Functions',
      syntax: 'SELECT column, AGG_FUNC(col) FROM table GROUP BY column',
      examples: [
        {
          title: 'นับจำนวนพนักงานในแต่ละแผนก',
          language: 'sql',
          code: `SELECT department, COUNT(*) AS employee_count FROM employees GROUP BY department;`,
          output: `department   | employee_count\nEngineering  | 5\nHR           | 3\nMarketing    | 4`
        },
        {
          title: 'หาเงินเดือนเฉลี่ยแต่ละแผนก',
          language: 'sql',
          code: `SELECT department, AVG(salary) AS avg_salary, MAX(salary) AS max_salary FROM employees GROUP BY department;`
        },
        {
          title: 'ใช้ HAVING กรองหลัง GROUP BY',
          language: 'sql',
          code: `SELECT department, COUNT(*) AS cnt FROM employees GROUP BY department HAVING COUNT(*) > 3;`,
          output: `department   | cnt\nEngineering  | 5\nMarketing    | 4`
        }
      ],
      notes: '⚠️ ทุกคอลัมน์ใน SELECT ที่ไม่ใช่ Aggregate Function ต้องอยู่ใน GROUP BY | ใช้ HAVING แทน WHERE สำหรับกรองหลัง GROUP BY',
      seeAlso: ['select', 'having', 'aggregate-functions']
    },
    {
      id: 'having',
      name: 'HAVING',
      description: 'กรองผลลัพธ์หลังจาก GROUP BY (เหมือน WHERE แต่ใช้กับ Aggregate)',
      syntax: 'SELECT ... GROUP BY col HAVING condition',
      examples: [
        {
          title: 'แสดงแผนกที่มีเงินเดือนเฉลี่ยมากกว่า 60000',
          language: 'sql',
          code: `SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department HAVING AVG(salary) > 60000;`
        },
        {
          title: 'ความแตกต่างระหว่าง WHERE และ HAVING',
          language: 'sql',
          code: `-- WHERE: กรองก่อน GROUP BY (กรองแถว)\nSELECT department, COUNT(*) FROM employees WHERE salary > 50000 GROUP BY department;\n\n-- HAVING: กรองหลัง GROUP BY (กรองกลุ่ม)\nSELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 2;`
        }
      ],
      notes: 'WHERE กรองแถวก่อน GROUP BY | HAVING กรองกลุ่มหลัง GROUP BY | ใช้ทั้งสองร่วมกันได้',
      seeAlso: ['group-by', 'where']
    },
    {
      id: 'joins',
      name: 'JOIN',
      description: 'รวมข้อมูลจากหลายตารางโดยใช้คอลัมน์ที่เชื่อมกัน',
      syntax: 'SELECT ... FROM table1 [INNER|LEFT|RIGHT|FULL] JOIN table2 ON table1.col = table2.col',
      examples: [
        {
          title: 'INNER JOIN – ดึงเฉพาะแถวที่ตรงกันทั้งสองตาราง',
          language: 'sql',
          code: `SELECT e.name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id;`,
          output: `name    | department_name\nAlice   | Human Resources\nBob     | Engineering`
        },
        {
          title: 'LEFT JOIN – ดึงทุกแถวจากตารางซ้าย (แม้ไม่มีคู่ทางขวา)',
          language: 'sql',
          code: `SELECT e.name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id;`,
          output: `name    | department_name\nAlice   | Human Resources\nBob     | Engineering\nCarol   | NULL  -- ยังไม่ถูกกำหนดแผนก`
        },
        {
          title: 'RIGHT JOIN – ดึงทุกแถวจากตารางขวา',
          language: 'sql',
          code: `SELECT e.name, d.department_name FROM employees e RIGHT JOIN departments d ON e.department_id = d.id;`
        },
        {
          title: 'FULL OUTER JOIN – ดึงทุกแถวจากทั้งสองตาราง',
          language: 'sql',
          code: `SELECT e.name, d.department_name FROM employees e FULL OUTER JOIN departments d ON e.department_id = d.id;`
        },
        {
          title: 'JOIN หลายตาราง',
          language: 'sql',
          code: `SELECT e.name, d.department_name, p.project_name FROM employees e INNER JOIN departments d ON e.department_id = d.id INNER JOIN projects p ON e.id = p.employee_id;`
        }
      ],
      notes: '🔑 สัมภาษณ์นิยมถาม: INNER JOIN คืนเฉพาะแถวที่ match | LEFT JOIN คืนทุกแถวของ left table แม้ไม่มีคู่ทางขวา (NULL) | RIGHT JOIN คืนทุกแถวของ right table | FULL OUTER JOIN คืนทุกแถวจากทั้งสองฝั่ง',
      seeAlso: ['select', 'where', 'subquery']
    },
    {
      id: 'subquery',
      name: 'Subquery',
      description: 'คำสั่ง SELECT ซ้อนอยู่ภายในคำสั่งหลัก ใช้สำหรับการกรองและการคำนวณที่ซับซ้อน',
      syntax: 'SELECT ... WHERE col = (SELECT ... FROM ...)',
      examples: [
        {
          title: 'Subquery ใน WHERE – หาพนักงานที่เงินเดือนสูงกว่าค่าเฉลี่ย',
          language: 'sql',
          code: `SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`
        },
        {
          title: 'Subquery ใน FROM (Derived Table)',
          language: 'sql',
          code: `SELECT dept_summary.department, dept_summary.avg_sal FROM (SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department) AS dept_summary WHERE dept_summary.avg_sal > 60000;`
        },
        {
          title: 'Correlated Subquery – subquery อ้างอิงตารางภายนอก',
          language: 'sql',
          code: `SELECT e.name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department = e.department);`
        }
      ],
      notes: '⚠️ Correlated Subquery ทำงานช้าเพราะ execute ทุกแถว ควรใช้ JOIN หรือ CTE แทนถ้าเป็นไปได้',
      seeAlso: ['joins', 'cte']
    },
    {
      id: 'distinct',
      name: 'DISTINCT',
      description: 'ดึงข้อมูลโดยตัดค่าซ้ำออก',
      syntax: 'SELECT DISTINCT column FROM table',
      examples: [
        {
          title: 'ดึงรายชื่อแผนกที่ไม่ซ้ำ',
          language: 'sql',
          code: `SELECT DISTINCT department FROM employees;`,
          output: `department\nEngineering\nHR\nMarketing`
        },
        {
          title: 'ใช้ DISTINCT กับหลายคอลัมน์',
          language: 'sql',
          code: `SELECT DISTINCT department, job_title FROM employees;`
        }
      ],
      notes: 'DISTINCT ส่งผลต่อ performance เพราะต้องประมวลผลเพิ่ม ถ้าข้อมูลใหญ่ควรพิจารณา query ให้ดีก่อน',
      seeAlso: ['select', 'group-by']
    },
    {
      id: 'limit-offset',
      name: 'LIMIT / OFFSET',
      description: 'จำกัดจำนวนแถวที่ส่งกลับ และข้ามแถวแรก ๆ (ใช้สำหรับ Pagination)',
      syntax: 'SELECT ... LIMIT n OFFSET m',
      examples: [
        {
          title: 'ดึงแค่ 5 แถวแรก',
          language: 'sql',
          code: `SELECT * FROM employees ORDER BY id LIMIT 5;`
        },
        {
          title: 'Pagination – หน้าที่ 2 (10 records/หน้า)',
          language: 'sql',
          code: `-- หน้า 2: ข้าม 10 แถวแรก ดึง 10 ถัดไป\nSELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 10;`
        },
        {
          title: 'SQL Server/MS SQL ใช้ TOP แทน',
          language: 'sql',
          code: `-- SQL Server syntax\nSELECT TOP 5 * FROM employees ORDER BY id;`
        }
      ],
      notes: 'MySQL/PostgreSQL: LIMIT ... OFFSET ... | SQL Server: SELECT TOP n | Oracle: ROWNUM หรือ FETCH FIRST n ROWS ONLY',
      seeAlso: ['select', 'order-by']
    }
  ]
};
