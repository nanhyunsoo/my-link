import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { QueryProvider } from "@/components/query-provider"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Metadata } from "next";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// NEXT_PUBLIC_BASE_URL 환경변수 우선 사용, 없으면 VERCEL_URL, 없으면 폴백
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://my-link-bay-one.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "MyLink - Development in One Link",
    template: "%s | MyLink",
  },
  description: "All your developer links in a single, high-contrast, brutalist page.",
  openGraph: {
    title: "MyLink",
    description: "Development in One Link.",
    url: baseUrl,
    siteName: "MyLink",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "MyLink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLink",
    description: "Development in One Link.",
    images: [`${baseUrl}/opengraph-image`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider>
              <Header />
              {children}
              <Toaster theme="dark" position="bottom-right" />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
