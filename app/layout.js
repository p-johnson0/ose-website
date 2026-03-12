import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata = {
  title: 'Omaha Stage Equipment, Inc. | Stage Curtains, Lighting & Rigging',
  description: 'Nebraska\'s trusted source for theatrical stage curtains, LED lighting systems, and rigging. Serving schools and performance venues since 1926.',
  keywords: 'stage curtains Nebraska, theatrical lighting Nebraska, stage rigging, school auditorium curtains, theatrical equipment Omaha',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DJ05FCHRZG" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DJ05FCHRZG');
            `,
          }}
        />
      </head>
      <body className="font-body bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
