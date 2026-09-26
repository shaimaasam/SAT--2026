import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAT Math 2026 - Interactive Workbook",
  description:
    "Professional SAT Math preparation platform with interactive lessons, quizzes, and step-by-step solutions. Built for SAT 2026 candidates.",
  keywords: [
    "SAT",
    "SAT Math",
    "SAT 2026",
    "Algebra",
    "Geometry",
    "Statistics",
    "Quiz",
    "Practice",
  ],
  authors: [{ name: "Mrs. Shaimaa Darwish" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "SAT Math 2026 - Interactive Workbook",
    description: "Professional SAT Math preparation with interactive lessons",
    siteName: "SAT Math 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAT Math 2026 - Interactive Workbook",
    description: "Professional SAT Math preparation with interactive lessons",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
