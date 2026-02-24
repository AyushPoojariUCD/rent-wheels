import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
