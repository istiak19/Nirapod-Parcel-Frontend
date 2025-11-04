import { useState } from "react";
import { BookOpen, FileText, Code, Info, Settings, Github, Cloud, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const Docs = () => {
    const [active, setActive] = useState("introduction");

    const sections = [
        { id: "introduction", label: "Introduction", icon: <BookOpen className="w-4 h-4" /> },
        { id: "getting-started", label: "Getting Started", icon: <FileText className="w-4 h-4" /> },
        { id: "api", label: "API Reference", icon: <Code className="w-4 h-4" /> },
        { id: "configuration", label: "Configuration", icon: <Settings className="w-4 h-4" /> },
        { id: "cloudinary", label: "Cloudinary Setup", icon: <Cloud className="w-4 h-4" /> },
        { id: "about", label: "About Project", icon: <Info className="w-4 h-4" /> },
    ];

    return (
        <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card p-4 hidden md:flex flex-col">
                {/* Back to Home */}
                <div className="mb-4 w-full">
                    <Button
                        onClick={() => (window.location.href = "/")}
                        className="flex w-full cursor-pointer items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
                    >
                        <Home className="w-4 h-4" />
                        Back To Home
                    </Button>
                </div>

                <h2 className="text-lg font-semibold mb-4 text-red-500">Documentation</h2>

                <nav className="space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActive(section.id)}
                            className={cn(
                                "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-all cursor-pointer",
                                active === section.id
                                    ? "bg-red-500 text-white"
                                    : "hover:bg-red-100 dark:hover:bg-red-900 text-gray-700 dark:text-gray-300"
                            )}
                        >
                            {section.icon}
                            {section.label}
                        </button>
                    ))}
                </nav>

                <Separator className="my-4" />

                <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer mt-auto flex items-center justify-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => window.open("https://github.com/istiak19/Nirapod-Parcel-Frontend", "_blank")}
                >
                    <Github className="w-4 h-4" />
                    GitHub
                </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
                {active === "introduction" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4 text-red-500">Introduction</h1>
                        <p className="text-muted-foreground">
                            Welcome to the <span className="font-semibold text-red-500">Nirpod</span> documentation.
                            Here you’ll find everything you need to understand and extend the platform — including API references, setup instructions, and usage examples.
                        </p>
                    </section>
                )}

                {active === "getting-started" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4 text-red-500">Getting Started</h1>
                        <p className="mb-2 text-muted-foreground">
                            Follow these steps to get your project running locally:
                        </p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            <code>{`git clone https://github.com/istiak19/Nirapod-Parcel-Frontend
cd nirpod
npm install
npm start`}</code>
                        </pre>
                    </section>
                )}

                {active === "api" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4 text-red-500">API Reference</h1>
                        <p className="mb-2 text-muted-foreground">
                            Example endpoint for fetching dashboard meta data:
                        </p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            <code>{`GET https://nirapod-parcel.vercel.app/api/v1/meta-data

Response:
{
  "success": true,
  "data": {
    "parcelCount": 120,
    "riderCount": 45,
    "completedDeliveries": 98
  }
}`}</code>
                        </pre>
                    </section>
                )}

                {active === "configuration" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4 text-red-500">Configuration</h1>
                        <p className="text-muted-foreground mb-4">
                            The app uses environment variables for configuration.
                            Create a <code>.env</code> file in your project root:
                        </p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            <code>{`REACT_APP_API_URL=https://nirapod-parcel.vercel.app
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset`}</code>
                        </pre>
                    </section>
                )}

                {active === "cloudinary" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4 text-red-500">Cloudinary Setup</h1>
                        <p className="text-muted-foreground mb-4">
                            Cloudinary is used for secure and scalable image uploads in the Nirpod project.
                            Follow these steps to configure it:
                        </p>

                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>
                                Go to{" "}
                                <a href="https://cloudinary.com" className="text-red-500 underline">
                                    Cloudinary
                                </a>{" "}
                                and create a free account.
                            </li>
                            <li>
                                In your Cloudinary Dashboard, find your credentials:
                                <ul className="list-disc list-inside ml-6">
                                    <li>Cloud Name</li>
                                    <li>API Key</li>
                                    <li>API Secret</li>
                                </ul>
                            </li>
                            <li>Add these to your <code>.env</code> file.</li>
                        </ol>

                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm mt-3">
                            <code>{`CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret`}</code>
                        </pre>

                        <p className="text-muted-foreground mt-4">Example Cloudinary image upload:</p>

                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            <code>{`const formData = new FormData();
formData.append("file", imageFile);
formData.append("upload_preset", "your_preset_name");

const res = await fetch(
  \`https://api.cloudinary.com/v1_1/\${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload\`,
  {
    method: "POST",
    body: formData,
  }
);

const data = await res.json();
console.log("Uploaded URL:", data.secure_url);`}</code>
                        </pre>
                    </section>
                )}

                {active === "about" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4 text-red-500">About Nirpod</h1>
                        <p className="text-muted-foreground">
                            Nirpod is a modern parcel delivery management platform built with React.js, TypeScript,
                            Tailwind CSS, and ShadCN UI. It provides role-based dashboards for Senders, Receivers,
                            and Admins with secure authentication, real-time tracking, delivery logs, and analytics.
                        </p>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Docs;