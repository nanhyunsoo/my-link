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

const baseUrl = "https://my-link-bay-one.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "MyLink - Development in One Link",
    template: "%s | MyLink",
  },
  description: "Share all your developer links—GitHub, Blog, Portfolio—in a single, high-contrast, brutalist page. Optimized for developers and recruiters.",
  keywords: ["developer links", "link-in-bio for developers", "portfolio links", "github links", "developer profile", "mylink", "tech portfolio"],
  authors: [{ name: "MyLink Team" }],
  creator: "MyLink Team",
  publisher: "MyLink",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "MyLink - Development in One Link",
    description: "Share all your developer links in a single, high-contrast page.",
    url: baseUrl,
    siteName: "MyLink",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${baseUrl}/opengraph-image?v=5`,
        width: 1200,
        height: 630,
        alt: "MyLink - Development in One Link",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLink - Development in One Link",
    description: "Share all your developer links in a single, high-contrast page.",
    images: [`${baseUrl}/opengraph-image?v=5`],
    creator: "@mylink",
  },
  verification: {
    google: "google-site-verification-id", // User might need to update this
  },
  category: "technology",
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
