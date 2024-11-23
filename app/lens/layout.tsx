import type { Metadata } from "next";
import "./../globals.css";
import LensHeader from "./lens-header";
import { robotoFont } from "../(main)/layout";

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
        className={`${robotoFont.variable} antialiased h-screen overflow-hidden`}
      >
        <LensHeader />
        {children}
      </body>
    </html>
  );
}

