import {Invoice, InvoiceService} from "./InvoiceService";
import {StoreDto} from "../store/StoreDto";

export class InvoiceDto {
  public id: string;
  public amount: number;
  public storeId: string;
  public products: {
    productId: string,
    price: number
  }[];

  static convert(invoices: Invoice[]): InvoiceDto[] {
    return invoices.map(invoice => new InvoiceDto(invoice));
  }

  constructor(invoice: Invoice) {
    this.id = invoice._id;
    this.amount = invoice.amount;
    this.storeId = invoice.storeId;
    this.products = invoice.products;
  }
}