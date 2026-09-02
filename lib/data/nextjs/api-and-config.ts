import { Category } from '../types'

export const apiConfigCategory: Category = {
  id: 'api-and-config',
  name: 'API Routes & Config',
  icon: '⚙️',
  description: 'การสร้าง API ของตัวเอง (Route Handlers) และการตั้งค่า Config (Proxy/Rewrites)',
  commands: [
    {
      id: 'route-handlers',
      name: 'Route Handlers (สร้าง API)',
      description: 'ใช้สร้าง Web API (REST) เพื่อให้ฝั่ง Client (หรือแอปภายนอก) เรียกใช้ โดยสร้างไฟล์ชื่อ \`route.ts\` ในโฟลเดอร์ \`app/api/...\`',
      syntax: 'export async function GET(request: Request)',
      examples: [
        {
          title: 'สร้าง API แบบ GET',
          language: 'typescript',
          code: `// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // อ่านค่าจาก URLSearchParams
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  const users = [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }]
  
  return NextResponse.json({ users }, { status: 200 })
}`
        },
        {
          title: 'สร้าง API แบบ POST',
          language: 'typescript',
          code: `export async function POST(request: Request) {
  // ดึง body ของ request
  const body = await request.json()
  
  // ทำอะไรสักอย่าง...
  console.log(body.name)
  
  return NextResponse.json({ success: true, user: body })
}`
        }
      ],
      notes: 'ฟังก์ชันรองรับชื่อตาม HTTP Method เลย: GET, POST, PUT, PATCH, DELETE, HEAD, และ OPTIONS'
    },
    {
      id: 'proxy-rewrites',
      name: 'Proxy & Rewrites',
      description: 'บางครั้งเราต้องการซ่อน URL ของ API ภายนอก หรือแก้ปัญหา CORS เราสามารถตั้งค่า Rewrite ใน \`next.config.ts\` เพื่อให้ Next.js ทำตัวเป็น Proxy ส่ง Request ไปให้อัตโนมัติ',
      syntax: 'async rewrites() { return [{ source, destination }] }',
      examples: [
        {
          title: 'การตั้งค่า Proxy (Rewrites)',
          language: 'typescript',
          code: `// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // เมื่อ User เรียกเว็บเราที่ /api/backend/:path*
        source: '/api/backend/:path*',
        // ระบบจะทำ Proxy ยิง Request ไปที่เว็บอื่นให้อย่างแนบเนียน (แก้ปัญหา CORS ได้)
        destination: 'https://real-api-server.com/:path*',
      },
    ]
  },
  
  // ตัวอย่างแถม: Redirect (ย้ายหน้าเว็บ)
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // HTTP 301
      },
    ]
  },
}

export default nextConfig`
        }
      ],
      notes: 'แตกต่างจาก Redirects ตรงที่ Rewrites จะไม่ทำการเปลี่ยน URL ในช่อง Address bar ของเบราว์เซอร์ผู้ใช้ แต่แอบส่งข้อมูลไปมาเบื้องหลัง'
    }
  ]
}
