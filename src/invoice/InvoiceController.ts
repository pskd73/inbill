import {Controller, Get, Post, Query, Body} from "@nestjs/common";
import {InvoiceDto} from "./InvoiceDto";
import {InvoiceService} from "./models/InvoiceService";

@Controller("invoice")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async getAll(): Promise<InvoiceDto[]> {
    return this.invoiceService.getAll();
  }

  @Post()
  async add(@Body() invoice: InvoiceDto): Promise<InvoiceDto> {
    return this.invoiceService.add(invoice);
  }
}