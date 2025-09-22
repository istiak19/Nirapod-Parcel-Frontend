import Logo from "@/assets/icons/Logo"
import { ModeToggle } from "@/components/Mode-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { role } from "@/constants/role"
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { useGetMeUserQuery } from "@/redux/features/user/user.api"
import { useAppDispatch } from "@/redux/hooks"
import { Link, useLocation } from "react-router"
import userPic from "@/assets/images/user.png"

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/sender", label: "Dashboard", role: role.sender },
  { href: "/receiver", label: "Dashboard", role: role.receiver },
  { href: "/rider", label: "Dashboard", role: role.rider },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/track", label: "Track", role: "PUBLIC" },
]

export default function Navbar() {
  const { data } = useGetMeUserQuery(undefined)
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const location = useLocation()

  const handleLogout = async () => {
    await logout(undefined)
    dispatch(authApi.util.resetApiState())
  }

  const visibleLinks = navigationLinks.filter(
    (link) => link.role === "PUBLIC" || link.role === data?.data?.role
  )

  return (
    <header className="fixed top-4 inset-x-4 h-16 max-w-screen-2xl mx-auto rounded-full bg-background/80 backdrop-blur-md border dark:border-slate-700/70 shadow-lg z-30">
      <div className="flex h-full items-center justify-between px-6 md:px-8">

        {/* Left side */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-red-500 hover:text-red-500 transition"
          >
            <Logo className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-wide">
              Nirapod-Parcel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-4">
              {visibleLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className={`px-3 py-1.5 rounded-md transition font-medium ${location.pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          {data?.data?.email ? (
            <>
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar p-0"
              >
                <div className="w-10 h-10 rounded-full border-2 border-red-500 shadow-2xl overflow-hidden">
                  <img
                    title={data?.data?.name}
                    src={data?.data?.picture || userPic}
                    alt="User Avatar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </label>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-sm cursor-pointer"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button asChild className="text-sm hidden md:inline-flex bg-red-500 hover:bg-red-600 text-white">
              <Link to="/login">Login</Link>
            </Button>
          )}

          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                {/* Hamburger icon */}
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 group-aria-expanded:opacity-0"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:-rotate-45"
                  />
                </svg>
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-40 p-2 md:hidden animate-in slide-in-from-top-2 fade-in-50"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {visibleLinks.map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={`w-full py-1.5 px-2 rounded-md font-medium transition ${location.pathname === link.href
                            ? "text-primary bg-primary/10"
                            : "hover:text-primary"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
};