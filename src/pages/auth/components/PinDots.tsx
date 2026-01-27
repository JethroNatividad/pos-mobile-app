interface PinDotsProps {
  length: number;
  filledCount: number;
}

export function PinDots({ length, filledCount }: PinDotsProps) {
  return (
    <div className="flex justify-center gap-3 mb-8">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full border-2 transition-all ${
            index < filledCount
              ? "bg-primary border-primary"
              : "bg-transparent border-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}
