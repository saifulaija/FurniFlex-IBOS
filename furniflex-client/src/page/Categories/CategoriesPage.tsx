import { TCategory } from "@/types/global.type";
import Categories from "./Categories";
import { Helmet } from "react-helmet-async";
import { Title } from "@radix-ui/react-dialog";

const CategoriesPage = () => {
  const categories: TCategory[] = [
    {
      title: "Rocking Chair",
      path: "/product/category/Rocking-Chair",
      show: true,
    },
    {
      title: "Executive Chair",
      path: "/product/category/Executive-Chair",
      show: true,
    },
    {
      title: "Presentation Chair",
      path: "/product/category/Presentation-Chair",
      show: true,
    },
    {
      title: "Task Chair",
      path: "/product/category/Task-Chair",
      show: true,
    },
    {
      title: "Slide Chair",
      path: "/product/category/Slide-Chair",
      show: true,
    },
    {
      title: "Lounge Chair",
      path: "/product/category/Lounge-Chair",
      show: true,
    },
  ];

  return (
    <div>
      <Helmet>
        <title>FurniFlex | Product-category</title>
      </Helmet>

      <Categories categories={categories} />
    </div>
  );
};

export default CategoriesPage;
