import { CreateProductDto } from "../dto/product.dto";
import { Product, ProductDocument } from "./../schemas/products.schema";
import { Injectable, Param, Post, Req } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async newProduct(newProduct: CreateProductDto): Promise<Product> {

    const product = new this.productModel(newProduct);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findType(type){
    return this.productModel.find({type:type})
  }

  async editOne(id, body) {
    const product = await this.productModel.findByIdAndUpdate(id, body);
    return product
  }

  async deleteProduct(id) {
    const product = await this.productModel.findOneAndDelete(id);
    return { message: "Product deleted" };
  }
}
