import { Category } from '../types';

export const backupCategory: Category = {
  id: 'backup',
  name: 'Backup & Recovery',
  icon: '💾',
  description: 'การทำสำรองข้อมูล, การย้อนเวลา (Point-in-time) และตัวชี้วัดความฉิบหาย (RPO/RTO)',
  commands: [
    {
      id: 'logical-backup',
      name: 'Logical Backup (pg_dump / mysqldump)',
      description: 'การแบคอัปฐานข้อมูลออกมาเป็นไฟล์ข้อความ SQL (คำสั่ง CREATE TABLE, INSERT)',
      syntax: 'pg_dump / mysqldump',
      examples: [
        {
          title: 'คำสั่งดึงข้อมูลแบคอัป (Command Line)',
          language: 'bash',
          code: `# PostgreSQL: ดึงมาทั้งโครงสร้างและข้อมูลของฐานข้อมูล mydb
pg_dump -U username -d mydb > backup.sql

# MySQL: ดึงแบบเพิ่มคำสั่งลบตารางเก่า (เผื่อเอาไปเทใส่เครื่องใหม่)
mysqldump -u username -p mydb > backup.sql

# วิธีกู้คืน (เทไฟล์เข้า DB)
# Postgres: psql -U username -d mydb -f backup.sql
# MySQL: mysql -u username -p mydb < backup.sql`
        }
      ]
    },
    {
      id: 'pitr',
      name: 'Point-in-Time Recovery (PITR)',
      description: 'ระบบย้อนเวลาหาอดีต! ถ้าเผลอลบโต๊ะ (DROP TABLE) ตอนเที่ยงตรง เราสามารถย้อนกลับไปตอน 11:59:59 ได้',
      syntax: 'WAL / Binlog Archives',
      examples: [
        {
          title: 'แนวคิดการย้อนเวลา',
          language: 'text',
          code: `ในการทำ PITR เราไม่ได้ใช้แค่ไฟล์ Backup (เพราะ Backup อาจทำไว้วันละครั้งตอนเที่ยงคืน)

สมมติพังตอนเที่ยงวัน:
1. เอาระบบจากไฟล์ Backup เมื่อเที่ยงคืนเมื่อคืน มาเทใส่เซิร์ฟเวอร์
2. ระบบจะไปกวาดไฟล์จดบันทึกทุกแอคชัน (WAL ใน Postgres / Binlog ใน MySQL) ตั้งแต่เที่ยงคืนจนถึงเที่ยงวัน
3. มันจะ "กรอภาพซ้ำ (Replay)" คำสั่งทุกอย่างแบบเร็วปรู๊ดปร๊าด
4. เราสั่งให้ระบบ "หยุดกรอภาพ ณ วินาทีที่ 11:59:59 ก่อนโดนลบ"
5. ตู้ม! ได้ข้อมูลตอน 11:59 กลับคืนมาเป๊ะๆ`
        }
      ]
    },
    {
      id: 'rpo-rto',
      name: 'RPO vs RTO (คำศัพท์สาย DevOps/Data)',
      description: 'ตัวชี้วัดความเสียหายและระยะเวลากู้ชีพ (คำถามสัมภาษณ์ Architecture ประจำ)',
      syntax: 'RPO / RTO Metrics',
      examples: [
        {
          title: 'ความหมายที่แท้จริง',
          language: 'text',
          code: `1. RPO (Recovery Point Objective): "ยอมให้ข้อมูลหายย้อนหลังได้มากสุดกี่ชั่วโมง?"
- เช่น ถ้า RPO = 1 ชั่วโมง หมายความว่า เราต้องทำ Backup/Sync ตลอดเวลา ถ้าพังต้องเสียข้อมูลเก่าไปไม่เกิน 1 ชม.
- เกี่ยวข้องกับความถี่ในการแบคอัป

2. RTO (Recovery Time Objective): "หลังจากพัง ต้องเปิดให้บริการใหม่ให้ได้ภายในกี่ชั่วโมง?"
- เช่น ถ้า RTO = 15 นาที หมายความว่า ถ้า DB ล่ม ต้องสลับไปเครื่องสำรอง (Failover) และเปิดรับลูกค้าได้ใน 15 นาที
- เกี่ยวข้องกับความเร็วในการกู้คืนระบบ`
        }
      ]
    }
  ]
};
