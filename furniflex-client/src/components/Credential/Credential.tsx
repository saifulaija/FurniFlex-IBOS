import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const Credential = () => {
  const [copiedUserEmail, setCopiedUserEmail] = useState(false);
  const [copiedUserPassword, setCopiedUserPassword] = useState(false);

  const userCredentials = {
    email: "sobujapm871@gmail.com",
    password: "111111",
  };

  const handleCopy = (text: any, setCopied: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast.success("Credentials copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy credentials!");
      });
  };

  return (
    <div className="w-full max-w-lg container mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Login Credentials
      </h2>

      <div className="mb-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          User Credentials
        </h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Email:</span>
              <span className="text-gray-600">{userCredentials.email}</span>
            </div>

            <Button
              variant={"link"}
              onClick={() =>
                handleCopy(userCredentials.email, setCopiedUserEmail)
              }
            >
              {copiedUserEmail ? "Copied!" : "Copy Email"}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Password:</span>
              <span className="text-gray-600">{userCredentials.password}</span>
            </div>
            <Button
              variant={"link"}
              onClick={() =>
                handleCopy(userCredentials.password, setCopiedUserPassword)
              }
            >
              {copiedUserPassword ? "Copied!" : "Copy Password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credential;
