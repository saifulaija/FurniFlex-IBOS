// import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { truncateTitle } from "@/utils/truncateTitle";
// import { TProduct } from "@/types/global.type";
// import { formatMoney } from "@/utils/formatMoney";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart } from "lucide-react";

// const ProductCard = ({ product }: { product: TProduct }) => {
//   const shortTitle = truncateTitle(product?.name ?? "", 30);
//   const description = truncateTitle(product?.description ?? "", 80);
//   const discount = product?.discount ?? 0;
//   const originalPrice = Math.round(product?.price ?? 0);
//   const discountedPrice = Math.round(
//     originalPrice - (originalPrice * discount) / 100
//   );

//     const handleAddToCart = (productId: string) => {
//       // Implement the add to cart logic
//       console.log(`Add product ${productId} to cart`);
//     };

//   return (
//     <Card
//       className={cn(
//         "group mx-auto w-80 transform overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
//       )}
//     >
//       <div className="relative w-full overflow-hidden group">
//         <img
//           src={product.image}
//           alt="Product Image"
//           width={400}
//           height={100}
//           className="object-cover object-center h-[200px] transition-transform duration-500 ease-in-out transform group-hover:scale-110"
//         />
        
//       </div>

//       <div className=" px-2 flex flex-col flex-grow">
//         <h2 className="text-md font-bold text-gray-700 capitalize">
//           {shortTitle}
//         </h2>
//         <div className=" flex-grow">
//           {discount === 0 ? (
//             <p className="text-primary text-lg font-semibold">
//               Price: {formatMoney(originalPrice)}
//             </p>
//           ) : (
//             <div className="flex  items-center justify-between">
//               <h5 className="text-primary text-lg font-semibold">
//                 {formatMoney(discountedPrice)}
//               </h5>
//               <h5 className="text-gray-600 text-lg line-through">
//                 {formatMoney(originalPrice)}
//               </h5>
//               <p className="text-red-500 font-semibold">{product?.discount}% OFF</p>
//             </div>
//           )}
//         </div>
//         <p className="text-gray-500 text-sm mb-3">{description}</p>
//       </div>

//       {/* Button at the bottom of the card */}
//       <Button
//       onClick={()=>handleAddToCart(product._id)}
//         asChild
//         className={cn(
//           " w-full mt-auto cursor-pointer"
//         )}
//       >
//         <span className="flex items-center gap-1">
//           <ShoppingCart />

//           <span>Add to Cart</span>
//         </span>
//       </Button>
//     </Card>
//   );
// };

// export default ProductCard;
import { useDispatch } from "react-redux";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { truncateTitle } from "@/utils/truncateTitle";
import { TProduct } from "@/types/global.type";
import { formatMoney } from "@/utils/formatMoney";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/feature/product/cartSlice";

const ProductCard = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();
  const shortTitle = truncateTitle(product?.name ?? "", 30);
  const description = truncateTitle(product?.description ?? "", 80);
  const discount = product?.discount ?? 0;
  const originalPrice = Math.round(product?.price ?? 0);
  const discountedPrice = Math.round(
    originalPrice - (originalPrice * discount) / 100
  );

  const handleAddToCart = (productId: string) => {
    const productToAdd = {
      _id: productId,
      name: product.name,
      price: product.price,
      cartQuantity: 1,
      discount: product.discount,
      image: product.image,
    };
    dispatch(addToCart(productToAdd));
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <Card
      className={cn(
        "group mx-auto w-80 transform overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
      )}
    >
      <div className="relative w-full overflow-hidden group">
        <img
          src={product.image}
          alt="Product Image"
          width={400}
          height={100}
          className="object-cover object-center h-[200px] transition-transform duration-500 ease-in-out transform group-hover:scale-110"
        />
      </div>

      <div className="px-2 flex flex-col flex-grow">
        <h2 className="text-md font-bold text-gray-700 capitalize">
          {shortTitle}
        </h2>
        <div className="flex-grow">
          {discount === 0 ? (
            <p className="text-primary text-lg font-semibold">
              Price: {formatMoney(originalPrice)}
            </p>
          ) : (
            <div className="flex items-center justify-between">
              <h5 className="text-primary text-lg font-semibold">
                {formatMoney(discountedPrice)}
              </h5>
              <h5 className="text-gray-600 text-lg line-through">
                {formatMoney(originalPrice)}
              </h5>
              <p className="text-red-500 font-semibold">
                {product?.discount}% OFF
              </p>
            </div>
          )}
        </div>
        <p className="text-gray-500 text-sm mb-3">{description}</p>
      </div>

      <Button
        onClick={() => handleAddToCart(product._id)}
        asChild
        className={cn("w-full mt-auto cursor-pointer")}
      >
        <span className="flex items-center gap-1">
          <ShoppingCart />
          <span>Add to Cart</span>
        </span>
      </Button>
    </Card>
  );
};

export default ProductCard;

