import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ItemsSearchFilter() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search items..." 
          className="pl-9 bg-background"
        />
      </div>
      <Button variant="outline" size="icon" className="shrink-0">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="sr-only">Filter</span>
      </Button>
    </div>
  );
}
