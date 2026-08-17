import { Language } from '../types';
import { cliCategory } from './cli';
import { controllersCategory } from './controllers';
import { providersCategory } from './providers';
import { coreCategory } from './core';

export const nestjsLanguage: Language = {
  id: 'nestjs',
  name: 'NestJS',
  type: 'framework',
  icon: '🐈',
  image: '/picture/nestjs.png',
  color: 'red',
  description: 'เฟรมเวิร์ก Node.js แบบโปรเกรสซีฟสำหรับการสร้างฝั่งเซิร์ฟเวอร์ที่มีประสิทธิภาพ เชื่อถือได้ และขยายขนาดได้',
  categories: [cliCategory, controllersCategory, providersCategory, coreCategory]
};
