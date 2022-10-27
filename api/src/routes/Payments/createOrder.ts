import axios from "axios";
import { Router } from "express";
import purchaseOrder from "../../models/purchaseOrder";
import { checkStock } from "../../middlewares/checkStock";
import { verifyUser } from "../../middlewares/verifyUser";
import { deleteStock } from "../../middlewares/deleteStock";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/create-order", checkStock, verifyUser, async (req, res) => {
  const { user, compra } = req.body;

  let value: number = compra["compra"].reduce((acc: any, curr: any) => {
    return acc["price"] + curr["price"];
  });

  let productos = compra["compra"].map((obj: Object) => {
    return {
      name: obj["name"],
      quantity: obj["cantidad"],
      price: obj["price"],
    };
  });

  const newOrder = new purchaseOrder({
    user: compra.user["email"],
    products: productos,
  });
  newOrder.save();
  const idOrder = newOrder["_id"];
  const id = idOrder.toString();

  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `${idOrder}`,
          amount: {
            currency_code: "USD",
            value: value,
          },
        },
      ],
      application_context: {
        brand_name: "Henry BarberShop",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",

        return_url: `http://localhost:${process.env.PORT}/payments/capture-order`,
        cancel_url: `http://localhost:${process.env.PORT}/payments/cancel-order/${id}`,
      },
    };
    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      order,
      {
        auth: {
          username: `${process.env.PAYPAL_CLIENT_ID}`,
          password: `${process.env.PAYPAL_CLIENT_SECRET}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
