import { Category } from '../types';

export const commandsCategory: Category = {
  id: 'commands',
  name: 'Basic Commands',
  icon: '🔴',
  description: 'คำสั่งพื้นฐานในการจัดการข้อมูลใน Redis',
  commands: [
    {
      id: 'set',
      name: 'SET',
      description: 'เก็บค่า string ลงใน key',
      syntax: 'SET key value',
      examples: [],
    },
    {
      id: 'get',
      name: 'GET',
      description: 'ดึงค่าจาก key',
      syntax: 'GET key',
      examples: [],
    },
    {
      id: 'del',
      name: 'DEL',
      description: 'ลบ key และข้อมูลข้างใน',
      syntax: 'DEL key',
      examples: [],
    },
    {
      id: 'expire',
      name: 'EXPIRE',
      description: 'ตั้งเวลาหมดอายุให้กับ key (วินาที)',
      syntax: 'EXPIRE key seconds',
      examples: [],
    },
  ],
};
