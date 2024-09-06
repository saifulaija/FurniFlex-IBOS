import AuthLayout from "@/components/layout/AuthLayout";
import CartLayout from "@/components/layout/CartLayout";

import { HomeLayout } from "@/components/layout/HomeLayout";
import NotFound from "@/components/shared/NotFound/NotFound";
import Cart from "@/page/Cart/Cart";

import Home from "@/page/Home/Home";
import Login from "@/page/Login/Login";
import ProductCategory from "@/page/ProductCategory/ProductCategory";
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
      {
        path: "product/category/:category",
        element: <ProductCategory />,
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

  {
    path: "/cart",
    element: <CartLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
