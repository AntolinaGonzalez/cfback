import { Req, Res, Injectable } from "@nestjs/common";
import * as multer from "multer";
import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3";
import * as dotenv from "dotenv";
import { Logger } from "@nestjs/common";

dotenv.config();
const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "cruelty-free";

@Injectable()
export class UploadImageService {
  constructor() {}

  async fileupload(file) {
    const { originalname } = file;
    return await this.upload(file.buffer, originalname);
  }
  async upload(file, name) {
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data.Location);
      });
    });
  }
}
