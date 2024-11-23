import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./header";
import Footer from "./footer";

const openSansFont = localFont({
  src: "./fonts/OpenSans.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Google",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSansFont.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

