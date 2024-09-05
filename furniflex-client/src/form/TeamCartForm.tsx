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
import { useNavigate } from "react-router-dom";
import { useCreateTeamMutation } from "@/redux/features/team/teamApi";
import { IUser } from "@/types/user";
import { useAppDispatch } from "@/redux/hokks";
import { clearCart } from "@/redux/features/user/userSlice";

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Enter team name",
  }),
});

// TeamCartForm component definition
const TeamCartForm = ({ users }: { users: IUser[] }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const [createTeam, { isLoading }] = useCreateTeamMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const teamData = {
      ...values,
      users: users.map((user: IUser) => ({
        userId: user._id,
      })),
    };

    try {
      const res = await createTeam(teamData).unwrap();
      console.log(res);
      

      if (res?.data) {
        toast.success("Team created successfully", { position: "bottom-left" });
        navigate(`/show-team/${res?.data?._id}`);
        handleClearCart();
      }
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(err.data.message, { position: "bottom-left" });
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "bottom-left",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 md:px-4 py-6">
          <div className="">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter team name ....."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton
            type="submit"
            className="w-full font-semibold uppercase"
            loading={isLoading}
          >
            Create Team
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default TeamCartForm;
