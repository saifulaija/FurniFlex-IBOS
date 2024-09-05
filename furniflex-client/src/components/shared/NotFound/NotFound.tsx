import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-2">Page Not Found</p>
        <p className="text-gray-500 mt-4">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-primary text-white py-2 px-4 rounded hover:bg-primary/75 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
