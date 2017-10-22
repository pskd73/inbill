import {Connection, Schema} from "mongoose";
import {InvoiceService} from "../invoice/InvoiceService";
import {StoreService} from "../store/StoreService";
import {Tokens} from "./Tokens";

export const DatabaseProviders = [
  {
    provide: Tokens.InvoiceModel,
    useFactory: (connection: Connection) => connection.model("Invoice", InvoiceService.Schema),
    inject: [Tokens.MongoConnection]
  },
  {
    provide: Tokens.StoreModel,
    useFactory: (connection: Connection) => connection.model("Store", StoreService.Schema),
    inject: [Tokens.MongoConnection]
  }
];