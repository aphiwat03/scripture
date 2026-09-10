import { Language } from '../types';
import { setupCategory } from './setup';
import { schemaCategory } from './schema';
import { crudCategory } from './crud';
import { advancedCategory } from './advanced';
import { practicesCategory } from './practices';

export const prismaLanguage: Language = {
  id: 'prisma',
  name: 'Prisma ORM',
  type: 'tool',
  icon: '🗄️',
  image: '/picture/prisma.png',
  color: 'emerald',
  description: 'ORM สมัยใหม่สำหรับ Node.js และ TypeScript ที่ใช้งานง่าย มี Type-safety สูงสุด',
  categories: [
    setupCategory,
    schemaCategory,
    crudCategory,
    advancedCategory,
    practicesCategory
  ]
};
