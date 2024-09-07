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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";

import { useLoginMutation } from "@/redux/feature/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/types/global.type";
import { setUser } from "@/redux/feature/auth/authSlice";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Enter a valid password with at least 6 characters",
  }),
});

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await login(values).unwrap();
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Your email ....."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      type="password"
                      placeholder="Enter your password ......"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
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
            className="w-full font-semibold"
            loading={isLoading}
          >
            Sign In
          </LoadingButton>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
            </span>
            <Link
              to="/auth/register"
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
