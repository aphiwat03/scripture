import { Category } from '../types'

export const functionsCategory: Category = {
  id: 'functions',
  name: 'Functions',
  icon: '⚙️',
  description: 'ฟังก์ชันอำนวยความสะดวกสำหรับใช้งานใน Server และ Client Components',
  commands: [
    {
      id: 'redirect',
      name: 'redirect()',
      description: 'สลับไปยัง URL หรือเส้นทางอื่นจากฝั่ง Server',
      syntax: 'import { redirect } from "next/navigation"',
      examples: [
        {
          title: 'สลับเส้นทางหลังจากตรวจสอบสิทธิ์',
          language: 'tsx',
          code: `import { redirect } from 'next/navigation'
import { verifyAuth } from '@/lib/auth'
 
export default async function DashboardPage() {
  const session = await verifyAuth()
  
  if (!session) {
    // ถ้ายังไม่ล็อกอิน ให้กระโดดไปหน้าเข้าสู่ระบบ (สเตตัสโค้ด 307 ชั่วคราว)
    redirect('/login')
  }
  
  return <h1>ยินดีต้อนรับกลับมา</h1>
}`
        }
      ]
    },
    {
      id: 'not-found-fn',
      name: 'notFound()',
      description: 'เรียกหน้า 404 (Not Found) ด้วยตนเองเพื่อหยุดการทำงานและคืนค่าเป็นหน้า not-found.tsx',
      syntax: 'import { notFound } from "next/navigation"',
      examples: [
        {
          title: 'แสดงหน้า 404 เมื่อไม่มีข้อมูล',
          language: 'tsx',
          code: `import { notFound } from 'next/navigation'
 
export default async function UserProfile({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const user = await fetchUser(id)
  
  if (!user) {
    // โยนข้อผิดพลาด NotFound เพื่อเรียก not-found.tsx ให้ออกมาทำงาน
    notFound()
  }
  
  return <h1>ผู้ใช้: {user.name}</h1>
}`
        }
      ]
    },
    {
      id: 'use-router',
      name: 'useRouter()',
      description: 'ใช้สำหรับควบคุมการนำทางใน Client Components ผ่าน JavaScript',
      syntax: 'import { useRouter } from "next/navigation"',
      notes: '⚠️ ฟังก์ชันนี้ต้องทำงานในฝั่ง client เท่านั้น จึงต้องระบุ "use client" เสมอ',
      examples: [
        {
          title: 'เปลี่ยนหน้าเมื่อคลิกปุ่ม',
          language: 'tsx',
          code: `'use client' // ต้องเป็น Client Component
 
import { useRouter } from 'next/navigation'
 
export default function SubmitButton() {
  const router = useRouter()
 
  const handleSubmit = async () => {
    await submitForm()
    
    // ย้ายไปหน้า dashboard
    router.push('/dashboard')
    
    // สำหรับการย้อนกลับหน้าก่อนหน้า:
    // router.back()
    
    // สำหรับเปลี่ยนหน้าโดยไม่เพิ่มลงใน history stack:
    // router.replace('/login')
  }
 
  return (
    <button onClick={handleSubmit}>บันทึกข้อมูล</button>
  )
}`
        }
      ]
    },
    {
      id: 'use-pathname',
      name: 'usePathname()',
      description: 'ดึงเอา URL Pathname ปัจจุบันมาใช้งานใน Client Components',
      syntax: 'import { usePathname } from "next/navigation"',
      notes: '⚠️ ต้องใช้งานคู่กับ "use client"',
      examples: [
        {
          title: 'ระบุลิงก์ที่ถูกเลือกในแถบนำทาง (Active Link)',
          language: 'tsx',
          code: `'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function NavLinks() {
  const pathname = usePathname()
 
  return (
    <nav>
      <Link 
        href="/dashboard"
        className={pathname === '/dashboard' ? 'text-blue-500 font-bold' : ''}
      >
        แดชบอร์ด
      </Link>
      <Link 
        href="/settings"
        className={pathname === '/settings' ? 'text-blue-500 font-bold' : ''}
      >
        ตั้งค่า
      </Link>
    </nav>
  )
}`
        }
      ]
    },
    {
      id: 'use-search-params',
      name: 'useSearchParams()',
      description: 'ใช้อ่านค่า Query Parameter (ที่อยู่หลังเครื่องหมาย ?) ใน Client Components',
      syntax: 'import { useSearchParams } from "next/navigation"',
      notes: '⚠️ ต้องใช้งานคู่กับ "use client"',
      examples: [
        {
          title: 'อ่านพารามิเตอร์การค้นหาแบบง่ายๆ',
          language: 'tsx',
          code: `'use client'
 
import { useSearchParams } from 'next/navigation'
 
export default function SearchBar() {
  const searchParams = useSearchParams()
  
  // อ่านค่า ?query=hello
  const query = searchParams.get('query')
  
  // ตรวจสอบว่ามีพารามิเตอร์นี้หรือไม่ ?page=2
  const hasPage = searchParams.has('page')
 
  return (
    <div>
      <p>คุณกำลังค้นหา: {query ?? 'ไม่ได้ระบุ'}</p>
    </div>
  )
}`
        }
      ]
    }
  ]
}
