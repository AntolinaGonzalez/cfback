import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from "./upload-image.service";
import { Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";

@Controller("fileupload")
export class UploadImageController {
  constructor(private readonly imageUploadService: UploadImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingleFileWithPost(@UploadedFile() file, @Body() body) {
    const image = await this.imageUploadService.fileupload(file)
    console.log(typeof(image))
    return image
  }
}
