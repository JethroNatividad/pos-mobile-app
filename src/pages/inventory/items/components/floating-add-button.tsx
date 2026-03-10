import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingAddButton() {
  return (
    <Button
      size="icon"
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 h-14 w-14 rounded-full shadow-lg z-50"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add Item</span>
    </Button>
  );
}
