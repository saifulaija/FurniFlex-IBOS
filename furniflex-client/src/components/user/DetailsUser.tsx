import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetSingleUserQuery } from "@/redux/features/user/userApi";

import { useParams } from "react-router-dom";
import Loader from "../shared/Loader/Loader";

const UserDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleUserQuery(id);

  if (isLoading) {
    return <Loader/>
      
    
  }

  if (isError || !data?.data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load user details.</p>
      </div>
    );
  }

  const { name, email, gender, domain, avatar } = data.data;

  return (
    <main className="flex items-center justify-center p-10 mx-auto max-h-screen">
      <Card
        className={cn(
          "flex flex-col md:flex-row h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden shadow-lg"
        )}
      >
        <div className="w-full p-6 md:w-1/2 flex flex-col justify-center space-y-6">
          <h1 className="text-center text-3xl font-bold text-primary">
            User Details
          </h1>
          <div className="space-y-4 text-lg">
            <p>
              <span className="font-semibold">Name:</span> {name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {gender || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Domain:</span> {domain || "N/A"}
            </p>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src={avatar || "/placeholder-image.jpg"}
            alt={name || "User Avatar"}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </Card>
    </main>
  );
};

export default UserDetails;
