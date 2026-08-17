import { Category } from '../types';

export const objectCategory: Category = {
  id: 'object',
  name: 'Object',
  icon: '🗂️',
  description: 'เมธอดและการจัดการ Object ภายใน JavaScript',
  commands: [
    {
      id: 'object-keys',
      name: 'Object.keys()',
      description: 'ดึงชื่อ key ทั้งหมดใน object คืนค่าเป็น array ของ string',
      syntax: 'Object.keys(obj)',
      parameters: [
        { name: 'obj', type: 'object', required: true, description: 'Object ที่ต้องการดึง keys ออกมา' }
      ],
      examples: [
        {
          title: 'ดึง keys ทั้งหมด',
          code: `const user = { name: "Alice", age: 25, role: "admin" };
// ดึง key ออกมาทั้งหมดเป็น array
const keys = Object.keys(user);
console.log(keys);`,
          output: '["name", "age", "role"]'
        },
        {
          title: 'วนลูปด้วย forEach',
          code: `const user = { name: "Bob", age: 30 };
// ใช้คู่กับ forEach เพื่อวนลูปทุก key
Object.keys(user).forEach(key => {
  console.log(key, user[key]);
});`,
          output: 'name Bob\nage 30'
        }
      ],
      seeAlso: ['object-values', 'object-entries']
    },
    {
      id: 'object-values',
      name: 'Object.values()',
      description: 'ดึงค่า (values) ทั้งหมดใน object คืนค่าเป็น array',
      syntax: 'Object.values(obj)',
      parameters: [
        { name: 'obj', type: 'object', required: true, description: 'Object ที่ต้องการดึง values ออกมา' }
      ],
      examples: [
        {
          title: 'ดึง values ทั้งหมด',
          code: `const user = { name: "Alice", age: 25, role: "admin" };
// ดึงค่าทั้งหมดใน object
const values = Object.values(user);
console.log(values);`,
          output: '["Alice", 25, "admin"]'
        },
        {
          title: 'หาผลรวมของค่าตัวเลข',
          code: `const scores = { math: 80, science: 90, english: 75 };
// นำ values มาหาผลรวม
const total = Object.values(scores).reduce((a, b) => a + b, 0);
console.log(total);`,
          output: '245'
        }
      ],
      seeAlso: ['object-keys', 'object-entries']
    },
    {
      id: 'object-entries',
      name: 'Object.entries()',
      description: 'ดึงทั้ง key และ value พร้อมกัน คืนค่าเป็น array ของ [key, value] pairs',
      syntax: 'Object.entries(obj)',
      parameters: [
        { name: 'obj', type: 'object', required: true, description: 'Object ที่ต้องการแปลงเป็น [key, value] pairs' }
      ],
      examples: [
        {
          title: 'แปลงเป็น array',
          code: `const user = { name: "Alice", age: 25 };
// แปลงเป็นอาร์เรย์ของคู่คีย์และค่า
const entries = Object.entries(user);
console.log(entries);`,
          output: '[["name", "Alice"], ["age", 25]]'
        },
        {
          title: 'วนลูปด้วย destructuring',
          code: `const user = { name: "Alice", age: 25 };
// วนลูปและ destructure key + value ออกมา
for (const [key, value] of Object.entries(user)) {
  console.log(\`\${key}: \${value}\`);
}`,
          output: '"name: Alice"\n"age: 25"'
        },
        {
          title: 'แปลงเป็น Map',
          code: `const obj = { a: 1, b: 2 };
// แปลง Object เป็น Map ด้วย entries
const map = new Map(Object.entries(obj));
console.log(map.get('a'));`,
          output: '1'
        }
      ],
      seeAlso: ['object-keys', 'object-values']
    },
    {
      id: 'destructuring',
      name: 'Destructuring',
      description: 'รูปแบบการแกะค่า (unpack) จาก object หรือ array ออกมาเก็บเป็นตัวแปรแบบสั้นและกระชับ',
      syntax: 'const { key1, key2 } = obj',
      examples: [
        {
          title: 'Destructuring พื้นฐาน',
          code: `const user = { id: 1, name: "John", age: 30 };
// แกะ property ออกมาเป็นตัวแปร
const { name, age } = user;
console.log(name, age);`,
          output: '"John" 30'
        },
        {
          title: 'เปลี่ยนชื่อตัวแปร (Rename)',
          code: `const data = { u: "admin" };
// เปลี่ยนชื่อ: u → userRole
const { u: userRole } = data;
console.log(userRole);`,
          output: '"admin"'
        },
        {
          title: 'กำหนดค่าเริ่มต้น (Default value)',
          code: `const settings = { theme: "dark" };
// fontSize ไม่มีใน object → ใช้ค่า default 16
const { theme, fontSize = 16 } = settings;
console.log(theme, fontSize);`,
          output: '"dark" 16'
        },
        {
          title: 'Nested destructuring',
          code: `const info = { nested: { prop: 100 } };
// แกะ object ที่ซ้อนกัน
const { nested: { prop } } = info;
console.log(prop);`,
          output: '100'
        }
      ]
    },
    {
      id: 'spread',
      name: 'Spread Operator',
      description: 'กระจาย properties ของ object ออกมา ใช้เพื่อคัดลอกหรือรวม object หลายตัวเข้าด้วยกัน',
      syntax: 'const newObj = { ...obj1, ...obj2 }',
      examples: [
        {
          title: 'คัดลอก object',
          code: `const original = { a: 1, b: 2 };
// สร้าง object ใหม่ที่คัดลอกค่าจาก original
const clone = { ...original };
console.log(clone);`,
          output: '{ a: 1, b: 2 }'
        },
        {
          title: 'รวม 2 objects',
          code: `const obj1 = { a: 1 };
const obj2 = { b: 2 };
// รวม 2 objects เข้าด้วยกัน
const merged = { ...obj1, ...obj2 };
console.log(merged);`,
          output: '{ a: 1, b: 2 }'
        },
        {
          title: 'Override property',
          code: `const user = { name: "Alice", age: 25 };
// รวม object พร้อมอัพเดตค่า age
const updated = { ...user, age: 26 };
console.log(updated);`,
          output: '{ name: "Alice", age: 26 }'
        }
      ],
      notes: '⚠️ Shallow copy เท่านั้น — nested object ที่อยู่ข้างในยังคงแชร์ reference เดิม ไม่ใช่ deep clone',
      seeAlso: ['object-assign']
    },
    {
      id: 'object-assign',
      name: 'Object.assign()',
      description: 'คัดลอก properties จาก source objects ไปยัง target object',
      syntax: 'Object.assign(target, ...sources)',
      parameters: [
        { name: 'target', type: 'object', required: true, description: 'Object เป้าหมายที่จะได้รับค่าจาก sources (จะถูก mutate)' },
        { name: 'sources', type: 'object[]', required: true, description: 'Object ต้นทางหนึ่งตัวหรือมากกว่า ที่จะคัดลอกค่าจาก' }
      ],
      examples: [
        {
          title: 'รวม objects เข้า target',
          code: `const target = { a: 1 };
const source = { b: 2, c: 3 };
// คัดลอก properties จาก source ไปยัง target
Object.assign(target, source);
console.log(target);`,
          output: '{ a: 1, b: 2, c: 3 }'
        },
        {
          title: 'Clone object',
          code: `const source = { x: 10, y: 20 };
// ใช้ {} เป็น target เพื่อสร้าง clone ใหม่
const clone = Object.assign({}, source);
console.log(clone);`,
          output: '{ x: 10, y: 20 }'
        }
      ],
      notes: 'ทำงานคล้ายกับ Spread operator (...) และเป็น Shallow copy เช่นเดียวกัน — target จะถูก mutate โดยตรง',
      seeAlso: ['spread']
    }
  ]
};
