import { Category } from '../types';

export const extensionsCategory: Category = {
  id: 'extensions',
  name: 'Extensions (ปลั๊กอิน)',
  icon: '🔌',
  description: 'การเปิดใช้งาน Extension เพิ่มความสามารถให้ PostgreSQL ระดับเทพ',
  commands: [
    {
      id: 'pgcrypto',
      name: 'pgcrypto (เข้ารหัส)',
      description: 'การเข้ารหัสข้อความ หรือแฮชรหัสผ่านภายใน Database เลยโดยไม่ต้องพึ่งแอปพลิเคชัน',
      syntax: 'CREATE EXTENSION pgcrypto',
      examples: [
        {
          title: 'การเข้ารหัสและตรวจสอบรหัสผ่าน (Bcrypt)',
          language: 'sql',
          code: `CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ตอน Insert (เข้ารหัสพาสเวิร์ด)
INSERT INTO users (username, password) 
VALUES ('admin', crypt('mysecretpass', gen_salt('bf')));

-- ตอนเช็ค Login (เปรียบเทียบ)
SELECT id FROM users 
WHERE username = 'admin' 
  AND password = crypt('mysecretpass', password);`
        }
      ]
    },
    {
      id: 'postgis',
      name: 'PostGIS (พิกัดแผนที่)',
      description: 'Extension ระดับโลกสำหรับการคำนวณข้อมูลทางภูมิศาสตร์เชิงพื้นที่ (Spatial Data)',
      syntax: 'CREATE EXTENSION postgis',
      examples: [
        {
          title: 'ค้นหาร้านอาหารที่อยู่ใกล้ฉันในรัศมี 5km',
          language: 'sql',
          code: `CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. เพิ่มคอลัมน์เก็บพิกัด (Geometry)
ALTER TABLE restaurants ADD COLUMN location GEOMETRY(Point, 4326);

-- 2. ค้นหาร้านที่ห่างจากตำแหน่งของฉัน (พิกัด 100.5, 13.7) ไม่เกิน 5000 เมตร
-- ST_DWithin (Distance Within)
SELECT name 
FROM restaurants
WHERE ST_DWithin(
  location, 
  ST_SetSRID(ST_MakePoint(100.5, 13.7), 4326), 
  5000
);`
        }
      ]
    },
    {
      id: 'pg_stat_statements',
      name: 'pg_stat_statements (คุม Performance)',
      description: 'ระบบสอดแนม Query ทั้งหมดในระบบ หาคนตัวการที่ทำให้ DB ช้า',
      syntax: 'CREATE EXTENSION pg_stat_statements',
      examples: [
        {
          title: 'หา Top 5 Query ที่ใช้เวลาทำงานรวมนานที่สุด',
          language: 'sql',
          code: `CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

SELECT query, 
       calls, 
       total_exec_time, 
       min_exec_time, 
       max_exec_time, 
       mean_exec_time
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 5;`
        }
      ]
    }
  ]
};
