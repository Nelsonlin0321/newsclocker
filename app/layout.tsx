import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewsClocker - News Intelligence and Subscription Platform",
  description:
    "Stay informed with personalized news alerts delivered to your inbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gray-50">{children}</main>
            <Footer />
          </div>
          <Toaster />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
