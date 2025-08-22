import Logo from "@/assets/icons/Logo"
import { ModeToggle } from "@/components/Mode-toggle"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { role } from "@/constants/role"
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { useGetMeUserQuery } from "@/redux/features/user/user.api"
import { useAppDispatch } from "@/redux/hooks"
import { Link } from "react-router"

// Navigation links
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/sender", label: "Dashboard", role: role.sender },
  { href: "/receiver", label: "Dashboard", role: role.receiver },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
]

export default function Navbar() {
  const { data } = useGetMeUserQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined)
    dispatch(authApi.util.resetApiState())
  };

  const visibleLinks = navigationLinks.filter(
    (link) =>
      link.role === "PUBLIC" || link.role === data?.data?.role
  );

  return (
    <header className="border-b px-4 md:px-6 shadow-md sticky top-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-4">

        {/* Left side */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-red-500 hover:text-primary/90 transition"
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
                  <NavigationMenuLink
                    asChild
                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                  >
                    <Link to={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm cursor-pointer"
            >
              Logout
            </Button>
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
                {/* Hamburger icon with animation */}
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

            <PopoverContent align="start" className="w-40 p-2 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {visibleLinks.map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      <NavigationMenuLink
                        asChild
                        className="w-full py-1.5 font-medium hover:text-primary"
                      >
                        <Link to={link.href}>{link.label}</Link>
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