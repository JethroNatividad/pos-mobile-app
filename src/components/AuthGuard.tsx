import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { hasAdmin } from "@/api/users";

export default function AuthGuard() {
    const [loading, setLoading] = useState(true);
    const [adminExists, setAdminExists] = useState(false);

    useEffect(() => {
        const check = async () => {
            try {
                const exists = await hasAdmin();
                setAdminExists(exists);
            } catch (error) {
                console.error("Failed to check admin status:", error);
                setAdminExists(false);
            } finally {
                setLoading(false);
            }
        };

        check();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (!adminExists) {
        return <Navigate to="/setup" replace />;
    }

    return <Outlet />;
}
