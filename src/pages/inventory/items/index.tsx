import React from "react";
import { ItemsSearchFilter } from "./components/items-search-filter";
import { ItemsList } from "./components/items-list";
import { FloatingAddButton } from "./components/floating-add-button";

export default function ItemsPage() {
  return (
    <div className="relative h-full bg-background flex flex-col">
      <div className="p-4 flex-none border-b">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Manage Items</h1>
        <ItemsSearchFilter />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <ItemsList />
      </div>

      <FloatingAddButton />
    </div>
  );
}
