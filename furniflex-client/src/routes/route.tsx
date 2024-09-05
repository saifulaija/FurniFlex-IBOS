import AuthLayout from "@/components/layout/AuthLayout";
import { HomeLayout } from "@/components/layout/HomeLayout";
import NotFound from "@/components/shared/NotFound/NotFound";

import Home from "@/page/Home/Home";
import Login from "@/page/Login/Login";
import Register from "@/page/Register/Register";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
