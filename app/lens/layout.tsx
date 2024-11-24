import type { Metadata } from "next";
import "./../globals.css";
import LensHeader from "./lens-header";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
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
    <html lang="en" className="h-screen overflow-hidden">
      <body
        className={`${roboto.className} antialiased h-screen overflow-hidden`}
      >
        <LensHeader />
        {children}
      </body>
    </html>
  );
}

