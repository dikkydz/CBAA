"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

const schema = z.object({
  name:    z.string().min(2, "Nama minimal 2 karakter"),
  phone:   z.string().min(10, "Nomor tidak valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: MapPin,  label: "Lokasi",    value: "Jl. Bojot No. 1, Sumedang, Jawa Barat", href: undefined },
  { icon: Phone,   label: "WhatsApp",  value: "+62 812-3456-7890", href: "https://wa.me/6281234567890" },
  { icon: Clock,   label: "Jam Buka",  value: "Sen–Sab 08.00–20.00 | Min 09.00–18.00", href: undefined },
];

export default function KontakPage() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      reset();
    } catch {
      toast.error("Gagal mengirim pesan. Coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="bg-zinc-950 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3">
            📞 Hubungi Kami
          </p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
            Ada Pertanyaan?
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Kami siap membantu kamu kapanpun. Kirim pesan atau langsung
            hubungi via WhatsApp!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-display font-bold text-2xl">
              Informasi Kontak
            </h2>
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex gap-4 p-4 bg-muted/50 rounded-2xl"
              >
                <div className="w-10 h-10 flame-gradient rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white rounded-2xl p-4 hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-6 h-6 shrink-0" />
              <div>
                <p className="font-bold text-sm">Chat via WhatsApp</p>
                <p className="text-xs text-white/80">
                  Respon cepat dalam hitungan menit!
                </p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="font-display font-bold text-2xl mb-6">
                Kirim Pesan
              </h2>

              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl mb-2">
                    Pesan Terkirim!
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Terima kasih! Kami akan membalas sesegera mungkin.
                  </p>
                  <Button variant="outline" onClick={() => setSent(false)}>
                    Kirim Pesan Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <Label className="mb-1.5 block">Nama Lengkap *</Label>
                    <Input placeholder="Nama kamu" {...register("name")} />
                    {errors.name && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Nomor WhatsApp *</Label>
                    <Input placeholder="08xx-xxxx-xxxx" {...register("phone")} />
                    {errors.phone && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Pesan *</Label>
                    <Textarea
                      placeholder="Tuliskan pertanyaan atau pesanmu..."
                      className="min-h-[140px]"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full flame-gradient border-0 text-white gap-2"
                    size="lg"
                    disabled={loading}
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}