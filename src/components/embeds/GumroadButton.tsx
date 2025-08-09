import { useEffect } from "react";

export default function GumroadButton({ url, label = "Buy on Gumroad" }: { url: string; label?: string }) {
  useEffect(() => {
    if (document.querySelector('script[src="https://gumroad.com/js/gumroad.js"]')) return;
    const s = document.createElement("script");
    s.src = "https://gumroad.com/js/gumroad.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      // keep script for subsequent buttons; do not remove
    };
  }, []);

  return (
    <a className="gumroad-button" href={url} target="_blank" rel="noreferrer noopener">{label}</a>
  );
}

