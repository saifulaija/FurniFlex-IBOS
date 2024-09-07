import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/shared/LoadingButton/LoadingButton";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";

import { selectCurrentUser } from "@/redux/feature/auth/authSlice";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCreateOrderMutation } from "@/redux/feature/order/orderApi";

import { useAppSelector } from "@/redux/hooks";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Enter your full name",
  }),
  phone: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  address: z.string().min(6, {
    message: "Enter a valid address",
  }),
  description: z.string().min(6, {
    message: "Enter a valid query",
  }),
});

const CheckoutForm = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const user = useAppSelector(selectCurrentUser);
  const cart = useAppSelector((state) => state.cart);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Prepare the payload by combining form values and cart data
      const orderPayload = {
        name: values.name,
        phone: values.phone,
        email: user?.email,
        address: values.address,
        description: values.description,
        paymentSystem: "Cash on delivery",
        totalPrice: cart.cartTotalAmount,
        orderProduct: cart.cartItems.map((item: any) => ({
          productId: item._id,
          selectedQuantity: item.cartQuantity,
          name: item.name,
          price: item.price,
          discount: item.discount,
          image: item.image,
        })),
        orderNumber: `ORD${Date.now()}`,
      };

      // Make the API request to create the order
      const res = await createOrder(orderPayload).unwrap();

      if(res?.dat){

        toast.success("Order placed successfully", { position: "bottom-left" });
        navigate("/cart/order-success");
        
      }
     
      
    } catch (error) {
      toast.error((error as any)?.data?.message || "An error occurred", {
        position: "bottom-left",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 py-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn("font-semibold")}
                      placeholder="Full Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn("font-semibold")}
                      placeholder="Type 11 digit phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn("font-semibold")}
                      placeholder="Full Address(House,Thana,District/Jhela)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className={cn("font-semibold")}
                      placeholder="Please specify any special requirements, such as color, size, quantity, delivery date, or custom instructions, to ensure accurate order processing."
                      id="message-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the <span className="underline">terms and policy</span>
            </label>
          </div>
          <LoadingButton
            type="submit"
            className="w-full font-bold uppercase"
            loading={isLoading}
          >
            Place Order
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
