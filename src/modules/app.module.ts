import { Module } from '@nestjs/common';
import {InvoiceModule} from "../invoice/InvoiceModule";
import {StoreModule} from "../store/StoreModule";
import {ProductModule} from "../product/ProductModule";

@Module({
  modules: [InvoiceModule, StoreModule, ProductModule],
})
export class ApplicationModule {}