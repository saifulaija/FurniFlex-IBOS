
export type TProduct = {
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  quantity:number,
  discount?: number;
  isDeleted?: boolean;
};
