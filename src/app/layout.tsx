import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";

const font = Figtree({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Mimir",
  description: "The modern way of learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
