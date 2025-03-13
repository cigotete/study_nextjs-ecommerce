import type { Metadata } from 'next'
import { inter } from '@/config/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Ewow - The wowcommerce',
    default: 'Home - Ewow | The wowcommerce'
  },
  description: 'Pay and say wow!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}