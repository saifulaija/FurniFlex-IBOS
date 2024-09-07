// import { useState } from "react";
// import Loader from "@/components/shared/Loader/Loader";
// import NoDataFound from "@/components/shared/NoDataFound/NoDataFound";
// import ProductCard from "@/components/shared/Product/ProductCard";

// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { TQueryParam } from "@/types/global.type";
// import { useGetAllProductsQuery } from "@/redux/feature/product/productApi";

// const ProductCategory = () => {
//   const [params, setParams] = useState<TQueryParam[]>([]);
//   const [page, setPage] = useState(1);
//   const { category } = useParams<{ category: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Function to handle URL parameter updates
//   const updateURLParams = (key: string, value: string) => {
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.set(key, value);
//     navigate(`${location.pathname}?${searchParams.toString()}`, {
//       replace: true,
//     });
//   };

//   const { data: products, isLoading } = useGetAllProductsQuery([
//     { name: "page", value: page },
//     { name: "category", value: category },
//     ...params,
//   ]);

//   const meta = products?.meta as any;

//   const handlePageChange = (newPage: number) => {
//     if (newPage > 0 && newPage <= (meta?.totalPage || 1)) {
//       setPage(newPage);
//       updateURLParams("page", newPage.toString());
//     }
//   };

//   if (isLoading) return <Loader />;

//   return (
//     <div className="container mx-auto px-4">
//       {products?.data?.length === 0 ? (
//         <NoDataFound />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
//           {products?.data?.map((product: any) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       )}

//       {/* Pagination Section */}
//       {meta && meta.totalPage > 1 && (
//         <Pagination className="flex justify-center mt-8">
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={() => handlePageChange(page - 1)}
//                 className={page === 1 ? "pointer-events-none opacity-50" : ""}
//               />
//             </PaginationItem>
//             {[...Array(meta.totalPage)].map((_, index) => (
//               <PaginationItem key={index}>
//                 <PaginationLink
//                   href="#"
//                   onClick={() => handlePageChange(index + 1)}
//                   isActive={page === index + 1}
//                 >
//                   {index + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={() => handlePageChange(page + 1)}
//                 className={
//                   page === meta.totalPage
//                     ? "pointer-events-none opacity-50"
//                     : ""
//                 }
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       )}
//     </div>
//   );
// };

// export default ProductCategory;

import { useState } from "react";
import Loader from "@/components/shared/Loader/Loader";
import NoDataFound from "@/components/shared/NoDataFound/NoDataFound";
import ProductCard from "@/components/shared/Product/ProductCard";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TQueryParam } from "@/types/global.type";
import { useGetAllProductsQuery } from "@/redux/feature/product/productApi";

const ProductCategory = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6); // Default limit of products per page
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle URL parameter updates
  const updateURLParams = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const { data: products, isLoading } = useGetAllProductsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit }, // Pass the limit to the query
    { name: "category", value: category },
    ...params,
  ]);

  const meta = products?.meta as any;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (meta?.totalPage || 1)) {
      setPage(newPage);
      updateURLParams("page", newPage.toString());
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    updateURLParams("limit", newLimit.toString());
    setPage(1); // Reset to the first page when limit changes
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4">
      {products?.data?.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {products?.data?.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Section */}
      {meta && meta.totalPage > 1 && (
        <Pagination className="flex justify-center mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(page - 1)}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(meta.totalPage)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(page + 1)}
                className={
                  page === meta.totalPage
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Limit Selection */}
      {/* <div className="flex justify-center mt-4">
        <select
          value={limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2"
        >
          {[10, 20, 50].map((option) => (
            <option key={option} value={option}>
              Show {option}
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
};

export default ProductCategory;

