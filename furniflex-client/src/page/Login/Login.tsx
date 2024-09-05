import assets from "@/assets";

const Login = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Replace 'form' with your actual form elements */}
          <form>
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            {/* Input fields, buttons, etc. */}
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative flex-1 hidden md:block h-full">
        <img
          src={assets.images.register}
          alt="Login illustration"
          className="w-full h-full"
        />
        {/* Centered logo text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={assets.images.logoText}
            alt="logoText"
            className="w-auto max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
