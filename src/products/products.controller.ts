import { Product } from "./../schemas/products.schema";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./../dto/product.dto";
import { Body, Controller, Get, Post, Param} from "@nestjs/common";

@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async newProduct(@Body() newProduct: CreateProductDto) {
    return this.productService.newProduct(newProduct);
  }

  @Get()
  async allProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':type')
  async productType(@Param('type') type):Promise<Product[]>{
    return this.productService.findType(type)
  }
}
