import "./globals.css";
import type { Metadata } from "next";
import {Footer, Navbar} from '@/components'


export const metadata: Metadata = {
  title: "Rent Wheels",
  description: "A car rental service built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
