import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



const NoUserFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center  px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        No User Found
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        We couldn't find any user matching your criteria. Please try again or
        return to the homepage.
      </p>
      <Button
        onClick={handleBackToHome}
       
      >
        Back to Home
      </Button>
    </div>
  );
};

export default NoUserFound;
