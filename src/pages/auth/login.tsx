import { useState } from "react";
import { useNavigate } from "react-router";
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
import { loginWithPin } from "@/api/users";

type LoginFormData = {
    pin: string;
};

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            pin: "",
        },
    });

    const pin = watch("pin");
    const maxLength = 6;

    const handlePinChange = (value: string) => {
        clearErrors("pin");
        setValue("pin", value);
    };

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            await loginWithPin(data.pin);
            navigate("/", { replace: true });
        } catch {
            setError("pin", {
                type: "manual",
                message: "Invalid PIN. Please try again.",
            });
            setValue("pin", "");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Enter PIN</CardTitle>
                    <CardDescription>
                        Enter your 6-digit PIN to unlock
                    </CardDescription>
                    <div className="min-h-6">
                        {errors.pin && (
                            <p className="text-sm text-destructive">
                                {errors.pin.message}
                            </p>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <PinInput
                            value={pin}
                            maxLength={maxLength}
                            onValueChange={handlePinChange}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={pin.length !== maxLength || isLoading}
                        >
                            {isLoading ? "Verifying..." : "Unlock"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
