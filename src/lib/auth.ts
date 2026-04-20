import { cookies } from "next/headers";

export async function getServerSession() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("admin_token");

  if (!token) return null;

  // contoh sederhana (nanti bisa kamu ganti dengan DB)
  if (token.value === "admin123") {
    return {
      profile: {
        name: "Admin",
      },
    };
  }

  return null;
}