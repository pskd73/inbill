import {Module} from "@nestjs/common";
import {MongoProvider} from "./MongoProvider";

@Module({
  components: [MongoProvider],
  exports: [MongoProvider]
})
export class DatabaseModule {}