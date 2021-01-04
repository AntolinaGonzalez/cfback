import { UploadImageService } from './../upload-image/upload-image.service';
import { Product } from "./../schemas/products.schema";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./../dto/product.dto";
import { Body, Controller, Get, Post, Param, Put,  UploadedFile, UseInterceptors} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService,
    private imageUploadService: UploadImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingleFileWithPost(@UploadedFile() file, @Body() body) { 
    const image = await this.imageUploadService.fileupload(file)
    return await this.productService.newProduct({...body, imageUrl:image})
  }
  
  @Get()
  async allProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':type')
  async productType(@Param('type') type):Promise<Product[]>{
    return this.productService.findType(type)
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body):Promise<Product>{
    console.log(body)
    return this.productService.editOne(id,body)
  }
}
