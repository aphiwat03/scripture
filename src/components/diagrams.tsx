'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Globe,
  Layers,
  Server,
  Database,
  HardDrive,
  Play,
  Pause,
  ChevronRight,
  Lock,
  Cookie,
  UploadCloud,
  Cpu,
  RefreshCw,
} from 'lucide-react';

interface FlowStep {
  id: string;
  label: string;
  sublabel: string;
  protocol: string;
  title: string;
  description: string;
  codeHint: string;
  icon: React.ComponentType<{ className?: string }>;
}

const REQUEST_FLOW_STEPS: FlowStep[] = [
  {
    id: 'browser',
    label: 'Browser',
    sublabel: 'Client UI',
    protocol: 'HTTPS Request',
    title: '1. Browser ส่งคำขอ (User Action / Navigation)',
    description:
      'เมื่อผู้ใช้เปิดหน้าเว็บหรือกดปุ่มทำรายการ เบราว์เซอร์จะส่ง HTTP Request พร้อมแนบ HttpOnly Cookie ไปยังเซิร์ฟเวอร์หน้าบ้านของ Next.js',
    codeHint: 'GET /orders/1024 หรือ Server Action POST',
    icon: Globe,
  },
  {
    id: 'nextjs',
    label: 'Next.js 16',
    sublabel: 'App Router (RSC)',
    protocol: 'Internal API / Fetch',
    title: '2. Next.js 16 ประมวลผล Server Component',
    description:
      'Next.js รันโค้ดฝั่งเซิร์ฟเวอร์ ดึงข้อมูลจาก Backend API โดยไม่ต้องเปิดเผย Secret Key ออกไปที่เบราว์เซอร์ และเตรียมสร้าง HTML พร้อม RSC Payload',
    codeHint: 'const res = await fetch(`${API_URL}/orders/1024`, { cache: "no-store" })',
    icon: Layers,
  },
  {
    id: 'nestjs',
    label: 'NestJS 11',
    sublabel: 'Guard → Pipe → Service',
    protocol: 'Prisma Client Call',
    title: '3. NestJS 11 ตรวจสอบสิทธิ์และรัน Business Logic',
    description:
      'Request ผ่านด่าน JwtAuthGuard เพื่อตรวจสิทธิ์ ผ่าน ValidationPipe เพื่อตรวจรูปแบบข้อมูล (DTO) แล้วส่งให้ Service ประมวลผลกฎทางธุรกิจ',
    codeHint: '@UseGuards(JwtAuthGuard) → ordersService.findOne(id)',
    icon: Server,
  },
  {
    id: 'prisma',
    label: 'Prisma ORM',
    sublabel: 'Type-safe Query',
    protocol: 'SQL over TCP :5432',
    title: '4. Prisma ORM แปลคำสั่งเป็น SQL ที่ปลอดภัย',
    description:
      'Prisma แปลงคำสั่ง TypeScript ของ Service ให้กลายเป็น Parameterized SQL Query อัตโนมัติ ช่วยป้องกัน SQL Injection และคืนค่ากลับมาพร้อมชนิดข้อมูลที่แม่นยำ',
    codeHint: 'await prisma.order.findUnique({ where: { id }, include: { items: true } })',
    icon: Cpu,
  },
  {
    id: 'postgres',
    label: 'PostgreSQL 16',
    sublabel: 'Docker Container',
    protocol: 'Result Rows',
    title: '5. PostgreSQL 16 อ่าน/บันทึกข้อมูลและส่งผลลัพธ์กลับ',
    description:
      'ฐานข้อมูล PostgreSQL ที่รันอยู่ใน Docker ประมวลผลคำสั่ง SQL ดึงข้อมูลจากตารางด้วย Index และส่งข้อมูลย้อนกลับตามเส้นทางเดิมไปแสดงผลที่หน้าจอผู้ใช้',
    codeHint: 'SELECT * FROM "Order" WHERE "id" = $1 LIMIT 1;',
    icon: Database,
  },
];

const UPLOAD_FLOW_STEPS: FlowStep[] = [
  {
    id: 'multer',
    label: 'Multer',
    sublabel: 'Memory Buffer',
    protocol: 'multipart/form-data',
    title: '1. Multer รับไฟล์สลิปและตรวจสอบขนาด/นามสกุล',
    description:
      'NestJS ใช้ FileInterceptor คู่กับ Multer รับไฟล์รูปสลิปเข้าสู่ Memory Buffer ชั่วคราว พร้อมตรวจสอบขนาดไฟล์และ MIME Type ก่อนส่งต่อ',
    codeHint: '@UseInterceptors(FileInterceptor("slip"))',
    icon: UploadCloud,
  },
  {
    id: 'supabase',
    label: 'Supabase Storage',
    sublabel: 'Cloud Bucket',
    protocol: 'HTTPS Object Upload',
    title: '2. อัปโหลดไฟล์ไปเก็บที่ Supabase Storage',
    description:
      'ส่ง Buffer ของไฟล์รูปไปจัดเก็บใน Bucket บน Supabase Storage เพื่อแยกไฟล์มีเดียออกจากเครื่องเซิร์ฟเวอร์หลัก แล้วรับ URL ของรูปกลับมา',
    codeHint: 'supabase.storage.from("slips").upload(path, file.buffer)',
    icon: HardDrive,
  },
  {
    id: 'groq',
    label: 'Groq SDK',
    sublabel: 'Llama 3.1 8B',
    protocol: 'JSON Inference',
    title: '3. Groq (Llama 3.1 8B) ตรวจสอบข้อมูลสลิปความเร็วสูง',
    description:
      'ส่งข้อมูลที่สกัดจากสลิปให้โมเดล Llama 3.1 8B บนชิป LPU วิเคราะห์เทียบกับยอดสั่งซื้อจริง และตอบกลับเป็นโครงสร้าง JSON ภายในเสี้ยววินาที',
    codeHint: 'groq.chat.completions.create({ model: "llama-3.1-8b-instant" })',
    icon: Cpu,
  },
  {
    id: 'db-save',
    label: 'Prisma + PG 16',
    sublabel: 'Transaction Commit',
    protocol: 'ACID Update',
    title: '4. บันทึกผลการตรวจสอบลงฐานข้อมูล PostgreSQL',
    description:
      'เมื่อ AI ยืนยันว่ายอดโอนและบัญชีถูกต้อง Prisma จะอัปเดตสถานะคำสั่งซื้อเป็น PAID พร้อมบันทึก URL สลิปและรหัสอ้างอิงกันสลิปซ้ำ',
    codeHint: 'prisma.order.update({ data: { status: "PAID", slipUrl } })',
    icon: Database,
  },
];

const AUTH_FLOW_STEPS: FlowStep[] = [
  {
    id: 'credentials',
    label: 'Login Form',
    sublabel: 'RHF + Zod',
    protocol: 'POST /auth/login',
    title: '1. ตรวจสอบข้อมูลล็อกอินหน้าบ้านด้วย Zod',
    description:
      'React Hook Form และ Zod ตรวจสอบรูปแบบอีเมลและรหัสผ่านเบื้องต้นก่อนส่งข้อมูลผ่าน HTTPS ไปยัง NestJS Backend',
    codeHint: 'const { email, password } = loginSchema.parse(formData)',
    icon: Globe,
  },
  {
    id: 'bcrypt',
    label: 'Bcrypt',
    sublabel: 'Password Verify',
    protocol: 'Hash Comparison',
    title: '2. เปรียบเทียบรหัสผ่านด้วย Bcrypt Hash',
    description:
      'นำรหัสผ่านที่ส่งมาเปรียบเทียบกับ Password Hash ที่เก็บในฐานข้อมูลด้วยฟังก์ชัน bcrypt.compare() โดยไม่ต้องถอดรหัสย้อนกลับ',
    codeHint: 'const isValid = await bcrypt.compare(password, user.passwordHash)',
    icon: Lock,
  },
  {
    id: 'jwt-passport',
    label: 'JWT + Passport',
    sublabel: 'Token Signing',
    protocol: 'HS256 Signature',
    title: '3. สร้างและลงลายเซ็นดิจิทัล JWT Token',
    description:
      'เมื่อรหัสผ่านถูกต้อง JwtService จะสร้าง Access Token ที่บรรจุ User ID และ Role พร้อมเซ็นกำกับด้วย Secret Key',
    codeHint: 'const token = this.jwtService.sign({ sub: user.id, role: user.role })',
    icon: Server,
  },
  {
    id: 'cookie',
    label: 'HttpOnly Cookie',
    sublabel: 'Cookie-parser',
    protocol: 'Set-Cookie Header',
    title: '4. แนบ Token ลงใน HttpOnly Cookie ส่งกลับ Browser',
    description:
      'ส่ง Token กลับผ่าน Header Set-Cookie แบบ HttpOnly เพื่อป้องกันสคริปต์ฝั่งหน้าบ้าน (XSS) แอบอ่านค่า และเบราว์เซอร์จะแนบส่งกลับให้อัตโนมัติในคำขอถัดไป',
    codeHint: 'res.cookie("access_token", token, { httpOnly: true, sameSite: "lax" })',
    icon: Cookie,
  },
];

const REACT_LIFECYCLE_STEPS: FlowStep[] = [
  {
    id: 'mount',
    label: '1. Mount',
    sublabel: 'Initial Render',
    protocol: 'Create DOM',
    title: '1. Mounting (สร้างและแสดงผล Component ครั้งแรก)',
    description:
      'React เรียกฟังก์ชัน Component อ่านค่า Props และ State เริ่มต้น สร้าง Virtual DOM แล้วนำไปวาดลงบนหน้าจอจริง จากนั้นจึงรัน useEffect ที่กำหนด Dependency เป็น []',
    codeHint: 'useEffect(() => { fetchInitialData(); }, [])',
    icon: Layers,
  },
  {
    id: 'update',
    label: '2. Update',
    sublabel: 'State / Props Change',
    protocol: 'Re-render & Diff',
    title: '2. Updating (อัปเดตเมื่อ State หรือ Props เปลี่ยนแปลง)',
    description:
      'เมื่อผู้ใช้โต้ตอบจนค่า State เปลี่ยน (เช่น กดปุ่มเพิ่มจำนวน หรือพิมพ์ในฟอร์ม) React จะคำนวณเปรียบเทียบจุดที่ต่าง (Reconciliation) และอัปเดตเฉพาะจุดนั้นบนหน้าจอ',
    codeHint: 'setCount((prev) => prev + 1) // อัปเดตเฉพาะ DOM ส่วนที่ใช้ count',
    icon: RefreshCw,
  },
  {
    id: 'unmount',
    label: '3. Unmount',
    sublabel: 'Cleanup',
    protocol: 'Remove & Clean',
    title: '3. Unmounting (ถอดถอน Component ออกจากหน้าจอ)',
    description:
      'เมื่อเปลี่ยนหน้าหรือซ่อน Component ระบบจะรัน Cleanup Function ใน useEffect เพื่อยกเลิก Timer หรือการเชื่อมต่อข้อมูล ป้องกันปัญหา Memory Leak',
    codeHint: 'useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, [])',
    icon: Cpu,
  },
];

interface StepFlowDiagramProps {
  variant?: 'request' | 'upload' | 'auth' | 'lifecycle';
  title?: string;
  subtitle?: string;
}

export function InteractiveFlowDiagram({
  variant = 'request',
  title,
  subtitle,
}: StepFlowDiagramProps) {
  const prefersReducedMotion = useReducedMotion();
  const steps =
    variant === 'upload'
      ? UPLOAD_FLOW_STEPS
      : variant === 'auth'
      ? AUTH_FLOW_STEPS
      : variant === 'lifecycle'
      ? REACT_LIFECYCLE_STEPS
      : REQUEST_FLOW_STEPS;

  const defaultTitle =
    variant === 'upload'
      ? 'แผนภาพการอัปโหลดและตรวจสอบสลิป (Multer → Supabase → Groq AI)'
      : variant === 'auth'
      ? 'แผนภาพการยืนยันตัวตน (Authentication & HttpOnly Cookie Flow)'
      : variant === 'lifecycle'
      ? 'วงจรการทำงานของ React Component (Component Lifecycle)'
      : 'แผนภาพการเดินทางของข้อมูล (Full-Stack Request Flow)';

  const defaultSubtitle =
    variant === 'upload'
      ? 'แสดงลำดับการส่งไฟล์จากหน้าบ้านไปจัดเก็บบน Cloud และประมวลผลด้วยโมเดลภาษาความเร็วสูง'
      : variant === 'auth'
      ? 'แสดงขั้นตอนการตรวจสอบรหัสผ่านด้วย Bcrypt และการจัดเก็บ JWT ใน HttpOnly Cookie'
      : variant === 'lifecycle'
      ? 'แสดง 3 ช่วงชีวิตหลักของ Component ตั้งแต่เริ่มสร้าง อัปเดตค่า ไปจนถึงการคืนทรัพยากร'
      : 'แสดงเส้นทางตั้งแต่ Browser ส่ง Request ผ่าน Next.js 16 ไปยัง NestJS 11, Prisma ORM และ PostgreSQL 16';

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion || !isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isPlaying, isMounted, prefersReducedMotion, steps.length]);

  const currentStep = steps[activeIndex] || steps[0];

  return (
    <div className="my-8 apple-card p-5 sm:p-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4 mb-5 border-b border-hairline">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-accent mb-0.5">
            Interactive Architecture Flow
          </div>
          <h4 className="text-base sm:text-lg font-semibold tracking-tight text-ink">
            {title || defaultTitle}
          </h4>
          <p className="text-xs text-muted mt-0.5">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          {(!isMounted || !prefersReducedMotion) && (
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-subtle hover:bg-accent-soft text-ink hover:text-accent border border-hairline transition duration-200 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>หยุดชั่วคราว</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span>เล่นอัตโนมัติ</span>
                </>
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setActiveIndex((prev) => (prev + 1) % steps.length);
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-subtle hover:bg-accent-soft text-ink hover:text-accent border border-hairline transition duration-200 cursor-pointer"
          >
            <span>ถัดไป</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Nodes Row with Travelling Pulse */}
      <div
        className={`grid grid-cols-1 gap-2.5 ${
          steps.length === 5
            ? 'sm:grid-cols-5'
            : steps.length === 4
            ? 'sm:grid-cols-4'
            : 'sm:grid-cols-3'
        }`}
      >
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeIndex;
          const isPassed = idx < activeIndex;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setIsPlaying(false);
              }}
              className={`group relative text-left p-3.5 rounded-2xl border transition-all duration-200 ease-out cursor-pointer ${
                isActive
                  ? 'bg-accent-soft border-accent shadow-[0_0_0_1px_var(--accent)]'
                  : isPassed
                  ? 'bg-subtle/60 border-hairline opacity-90 hover:opacity-100'
                  : 'bg-subtle/30 border-hairline opacity-65 hover:opacity-95'
              }`}
            >
              {/* Top row: Step number + active light dot */}
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'bg-subtle text-muted group-hover:text-ink'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Animated Indicator Light */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-accent scale-125 shadow-[0_0_8px_var(--accent)]'
                        : isPassed
                        ? 'bg-accent/40'
                        : 'bg-hairline'
                    }`}
                  />
                </div>
              </div>

              <div className="font-semibold text-xs sm:text-[13px] tracking-tight text-ink truncate">
                {step.label}
              </div>
              <div className="text-[11px] text-muted truncate">
                {step.sublabel}
              </div>
              <div className="mt-2 pt-1.5 border-t border-hairline text-[10px] font-mono text-faint truncate">
                {step.protocol}
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress Bar Connecting Nodes */}
      <div className="my-4 h-1 w-full rounded-full bg-subtle overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300 ease-out rounded-full"
          style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Active Step Explanation Box */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep.id}
          initial={isMounted && !prefersReducedMotion ? { opacity: 0, y: 4 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={isMounted && !prefersReducedMotion ? { opacity: 0, y: -4 } : undefined}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-2xl bg-subtle p-4 border border-hairline"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
            <h5 className="text-sm font-semibold text-ink">
              {currentStep.title}
            </h5>
            <span className="text-[11px] font-mono text-accent bg-accent-soft px-2.5 py-0.5 rounded-full w-fit">
              ขั้นที่ {activeIndex + 1} จาก {steps.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted leading-[1.7] mb-3">
            {currentStep.description}
          </p>
          <div className="px-3 py-2 rounded-xl bg-code text-[#e8e8ed] font-mono text-xs overflow-x-auto">
            <code>{currentStep.codeHint}</code>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
