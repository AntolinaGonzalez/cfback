import { UploadImageService } from './../upload-image/upload-image.service';
import { Product } from "./../schemas/products.schema";
import { ProductsService } from "./products.service";
import { Body, Controller, Get, Post, Param, Put,  UploadedFile, UseInterceptors, Delete} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService,
    private imageUploadService: UploadImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async newProduct(@UploadedFile() file, @Body() body) { 
    const image = await this.imageUploadService.fileupload(file)
    return await this.productService.newProduct({...body, imageUrl:image})
  }
  
  @Get()
  async showAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':type')
  async showProductType(@Param('type') type):Promise<Product[]>{
    return this.productService.findType(type)
  }

  @Put(':id')
  async updateProduct(@Param('id') id, @Body() body):Promise<Product>{
    return this.productService.editOne(id,body)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id):Promise<Object>{
    return this.productService.deleteProduct(id)
  }
}
