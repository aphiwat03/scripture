import { Category } from '../types';

export const arrayCategory: Category = {
  id: 'array',
  name: 'Array',
  icon: '📦',
  description: 'เมธอดสำหรับจัดการอาร์เรย์ใน JavaScript',
  commands: [
    {
      id: 'split',
      name: '.split()',
      description: 'แบ่งสตริงเป็นอาร์เรย์ตามตัวแบ่ง (separator) ที่กำหนด',
      syntax: 'string.split(separator, limit)',
      parameters: [
        { name: 'separator', type: 'string | RegExp', required: false, description: 'ตัวแบ่งที่ใช้สำหรับแยกสตริง — ถ้าไม่ใส่จะคืนอาร์เรย์ที่มีทั้งสตริงเป็น element เดียว' },
        { name: 'limit', type: 'number', required: false, description: 'จำนวนสูงสุดของสมาชิกในอาร์เรย์ที่จะคืนค่า' }
      ],
      examples: [
        {
          title: 'แบ่งด้วยตัวคั่น',
          code: `const str = "apple,banana,orange";
// แบ่งด้วยลูกน้ำ (comma)
const fruits = str.split(",");
console.log(fruits);`,
          output: '["apple", "banana", "orange"]'
        },
        {
          title: 'แยกแต่ละตัวอักษร',
          code: `const word = "hello";
// แยกแต่ละตัวอักษรออกจากกัน
const chars = word.split("");
console.log(chars);`,
          output: '["h", "e", "l", "l", "o"]'
        },
        {
          title: 'จำกัดจำนวนผลลัพธ์',
          code: `const str = "a-b-c-d-e";
// จำกัดจำนวนแค่ 3 ตัวแรก
const limited = str.split("-", 3);
console.log(limited);`,
          output: '["a", "b", "c"]'
        }
      ],
      notes: '⚠️ .split() เป็น String method ไม่ใช่ Array method แต่ผลลัพธ์ที่คืนกลับมาเป็น Array ใช้คู่กับ .join() เพื่อแปลงกลับเป็นสตริง',
      seeAlso: ['join']
    },
    {
      id: 'join',
      name: '.join()',
      description: 'รวมทุก element ในอาร์เรย์เข้าด้วยกันเป็นสตริงเดียว',
      syntax: 'array.join(separator)',
      parameters: [
        { name: 'separator', type: 'string', required: false, description: 'ตัวเชื่อมระหว่างแต่ละ element (ค่าเริ่มต้นคือลูกน้ำ ,)' }
      ],
      examples: [
        {
          title: 'รวมด้วยลูกน้ำ (default)',
          code: `const fruits = ["apple", "banana", "orange"];
// รวมด้วยลูกน้ำ (default)
console.log(fruits.join());`,
          output: '"apple,banana,orange"'
        },
        {
          title: 'รวมด้วยช่องว่าง',
          code: `const words = ["Hello", "World"];
// รวมด้วยช่องว่าง
console.log(words.join(" "));`,
          output: '"Hello World"'
        },
        {
          title: 'รวมติดกันทั้งหมด',
          code: `const chars = ["h", "e", "l", "l", "o"];
// รวมติดกันทั้งหมด (empty string)
console.log(chars.join(""));`,
          output: '"hello"'
        }
      ],
      seeAlso: ['split']
    },
    {
      id: 'map',
      name: '.map()',
      description: 'แปลงทุก element ใน array ด้วย callback function และคืนอาร์เรย์ใหม่ที่มีขนาดเท่าเดิมเสมอ',
      syntax: 'array.map((element, index, array) => newValue)',
      parameters: [
        { name: 'callback', type: 'Function', required: true, description: 'ฟังก์ชันที่ทำงานในแต่ละ element รับ (element, index, array) และคืนค่าใหม่' }
      ],
      examples: [
        {
          title: 'คูณ 2 ทุกตัว',
          code: `const numbers = [1, 2, 3];
// คูณ 2 ในทุก element
const doubled = numbers.map(num => num * 2);
console.log(doubled);`,
          output: '[2, 4, 6]'
        },
        {
          title: 'ดึง property จาก object',
          code: `const users = [{name: 'Alice'}, {name: 'Bob'}];
// ดึงเฉพาะชื่อ
const names = users.map(user => user.name);
console.log(names);`,
          output: '["Alice", "Bob"]'
        },
        {
          title: 'แปลงเป็นตัวพิมพ์ใหญ่',
          code: `const words = ["hello", "world"];
// แปลงเป็นตัวพิมพ์ใหญ่ทั้งหมด
const upper = words.map(w => w.toUpperCase());
console.log(upper);`,
          output: '["HELLO", "WORLD"]'
        }
      ],
      notes: 'ไม่แก้ไข array ต้นฉบับ (Non-mutating) — จำนวน element ในผลลัพธ์เท่ากับต้นฉบับเสมอ ต่างจาก .filter() ที่อาจได้น้อยกว่า'
    },
    {
      id: 'filter',
      name: '.filter()',
      description: 'กรอง element ที่ผ่านเงื่อนไข (คืนค่าเป็น true) และสร้างอาร์เรย์ใหม่จาก element เหล่านั้น',
      syntax: 'array.filter((element, index, array) => boolean)',
      parameters: [
        { name: 'callback', type: 'Function', required: true, description: 'ฟังก์ชันที่ประเมินแต่ละ element — คืน true เพื่อเก็บไว้, false เพื่อตัดทิ้ง' }
      ],
      examples: [
        {
          title: 'กรองเฉพาะเลขคู่',
          code: `const numbers = [1, 2, 3, 4, 5, 6];
// กรองเฉพาะเลขคู่
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);`,
          output: '[2, 4, 6]'
        },
        {
          title: 'กรอง object ตามเงื่อนไข',
          code: `const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false }
];
// กรองเฉพาะคนที่ active
const activeUsers = users.filter(user => user.active);
console.log(activeUsers);`,
          output: '[{ name: "Alice", active: true }]'
        }
      ],
      notes: 'ต่างกับ .map() ตรงที่จำนวน element อาจน้อยกว่าเดิม เพราะคืนเฉพาะ subset ที่ผ่านเงื่อนไข ไม่แก้ไข array ต้นฉบับ',
      seeAlso: ['map', 'reduce']
    },
    {
      id: 'reduce',
      name: '.reduce()',
      description: 'นำ elements ทั้งหมดใน array มารวมหรือคำนวณจนเหลือเพียงค่าเดียว',
      syntax: 'array.reduce((accumulator, currentValue, index, array) => newAcc, initialValue)',
      parameters: [
        { name: 'callback', type: 'Function', required: true, description: 'ฟังก์ชันสะสมค่า — รับ accumulator (ค่าสะสม) และ currentValue (ค่าปัจจุบัน)' },
        { name: 'initialValue', type: 'any', required: false, description: 'ค่าเริ่มต้นของ accumulator — ควรใส่เสมอเพื่อป้องกัน error กับ array เปล่า' }
      ],
      examples: [
        {
          title: 'หาผลรวม',
          code: `const numbers = [1, 2, 3, 4];
// หาผลรวมทั้งหมด (เริ่มที่ 0)
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);`,
          output: '10'
        },
        {
          title: 'รวม array ย่อย (Flatten)',
          code: `const arrays = [[1, 2], [3, 4], [5, 6]];
// รวม array ย่อยเข้าด้วยกัน (Flatten)
const flat = arrays.reduce((acc, curr) => acc.concat(curr), []);
console.log(flat);`,
          output: '[1, 2, 3, 4, 5, 6]'
        },
        {
          title: 'นับความถี่',
          code: `const names = ['Alice', 'Bob', 'Alice'];
// นับจำนวนความถี่ของแต่ละชื่อ
const count = names.reduce((acc, name) => {
  acc[name] = (acc[name] || 0) + 1;
  return acc;
}, {});
console.log(count);`,
          output: '{ Alice: 2, Bob: 1 }'
        }
      ],
      notes: 'ใส่ initialValue เสมอ — ถ้าไม่ใส่และ array ว่างเปล่าจะเกิด TypeError',
      seeAlso: ['map', 'filter']
    },
    {
      id: 'slice',
      name: '.slice()',
      description: 'ตัด array บางส่วนออกมาเป็น array ใหม่ โดยไม่แก้ไข array ต้นฉบับ',
      syntax: 'array.slice(start, end)',
      parameters: [
        { name: 'start', type: 'number', required: false, description: 'Index เริ่มต้น (รวม index นี้ด้วย) ถ้าเป็น negative จะนับจากท้าย' },
        { name: 'end', type: 'number', required: false, description: 'Index สิ้นสุด (ไม่รวม index นี้) — ถ้าไม่ใส่จะตัดถึงท้ายสุด' }
      ],
      examples: [
        {
          title: 'เอา 3 ตัวแรก',
          code: `const items = ['a', 'b', 'c', 'd', 'e'];
// เอา 3 ตัวแรก (index 0, 1, 2)
const firstThree = items.slice(0, 3);
console.log(firstThree);`,
          output: '["a", "b", "c"]'
        },
        {
          title: 'เอา 2 ตัวสุดท้าย',
          code: `const items = ['a', 'b', 'c', 'd', 'e'];
// เอา 2 ตัวสุดท้ายด้วย negative index
const lastTwo = items.slice(-2);
console.log(lastTwo);`,
          output: '["d", "e"]'
        },
        {
          title: 'ตัดช่วงกลาง',
          code: `const items = ['a', 'b', 'c', 'd', 'e'];
// ตัดตั้งแต่ index 1 ถึงก่อน index 4
const range = items.slice(1, 4);
console.log(range);`,
          output: '["b", "c", "d"]'
        }
      ],
      notes: 'ต่างกับ .splice() ตรงที่ไม่ทำให้ array ต้นฉบับเปลี่ยนแปลง (Non-mutating)',
      seeAlso: ['splice']
    },
    {
      id: 'splice',
      name: '.splice()',
      description: 'เพิ่ม, ลบ, หรือแทนที่ element ใน array — แก้ไข array ต้นฉบับโดยตรง',
      syntax: 'array.splice(start, deleteCount, item1, item2, ...)',
      parameters: [
        { name: 'start', type: 'number', required: true, description: 'Index ที่จะเริ่มแก้ไข ถ้าเป็น negative นับจากท้าย' },
        { name: 'deleteCount', type: 'number', required: false, description: 'จำนวน element ที่ต้องการลบ — ถ้าเป็น 0 จะเพิ่มโดยไม่ลบ' },
        { name: 'items', type: 'any[]', required: false, description: 'element ใหม่ที่จะแทรกเข้าไปตำแหน่ง start' }
      ],
      examples: [
        {
          title: 'ลบ element',
          code: `const items = ['a', 'b', 'c'];
// ลบ 'b' ที่ index 1 ออก 1 ตัว
items.splice(1, 1);
console.log(items);`,
          output: '["a", "c"]'
        },
        {
          title: 'แทรก element',
          code: `const items = ['a', 'c'];
// แทรก 'b' ที่ index 1 (ไม่ลบอะไรเลย)
items.splice(1, 0, 'b');
console.log(items);`,
          output: '["a", "b", "c"]'
        },
        {
          title: 'แทนที่ element',
          code: `const items = ['a', 'X', 'c'];
// แทนที่ 'X' ที่ index 1 ด้วย 'b'
items.splice(1, 1, 'b');
console.log(items);`,
          output: '["a", "b", "c"]'
        }
      ],
      notes: '⚠️ Mutates (แก้ไข) array ต้นฉบับโดยตรง! ถ้าต้องการ Non-mutating ให้ใช้ .slice() แทน',
      seeAlso: ['slice']
    },
    {
      id: 'array-from',
      name: 'Array.from()',
      description: 'สร้าง Array ใหม่จาก iterable object (เช่น String, Set, Map) หรือ array-like object',
      syntax: 'Array.from(arrayLike, mapFn?)',
      parameters: [
        { name: 'arrayLike', type: 'Iterable | ArrayLike', required: true, description: 'วัตถุที่สามารถแปลงเป็น array ได้ เช่น String, Set, NodeList' },
        { name: 'mapFn', type: 'Function', required: false, description: 'ฟังก์ชัน map ที่จะรันกับแต่ละ element หลังสร้าง array แล้ว (เหมือน .map())' }
      ],
      examples: [
        {
          title: 'สร้าง array จาก string',
          code: `const str = "hello";
// สร้าง array โดยแยกแต่ละตัวอักษร
const arr = Array.from(str);
console.log(arr);`,
          output: '["h", "e", "l", "l", "o"]'
        },
        {
          title: 'ลบค่าซ้ำด้วย Set',
          code: `const numbers = [1, 2, 2, 3, 4, 4];
// Set ลบค่าซ้ำ → Array.from แปลงกลับเป็น array
const unique = Array.from(new Set(numbers));
console.log(unique);`,
          output: '[1, 2, 3, 4]'
        },
        {
          title: 'สร้าง array ตามลำดับ',
          code: `// สร้าง array [1, 2, 3, 4, 5] โดยใช้ mapFn
const seq = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(seq);`,
          output: '[1, 2, 3, 4, 5]'
        }
      ]
    }
  ]
};
