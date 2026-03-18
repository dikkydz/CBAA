import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default:  "Cimol Bojot AA | Jajanan Cimol Autentik Sumedang",
    template: "%s | Cimol Bojot AA",
  },
  description:
    "Cimol Bojot AA — jajanan cimol kenyal dan lezat khas Sumedang. Tersedia varian original, isi keju, isi ayam, dan frozen. Pesan sekarang!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#1a0808",
              border: "1px solid #edd5c8",
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}