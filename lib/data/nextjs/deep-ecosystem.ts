import { Category } from '../types'

export const deepEcosystemCategory: Category = {
  id: 'deep-ecosystem',
  name: 'Environment & Ecosystem',
  icon: '🌍',
  description: 'การจัดการค่าตัวแปรสภาพแวดล้อม (Env), ระบบยืนยันตัวตน และการทดสอบระบบ',
  commands: [
    {
      id: 'env-vars',
      name: 'Environment Variables',
      description: 'วิธีเก็บค่าความลับต่างๆ โดย Next.js แยกออกเป็นแบบที่ Client เห็นได้ กับฝั่ง Server เท่านั้น',
      syntax: 'process.env.SECRET / NEXT_PUBLIC_SECRET',
      examples: [
        {
          title: 'การอ่านค่าจากไฟล์ .env.local',
          language: 'text',
          code: `# .env.local (อย่า push ไฟล์นี้ขึ้น Git)

# 1. ตัวแปรฝั่ง Server (มีแค่ Server เท่านั้นที่มองเห็น)
DATABASE_URL="postgres://user:password@localhost/db"

# 2. ตัวแปรฝั่ง Client (ขึ้นต้นด้วย NEXT_PUBLIC_ เสมอ)
# เบราว์เซอร์ของผู้ใช้จะสามารถอ่านค่านี้ได้ (ใช้สำหรับ Public API Key)
NEXT_PUBLIC_ANALYTICS_ID="UA-12345678-9"`
        },
        {
          title: 'การเรียกใช้งานในโค้ด',
          language: 'tsx',
          code: `export default function Page() {
  // รันบน Server ใช้งานได้ปกติ
  const dbUrl = process.env.DATABASE_URL 
  
  // รันบน Client Component ต้องเป็น NEXT_PUBLIC_ เท่านั้น
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID
  
  return <div>...</div>
}`
        }
      ]
    },
    {
      id: 'authentication',
      name: 'Authentication',
      description: 'การทำระบบ Login ใน Next.js แนะนำให้ใช้ Library ยอดนิยมอย่าง Auth.js (ชื่อเดิม NextAuth.js)',
      syntax: 'import NextAuth from "next-auth"',
      examples: [
        {
          title: 'การป้องกันหน้าเว็บ (Middleware)',
          language: 'typescript',
          code: `// middleware.ts (วางไว้ข้างนอกโฟลเดอร์ app)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // ดึงคุกกี้เซสชั่น
  const session = request.cookies.get('session')
  
  if (!session) {
    // ถ้ายังไม่ได้ล็อกอิน ให้เด้งกลับไปหน้า login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
 
// กำหนดว่า Middleware นี้จะทำงานกับ Path ไหนบ้าง
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}`
        }
      ]
    },
    {
      id: 'testing',
      name: 'Testing',
      description: 'ระบบการทดสอบรองรับทั้ง Jest (Unit Testing), React Testing Library (Component Testing) และ Cypress / Playwright (E2E Testing)',
      syntax: 'npm run test',
      examples: [
        {
          title: 'การเขียน Unit Test ของ Component (Jest)',
          language: 'tsx',
          code: `import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    // เรนเดอร์หน้าเว็บ
    render(<Page />)
    
    // ค้นหาข้อความ
    const heading = screen.getByRole('heading', { level: 1 })
    
    // ตรวจสอบ
    expect(heading).toBeInTheDocument()
  })
})`
        }
      ]
    }
  ]
}
