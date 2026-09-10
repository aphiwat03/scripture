import { Language } from '../types';
import { dataTypesCategory } from './data-types';
import { advancedQueriesCategory } from './advanced-queries';
import { performanceCategory } from './performance';
import { extensionsCategory } from './extensions';
import { transactionsCategory } from './transactions';
import { constraintsCategory } from './constraints';
import { functionsPartitioningCategory } from './functions-partitioning';

export const postgresqlLanguage: Language = {
  id: 'postgresql',
  name: 'PostgreSQL',
  type: 'language',
  icon: '🐘',
  image: '/picture/postgres.png',
  color: 'blue',
  description: 'ระบบฐานข้อมูลแบบ Relational ที่ก้าวหน้าและทรงพลังที่สุด ฟีเจอร์แน่น จัดการข้อมูลซับซ้อนได้ดีเยี่ยม',
  categories: [
    dataTypesCategory,
    advancedQueriesCategory,
    performanceCategory,
    extensionsCategory,
    transactionsCategory,
    constraintsCategory,
    functionsPartitioningCategory
  ]
};
