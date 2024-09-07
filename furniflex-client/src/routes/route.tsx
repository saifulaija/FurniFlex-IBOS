import AuthLayout from "@/components/layout/AuthLayout";
import CartLayout from "@/components/layout/CartLayout";

import { HomeLayout } from "@/components/layout/HomeLayout";
import NotFound from "@/components/shared/NotFound/NotFound";
import OrderSuccess from "@/components/shared/OrderSuccess/OrderSuccess";
import AllProducts from "@/page/AllProducts/AllProducts";
import Blog from "@/page/Blog/Blog";
import Cart from "@/page/Cart/Cart";
import CategoriesPage from "@/page/Categories/CategoriesPage";
import Checkout from "@/page/Checkout/Checkout";

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
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "blog",
        element: <Blog />,
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
      {
        path: "/cart/checkout",
        element: <Checkout />,
      },
      {
        path: "/cart/order-success",
        element: <OrderSuccess />,
      },
    ],
  },
]);

export default router;
