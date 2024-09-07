import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 sm:px-8 lg:px-10 ">
      <Helmet>
        <title>FurniFlex | Success-Order</title>
      </Helmet>
      <div className="max-w-md w-full space-y-6 text-center">
        <CheckCircledIcon className="w-16 h-16 text-green-600 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-900">
          Thank You for Your Order!
        </h1>
        <p className="text-lg text-gray-600">
          Your order has been successfully placed. We appreciate your trust in
          FurniFlex!
        </p>

        {/* Continue Shopping Button */}
        <div className="mt-8">
          <Button
            onClick={handleContinueShopping}
            className={cn(
              " text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            )}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
