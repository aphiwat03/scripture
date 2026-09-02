import { Category } from '../types';

export const apiFormsCategory: Category = {
  id: 'api-forms',
  name: 'API & Form Management',
  icon: '📡',
  description: 'การเชื่อมต่อ API อย่างมืออาชีพ (React Query) และการจัดการ Form (React Hook Form)',
  commands: [
    {
      id: 'react-query',
      name: 'TanStack Query (React Query)',
      description: 'มาตรฐานการจัดการ API Data ฝั่ง Client (มีระบบ Cache, Retry, Background Fetch ให้ครบ)',
      syntax: 'const { data } = useQuery(...)',
      examples: [
        {
          title: 'บอกลา useEffect + fetch',
          language: 'typescript',
          code: `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function UserProfile() {
  // ไม่ต้องเขียน State Loading/Error เองอีกต่อไป!
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', 1], // คีย์สำหรับ Cache
    queryFn: async () => {
      const res = await axios.get('/api/users/1');
      return res.data;
    }
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return <div>สวัสดี {data.name}</div>;
}`
        }
      ],
      notes: 'ใช้แพทเทิร์น Stale-While-Revalidate คือแสดงของเก่าจาก Cache ไปก่อน แล้วแอบไปดึงข้อมูลใหม่มาอัปเดตเบื้องหลัง (UI จะดูลื่นไหลมาก)'
    },
    {
      id: 'controlled-uncontrolled',
      name: 'Controlled vs Uncontrolled Forms',
      description: 'วิธีพื้นฐานที่ React จัดการฟอร์ม 2 แบบหลัก',
      syntax: 'useState vs useRef',
      examples: [
        {
          title: 'ความแตกต่าง',
          language: 'typescript',
          code: `// 1. Controlled (ใช้ useState): React รู้ค่าที่พิมพ์ตลอดเวลา
// ⚠️ ข้อเสีย: พิมพ์ 1 ตัวอักษร Component โดน Re-render 1 ครั้ง
const [text, setText] = useState("");
<input value={text} onChange={(e) => setText(e.target.value)} />

// 2. Uncontrolled (ใช้ useRef): ปล่อยให้ DOM จัดการเอง ค่อยดึงค่าตอนกด Submit
// ✅ ข้อดี: ไม่ Re-render ประหยัดทรัพยากร
const inputRef = useRef(null);
<input ref={inputRef} />
// ตอน submit ค่อยเรียก inputRef.current.value`
        }
      ]
    },
    {
      id: 'react-hook-form',
      name: 'React Hook Form',
      description: 'ไลบรารีจัดการ Form ที่ดีที่สุดในปัจจุบัน (Performance สูงมากเพราะใช้ Uncontrolled components เบื้องหลัง)',
      syntax: 'const { register, handleSubmit } = useForm()',
      examples: [
        {
          title: 'การใช้งาน React Hook Form พื้นฐาน',
          language: 'typescript',
          code: `import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ใช้ register เพื่อผูก Input เข้ากับระบบ โดยไม่ต้องมี onChange/value */}
      <input 
        {...register("email", { required: "กรุณากรอกอีเมล" })} 
        placeholder="Email" 
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input {...register("password")} type="password" placeholder="Password" />
      
      <button type="submit">Login</button>
    </form>
  );
}`
        }
      ]
    },
    {
      id: 'zod-validation',
      name: 'Zod (Schema Validation)',
      description: 'ไลบรารีตรวจสอบความถูกต้องของข้อมูล (Validation) มักใช้คู่กับ React Hook Form เพื่อทำ Type-safety',
      syntax: 'z.object({ ... })',
      examples: [
        {
          title: 'ประกอบร่าง React Hook Form + Zod',
          language: 'typescript',
          code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. กำหนดกฎเกณฑ์ (Schema)
const schema = z.object({
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
});

// Infer TypeScript type ออกมาจาก Schema ได้เลย (โคตรเจ๋ง!)
type FormData = z.infer<typeof schema>;

function App() {
  // 2. เอา Schema ไปผูกกับ Form
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => console.log(data.email);
  // ... ส่วน Render ฟอร์มตามปกติ
}`
        }
      ],
      notes: 'สูตรสำเร็จระดับ Enterprise ในปัจจุบันคือ: React Hook Form + Zod + React Query'
    }
  ]
};
