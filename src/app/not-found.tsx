import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl mb-6">🍢</div>
        <h1 className="font-display font-black text-6xl text-red-500 mb-3">
          404
        </h1>
        <h2 className="font-display font-bold text-2xl mb-3">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-muted-foreground mb-8">
          Halaman yang kamu cari tidak ada. Mungkin kamu butuh cimol untuk
          menenangkan diri? 😄
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="flame-gradient border-0 text-white">
              Kembali ke Beranda
            </Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline">Lihat Menu</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}