import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from "@/redux/feature/product/cartSlice";
import { formatMoney } from "@/utils/formatMoney";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = (item: any) => {
    dispatch(decreaseCart(item));
  };

  const handleIncreaseQuantity = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total amount and total saved amount
  const totalAmount = cart.cartItems.reduce((sum, item) => {
    const discountAmount = (item.price * (item.discount || 0)) / 100;
    const finalPrice = (item.price - discountAmount) * item.cartQuantity;
    return sum + finalPrice;
  }, 0);

  const totalSaved = cart.cartItems.reduce((sum, item) => {
    const discountAmount = (item.price * (item.discount || 0)) / 100;
    const savedAmount = discountAmount * item.cartQuantity;
    return sum + savedAmount;
  }, 0);

  return (
    <div className="w-full py-10 px-4 md:p-10">
      <Card className="max-w-7xl mx-auto flex flex-col">
        {cart.cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row">
            {/* Table Section */}
            <div className="w-full md:w-3/5 pr-4 mb-6 md:mb-0">
              <h1 className="font-semibold text-xl my-2 text-center">
                An overview of your order
              </h1>
              <Separator />
              <Table className="overflow-x-auto overflow-y-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Saved</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.cartItems.map((item) => {
                    const discountAmount =
                      (item.price * (item.discount || 0)) / 100;
                    const savedAmount = discountAmount * item.cartQuantity;
                    const finalPrice =
                      (item.price - discountAmount) * item.cartQuantity;

                    return (
                      <TableRow key={item._id}>
                        <TableCell>
                          <img
                            src={item.image || "/image"}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              onClick={() => handleDecreaseQuantity(item)}
                              variant="ghost"
                            >
                              <MinusCircle size={18} />
                            </Button>
                            <span>{item.cartQuantity}</span>
                            <Button
                              onClick={() => handleIncreaseQuantity(item)}
                              variant="ghost"
                            >
                              <PlusCircle size={18} />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatMoney(Number(finalPrice.toFixed(0)))}
                        </TableCell>
                        <TableCell className="text-right text-red-500">
                          {formatMoney(Number(savedAmount.toFixed(0)))}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => handleRemoveItem(item)}
                            variant="ghost"
                          >
                            <X size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="flex justify-end -mt-6">
                <Button onClick={handleClearCart} variant="link" className={cn('text-red-500')}>
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Details Section */}
            <div className="w-full md:w-2/5 p-4 bg-gray-50 rounded-md">
              <h2 className="font-semibold text-xl">Order Details</h2>
              <Separator className="mb-4" />
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400">Subtotal</p>
                <p className="text-gray-400">
                  {formatMoney(Number(totalAmount.toFixed(0)))}
                </p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400">Shipping</p>
                <p className="text-gray-400">Free</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400">Estimated Tax</p>
                <p className="text-gray-400">$-</p>
              </div>
              <Separator />
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600 font-semibold">Total</p>
                <p className="text-lg font-semibold">
                  {formatMoney(Number(totalAmount.toFixed(0)))}
                </p>
              </div>
              <div className="flex space-x-4 mt-4">
                <Button className={cn("w-full uppercase")}>
                  G0 to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShoppingCart;
