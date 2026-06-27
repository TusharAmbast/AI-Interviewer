import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import {  Toast } from "radix-ui"; 
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AICruiter — AI-Powered Interview Platform",
  description: "Automate your hiring with AI-driven interviews. Create, schedule, and evaluate candidates effortlessly with intelligent assessments and instant feedback.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
