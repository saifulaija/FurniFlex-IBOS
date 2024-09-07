import { useState, useEffect, useRef, useCallback } from "react";
import { TextAlignCenterIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import assets from "@/assets";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import { ShoppingBagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useAppSelector } from "@/redux/hooks";
import AuthButton from "../AuthButton/AuthButton";

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const cart = useAppSelector((state) => state.cart);



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  
  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Products", path: "/product", show: true },
    { label: "Categories", path: "/product-categories", show: true },
    { label: "Custom", path: "/product/custom", show: true },
    { label: "Blog", path: "/blog", show: true },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 h-20 ${
        scrolled
          ? "shadow-md border-b bg-background/90 backdrop-blur-lg"
          : "bg-background/70 border-b"
      }`}
    >
      <div className="container mx-auto md:px-4">
        <header className="flex h-20 items-center justify-between gap-6">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="link" size="icon" className="lg:hidden">
                  <TextAlignCenterIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle Navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link
                  to="/"
                  className="flex items-center gap-2 font-semibold text-foreground"
                >
                  <img
                    src={assets.images.logo}
                    width={100}
                    height={100}
                    alt="logo"
                  />
                </Link>
                <div className="grid gap-2 py-6">
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
                </div>
              </SheetContent>
            </Sheet>

            <motion.div
              className="hidden md:flex"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Link
                to="/"
                className="flex items-center gap-2 font-semibold text-foreground"
              >
                <img
                  src={assets.images.logo}
                  width={100}
                  height={100}
                  alt="logo"
                />
              </Link>
            </motion.div>
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
                  <span className="font-semibold  text-[16px]">
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
      </div>
    </div>
  );
};

export default Header;
