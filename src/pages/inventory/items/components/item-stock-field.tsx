import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CreateItemFormData } from "./create-item-types";

type Props = {
    control: Control<CreateItemFormData>;
    trackStock: boolean;
};

export function ItemStockField({ control, trackStock }: Props) {
    return (
        <div className="space-y-4">
            <FormField
                control={control}
                name="trackStock"
                render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <FormLabel className="text-base font-medium">Track Stock</FormLabel>
                            <p className="text-sm text-muted-foreground">
                                Monitor and manage inventory levels
                            </p>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            {trackStock && (
                <FormField
                    control={control}
                    name="initialStock"
                    rules={{
                        required: "Initial stock is required",
                        min: { value: 0, message: "Stock must be at least 0" },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Initial Stock</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    inputMode="numeric"
                                    min="0"
                                    step="1"
                                    placeholder="0"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </div>
    );
}
