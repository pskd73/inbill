import {Component, Inject} from "@nestjs/common";
import {Schema, Document, Model} from "mongoose";
import {Tokens} from "../database/Tokens";
import {ProductDto} from "./ProductDto";

export interface Product extends Document {
  name: string,
  storeId: string,
  price: number
}

@Component()
export class ProductService {
  static Schema = new Schema({
    name: String,
    storeId: {
      type: Schema.Types.ObjectId,
      require: true
    },
    price: Number
  })

  constructor(
    @Inject(Tokens.ProductModel) private readonly productModel: Model<Product>
  ) {}

  async getAll(): Promise<ProductDto[]> {
    return ProductDto.convert(await this.productModel.find({}));
  }

  async add(productDto: ProductDto): Promise<ProductDto> {
    const product = new this.productModel(productDto);
    return new ProductDto(await product.save());
  }
}