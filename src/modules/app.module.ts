import { Module } from '@nestjs/common';
import {InvoiceModule} from "../invoice/InvoiceModule";

@Module({
  modules: [InvoiceModule],
})
export class ApplicationModule {}