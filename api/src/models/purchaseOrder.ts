import mongoose, { Model } from "mongoose";

const { Schema, model } = mongoose;

export interface IPurchaseOrder {
  user: {
    id: string;
  };
  products: [
    {
      id: string;
      quantity: number;
    }
  ];
  state: string;
}
const PurchaseOrderSchema = new Schema<IPurchaseOrder>(
  {
    user: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    products: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    state: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<IPurchaseOrder>("PurchaseOrder", PurchaseOrderSchema);
