import {Connection, Schema} from "mongoose";
import {InvoiceService} from "../invoice/InvoiceService";
import {StoreService} from "../store/StoreService";
import {Tokens} from "./Tokens";
import {Collections} from "./Collections";

export const DatabaseProviders = [
  {
    provide: Tokens.InvoiceModel,
    useFactory: (connection: Connection) => connection.model(Collections.Invoice, InvoiceService.Schema),
    inject: [Tokens.MongoConnection]
  },
  {
    provide: Tokens.StoreModel,
    useFactory: (connection: Connection) => connection.model(Collections.Store, StoreService.Schema),
    inject: [Tokens.MongoConnection]
  }
];