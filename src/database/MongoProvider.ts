import * as mongoose from "mongoose";
import {Tokens} from "./Tokens";

export const MongoProvider = {
  provide: Tokens.MongoConnection,
  useFactory: async () => {
    (mongoose as any).Promise = global.Promise;
    return await mongoose.connect("mongodb://pramodkumar73:pskd1382@ds151963.mlab.com:51963/inbill", {useMongoClient: true});
  }
}