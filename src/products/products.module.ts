import { UploadImageModule } from './../upload-image/upload-image.module';
import { UploadImageService } from './../upload-image/upload-image.service';
import { Product, ProductSchema } from "./../schemas/products.schema";
import { ProductsController } from "./products.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsService } from "./products.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), UploadImageModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
