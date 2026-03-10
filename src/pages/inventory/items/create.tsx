import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateItemForm } from "./components/create-item-form";

export default function CreateItemPage() {
    const navigate = useNavigate();

    return (
        <div className="h-full bg-background flex flex-col">
            {/* Page Header */}
            <div className="flex items-center gap-3 p-4 border-b shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="-ml-2"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Go back</span>
                </Button>
                <h1 className="text-xl font-bold tracking-tight">Create Item</h1>
            </div>

            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto p-4">
                <CreateItemForm />
            </div>
        </div>
    );
}
