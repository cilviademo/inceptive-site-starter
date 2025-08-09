import { useEffect } from "react";
import { products } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";

const NAMES = ["Alex", "Jordan", "Sam", "Taylor", "Chris", "Jamie", "Riley", "Morgan", "Cameron", "Devon"];

export default function LiveSales() {
  const { toast } = useToast();

  useEffect(() => {
    const id = setInterval(() => {
      const p = products[Math.floor(Math.random() * products.length)];
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      toast({
        title: "Recent activity",
        description: `${name} just purchased ${p.title}`,
      });
    }, 25000);
    return () => clearInterval(id);
  }, [toast]);

  return null;
}
