import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { hasAdmin, getSession } from "@/api/users";

type GuardStatus = "loading" | "no-admin" | "no-session" | "authenticated";

export default function AuthGuard() {
    const [status, setStatus] = useState<GuardStatus>("loading");

    useEffect(() => {
        const check = async () => {
            try {
                const adminExists = await hasAdmin();
                if (!adminExists) {
                    setStatus("no-admin");
                    return;
                }

                const session = await getSession();
                if (!session.user_id) {
                    setStatus("no-session");
                    return;
                }

                setStatus("authenticated");
            } catch (error) {
                console.error("Failed to check auth status:", error);
                setStatus("no-admin");
            }
        };

        check();
    }, []);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (status === "no-admin") {
        return <Navigate to="/setup" replace />;
    }

    if (status === "no-session") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
