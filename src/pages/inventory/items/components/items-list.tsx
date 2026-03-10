import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

export function ItemsList() {
  // Static mock data for UI visual implementation
  const mockItems = [
    { id: "1", name: "Espresso Maker", category: "Equipment", price: "$299.00", stock: 12 },
    { id: "2", name: "Arabica Beans 1kg", category: "Consumables", price: "$24.00", stock: 45 },
    { id: "3", name: "Paper Cups 8oz (1000x)", category: "Supplies", price: "$45.00", stock: 8 },
    { id: "3", name: "Paper Cups 8oz (1000x)", category: "Supplies", price: "$45.00", stock: 8 },
    { id: "3", name: "Paper Cups 8oz (1000x)", category: "Supplies", price: "$45.00", stock: 8 },
    { id: "3", name: "Paper Cups 8oz (1000x)", category: "Supplies", price: "$45.00", stock: 8 },
    { id: "3", name: "Paper Cups 8oz (1000x)", category: "Supplies", price: "$45.00", stock: 8 },
    { id: "3", name: "Paper Cups 8oz (1000x)", category: "Supplies", price: "$45.00", stock: 8 },
  ];

  return (
    <div className="space-y-3 pb-24">
      {mockItems.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-md bg-secondary flex items-center justify-center shrink-0">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate">{item.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{item.category}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-semibold">{item.price}</div>
              <div className="text-sm text-muted-foreground">In stock: {item.stock}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
