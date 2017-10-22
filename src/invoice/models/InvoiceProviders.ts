import {Connection, Schema} from "mongoose";

const InvoiceSchema = new Schema({
  amount: Number
});

export const InvoiceProviders = [
  {
    provide: "InvoiceModelToken",
    useFactory: (connection: Connection) => connection.model("Invoide", InvoiceSchema),
    inject: ["MongoConnectionToken"]
  }
];