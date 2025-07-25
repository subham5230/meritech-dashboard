"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/comps-table");
  }, [router]);
  return null;
}
