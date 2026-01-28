import { PinDots } from "./PinDots";
import { NumberPad } from "./NumberPad";

interface PinInputProps {
  value: string;
  maxLength?: number;
  onValueChange: (value: string) => void;
}

export function PinInput({
  value,
  maxLength = 6,
  onValueChange,
}: PinInputProps) {
  const handleNumberClick = (num: string) => {
    if (value.length < maxLength) {
      onValueChange(value + num);
    }
  };

  const handleDelete = () => {
    onValueChange(value.slice(0, -1));
  };

  return (
    <div>
      <PinDots length={maxLength} filledCount={value.length} />
      <NumberPad
        onNumberClick={handleNumberClick}
        onDelete={handleDelete}
        maxLength={maxLength}
        currentLength={value.length}
      />
    </div>
  );
}
