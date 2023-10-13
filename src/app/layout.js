import './globals.css'
import { Inter } from 'next/font/google'
import { ThemProvider } from '@/context/context'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todolist',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}
