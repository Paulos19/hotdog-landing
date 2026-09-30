import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HotDog Artesanal | Os Melhores Hot Dogs da Cidade",
  description:
    "Hot dogs artesanais feitos com ingredientes premium, grelhados na brasa. Entrega expressa em até 32 minutos. Peça agora!",
  keywords: ["hot dog", "artesanal", "delivery", "gourmet", "brasa"],
  openGraph: {
    title: "HotDog Artesanal | Os Melhores Hot Dogs da Cidade",
    description: "Hot dogs artesanais feitos com ingredientes premium. Peça agora!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
