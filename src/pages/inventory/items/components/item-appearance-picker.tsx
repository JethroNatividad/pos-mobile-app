import { Control, Controller } from "react-hook-form";
import { Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { SHAPES, COLORS, CreateItemFormData, ItemShape } from "./create-item-types";

type Props = {
    control: Control<CreateItemFormData>;
    selectedShape: ItemShape;
    selectedColor: string;
};

export function ItemAppearancePicker({ control, selectedShape, selectedColor }: Props) {
    const previewShape = SHAPES.find((s) => s.value === selectedShape);
    const PreviewIcon = previewShape?.Icon ?? Square;

    return (
        <div className="space-y-4">
            <h2 className="text-base font-semibold">Appearance</h2>

            {/* Preview */}
            <div className="flex justify-center py-4">
                <PreviewIcon className="h-20 w-20" style={{ color: selectedColor }} />
            </div>

            {/* Shape Picker */}
            <div>
                <p className="text-sm font-medium mb-2">Shape</p>
                <Controller
                    control={control}
                    name="shape"
                    render={({ field }) => (
                        <div className="flex gap-3">
                            {SHAPES.map(({ value, label, Icon }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => field.onChange(value)}
                                    className={cn(
                                        "flex-1 flex flex-col items-center gap-2 py-3 rounded-lg border-2 transition-colors",
                                        field.value === value
                                            ? "border-primary bg-primary/5"
                                            : "border-border bg-background",
                                    )}
                                >
                                    <Icon className="h-8 w-8 text-foreground/70" />
                                    <span className="text-xs font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                />
            </div>

            {/* Color Picker */}
            <div>
                <p className="text-sm font-medium mb-2">Color</p>
                <Controller
                    control={control}
                    name="color"
                    render={({ field }) => (
                        <div className="grid grid-cols-6 gap-2">
                            {COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => field.onChange(color)}
                                    className={cn(
                                        "aspect-square rounded-lg border-2 transition-transform",
                                        field.value === color
                                            ? "border-foreground scale-110"
                                            : "border-transparent scale-100",
                                    )}
                                    style={{ backgroundColor: color }}
                                >
                                    <span className="sr-only">{color}</span>
                                </button>
                            ))}
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
