import { Category } from '../types';

export const advancedQueriesCategory: Category = {
  id: 'advanced-queries',
  name: 'Advanced Queries',
  icon: '🔍',
  description: 'คิวรีระดับพระกาฬ (Window Functions, CTEs, Full-Text Search, LATERAL Joins)',
  commands: [
    {
      id: 'window-functions',
      name: 'Window Functions (OVER, PARTITION BY)',
      description: 'ฟังก์ชันที่ทำงานข้ามหลายแถว (Rows) แต่ยังคงโชว์ข้อมูลทุกแถวไว้ (ไม่โดนรวบเป็นแถวเดียวเหมือน GROUP BY)',
      syntax: 'FUNC() OVER (PARTITION BY ... ORDER BY ...)',
      examples: [
        {
          title: 'หารายได้รวมรายแผนก พร้อมจัดอันดับพนักงานเงินเดือนสูงสุด',
          language: 'sql',
          code: `SELECT 
  name, 
  department, 
  salary,
  -- 1. ผลรวมเงินเดือน "ในแต่ละแผนก" (ข้อมูลไม่โดน GROUP BY ยุบ)
  SUM(salary) OVER (PARTITION BY department) AS dept_total_salary,
  
  -- 2. จัดอันดับเงินเดือนพนักงาน "ในแต่ละแผนก" (1 คือมากสุด)
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept,
  
  -- 3. จัดอันดับแบบไม่ข้ามเลข (DENSE_RANK: 1, 2, 2, 3) 
  -- เทียบกับ RANK (1, 2, 2, 4)
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank_in_dept
FROM employees;`
        }
      ]
    },
    {
      id: 'cte-recursive',
      name: 'CTEs & Recursive (WITH)',
      description: 'สร้างตารางชั่วคราว (Common Table Expression) และดึงข้อมูลแบบลำดับชั้น (Hierarchical Data เช่น โครงสร้างองค์กร)',
      syntax: 'WITH RECURSIVE ...',
      examples: [
        {
          title: 'ดึงโครงสร้างพนักงานและหัวหน้าตามลำดับชั้น',
          language: 'sql',
          code: `-- ตาราง: id, name, manager_id
WITH RECURSIVE org_chart AS (
  -- Base case (หาระดับบนสุด CEO ที่ไม่มี manager_id)
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive step (หาลูกน้องของคนในรอบที่แล้ว)
  SELECT e.id, e.name, e.manager_id, o.level + 1
  FROM employees e
  INNER JOIN org_chart o ON e.manager_id = o.id
)
SELECT * FROM org_chart ORDER BY level, manager_id;`
        }
      ]
    },
    {
      id: 'full-text-search',
      name: 'Full-Text Search (tsvector, tsquery)',
      description: 'การค้นหาข้อความแบบฉลาด (รองรับ Stemming, การตัดคำ) ทำงานคล้าย Google Search โดยไม่ต้องพึ่ง Elasticsearch',
      syntax: 'to_tsvector() @@ to_tsquery()',
      examples: [
        {
          title: 'ค้นหาข้อความด้วย FTS',
          language: 'sql',
          code: `-- สมมติมีคำว่า "jumped"
-- to_tsvector จะแปลงข้อความเป็น root word (เช่น jumped -> jump)
-- to_tsquery คือคำค้นหา

SELECT title, content 
FROM articles
-- ค้นหาคำว่า "jump" ในคอลัมน์ content (@@ คือ operator match)
WHERE to_tsvector('english', content) @@ to_tsquery('english', 'jump & dog');

-- ถ้าอยากให้ค้นหาเร็วขึ้น ต้องสร้าง GIN Index
-- CREATE INDEX idx_fts ON articles USING GIN (to_tsvector('english', content));`
        }
      ]
    },
    {
      id: 'lateral-joins',
      name: 'LATERAL Joins',
      description: 'เหมือน For-each loop ใน SQL ช่วยให้ Join ตารางขวา โดยเอาค่าจากตารางซ้ายไปคำนวณแบบแถวต่อแถว',
      syntax: 'JOIN LATERAL',
      examples: [
        {
          title: 'หา "โพสต์ล่าสุด 3 อันดับแรก" ของ User "แต่ละคน"',
          language: 'sql',
          code: `-- โจทก์สัมภาษณ์ยอดฮิต: ถ้าใช้ JOIN ธรรมดา หา 3 โพสต์แรกของแต่ละคนจะยากมาก
SELECT u.name, p.title, p.created_at
FROM users u
LEFT JOIN LATERAL (
  -- สังเกตว่าเราเอา u.id (จากตารางนอก) เข้ามาใช้ข้างใน Subquery ได้เลย!
  SELECT title, created_at
  FROM posts
  WHERE author_id = u.id
  ORDER BY created_at DESC
  LIMIT 3
) p ON true;`
        }
      ]
    }
  ]
};
