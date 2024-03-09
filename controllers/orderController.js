import orderModel from "../models/orderModel.js";

///////////////// place an order controller ////////////////////////////////
export const orderController = async (req, res) => {
  try {
    const { serviceType, bikename, dateOfService, cost } = req.body;
    if (!serviceType || !bikename || !dateOfService || !cost) {
      return res.status(500).send({
        message: "please Provide all Information",
        success: false,
      });
    }
    await orderModel.create({
      user: req.user._id,
      serviceType,
      bikename,
      dateOfService,
      cost,
    });
    res.status(201).send({
      success: true,
      message: "Order Placed SucessFully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to Book the order",
      error,
    });
  }
};

///////////////// find orders of specific customer ////////////////////////
export const getMyOrdersController = async (req, res) => {
  try {
    // find orders
    const order = await orderModel.find({ user: req.user._id });
    //validation
    if (!order) {
      res.status(404).send({
        success: false,
        message: "No order Placed By user",
      });
    }
    res.status(200).send({
      message: "Here is your order data",
      success: true,
      totalOrder: order.length,
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error at my order api.",
      error,
    });
  }
};

// controller for the admin dashboard that shows all the orders by every customer /////////////
export const allOrdersController = async (req, res) => {
  try {
    const allOrders = await orderModel.find();
    if (!allOrders) {
      return res.status(404).send({
        success: false,
        message: "there is not order to show",
      });
    }

    res.status(200).send({
      success: true,
      message: "here is the list of all the orders",
      totalOrder: allOrders.length,
      allOrders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error at my order api.",
      error,
    });
  }
};
