import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RateCoo - Collect 5-Star Trust in Seconds",
  description:
    "Modern review & rating widget for small businesses. Free forever for beginners, powerful for professionals.",
  openGraph: {
    title: "RateCoo - Collect 5-Star Trust in Seconds",
    description:
      "Modern review & rating widget for small businesses. Free forever for beginners, powerful for professionals.",
    url: "https://ratecoo.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-slate-900">{children}</body>
    </html>
  );
}
