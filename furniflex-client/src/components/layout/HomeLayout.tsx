

import {
  ChevronRight,
  SearchCheck,
  ShoppingCart as CartIcon, // Alias to avoid conflict
  ShoppingBagIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useEffect, useState } from "react";
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
import { useAppSelector } from "@/redux/hooks";

import { Badge } from "../ui/badge";

interface SideMenuItem {
  title: string;
  path: string;

  show?: boolean; // Optional property to control visibility
}

export function HomeLayout() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const pathname = location.pathname; // Extract the pathname
  const cart = useAppSelector((state) => state.cart);

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
      title: "Rocking Chair",
      path: "/product/category/Rocking-Chair",

      show: true,
    },
    {
      title: "Executive Chair",
      path: "/product/category/Executive-Chair",

      show: true,
    },
    {
      title: "Task Chair",
      path: "/product/category/Task-Chair",

      show: true,
    },
    {
      title: "Slide Chair",
      path: "/product/category/Slide-Chair",

      show: true,
    },
    {
      title: "Lounge Chair",
      path: "/product/category/Lounge-Chair",

      show: true,
    },
  ];

  const handleSubMenuClick = (item: SideMenuItem) => {
    // Replace spaces with hyphens for cleaner URLs
    const key = item.title.trim().replace(/\s+/g, "-"); // Replaces all spaces with hyphens
    navigate(`/product/category/${key}`);
  };

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
          <div className="flex h-20 items-center border-b py-4 px-4 lg:h-[80px] lg:px-6">
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
                <div
                  key={item.path}
                  className={cn(
                    "flex items-center justify-center px-5  py-2 text-muted-foreground transition-all ",
                    pathname === item.path && "bg-primary  text-white"
                  )}
                >
                  <button
                    onClick={() => handleSubMenuClick(item)}
                    className="flex items-center gap-3 capitalize w-full text-center"
                  >
                    {item.title}
                  </button>
                </div>
              ))}
            </nav>
            <Separator />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header
          className={cn(
            "flex justify-between h-20 items-center bg-white fixed top-0 left-0 md:left-[280px] right-0 z-50 gap-4 border-b px-4 lg:h-[80px] lg:px-6",
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
                  <div
                    key={item.path}
                    className={cn(
                      "flex items-center justify-between gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      pathname === item.path &&
                        "text-primary bg-muted border-r-4 border-r-primary"
                    )}
                  >
                    <button
                      onClick={() => handleSubMenuClick(item)}
                      className="flex items-center gap-3 capitalize w-full text-left"
                    >
                      {item.title}
                    </button>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="items-center flex md:hidden">
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
          <div className="flex items-center gap-8">
            <Button
              variant="outline"
              className={cn(
                "hover:bg-primary hover:text-white text-gray-400 px-1 py-2 transition-colors duration-300 ease-in-out rounded-md"
              )}
            >
              <Link to="/cart" className="flex items-center gap-1 relative">
                {cart?.cartTotalAmount > 0 ? (
                  <span className="font-semibold text-[16px]">
                    {cart?.cartTotalAmount}
                    <span className="font-serif font-semibold "> ৳</span>
                  </span>
                ) : (
                  <span className="font-semibold text-[16px] font-serif">
                    0 ৳
                  </span>
                )}
                <ShoppingBagIcon className="w-5 h-5" />
                {cart.cartItems.length > 0 && (
                  <Badge
                    className={cn(
                      "absolute -top-6 -right-4 text-white text-xs"
                    )}
                  >
                    {cart.cartItems.length}
                  </Badge>
                )}
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

