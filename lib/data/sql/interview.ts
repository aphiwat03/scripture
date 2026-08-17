import { Category } from '../types';

export const interviewCategory: Category = {
  id: 'interview',
  name: 'สัมภาษณ์ & Best Practices',
  icon: '🎯',
  description: 'แนวข้อสอบสัมภาษณ์ SQL และแนวทางปฏิบัติที่ดี',
  commands: [
    {
      id: 'transactions',
      name: 'Transactions & ACID',
      description: 'กลุ่มคำสั่ง SQL ที่ต้องสำเร็จหรือล้มเหลวพร้อมกันทั้งหมด (All-or-Nothing)',
      syntax: 'BEGIN; ... COMMIT; / ROLLBACK;',
      examples: [
        {
          title: 'Transaction พื้นฐาน – โอนเงิน',
          language: 'sql',
          code: `BEGIN; -- หรือ START TRANSACTION; (MySQL)\n\n-- ขั้นตอนที่ 1: หักเงินจากบัญชีต้นทาง\nUPDATE accounts SET balance = balance - 1000 WHERE id = 1;\n\n-- ขั้นตอนที่ 2: เพิ่มเงินในบัญชีปลายทาง\nUPDATE accounts SET balance = balance + 1000 WHERE id = 2;\n\n-- ถ้าทุกขั้นตอนสำเร็จ\nCOMMIT;\n\n-- ถ้ามี Error ต้องยกเลิกทั้งหมด\n-- ROLLBACK;`
        },
        {
          title: 'SAVEPOINT – Partial Rollback',
          language: 'sql',
          code: `BEGIN;\nINSERT INTO orders VALUES (101, 1, '2024-01-15');\nSAVEPOINT after_insert;\n\nUPDATE inventory SET stock = stock - 1 WHERE product_id = 5;\n\n-- ถ้า stock ไม่พอ ย้อนกลับไปหลัง INSERT แต่ไม่ยกเลิก order\nROLLBACK TO SAVEPOINT after_insert;\nCOMMIT;`
        },
        {
          title: 'ACID Properties',
          language: 'sql',
          code: `-- A = Atomicity: ทำสำเร็จทั้งหมดหรือไม่ทำเลย\n-- C = Consistency: ข้อมูลต้องสอดคล้องกับ rules/constraints เสมอ\n-- I = Isolation: Transaction ไม่กระทบกัน\n-- D = Durability: เมื่อ COMMIT แล้ว ข้อมูลจะคงอยู่แม้ระบบพัง\n\n-- ตัวอย่าง: ถ้าโอนเงินแล้วไฟดับระหว่างขั้นตอน\n-- Atomicity: ยกเลิกทั้งหมด ไม่ใช่หักเงินไปแล้วไม่ได้รับ\n-- Durability: ถ้า COMMIT ก่อนไฟดับ ข้อมูลยังอยู่`
        }
      ],
      notes: '🔑 ACID เป็นคำถามสัมภาษณ์ยอดนิยม! | Isolation มีหลาย Level: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE | ส่วนใหญ่ใช้ READ COMMITTED เป็นค่า default',
      seeAlso: ['normalization', 'isolation-levels']
    },
    {
      id: 'normalization',
      name: 'Normalization (1NF/2NF/3NF)',
      description: 'กระบวนการออกแบบโครงสร้างฐานข้อมูลเพื่อลดความซ้ำซ้อนและรักษาความถูกต้องของข้อมูล',
      syntax: '-- Database Design',
      examples: [
        {
          title: '1NF – First Normal Form (ค่าในแต่ละ cell ต้องเป็น atomic)',
          language: 'sql',
          code: `-- ❌ ละเมิด 1NF: เก็บหลายค่าในช่องเดียว\nCREATE TABLE orders_bad (\n  order_id INT,\n  products VARCHAR(200) -- 'Laptop,Mouse,Keyboard' ไม่ดี!\n);\n\n-- ✅ ถูกต้องตาม 1NF: แยกเป็นหลาย row\nCREATE TABLE order_items (\n  order_id   INT,\n  product_id INT,\n  quantity   INT,\n  PRIMARY KEY (order_id, product_id)\n);`
        },
        {
          title: '2NF – Second Normal Form (ต้องเป็น 1NF + ไม่มี Partial Dependency)',
          language: 'sql',
          code: `-- ❌ ละเมิด 2NF: product_name ขึ้นอยู่กับแค่ product_id ไม่ใช่ทั้ง PK\nCREATE TABLE order_items_bad (\n  order_id     INT,\n  product_id   INT,\n  product_name VARCHAR(100), -- Partial dependency!\n  quantity     INT,\n  PRIMARY KEY (order_id, product_id)\n);\n\n-- ✅ ถูกต้องตาม 2NF: แยก product_name ไปตารางของตัวเอง\nCREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(100));\nCREATE TABLE order_items (order_id INT, product_id INT, quantity INT, PRIMARY KEY(order_id, product_id));`
        },
        {
          title: '3NF – Third Normal Form (ต้องเป็น 2NF + ไม่มี Transitive Dependency)',
          language: 'sql',
          code: `-- ❌ ละเมิด 3NF: zip_code → city → state (Transitive Dependency)\nCREATE TABLE customers_bad (\n  id       INT PRIMARY KEY,\n  name     VARCHAR(100),\n  zip_code VARCHAR(10),\n  city     VARCHAR(50),  -- ขึ้นอยู่กับ zip_code ไม่ใช่ id\n  state    VARCHAR(50)   -- ขึ้นอยู่กับ zip_code ไม่ใช่ id\n);\n\n-- ✅ ถูกต้องตาม 3NF: แยก zip_code ออก\nCREATE TABLE zip_codes (zip_code VARCHAR(10) PRIMARY KEY, city VARCHAR(50), state VARCHAR(50));\nCREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(100), zip_code VARCHAR(10) REFERENCES zip_codes(zip_code));`
        }
      ],
      notes: '🔑 สัมภาษณ์: รู้จัก 1NF, 2NF, 3NF และอธิบายตัวอย่างได้ | Denormalization ใช้เพื่อเพิ่ม Performance (ยอมให้มี redundancy บ้าง) ในระบบที่อ่านบ่อยมาก',
      seeAlso: ['transactions', 'isolation-levels']
    },
    {
      id: 'isolation-levels',
      name: 'Isolation Levels',
      description: 'ระดับการแยกแต่ละ Transaction เพื่อป้องกันปัญหาเมื่อมีการทำงานพร้อมกัน',
      syntax: 'SET TRANSACTION ISOLATION LEVEL ...',
      examples: [
        {
          title: 'ปัญหา Concurrency 3 ประเภท',
          language: 'sql',
          code: `-- 1. Dirty Read: อ่านข้อมูลที่ยัง COMMIT ไม่ได้\n--    T1 กำลัง UPDATE salary=90000 แต่ยัง ROLLBACK ยัง T2 อ่านเห็น 90000 ก่อน\n\n-- 2. Non-Repeatable Read: อ่าน 2 ครั้งได้ค่าต่างกัน\n--    T1 อ่าน salary = 80000, T2 UPDATE salary = 90000 + COMMIT, T1 อ่านอีกครั้งเห็น 90000\n\n-- 3. Phantom Read: อ่าน 2 ครั้งได้จำนวนแถวต่างกัน\n--    T1 COUNT(*) = 10, T2 INSERT แถวใหม่ + COMMIT, T1 COUNT(*) = 11`
        },
        {
          title: '4 Isolation Levels',
          language: 'sql',
          code: `-- READ UNCOMMITTED (ต่ำสุด): เห็น Dirty Read ได้\nSET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;\n\n-- READ COMMITTED (Default ใน PostgreSQL): ป้องกัน Dirty Read\nSET TRANSACTION ISOLATION LEVEL READ COMMITTED;\n\n-- REPEATABLE READ (Default ใน MySQL InnoDB): ป้องกัน Non-Repeatable Read\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n\n-- SERIALIZABLE (สูงสุด): ป้องกันทุกปัญหา แต่ช้าที่สุด\nSET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`,
          output: `Level              | Dirty Read | Non-Repeatable | Phantom\nREAD UNCOMMITTED   | YES        | YES            | YES\nREAD COMMITTED     | NO         | YES            | YES\nREPEATABLE READ    | NO         | NO             | YES (บางส่วน)\nSERIALIZABLE       | NO         | NO             | NO`
        }
      ],
      notes: '🔑 สัมภาษณ์ระดับ Senior มักถามเรื่อง Isolation Level | Default: MySQL = REPEATABLE READ, PostgreSQL = READ COMMITTED | ยิ่ง Level สูง ยิ่งปลอดภัยแต่ยิ่งช้า',
      seeAlso: ['transactions', 'normalization']
    },
    {
      id: 'interview-questions',
      name: 'คำถามสัมภาษณ์ยอดนิยม',
      description: 'รวมคำถาม SQL ที่ถูกถามบ่อยในการสัมภาษณ์งาน พร้อมคำตอบและโค้ดตัวอย่าง',
      syntax: '-- Common Interview Questions',
      examples: [
        {
          title: 'Q: หาพนักงานที่เงินเดือนสูงสุดอันดับ 2',
          language: 'sql',
          code: `-- วิธีที่ 1: Subquery\nSELECT MAX(salary) AS second_highest\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);\n\n-- วิธีที่ 2: DENSE_RANK Window Function (แนะนำ)\nSELECT name, salary\nFROM (\n  SELECT name, salary,\n    DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n  FROM employees\n) ranked\nWHERE rnk = 2;`
        },
        {
          title: 'Q: หาพนักงานที่มีเงินเดือนสูงสุดในแต่ละแผนก',
          language: 'sql',
          code: `SELECT department, name, salary\nFROM (\n  SELECT department, name, salary,\n    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk\n  FROM employees\n) ranked\nWHERE rnk = 1;`
        },
        {
          title: 'Q: หา Duplicate records',
          language: 'sql',
          code: `-- หา email ที่ซ้ำกัน\nSELECT email, COUNT(*) AS cnt\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- หาทุกแถวที่ซ้ำ (เก็บแถวแรกไว้)\nSELECT * FROM users\nWHERE id NOT IN (\n  SELECT MIN(id) FROM users GROUP BY email\n);`
        },
        {
          title: 'Q: DELETE Duplicate records (เก็บแถวที่ id เล็กสุด)',
          language: 'sql',
          code: `-- MySQL\nDELETE FROM users\nWHERE id NOT IN (\n  SELECT min_id FROM (\n    SELECT MIN(id) AS min_id FROM users GROUP BY email\n  ) tmp\n);\n\n-- PostgreSQL\nDELETE FROM users\nWHERE id NOT IN (\n  SELECT MIN(id) FROM users GROUP BY email\n);`
        },
        {
          title: 'Q: ความแตกต่างระหว่าง WHERE และ HAVING',
          language: 'sql',
          code: `-- WHERE: กรองแถวก่อน GROUP BY (ทำงานกับแถว)\nSELECT department, COUNT(*) FROM employees\nWHERE salary > 50000  -- กรองแถวก่อน\nGROUP BY department;\n\n-- HAVING: กรองกลุ่มหลัง GROUP BY (ทำงานกับ Aggregate)\nSELECT department, AVG(salary) FROM employees\nGROUP BY department\nHAVING AVG(salary) > 60000;  -- กรองกลุ่มหลัง`
        }
      ],
      notes: '🎯 คำถามยอดนิยมอื่น: ความแตกต่างของ JOIN types | อธิบาย ACID | Index คืออะไร ทำงานยังไง | Stored Procedure vs Function | Clustered vs Non-Clustered Index',
      seeAlso: ['joins', 'window-functions', 'transactions']
    }
  ]
};
