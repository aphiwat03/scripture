import { Category } from '../types';

export const advancedMicroservicesCategory: Category = {
  id: 'advanced-microservices',
  name: 'Advanced & Microservices',
  icon: '🚀',
  description: 'หัวข้อระดับสูง (Mid-Senior) ที่ต้องใช้ในระบบขนาดใหญ่',
  commands: [
    {
      id: 'caching-redis',
      name: 'Caching (Redis)',
      description: 'แคชผลลัพธ์เพื่อลดภาระ Database และทำให้ API เร็วขึ้น',
      syntax: '@UseInterceptors(CacheInterceptor)',
      examples: [
        {
          title: 'การใช้ Cache Interceptor',
          language: 'typescript',
          code: `import { CacheInterceptor, UseInterceptors, Controller, Get } from '@nestjs/common';

@Controller('stats')
// สั่งแคช API ทั้งหมดใน Controller นี้ (ปกติจะเก็บลง Memory แต่สามารถต่อ Redis ได้)
@UseInterceptors(CacheInterceptor)
export class StatsController {
  @Get()
  getHeavyStats() {
    // ฟังก์ชันนี้จะถูกเรียกแค่ครั้งแรก ครั้งถัดไปจะดึงผลลัพธ์จาก Cache มาส่งให้เลย!
    return this.statsService.calculateHeavyData();
  }
}`
        }
      ]
    },
    {
      id: 'queue-bullmq',
      name: 'Queue / Background Jobs (BullMQ)',
      description: 'ระบบคิวสำหรับงานที่ใช้เวลาประมวลผลนาน (เช่น ส่งอีเมล, ประมวลผลวิดีโอ) โดยโยนงานไว้เบื้องหลังเพื่อให้ API ตอบกลับเร็ว',
      syntax: '@nestjs/bull',
      examples: [
        {
          title: 'โยนงานเข้า Queue',
          language: 'typescript',
          code: `// 1. ฝั่ง Controller (โยนงานเข้าคิวแล้วตอบกลับเลย)
@Post('process-video')
async processVideo(@Body() data) {
  // ไม่ต้องรอวิดีโอเสร็จ โยนเข้าคิวแล้วตอบกลับ User ทันที
  await this.videoQueue.add('transcode', { file: data.file });
  return { message: 'กำลังประมวลผลวิดีโออยู่เบื้องหลัง' };
}

// 2. ฝั่ง Worker/Processor (คอยรับงานไปทำเงียบๆ)
@Processor('video')
export class VideoProcessor {
  @Process('transcode')
  async handleTranscode(job: Job) {
    console.log('เริ่มแปลงไฟล์...', job.data.file);
    // ทำงานหนัก...
  }
}`
        }
      ]
    },
    {
      id: 'websocket-gateway',
      name: 'WebSocket Gateway',
      description: 'เปิดช่องทางการสื่อสารแบบ Real-time (2 ทาง) ระหว่าง Server กับ Client (เช่น แอพแชท, อัปเดตราคาหุ้น)',
      syntax: '@WebSocketGateway()',
      examples: [
        {
          title: 'การสร้าง Gateway สำหรับแชท',
          language: 'typescript',
          code: `import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true }) // เปิด Socket.io Server
export class ChatGateway {
  
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {
    console.log('ได้รับข้อความ:', message);
    
    // Broadcast ส่งข้อความกระจายให้ทุกคนที่เชื่อมต่ออยู่
    client.broadcast.emit('newMessage', message);
  }
}`
        }
      ]
    },
    {
      id: 'microservices',
      name: 'Microservices (TCP, gRPC, Message Broker)',
      description: 'สถาปัตยกรรมแยกเซอร์วิสให้คุยกันเอง (แทนที่จะเป็น HTTP API ก้อนใหญ่ก้อนเดียว)',
      syntax: '@MessagePattern()',
      examples: [
        {
          title: 'ฝั่ง Microservice รับคำสั่ง',
          language: 'typescript',
          code: `import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MathController {
  
  // รอรับ Message ที่ชื่อว่า 'sum' (ไม่ต้องพึ่งพิง HTTP Method)
  @MessagePattern('sum')
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b, 0);
  }
}`
        }
      ],
      notes: 'NestJS รองรับ Microservice หลายรูปแบบมาก เช่น TCP, Redis (Pub/Sub), RabbitMQ, Kafka และ gRPC'
    },
    {
      id: 'file-upload-multer',
      name: 'File Upload (Multer)',
      description: 'รองรับการอัปโหลดไฟล์ (รูปภาพ, เอกสาร) จากฝั่ง Client',
      syntax: '@UseInterceptors(FileInterceptor)',
      examples: [
        {
          title: 'การรับไฟล์อัปโหลด',
          language: 'typescript',
          code: `import { Post, UseInterceptors, UploadedFile, Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  
  @Post()
  @UseInterceptors(FileInterceptor('file')) // ดักจับ field ที่ชื่อ 'file'
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('รับไฟล์เรียบร้อย:', file.originalname);
    return { filename: file.filename, size: file.size };
  }
}`
        }
      ]
    }
  ]
};
