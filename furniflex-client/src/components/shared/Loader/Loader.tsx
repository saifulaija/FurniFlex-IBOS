import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-screen">
      <Loader2
        className="h-8 w-8 animate-spin text-primary"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader;
