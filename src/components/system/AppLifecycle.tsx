import { useEffect } from "react";
import { captureAffiliate } from "@/lib/affiliate";

export default function AppLifecycle() {
  useEffect(() => {
    captureAffiliate();
  }, []);
  return null;
}
