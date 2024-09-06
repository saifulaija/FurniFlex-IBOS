import React from "react";
import { useNavigate } from "react-router-dom";

// Replace this with the path to your custom image

import { Button } from "@/components/ui/button";
import assets from "@/assets";

const NoDataFound: React.FC<{ message?: string }> = ({
  message = "No data found",
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <img
        src={assets.images.nodata}
        alt="No data available"
        className=" object-contain mb-4"
      />
      <p className="text-gray-500 text-lg mb-4">{message}</p>
      <Button onClick={handleGoBack}>Go Back</Button>
    </div>
  );
};

export default NoDataFound;
