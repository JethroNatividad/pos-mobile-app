import React from "react";
import { Circle, Triangle, Square, Star } from "lucide-react";

export type ItemShape = "circle" | "triangle" | "square" | "star";

export type ShapeConfig = {
    value: ItemShape;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
};

export const SHAPES: ShapeConfig[] = [
    { value: "circle", label: "Circle", Icon: Circle },
    { value: "triangle", label: "Triangle", Icon: Triangle },
    { value: "square", label: "Square", Icon: Square },
    { value: "star", label: "Star", Icon: Star },
];

export const COLORS = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#64748b", // slate
    "#78716c", // stone
    "#737373", // neutral
    "#ffffff", // white
];

export type CreateItemFormData = {
    name: string;
    category: string;
    price: string;
    cost: string;
    trackStock: boolean;
    initialStock: string;
    shape: ItemShape;
    color: string;
};
