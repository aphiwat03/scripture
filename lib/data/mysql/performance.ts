import { Category } from '../types';

export const performanceCategory: Category = {
  id: 'performance',
  name: 'Performance & Indexing',
  icon: '⚡',
  description: 'การปรับจูนประสิทธิภาพ, การอ่าน EXPLAIN, โครงสร้าง B-Tree และ Covering Indexes',
  commands: [
    {
      id: 'explain-format',
      name: 'EXPLAIN (อ่าน Execution Plan)',
      description: 'ตรวจสอบว่า MySQL ประมวลผลคิวรีของคุณด้วยวิธีไหน (เรียงลำดับจากดีสุดไปแย่สุด)',
      syntax: 'EXPLAIN SELECT ...',
      examples: [
        {
          title: 'วิธีการอ่านช่อง type ใน EXPLAIN',
          language: 'sql',
          code: `EXPLAIN SELECT * FROM users WHERE email = 'test@test.com';

/* 
ประเภทของ type เรียงจาก เร็วที่สุด -> ช้าที่สุด:
1. const / eq_ref: เร็วสุด! (ค้นหาผ่าน Primary Key หรือ Unique Index ได้ผลลัพธ์มาแถวเดียวเป๊ะๆ)
2. ref: หาผ่าน Index ธรรมดาที่ค่าอาจซ้ำได้
3. range: หาข้อมูลเป็นช่วง (เช่น WHERE age > 20) โดยใช้ Index
4. index: แย่! สแกน Index ทั้งหมดแบบเส้นตรง
5. ALL: แย่ที่สุด! (Full Table Scan) กวาดหาทั้งตารางแบบเส้นตรงบนดิสก์จริง
*/`
        }
      ]
    },
    {
      id: 'clustered-secondary-index',
      name: 'Clustered vs Secondary Index',
      description: 'โครงสร้างการเก็บข้อมูลของ InnoDB ที่ผู้สัมภาษณ์ชอบถาม!',
      syntax: 'B-Tree Internals',
      examples: [
        {
          title: 'โครงสร้าง Index ใน InnoDB',
          language: 'text',
          code: `1. Clustered Index (ดัชนีหลัก):
- ใน InnoDB "Primary Key คือ Clustered Index" เสมอ!
- ความหมายคือ ที่ใบ (Leaf Node) ของ B-Tree อันนี้ จะ "เก็บข้อมูลจริงทั้งแถวเอาไว้เลย"
- วิ่งหาผ่าน PK ทีเดียวจบ ได้ข้อมูลไปใช้งานเลย

2. Secondary Index (ดัชนีรอง):
- ดัชนีอื่นๆ ทั้งหมดที่คุณสร้างเพิ่ม (เช่น สร้างบนคอลัมน์ email)
- ที่ใบของ B-Tree อันนี้ จะไม่เก็บข้อมูลจริง! แต่จะเก็บ "ค่า Primary Key" เอาไว้
- เมื่อค้นหาผ่าน Email -> ได้ค่า PK มา -> ต้องเอา PK นั้นไปวิ่งหาใน Clustered Index อีกรอบ! (เรียกว่า "Bookmark Lookup" หรือ "Double Lookup")`
        }
      ]
    },
    {
      id: 'covering-indexes',
      name: 'Covering Indexes',
      description: 'ทริคขั้นเทพ: ทำยังไงให้ Secondary Index ทำงานโดยไม่ต้องไป Double Lookup ให้เสียเวลา',
      syntax: 'Index(col1, col2)',
      examples: [
        {
          title: 'ป้องกัน Double Lookup',
          language: 'sql',
          code: `-- สมมติเรามี Index บนคอลัมน์ (email)
CREATE INDEX idx_email ON users(email);

-- ❌ แบบนี้ต้องไป Double Lookup (เพราะเรา SELECT * ต้องการข้อมูลทุกคอลัมน์)
SELECT * FROM users WHERE email = 'test@test.com';

-- ✅ แบบนี้เรียกว่า Covering Index!
-- เรา SELECT แค่ email ซึ่งมีอยู่ใน Secondary Index อยู่แล้ว
-- MySQL เลยส่งผลลัพธ์กลับมาได้ทันที โดยไม่ต้องลงไปควานหาแถวข้อมูลจริง! (ประหยัดเวลามาก)
SELECT email FROM users WHERE email = 'test@test.com';`
        }
      ]
    },
    {
      id: 'group-concat',
      name: 'GROUP_CONCAT',
      description: 'ฟังก์ชันยอดฮิตของ MySQL สำหรับรวบข้อมูลที่อยู่คนละแถวให้กลายเป็นข้อความเดียว',
      syntax: 'GROUP_CONCAT(col SEPARATOR ",")',
      examples: [
        {
          title: 'รวบชื่อวิชาที่นักเรียนลงเรียนเข้าด้วยกัน',
          language: 'sql',
          code: `SELECT 
  student_name, 
  GROUP_CONCAT(course_name SEPARATOR ', ') as courses
FROM enrollments
GROUP BY student_name;

-- ผลลัพธ์:
-- student_name | courses
-- Alice        | Math, Physics, Chemistry
-- Bob          | History, Math`
        }
      ]
    }
  ]
};
