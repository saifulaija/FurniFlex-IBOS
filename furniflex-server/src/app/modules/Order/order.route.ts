import express from 'express';
import { orderControllers } from './order.controller';



const router = express.Router();



router.post('/create-order', orderControllers.createOrder);


export const OrderRoute = router;
