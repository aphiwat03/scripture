import { Category } from '../types';

export const storeCategory: Category = {
  id: 'store',
  name: 'Store API',
  icon: '🐻',
  description: 'การจัดการ State ด้วย Zustand',
  commands: [
    {
      id: 'create',
      name: 'create()',
      description: 'สร้าง Store สำหรับเก็บ Global State',
      syntax: 'const useStore = create((set) => ({ ... }))',
      examples: [],
    },
    {
      id: 'set',
      name: 'set()',
      description: 'อัปเดตค่า State ใน Store',
      syntax: 'set((state) => ({ key: newValue }))',
      examples: [],
    },
    {
      id: 'use-store',
      name: 'useStore()',
      description: 'ดึงค่า State มาใช้ใน React Component',
      syntax: 'const value = useStore((state) => state.value)',
      examples: [],
    },
  ],
};
