import { Category } from '../types';

export const typesCategory: Category = {
  id: 'types',
  name: 'Type System',
  icon: '🏷️',
  description: 'ระบบประเภทข้อมูลใน TypeScript',
  commands: [
    {
      id: 'basic-types',
      name: 'Basic Types',
      description: 'ชนิดข้อมูลพื้นฐาน (string, number, boolean, any)',
      syntax: 'let x: string = "hello"',
      examples: [
        {
          code: `let isDone: boolean = false;\nlet decimal: number = 6;\nlet color: string = "blue";\nlet notSure: any = 4; // สามารถเป็นอะไรก็ได้`,
          title: 'การประกาศตัวแปรพร้อมระบุชนิดข้อมูล'
        }
      ]
    },
    {
      id: 'union',
      name: 'Union Types',
      description: 'อนุญาตให้ตัวแปรเก็บข้อมูลได้หลายชนิด',
      syntax: 'type | type',
      examples: [
        {
          code: `function printId(id: number | string) {\n  console.log("Your ID is: " + id);\n}\nprintId(101);\nprintId("202");`,
          title: 'การรับพารามิเตอร์ที่เป็นไปได้มากกว่าหนึ่งประเภท'
        }
      ]
    },
    {
      id: 'generics',
      name: 'Generics <T>',
      description: 'สร้าง components ที่รองรับได้หลาย type',
      syntax: 'function name<T>(arg: T): T',
      examples: [
        {
          code: `function identity<Type>(arg: Type): Type {\n  return arg;\n}\n\nlet output = identity<string>("myString");\nlet outputNum = identity<number>(100);`,
          title: 'ฟังก์ชันที่สามารถทำงานร่วมกับชนิดข้อมูลใดก็ได้ตามที่ระบุ'
        }
      ]
    }
  ]
};
