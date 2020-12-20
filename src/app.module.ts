import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsController } from "./products/products.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "./products/products.module";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/nest"), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
