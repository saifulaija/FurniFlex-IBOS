// export interface IUser {
//     _id:string;
//   name: string;
//   email: string;
//   gender: "Male" | "Female";
//   domain: string;
//   availability: boolean;
//   avatar?: string;
//   isDeleted?: boolean;
// }
export interface CartItem {
  _id: string;
  name: string;
  email: string;
  domain: string;
  gender: string;
  availability: boolean;
  avatar: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userQuantity: number;
}

// Make sure CartItem extends IUser if needed
export interface IUser {
  _id: string;
  name: string;
  email: string;
  gender: string;
  domain: string;
  availability: boolean;
  avatar: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userQuantity: number;
}