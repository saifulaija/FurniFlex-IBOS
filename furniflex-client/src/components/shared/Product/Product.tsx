

import { TProduct, TQueryParam } from "@/types/global.type";
import Loader from "../Loader/Loader";
import { useGetAllProductsQuery } from "@/redux/feature/product/productApi";
import { useState } from "react";
import ProductCard from "./ProductCard";

const Product = () => {
  
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: productsData, isLoading } = useGetAllProductsQuery([
    { name: "sort", value: "price" },
    ...params,
  ]);
console.log(productsData);

  if (isLoading) <Loader />;

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mt-10">
        {productsData?.data?.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
