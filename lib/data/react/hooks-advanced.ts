import { Category } from '../types';

export const hooksAdvancedCategory: Category = {
  id: 'hooks-advanced',
  name: 'Advanced & DOM Hooks',
  icon: '🛠️',
  description: 'Hooks ขั้นสูงสำหรับจัดการ DOM ธรรมชาติ, การ Sync ข้อมูลภายนอก และการสร้าง Component Library',
  commands: [
    {
      id: 'use-layout-effect',
      name: 'useLayoutEffect()',
      description: 'เหมือน useEffect เป๊ะ แต่ "ทำงานก่อนที่ Browser จะวาดหน้าจอ (Paint)" ใช้เมื่อต้องวัดขนาด DOM ก่อนแสดง',
      syntax: 'useLayoutEffect(() => { ... }, [deps])',
      examples: [
        {
          title: 'ใช้วัดขนาดป้องกันจอแวบ (Flicker)',
          code: `import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // ถ้าใช้ useEffect ปกติ User อาจจะเห็น Tooltip วาดผิดไซส์ 1 ทีแล้วเด้งเปลี่ยนไซส์ (Flicker)
    // แต่ useLayoutEffect จะขวางการวาดจอไว้ จนกว่าเราจะวัดไซส์เสร็จ
    setHeight(ref.current.getBoundingClientRect().height);
  }, []);

  return <div ref={ref}>ความสูง: {height}</div>;
}`,
          language: 'typescript'
        }
      ],
      notes: '⚠️ ระวัง: การขวาง Browser Paint นานๆ จะทำให้เว็บค้าง ควรใช้ useEffect เป็นค่าเริ่มต้นเสมอ'
    },
    {
      id: 'use-imperative-handle',
      name: 'useImperativeHandle()',
      description: 'คัสตอมค่า (หรือฟังก์ชัน) ที่จะโผล่กลับไปหา Parent เวลา Parent ใช้ ref (มักใช้คู่กับ forwardRef)',
      syntax: 'useImperativeHandle(ref, () => ({ customMethod }))',
      examples: [
        {
          title: 'ซ่อน DOM ควบคุมแค่สิ่งที่อยากให้ควบคุม',
          code: `import { forwardRef, useRef, useImperativeHandle } from 'react';

// สร้าง Component แบบรับ Ref เข้ามาได้
const CustomInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);

  // ควบคุมว่า คนที่ส่ง ref เข้ามา จะเห็นแค่ฟังก์ชัน .focus() เท่านั้น 
  // (ไม่ให้เข้าถึง DOM ดิบๆ ป้องกันการเอาไปแก้ไขมั่วซั่ว)
  useImperativeHandle(ref, () => ({
    focusAndSelect: () => {
      realInputRef.current.focus();
      realInputRef.current.select();
    }
  }));

  return <input ref={realInputRef} />;
});

// ฝั่ง Parent ใช้งาน:
// childRef.current.focusAndSelect() ได้อย่างเดียว`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'use-id',
      name: 'useId() (React 18)',
      description: 'สร้าง ID ที่ไม่ซ้ำกัน (Unique ID) และตรงกันทั้งฝั่ง Server และ Client (ป้องกันปัญหา Hydration Mismatch)',
      syntax: 'const id = useId()',
      examples: [
        {
          title: 'ใช้เชื่อม Label กับ Input',
          code: `import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId(); // เช่นได้ค่า ":r1:"

  return (
    <>
      <input type="password" aria-describedby={passwordHintId} />
      {/* ใช้ id เดียวกันเชื่อมโยงกันอย่างปลอดภัย ไม่บั๊กตอน SSR */}
      <p id={passwordHintId}>ต้องมีความยาว 8 ตัวอักษรขึ้นไป</p>
    </>
  );
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'use-sync-external-store',
      name: 'useSyncExternalStore() (React 18)',
      description: 'อ่านค่าจาก State ฝั่งนอก React (เช่น Browser API, หรือ Zustand/Redux) อย่างปลอดภัยไม่ให้ค่าเพี้ยน (Tearing)',
      syntax: 'const state = useSyncExternalStore(subscribe, getSnapshot)',
      examples: [
        {
          title: 'ดึงสถานะออนไลน์จาก Browser',
          code: `import { useSyncExternalStore } from 'react';

// 1. ฟังก์ชันดึงค่า
function getSnapshot() {
  return navigator.onLine; // ค่าภายนอก
}

// 2. ฟังก์ชันติดตามการเปลี่ยนแปลง
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export function useOnlineStatus() {
  // สั่งให้ React คอยซิงค์ค่าให้
  return useSyncExternalStore(subscribe, getSnapshot);
}`,
          language: 'typescript'
        }
      ],
      notes: 'ถ้าคุณเขียน Zustand, Redux หรือ Data Store Library คุณจะต้องใช้ Hook ตัวนี้เป็นแกนหลัก'
    }
  ]
};
