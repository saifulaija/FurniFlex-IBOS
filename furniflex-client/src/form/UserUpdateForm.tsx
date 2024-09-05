import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { Input } from "@/components/ui/input";
import { DomainOption, GenderOption } from "@/types/global.type";
import LoadingButton from "@/components/shared/LoadingButton/LoadingButton";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

// Define form values type
type FormValues = {
  name: string;
  email: string;
  domain: string;
  gender: string;
};

const UserUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userUpdate, { isLoading }] = useUpdateUserMutation();
  const { data } = useGetSingleUserQuery(id);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      domain: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name || "",
        domain: data.data.domain || "",
        email: data.data.email || "",
        gender: data.data.gender || "",
      });
    }
  }, [data, form]);

  const onSubmit = async (values: FormValues) => {
    const options = {
      userId: id,
      data: values,
    };
    try {
      const res = await userUpdate(options).unwrap();

      if (res?.data) {
        toast.success("User updated successfully", { position: "bottom-left" });
        navigate("/");
      }
    } catch (err: any) {
      toast.error("Something went wrong", { position: "bottom-left" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 md:px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          {GenderOption.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Domain</SelectLabel>
                          {DomainOption.map((domain) => (
                            <SelectItem key={domain} value={domain}>
                              {domain}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center items-center">
            <LoadingButton
              type="submit"
              className="max-w-md w-full font-semibold"
              loading={isLoading}
            >
              Update User
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserUpdateForm;
