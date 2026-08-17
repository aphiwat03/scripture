import { Category } from '../types';

export const functionsCategory: Category = {
  id: 'functions',
  name: 'ฟังก์ชัน SQL',
  icon: '🔧',
  description: 'ฟังก์ชันสตริง, ตัวเลข, วันที่, และ Aggregate',
  commands: [
    {
      id: 'aggregate-functions',
      name: 'Aggregate Functions',
      description: 'ฟังก์ชันที่ประมวลผลหลายแถวและคืนค่าเดียว ใช้คู่กับ GROUP BY',
      syntax: 'SELECT AGG_FUNC(column) FROM table [GROUP BY col]',
      examples: [
        {
          title: 'Aggregate Functions พื้นฐาน',
          language: 'sql',
          code: `SELECT
  COUNT(*)          AS total_employees,    -- นับจำนวนแถวทั้งหมด
  COUNT(manager_id) AS has_manager,         -- นับเฉพาะแถวที่ไม่ใช่ NULL
  SUM(salary)       AS total_salary,        -- รวมค่าทั้งหมด
  AVG(salary)       AS average_salary,      -- ค่าเฉลี่ย
  MIN(salary)       AS lowest_salary,       -- ค่าต่ำสุด
  MAX(salary)       AS highest_salary       -- ค่าสูงสุด
FROM employees;`,
          output: `total_employees | has_manager | total_salary | average_salary | lowest_salary | highest_salary
12              | 10          | 864000       | 72000          | 52000         | 95000`
        },
        {
          title: 'GROUP_CONCAT / STRING_AGG – รวมข้อความ',
          language: 'sql',
          code: `-- MySQL
SELECT department, GROUP_CONCAT(name ORDER BY name SEPARATOR ', ') AS members FROM employees GROUP BY department;

-- PostgreSQL
SELECT department, STRING_AGG(name, ', ' ORDER BY name) AS members FROM employees GROUP BY department;`,
          output: `department   | members
Engineering  | Alice, Bob, Dave
HR           | Carol, Frank`
        }
      ],
      notes: 'COUNT(*) นับทุกแถวรวม NULL | COUNT(column) นับเฉพาะแถวที่ไม่ใช่ NULL | AVG และ SUM ไม่นับ NULL',
      seeAlso: ['group-by', 'having']
    },
    {
      id: 'string-functions',
      name: 'String Functions',
      description: 'ฟังก์ชันสำหรับจัดการและแปลงข้อมูลข้อความ',
      syntax: 'FUNCTION_NAME(string_expression)',
      examples: [
        {
          title: 'ฟังก์ชันข้อความพื้นฐาน',
          language: 'sql',
          code: `SELECT
  UPPER('hello world')       AS upper_result,   -- HELLO WORLD
  LOWER('HELLO WORLD')       AS lower_result,   -- hello world
  LENGTH('Hello')            AS length_result,  -- 5
  TRIM('  Hello  ')          AS trim_result,    -- 'Hello'
  LTRIM('  Hello')           AS ltrim_result,   -- 'Hello'
  RTRIM('Hello  ')           AS rtrim_result;   -- 'Hello'`
        },
        {
          title: 'SUBSTRING / SUBSTR – ตัดข้อความ',
          language: 'sql',
          code: `SELECT
  SUBSTRING('Hello World', 1, 5)  AS result1,  -- 'Hello'
  SUBSTRING('Hello World', 7)     AS result2,  -- 'World'
  RIGHT('Hello World', 5)         AS result3,  -- 'World'
  LEFT('Hello World', 5)          AS result4;  -- 'Hello'`
        },
        {
          title: 'REPLACE และ CONCAT',
          language: 'sql',
          code: `SELECT
  REPLACE('Hello World', 'World', 'SQL')  AS replaced,   -- 'Hello SQL'
  CONCAT(first_name, ' ', last_name)      AS full_name,   -- ต่อข้อความ
  CONCAT_WS(', ', city, country)          AS location    -- ต่อด้วย separator
FROM employees;`
        },
        {
          title: 'LIKE Pattern Matching',
          language: 'sql',
          code: `SELECT * FROM employees WHERE name LIKE 'A%';      -- ขึ้นต้นด้วย A
SELECT * FROM employees WHERE name LIKE '%son';    -- ลงท้ายด้วย son
SELECT * FROM employees WHERE name LIKE '%ali%';  -- มี ali ในชื่อ
SELECT * FROM employees WHERE name LIKE '_ob';    -- 3 ตัว ลงท้ายด้วย ob (Bob, Rob)`
        }
      ],
      notes: '% หมายถึง 0 หรือมากกว่า characters | _ หมายถึง 1 character | LIKE ช้ากว่าการ = เพราะไม่ใช้ Index (โดยเฉพาะ %ขึ้นต้น)',
      seeAlso: ['where']
    },
    {
      id: 'date-functions',
      name: 'Date/Time Functions',
      description: 'ฟังก์ชันสำหรับจัดการข้อมูลวันที่และเวลา',
      syntax: 'DATE_FUNCTION(date_expression)',
      examples: [
        {
          title: 'ดึงวันที่ปัจจุบัน',
          language: 'sql',
          code: `-- ดึงวันที่/เวลาปัจจุบัน
SELECT
  NOW()            AS current_datetime,  -- 2024-01-15 10:30:00
  CURDATE()        AS current_date,      -- 2024-01-15  (MySQL)
  CURRENT_DATE     AS current_date_ansi, -- 2024-01-15  (ANSI)
  CURRENT_TIMESTAMP AS current_ts;       -- 2024-01-15 10:30:00`
        },
        {
          title: 'แยกส่วนของวันที่',
          language: 'sql',
          code: `SELECT
  YEAR(created_at)    AS year,    -- 2024
  MONTH(created_at)   AS month,   -- 1
  DAY(created_at)     AS day,     -- 15
  HOUR(created_at)    AS hour,    -- 10
  WEEKDAY(created_at) AS weekday  -- 0=จันทร์, 6=อาทิตย์
FROM orders;`
        },
        {
          title: 'คำนวณวันที่',
          language: 'sql',
          code: `-- MySQL
SELECT
  DATE_ADD(NOW(), INTERVAL 7 DAY)   AS next_week,
  DATE_SUB(NOW(), INTERVAL 1 MONTH) AS last_month,
  DATEDIFF('2024-12-31', NOW())     AS days_until_year_end
FROM DUAL;

-- PostgreSQL
SELECT
  NOW() + INTERVAL '7 days'    AS next_week,
  NOW() - INTERVAL '1 month'   AS last_month,
  '2024-12-31'::date - NOW()::date AS days_until_year_end;`
        },
        {
          title: 'กรองตามช่วงวันที่',
          language: 'sql',
          code: `-- หาคำสั่งซื้อในเดือนนี้
SELECT * FROM orders WHERE YEAR(order_date) = YEAR(NOW()) AND MONTH(order_date) = MONTH(NOW());

-- หาคำสั่งซื้อใน 30 วันที่ผ่านมา
SELECT * FROM orders WHERE order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY);`
        }
      ],
      notes: 'MySQL: NOW(), CURDATE(), DATE_ADD() | PostgreSQL: NOW(), CURRENT_DATE, interval syntax | SQL Server: GETDATE(), DATEADD(), DATEDIFF()',
      seeAlso: ['where', 'group-by']
    },
    {
      id: 'window-functions',
      name: 'Window Functions',
      description: 'ฟังก์ชันที่คำนวณข้ามแถวหลาย ๆ แถวโดยไม่ต้อง GROUP BY – ข้อมูลสำคัญสำหรับการสัมภาษณ์!',
      syntax: 'FUNC() OVER ([PARTITION BY col] [ORDER BY col])',
      examples: [
        {
          title: 'ROW_NUMBER – กำหนดลำดับให้แต่ละแถว',
          language: 'sql',
          code: `SELECT name, department, salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept
FROM employees;`,
          output: `name   | department  | salary | rank_in_dept
Bob    | Engineering | 90000  | 1
Dave   | Engineering | 80000  | 2
Alice  | HR          | 65000  | 1
Carol  | HR          | 55000  | 2`
        },
        {
          title: 'RANK vs DENSE_RANK',
          language: 'sql',
          code: `SELECT name, salary,
  RANK()       OVER (ORDER BY salary DESC) AS rank_with_gaps,    -- 1,2,2,4 (ข้าม 3)
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank         -- 1,2,2,3 (ไม่ข้าม)
FROM employees;`
        },
        {
          title: 'LAG / LEAD – ดูค่าแถวก่อน/หลัง',
          language: 'sql',
          code: `SELECT order_date, total,
  LAG(total, 1)  OVER (ORDER BY order_date) AS prev_day_total,   -- ยอดวันก่อน
  LEAD(total, 1) OVER (ORDER BY order_date) AS next_day_total,   -- ยอดวันถัดไป
  total - LAG(total, 1) OVER (ORDER BY order_date) AS daily_change
FROM daily_sales;`
        },
        {
          title: 'Running Total (SUM OVER)',
          language: 'sql',
          code: `SELECT order_date, amount,
  SUM(amount) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM orders;`
        }
      ],
      notes: '🔑 สัมภาษณ์นิยมถาม Window Functions มาก! | ROW_NUMBER() ไม่มีการซ้ำ | RANK() มีการซ้ำและข้ามเลข | DENSE_RANK() มีการซ้ำแต่ไม่ข้ามเลข | PARTITION BY เหมือน GROUP BY แต่ไม่ยุบแถว',
      seeAlso: ['aggregate-functions', 'group-by']
    },
    {
      id: 'case-when',
      name: 'CASE WHEN',
      description: 'นิพจน์เงื่อนไขใน SQL เหมือน if-else สามารถใช้ใน SELECT, WHERE, ORDER BY',
      syntax: 'CASE WHEN condition THEN result ... ELSE result END',
      examples: [
        {
          title: 'CASE WHEN พื้นฐาน',
          language: 'sql',
          code: `SELECT name, salary,
  CASE
    WHEN salary >= 80000 THEN 'สูง'
    WHEN salary >= 60000 THEN 'ปานกลาง'
    ELSE 'ต่ำ'
  END AS salary_level
FROM employees;`,
          output: `name  | salary | salary_level
Bob   | 90000  | สูง
Alice | 65000  | ปานกลาง
Carol | 52000  | ต่ำ`
        },
        {
          title: 'Simple CASE (เปรียบเทียบค่าเท่ากัน)',
          language: 'sql',
          code: `SELECT name,
  CASE department
    WHEN 'Engineering' THEN 'วิศวกร'
    WHEN 'HR'          THEN 'ทรัพยากรบุคคล'
    WHEN 'Marketing'   THEN 'การตลาด'
    ELSE 'อื่น ๆ'
  END AS department_th
FROM employees;`
        },
        {
          title: 'CASE WHEN ใน Aggregate (Conditional Count)',
          language: 'sql',
          code: `SELECT department,
  COUNT(*) AS total,
  SUM(CASE WHEN salary >= 70000 THEN 1 ELSE 0 END) AS high_salary_count,
  AVG(CASE WHEN gender = 'F' THEN salary END)      AS avg_female_salary
FROM employees
GROUP BY department;`
        }
      ],
      notes: 'CASE WHEN มีประโยชน์มากสำหรับ Pivot Table, Conditional Aggregation และการแปลงค่าแบบ inline',
      seeAlso: ['select', 'group-by', 'aggregate-functions']
    }
  ]
};
