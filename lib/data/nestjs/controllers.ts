import { Category } from '../types';

export const controllersCategory: Category = {
  id: 'controllers',
  name: 'Controllers & Routing',
  icon: '🚦',
  description: 'Decorators สำหรับจัดการ Request, Response และการกำหนดเส้นทาง (Routing)',
  commands: [
    {
      id: 'controller',
      name: '@Controller()',
      description: 'กำหนดคลาสให้ทำหน้าที่เป็น Controller พร้อมระบุ prefix ของเส้นทาง',
      syntax: '@Controller(prefix?)',
      parameters: [
        { name: 'prefix', type: 'string', required: false, description: 'คำนำหน้าเส้นทาง URL (เช่น "users")' }
      ],
      examples: [
        {
          title: 'การใช้งานเบื้องต้น',
          code: `import { Controller, Get } from '@nestjs/common';

@Controller('users') // รับ request ที่ /users
export class UsersController {
  @Get()
  findAll() {
    return 'This action returns all users';
  }
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'http-methods',
      name: '@Get, @Post, @Put, @Delete, @Patch',
      description: 'กำหนด HTTP Method ที่ Controller จะรับ',
      syntax: '@Get(path?)',
      parameters: [
        { name: 'path', type: 'string', required: false, description: 'เส้นทางย่อย (Sub-routing)' }
      ],
      examples: [
        {
          title: 'HTTP Methods พื้นฐาน',
          code: `@Post()
create() {
  return 'Adds a new record';
}

@Get(':id') // /users/1
findOne(@Param('id') id: string) {
  return \`Returns user #\${id}\`;
}

@Delete(':id')
remove(@Param('id') id: string) {
  return \`Removes user #\${id}\`;
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'param-query-body',
      name: '@Param, @Query, @Body',
      description: 'สกัดข้อมูลจาก HTTP Request เข้ามาเป็นพารามิเตอร์ของฟังก์ชัน',
      syntax: '@Param(key?), @Query(key?), @Body(key?)',
      parameters: [
        { name: 'key', type: 'string', required: false, description: 'ชื่อตัวแปรที่ต้องการดึง (ถ้าไม่ใส่จะได้เป็น Object ทั้งก้อน)' }
      ],
      examples: [
        {
          title: 'การดึงข้อมูลจาก Request',
          code: `// URL: /users/123?role=admin
@Get(':id')
findOne(
  @Param('id') id: string,      // id = "123"
  @Query('role') role: string   // role = "admin"
) {
  return { id, role };
}

// POST body
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'req-res',
      name: '@Req() และ @Res()',
      description: 'เข้าถึง Request/Response object ดั้งเดิมของเฟรมเวิร์กเบื้องหลัง (Express หรือ Fastify)',
      syntax: '@Req(), @Res()',
      examples: [
        {
          title: 'ใช้งาน Request และ Response Object',
          code: `import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request, @Res() response: Response) {
    // ⚠️ ระวัง: การใช้ @Res() จะทำให้ NestJS ปิดการส่ง Response อัตโนมัติ คุณต้องส่งเอง
    return response.status(HttpStatus.OK).json({
      path: request.url,
      message: 'Hello Cats'
    });
  }
}`,
          language: 'typescript'
        }
      ],
      notes: 'เมื่อใช้ @Res() หรือ @Response() คุณจะกลายเป็นผู้รับผิดชอบในการส่ง Response กลับไป (เช่นต้องเรียก res.json() หรือ res.send())'
    }
  ]
};
