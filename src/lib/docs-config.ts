export type DocCategoryId = 'frontend' | 'backend' | 'cloud-ai' | 'testing';

export interface DocTopicMeta {
  slug: string;
  title: string;
  shortTitle: string;
  category: DocCategoryId;
  categoryLabel: string;
  summary: string;
  version?: string;
}

export interface DocCategoryGroup {
  id: DocCategoryId;
  title: string;
  accentDot: string;
  items: DocTopicMeta[];
}

export const DOCS_CATEGORIES: DocCategoryGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    accentDot: 'bg-[#0071e3] dark:bg-[#2997ff]',
    items: [
      {
        slug: 'nextjs',
        title: 'Next.js 16 (App Router)',
        shortTitle: 'Next.js 16 (App Router)',
        category: 'frontend',
        categoryLabel: 'Frontend',
        version: 'v16.4',
        summary:
          'React Framework สำหรับสร้างเว็บแบบ Full-stack ด้วยสถาปัตยกรรม App Router, Server Components และระบบ Static/Dynamic Rendering',
      },
      {
        slug: 'react',
        title: 'React 19',
        shortTitle: 'React 19',
        category: 'frontend',
        categoryLabel: 'Frontend',
        version: 'v19.3',
        summary:
          'ไลบรารีพื้นฐานสำหรับสร้าง User Interface แบบ Declarative Component พร้อม Actions API และ Concurrent Rendering',
      },
      {
        slug: 'typescript',
        title: 'TypeScript',
        shortTitle: 'TypeScript',
        category: 'frontend',
        categoryLabel: 'Frontend',
        version: 'v5.x',
        summary:
          'ระบบ Static Type บน JavaScript ที่ช่วยดักจับข้อผิดพลาดตั้งแต่ตอนเขียนโค้ดและสร้างสัญญาข้อมูล (Data Contract) ทั้งระบบ',
      },
      {
        slug: 'tailwind',
        title: 'Tailwind CSS v4',
        shortTitle: 'Tailwind CSS v4',
        category: 'frontend',
        categoryLabel: 'Frontend',
        version: 'v4.0',
        summary:
          'Utility-first CSS Framework ยุคใหม่ที่ตั้งค่าผ่าน CSS โดยตรง (@theme) คอมไพล์รวดเร็วและรองรับ Design Token อย่างเป็นระบบ',
      },
      {
        slug: 'shadcn-radix-lucide',
        title: 'shadcn/ui + Radix UI + Lucide React',
        shortTitle: 'shadcn/ui + Radix + Lucide',
        category: 'frontend',
        categoryLabel: 'Frontend',
        version: 'UI Primitives',
        summary:
          'การผสาน Headless Accessible Primitives (Radix UI) เข้ากับโค้ด Component ที่ปรับแต่งได้เอง (shadcn/ui) และชุดไอคอนเวกเตอร์ (Lucide)',
      },
      {
        slug: 'zustand',
        title: 'Zustand',
        shortTitle: 'Zustand',
        category: 'frontend',
        categoryLabel: 'Frontend',
        version: 'v5.x',
        summary:
          'ระบบจัดการ Global State ขนาดเล็กที่ใช้งานผ่าน Hook ได้ทันทีโดยไม่ต้องห่อ Context Provider ซ้อนกันหลายชั้น',
      },
      {
        slug: 'react-hook-form-zod',
        title: 'React Hook Form + Zod',
        shortTitle: 'React Hook Form + Zod',
        category: 'frontend',
        categoryLabel: 'Frontend',
        version: 'Form & Schema',
        summary:
          'การจัดการฟอร์มประสิทธิภาพสูงแบบลดการ Re-render ควบคู่กับการตรวจสอบความถูกต้องของข้อมูลด้วย Schema-first Validation',
      },
      {
        slug: 'recharts',
        title: 'Recharts',
        shortTitle: 'Recharts',
        category: 'frontend',
        categoryLabel: 'Frontend',
        version: 'v2.x',
        summary:
          'ไลบรารีสร้างกราฟและ Visualization ในรูปแบบ React SVG Components ที่อ่านเข้าใจง่ายและรองรับ Responsive',
      },
      {
        slug: 'notifications',
        title: 'Sonner / SweetAlert2 / React Toastify',
        shortTitle: 'Sonner / SweetAlert2 / Toastify',
        category: 'frontend',
        categoryLabel: 'Frontend',
        version: 'Feedback UI',
        summary:
          'การเลือกใช้ระบบแจ้งเตือน (Toast และ Modal Dialog) ทั้ง 3 รูปแบบให้เหมาะกับบริบทการใช้งานของผู้ใช้',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    accentDot: 'bg-emerald-500/80 dark:bg-emerald-400/80',
    items: [
      {
        slug: 'nestjs',
        title: 'NestJS 11 + Node.js',
        shortTitle: 'NestJS 11 + Node.js',
        category: 'backend',
        categoryLabel: 'Backend',
        version: 'v11.x',
        summary:
          'เฟรมเวิร์กฝั่งเซิร์ฟเวอร์ที่มีโครงสร้างชัดเจนด้วยระบบ Module, Controller, Service และ Dependency Injection',
      },
      {
        slug: 'prisma',
        title: 'Prisma ORM',
        shortTitle: 'Prisma ORM',
        category: 'backend',
        categoryLabel: 'Backend',
        version: 'v6.x',
        summary:
          'Type-safe ORM สำหรับเชื่อมต่อฐานข้อมูลผ่านไฟล์ Schema พร้อมระบบสร้าง Migration และ Query อัตโนมัติ',
      },
      {
        slug: 'auth-security',
        title: 'JWT + Passport.js + Bcrypt + Cookie-parser',
        shortTitle: 'JWT + Passport + Bcrypt + Cookie',
        category: 'backend',
        categoryLabel: 'Backend',
        version: 'Auth & Security',
        summary:
          'กระบวนการยืนยันตัวตน การเข้ารหัสรหัสผ่านทางเดียว และการจัดเก็บ Token ใน HttpOnly Cookie อย่างปลอดภัย',
      },
      {
        slug: 'class-validator',
        title: 'Class-validator + Class-transformer',
        shortTitle: 'Class-validator + Transformer',
        category: 'backend',
        categoryLabel: 'Backend',
        version: 'DTO Validation',
        summary:
          'ด่านตรวจสอบและแปลงชนิดข้อมูลขาเข้า (Incoming Payload) ในระดับ DTO ก่อนเข้าสู่กระบวนการทำงานของ Controller',
      },
      {
        slug: 'multer',
        title: 'Multer',
        shortTitle: 'Multer',
        category: 'backend',
        categoryLabel: 'Backend',
        version: 'File Multipart',
        summary:
          'Middleware สำหรับรับและคัดกรองไฟล์อัปโหลดในรูปแบบ multipart/form-data ก่อนส่งต่อไปยัง Cloud Storage',
      },
    ],
  },
  {
    id: 'cloud-ai',
    title: 'Database & Cloud / AI',
    accentDot: 'bg-amber-500/80 dark:bg-amber-400/80',
    items: [
      {
        slug: 'postgresql-docker',
        title: 'PostgreSQL 16 บน Docker',
        shortTitle: 'PostgreSQL 16 (Docker)',
        category: 'cloud-ai',
        categoryLabel: 'Database & Cloud / AI',
        version: 'PG 16',
        summary:
          'การจัดเตรียมฐานข้อมูลเชิงสัมพันธ์มาตรฐานสูงในรูปแบบ Container เพื่อให้สภาพแวดล้อมการพัฒนาเหมือนกันทุกเครื่อง',
      },
      {
        slug: 'supabase-storage',
        title: 'Supabase Storage',
        shortTitle: 'Supabase Storage',
        category: 'cloud-ai',
        categoryLabel: 'Database & Cloud / AI',
        version: 'Object Storage',
        summary:
          'พื้นที่จัดเก็บไฟล์รูปภาพและสลิปโอนเงินบนระบบ Cloud พร้อมระบบกำหนดสิทธิ์การเข้าถึงและ CDN',
      },
      {
        slug: 'groq-ai',
        title: 'Groq SDK (Llama 3.1 8B)',
        shortTitle: 'Groq SDK (Llama 3.1 8B)',
        category: 'cloud-ai',
        categoryLabel: 'Database & Cloud / AI',
        version: 'LPU Inference',
        summary:
          'การประมวลผลโมเดลภาษาขนาดใหญ่ความเร็วสูงผ่านชิป LPU เพื่อสกัดและตรวจสอบความถูกต้องของข้อมูลเป็น JSON',
      },
    ],
  },
  {
    id: 'testing',
    title: 'Testing & Quality',
    accentDot: 'bg-purple-500/80 dark:bg-purple-400/80',
    items: [
      {
        slug: 'jest',
        title: 'Jest',
        shortTitle: 'Jest',
        category: 'testing',
        categoryLabel: 'Testing & Quality',
        version: 'Unit Testing',
        summary:
          'เฟรมเวิร์กสำหรับการเขียน Unit Test และการจำลองส่วนประกอบ (Mocking) เพื่อตรวจสอบความถูกต้องของ Business Logic',
      },
      {
        slug: 'supertest',
        title: 'Supertest',
        shortTitle: 'Supertest',
        category: 'testing',
        categoryLabel: 'Testing & Quality',
        version: 'E2E HTTP Testing',
        summary:
          'เครื่องมือจำลองการยิง HTTP Request ทดสอบการทำงานของ API ครบวงจรตั้งแต่ต้นทางถึงปลายทาง (End-to-End)',
      },
      {
        slug: 'eslint-prettier',
        title: 'ESLint + Prettier',
        shortTitle: 'ESLint + Prettier',
        category: 'testing',
        categoryLabel: 'Testing & Quality',
        version: 'Code Quality',
        summary:
          'การตรวจสอบคุณภาพโค้ดเชิงโครงสร้าง (Static Analysis) ควบคู่กับการจัดรูปแบบโค้ดให้เป็นมาตรฐานเดียวกัน',
      },
    ],
  },
];

export const ALL_DOCS_ITEMS: DocTopicMeta[] = DOCS_CATEGORIES.flatMap(
  (group) => group.items
);

export function getDocMetaBySlug(slug: string): DocTopicMeta | undefined {
  return ALL_DOCS_ITEMS.find((item) => item.slug === slug);
}

export function getAdjacentDocs(slug: string): {
  prev: DocTopicMeta | null;
  next: DocTopicMeta | null;
} {
  const index = ALL_DOCS_ITEMS.findIndex((item) => item.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? ALL_DOCS_ITEMS[index - 1] : null,
    next: index < ALL_DOCS_ITEMS.length - 1 ? ALL_DOCS_ITEMS[index + 1] : null,
  };
}
