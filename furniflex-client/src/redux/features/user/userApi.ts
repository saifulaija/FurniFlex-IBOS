import { TQueryParam, TResponseRedux, TUser } from "@/types/global.type";

import { baseApi } from "../../api/baseApi";
// import { TUser } from "@/types/user";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (options) => {
        return {
          url: `/users/${options?.userId}`,
          method: "PUT",
          body: options?.data,
        };
      },
      invalidatesTags: ["user"],
    }),

    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item?.name, item?.value as string);
          });
        }

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
         
        };
      },
    }),

    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUsersByCategory: builder.query({
      query: (category) => {
        return {
          url: `/users/category/${category}`,
          method: "GET",
        };
      },
    }),

    // updateUser: builder.mutation({
    //   query: (options) => {
    //     console.log({ options });
    //     return {
    //       url: `/products/update-product/${options.productId}`,
    //       method: "PATCH",
    //       body: options.data,
    //     };
    //   },
    //   invalidatesTags: ["product"],
    // }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    getSingleUser: builder.query({
      query: (userId) => {
        return {
          url: `/users/${userId}`,
          method: "Get",
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersByCategoryQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = userApi;
