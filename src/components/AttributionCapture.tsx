"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/lead";

/** Keeps ad click ids from the landing URL when the visitor moves to the form. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
