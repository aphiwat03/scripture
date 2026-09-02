import { Category } from '../types'

export const deepActionsCategory: Category = {
  id: 'deep-actions',
  name: 'Server Actions & Forms',
  icon: '⚡',
  description: 'การจัดการ Form สมัยใหม่ด้วย Server Actions และ React 19 Hooks',
  commands: [
    {
      id: 'server-actions-deep',
      name: 'Server Actions (เจาะลึก)',
      description: 'ฟังก์ชัน Server ที่เรียกจาก Client ได้ สามารถรับค่าซ่อนเร้น (Hidden Arguments) ผ่านฟังก์ชัน .bind() ได้',
      syntax: 'const actionWithId = updatePost.bind(null, postId)',
      examples: [
        {
          title: 'การผูกค่า Parameter ล่วงหน้า',
          language: 'tsx',
          code: `import { updatePost } from './actions'

export function EditButton({ postId }) {
  // บังคับแนบ postId ไปกับ Action เสมอ (ไม่ต้องใส่ input type="hidden")
  const updateWithId = updatePost.bind(null, postId)
  
  return (
    <form action={updateWithId}>
      <input type="text" name="title" />
      <button type="submit">Update</button>
    </form>
  )
}`
        }
      ]
    },
    {
      id: 'forms-react-19',
      name: 'Forms (React 19 Hooks)',
      description: 'Next.js 15 แนะนำให้ใช้ React Hooks ตัวใหม่สำหรับจัดการสถานะของฟอร์ม (Form State) ที่รันผ่าน Server Actions',
      syntax: 'useActionState / useFormStatus',
      examples: [
        {
          title: 'การใช้ useActionState (รับข้อความ Error กลับมา)',
          language: 'tsx',
          code: `'use client'
import { useActionState } from 'react'
import { createPost } from './actions' // ส่งกลับมาเป็น { message: '...' }

export function PostForm() {
  // state เก็บค่าที่ Server ตอบกลับมา, action คือตัวที่เราจะเอาไปใส่ใน form
  const [state, formAction, isPending] = useActionState(createPost, { message: '' })

  return (
    <form action={formAction}>
      <input type="text" name="title" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'กำลังบันทึก...' : 'บันทึก'}
      </button>
      
      {/* แสดงข้อความแจ้งเตือน */}
      {state.message && <p>{state.message}</p>}
    </form>
  )
}`
        },
        {
          title: 'การแยกปุ่ม Submit (useFormStatus)',
          language: 'tsx',
          code: `'use client'
import { useFormStatus } from 'react-dom'

// ต้องแยก Component ออกมา เพื่อให้อยู่ภายใต้ <form>
function SubmitButton() {
  // ดึงสถานะ pending ของฟอร์มที่ครอบมันอยู่
  const { pending } = useFormStatus()
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  )
}`
        }
      ]
    },
    {
      id: 'data-security',
      name: 'Data Security (Taint API)',
      description: 'ป้องกันข้อมูลลับ (เช่น รหัสผ่าน) รั่วไหลจากการส่ง Server Object ไปยัง Client Component โดยไม่ตั้งใจ (ยังเป็น Experimental)',
      syntax: 'experimental_taintObjectReference',
      examples: [
        {
          title: 'การฝังระเบิด (Taint) ป้องกันข้อมูลหลุด',
          language: 'tsx',
          code: `import { experimental_taintObjectReference } from 'react'

export async function getUser(id: string) {
  const user = await db.user.findById(id)
  
  // ประกาศว่าก้อนข้อมูล user นี้ ห้ามหลุดไปฝั่ง Client เด็ดขาด!
  experimental_taintObjectReference(
    'ห้ามส่งข้อมูล User Object ไป Client ทื่อๆ เพราะมี Hash Password อยู่!',
    user
  )
  
  return user
}

// หากเผลอเอาไปโยนใส่: <ClientComponent user={user} />
// ระบบจะฟ้อง Error ข้อความที่เราเขียนไว้ทันที (ป้องกันความสะเพร่า)`
        }
      ]
    }
  ]
}
