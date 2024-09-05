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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { uploadImage } from "@/utils/imgbb";
import axiosInstance from "@/utils/axiosInstance";


const formSchema = z.object({
  firstName: z.string().min(3, {
    message: "Enter your first name",
  }),
  lastName: z.string().min(3, {
    message: "Enter your last name",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  profilePhoto: z.any(),
  password: z.string().min(6, {
    message: "Enter a valid password with at least 6 characters",
  }),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePhoto: "",
    },
  });

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   setIsLoading(true);
  //   if (values.profilePhoto && values.profilePhoto.length > 0) {
  //     const url = await uploadImage(values.profilePhoto[0]);
  //     values.profilePhoto = url;
  //   } else {
  //     values.profilePhoto = "";
  //   }

  //   try {
  //     toast.success("User registered successfully", {
  //       position: "bottom-left",
  //     });
  //     navigate("/");
  //   } catch (err: any) {
  //     toast.error(err?.message, { position: "bottom-left" });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Handle file upload if any
    if (values.profilePhoto && values.profilePhoto.length > 0) {
      try {
        const url = await uploadImage(values.profilePhoto[0]);
        values.profilePhoto = url;
      } catch (error) {
        toast.error("Error uploading profile photo", {
          position: "bottom-left",
        });
        setIsLoading(false);
        return;
      }
    } else {
      values.profilePhoto = "";
    }

    try {
      // Send data to the backend using Axios
      const response = await axiosInstance.post("/user/create-user", values);

      if (response.status === 200) {
        toast.success("User registered successfully", {
          position: "bottom-left",
        });
        navigate("/");
      } else {
        toast.error("Failed to register user", { position: "bottom-left" });
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred", {
        position: "bottom-left",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto"
      >
        <div className="w-full space-y-4">
          {" "}
          {/* Increased space-y for more vertical spacing */}
          <div className="space-y-4">
            <div className="md:flex md:space-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {" "}
                    {/* Full width for each input */}
                    <FormLabel>First Name (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g., Jordan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {" "}
                    {/* Full width for each input */}
                    <FormLabel>Last Name (optional)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g., Khen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
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
                      placeholder="Enter a strong password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profilePhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="file-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm font-medium leading-none">
              I agree to the{" "}
              <Link to="/terms" className="underline text-blue-600">
                terms and policy
              </Link>
            </label>
          </div>
          <LoadingButton
            type="submit"
            className="w-full font-semibold"
            loading={isLoading}
          >
            Sign Up
          </LoadingButton>
          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <Link
              to="/auth/login"
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
