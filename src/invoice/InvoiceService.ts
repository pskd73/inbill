import {Component, Inject} from "@nestjs/common";
import {InvoiceDto} from "./InvoiceDto";
import {Model, Document, Schema} from "mongoose";
import {Tokens} from "../database/Tokens";
import {Collections} from "../database/Collections";

export interface Invoice extends Document {
  id: string,
  amount: number,
  storeId: string
}

@Component()
export class InvoiceService {
  static Schema = new Schema({
    amount: Number,
    storeId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: Collections.Store
    }
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
}