import { Button } from "@/components/ui/button";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onDelete: () => void;
  maxLength: number;
  currentLength: number;
}

export function NumberPad({
  onNumberClick,
  onDelete,
  maxLength,
  currentLength,
}: NumberPadProps) {
  const numberPad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "del"],
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {numberPad.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          if (value === "") {
            return <div key={`${rowIndex}-${colIndex}`} />;
          }

          if (value === "del") {
            return (
              <Button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                variant="outline"
                className="h-16 text-lg font-semibold"
                onClick={onDelete}
                disabled={currentLength === 0}
              >
                ⌫
              </Button>
            );
          }

          return (
            <Button
              key={`${rowIndex}-${colIndex}`}
              type="button"
              variant="outline"
              className="h-16 text-xl font-semibold"
              onClick={() => onNumberClick(value)}
              disabled={currentLength >= maxLength}
            >
              {value}
            </Button>
          );
        }),
      )}
    </div>
  );
}
