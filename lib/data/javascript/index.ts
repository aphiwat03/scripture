import { Language } from '../types';
import { arrayCategory } from './array';
import { stringCategory } from './string';
import { objectCategory } from './object';
import { storageCategory } from './storage';
import { dataStructuresCategory } from './data-structures';

export const javascript: Language = {
  id: 'javascript',
  name: 'JavaScript',
  type: 'language',
  icon: '🟨',
  image: '/picture/javascript.png',
  color: 'yellow',
  description: 'ภาษาโปรแกรมมิ่งที่ใช้กันอย่างแพร่หลายสำหรับพัฒนาเว็บไซต์',
  categories: [
    arrayCategory,
    stringCategory,
    objectCategory,
    storageCategory,
    dataStructuresCategory
  ],
};
