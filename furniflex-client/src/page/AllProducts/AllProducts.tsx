

import Loader from "@/components/shared/Loader/Loader";
import { useGetAllProductsQuery } from "@/redux/feature/product/productApi";
import { TQueryParam } from "@/types/global.type";
import { useState } from "react";
import AllProductsCard from "./AllProductsCard";


const AllProducts = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  console.log(setParams);
  
  const { data: productsData, isLoading } = useGetAllProductsQuery([
    { name: "sort", value: "price" },
    ...params,
  ]);

  if (isLoading) <Loader />;

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mt-10">
        {productsData?.data?.map((product: any) => (
          <AllProductsCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
