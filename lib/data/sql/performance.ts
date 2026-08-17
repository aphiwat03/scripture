import { Category } from '../types';

export const performanceCategory: Category = {
  id: 'performance',
  name: 'Performance & Optimization',
  icon: '⚡',
  description: 'เทคนิคปรับ Performance, EXPLAIN, และ Index',
  commands: [
    {
      id: 'explain-query',
      name: 'EXPLAIN / ANALYZE',
      description: 'ตรวจสอบแผนการ Execute ของ Query เพื่อหาจุดที่ช้าและปรับปรุงประสิทธิภาพ',
      syntax: 'EXPLAIN [ANALYZE] SELECT ...',
      examples: [
        {
          title: 'EXPLAIN พื้นฐาน',
          language: 'sql',
          code: `EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';`,
          output: `+----+-------------+-----------+------+---------------+----------+\n| id | select_type | table     | type | possible_keys  | key      |\n+----+-------------+-----------+------+---------------+----------+\n|  1 | SIMPLE      | employees | ALL  | NULL           | NULL     |\n+----+-------------+-----------+------+---------------+----------+\n-- type=ALL หมายถึง Full Table Scan (ช้า!) ควรเพิ่ม Index`
        },
        {
          title: 'EXPLAIN หลังเพิ่ม Index (ดีขึ้น)',
          language: 'sql',
          code: `CREATE INDEX idx_dept ON employees(department);\n\nEXPLAIN SELECT * FROM employees WHERE department = 'Engineering';`,
          output: `type=ref (ใช้ Index แล้ว – เร็วขึ้น!)`
        },
        {
          title: 'EXPLAIN ANALYZE (PostgreSQL) – ดู actual runtime',
          language: 'sql',
          code: `EXPLAIN ANALYZE SELECT e.name, d.department_name FROM employees e JOIN departments d ON e.department_id = d.id WHERE e.salary > 70000;`
        }
      ],
      notes: 'Key อ่านใน EXPLAIN: type (ALL=แย่, ref/eq_ref=ดี, const=ดีที่สุด) | rows = จำนวนแถวที่ต้องอ่านโดยประมาณ | key = Index ที่ถูกเลือกใช้',
      seeAlso: ['index', 'cte']
    },
    {
      id: 'index-strategy',
      name: 'Index Strategy',
      description: 'กลยุทธ์การออกแบบ Index เพื่อเพิ่มความเร็ว Query ให้สูงสุด',
      syntax: 'CREATE INDEX idx_name ON table (col1, col2)',
      examples: [
        {
          title: 'Selectivity – Index มีประโยชน์เมื่อ Cardinality สูง',
          language: 'sql',
          code: `-- ✅ ดี: email มีค่าไม่ซ้ำกัน (Cardinality สูง)\nCREATE INDEX idx_email ON users(email);\n\n-- ❌ ไม่มีประโยชน์: is_active มีแค่ 2 ค่า (Cardinality ต่ำ)\nCREATE INDEX idx_is_active ON users(is_active);`
        },
        {
          title: 'Composite Index – ลำดับสำคัญมาก',
          language: 'sql',
          code: `-- Query: WHERE department = 'Eng' AND salary > 60000\n-- ✅ Composite Index ที่ถูกต้อง (column ที่ filter ก่อนอยู่ซ้าย)\nCREATE INDEX idx_dept_salary ON employees(department, salary);\n\n-- ✅ Query นี้ใช้ Index ได้\nSELECT * FROM employees WHERE department = 'Eng' AND salary > 60000;\n-- ✅ Query นี้ใช้ Index ได้บางส่วน (Leftmost Prefix Rule)\nSELECT * FROM employees WHERE department = 'Eng';\n-- ❌ Query นี้ใช้ Index ไม่ได้\nSELECT * FROM employees WHERE salary > 60000;`
        },
        {
          title: 'Covering Index – Index ครอบคลุมทุก column ที่ต้องการ',
          language: 'sql',
          code: `-- Query ต้องการ name, salary ของ department = 'Eng'\n-- Covering Index ทำให้ไม่ต้องเข้าถึงตารางหลัก\nCREATE INDEX idx_covering ON employees(department, name, salary);\nSELECT name, salary FROM employees WHERE department = 'Engineering'; -- Super fast!`
        },
        {
          title: 'สิ่งที่ทำให้ Index ไม่ทำงาน',
          language: 'sql',
          code: `-- ❌ ใช้ Function บน column ที่มี Index\nSELECT * FROM employees WHERE UPPER(name) = 'ALICE';  -- Index ถูก bypass!\n\n-- ✅ ควรเขียนแบบนี้แทน\nSELECT * FROM employees WHERE name = 'Alice';\n\n-- ❌ ใช้ LIKE ที่ขึ้นต้นด้วย % (Full scan)\nSELECT * FROM employees WHERE name LIKE '%Alice%'; -- Index ถูก bypass!\n\n-- ✅ LIKE ที่ลงท้ายด้วย % ยังใช้ Index ได้\nSELECT * FROM employees WHERE name LIKE 'Ali%';`
        }
      ],
      notes: 'หลัก: Index มีประโยชน์เมื่อ Cardinality สูง, Query ใช้ WHERE/JOIN ON/ORDER BY บน indexed column | ลำดับใน Composite Index ต้องตรงกับ Leftmost Prefix ที่ Query ใช้',
      seeAlso: ['explain-query', 'index']
    },
    {
      id: 'cte',
      name: 'CTE (Common Table Expression)',
      description: 'ตั้งชื่อให้ผลลัพธ์ชั่วคราวเพื่อใช้ใน Query เดียวกัน ทำให้โค้ดอ่านง่ายขึ้นมาก',
      syntax: 'WITH cte_name AS (SELECT ...) SELECT ... FROM cte_name',
      examples: [
        {
          title: 'CTE พื้นฐาน (แทน Subquery)',
          language: 'sql',
          code: `-- แบบ Subquery (อ่านยาก)\nSELECT name FROM (SELECT name, AVG(salary) OVER () AS avg_sal, salary FROM employees) t WHERE t.salary > t.avg_sal;\n\n-- แบบ CTE (อ่านง่ายกว่า)\nWITH avg_salary AS (\n  SELECT AVG(salary) AS avg_sal FROM employees\n)\nSELECT e.name, e.salary\nFROM employees e, avg_salary\nWHERE e.salary > avg_salary.avg_sal;`
        },
        {
          title: 'หลาย CTE ต่อกัน',
          language: 'sql',
          code: `WITH\n  dept_avg AS (\n    SELECT department, AVG(salary) AS avg_salary\n    FROM employees\n    GROUP BY department\n  ),\n  high_earners AS (\n    SELECT e.name, e.department, e.salary, d.avg_salary\n    FROM employees e\n    JOIN dept_avg d ON e.department = d.department\n    WHERE e.salary > d.avg_salary * 1.2\n  )\nSELECT * FROM high_earners ORDER BY salary DESC;`
        },
        {
          title: 'Recursive CTE – สร้างข้อมูลลำดับชั้น',
          language: 'sql',
          code: `-- หาสายบังคับบัญชา (Hierarchy) จากพนักงานไปถึง CEO\nWITH RECURSIVE org_chart AS (\n  -- Base case: หาระดับสูงสุด (ไม่มีหัวหน้า)\n  SELECT id, name, manager_id, 1 AS level\n  FROM employees WHERE manager_id IS NULL\n\n  UNION ALL\n\n  -- Recursive case: หาลูกน้อง\n  SELECT e.id, e.name, e.manager_id, oc.level + 1\n  FROM employees e\n  INNER JOIN org_chart oc ON e.manager_id = oc.id\n)\nSELECT level, name FROM org_chart ORDER BY level, name;`
        }
      ],
      notes: 'CTE ดีกว่า Subquery ตรงที่: อ่านง่ายกว่า, สามารถอ้างอิงซ้ำได้, รองรับ Recursive | CTE เป็นแค่ syntactic sugar ไม่ได้ cache ผลลัพธ์ (ยกเว้น Materialized CTE ใน PostgreSQL)',
      seeAlso: ['subquery', 'explain-query']
    },
    {
      id: 'query-tips',
      name: 'Query Optimization Tips',
      description: 'เทคนิครวมสำหรับเขียน SQL ที่มีประสิทธิภาพสูง',
      syntax: '-- Best practices',
      examples: [
        {
          title: 'ข้อควรทำและหลีกเลี่ยงใน Query',
          language: 'sql',
          code: `-- ❌ หลีกเลี่ยง SELECT *\nSELECT * FROM orders;\n\n-- ✅ ระบุ column ที่ต้องการ\nSELECT id, customer_id, total FROM orders;\n\n-- ❌ หลีกเลี่ยง Function บน Indexed column ใน WHERE\nSELECT * FROM orders WHERE YEAR(order_date) = 2024;\n\n-- ✅ ใช้ BETWEEN แทน\nSELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';\n\n-- ❌ หลีกเลี่ยง DISTINCT โดยไม่จำเป็น (ทำให้ช้า)\nSELECT DISTINCT customer_id FROM orders;\n\n-- ✅ ถ้าแค่ต้องการรู้ว่ามีอยู่ ใช้ EXISTS แทน\nSELECT id FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);`
        },
        {
          title: 'Pagination ที่มีประสิทธิภาพ (Keyset Pagination)',
          language: 'sql',
          code: `-- ❌ OFFSET Pagination: ช้ามากเมื่อ OFFSET ใหญ่ (ต้องอ่านทุกแถวก่อน)\nSELECT * FROM posts ORDER BY id DESC LIMIT 20 OFFSET 10000;\n\n-- ✅ Keyset Pagination: เร็วกว่ามาก (ใช้ INDEX)\nSELECT * FROM posts WHERE id < :last_seen_id ORDER BY id DESC LIMIT 20;`
        }
      ],
      notes: 'หลักการ: ดึงข้อมูลน้อยที่สุดเท่าที่จำเป็น | ใช้ Index อย่างถูกต้อง | ตรวจสอบด้วย EXPLAIN เสมอก่อน Deploy',
      seeAlso: ['explain-query', 'index-strategy']
    }
  ]
};
