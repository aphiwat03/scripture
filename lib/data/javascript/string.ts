import { Category } from '../types';

export const stringCategory: Category = {
  id: 'string',
  name: 'String',
  icon: '📝',
  description: 'เมธอดสำหรับจัดการสายอักขระ (String) ใน JavaScript',
  commands: [
    {
      id: 'trim',
      name: '.trim()',
      description: 'ลบช่องว่าง (whitespace) ทั้งด้านหน้าและด้านหลังของสตริง',
      syntax: 'string.trim()',
      examples: [
        {
          title: 'ลบช่องว่างหัวท้าย',
          code: `const str = "   hello world   ";
// ลบช่องว่างหัวและท้าย
console.log(str.trim());`,
          output: '"hello world"'
        },
        {
          title: 'ลบแค่ด้านหน้า (.trimStart)',
          code: `const str = "   hello   ";
// ลบแค่ด้านหน้า
console.log(str.trimStart());`,
          output: '"hello   "'
        },
        {
          title: 'ลบแค่ด้านหลัง (.trimEnd)',
          code: `const str = "   hello   ";
// ลบแค่ด้านหลัง
console.log(str.trimEnd());`,
          output: '"   hello"'
        }
      ],
      notes: 'ลบช่องว่างที่หัวและท้ายเท่านั้น ไม่ลบช่องว่างระหว่างคำตรงกลางสตริง'
    },
    {
      id: 'replace',
      name: '.replace()',
      description: 'ค้นหาและแทนที่ substring ด้วยค่าใหม่ (แทนที่เฉพาะครั้งแรกที่พบ)',
      syntax: 'string.replace(searchValue, newValue)',
      parameters: [
        { name: 'searchValue', type: 'string | RegExp', required: true, description: 'ข้อความหรือ Regex ที่ต้องการค้นหา' },
        { name: 'newValue', type: 'string | Function', required: true, description: 'ข้อความใหม่ที่จะแทนที่' }
      ],
      examples: [
        {
          title: 'แทนที่ครั้งแรก',
          code: `const text = "I love cats. Cats are cute.";
// แทนที่แค่คำแรกที่เจอ (case-sensitive)
const newText = text.replace("cats", "dogs");
console.log(newText);`,
          output: '"I love dogs. Cats are cute."'
        },
        {
          title: 'ใช้ Regex แทนที่ทั้งหมด',
          code: `const text = "I love cats. Cats are cute.";
// ใช้ /gi เพื่อแทนที่ทั้งหมด ไม่สนพิมพ์เล็ก-ใหญ่
const newText = text.replace(/cats/gi, "dogs");
console.log(newText);`,
          output: '"I love dogs. dogs are cute."'
        }
      ],
      notes: 'แทนที่เฉพาะครั้งแรกที่เจอเท่านั้น ถ้าต้องการแทนที่ทุกตำแหน่งโดยไม่ใช้ Regex ให้ใช้ .replaceAll() แทน',
      seeAlso: ['replace-all']
    },
    {
      id: 'replace-all',
      name: '.replaceAll()',
      description: 'แทนที่ทุกการปรากฏ (all occurrences) ของ substring ด้วยค่าใหม่',
      syntax: 'string.replaceAll(searchValue, newValue)',
      parameters: [
        { name: 'searchValue', type: 'string | RegExp', required: true, description: 'ข้อความที่ต้องการค้นหา (ถ้าใช้ RegExp ต้องมี flag /g)' },
        { name: 'newValue', type: 'string | Function', required: true, description: 'ข้อความใหม่ที่จะแทนที่ทุกตำแหน่ง' }
      ],
      examples: [
        {
          title: 'แทนที่ทุกตำแหน่ง',
          code: `const text = "apple banana apple";
// แทนที่คำว่า apple ทั้งหมด
const result = text.replaceAll("apple", "orange");
console.log(result);`,
          output: '"orange banana orange"'
        },
        {
          title: 'แทนที่ช่องว่างทั้งหมด',
          code: `const text = "hello world code";
// แทนที่ช่องว่างทั้งหมดด้วยขีดล่าง
const slug = text.replaceAll(" ", "_");
console.log(slug);`,
          output: '"hello_world_code"'
        }
      ],
      seeAlso: ['replace']
    },
    {
      id: 'includes',
      name: '.includes()',
      description: 'ตรวจสอบว่าสตริงมี substring ที่ต้องการอยู่หรือไม่ คืนค่าเป็น boolean',
      syntax: 'string.includes(searchString, position?)',
      parameters: [
        { name: 'searchString', type: 'string', required: true, description: 'คำหรือข้อความที่ต้องการค้นหา' },
        { name: 'position', type: 'number', required: false, description: 'ตำแหน่ง index ที่จะเริ่มค้นหา (ค่าเริ่มต้นคือ 0)' }
      ],
      examples: [
        {
          title: 'ตรวจสอบคำที่มีอยู่',
          code: `const sentence = "The quick brown fox";
// ตรวจสอบว่ามีคำว่า brown หรือไม่
console.log(sentence.includes("brown"));`,
          output: 'true'
        },
        {
          title: 'Case-sensitive',
          code: `const text = "Hello World";
// "hello" (พิมพ์เล็ก) ≠ "Hello" (พิมพ์ใหญ่)
console.log(text.includes("hello"));`,
          output: 'false'
        },
        {
          title: 'Case-insensitive ด้วย toLowerCase',
          code: `const text = "Hello World";
// แปลงทั้งคู่เป็นพิมพ์เล็กก่อนเปรียบเทียบ
console.log(text.toLowerCase().includes("hello"));`,
          output: 'true'
        }
      ],
      notes: 'เป็น case-sensitive ถ้าต้องการ case-insensitive ให้ใช้ .toLowerCase() กับทั้งสองฝั่งก่อนเปรียบเทียบ'
    },
    {
      id: 'template-literals',
      name: 'Template Literals',
      description: 'สตริงชนิดพิเศษที่ใช้ backtick ซึ่งสามารถแทรกตัวแปรและ expression ได้โดยตรง',
      syntax: '`text ${expression} text`',
      examples: [
        {
          title: 'แทรกตัวแปร',
          code: `const name = "Alice";
// แทรกตัวแปรด้วย \${} แทนการต่อสตริงด้วย +
const greeting = \`Hello, \${name}!\`;
console.log(greeting);`,
          output: '"Hello, Alice!"'
        },
        {
          title: 'คำนวณ expression',
          code: `const a = 5, b = 10;
// ใส่ expression ลงไปได้โดยตรง
console.log(\`ผลรวม = \${a + b}\`);`,
          output: '"ผลรวม = 15"'
        },
        {
          title: 'Multiline string',
          code: `// เขียนสตริงหลายบรรทัดได้ง่ายๆ (ไม่ต้องใช้ \\n)
const html = \`
  <div>
    <p>Hello</p>
  </div>
\`;
console.log(html);`,
          output: '"\\n  <div>\\n    <p>Hello</p>\\n  </div>\\n"'
        }
      ],
      notes: 'ใช้สัญลักษณ์ backtick (`) ไม่ใช่ single quote (\') หรือ double quote (")'
    },
    {
      id: 'padstart',
      name: '.padStart()',
      description: 'เพิ่มตัวอักษรที่ด้านหน้าสตริงจนกว่าจะครบความยาวที่กำหนด มักใช้ในการจัดรูปแบบตัวเลข',
      syntax: 'string.padStart(targetLength, padString?)',
      parameters: [
        { name: 'targetLength', type: 'number', required: true, description: 'ความยาวเป้าหมายที่ต้องการ' },
        { name: 'padString', type: 'string', required: false, description: 'ตัวอักษรที่จะนำมาเติม (ค่าเริ่มต้นคือช่องว่าง)' }
      ],
      examples: [
        {
          title: 'จัดรูปแบบตัวเลข (เติม 0)',
          code: `const num = "5";
// เติม "0" ด้านหน้าให้ครบ 3 หลัก
console.log(num.padStart(3, "0"));`,
          output: '"005"'
        },
        {
          title: 'เติมด้วยช่องว่าง',
          code: `const txt = "hi";
// เติมช่องว่างด้านหน้าจนครบ 5 ตัวอักษร
console.log(txt.padStart(5));`,
          output: '"   hi"'
        }
      ]
    },
    {
      id: 'slice-str',
      name: '.slice()',
      description: 'ดึงส่วนหนึ่งของสตริงออกมาเป็นสตริงใหม่ โดยไม่แก้ไขสตริงต้นฉบับ',
      syntax: 'string.slice(indexStart, indexEnd?)',
      parameters: [
        { name: 'indexStart', type: 'number', required: true, description: 'Index ตำแหน่งเริ่มต้น (รวม index นี้) ถ้าเป็น negative นับจากท้าย' },
        { name: 'indexEnd', type: 'number', required: false, description: 'Index ตำแหน่งสุดท้าย (ไม่รวม index นี้) ถ้าไม่ใส่จะดึงถึงท้ายสุด' }
      ],
      examples: [
        {
          title: 'ดึง 5 ตัวแรก',
          code: `const str = "Hello World";
// ดึงตั้งแต่ index 0 ถึงก่อน index 5
console.log(str.slice(0, 5));`,
          output: '"Hello"'
        },
        {
          title: 'ดึงตัวสุดท้าย (negative index)',
          code: `const str = "Hello World";
// negative index นับจากท้าย: -5 = World
console.log(str.slice(-5));`,
          output: '"World"'
        }
      ]
    }
  ]
};
