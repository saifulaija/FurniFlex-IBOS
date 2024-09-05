import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const AddUserButton = () => {
  return (
    <Link to="/add-user" className="relative flex items-center">
      <Button className="flex items-center space-x-1">
        <Plus className="w-4 h-4" />
        <span>Add Users</span>
      </Button>
    </Link>
  );
};

export default AddUserButton;
