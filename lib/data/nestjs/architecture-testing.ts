import { Category } from '../types';

export const architectureTestingCategory: Category = {
  id: 'architecture-testing',
  name: 'Architecture & Testing',
  icon: '🏗️',
  description: 'สถาปัตยกรรมขั้นสูง (Lifecycle, Modules, Dependency Scope) และการทดสอบระบบ',
  commands: [
    {
      id: 'middleware-lifecycle',
      name: 'Middleware vs Interceptor vs Guard',
      description: 'ลำดับการทำงาน (Request Lifecycle) ใน NestJS',
      syntax: 'Middleware -> Guard -> Interceptor -> Pipe -> Controller',
      examples: [
        {
          title: 'Lifecycle (วงจรชีวิตของ 1 Request)',
          language: 'text',
          code: `1. Middleware (ด่านแรกสุด): ทำงานก่อนทุกสิ่ง มักใช้ทำ Logger, เช็ค Header พื้นฐาน (คล้าย Express)
2. Guards: ตัดสินใจว่าจะให้ผ่านไหม (Authorization, เช็ค Role, เช็ค JWT)
3. Interceptors (รอบเข้า): แอบดู/แก้ไข Request หรือจับเวลา
4. Pipes: แปลงประเภทข้อมูล (String->Int) หรือตรวจสอบความถูกต้อง (Validation DTO)
5. Controllers: โค้ดหลักของคุณ (Business Logic)
6. Interceptors (รอบออก): ห่อหุ้มหรือแก้ไขผลลัพธ์ (เช่น แปลงเป็น { data: ... })
7. Exception Filters: ถ้าเกิด Error ที่ด่านไหนก็ตาม ตัวนี้จะโผล่มารับจบ`
        }
      ]
    },
    {
      id: 'module-relationships',
      name: 'Module Relationships',
      description: 'ความสัมพันธ์ระหว่าง Module ที่ซับซ้อนขึ้น',
      syntax: 'Shared Module, forwardRef, Dynamic Module',
      examples: [
        {
          title: '3 คอนเซปต์สำคัญของ Module',
          language: 'typescript',
          code: `// 1. Shared Module: สร้าง Module กลาง (เช่น DatabaseModule) แล้ว export service เพื่อให้ Module อื่น import ไปใช้ได้

// 2. Circular Dependency (forwardRef):
// เมื่อ Module A เรียกใช้ B และ Module B เรียกใช้ A (งูกินหาง) ต้องใช้ forwardRef() เพื่อแก้ปัญหา
@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class DogsModule {}

// 3. Dynamic Module:
// Module ที่สามารถตั้งค่าตอน import ได้ (เช่น JwtModule.register({ secret: 'xxx' }))`
        }
      ]
    },
    {
      id: 'dependency-injection-scope',
      name: 'DI Scopes (Custom Provider)',
      description: 'ขอบเขตการมีชีวิตอยู่ของ Service (Singleton คืออะไร?)',
      syntax: 'Scope.DEFAULT, Scope.REQUEST, Scope.TRANSIENT',
      examples: [
        {
          title: '3 รูปแบบของ Scope',
          language: 'text',
          code: `1. DEFAULT (Singleton): ค่าเริ่มต้นของ NestJS! Service ถูกสร้างครั้งเดียวตอนรันเซิร์ฟเวอร์ และถูก "แชร์" ให้ทุก Request (เร็ว ประหยัดเมม แต่อย่าเก็บ State ของ User ไว้ในนี้!)
2. REQUEST: สร้าง Service ขึ้นมาใหม่ "ทุกๆ 1 Request" และทำลายทิ้งเมื่อตอบกลับเสร็จ (กินทรัพยากร เหมาะสำหรับ Service ที่ต้องอ้างอิง User ID ปัจจุบันตลอดเวลา)
3. TRANSIENT: สร้าง Service ขึ้นมาใหม่ "ทุกครั้งที่โดนเรียก Inject" โดยไม่สนใจว่าเป็น Request เดียวกันหรือไม่`
        }
      ]
    },
    {
      id: 'swagger-openapi',
      name: 'Swagger / OpenAPI',
      description: 'ระบบสร้าง Document สำหรับ API อัตโนมัติ (จำเป็นมากในงานบริษัท)',
      syntax: '@nestjs/swagger',
      examples: [
        {
          title: 'ตกแต่ง Document ให้สวยงาม',
          language: 'typescript',
          code: `import { ApiProperty, ApiOperation, ApiResponse } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'ชื่อของผู้ใช้งาน', example: 'John Doe' })
  name: string;
}

@Controller('users')
export class UsersController {
  @ApiOperation({ summary: 'สร้างผู้ใช้ใหม่' })
  @ApiResponse({ status: 201, description: 'สร้างสำเร็จ' })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return 'User created';
  }
}`
        }
      ]
    },
    {
      id: 'testing',
      name: 'Testing (Jest + Supertest)',
      description: 'การทดสอบระบบ (Unit Test และ E2E Test)',
      syntax: 'npm run test / npm run test:e2e',
      examples: [
        {
          title: 'การเขียน Unit Test สำหรับ Service',
          language: 'typescript',
          code: `import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    // จำลอง Module ย่อยขึ้นมาเพื่อใช้ทดสอบ (ไม่ต้องรันแอปเต็ม)
    const module = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return a user', () => {
    expect(service.findOne(1)).toEqual({ id: 1, name: 'Test' });
  });
});`
        }
      ]
    }
  ]
};
