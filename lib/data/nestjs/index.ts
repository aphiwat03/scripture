import { Language } from '../types';
import { cliCategory } from './cli';
import { controllersCategory } from './controllers';
import { providersCategory } from './providers';
import { coreCategory } from './core';
import { databaseValidationCategory } from './database-validation';
import { authSecurityCategory } from './auth-security';
import { architectureTestingCategory } from './architecture-testing';
import { advancedMicroservicesCategory } from './advanced';

export const nestjsLanguage: Language = {
  id: 'nestjs',
  name: 'NestJS',
  type: 'framework',
  icon: '🐱',
  image: '/picture/nestjs.png',
  color: 'red',
  description: 'เฟรมเวิร์ก Node.js สำหรับสร้างเซิร์ฟเวอร์แบบ Enterprise ที่ใช้สถาปัตยกรรมแบบ Angular',
  categories: [
    cliCategory,
    controllersCategory,
    providersCategory,
    coreCategory,
    databaseValidationCategory,
    authSecurityCategory,
    architectureTestingCategory,
    advancedMicroservicesCategory
  ]
};
