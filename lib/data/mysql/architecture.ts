import { Category } from '../types';

export const architectureCategory: Category = {
  id: 'architecture',
  name: 'Architecture & Storage Engines',
  icon: '🏗️',
  description: 'โครงสร้างระดับลึกของ MySQL (InnoDB vs MyISAM) และการทำงานของ Logs',
  commands: [
    {
      id: 'innodb-myisam',
      name: 'InnoDB vs MyISAM',
      description: 'Storage Engines ตัวหลักที่ใช้ใน MySQL (ปัจจุบันบังคับใช้ InnoDB เป็นมาตรฐาน)',
      syntax: 'ENGINE=InnoDB',
      examples: [
        {
          title: 'ความแตกต่าง (คำถามสัมภาษณ์ยอดฮิต)',
          language: 'text',
          code: `1. InnoDB (Default ตั้งแต่ MySQL 5.5)
- รองรับ Transactions (ACID) สมบูรณ์แบบ
- ใช้ Row-level Locking (ล็อกทีละแถว ทำให้ทำงานพร้อมกันได้ดีกว่า)
- รองรับ Foreign Key
- ถ้าระบบพัง ข้อมูลไม่หาย (Crash recovery)

2. MyISAM (เก่า)
- ไม่รองรับ Transaction ไม่มี Foreign Key
- ใช้ Table-level Locking (ล็อกทั้งตาราง)
- ข้อดี: เร็วมากถ้าง่ายๆ เน้นอ่านอย่างเดียว แต่ปัจจุบันไม่นิยมแล้ว`
        }
      ]
    },
    {
      id: 'redo-undo-log',
      name: 'Redo Log & Undo Log',
      description: 'ระบบหลังบ้านที่ทำให้ Transaction ทำงานได้อย่างปลอดภัย',
      syntax: 'Logs',
      examples: [
        {
          title: 'กลไกของแต่ละ Log',
          language: 'text',
          code: `1. Redo Log (ระบบป้องกันไฟดับ):
เวลาแก้ไขข้อมูล InnoDB จะเขียนลงไฟล์ Redo Log ในดิสก์ก่อนเสมอ (Write-Ahead Logging) เผื่อไฟดับกะทันหัน เปิดมาใหม่จะเอาไฟล์นี้มาไล่ทำซ้ำให้เสร็จ

2. Undo Log (ระบบเครื่องย้อนเวลา):
เก็บ "ข้อมูลเวอร์ชันเก่า" ไว้ เผื่อคุณสั่ง ROLLBACK จะได้เอาข้อมูลเก่ามาทับคืน หรือใช้เพื่อให้คนอื่นอ่านข้อมูลเก่าระหว่างที่คุณกำลังแก้ (MVCC)`
        }
      ]
    }
  ]
};
