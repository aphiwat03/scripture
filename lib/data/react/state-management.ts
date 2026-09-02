import { Category } from '../types';

export const stateManagementCategory: Category = {
  id: 'state-management',
  name: 'Global State Management',
  icon: '📦',
  description: 'การจัดการ State ส่วนกลางของแอปพลิเคชัน (Zustand, Redux Toolkit, Context)',
  commands: [
    {
      id: 'context-api',
      name: 'Context API (Built-in)',
      description: 'วิธีพื้นฐานที่ติดมากับ React เหมาะสำหรับข้อมูลที่ไม่ค่อยเปลี่ยนแปลง (เช่น Theme, ภาษา)',
      syntax: 'createContext() + useContext()',
      examples: [
        {
          title: 'ข้อจำกัดของ Context',
          language: 'text',
          code: `ข้อดี: ไม่ต้องลงไลบรารีเพิ่ม
ข้อเสีย: เมื่อค่าใน Context เปลี่ยน Component ทุกตัวที่เรียกใช้จะ Re-render ทันที (Performance Drop)
คำแนะนำ: ไม่เหมาะกับ State ที่เปลี่ยนบ่อยๆ (เช่น ข้อมูลฟอร์ม, ตัวอักษรที่กำลังพิมพ์)`
        }
      ]
    },
    {
      id: 'zustand',
      name: 'Zustand (ยอดนิยมยุคใหม่)',
      description: 'จัดการ State ที่ง่าย เบา และไม่ต้องใช้ <Provider> ครอบแอปพลิเคชัน',
      syntax: 'create((set) => ({ ... }))',
      examples: [
        {
          title: 'การสร้างและใช้งาน Zustand',
          language: 'typescript',
          code: `import { create } from 'zustand';

// 1. สร้าง Store (คล้ายๆ ตัวแปร Global)
const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// 2. ดึงมาใช้ใน Component ไหนก็ได้! (ไม่ต้องมี Provider)
function BearCounter() {
  // ดึงเฉพาะตัวแปร bears (ถ้าอย่างอื่นเปลี่ยน Component นี้จะไม่ Re-render)
  const bears = useBearStore((state) => state.bears);
  return <h1>หมี {bears} ตัว</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>เพิ่มหมี</button>;
}`
        }
      ],
      notes: 'Zustand เป็นตัวเลือกที่คนเขียน React/Next.js ยุคใหม่นิยมที่สุด เพราะโค้ดสั้นและแก้ปัญหา Re-render ได้ดีมาก'
    },
    {
      id: 'redux-toolkit',
      name: 'Redux Toolkit (RTK)',
      description: 'มาตรฐานวงการ (Enterprise Standard) สำหรับแอประดับใหญ่ที่มีความซับซ้อนสูง',
      syntax: 'configureStore() + createSlice()',
      examples: [
        {
          title: 'การใช้งาน Redux Toolkit พื้นฐาน',
          language: 'typescript',
          code: `import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// 1. สร้าง Slice (รวม State และ Reducer)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
  },
});

// 2. สร้าง Store
const store = configureStore({ reducer: { counter: counterSlice.reducer } });

// 3. ใช้งานใน Component (ต้องมี <Provider store={store}> ครอบ App ด้วย)
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(counterSlice.actions.increment())}>{count}</button>;
}`
        }
      ],
      notes: 'ปัจจุบัน Redux แนะนำให้เขียนผ่าน Redux Toolkit (RTK) เท่านั้น เพื่อลดความซ้ำซ้อนของโค้ดแบบเก่า'
    },
    {
      id: 'jotai',
      name: 'Jotai / Recoil (Atomic State)',
      description: 'จัดการ State แบบอะตอม (แยกย่อยเป็นชิ้นเล็กๆ) เหมาะกับแอปที่มี UI ซับซ้อนและพึ่งพากันเยอะ (เช่น แอปวาดรูป, กราฟ)',
      syntax: 'const atom = atom(0)',
      examples: [
        {
          title: 'การใช้งาน Jotai',
          language: 'typescript',
          code: `import { atom, useAtom } from 'jotai';

// สร้าง Atom อะตอม (ชิ้นส่วน State เล็กๆ)
const countAtom = atom(0);

function Counter() {
  // ใช้งานเหมือน useState เป๊ะๆ! แค่แชร์ค่าให้ Component อื่นได้
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`
        }
      ]
    }
  ]
};
