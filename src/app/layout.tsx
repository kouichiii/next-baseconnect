import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/ui/navbar";


export const metadata: Metadata = {
  title: "求人検索アプリ",
  description: "BaseConnect インターンシップ専攻課題",
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
      </body>
    </html>
  );
}
