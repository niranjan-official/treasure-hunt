import { Inter } from 'next/font/google'
import './globals.css'
import { UserDetails } from './context/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Treasure Hunt',
  description: 'Qr treasure hunt for protek 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserDetails>
          {children}
        </UserDetails>
      </body>
    </html>
  )
}
