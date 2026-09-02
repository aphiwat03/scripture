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
      id: 'param',
      name: '@Param()',
      description: 'ดึงตัวแปรที่อยู่ในเส้นทาง URL (Path Variables / Route Parameters)',
      syntax: '@Param(key?)',
      examples: [
        {
          title: 'ดึง Parameter จาก URL',
          language: 'typescript',
          code: `// เมื่อมีคนเรียก URL: GET /users/123
@Get(':id')
findOne(@Param('id') id: string) {
  // id จะมีค่าเท่ากับ "123"
  return \`User ID: \${id}\`;
}

// ถ้าไม่ระบุชื่อคีย์ จะได้ Object ทั้งก้อน
@Get(':id/:status')
findBoth(@Param() params: any) {
  // params = { id: '123', status: 'active' }
}`
        }
      ]
    },
    {
      id: 'query',
      name: '@Query()',
      description: 'ดึงข้อมูลจาก "Query String" ใน URL (คือข้อความที่ต่อท้ายเครื่องหมาย ?)',
      syntax: '@Query(key?)',
      examples: [
        {
          title: 'ใช้งาน @Query()',
          language: 'typescript',
          code: `// เมื่อมีคนเรียก URL: GET /users?role=admin&age=20
@Get()
findUsers(
  @Query('role') role: string, // ดึงเฉพาะคีย์ role ได้ "admin"
  @Query('age') age: string    // ดึงเฉพาะคีย์ age ได้ "20"
) {
  return \`กำลังค้นหา User ที่มี Role: \${role} อายุ: \${age}\`;
}

// แบบดึงมาทั้งก้อน (ได้เป็น Object)
@Get()
findAll(@Query() queryParams: any) {
  // queryParams = { role: 'admin', age: '20' }
  return queryParams;
}`
        }
      ],
      notes: '🔥 ข้อควรระวัง: ข้อมูลที่ได้จาก @Query() จะเป็น String เสมอ แม้ว่าเราจะส่งตัวเลขมา (เช่น ?age=20 ก็จะได้เป็น "20") หากต้องการให้เป็นตัวเลข ต้องใช้ ParseIntPipe ช่วย (เช่น @Query("age", ParseIntPipe) age: number)'
    },
    {
      id: 'body',
      name: '@Body()',
      description: 'ดึงข้อมูลที่ถูกส่งมาใน HTTP Body (มักใช้กับ POST, PUT, PATCH)',
      syntax: '@Body(key?)',
      examples: [
        {
          title: 'รับข้อมูลแบบ JSON',
          language: 'typescript',
          code: `// เมื่อมีคนยิง POST /users พร้อมแนบ JSON Body มา:
// { "name": "John", "email": "john@email.com" }

@Post()
create(@Body() body: any) {
  // body คือก้อน Object ที่รับมาเต็มๆ
  return \`สร้าง User ชื่อ \${body.name}\`;
}

// หรือดึงแค่บางฟิลด์
@Post()
createSpecific(@Body('email') email: string) {
  return \`Email คือ \${email}\`;
}`
        }
      ],
      notes: 'ในโลกของการทำงานจริง มักจะใช้ @Body() คู่กับคลาส DTO (Data Transfer Object) และ class-validator เพื่อตรวจสอบความถูกต้องของข้อมูล (Validation) เสมอ'
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
