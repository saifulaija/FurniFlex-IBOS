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

import { useLocation, useNavigate } from "react-router-dom";


import { Checkbox } from "@/components/ui/checkbox";

import { useLoginMutation } from "@/redux/feature/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/types/global.type";
import { setUser } from "@/redux/feature/auth/authSlice";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Enter your first name",
  }),
  phone: z.string()
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' }),
  address: z.string().min(6, {
    message: "Enter a valid address",
  }),
  description: z.string().min(6, {
    message: "Enter a valid query",
  }),
});

const CheckoutForm = () => {


  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address:""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //  login(userInfo);

      const res = await login(values).unwrap();
      console.log(res);

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged In successfully", { position: "bottom-left" });

      if (user.role === "user") {
        navigate(from, { replace: true });
      } else {
        navigate("/");
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
