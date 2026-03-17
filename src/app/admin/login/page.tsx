"use client";

import { useState } from "react";
import { Flame, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 mb-4 shadow-lg shadow-red-500/30">
            <Flame className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Cimol Bojot AA</h1>
          <p className="text-zinc-400 text-sm mt-1">Admin Panel</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-6">
            Masuk ke Dashboard
          </h2>

          <div className="space-y-4">
            <div>
              <Label className="text-zinc-300 text-sm mb-1.5 block">
                Email
              </Label>
              <Input
                type="email"
                placeholder="admin@cimolbojot.com"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
              />
            </div>

            <div>
              <Label className="text-zinc-300 text-sm mb-1.5 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-red-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {show
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 h-11 mt-2">
              Masuk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}