"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <button type="button" onClick={logout} disabled={loading} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-60">
      <LogOut size={16} /> {loading ? "Signing out" : "Sign Out"}
    </button>
  );
}
