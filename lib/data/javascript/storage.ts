import { Category } from '../types';

export const storageCategory: Category = {
  id: 'storage',
  name: 'Web Storage',
  icon: '💾',
  description: 'การจัดการข้อมูล Web Storage (localStorage และ sessionStorage) ภายในเบราว์เซอร์',
  commands: [
    {
      id: 'setitem',
      name: '.setItem()',
      description: 'บันทึกข้อมูลแบบ key-value ลงใน localStorage หรือ sessionStorage',
      syntax: 'storage.setItem(keyName, keyValue)',
      parameters: [
        { name: 'keyName', type: 'string', required: true, description: 'ชื่อตัวแปรหรือคีย์ที่ใช้สำหรับอ้างอิงข้อมูล' },
        { name: 'keyValue', type: 'string', required: true, description: 'ข้อมูลที่จะถูกจัดเก็บ (ต้องเป็น string)' }
      ],
      examples: [
        {
          title: 'เก็บค่า string',
          code: `// บันทึก username ลงใน localStorage
localStorage.setItem("username", "Alice");
console.log("บันทึกแล้ว");`,
          output: '"บันทึกแล้ว"'
        },
        {
          title: 'เก็บ object (ต้องใช้ JSON.stringify)',
          code: `const user = { name: "Bob", age: 30 };
// Object ต้องแปลงเป็น string ก่อนเก็บ
localStorage.setItem("userData", JSON.stringify(user));
// ตรวจสอบว่าเก็บแล้ว
console.log(localStorage.getItem("userData"));`,
          output: '"{\\"name\\":\\"Bob\\",\\"age\\":30}"'
        }
      ],
      notes: 'ค่าที่เก็บต้องเป็น string เสมอ — ถ้าต้องการเก็บ object หรือ array ให้ใช้ JSON.stringify() ก่อน และ JSON.parse() ตอนดึงออก',
      seeAlso: ['getitem']
    },
    {
      id: 'getitem',
      name: '.getItem()',
      description: 'ดึงข้อมูลจาก storage ด้วย key ที่กำหนด — คืนค่า null ถ้าไม่พบ key นั้น',
      syntax: 'storage.getItem(keyName)',
      parameters: [
        { name: 'keyName', type: 'string', required: true, description: 'ชื่อคีย์ของข้อมูลที่ต้องการดึงออกมา' }
      ],
      examples: [
        {
          title: 'ดึงค่า string',
          code: `// ดึงค่า string ธรรมดา
const name = localStorage.getItem("username");
console.log(name);`,
          output: '"Alice"'
        },
        {
          title: 'ดึง object (ต้องใช้ JSON.parse)',
          code: `// ดึง object ออกมาและแปลงด้วย JSON.parse
const data = localStorage.getItem("userData");
const userObj = data ? JSON.parse(data) : null;
console.log(userObj);`,
          output: '{ name: "Bob", age: 30 }'
        },
        {
          title: 'Handle กรณีไม่พบ key',
          code: `// ถ้าไม่พบ key จะคืน null
const notFound = localStorage.getItem("missingKey");
console.log(notFound);`,
          output: 'null'
        }
      ],
      seeAlso: ['setitem', 'removeitem']
    },
    {
      id: 'removeitem',
      name: '.removeItem()',
      description: 'ลบข้อมูลเฉพาะ key ที่กำหนดออกจาก storage',
      syntax: 'storage.removeItem(keyName)',
      parameters: [
        { name: 'keyName', type: 'string', required: true, description: 'ชื่อคีย์ของข้อมูลที่ต้องการลบ' }
      ],
      examples: [
        {
          title: 'ลบข้อมูลตาม key',
          code: `// ลบเฉพาะ key "username" ออก (ไม่กระทบ key อื่น)
localStorage.removeItem("username");

// ตรวจสอบว่าถูกลบแล้ว
console.log(localStorage.getItem("username"));`,
          output: 'null'
        }
      ],
      seeAlso: ['clear', 'getitem']
    },
    {
      id: 'clear',
      name: '.clear()',
      description: 'ลบข้อมูลทั้งหมดที่อยู่ใน storage ของโดเมนนั้น',
      syntax: 'storage.clear()',
      examples: [
        {
          title: 'ล้างข้อมูลทั้งหมด',
          code: `localStorage.setItem("a", "1");
localStorage.setItem("b", "2");

// ⚠️ ล้างทั้งหมดในคราวเดียว
localStorage.clear();

// ตรวจสอบ
console.log(localStorage.length);`,
          output: '0'
        }
      ],
      notes: '⚠️ จะลบข้อมูลทุก key ในโดเมนนั้นทั้งหมด — ใช้อย่างระมัดระวัง ถ้าต้องการลบเฉพาะ key ให้ใช้ .removeItem() แทน',
      seeAlso: ['removeitem']
    },
    {
      id: 'sessionstorage',
      name: 'sessionStorage vs localStorage',
      description: 'เปรียบเทียบความต่างระหว่าง sessionStorage และ localStorage',
      syntax: 'sessionStorage.setItem() / localStorage.setItem()',
      examples: [
        {
          title: 'localStorage — คงอยู่ตลอด',
          code: `// localStorage คงอยู่แม้ปิด browser แล้วเปิดใหม่
localStorage.setItem("theme", "dark");

// ข้อมูลยังอยู่ครั้งหน้าที่เปิด browser
console.log(localStorage.getItem("theme"));`,
          output: '"dark"'
        },
        {
          title: 'sessionStorage — หายเมื่อปิด tab',
          code: `// sessionStorage หายเมื่อปิด tab/window นั้น
sessionStorage.setItem("cartTemp", "100");

// ถ้าเปิด tab ใหม่จะไม่มีค่านี้
console.log(sessionStorage.getItem("cartTemp"));`,
          output: '"100"'
        }
      ],
      notes: 'localStorage: ข้อมูลอยู่ถาวรจนกว่าจะถูกลบ | sessionStorage: ข้อมูลหายเมื่อปิด tab/window | ทั้งคู่เก็บได้ ~5MB ต่อโดเมน'
    }
  ]
};
