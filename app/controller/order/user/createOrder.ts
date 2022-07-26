import { Order } from './../../../model/OrdersModel';
import { Request, Response } from 'express';
import { OrderModel } from '../../../model/OrdersModel';

export async function createOrder(req: Request, res: Response) {
  // get order details from the request body

  const orderId = OrderModel.OrderNumber(req.user?.phoneNumber!);
  console.log('orderNumber', orderId);

  try {
    const newOrder = await OrderModel.orderCreator({
      orderId,
      senderPhone: req.user?.phoneNumber,
      ...req.body,
    });

    // const newOrder = (await order.save()) as Order;

    console.log('newOder', newOrder);

    res.status(201).json({
      status: 'success',
      message: `Order ${newOrder.orderId}`,
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        status: 'fail',
        message: 'error occur while creating your order',
      });
  }
}
