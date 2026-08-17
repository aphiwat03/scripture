import { Category } from '../types';

export const providersCategory: Category = {
  id: 'providers',
  name: 'Providers & Modules',
  icon: '📦',
  description: 'การจัดการ Dependency Injection (DI) และการจัดโครงสร้างโค้ดด้วย Modules',
  commands: [
    {
      id: 'injectable',
      name: '@Injectable()',
      description: 'ประกาศคลาสให้เป็น Provider เพื่อให้สามารถถูก Inject (ฉีด) เข้าไปใช้งานในคลาสอื่นได้ผ่าน Constructor',
      syntax: '@Injectable()',
      examples: [
        {
          title: 'การสร้างและฉีด Service',
          code: `// 1. ประกาศเป็น Injectable
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: string[] = [];

  findAll(): string[] {
    return this.cats;
  }
}

// 2. ฉีดเข้า Controller ผ่าน constructor
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'module',
      name: '@Module()',
      description: 'รวบรวมส่วนประกอบต่างๆ (Controllers, Providers) เข้าด้วยกันเพื่อจัดโครงสร้าง',
      syntax: '@Module(metadata)',
      parameters: [
        { name: 'imports', type: 'Array', required: false, description: 'โมดูลอื่นที่โมดูลนี้ต้องการใช้งาน' },
        { name: 'controllers', type: 'Array', required: false, description: 'รายชื่อ Controller ในโมดูลนี้' },
        { name: 'providers', type: 'Array', required: false, description: 'รายชื่อ Service/Provider ที่ใช้งานในโมดูลนี้' },
        { name: 'exports', type: 'Array', required: false, description: 'Provider ที่ต้องการเปิดเผยให้โมดูลอื่นเรียกใช้ได้' }
      ],
      examples: [
        {
          title: 'โครงสร้าง Module เบื้องต้น',
          code: `import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService] // เพื่อให้ Module อื่นนำ CatsService ไปใช้ได้
})
export class CatsModule {}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'global',
      name: '@Global()',
      description: 'ทำให้ Module กลายเป็นแบบ Global ใช้ได้ทุกที่โดยไม่ต้อง import ซ้ำ',
      syntax: '@Global()',
      examples: [
        {
          title: 'สร้าง Global Module',
          code: `import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}`,
          language: 'typescript'
        }
      ],
      notes: 'ไม่ควรทำ Global ทุกอย่าง ควรใช้เฉพาะสิ่งที่แชร์ร่วมกันจริงๆ เช่น Database connection หรือ Configuration'
    }
  ]
};
