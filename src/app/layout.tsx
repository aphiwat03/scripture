import type { Metadata } from 'next';
import { Inter, Sarabun, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const sarabun = Sarabun({
  variable: '--font-sarabun',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Scripture — Full-Stack Engineering Documentation',
    template: '%s — Scripture Docs',
  },
  description:
    'เอกสารรวบรวมความรู้และการใช้งาน Tech Stack ครบวงจร (Next.js 16, React 19, NestJS 11, Prisma, PostgreSQL 16, Supabase, Groq AI, Testing)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning className="h-full antialiased">
      <body
        className={`${inter.variable} ${sarabun.variable} ${geistMono.variable} min-h-full flex flex-col bg-canvas text-ink selection:bg-accent/20 selection:text-accent font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
