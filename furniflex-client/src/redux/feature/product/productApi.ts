import { TProduct } from "@/types/product.type";
import { TQueryParam, TResponseRedux } from "../../../types/global.type";


import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProduct: builder.mutation({
      query: (options) => {
        console.log({ options });
        return {
          url: `/products/update-product/${options.productId}`,
          method: "PATCH",
          body: options.data,
        };
      },
      invalidatesTags: ["product"],
    }),

    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/product",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products/create-product",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["product"],
    }),

    getAllProductsByCategory: builder.query({
      query: (category) => {
        return {
          url: `/product/category/${category}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/delete-product/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["product"],
    }),

    getSingleProduct: builder.query({
      query: (productId) => {
        return {
          url: `/products/get-single-product/${productId}`,
          method: "PUT",
        };
      },
      providesTags: ["product"],
    }),
    getSingleProductForDetails: builder.query({
      query: (productId) => {
        console.log(productId);
        return {
          url: `/products/get-single-product/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQuery,
  useGetSingleProductForDetailsQuery,
  useGetAllProductsByCategoryQuery,
} = productApi;
