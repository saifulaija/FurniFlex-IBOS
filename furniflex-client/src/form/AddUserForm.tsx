import { z } from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import LoadingButton from "@/components/shared/LoadingButton/LoadingButton";
import { toast } from "react-toastify";
import { uploadImage } from "@/utils/imgbb";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DomainOption, GenderOption } from "@/types/global.type";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "@/redux/features/user/userApi";
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter valid email",
  }),
  name: z.string().min(3, {
    message: "Enter user name",
  }),
  domain: z.string().min(1, {
    message: "Enter user domain",
  }),
  avatar: z.any(),
  gender: z.string().min(1, { message: "Category must be selected" }),
});

const AddUserForm = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      domain: "",

      avatar: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.avatar && values.avatar.length > 0) {
      const url = await uploadImage(values.avatar[0]);
      values.avatar = url;
    } else {
      values.avatar = "";
    }

    try {
      const res = await createUser(values).unwrap();

      if (res?.data) {
        toast.success("user added successfully",{position:'bottom-left'});
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err?.message, { position: "bottom-left" });
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
                    <Input
                      type="text"
                      placeholder="Enter name ....."
                      {...field}
                    />
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
                      placeholder="Enter email ......"
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
     

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>avatar</FormLabel>
                  <FormControl >
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="w-[400px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton
            type="submit"
            className="w-full font-semibold"
            loading={isLoading}
          >
            Add User
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default AddUserForm;
