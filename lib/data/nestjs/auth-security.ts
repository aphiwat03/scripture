import { Category } from '../types';

export const authSecurityCategory: Category = {
  id: 'auth-security',
  name: 'Auth, Config & Error Handling',
  icon: '🛡️',
  description: 'ระบบยืนยันตัวตน (JWT), การจัดการตัวแปรสภาพแวดล้อม และ Exception Filters',
  commands: [
    {
      id: 'authentication',
      name: 'Authentication (Passport.js + JWT)',
      description: 'ระบบล็อกอินและป้องกันเส้นทางด้วย Token',
      syntax: '@UseGuards(JwtAuthGuard)',
      examples: [
        {
          title: 'การป้องกัน Route ด้วย JWT Guard',
          language: 'typescript',
          code: `import { UseGuards, Controller, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  
  // ใครไม่มีหรือ Token หมดอายุ จะโดนเตะออก (401 Unauthorized) ทันที
  @UseGuards(AuthGuard('jwt')) 
  @Get()
  getProfile(@Request() req) {
    // req.user จะถูกแกะออกมาจาก JWT payload ให้โดยอัตโนมัติ
    return req.user; 
  }
}`
        }
      ],
      notes: 'สถาปัตยกรรมที่ถูกต้อง: 1. Login ส่ง JWT กลับไป 2. User ส่ง JWT มาใน Header (Bearer) 3. Guard ตรวจสอบความถูกต้องของ JWT ก่อนปล่อยให้ Controller ทำงาน'
    },
    {
      id: 'exception-filters',
      name: 'Exception Filters',
      description: 'ดักจับ Error ทั้งระบบ เพื่อแปลงรูปแบบ (Format) ก่อนส่งกลับไปให้ฝั่ง Client (ป้องกัน Error แปลกๆ หลุดไปหา User)',
      syntax: '@Catch()',
      examples: [
        {
          title: 'Custom Exception Filter',
          language: 'typescript',
          code: `import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // บังคับให้ Error ทุกตัวในระบบตอบกลับในโครงสร้างเดียวกันเป๊ะๆ!
    response
      .status(status)
      .json({
        success: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: exception.message,
      });
  }
}`
        }
      ]
    },
    {
      id: 'environment-config',
      name: 'Environment Config (@nestjs/config)',
      description: 'จัดการไฟล์ .env อย่างเป็นระบบ ปลอดภัย และดึงค่ามาใช้งานได้ทั่วทั้งแอป',
      syntax: 'ConfigService',
      examples: [
        {
          title: 'การดึงค่าจาก .env',
          language: 'typescript',
          code: `import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  connect() {
    // ดึงค่า DATABASE_URL จากไฟล์ .env
    const dbUrl = this.configService.get<string>('DATABASE_URL');
    console.log(\`Connecting to \${dbUrl}\`);
  }
}`
        }
      ]
    }
  ]
};
