


import { useState, useEffect, useRef, useCallback } from "react";
import { TextAlignCenterIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import assets from "@/assets";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hokks";
import AddUserButton from "./AddUserButton/AddUserButton";

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const user = useAppSelector((state) => state.user);

  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = useCallback(
    (value:any) => {
      navigate(`/?q=${encodeURIComponent(value)}`);
    },
    [navigate]
  );

  const handleInputChange = (e:any) => {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  };

const handleClearSearch = () => {
  setSearchValue("");
  if (searchRef.current) {
    searchRef.current.focus(); // Focus back to the search input
  }
  navigate("/"); // Navigate back to the default page
};


  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Products", path: "/all-users", show: true },
    { label: "Categories", path: "/all-users", show: true },
    { label: "Custom", path: "/all-users", show: true },
    { label: "Blog", path: "/all-users", show: true },
  
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 h-16 ${
        scrolled
          ? "shadow-md border-b bg-background/90 backdrop-blur-lg"
          : "bg-background/70 border-b"
      }`}
    >
      <div className="container mx-auto md:px-4">
        <header className="flex h-16 items-center justify-between gap-6">
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

          <div className="relative flex items-center">
            <Input
              ref={searchRef}
              type="search"
              placeholder="Search users..."
              value={searchValue}
              onChange={handleInputChange}
              className={cn("focus:border-none pr-8")} // Add padding for clear button
            />
            {searchValue && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                <Cross2Icon className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-8">
            <Link to="/user-team-cart" className="relative flex items-center">
              <Button className="flex items-center space-x-1">
                <UserPlus className="w-4 h-4" />
              </Button>
              <Badge
                variant="destructive"
                className={cn(
                  "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                )}
              >
                {user.cartItems.length ? user?.cartItems.length : 0}
              </Badge>
            </Link>

            <AddUserButton />
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
