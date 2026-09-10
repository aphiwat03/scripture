import { Language } from '../types';
import { securityCategory } from './security';
import { backupCategory } from './backup';
import { comparisonCategory } from './comparison';

export const databaseLanguage: Language = {
  id: 'database',
  name: 'Database Fundamentals',
  type: 'tool',
  icon: '🗄️',
  color: 'zinc',
  description: 'แก่นความรู้พื้นฐาน ความปลอดภัย การแบ็คอัป และเปรียบเทียบสถาปัตยกรรม (ใช้ได้กับทุกฐานข้อมูล)',
  categories: [
    securityCategory,
    backupCategory,
    comparisonCategory
  ]
};
