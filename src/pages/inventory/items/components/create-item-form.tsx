import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CreateItemFormData } from "./create-item-types";
import { ItemStockField } from "./item-stock-field";
import { ItemAppearancePicker } from "./item-appearance-picker";

export function CreateItemForm() {
    const form = useForm<CreateItemFormData>({
        defaultValues: {
            name: "",
            category: "",
            price: "",
            cost: "",
            trackStock: false,
            initialStock: "",
            shape: "square",
            color: "#3b82f6",
        },
    });

    const trackStock = form.watch("trackStock");
    const selectedShape = form.watch("shape");
    const selectedColor = form.watch("color");

    const onSubmit = (_data: CreateItemFormData) => {
        // TODO: implement submit
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Iced Latte" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Category */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Category{" "}
                                <span className="text-muted-foreground text-xs">(Optional)</span>
                            </FormLabel>
                            <Select
                                onValueChange={(val) => field.onChange(val === "none" ? "" : val)}
                                value={field.value === "" ? "none" : field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="No Category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">No Category</SelectItem>
                                    {/* TODO: populate from DB */}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Price */}
                <FormField
                    control={form.control}
                    name="price"
                    rules={{
                        required: "Price is required",
                        min: { value: 0, message: "Price must be at least 0" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    inputMode="decimal"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Cost */}
                <FormField
                    control={form.control}
                    name="cost"
                    rules={{
                        required: "Cost is required",
                        min: { value: 0, message: "Cost must be at least 0" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cost</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    inputMode="decimal"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Track Stock + Initial Stock */}
                <ItemStockField control={form.control} trackStock={trackStock} />

                {/* Shape + Color */}
                <ItemAppearancePicker
                    control={form.control}
                    selectedShape={selectedShape}
                    selectedColor={selectedColor}
                />

                {/* Submit */}
                <Button type="submit" className="w-full" size="lg">
                    Create Item
                </Button>

                {/* Bottom safe area spacer */}
                <div className="h-safe-area-inset-bottom" />
            </form>
        </Form>
    );
}
