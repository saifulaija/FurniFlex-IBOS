import { Button } from "@/components/ui/button";

import { ChevronDown, LogOut, Mails } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import assets from "@/assets";
import { useAuth } from "@/components/AuthContext/AuthContext";
import {
  DropdownMenu,
  
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MyAvatar } from "@/components/shadcn/MyAvatar";

const AuthButton = () => {
  const navigate = useNavigate();
   const { user,logout } = useAuth();
    const handleLogout = () => {
      logout();
      navigate("/"); 
    };



  return (
    <div className="flex items-center gap-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <MyAvatar url={user?.profilePhoto} alt={user?.name} />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="px-4">
            <DropdownMenuItem className="flex items-center gap-3 text-muted-foreground">
              <Mails />
              <p>{user?.email}</p>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-3 cursor-pointer text-muted-foreground"
            >
              <LogOut />
              <p onClick={handleLogout}> Logout</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/auth/login" className="flex items-center gap-2">
          <img src={assets.images.user} width={40} height={40} alt="" />
          <ChevronDown className="" />
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
