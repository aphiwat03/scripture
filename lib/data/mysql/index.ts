import { Language } from '../types';
import { architectureCategory } from './architecture';
import { dataTypesCategory } from './data-types';
import { performanceCategory } from './performance';
import { transactionsCategory } from './transactions';
import { constraintsProceduresCategory } from './constraints-procedures';
import { partitioningReplicationCategory } from './partitioning-replication';

export const mysqlLanguage: Language = {
  id: 'mysql',
  name: 'MySQL',
  type: 'language',
  icon: '🐬',
  image: '/picture/mysql.png',
  color: 'cyan',
  description: 'ระบบฐานข้อมูลยอดฮิตของฝั่งเว็บ โดดเด่นด้วย InnoDB Engine, สถาปัตยกรรม Replication ที่แข็งแกร่ง และใช้ง่าย',
  categories: [
    architectureCategory,
    dataTypesCategory,
    performanceCategory,
    transactionsCategory,
    constraintsProceduresCategory,
    partitioningReplicationCategory
  ]
};
