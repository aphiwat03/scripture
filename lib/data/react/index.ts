import { Language } from '../types';
import { hooksCoreCategory } from './hooks-core';
import { hooksPerfCategory } from './hooks-perf';
import { hooksAdvancedCategory } from './hooks-advanced';
import { stateManagementCategory } from './state-management';
import { apiFormsCategory } from './api-forms';
import { architectureCleanCodeCategory } from './architecture';

export const reactLanguage: Language = {
  id: 'react',
  name: 'React',
  type: 'framework',
  icon: '⚛️',
  image: '/picture/react.png',
  color: 'cyan',
  description: 'ไลบรารียอดนิยมจาก Facebook สำหรับสร้าง User Interface (UI)',
  categories: [
    hooksCoreCategory,
    hooksPerfCategory,
    hooksAdvancedCategory,
    stateManagementCategory,
    apiFormsCategory,
    architectureCleanCodeCategory
  ]
};
