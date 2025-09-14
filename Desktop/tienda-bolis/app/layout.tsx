import React from "react";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashIntro from "@/components/SplashIntro";

export const metadata = { 
  title: "Camyla", 
  description: "Tienda de artículos personalizados" 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <SplashIntro />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
