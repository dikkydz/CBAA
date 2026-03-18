import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding...");

  // Permissions
  const perms = await Promise.all([
    prisma.permission.upsert({ where: { name: "manage_users" }, update: {}, create: { name: "manage_users", label: "Kelola Pengguna & Role" } }),
    prisma.permission.upsert({ where: { name: "manage_absensi" }, update: {}, create: { name: "manage_absensi", label: "Kelola Absensi Semua Pegawai" } }),
    prisma.permission.upsert({ where: { name: "view_rekap" }, update: {}, create: { name: "view_rekap", label: "Lihat Rekap Absensi" } }),
    prisma.permission.upsert({ where: { name: "export_data" }, update: {}, create: { name: "export_data", label: "Export Data PDF/Excel" } }),
    prisma.permission.upsert({ where: { name: "absensi_self" }, update: {}, create: { name: "absensi_self", label: "Clock In/Out Sendiri" } }),
  ]);
  const [manageUsers, manageAbsensi, viewRekap, exportData, absensiSelf] = perms;

  // Roles
  await prisma.role.upsert({
    where: { name: "owner" }, update: {},
    create: { name: "owner", label: "Owner", permissions: { connect: perms.map((p) => ({ id: p.id })) } },
  });
  await prisma.role.upsert({
    where: { name: "admin" }, update: {},
    create: { name: "admin", label: "Admin", permissions: { connect: [{ id: manageAbsensi.id }, { id: viewRekap.id }, { id: exportData.id }, { id: absensiSelf.id }] } },
  });
  await prisma.role.upsert({
    where: { name: "pegawai" }, update: {},
    create: { name: "pegawai", label: "Pegawai", permissions: { connect: [{ id: absensiSelf.id }] } },
  });

  // Categories
  const original = await prisma.category.upsert({ where: { slug: "original" }, update: {}, create: { name: "Original", slug: "original", icon: "🔥" } });
  const isi = await prisma.category.upsert({ where: { slug: "isi" }, update: {}, create: { name: "Cimol Isi", slug: "isi", icon: "🧀" } });
  const frozen = await prisma.category.upsert({ where: { slug: "frozen" }, update: {}, create: { name: "Frozen", slug: "frozen", icon: "❄️" } });
  const paket = await prisma.category.upsert({ where: { slug: "paket" }, update: {}, create: { name: "Paket", slug: "paket", icon: "📦" } });

  // Products
  const products = [
    { name: "Cimol Bojot Original", slug: "cimol-bojot-original", image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80", description: "Cimol klasik dengan tepung kanji premium. Gurih, kenyal, dan bikin nagih!", price: 15000, categoryId: original.id, isFeatured: true, spicyLevel: 2, weight: "200g" },
    { name: "Cimol Isi Keju Mozarella", slug: "cimol-isi-keju-mozarella", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80", description: "Cimol kenyal isi keju mozarella yang meleleh di setiap gigitan.", price: 20000, categoryId: isi.id, isFeatured: true, spicyLevel: 1, weight: "200g" },
    { name: "Cimol Isi Ayam Pedas", slug: "cimol-isi-ayam-pedas", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", description: "Cimol kenyal isi ayam suwir berbumbu pedas. Cocok untuk pecinta pedas!", price: 18000, categoryId: isi.id, isFeatured: true, spicyLevel: 3, weight: "200g" },
    { name: "Cimol Frozen Original 500g", slug: "cimol-frozen-original", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", description: "Cimol original dalam kemasan frozen. Praktis, tahan 3 bulan di freezer.", price: 35000, categoryId: frozen.id, isFeatured: false, spicyLevel: 0, weight: "500g" },
    { name: "Cimol Frozen Keju 500g", slug: "cimol-frozen-keju", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", description: "Cimol isi keju dalam kemasan frozen. Stok di rumah, goreng kapanpun!", price: 45000, categoryId: frozen.id, isFeatured: false, spicyLevel: 0, weight: "500g" },
    { name: "Paket Hemat Duo", slug: "paket-hemat-duo", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", description: "2 porsi cimol original + 2 minuman. Hemat dan mengenyangkan untuk berdua!", price: 25000, categoryId: paket.id, isFeatured: true, spicyLevel: 1, weight: "400g" },
  ];

  for (const p of products) {
    await prisma.product.upsert({ where: { slug: p.slug }, update: {}, create: p });
  }

  // Testimonials
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      { name: "Budi Santoso", message: "Cimolnya enak banget! Kenyal, gurih, bumbu kacangnya nampol. Sudah jadi langganan tiap minggu!", rating: 5, location: "Sumedang" },
      { name: "Siti Rahayu", message: "Cimol isi kejunya favorite banget! Pas digoreng keju meleleh, kombinasinya sempurna.", rating: 5, location: "Bandung" },
      { name: "Ahmad Fauzi", message: "Beli frozen 2 pack buat stok di rumah. Praktis banget, tinggal goreng. Rasanya tetap enak!", rating: 5, location: "Cimahi" },
      { name: "Dewi Anggraini", message: "Cimol ayam pedasnya mantap! Pedasnya beneran nendang tapi nagih. Pelayanan juga ramah.", rating: 5, location: "Sumedang" },
      { name: "Roni Kurniawan", message: "Enak, harga terjangkau, porsi banyak. Anak-anak saya juga suka banget. Selalu repeat order!", rating: 4, location: "Jatinangor" },
      { name: "Maya Putri", message: "Paket hemat duo-nya worth it banget! Cukup untuk berdua dan harganya bersahabat.", rating: 5, location: "Sumedang" },
    ],
  });

  console.log("✅ Seed selesai!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());