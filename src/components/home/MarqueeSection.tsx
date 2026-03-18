const row1 = [
  { emoji: "🍢", text: "Cimol Bojot Original" },
  { emoji: "🧀", text: "Cimol Isi Keju" },
  { emoji: "🌶️", text: "Cimol Pedas" },
  { emoji: "❄️", text: "Frozen Ready" },
  { emoji: "📦", text: "Paket Hemat" },
  { emoji: "⭐", text: "Rating 4.9" },
  { emoji: "🚚", text: "Pesan Antar" },
  { emoji: "✅", text: "Tanpa Pengawet" },
];

const row2 = [
  { emoji: "🔥", text: "Resep Rahasia" },
  { emoji: "🏆", text: "Terpercaya" },
  { emoji: "💛", text: "Bikin Nagih" },
  { emoji: "🌾", text: "Bahan Premium" },
  { emoji: "🍡", text: "Kenyal Sempurna" },
  { emoji: "🎯", text: "Autentik Sumedang" },
  { emoji: "💫", text: "Fresh Setiap Hari" },
  { emoji: "🤤", text: "Bumbu Nampol" },
];

function MarqueeRow({
  items,
  reverse = false,
  bg,
  textColor,
}: {
  items: typeof row1;
  reverse?: boolean;
  bg: string;
  textColor: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="py-3.5 overflow-hidden relative"
      style={{ backgroundColor: bg }}
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${bg}, transparent)`,
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(-90deg, ${bg}, transparent)`,
        }}
      />

      <div
        className={`flex whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 mx-6 text-sm font-semibold tracking-wide"
            style={{ color: textColor }}
          >
            <span>{item.emoji}</span>
            <span>{item.text}</span>
            <span
              className="ml-4 w-1.5 h-1.5 rounded-full opacity-40"
              style={{ backgroundColor: textColor }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <div className="overflow-hidden">
      <MarqueeRow items={row1} bg="#e4bd6a"  textColor="#9c3232" />
      <MarqueeRow items={row2} bg="#9c3232"  textColor="#e4bd6a" reverse />
    </div>
  );
}