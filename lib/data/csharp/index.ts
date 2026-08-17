import { Language } from '../types';
import { oopCategory } from './oop';
import { linqCategory } from './linq';

export const csharp: Language = {
  id: 'csharp',
  name: 'C#',
  type: 'language',
  icon: '🟣',
  image: '/picture/csharp.png',
  color: 'purple',
  description: 'ภาษาโปรแกรมมิ่งเชิงวัตถุประสิทธิภาพสูงจาก Microsoft',
  categories: [oopCategory, linqCategory],
};
