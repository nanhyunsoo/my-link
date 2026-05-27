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

export const metadata: Metadata = {
  title: {
    default: "MyLink - Development in One Link",
    template: "%s | MyLink",
  },
  description: "All your developer links in a single, high-contrast, brutalist page.",
  openGraph: {
    title: "MyLink",
    description: "Development in One Link.",
    type: "website",
    siteName: "MyLink",
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
