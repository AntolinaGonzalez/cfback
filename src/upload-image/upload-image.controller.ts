import { UploadImageService } from './upload-image.service';
import { Controller, Post, Req, Res } from '@nestjs/common';


@Controller('fileupload')
export class UploadImageController {
  constructor(private readonly imageUploadService: UploadImageService) {}
  @Post()
  async create(@Req() request, @Res() response) {
    try {
      await this.imageUploadService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}