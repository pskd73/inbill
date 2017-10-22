import { Module } from '@nestjs/common';
import {InvoiceModule} from "../invoice/InvoiceModule";
import {StoreModule} from "../store/StoreModule";

@Module({
  modules: [InvoiceModule, StoreModule],
})
export class ApplicationModule {}