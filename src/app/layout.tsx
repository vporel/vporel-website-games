import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/site";
import "./globals.css";

const display = Fredoka({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Nunito({ variable: "--font-body", subsets: ["latin"] });

const TITLE = `Jeux en ligne entre amis — ${SITE_NAME}`;
const DESCRIPTION = "Des jeux de société à jouer en ligne avec tes amis, sans installation : un pseudo, un code de salle, et c'est parti.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: SITE_URL, siteName: SITE_NAME, title: TITLE, description: DESCRIPTION, locale: "fr_FR" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#17130f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${body.variable} antialiased`}>{children}</body>
    </html>
  );
}
