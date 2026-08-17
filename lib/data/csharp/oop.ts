import { Category } from '../types';

export const oopCategory: Category = {
  id: 'oop',
  name: 'Object-Oriented Programming',
  icon: '🏛️',
  description: 'หลักการเขียนโปรแกรมเชิงวัตถุใน C#',
  commands: [
    {
      id: 'class-struct',
      name: 'Class & Struct',
      description: 'สร้างประเภทข้อมูลอ้างอิง (Reference Type) และประเภทข้อมูลค่า (Value Type)',
      syntax: 'public class Name { ... }',
      examples: [],
    },
    {
      id: 'inheritance',
      name: 'Inheritance (:)',
      description: 'การสืบทอดคุณสมบัติจากคลาสแม่ (Base class)',
      syntax: 'class Child : Parent { ... }',
      examples: [],
    },
    {
      id: 'polymorphism',
      name: 'virtual & override',
      description: 'การพ้องรูป ให้คลาสลูกแก้ไขการทำงานของคลาสแม่ได้',
      syntax: 'public virtual void Method() { ... }',
      examples: [],
    },
    {
      id: 'encapsulation',
      name: 'Properties ({ get; set; })',
      description: 'การซ่อนข้อมูลและควบคุมการเข้าถึงผ่าน Properties',
      syntax: 'public int Age { get; set; }',
      examples: [],
    },
  ],
};
