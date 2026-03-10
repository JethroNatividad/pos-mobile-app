import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import {
    Menu,
    ShoppingCart,
    Package,
    ChevronDown,
    ChevronRight,
    Tags,
    Percent,
    CreditCard,
    List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export default function AppLayout() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // Keep inventory section open if we are in an inventory route
    const isInventoryActive = location.pathname.startsWith("/inventory");
    const [inventoryOpen, setInventoryOpen] = useState(isInventoryActive);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="bg-white border-b h-16 flex items-center px-4 shrink-0 shadow-sm sticky top-0 z-10">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="mr-2">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Sidebar</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-0 flex flex-col">
                        <SheetHeader className="p-4 border-b text-left">
                            <SheetTitle className="text-xl font-bold tracking-tight">POS APP</SheetTitle>
                        </SheetHeader>

                        <div className="flex-1 overflow-auto py-4">
                            <nav className="grid gap-1 px-2">
                                <NavLink
                                    to="/pos"
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                            isActive ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground"
                                        )
                                    }
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    POS
                                </NavLink>

                                <Collapsible
                                    open={inventoryOpen}
                                    onOpenChange={setInventoryOpen}
                                    className="w-full mt-1"
                                >
                                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                        <div className="flex items-center gap-3">
                                            <Package className="h-5 w-5" />
                                            <span>Inventory</span>
                                        </div>
                                        {inventoryOpen ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                    </CollapsibleTrigger>

                                    <CollapsibleContent className="space-y-1 px-3 py-1">
                                        <div className="pl-6 border-l ml-3 mt-1 space-y-1">
                                            <NavLink
                                                to="/inventory/items"
                                                onClick={() => setOpen(false)}
                                                className={({ isActive }) =>
                                                    cn(
                                                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                                        isActive ? "bg-muted text-foreground font-semibold" : "text-muted-foreground"
                                                    )
                                                }
                                            >
                                                <List className="h-4 w-4" />
                                                Items
                                            </NavLink>
                                            <NavLink
                                                to="/inventory/categories"
                                                onClick={() => setOpen(false)}
                                                className={({ isActive }) =>
                                                    cn(
                                                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                                        isActive ? "bg-muted text-foreground font-semibold" : "text-muted-foreground"
                                                    )
                                                }
                                            >
                                                <Tags className="h-4 w-4" />
                                                Categories
                                            </NavLink>
                                            <NavLink
                                                to="/inventory/discounts"
                                                onClick={() => setOpen(false)}
                                                className={({ isActive }) =>
                                                    cn(
                                                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                                        isActive ? "bg-muted text-foreground font-semibold" : "text-muted-foreground"
                                                    )
                                                }
                                            >
                                                <Percent className="h-4 w-4" />
                                                Discounts
                                            </NavLink>
                                            <NavLink
                                                to="/inventory/payment-methods"
                                                onClick={() => setOpen(false)}
                                                className={({ isActive }) =>
                                                    cn(
                                                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                                        isActive ? "bg-muted text-foreground font-semibold" : "text-muted-foreground"
                                                    )
                                                }
                                            >
                                                <CreditCard className="h-4 w-4" />
                                                Payment Methods
                                            </NavLink>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
                <span className="font-semibold text-lg">POS APP</span>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
