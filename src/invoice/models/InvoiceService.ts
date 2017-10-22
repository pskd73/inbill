import {Component, Inject} from "@nestjs/common";
import {InvoiceDto} from "../InvoiceDto";
import {Model, Document} from "mongoose";

export interface Invoice extends Document {
  id: string,
  amount: number
}

@Component()
export class InvoiceService {
  constructor(
    @Inject("InvoiceModelToken") private readonly invoiceModel: Model<Invoice>
  ) {}

  async add(invoiceDto: InvoiceDto): Promise<InvoiceDto> {
    const invoice = new this.invoiceModel(invoiceDto);
    return new InvoiceDto(await invoice.save());
  }

  async getAll(): Promise<InvoiceDto[]> {
    return InvoiceDto.convert(await this.invoiceModel.find({}));
  }
}