import {
  ChevronRight,
  SearchCheck,
  LucideHome,
  BookMarkedIcon,
  Tag,
  Book,
  ShoppingCart,
  LucideIcon,
  ShoppingCart as CartIcon, // Alias to avoid conflict
  Archive, // Example of another icon
  Camera,
  Film,
  ShoppingBagIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { TextAlignCenterIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";

import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AuthButton from "../shared/AuthButton/AuthButton";
import assets from "@/assets";

interface SideMenuItem {
  title: string;
  path: string;
  image: LucideIcon; // Update the image type to use LucideIcon
  show?: boolean; // Optional property to control visibility
}

export function HomeLayout() {
  const user = null;
  const location = useLocation(); // Get the location object
  const pathname = location.pathname; // Extract the pathname


  const [scrolled, setScrolled] = useState<boolean>(false);
  const [xOffset, setXOffset] = useState<number>(0);

  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Products", path: "/all-users", show: true },
    { label: "Categories", path: "/all-users", show: true },
    { label: "Custom", path: "/all-users", show: true },
    { label: "Blog", path: "/all-users", show: true },
  ];

  const items: SideMenuItem[] = [
    {
      title: "Electronics",
      path: "/blogs/category/Electronics",
      image: Camera,
      show: true,
    },
    {
      title: "Books",
      path: "/blogs/category/Books",
      image: Book,
      show: true,
    },
    {
      title: "Groceries",
      path: "/blogs/category/Groceries",
      image: CartIcon,
      show: true,
    },
    {
      title: "Movies",
      path: "/blogs/category/Movies",
      image: Film,
      show: true,
    },
    {
      title: "Home & Kitchen",
      path: "/blogs/category/Home-Kitchen",
      image: Archive,
      show: true,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setXOffset(10); // Move 10px when scrolled down
      } else {
        setXOffset(0); // Reset to original position when scrolled back to top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar for larger devices */}
      <div className="hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 fixed w-[280px]">
          <div className="flex h-14 items-center border-b py-4 px-4 lg:h-[60px] lg:px-6">
            <motion.div
              className="hidden md:flex"
              animate={{ x: xOffset }} // Apply xOffset based on scroll
              transition={{ type: "spring", stiffness: 200, damping: 20 }} // Smooth transition
            >
              <div className="flex items-center">
                <Link to="/">
                  <img
                    src={assets.images.logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="rounded"
                  />
                </Link>
              </div>
            </motion.div>

            <Button variant="link" size="icon" className="ml-auto h-8 w-8">
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto max-h-full">
            <nav className="grid items-start px-2 text-md font-medium lg:px-4">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                Find by Category
              </div>
              <Separator />

              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.path &&
                      "text-primary bg-muted border-r-4 border-r-primary"
                  )}
                >
                  <div className="flex items-center gap-3 capitalize">
                    <item.image className="h-5 w-5" />
                    {item.title}
                  </div>
                  <ChevronRight />
                </Link>
              ))}
            </nav>
            <Separator />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header
          className={cn(
            "flex justify-between h-14 items-center bg-white fixed top-0 left-0 md:left-[280px] right-0 z-50 gap-4 border-b px-4 lg:h-[60px] lg:px-6",
            scrolled ? "bg-opacity-100 border-b" : ""
          )}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <TextAlignCenterIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col overflow-y-auto max-h-full"
            >
              <nav className="grid gap-2 text-lg font-medium">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <SearchCheck className="h-4 w-4" />
                  Find by Category
                </div>
                <Separator />

                {items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      pathname === item.path &&
                        "text-primary bg-muted border-r-4 border-r-primary"
                    )}
                  >
                    <div className="flex items-center gap-3 capitalize">
                      <item.image className="h-5 w-5" />
                      {item.title}
                    </div>
                    <ChevronRight />
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="items-center flex md:hidden">
            <Link to="/">
              <img
                src={assets.images.logo}
                alt="logo"
                width={60}
                height={60}
                className="rounded"
              />
            </Link>
          </div>
          <nav className="hidden lg:flex gap-6">
            {menuItems.map(
              (menuItem, index) =>
                menuItem.show && (
                  <NavLink
                    key={index}
                    to={menuItem.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between gap-3 px-3 py-2 transition-all",
                        isActive
                          ? "text-primary bg-muted"
                          : "text-muted-foreground hover:text-primary"
                      )
                    }
                  >
                    {menuItem.label}
                  </NavLink>
                )
            )}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="hover:bg-primary text-gray-400 hover:text-white px-2 py-1 hover:transition-all hover:duration-200"
            >
              <Link to="/signin" className="flex items-center font-semibold">
                <ShoppingBagIcon className="h-5 w-5" />
                <span className="sr-only">View shopping cart</span>
              </Link>
            </Button>
            <AuthButton />
          </div>
        </header>
        <main className="mt-8 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

