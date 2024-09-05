import { formatDistanceToNowStrict } from "date-fns";

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Change to USD for dollar format
  }).format(amount);
};

export const formatDate = (from: Date) => {
  return formatDistanceToNowStrict(from, { addSuffix: true });
};
