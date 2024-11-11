import { useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { Baloo_Bhai_2 } from "next/font/google"
import { Providers } from "@/app/[locale]/providers"
import "@rainbow-me/rainbowkit/styles.css"
import "./globals.css"

const balooBhai = Baloo_Bhai_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--baloo-bhai",
})

export const metadata: Metadata = {
  title: "Save penguin Gary!",
  description: "Help to save Gary and his job",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  unstable_setRequestLocale("en")
  const messages = useMessages()

  return (
    <html lang="en" className="overflow-hidden">      
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SK1L5K78GF"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SK1L5K78GF');
          `,
        }} />
      </head>
      <body className={`${balooBhai.variable} overflow-hidden antialiased`} suppressHydrationWarning>
        <Providers locale={"en"} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
