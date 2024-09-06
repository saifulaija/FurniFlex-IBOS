import { useState, useEffect } from "react";

import { TProduct } from "@/types/global.type";
import axiosInstance from "@/utils/axiosInstance";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";

const Product = () => {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/product"); // Adjust the API endpoint
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    // Implement the add to cart logic
    console.log(`Add product ${productId} to cart`);
  };
console.log(products);

  if (isLoading) <Loader />;

  return (
    <div className="product-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mt-10">
        {products?.map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
