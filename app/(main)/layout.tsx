import type { Metadata } from "next";
import localFont from "next/font/local";
import "./../globals.css";
import Header from "../header";
import Footer from "../footer";

export const robotoFont = localFont({
  src: [
    {
      path: "./../fonts/RobotoRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../fonts/RobotoBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../fonts/RobotoMedium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
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
      <body className={`${robotoFont.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

