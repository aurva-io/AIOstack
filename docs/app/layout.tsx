import type { Metadata } from "next"
import { Poppins, Inter_Tight, JetBrains_Mono } from "next/font/google"
import { GoogleTagManager } from "@next/third-parties/google"

import { Settings } from "@/lib/meta"
import { Navbar } from "@/components/navigation/navbar"
import { Providers } from "@/components/providers"
import { ConditionalPadding } from "@/components/conditional-padding"

import "@/styles/globals.css"

const inter = Poppins({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "500"
})

const interTight = Inter_Tight({
  variable: "--font-v4-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-v4-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const baseUrl = Settings.metadataBase

export const metadata: Metadata = {
  title: Settings.title,
  metadataBase: new URL(baseUrl),
  description: Settings.description,
  keywords: Settings.keywords,
  openGraph: {
    type: Settings.openGraph.type,
    url: baseUrl,
    title: Settings.openGraph.title,
    description: Settings.openGraph.description,
    siteName: Settings.openGraph.siteName,
    images: Settings.openGraph.images.map((image) => ({
      ...image,
      url: `${baseUrl}${image.url}`,
    })),
  },
  twitter: {
    card: Settings.twitter.card,
    title: Settings.twitter.title,
    description: Settings.twitter.description,
    site: Settings.twitter.site,
    images: Settings.twitter.images.map((image) => ({
      ...image,
      url: `${baseUrl}${image.url}`,
    })),
  },
  alternates: {
    canonical: baseUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {Settings.gtmconnected && <GoogleTagManager gtmId={Settings.gtm} />}
      <body className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} font-regular overflow-x-hidden`}>
        <Providers>
          <Navbar />
          <ConditionalPadding>{children}</ConditionalPadding>
        </Providers>
      </body>
    </html>
  )
}
