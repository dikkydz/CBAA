import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdf6f0" }}
    >
      <div className="text-center max-w-md mx-auto px-6">
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl mx-auto mb-8 shadow-xl"
          style={{ backgroundColor: "#9c3232" }}
        >
          🍢
        </div>
        <h1
          className="font-display font-bold text-8xl mb-3"
          style={{ color: "#9c3232" }}
        >
          404
        </h1>
        <h2
          className="font-display font-bold text-2xl mb-3"
          style={{ color: "#1a0808" }}
        >
          Halaman Tidak Ditemukan
        </h2>
        <p className="mb-8" style={{ color: "#7a5252" }}>
          Halaman yang kamu cari tidak ada. Mungkin kamu butuh cimol untuk
          menenangkan diri? 😄
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <button
              className="px-6 py-3.5 rounded-2xl font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
            >
              Kembali ke Beranda
            </button>
          </Link>
          <Link href="/menu">
            <button
              className="px-6 py-3.5 rounded-2xl font-semibold border-2 transition-all hover:opacity-70"
              style={{ borderColor: "#9c3232", color: "#9c3232" }}
            >
              Lihat Menu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}