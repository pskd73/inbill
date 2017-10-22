import {Module} from "@nestjs/common";
import {InvoiceController} from "./InvoiceController";
import {InvoiceService} from "./InvoiceService";
import {DatabaseModule} from "../database/DatabaseModule";
import {DatabaseProviders} from "../database/DatabaseProviders";

@Module({
  modules: [DatabaseModule],
  controllers: [InvoiceController],
  components: [InvoiceService, ...DatabaseProviders]
})
export class InvoiceModule {}