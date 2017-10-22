import {Module} from "@nestjs/common";
import {InvoiceController} from "./InvoiceController";
import {InvoiceService} from "./models/InvoiceService";
import {DatabaseModule} from "../database/DatabaseModule";
import {InvoiceProviders} from "./models/InvoiceProviders";

@Module({
  modules: [DatabaseModule],
  controllers: [InvoiceController],
  components: [InvoiceService, ...InvoiceProviders]
})
export class InvoiceModule {}