import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/DatabaseModule";
import {DatabaseProviders} from "../database/DatabaseProviders";
import {StoreService} from "./StoreService";

@Module({
  modules: [DatabaseModule],
  components: [StoreService, ...DatabaseProviders]
})
export class StoreModule {}