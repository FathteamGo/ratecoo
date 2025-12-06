import type { Metadata } from "next";
import "./globals.css";
import { StarryBackground, ThemeToggle } from "@ratecoo/ui";

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
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 relative min-h-screen overflow-x-hidden">
        <StarryBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
