import { Types } from 'mongoose';

export type TProductOrder = {
  productId: Types.ObjectId;
  selectedQuantity: number;
  image: string;
  price: number;
  name: string;
  discount: number;
};

export type TOrder = {
  userId: Types.ObjectId;
  name: string;
  phone: string;
  address: string;
  email:string;
  description?: string;
  paymentSystem:string;
  totalPrice: number;
  orderNumber: string;
  deliveryStatus?: string;
  orderProduct: TProductOrder[];
};
