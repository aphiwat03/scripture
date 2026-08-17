import { Category } from '../types';

export const linqCategory: Category = {
  id: 'linq',
  name: 'LINQ',
  icon: '🔍',
  description: 'Language Integrated Query สำหรับค้นหาและจัดการข้อมูล',
  commands: [
    {
      id: 'where',
      name: '.Where()',
      description: 'กรองข้อมูลตามเงื่อนไข (เหมือน filter ใน JS)',
      syntax: 'collection.Where(x => condition)',
      examples: [],
    },
    {
      id: 'select',
      name: '.Select()',
      description: 'แปลงรูปแบบข้อมูล (เหมือน map ใน JS)',
      syntax: 'collection.Select(x => result)',
      examples: [],
    },
    {
      id: 'order-by',
      name: '.OrderBy()',
      description: 'เรียงลำดับข้อมูล',
      syntax: 'collection.OrderBy(x => key)',
      examples: [],
    },
    {
      id: 'first-or-default',
      name: '.FirstOrDefault()',
      description: 'ดึงข้อมูลตัวแรกที่ตรงเงื่อนไข หากไม่พบจะคืนค่า default (เช่น null)',
      syntax: 'collection.FirstOrDefault(x => condition)',
      examples: [],
    },
  ],
};
