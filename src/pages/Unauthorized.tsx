import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { Link } from "react-router"

const Unauthorized = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 relative"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1920&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm "></div>

            {/* Content */}
            <div className="relative max-w-lg w-full text-center space-y-6 bg-background/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-red-400">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full border border-red-400">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-foreground">
                    Unauthorized Access
                </h1>

                {/* Subtitle */}
                <p className="text-muted-foreground">
                    You do not have permission to view this page.
                    Please login with the correct account or return home.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                        <Link to="/">Go Home</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/login">Login</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;