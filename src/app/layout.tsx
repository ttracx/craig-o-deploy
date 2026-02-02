import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Craig-O-Deploy | One-Click Deployment Platform",
  description: "Deploy your projects to Vercel, Render, or Railway with a single click. GitHub integration, environment management, and rollback support.",
  keywords: ["deployment", "vercel", "render", "railway", "github", "devops", "ci/cd"],
  authors: [{ name: "VibeCaaS" }],
  openGraph: {
    title: "Craig-O-Deploy | One-Click Deployment Platform",
    description: "Deploy your projects to Vercel, Render, or Railway with a single click.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
