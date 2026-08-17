import { Language } from '../types';
import { hooksCategory } from './hooks';

export const reactLanguage: Language = {
  id: 'react',
  name: 'React',
  type: 'framework',
  icon: '⚛️',
  image: '/picture/react.png',
  color: 'cyan',
  description: 'ไลบรารียอดนิยมจาก Facebook สำหรับสร้าง User Interface (UI)',
  categories: [
    hooksCategory
  ]
};
