import assets from "@/assets";

import RegisterForm from "@/form/RegisterForm";

const Register = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center  bg-white p-5">
        <div className="w-full max-w-md">
          <div className="flex justify-center items-center mx-auto">
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-bold text-gray-800">Welcome To</h1>
              <img
                src={assets.images.logo}
                width={100}
                height={100}
                alt="logo"
                className="mx-auto"
              />
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Signup to purchase your desired products
              </p>
            </div>
          </div>

          <RegisterForm />
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

export default Register;
