import { CreateProductDto } from "../dto/product.dto";
import { Product, ProductDocument } from "./../schemas/products.schema";
import { Body, Injectable, Post, Req } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async newProduct(newProduct: CreateProductDto): Promise<Product> {
    console.log(newProduct)
    const product = new this.productModel(newProduct);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
