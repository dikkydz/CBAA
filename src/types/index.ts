// ─── PUBLIC ──────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  spicyLevel: number;
  weight: string | null;
  categoryId: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  rating: number;
  avatar: string | null;
  location: string | null;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | "PENDING" | "CONFIRMED" | "PROCESSING"
  | "SHIPPED" | "DELIVERED" | "CANCELLED";

// ─── ADMIN ───────────────────────────────────────────────

export interface Permission {
  id: string;
  name: string;
  label: string;
}

export interface Role {
  id: string;
  name: string;
  label: string;
  permissions: Permission[];
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string | null;
  avatar: string | null;
  isActive: boolean;
  roleId: string;
  role: Role;
  createdAt: Date;
}

export type StatusAbsensi =
  | "HADIR" | "TERLAMBAT" | "IZIN" | "SAKIT" | "ALPHA";

export interface Absensi {
  id: string;
  userId: string;
  user: UserProfile;
  tanggal: Date;
  jamMasuk: Date | null;
  jamKeluar: Date | null;
  lokasiMasuk: string | null;
  lokasiKeluar: string | null;
  fotoMasuk: string | null;
  fotoKeluar: string | null;
  status: StatusAbsensi;
  keterangan: string | null;
}

export interface AdminSession {
  user: { id: string; email: string };
  profile: UserProfile;
}