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
  data?: {
    result: T; // The type of the actual data, e.g., TUser[] for an array of users
    meta?: TMeta; // Ensure meta is defined here
  };
  error?: TError;
  success: boolean;
  message: string;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TUser = {
  userName: string;
  email: string;
  password: string;
  isDeleted: boolean;
  role: string;
};


export const GenderOption = ["Male", "Female"];
export const DomainOption = [
  "Sales",
  "Marketing",
  "UI Designing",
  "Business Development",
  "Management",
  "IT",
  "Finance"
];





export type TProduct = {
  _id:string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  discount?: number;
  isDeleted?: boolean;
};

// Define the type for a product
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

