import { Card } from "@/components/ui/card";
import UserUpdateForm from "@/form/UserUpdateForm";
import { cn } from "@/lib/utils";
const UpdateUser = () => {
  return (
    <main className="flex items-center justify-center p-4 mx-auto  bg-gray-50">
      <Card
        className={cn(
          "flex flex-col h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-lg shadow-lg border border-gray-200 bg-white"
        )}
      >
        <div className="p-6 border-b border-gray-200 bg-primary text-white">
          <h2 className="text-2xl font-bold text-center mb-1">
            Update User Information
          </h2>
          <p className="text-center text-sm opacity-90">
            Team Members Overview
          </p>
        </div>

        <div className="p-6">
          <UserUpdateForm />
        </div>
      </Card>
    </main>
  );
};

export default UpdateUser;
