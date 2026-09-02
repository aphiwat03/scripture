import { Category } from '../types'

export const gettingStartedCategory: Category = {
  id: 'getting-started',
  name: 'Getting Started',
  icon: '🚀',
  description: 'การติดตั้ง โครงสร้างโปรเจกต์ การอัปเกรด และการนำขึ้นระบบ (Deployment)',
  commands: [
    {
      id: 'installation',
      name: 'Installation',
      description: 'วิธีติดตั้งและสร้างโปรเจกต์ Next.js ใหม่ที่แนะนำ',
      syntax: 'npx create-next-app@latest',
      examples: [
        {
          title: 'คำสั่งเริ่มต้นสร้างโปรเจกต์',
          language: 'bash',
          code: `npx create-next-app@latest my-app\ncd my-app\nnpm run dev`,
          output: `✔ Would you like to use TypeScript? … Yes\n✔ Would you like to use ESLint? … Yes\n✔ Would you like to use Tailwind CSS? … Yes\n✔ Would you like to use \`src/\` directory? … No\n✔ Would you like to use App Router? (recommended) … Yes\n✔ Would you like to customize the default import alias (@/*)? … No`
        }
      ],
      notes: 'Next.js แนะนำให้ใช้ App Router และ TypeScript เป็นค่าเริ่มต้น'
    },
    {
      id: 'project-structure',
      name: 'Project Structure',
      description: 'โครงสร้างโฟลเดอร์พื้นฐานของโปรเจกต์ Next.js (App Router)',
      syntax: 'app/, public/, next.config.ts',
      examples: [
        {
          title: 'โครงสร้างไฟล์',
          language: 'text',
          code: `my-app/
├── app/                  # โฟลเดอร์หลักสำหรับ App Router (Routing, Pages, Layouts)
│   ├── favicon.ico
│   ├── globals.css       # ไฟล์ CSS หลัก (Tailwind)
│   ├── layout.tsx        # Root Layout (ครอบทุกหน้าเว็บ)
│   └── page.tsx          # หน้า Home (/)
├── public/               # โฟลเดอร์เก็บไฟล์ Static (รูปภาพ, ฟอนต์) เช่น /logo.png
├── node_modules/         # แพ็กเกจต่างๆ
├── next.config.ts        # ไฟล์ตั้งค่า Next.js
├── package.json          # ไฟล์จัดการ Dependencies และ Scripts
└── tsconfig.json         # ไฟล์ตั้งค่า TypeScript`
        }
      ]
    },
    {
      id: 'upgrading',
      name: 'Upgrading (การอัปเกรด)',
      description: 'การอัปเกรด Next.js เป็นเวอร์ชันล่าสุด',
      syntax: 'npm i next@latest react@latest react-dom@latest',
      examples: [
        {
          title: 'คำสั่งอัปเกรด',
          language: 'bash',
          code: `npm i next@latest react@latest react-dom@latest\nnpm i -D eslint-config-next@latest`
        },
        {
          title: 'การใช้ Codemods',
          language: 'bash',
          code: `npx @next/codemod@latest upgrade latest`,
          output: 'จะช่วยอัปเกรดไฟล์และเปลี่ยน API ที่ถูก Deprecate ให้อัตโนมัติ'
        }
      ],
      notes: 'ควรอ่าน Release Notes หรือ Docs ก่อนอัปเกรดเวอร์ชันใหญ่ (Major) เสมอ เพราะอาจมี Breaking Changes (เช่น Next.js 15 ที่ทำให้ params กลายเป็น Promise)'
    },
    {
      id: 'deploying',
      name: 'Deploying',
      description: 'การนำโปรเจกต์ขึ้นเซิร์ฟเวอร์จริง (Production)',
      syntax: 'npm run build && npm run start',
      examples: [
        {
          title: 'ขั้นตอนการ Build ในเครื่อง',
          language: 'bash',
          code: `npm run build\n# จะทำการคอมไพล์โค้ด สร้างไฟล์ Static และเช็ค Type\n\nnpm run start\n# รัน Server โหมด Production`
        }
      ],
      notes: 'ทางเลือก Deploy ยอดนิยม: 1) Vercel (สร้างโดยทีม Next.js ง่ายสุด) 2) Netlify, Cloudflare Pages, Firebase Hosting (รองรับดีเยี่ยม) 3) Self-hosted (ใช้ Docker + npm run start) 4) Static Export (output: "export" ใน next.config)'
    }
  ]
}
