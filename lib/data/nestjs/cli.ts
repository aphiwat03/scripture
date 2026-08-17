import { Category } from '../types';

export const cliCategory: Category = {
  id: 'cli',
  name: 'NestJS CLI',
  icon: '💻',
  description: 'คำสั่งที่ใช้บ่อยใน Command Line Interface ของ NestJS สำหรับสร้างโครงสร้างโปรเจกต์',
  commands: [
    {
      id: 'nest-new',
      name: 'nest new',
      description: 'สร้างโปรเจกต์ NestJS ใหม่',
      syntax: 'nest new <project-name>',
      parameters: [
        { name: 'project-name', type: 'string', required: true, description: 'ชื่อโปรเจกต์ที่จะสร้าง' }
      ],
      examples: [
        {
          title: 'สร้างโปรเจกต์ใหม่',
          code: `// สร้างโปรเจกต์ชื่อ my-nest-app\nnest new my-nest-app`,
          language: 'bash'
        }
      ]
    },
    {
      id: 'nest-g-module',
      name: 'nest g module',
      description: 'สร้าง Module ใหม่ (g ย่อมาจาก generate)',
      syntax: 'nest g module <name>',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'ชื่อของ module' }
      ],
      examples: [
        {
          title: 'สร้าง Users Module',
          code: `// จะสร้างไฟล์ users/users.module.ts และนำไปลงทะเบียนใน app.module ให้อัตโนมัติ\nnest g module users`,
          language: 'bash'
        }
      ]
    },
    {
      id: 'nest-g-controller',
      name: 'nest g controller',
      description: 'สร้าง Controller ใหม่',
      syntax: 'nest g controller <name>',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'ชื่อของ controller' }
      ],
      examples: [
        {
          title: 'สร้าง Users Controller',
          code: `// จะสร้างไฟล์ users/users.controller.ts และไฟล์เทส\nnest g controller users\n\n// ถ้าไม่ต้องการไฟล์เทส ให้ใส่ --no-spec\nnest g controller users --no-spec`,
          language: 'bash'
        }
      ]
    },
    {
      id: 'nest-g-service',
      name: 'nest g service',
      description: 'สร้าง Service (Provider) ใหม่',
      syntax: 'nest g service <name>',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'ชื่อของ service' }
      ],
      examples: [
        {
          title: 'สร้าง Users Service',
          code: `// จะสร้างไฟล์ users/users.service.ts\nnest g service users`,
          language: 'bash'
        }
      ]
    },
    {
      id: 'nest-g-resource',
      name: 'nest g resource',
      description: 'สร้างโครงสร้างแบบ CRUD (Module, Controller, Service, DTO, Entities) ภายในคำสั่งเดียว',
      syntax: 'nest g resource <name>',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'ชื่อของ resource (เช่น users, products)' }
      ],
      examples: [
        {
          title: 'สร้าง CRUD สำหรับ Products',
          code: `// จะมี prompt ถามว่าเป็น REST API, GraphQL หรือ WebSockets\n// จากนั้นจะสร้างไฟล์ที่จำเป็นทั้งหมดให้พร้อมใช้งาน\nnest g resource products`,
          language: 'bash'
        }
      ],
      notes: 'คำสั่งนี้เป็นวิธีที่เร็วที่สุดในการขึ้นโครงสร้าง API ใหม่'
    }
  ]
};
