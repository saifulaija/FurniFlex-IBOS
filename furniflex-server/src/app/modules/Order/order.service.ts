import { TOrder } from './Order.interface';

import mongoose from 'mongoose'; // For transaction handling
import { Order } from './order.model';
import { Product } from '../Products/product.model';

const createOrderIntoDB = async (payload: TOrder): Promise<any> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Create the order
    const newOrder = await Order.create([payload], { session });

    // 2. Update the product quantity based on the selectedQuantity
    for (const productOrder of payload.orderProduct) {
      const { productId, selectedQuantity } = productOrder;

      // Find the product and decrease the quantity
      const product = await Product.findById(productId).session(session);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      // Ensure there is enough stock
      if (product.quantity < selectedQuantity) {
        throw new Error(`Insufficient quantity for product: ${product.name}`);
      }

      product.quantity -= selectedQuantity; // Decrease the quantity
      await product.save({ session }); // Save the updated product
    }

    // 3. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return newOrder;
  } catch (error) {
    // If something goes wrong, abort the transaction
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const orderServices = {
  createOrderIntoDB,
};
