import * as mongoose from "mongoose";

export const MongoProvider = {
  provide: "MongoConnectionToken",
  useFactory: async () => {
    (mongoose as any).Promise = global.Promise;
    return await mongoose.connect("mongodb://pramodkumar73:pskd1382@ds151963.mlab.com:51963/inbill", {useMongoClient: true});
  }
}