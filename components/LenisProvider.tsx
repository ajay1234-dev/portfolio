"use client";
import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";

export default function LenisProvider() {
  useLenis();
  return null;
}
