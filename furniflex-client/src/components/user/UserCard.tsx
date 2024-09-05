


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Delete, Edit, Loader2, UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { cn } from "@/lib/utils";
import { IUser } from "@/types/user";
import { Separator } from "@radix-ui/react-select";
import { useAppDispatch } from "@/redux/hokks";
import { addToCart } from "@/redux/features/user/userSlice";
import { useDeleteUserMutation } from "@/redux/features/user/userApi";
import { toast } from "react-toastify";

const UserCard = ({ user }: { user: IUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDetails = () => {
    navigate(`user/details/${user?._id}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLoading(true);

    setTimeout(() => {
      try {
        dispatch(addToCart(user));
       
      } catch (error) {
        console.error("Failed to add user to cart:", error);
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  const handleDeleteUser = async (
    e: React.MouseEvent<HTMLSpanElement>,
    id: string
  ) => {
    e.stopPropagation(); // Prevent triggering the card's onClick event
    try {
      await deleteUser(id);
      toast.warning("User deleted successfully",{position:'bottom-left'});
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <Card
      onClick={handleDetails}
      className={cn(
        "max-w-md w-full hover:cursor-pointer transition duration-300 hover:border hover:border-primary/50"
      )}
    >
      <CardHeader className="p-0 items-center">
        <div className="relative w-full h-auto">
          <img
            src={user.avatar || "/placeholder-image.jpg"}
            alt={`${user.name} Avatar`}
            className="object-cover w-full h-full rounded-t-md"
            style={{ objectFit: "cover" }} // Ensures the image covers the container
          />
        </div>
      </CardHeader>

      <Separator />
      <CardContent className="p-2">
        <p className="text-lg font-semibold">{user.name}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-2 mb-0">
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  onClick={(e) => handleDeleteUser(e, user._id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  {isDeleting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Delete className="w-5 h-5" />
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={`/user/edit/${user._id}`}
                  className="text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="w-5 h-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          onClick={handleAddToCart}
          className={cn("flex items-center space-x-1")}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Please wait....</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;

