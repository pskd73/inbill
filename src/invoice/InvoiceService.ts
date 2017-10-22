import {Component, Inject} from "@nestjs/common";
import {InvoiceDto} from "./InvoiceDto";
import {Model, Document, Schema} from "mongoose";
import {Tokens} from "../database/Tokens";

export interface Invoice extends Document {
  id: string,
  amount: number
}

@Component()
export class InvoiceService {
  static Schema = new Schema({
    amount: Number
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
}