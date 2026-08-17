import { Category } from '../types';

export const coreCategory: Category = {
  id: 'core',
  name: 'Pipes, Guards & Interceptors',
  icon: '🛡️',
  description: 'เครื่องมือสำหรับการตรวจสอบข้อมูล (Validation), สิทธิ์ (Authorization), และแทรกแซงวงจรคำขอ (Request cycle)',
  commands: [
    {
      id: 'validation-pipe',
      name: 'ValidationPipe',
      description: 'ตรวจสอบความถูกต้องของข้อมูล (Payload) อัตโนมัติร่วมกับ class-validator',
      syntax: 'new ValidationPipe()',
      examples: [
        {
          title: 'เปิดใช้งานทั่วทั้งแอป (Global)',
          code: `import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ตรวจสอบ payload ขาเข้าทั้งหมด
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ตัด property ที่ไม่ได้นิยามใน DTO ทิ้ง
    forbidNonWhitelisted: true, // โยน Error หากมี property แปลกปลอม
  }));
  await app.listen(3000);
}
bootstrap();`,
          language: 'typescript'
        },
        {
          title: 'การใช้ DTO คู่กับ class-validator',
          code: `import { IsString, IsInt, Min } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  age: number;
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'use-guards',
      name: '@UseGuards()',
      description: 'ตรวจสอบสิทธิ์ก่อนที่จะอนุญาตให้เข้าถึงเส้นทาง (Authorization)',
      syntax: '@UseGuards(Guard1, Guard2)',
      examples: [
        {
          title: 'ป้องกัน Endpoint',
          code: `import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('cats')
@UseGuards(AuthGuard) // ใช้งานระดับ Controller
export class CatsController {
  
  @Get()
  // @UseGuards(RolesGuard) // หรือใช้งานระดับ Method
  findAll() {
    return [];
  }
}`,
          language: 'typescript'
        }
      ],
      notes: 'Guards จะถูกรัน "ก่อน" Interceptors และ Pipes'
    },
    {
      id: 'use-interceptors',
      name: '@UseInterceptors()',
      description: 'ดักจับ Request ขาเข้า หรือ Response ขาออก เพื่อเปลี่ยนแปลงแก้ไข หรือจัดการ Logging',
      syntax: '@UseInterceptors(Interceptor)',
      examples: [
        {
          title: 'ใช้ Interceptor แปลง Response',
          code: `import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    // ข้อมูลที่ return จะถูกส่งผ่าน Interceptor ก่อนไปถึง Client
    return [{ name: 'Alice' }]; 
  }
}`,
          language: 'typescript'
        }
      ]
    },
    {
      id: 'catch',
      name: '@Catch()',
      description: 'สร้าง Exception Filter สำหรับดักจับและจัดการ Error แบบกำหนดเอง (Custom error handling)',
      syntax: '@Catch(ExceptionType)',
      examples: [
        {
          title: 'ดักจับ HTTPException',
          code: `import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}`,
          language: 'typescript'
        }
      ]
    }
  ]
};
