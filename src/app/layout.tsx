import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from '@/providers/NextAuthProvider'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AILogo',
  description: 'An AI-powered logo maker'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
