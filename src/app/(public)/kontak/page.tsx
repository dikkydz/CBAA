"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Clock, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const schema = z.object({
  name:    z.string().min(2, "Nama minimal 2 karakter"),
  phone:   z.string().min(10, "Nomor tidak valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function KontakPage() {
  const [sent,    setSent]    = useState(false);
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
    <div className="pt-[68px] min-h-screen" style={{ backgroundColor: "#fdf6f0" }}>
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: "#9c3232" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, #e4bd6a 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4 glass"
            style={{ color: "#e4bd6a" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#e4bd6a" }} />
            Hubungi Kami
          </div>
          <h1
            className="font-display font-bold text-5xl md:text-6xl text-white mb-4"
          >
            Ada{" "}
            <span style={{ color: "#e4bd6a" }}>Pertanyaan?</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            Kami siap membantu kamu kapanpun.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            <h2
              className="font-display font-bold text-2xl mb-2"
              style={{ color: "#1a0808" }}
            >
              Informasi Kontak
            </h2>

            {[
              { icon: MapPin,  label: "Lokasi",   value: "Jl. Bojot No. 1, Sumedang, Jawa Barat", href: undefined },
              { icon: Phone,   label: "WhatsApp", value: "+62 812-3456-7890", href: "https://wa.me/6281234567890" },
              { icon: Clock,   label: "Jam Buka", value: "Sen–Sab 08.00–20.00 | Min 09.00–18.00", href: undefined },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex gap-4 p-4 rounded-2xl border"
                style={{ backgroundColor: "#ffffff", borderColor: "#edd5c8" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#9c3232" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#e4bd6a" }} />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "#9c3232" }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium transition-all hover:opacity-70"
                      style={{ color: "#1a0808" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm" style={{ color: "#4a2a2a" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WA CTA */}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Chat via WhatsApp</p>
                <p className="text-xs text-white/75">Respon dalam hitungan menit!</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl overflow-hidden border"
              style={{ backgroundColor: "#ffffff", borderColor: "#edd5c8" }}
            >
              <div
                className="px-8 py-6"
                style={{ backgroundColor: "#9c3232" }}
              >
                <h2
                  className="font-display font-bold text-xl text-white"
                >
                  Kirim Pesan
                </h2>
              </div>

              <div className="px-8 py-8">
                {sent ? (
                  <div className="text-center py-10">
                    <CheckCircle2
                      className="w-16 h-16 mx-auto mb-4"
                      style={{ color: "#9c3232" }}
                    />
                    <h3
                      className="font-display font-bold text-xl mb-2"
                      style={{ color: "#1a0808" }}
                    >
                      Pesan Terkirim!
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "#7a5252" }}>
                      Terima kasih! Kami akan membalas sesegera mungkin.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="px-6 py-3 rounded-2xl text-sm font-semibold border-2 transition-all hover:opacity-70"
                      style={{ borderColor: "#9c3232", color: "#9c3232" }}
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {[
                      { name: "name",    label: "Nama Lengkap *",  placeholder: "Nama kamu",       as: "input" },
                      { name: "phone",   label: "Nomor WhatsApp *", placeholder: "08xx-xxxx-xxxx",  as: "input" },
                      { name: "message", label: "Pesan *",          placeholder: "Tuliskan pesanmu...", as: "textarea" },
                    ].map(({ name, label, placeholder, as }) => {
                      const Component  = as === "textarea" ? "textarea" : "input";
                      const fieldError = (errors as any)[name]?.message;
                      return (
                        <div key={name}>
                          <label
                            className="block text-sm font-medium mb-1.5"
                            style={{ color: "#4a2a2a" }}
                          >
                            {label}
                          </label>
                          <Component
                            placeholder={placeholder}
                            className="w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all focus:border-[#9c3232] resize-none"
                            style={{
                              backgroundColor: "#fdf6f0",
                              borderColor: fieldError ? "#dc2626" : "#edd5c8",
                              color: "#1a0808",
                              minHeight: as === "textarea" ? "120px" : "auto",
                            }}
                            {...register(name as any)}
                          />
                          {fieldError && (
                            <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                              {fieldError}
                            </p>
                          )}
                        </div>
                      );
                    })}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-lg"
                      style={{
                        backgroundColor: "#9c3232",
                        color: "#e4bd6a",
                        boxShadow: "0 4px 20px rgba(156,50,50,0.3)",
                      }}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Kirim Pesan
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}