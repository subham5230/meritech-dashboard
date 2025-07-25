import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/components/providers/trpc-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meritech Analytics - Software Index Dashboard",
  description:
    "Comprehensive financial analytics dashboard for the Meritech Software Index",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
