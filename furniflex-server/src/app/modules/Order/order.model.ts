import { Schema, model } from 'mongoose';
import { TOrder, TProductOrder } from './Order.interface';

const ProductItemSchema = new Schema<TProductOrder>({
  productId: {
    type: Schema.Types.ObjectId,

    required: true,
  },
  selectedQuantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },


  discount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new Schema<TOrder>(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    paymentSystem: {
      type: String,
      required: true,
      default: 'Cash on delivery',
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    deliveryStatus: {
      type: String,
      default: 'processing',
    },
    orderProduct: {
      type: [ProductItemSchema],
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('order', OrderSchema);
