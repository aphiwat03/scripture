import { Category } from '../types';

export const oop: Category = {
  id: 'oop',
  name: 'Object-Oriented Programming',
  icon: '🏗️',
  description: 'การเขียนโปรแกรมเชิงวัตถุใน TypeScript',
  commands: [
    {
      id: 'class',
      name: 'class',
      description: 'สร้างพิมพ์เขียวสำหรับสร้าง Object',
      syntax: 'class Name { ... }',
      examples: [
        {
          code: `class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  move(distanceInMeters: number = 0) {
    console.log(\`\${this.name} moved \${distanceInMeters}m.\`);
  }
}`,
          title: 'คลาสพื้นฐานที่มีคุณสมบัติและเมธอด'
        }
      ]
    },
    {
      id: 'interface',
      name: 'interface',
      description: 'กำหนดโครงสร้างหรือพฤติกรรมที่คลาสต้องทำตาม',
      syntax: 'interface Name { ... }',
      examples: [
        {
          code: `interface Animal {
  name: string;
  move(): void;
}

class Dog implements Animal {
  name = 'Doggo';
  move() { console.log('วิ่ง 🐕'); }
}`,
          title: 'การบังคับโครงสร้างด้วย interface'
        }
      ]
    },
    {
      id: 'access-modifiers',
      name: 'public, private, protected',
      description: 'กำหนดระดับการเข้าถึง properties/methods',
      syntax: 'private propName: type',
      examples: [
        {
          code: `class Person {
  public name: string;     // เข้าถึงได้จากทุกที่
  private age: number;     // เข้าถึงได้เฉพาะในคลาสนี้เท่านั้น
  protected id: string;    // เข้าถึงได้ในคลาสนี้และคลาสลูก
}`,
          title: 'การควบคุมการเข้าถึงข้อมูล'
        }
      ]
    },
    {
      id: 'abstract',
      name: 'abstract class',
      description: 'คลาสต้นแบบที่ไม่สามารถสร้าง instance ตรงๆ ได้',
      syntax: 'abstract class Name { ... }',
      examples: [
        {
          code: `abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    console.log('Department name: ' + this.name);
  }
  abstract printMeeting(): void; // คลาสลูกต้องเอาไปเขียนต่อ
}`,
          title: 'คลาสต้นแบบและเมธอดแบบนามธรรม'
        }
      ]
    }
  ]
};
