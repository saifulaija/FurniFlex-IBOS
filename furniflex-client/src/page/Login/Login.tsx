import assets from "@/assets";
import LoginForm from "@/form/LoginForm";

const Login = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center  bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-gray-400">
            Enter your credentials to access your account
          </p>
          <LoginForm />
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
