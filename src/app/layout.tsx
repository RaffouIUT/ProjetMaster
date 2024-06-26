import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ToastProvider from '@/providers/toast.provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProjectMaster',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ToastProvider>
            {children}
        </ToastProvider>
      </body>
    </html>
  )
}
