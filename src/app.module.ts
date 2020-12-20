import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "./products/products.module";
import { ConfigModule } from "@nestjs/config";
import { UploadImageController } from './upload-image/upload-image.controller';
import { UploadImageService } from './upload-image/upload-image.service';
import { UploadImageModule } from './upload-image/upload-image.module';
@Module({
  imports: [ConfigModule.forRoot({ envFilePath: `.env` }),MongooseModule.forRoot("mongodb://localhost/nest"), ProductsModule, UploadImageModule],
  controllers: [AppController, UploadImageController],
  providers: [AppService, UploadImageService],
})
export class AppModule {}
