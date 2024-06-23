import "./globals.css";

import Head from "next/head";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { UserProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HydroFans",
  description: "Get wet, stay wet!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00afef" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
