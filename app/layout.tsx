import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../component/navbar";
import TopBar from "@/component/top_bar";

import { Poppins, Lora } from "next/font/google";
import Footer from "@/component/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins", 
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lora", 
});

export const metadata: Metadata = {
  title: "School Website",
  description: "Govt High School No.01 Hasilpur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
      <body className="font-lora min-h-screen">
        <TopBar />
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
