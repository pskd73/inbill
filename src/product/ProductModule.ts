import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/DatabaseModule";
import {DatabaseProviders} from "../database/DatabaseProviders";
import {ProductService} from "./ProductService";

@Module({
  modules: [DatabaseModule],
  components: [...DatabaseProviders, ProductService]
})
export class ProductModule {}