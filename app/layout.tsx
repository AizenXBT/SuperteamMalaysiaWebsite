import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Instrument_Serif } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
})

const archivo = localFont({
  src: "../public/fonts/Archivo/Archivo-VariableFont_wdth,wght.ttf",
  variable: "--font-archivo",
})

export const metadata: Metadata = {
  title: "Superteam Malaysia – The Talent Layer of Solana",
  description:
    "Superteam Malaysia is a community of the best talent learning, earning, and building in the Solana ecosystem. Join us to connect, build, and grow Web3 in Malaysia.",
  generator: "v0.app",
  icons: {
    icon: "/media/images/stmy-logo.jpg",
    apple: "/media/images/stmy-logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
