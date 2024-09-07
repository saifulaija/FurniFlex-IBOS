import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TUser = {
  email: string;
  profilePhoto: string;
  password: string;
  isDeleted: boolean;
  role: string;
};

export type TProduct = {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  discount?: number;
  isDeleted?: boolean;
};

export type CartItem = {
  isDeleted: boolean;
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  discount: number;
  quantity: number;
};

export type TCategory = {
  title: string;
  path: string;
  show?: boolean;
};
// types.ts

// Define the type for the blog post
export interface IBlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  icon: any; // Corrected to use the LucideIcon type
  content: string;
}
