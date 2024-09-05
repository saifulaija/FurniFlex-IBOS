

import assets from "@/assets";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AddUserForm from "@/form/AddUserForm";

export default function AddUser() {
  return (
    <main className="flex  items-center justify-center p-2 mx-auto">
      <Card
        className={cn(
          "flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden"
        )}
      >
        <div className="w-full space-y-10  p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">
            Add User to Domain<span className="text-primary">S</span>ync
          </h1>
          <div className="space-y-5">
            <AddUserForm />
            
          </div>
        </div>
        <img
          src={assets.images.register}
          alt="login"
          className="hidden w-1/2 object-cover md:block object-center"
        />
      </Card>
    </main>
  );
}
