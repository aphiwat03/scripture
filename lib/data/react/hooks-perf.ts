import { Category } from '../types';

export const hooksPerfCategory: Category = {
  id: 'hooks-perf',
  name: 'Performance & React 19',
  icon: '⚡',
  description: 'Hooks สำหรับเพิ่มประสิทธิภาพ (Performance) และ Hooks ใหม่ใน React 18/19',
  commands: [
    {
      id: 'use-memo-callback',
      name: 'useMemo & useCallback',
      description: 'จดจำค่าที่คำนวณและฟังก์ชัน (แต่ใน React 19 จะมี React Compiler มาทำให้อัตโนมัติ)',
      syntax: 'useMemo(() => value, [deps]), useCallback(() => fn, [deps])',
      examples: [
        {
          title: 'อนาคตของ Memoization (React 19)',
          code: `// 💡 ในอดีต: ต้องเขียนครอบเองยาวๆ กัน Re-render
const cachedValue = useMemo(() => heavyMath(a, b), [a, b]);
const cachedFn = useCallback(() => onSubmit(data), [data]);

// 🚀 ใน React 19 (React Compiler):
// คุณแทบจะไม่ต้องเขียน useMemo และ useCallback อีกต่อไป! 
// Compiler จะวิเคราะห์โค้ดและจดจำ (Memoize) ให้อัตโนมัติเบื้องหลัง 
// เขียนแค่โค้ดธรรมดาก็เร็วแล้ว`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'use-transition',
      name: 'useTransition() (React 18)',
      description: 'จัดลำดับความสำคัญของอัปเดต (บอกว่า State นี้ "ไม่เร่งด่วน") ทำให้ UI ไม่กระตุกเวลาประมวลผลหนักๆ',
      syntax: 'const [isPending, startTransition] = useTransition()',
      examples: [
        {
          title: 'ทำ UI Search ที่พิมพ์ได้ลื่นไหล',
          code: `import { useState, useTransition } from 'react';

function SearchInput() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // 1. งานด่วน (พิมพ์ปุ๊บ ข้อความต้องขึ้นปั๊บ)
    setText(e.target.value);
    
    // 2. งานไม่ด่วน (รัน Filter ข้อมูลเป็นหมื่นรายการ)
    // การครอบด้วย startTransition ทำให้บราวเซอร์รู้ว่า "ให้พักไปวาด UI ตอนพิมพ์ก่อน ค่อยแอบทำอันนี้ทีหลัง"
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  return (
    <div>
      <input value={text} onChange={handleChange} />
      {isPending ? <p>กำลังหาข้อมูล...</p> : <SlowList query={query} />}
    </div>
  );
}`,
          language: 'typescript'
        }
      ],
      notes: 'ใช้บ่อยมากใน Next.js Server Actions หรือการทำ Search Filter'
    },
    {
      id: 'use-deferred-value',
      name: 'useDeferredValue() (React 18)',
      description: 'รับค่า "เวอร์ชันเก่า" ไปแสดงก่อน จนกว่าคอมจะว่างพอประมวลผลค่าใหม่ (คล้ายๆ Built-in Debounce)',
      syntax: 'const deferredValue = useDeferredValue(value)',
      examples: [
        {
          title: 'หน่วงการแสดงผล List ที่หนัก',
          code: `import { useState, useDeferredValue } from 'react';

function App() {
  const [text, setText] = useState('');
  
  // deferredText จะตามหลัง text อยู่ 1 ก้าวเสมอถ้าคอมกำลังประมวลผลหนักๆ
  const deferredText = useDeferredValue(text);

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* component นี้จะอัปเดตช้ากว่า input เล็กน้อย เพื่อไม่ให้พิมพ์แล้วหน่วง */}
      <SlowList text={deferredText} />
    </>
  );
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'use-optimistic',
      name: 'useOptimistic() (React 19)',
      description: 'อัปเดต UI ทันทีล่วงหน้า (โลกสวย) ก่อนที่ Server จะตอบกลับจริงว่าสำเร็จไหม',
      syntax: 'const [optimisticState, addOptimistic] = useOptimistic(state, updateFn)',
      examples: [
        {
          title: 'กด Like แบบขึ้นทันที',
          code: `import { useOptimistic } from 'react';

function LikeButton({ likes, serverAction }) {
  // สั่งให้เพิ่ม likes ไปก่อนเลย +1
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes, 
    (currentLikes, amount) => currentLikes + amount
  );

  return (
    <form action={async (formData) => {
      addOptimisticLike(1); // 1. โชว์เลขเพิ่มทันที
      await serverAction(); // 2. ค่อยส่งไปยันยันที่ Server จริงๆ
    }}>
      <button type="submit">❤️ {optimisticLikes}</button>
    </form>
  );
}`,
          language: 'typescript'
        }
      ],
      notes: 'คู่หูตัวสำคัญของ Next.js Server Actions เวลาทำ Form'
    },
    {
      id: 'use',
      name: 'use() (React 19)',
      description: 'อ่านค่าจาก Promise หรือ Context โดยตรงได้แม้จะอยู่ใน if หรือ loop (ลบข้อจำกัดเดิมของ Hook ทิ้งไป)',
      syntax: 'const data = use(Promise)',
      examples: [
        {
          title: 'ดึงข้อมูลแบบไม่ต้องใช้ useEffect',
          code: `import { use, Suspense } from 'react';

// โยน Promise ดิบๆ เข้ามา
function Message({ messagePromise }) {
  // 😲 อ่านค่า Promise โต้งๆ ได้เลย! ถ้ายังไม่เสร็จ มันจะหยุดรอ (Suspend) ไปเข้า <Suspense> ข้างนอกเอง
  const message = use(messagePromise);
  
  return <p>{message}</p>;
}

export default function App() {
  const promise = fetch('/api/msg').then(res => res.json());
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Message messagePromise={promise} />
    </Suspense>
  );
}`,
          language: 'typescript'
        }
      ]
    }
  ]
};
