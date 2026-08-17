import { Language } from '../types';
import { oop } from './oop';
import { typesCategory } from './types';

export const typescript: Language = {
  id: 'typescript',
  name: 'TypeScript',
  type: 'language',
  icon: '🔷',
  image: '/picture/typescript.png',
  color: 'blue',
  description: 'JavaScript ที่มีระบบ Type ที่เข้มงวด',
  categories: [oop, typesCategory]
};
