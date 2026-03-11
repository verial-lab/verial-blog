import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verial Writing Tool",
  description: "Block-based essay writing with AI co-editing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-verial-bg font-sans text-gray-200 antialiased">
        <header className="sticky top-0 z-50 border-b border-verial-border bg-verial-bg/80 backdrop-blur">
          <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
            <a href="/" className="text-sm font-medium tracking-wide text-white">
              verial<span className="text-verial-primary">/write</span>
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
