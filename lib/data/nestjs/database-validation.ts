import { Category } from '../types';

export const databaseValidationCategory: Category = {
  id: 'database-validation',
  name: 'Database & Validation',
  icon: '🗄️',
  description: 'การเชื่อมต่อฐานข้อมูล (TypeORM/Prisma) และการตรวจสอบข้อมูล Request (DTO)',
  commands: [
    {
      id: 'typeorm-prisma',
      name: 'Database Integration (TypeORM / Prisma)',
      description: 'เชื่อมต่อฐานข้อมูลด้วย ORM ยอดนิยม (TypeORM เป็นมาตรฐานเก่าที่ติดมากับ Nest, Prisma เป็นเทรนด์ใหม่ที่มาแรง)',
      syntax: '@Entity() หรือ schema.prisma',
      examples: [
        {
          title: 'การใช้งาน TypeORM (Repository Pattern)',
          language: 'typescript',
          code: `import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// 1. สร้าง Entity (ตารางใน Database)
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

// 2. เรียกใช้ Repository ใน Service
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}`
        }
      ]
    },
    {
      id: 'dto-validation',
      name: 'DTO + Validation',
      description: 'กรองและตรวจสอบข้อมูลก่อนเข้าสู่ระบบ โดยใช้ class-validator และ class-transformer',
      syntax: '@IsString(), @IsEmail(), @IsInt()',
      examples: [
        {
          title: 'การสร้าง DTO (Data Transfer Object)',
          language: 'typescript',
          code: `import { IsString, IsInt, IsEmail, Min, Max } from 'class-validator';

// 1. นิยามรูปแบบข้อมูลที่ยอมรับ
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'อีเมลไม่ถูกต้อง' })
  email: string;

  @IsInt()
  @Min(18)
  @Max(100)
  age: number;
}

// 2. ใช้ใน Controller (อย่าลืมเปิด ValidationPipe ใน main.ts)
@Post()
create(@Body() createUserDto: CreateUserDto) {
  // หากอายุ 15 ระบบจะตีกลับ (400 Bad Request) ทันทีโดยไม่เข้าฟังก์ชันนี้
  return this.usersService.create(createUserDto);
}`
        }
      ],
      notes: 'สิ่งสำคัญ: ต้องไปเปิด app.useGlobalPipes(new ValidationPipe()) ในไฟล์ main.ts ก่อน เครื่องมือนี้ถึงจะทำงาน'
    }
  ]
};
