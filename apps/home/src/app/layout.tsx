import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SharedLayout } from "@repo/shared/components";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-manrope",
});
export const metadata: Metadata = {
  title: "Next Store - Home",
  description: "Your one-stop shop for quality products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} font-sans antialiased bg-[#F9F9F9] text-[#333333] dark:bg-[#1a1a1a] dark:text-[#e5e5e5]`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <SharedLayout themeSwitcher={<ThemeSwitcher />}>
            {children}
          </SharedLayout>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
