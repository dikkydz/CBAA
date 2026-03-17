export default function MarqueeSection() {
  const items = [
    "🔥 Cimol Bojot Original",
    "🧀 Cimol Isi Keju",
    "🌶️ Cimol Pedas",
    "❄️ Frozen Ready Stock",
    "📦 Paket Hemat",
    "🚚 Pesan Antar",
    "⭐ Rating 5 Bintang",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="bg-red-500 text-white py-3.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 font-semibold text-sm tracking-wide">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}