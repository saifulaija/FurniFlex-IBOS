

import Loader from "../Loader/Loader";
import { useGetAllProductsQuery } from "@/redux/feature/product/productApi";

const Product = () => {
  
const{data,isLoading}=useGetAllProductsQuery({})
console.log(data);

  if (isLoading) <Loader />;

  return (
    <div className="product-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mt-10">
        {/* {products?.map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))} */}
      </div>
    </div>
  );
};

export default Product;
