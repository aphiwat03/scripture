import type { Metadata } from 'next'
import { Geist_Mono, Sarabun } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const sarabun = Sarabun({
  variable: '--font-sarabun',
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The best scripture',
  description: 'รวมคำสั่งและ API ที่ใช้บ่อยในการพัฒนาซอฟต์แวร์ พร้อมคำอธิบายภาษาไทย ตัวอย่างโค้ด และ syntax ที่ครบถ้วน',
  keywords: ['javascript', 'nextjs', 'api', 'documentation', 'thai', 'ภาษาไทย', 'developer'],
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="th"
      className={`${sarabun.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
