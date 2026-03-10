import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function FloatingAddButton() {
  const navigate = useNavigate();

  return (
    <Button
      size="icon"
      onClick={() => navigate("/inventory/items/create")}
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 h-14 w-14 rounded-full shadow-lg z-50"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add Item</span>
    </Button>
  );
}
