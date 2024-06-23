import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import {UserProvider} from "./context/UserContext";

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
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
