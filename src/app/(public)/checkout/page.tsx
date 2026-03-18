"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  User, Phone, MapPin, FileText,
  CheckCircle2, Loader2, ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";

const schema = z.object({
  customerName:    z.string().min(2, "Nama minimal 2 karakter"),
  customerPhone:   z.string().min(10, "Nomor tidak valid")
    .regex(/^(\+62|62|0)[0-9]{8,13}$/, "Format nomor tidak valid"),
  customerAddress: z.string().min(10, "Alamat minimal 10 karakter"),
  notes:           z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function InputField({
  label, icon: Icon, error, ...props
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  [key: string]: any;
}) {
  const isTextarea = props.as === "textarea";
  const Component  = isTextarea ? "textarea" : "input";
  const { as, ...rest } = props;

  return (
    <div>
      <label
        className="block text-sm font-medium mb-1.5"
        style={{ color: "#4a2a2a" }}
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3.5 w-4 h-4"
          style={{
            color: "#9c3232",
            top: isTextarea ? "14px" : "50%",
            transform: isTextarea ? "none" : "translateY(-50%)",
          }}
        />
        <Component
          className="w-full rounded-2xl border text-sm outline-none transition-all focus:border-[#9c3232] focus:ring-2 focus:ring-[#9c3232]/10 resize-none"
          style={{
            paddingLeft: "2.5rem",
            paddingRight: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            backgroundColor: "#ffffff",
            borderColor: error ? "#dc2626" : "#edd5c8",
            color: "#1a0808",
            minHeight: isTextarea ? "100px" : "auto",
          }}
          {...rest}
        />
      </div>
      {error && (
        <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const router   = useRouter();
  const { state, clearCart, totalPrice } = useCart();
  const { items } = state;
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [submitting, setSubmitting]   = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) { toast.error("Keranjang masih kosong!"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            productId: i.product.id,
            quantity:  i.quantity,
            price:     i.product.price,
          })),
          totalAmount: totalPrice,
        }),
      });
      if (!res.ok) throw new Error();
      const order = await res.json();
      clearCart();
      setOrderNumber(order.orderNumber);
    } catch {
      toast.error("Gagal memproses pesanan. Coba lagi!");
    } finally {
      setSubmitting(false);
    }
  };

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  // Success
  if (orderNumber) {
    return (
      <div
        className="pt-[68px] min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fdf6f0" }}
      >
        <div className="text-center max-w-md mx-auto px-6">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ backgroundColor: "#9c3232" }}
          >
            🎉
          </div>
          <h1
            className="font-display font-bold text-3xl mb-2"
            style={{ color: "#1a0808" }}
          >
            Pesanan Berhasil!
          </h1>
          <p className="mb-1" style={{ color: "#7a5252" }}>
            Nomor pesanan kamu:
          </p>
          <p
            className="font-display font-bold text-2xl mb-4"
            style={{ color: "#9c3232" }}
          >
            {orderNumber}
          </p>
          <p className="text-sm mb-8" style={{ color: "#7a5252" }}>
            Kami akan segera memproses pesananmu dan menghubungi via WhatsApp
            dalam waktu singkat.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/menu")}
              className="py-3.5 rounded-2xl font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
            >
              Pesan Lagi
            </button>
            <button
              onClick={() => router.push("/")}
              className="py-3.5 rounded-2xl font-semibold border-2 transition-all hover:opacity-70"
              style={{ borderColor: "#edd5c8", color: "#7a5252" }}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div
        className="pt-[68px] min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fdf6f0" }}
      >
        <div className="text-center max-w-md mx-auto px-6">
          <p className="text-6xl mb-4">🛒</p>
          <h1
            className="font-display font-bold text-2xl mb-2"
            style={{ color: "#1a0808" }}
          >
            Keranjang Kosong
          </h1>
          <p className="mb-8" style={{ color: "#7a5252" }}>
            Yuk tambahkan cimol favoritmu dulu!
          </p>
          <button
            onClick={() => router.push("/menu")}
            className="px-8 py-3.5 rounded-2xl font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
          >
            Lihat Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pt-[68px] min-h-screen"
      style={{ backgroundColor: "#fdf6f0" }}
    >
      {/* Header */}
      <div
        className="py-10"
        style={{ backgroundColor: "#9c3232" }}
      >
        <div className="container mx-auto px-6">
          <h1
            className="font-display font-bold text-4xl text-white mb-1"
          >
            Checkout
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            {totalItems} item · {formatPrice(totalPrice)}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div
                className="rounded-3xl p-6 border"
                style={{ backgroundColor: "#ffffff", borderColor: "#edd5c8" }}
              >
                <h2
                  className="font-display font-bold text-xl mb-5 flex items-center gap-2"
                  style={{ color: "#1a0808" }}
                >
                  <User className="w-5 h-5" style={{ color: "#9c3232" }} />
                  Data Pemesan
                </h2>

                <div className="space-y-4">
                  <InputField
                    label="Nama Lengkap *"
                    icon={User}
                    placeholder="Masukkan nama lengkap"
                    error={errors.customerName?.message}
                    {...register("customerName")}
                  />
                  <InputField
                    label="Nomor WhatsApp *"
                    icon={Phone}
                    placeholder="08xx-xxxx-xxxx"
                    error={errors.customerPhone?.message}
                    {...register("customerPhone")}
                  />
                  <InputField
                    label="Alamat Lengkap *"
                    icon={MapPin}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan..."
                    error={errors.customerAddress?.message}
                    as="textarea"
                    {...register("customerAddress")}
                  />
                  <InputField
                    label="Catatan (Opsional)"
                    icon={FileText}
                    placeholder="Permintaan khusus, level pedas, dll..."
                    as="textarea"
                    {...register("notes")}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl font-semibold text-base transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
                style={{
                  backgroundColor: "#9c3232",
                  color: "#e4bd6a",
                  boxShadow: "0 4px 20px rgba(156,50,50,0.3)",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Konfirmasi Pesanan
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div
              className="rounded-3xl border sticky top-24"
              style={{ backgroundColor: "#ffffff", borderColor: "#edd5c8" }}
            >
              <div
                className="px-6 py-5 rounded-t-3xl"
                style={{ backgroundColor: "#9c3232" }}
              >
                <h2
                  className="font-display font-bold text-lg text-white flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" style={{ color: "#e4bd6a" }} />
                  Ringkasan Pesanan
                </h2>
              </div>

              <div className="px-6 py-5 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div
                      className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ backgroundColor: "#f5ece6" }}
                    >
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">
                          🍢
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-sm truncate"
                        style={{ color: "#1a0808" }}
                      >
                        {item.product.name}
                      </p>
                      <p className="text-xs" style={{ color: "#7a5252" }}>
                        {item.quantity}x {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <span
                      className="font-bold text-sm shrink-0"
                      style={{ color: "#9c3232" }}
                    >
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="px-6 pb-6 space-y-3 border-t"
                style={{ borderColor: "#edd5c8", paddingTop: "1.25rem" }}
              >
                <div
                  className="flex justify-between text-sm"
                  style={{ color: "#7a5252" }}
                >
                  <span>Subtotal ({totalItems} item)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div
                  className="flex justify-between text-sm"
                  style={{ color: "#7a5252" }}
                >
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold" style={{ color: "#15803d" }}>
                    Gratis*
                  </span>
                </div>
                <div
                  className="flex justify-between font-display font-bold text-xl pt-2 border-t"
                  style={{ borderColor: "#edd5c8", color: "#1a0808" }}
                >
                  <span>Total</span>
                  <span style={{ color: "#9c3232" }}>{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs" style={{ color: "#7a5252" }}>
                  * Gratis ongkir untuk area Sumedang kota. Luar area menyesuaikan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}