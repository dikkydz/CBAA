import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: {
    default:  "Cimol Bojot AA | Jajanan Cimol Autentik Sumedang",
    template: "%s | Cimol Bojot AA",
  },
  description:
    "Cimol Bojot AA — jajanan cimol kenyal dan lezat khas Sumedang. Tersedia varian original, isi keju, isi ayam, dan frozen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              color:      "hsl(var(--foreground))",
              border:     "1px solid hsl(var(--border))",
            },
          }}
        />
      </body>
    </html>
  );
}