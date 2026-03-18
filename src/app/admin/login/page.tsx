"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

export default function LoginPage() {
  const [show,    setShow]    = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2a0a0a 0%, #1a0808 60%, #0d0404 100%)" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: "#9c3232" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15"
          style={{ backgroundColor: "#e4bd6a" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #e4bd6a 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="inline-flex w-16 h-16 rounded-2xl items-center justify-center font-display font-bold text-3xl mb-5 shadow-2xl"
            style={{
              backgroundColor: "#9c3232",
              color: "#e4bd6a",
              boxShadow: "0 8px 32px rgba(156,50,50,0.4)",
            }}
          >
            C
          </div>
          <h1
            className="font-display font-bold text-2xl mb-1"
            style={{ color: "#e4bd6a" }}
          >
            Cimol Bojot AA
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>
            Masuk ke Admin Panel
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8 border"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(228,189,106,0.15)",
          }}
        >
          <div
            className="flex items-center gap-2 mb-6"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            <Lock className="w-4 h-4" style={{ color: "#e4bd6a" }} />
            <span className="font-semibold text-sm">Login Administrator</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="admin@cimolbojot.com"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(228,189,106,0.2)",
                  color: "#ffffff",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#e4bd6a";
                  e.target.style.boxShadow = "0 0 0 3px rgba(228,189,106,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(228,189,106,0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(228,189,106,0.2)",
                    color: "#ffffff",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#e4bd6a";
                    e.target.style.boxShadow = "0 0 0 3px rgba(228,189,106,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(228,189,106,0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-all hover:opacity-70"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {show
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye    className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-semibold text-base transition-all hover:opacity-90 flex items-center justify-center gap-2 mt-2 shadow-lg"
              style={{
                backgroundColor: "#9c3232",
                color: "#e4bd6a",
                boxShadow: "0 4px 20px rgba(156,50,50,0.4)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Masuk...
                </>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          © 2025 Cimol Bojot AA
        </p>
      </div>
    </div>
  );
}