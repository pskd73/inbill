import {Component, Inject} from "@nestjs/common";
import {InvoiceDto} from "./InvoiceDto";
import {Model, Document, Schema} from "mongoose";
import {Tokens} from "../database/Tokens";
import {Collections} from "../database/Collections";
import {ProductDto} from "../product/ProductDto";

export interface Invoice extends Document {
  id: string,
  amount: number,
  storeId: string,
  products: {
    productId: string,
    price: number
  }[]
}

@Component()
export class InvoiceService {
  static Schema = new Schema({
    amount: Number,
    storeId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: Collections.Store
    },
    products: [{
      productId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: Collections.Product
      },
      price: Number
    }]
  });

  constructor(
    @Inject(Tokens.InvoiceModel) private readonly invoiceModel: Model<Invoice>
  ) {}

  async add(invoiceDto: InvoiceDto): Promise<InvoiceDto> {
    const invoice = new this.invoiceModel(invoiceDto);
    return new InvoiceDto(await invoice.save());
  }

  async getAll(): Promise<InvoiceDto[]> {
    return InvoiceDto.convert(await this.invoiceModel.find({}));
  }

  async getById(id: string): Promise<InvoiceDto> {
    return new InvoiceDto(await this.invoiceModel.findById(id));
  }

  async getStoreInvoices(storeId: string): Promise<InvoiceDto[]> {
    return InvoiceDto.convert(await this.invoiceModel.find({storeId}));
  }

  async addProducts(invoiceDto: InvoiceDto, products: ProductDto[]): Promise<InvoiceDto> {
    return new InvoiceDto(await this.invoiceModel.findByIdAndUpdate(invoiceDto.id, {$push: {products}}, {new: true}));
  }
}