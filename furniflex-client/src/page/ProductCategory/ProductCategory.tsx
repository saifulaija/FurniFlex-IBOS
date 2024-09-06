import Loader from "@/components/shared/Loader/Loader";
import ProductCard from "@/components/shared/Product/ProductCard";
import { useGetAllProductsByCategoryQuery } from "@/redux/feature/product/productApi";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();

  const { data: products, isLoading } =
    useGetAllProductsByCategoryQuery(category);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {products?.data?.result?.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
