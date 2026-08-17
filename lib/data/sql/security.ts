import { Category } from '../types';

export const securityCategory: Category = {
  id: 'security',
  name: 'Security',
  icon: '🔒',
  description: 'ความปลอดภัยและ SQL Injection',
  commands: [
    {
      id: 'sql-injection',
      name: 'ป้องกัน SQL Injection',
      description: 'การโจมตีที่ใส่โค้ด SQL อันตรายผ่าน Input ของผู้ใช้ เป็นช่องโหว่ที่พบบ่อยที่สุด',
      syntax: '-- Use Parameterized Queries / Prepared Statements',
      examples: [
        {
          title: '❌ Code ที่มีช่องโหว่ SQL Injection',
          language: 'sql',
          code: `-- PHP ที่ไม่ปลอดภัย (อย่าทำแบบนี้!)\n-- ถ้า username = "admin'--" จะทำให้ bypass authentication\n\n$query = "SELECT * FROM users WHERE username = '" . $username . "' AND password = '" . $password . "'";\n\n-- SQL จริงที่ถูก inject:\n-- SELECT * FROM users WHERE username = 'admin'--' AND password = '...'\n-- '--' คือ comment ใน SQL ทำให้ตัดเงื่อนไข password ออก!`
        },
        {
          title: '✅ แก้ด้วย Parameterized Query (PHP PDO)',
          language: 'sql',
          code: `-- PHP PDO - ปลอดภัย\n$stmt = $pdo->prepare('SELECT * FROM users WHERE username = ? AND password = ?');\n$stmt->execute([$username, $password]);\n\n-- C# Entity Framework Core - ปลอดภัย (ORM จัดการให้)\nvar user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);\n\n-- Raw SQL ใน EF Core - ปลอดภัยด้วย FromSqlInterpolated\nvar users = _context.Users.FromSqlInterpolated($"SELECT * FROM Users WHERE Username = {username}");`
        },
        {
          title: 'ตัวอย่างใน Node.js (mysql2)',
          language: 'sql',
          code: `// ❌ ไม่ปลอดภัย (String Concatenation)\nconst query = \`SELECT * FROM users WHERE email = '\${email}'\`;\n\n// ✅ ปลอดภัย (Parameterized)\nconst [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);`
        }
      ],
      notes: '🔴 SQL Injection ติดอันดับ OWASP Top 10 ทุกปี | ป้องกันด้วย: 1) Parameterized Queries เสมอ 2) ORM ที่จัดการให้ 3) Stored Procedures 4) Whitelist Input Validation',
      seeAlso: ['role-grant', 'view-security']
    },
    {
      id: 'role-grant',
      name: 'ROLE & GRANT (Least Privilege)',
      description: 'การจัดการสิทธิ์ผู้ใช้ตามหลัก Principle of Least Privilege – ให้สิทธิ์น้อยที่สุดเท่าที่จำเป็น',
      syntax: 'GRANT privilege ON object TO user',
      examples: [
        {
          title: 'สร้าง User และให้สิทธิ์',
          language: 'sql',
          code: `-- สร้าง User (MySQL)\nCREATE USER 'app_user'@'localhost' IDENTIFIED BY 'strong_password';\n\n-- ให้สิทธิ์แค่ READ บนตารางที่จำเป็น\nGRANT SELECT ON mydb.products TO 'app_user'@'localhost';\n\n-- ให้สิทธิ์ CRUD บน table เดียว\nGRANT SELECT, INSERT, UPDATE, DELETE ON mydb.orders TO 'app_user'@'localhost';\n\n-- ยืนยันการเปลี่ยนแปลงสิทธิ์\nFLUSH PRIVILEGES;`
        },
        {
          title: 'สร้าง ROLE (PostgreSQL)',
          language: 'sql',
          code: `-- สร้าง Role\nCREATE ROLE readonly_role;\nGRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_role;\n\n-- มอบ Role ให้ User\nGRANT readonly_role TO app_user;\n\n-- ลบสิทธิ์\nREVOKE ALL ON mydb.* FROM 'old_user'@'localhost';`
        },
        {
          title: 'ดูสิทธิ์ที่มี',
          language: 'sql',
          code: `-- MySQL\nSHOW GRANTS FOR 'app_user'@'localhost';\n\n-- PostgreSQL\n\\du          -- แสดง roles\n\\dp tablename -- แสดง privileges ของตาราง`
        }
      ],
      notes: '🔑 หลัก Principle of Least Privilege: ให้สิทธิ์เฉพาะที่จำเป็นต่อการทำงาน | App user ไม่ควรมีสิทธิ์ DROP TABLE หรือ DELETE โดยไม่จำเป็น',
      seeAlso: ['sql-injection', 'view-security']
    },
    {
      id: 'view-security',
      name: 'VIEW (Security Layer)',
      description: 'ตารางเสมือนที่ซ่อนความซับซ้อนและจำกัดการเข้าถึงข้อมูลที่ละเอียดอ่อน',
      syntax: 'CREATE VIEW view_name AS SELECT ...',
      examples: [
        {
          title: 'สร้าง VIEW เพื่อซ่อนข้อมูลที่ละเอียดอ่อน',
          language: 'sql',
          code: `-- ซ่อน column ที่ sensitive เช่น salary, password_hash\nCREATE VIEW public_employees AS\nSELECT id, name, department, job_title\nFROM employees;\n-- ไม่มี salary, ssn, password_hash\n\n-- ให้ user สิทธิ์แค่ VIEW ไม่ให้ตารางจริง\nGRANT SELECT ON public_employees TO 'app_readonly_user'@'localhost';`
        },
        {
          title: 'VIEW เพื่อ simplify Complex Query',
          language: 'sql',
          code: `CREATE VIEW department_stats AS\nSELECT d.department_name,\n       COUNT(e.id)    AS headcount,\n       AVG(e.salary)  AS avg_salary,\n       MAX(e.salary)  AS max_salary\nFROM employees e\nJOIN departments d ON e.department_id = d.id\nGROUP BY d.department_name;\n\n-- ใช้งาน VIEW เหมือนตารางปกติ\nSELECT * FROM department_stats WHERE headcount > 5;`
        },
        {
          title: 'Updatable VIEW',
          language: 'sql',
          code: `-- VIEW ที่ update ได้ (simple view – 1 table, ไม่มี DISTINCT/GROUP BY)\nCREATE VIEW active_employees AS\nSELECT * FROM employees WHERE status = 'active';\n\nUPDATE active_employees SET salary = 70000 WHERE id = 1;\n-- จะ update ตารางจริง (employees)`
        }
      ],
      notes: 'VIEW ไม่เก็บข้อมูลเอง (เป็นแค่ Stored Query) | ยกเว้น MATERIALIZED VIEW ที่เก็บ Snapshot ไว้ (PostgreSQL) | ใช้ VIEW เพื่อ Data Abstraction และ Security',
      seeAlso: ['role-grant', 'sql-injection']
    }
  ]
};
