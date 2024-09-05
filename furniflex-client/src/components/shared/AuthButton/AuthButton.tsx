import { Button } from "@/components/ui/button";

import { ChevronDown } from "lucide-react";
import { ExitIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import assets from "@/assets";

const AuthButton = () => {
  const user = null;
  return (
    <div className="flex items-center gap-2">
      {user ? (
        <Button asChild className="cursor-pointer group">
          <span className="flex items-center gap-2">
            Logout
            <ExitIcon className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
          </span>
        </Button>
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
