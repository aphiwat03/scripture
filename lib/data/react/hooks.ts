import { Category } from '../types';

export const hooksCategory: Category = {
  id: 'hooks',
  name: 'React Hooks',
  icon: '🪝',
  description: 'ฟังก์ชันพื้นฐานสำหรับจัดการ State และ Lifecycle ใน Functional Component',
  commands: [
    {
      id: 'use-state',
      name: 'useState()',
      description: 'สร้างและจัดการข้อมูล State ภายใน Component',
      syntax: 'const [state, setState] = useState(initialState)',
      examples: [
        {
          title: 'ตัวอย่างการสร้าง Counter เบื้องต้น',
          code: `import { useState } from 'react';

function Counter() {
  // สร้าง state ชื่อ count เริ่มต้นที่ 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>คุณกดปุ่มไปแล้ว {count} ครั้ง</p>
      <button onClick={() => setCount(count + 1)}>
        คลิกเลย!
      </button>
    </div>
  );
}`
        }
      ]
    },
    {
      id: 'use-effect',
      name: 'useEffect()',
      description: 'จัดการ Side effects (เช่น fetch ข้อมูล, ตั้งเวลา, ดัก event)',
      syntax: 'useEffect(() => { ... }, [dependencies])',
      examples: [
        {
          title: 'ดึงข้อมูลเมื่อ Component ถูกเรนเดอร์ครั้งแรก',
          code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // จะทำงานเมื่อ userId เปลี่ยนแปลง
    fetch(\`https://api.example.com/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
      
    return () => {
      // ทำความสะอาด (cleanup) เมื่อ component ถูกทำลายหรือก่อนเริ่ม effect ครั้งใหม่
    };
  }, [userId]); // dependencies array

  if (!user) return <p>กำลังโหลด...</p>;
  return <div>สวัสดี, {user.name}</div>;
}`
        }
      ]
    },
    {
      id: 'use-context',
      name: 'useContext()',
      description: 'ดึงข้อมูลจาก Context API มาใช้งานโดยไม่ต้องส่ง Props ลงมาทีละชั้น',
      syntax: 'const value = useContext(MyContext)',
      examples: [
        {
          title: 'ใช้งานข้อมูล Theme ข้าม Component',
          code: `import { createContext, useContext } from 'react';

// 1. สร้าง Context
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  // 2. ดึงค่ามาใช้
  const theme = useContext(ThemeContext);
  return <button className={theme}>ปุ่มนี้ใช้ธีม {theme}</button>;
}`
        }
      ]
    },
    {
      id: 'use-memo',
      name: 'useMemo()',
      description: 'จดจำค่าจากการคำนวณที่ซับซ้อน เพื่อลดการประมวลผลซ้ำ',
      syntax: 'const cachedValue = useMemo(() => calculateValue(a, b), [a, b])',
      examples: [
        {
          title: 'แคชผลลัพธ์การคำนวณราคา',
          code: `import { useMemo } from 'react';

function Cart({ items, taxRate }) {
  // จะคำนวณใหม่เมื่อ items หรือ taxRate เปลี่ยนเท่านั้น
  const total = useMemo(() => {
    console.log('กำลังคำนวณยอดรวม...');
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    return subtotal * (1 + taxRate);
  }, [items, taxRate]);

  return <p>ยอดรวมทั้งหมด: {total} บาท</p>;
}`
        }
      ]
    },
    {
      id: 'use-callback',
      name: 'useCallback()',
      description: 'จดจำฟังก์ชันเพื่อไม่ให้ถูกสร้างใหม่ทุกครั้งที่เรนเดอร์',
      syntax: 'const cachedFn = useCallback(() => { doSomething(a, b); }, [a, b])',
      examples: [
        {
          title: 'ส่งฟังก์ชันไปให้ Child Component',
          code: `import { useState, useCallback } from 'react';

function Parent() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  // Child component จะไม่เรนเดอร์ใหม่เวลาพิมพ์ข้อความ
  // เพราะฟังก์ชันนี้ถูกจำไว้ (อ้างอิงเดิม)
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <Child onIncrement={handleIncrement} />
      <p>Count: {count}</p>
    </div>
  );
}`
        }
      ]
    }
  ]
};
