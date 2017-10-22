import {Invoice} from "./models/InvoiceService";

export class InvoiceDto {
  public id: string;
  public amount: number;

  static convert(invoices: Invoice[]): InvoiceDto[] {
    return invoices.map(invoice => new InvoiceDto(invoice));
  }

  constructor(invoice: Invoice) {
    this.id = invoice._id;
    this.amount = invoice.amount;
  }
}