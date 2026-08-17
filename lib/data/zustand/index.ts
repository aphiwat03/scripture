import { Language } from '../types';
import { storeCategory } from './store';

export const zustandLanguage: Language = {
  id: 'zustand',
  name: 'Zustand',
  type: 'tool',
  icon: '🐻',
  image: '/picture/zustand.jpg',
  color: 'orange',
  description: 'ระบบจัดการ State สำหรับ React ที่เล็ก รวดเร็ว และใช้งานง่าย',
  categories: [storeCategory],
};
