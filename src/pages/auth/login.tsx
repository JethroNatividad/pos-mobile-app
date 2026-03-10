import { useEffect, useState } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PinInput } from "./components/PinInput";
import { getUsers, verifyPin, loginSession, User } from "@/api/users";

type LoginFormData = {
    userId: string;
    pin: string;
};

export default function Login() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
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
            userId: "",
            pin: "",
        },
    });

    const userId = watch("userId");
    const pin = watch("pin");
    const maxLength = 6;
    const selectedUser = users.find((u) => u.id.toString() === userId);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getUsers();
            setUsers(result);
        };
        fetchUsers();
    }, []);

    const handleUserChange = (value: string) => {
        setValue("userId", value);
        setValue("pin", "");
        clearErrors();
    };

    const handlePinChange = (value: string) => {
        clearErrors("pin");
        setValue("pin", value);
    };

    const onSubmit = async (data: LoginFormData) => {
        if (!selectedUser) return;

        setIsLoading(true);
        try {
            const isValid = await verifyPin(data.pin, selectedUser.pin_hash);
            if (!isValid) {
                setError("pin", {
                    type: "manual",
                    message: "Invalid PIN. Please try again.",
                });
                setValue("pin", "");
                return;
            }

            await loginSession(selectedUser.id, selectedUser.name, selectedUser.role);
            navigate("/", { replace: true });
        } catch {
            setError("pin", {
                type: "manual",
                message: "Something went wrong. Please try again.",
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
                    <div className="mb-6">
                        <Select
                            value={userId}
                            onValueChange={handleUserChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((user) => (
                                    <SelectItem
                                        key={user.id}
                                        value={user.id.toString()}
                                    >
                                        {user.name} ({user.role})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>
                        Select your account and enter your PIN
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


                        {userId && (
                            <>
                                <PinInput
                                    value={pin}
                                    maxLength={maxLength}
                                    onValueChange={handlePinChange}
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={
                                        pin.length !== maxLength || isLoading
                                    }
                                >
                                    {isLoading ? "Verifying..." : "Unlock"}
                                </Button>
                            </>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

