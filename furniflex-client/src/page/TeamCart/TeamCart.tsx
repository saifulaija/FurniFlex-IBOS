

import { useAppDispatch, useAppSelector } from "@/redux/hokks";
import { removeFromCart, clearCart } from "@/redux/features/user/userSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, XCircle } from "lucide-react";
import TeamCartForm from "@/form/TeamCartForm";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "@/types/user";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TeamCart = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    dispatch(removeFromCart({ _id: id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleGoToUsers = () => {
    navigate("/users"); // Adjust the route as needed
  };

  // Transform CartItem to IUser
  const cartItemsAsUsers: IUser[] = user.cartItems.map((item) => ({
    _id: item._id,
    name: item.name,
    email: item.email,
    domain: item.domain,
    gender: item.gender,
    availability: item.availability,
    avatar: item.avatar,
    isDeleted: item.isDeleted,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    userQuantity: item.userQuantity,
  }));

  return (
    <div className="w-full p-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-2/3">
            {user.cartItems.length > 0 ? (
              <>
                <Table className="bg-white shadow-md rounded-lg">
                  <TableCaption>Your selected team members</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/4">Name</TableHead>
                      <TableHead className="w-1/4">Email</TableHead>
                      <TableHead className="w-1/4">Domain</TableHead>
                      <TableHead className="w-1/4 text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.cartItems.map((member) => (
                      <TableRow key={member._id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {member.name}
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.domain}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(member._id)}
                            className="flex items-center justify-center space-x-1"
                          >
                            <Trash className="w-4 h-4" />
                            <span>Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="destructive"
                    onClick={handleClearCart}
                    className="flex items-center space-x-2"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Clear Cart</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center mx-auto lg:ml-64 ">
                <Card
                  className={cn(
                    "flex flex-col items-center justify-center text-center p-4  md:p-10 max-w-lg w-full"
                  )}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600 mb-6">
                    It looks like you haven't selected any team members yet. You
                    can add members to your cart to create a team.
                  </p>
                  <Link to="/">
                    <Button
                      onClick={handleGoToUsers}
                      className="flex items-center space-x-2"
                    >
                      <span>Go to Users</span>
                    </Button>
                  </Link>
                </Card>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/3">
            {user.cartItems.length > 0 && (
              <TeamCartForm users={cartItemsAsUsers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCart;
