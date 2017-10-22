import {Component, Inject} from "@nestjs/common";
import {Document, Model, Schema} from "mongoose";
import {StoreDto} from "./StoreDto";
import {Tokens} from "../database/Tokens";

export interface Store extends Document {
  name: string,
  ownerId: string,
  address: {
    apartment: string,
    street: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    pincode: number
  }
}

@Component()
export class StoreService {
  static Schema = new Schema({
    name: String,
    ownerId: Schema.Types.ObjectId,
    address: {
      apartment: String,
      street: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      pincode: Number
    }
  });

  constructor(
    @Inject(Tokens.StoreModel) private readonly storeModel: Model<Store>
  ) {}

  async getAll(): Promise<StoreDto[]> {
    return StoreDto.convert(await this.storeModel.find({}));
  }
}