import { Category } from '../types';

export const hooksCoreCategory: Category = {
  id: 'hooks-core',
  name: 'Core Hooks & Custom Hooks',
  icon: '🪝',
  description: 'Hooks พื้นฐานที่ใช้บ่อยที่สุด และการสร้าง Custom Hook เพื่อ Reuse Logic',
  commands: [
    {
      id: 'use-state',
      name: 'useState()',
      description: 'สร้างและจัดการข้อมูล State ภายใน Component',
      syntax: 'const [state, setState] = useState(initialState)',
      examples: [
        {
          title: 'Functional Update (แก้ปัญหา State เก่าไม่ซิงค์)',
          code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleAsyncUpdate = () => {
    setTimeout(() => {
      // ❌ ผิด: อ้างอิงจากตัวแปร count รอบแรก (Stale state)
      // setCount(count + 1); 
      
      // ✅ ถูก: ใช้ callback function เสมอถ้า state ใหม่ขึ้นอยู่กับค่าเดิม
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  };

  return <button onClick={handleAsyncUpdate}>เพิ่มค่าแบบหน่วงเวลา ({count})</button>;
}`,
          language: 'typescript'
        }
      ],
      notes: '🔥 ข้อควรจำ: ถ้า state ใหม่ ต้องคำนวณจาก state เก่า ให้ส่งฟังก์ชันเข้าไปใน setState เสมอ'
    },
    {
      id: 'use-effect',
      name: 'useEffect()',
      description: 'จัดการ Side effects (เช่น fetch, event listener) พร้อม Cleanup และระวัง Stale Closure',
      syntax: 'useEffect(() => { ... return cleanup }, [deps])',
      examples: [
        {
          title: 'Dependency Array และ Cleanup Function',
          code: `import { useState, useEffect } from 'react';

function Timer({ delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // โค้ดนี้จะรันทุกครั้งที่ \`delay\` เปลี่ยน
    const intervalId = setInterval(() => {
      setCount(c => c + 1); 
      // ⚠️ ถ้าเราใช้ setCount(count + 1) ตรงนี้โดยไม่ใส่ \`count\` ใน deps 
      // มันจะเป็น "Stale Closure" (เห็น count เป็น 0 ตลอดไป)
    }, delay);
      
    // 🧹 Cleanup Function: จะรันก่อนที่ Effect รอบถัดไปจะทำงาน 
    // หรือเมื่อ Component นี้โดนถอดออกจากหน้าจอ (Unmount)
    return () => clearInterval(intervalId);
    
  }, [delay]); // ต้องระบุสิ่งที่ Effect นี้พึ่งพาให้ครบ

  return <p>เวลา: {count}</p>;
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'use-context',
      name: 'useContext()',
      description: 'ดึงข้อมูลจาก Context API แต่ต้องระวังปัญหา Performance',
      syntax: 'const value = useContext(MyContext)',
      examples: [
        {
          title: 'วิธีแก้ปัญหา Re-render รัวๆ',
          code: `// ⚠️ Performance Pitfall: Component ทุกตัวที่เรียกใช้ useContext(UserContext) 
// จะโดนบังคับ Re-render ทันทีที่ค่าใน Context เปลี่ยน!

// ✅ วิธีแก้ที่ดีที่สุด: "แยก Context ออกจากกัน"
// เช่น แยก Data (ที่เปลี่ยนบ่อย) กับ Actions (ที่ไม่ค่อยเปลี่ยน)
const UserDataContext = createContext(null);
const UserActionsContext = createContext(null);

function EditButton() {
  // ดึงมาแค่ Actions พอกดแล้วเปลี่ยนชื่อได้ 
  // Component นี้จะไม่ Re-render เวลามีคนอื่นถูกเปลี่ยนชื่อ!
  const { setName } = useContext(UserActionsContext);
  return <button onClick={() => setName('Alice')}>เปลี่ยนชื่อ</button>;
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'use-ref',
      name: 'useRef()',
      description: 'เก็บค่าที่เปลี่ยนแล้ว "ไม่ทำให้เกิดการ Re-render" หรือใช้อ้างอิง DOM Element ตรงๆ',
      syntax: 'const ref = useRef(initialValue)',
      examples: [
        {
          title: 'อ้างอิง DOM (Focus Input)',
          code: `function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    // เข้าถึง DOM ธรรมชาติโดยตรง
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>กดเพื่อ Focus</button>
    </>
  );
}`,
          language: 'typescript'
        },
        {
          title: 'เก็บค่า (Mutable Variable)',
          code: `function Timer() {
  // เก็บค่า timerId โดยที่เวลามันเปลี่ยน หน้าเว็บจะไม่ Re-render กระตุก
  const timerId = useRef(null);

  const start = () => timerId.current = setInterval(() => console.log('tic'), 1000);
  const stop = () => clearInterval(timerId.current);

  return <button onClick={stop}>Stop</button>;
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'use-reducer',
      name: 'useReducer()',
      description: 'จัดการ State ที่ซับซ้อน หรือมีหลาย Action (คล้าย Mini-Redux)',
      syntax: 'const [state, dispatch] = useReducer(reducer, initialState)',
      examples: [
        {
          title: 'จัดการ Logic จำนวนมากให้อยู่ที่เดียว',
          code: `function formReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME': return { ...state, name: action.payload };
    case 'SET_AGE': return { ...state, age: action.payload };
    case 'RESET': return { name: '', age: 0 };
    default: return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, { name: '', age: 0 });

  return (
    <>
      <input 
        value={state.name} 
        onChange={e => dispatch({ type: 'SET_NAME', payload: e.target.value })} 
      />
      <button onClick={() => dispatch({ type: 'RESET' })}>ล้างค่า</button>
    </>
  );
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'custom-hooks',
      name: 'Custom Hooks (useXxx)',
      description: 'ดึง Logic ของ State และ Effect ออกมาเขียนแยกเพื่อนำไปใช้ซ้ำ',
      syntax: 'function useMyLogic() { return data; }',
      examples: [
        {
          title: 'การสร้าง Hook ใช้เอง',
          code: `// นิยมขึ้นต้นด้วยคำว่า "use" เพื่อให้ React รู้ว่าเป็น Hook
import { useState, useEffect } from 'react';

export function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width; // คืนค่ากลับไปให้ Component อื่นใช้
}

// วิธีเอาไปใช้
function MyComponent() {
  const width = useWindowWidth();
  return <p>หน้าจอคุณกว้าง: {width}px</p>;
}`,
          language: 'typescript'
        }
      ]
    }
  ]
};
