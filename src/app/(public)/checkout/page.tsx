"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingCart, User, Phone, MapPin,
  FileText, CheckCircle2, Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const schema = z.object({
  customerName:    z.string().min(2, "Nama minimal 2 karakter"),
  customerPhone:   z.string().min(10, "Nomor tidak valid").regex(/^(\+62|62|0)[0-9]{8,13}$/, "Format nomor tidak valid"),
  customerAddress: z.string().min(10, "Alamat minimal 10 karakter"),
  notes:           z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart, totalPrice } = useCart();
  const { items } = state;
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  // Success state
  if (orderNumber) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-display font-black text-3xl mb-2">
            Pesanan Masuk! 🎉
          </h1>
          <p className="text-muted-foreground mb-2">
            Nomor pesanan:{" "}
            <span className="font-bold text-primary">{orderNumber}</span>
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Kami akan segera memproses pesananmu dan menghubungi kamu via
            WhatsApp.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              className="flame-gradient border-0 text-white"
              onClick={() => router.push("/menu")}
            >
              Pesan Lagi
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <p className="text-6xl mb-4">🛒</p>
          <h1 className="font-display font-bold text-2xl mb-2">
            Keranjang masih kosong
          </h1>
          <p className="text-muted-foreground mb-8">
            Yuk tambahkan cimol favoritmu dulu!
          </p>
          <Button
            className="flame-gradient border-0 text-white"
            onClick={() => router.push("/menu")}
          >
            Lihat Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display font-black text-3xl md:text-4xl mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-card border border-border rounded-3xl p-6">
                <h2 className="font-display font-bold text-xl mb-5 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Data Pemesan
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label className="mb-1.5 block">Nama Lengkap *</Label>
                    <Input
                      placeholder="Masukkan nama lengkap"
                      {...register("customerName")}
                    />
                    {errors.customerName && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="mb-1.5 block">Nomor WhatsApp *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="08xx-xxxx-xxxx"
                        className="pl-9"
                        {...register("customerPhone")}
                      />
                    </div>
                    {errors.customerPhone && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.customerPhone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="mb-1.5 block">Alamat Lengkap *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea
                        placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan..."
                        className="pl-9 min-h-[100px]"
                        {...register("customerAddress")}
                      />
                    </div>
                    {errors.customerAddress && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.customerAddress.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="mb-1.5 block">
                      Catatan (Opsional)
                    </Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea
                        placeholder="Permintaan khusus, level pedas, dll..."
                        className="pl-9"
                        {...register("notes")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full flame-gradient border-0 text-white"
                size="lg"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Konfirmasi Pesanan"
                )}
              </Button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-3xl p-6 sticky top-24">
              <h2 className="font-display font-bold text-xl mb-5 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Ringkasan
              </h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
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
                      <p className="font-semibold text-sm truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity}x {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <span className="font-bold text-sm shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Ongkos Kirim</span>
                  <span className="text-green-600 font-medium">Gratis*</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                * Gratis ongkir untuk area Sumedang kota.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}