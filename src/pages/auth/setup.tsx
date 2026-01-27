import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PinInput } from "./components/PinInput";

type PinFormData = {
  pin: string;
  confirmPin: string;
};

export default function Setup() {
  const [step, setStep] = useState<"pin" | "confirm">("pin");

  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PinFormData>({
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  const pin = watch("pin");
  const confirmPin = watch("confirmPin");
  const currentPin = step === "pin" ? pin : confirmPin;
  const maxLength = 6;

  const handlePinChange = (value: string) => {
    if (step === "pin") {
      setValue("pin", value);
    } else {
      clearErrors("confirmPin");
      setValue("confirmPin", value);
    }
  };

  const handleContinue = () => {
    if (pin.length === maxLength) {
      setStep("confirm");
    }
  };

  const handleBack = () => {
    setValue("confirmPin", "");
    clearErrors("confirmPin");
    setStep("pin");
  };

  const onSubmit = (data: PinFormData) => {
    if (data.pin !== data.confirmPin) {
      setError("confirmPin", {
        type: "manual",
        message: "PINs do not match. Please try again.",
      });
      setValue("confirmPin", "");
      return;
    }

    // TODO: Implement PIN setup logic
    console.log("PIN Setup:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {step === "pin" ? "Setup PIN" : "Confirm PIN"}
          </CardTitle>
          <CardDescription>
            {step === "pin"
              ? "Create a 6-digit PIN to secure your account"
              : "Re-enter your PIN to confirm"}
          </CardDescription>
          {errors.confirmPin && (
            <p className="text-sm text-destructive mt-2">
              {errors.confirmPin.message}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PinInput
              value={currentPin}
              maxLength={maxLength}
              onValueChange={handlePinChange}
            />

            <div className="flex gap-3">
              {step === "confirm" && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}

              {step === "pin" ? (
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handleContinue}
                  disabled={pin.length !== maxLength}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={confirmPin.length !== maxLength}
                >
                  Confirm
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
