import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import ParcelRegister from "@/assets/images/Register.jpg";
import RegisterForm from "@/components/modules/auth/RegisterForm";
import { Helmet } from "react-helmet-async";

const Register = () => {
    return (
        <div className="grid min-h-screen lg:grid-cols-2 bg-background">
            <Helmet>
                <title>Register | Nirapod Parcel</title>
                <meta name="description" content="Welcome to Nirapod Parcel register page" />
            </Helmet>

            <div className="relative hidden lg:block">
                <img
                    src={ParcelRegister}
                    alt="Register background"
                    className="absolute inset-0 h-full w-full object-cover brightness-95 dark:brightness-75"
                />
                <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                <div className="absolute bottom-62 left-10 text-white max-w-md space-y-3">
                    <h2 className="text-3xl font-bold">Join Nirapod Parcel</h2>
                    <p className="text-lg opacity-90">
                        Fast, secure, and reliable delivery services — built for you.
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-10 sm:px-8 md:px-16 bg-background">

                <div className="mb-10 flex justify-center md:justify-start">
                    <Link
                        to="/"
                        className="flex items-center gap-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                        aria-label="Go to homepage"
                    >
                        <Logo className="w-12 h-12 text-red-500" />
                        <span className="sr-only">Go to homepage</span>
                        <p className="text-xl font-bold text-red-500">Nirapod Parcel</p>
                    </Link>
                </div>

                <div className="mx-auto w-full max-w-md">
                    <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;