import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";

@Injectable()
export class FileUploadService {
  private s3: S3;

  constructor(private config: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.config.get("AWS_S3_FILE_UPLOAD_ACCESS_KEY_ID"),
      secretAccessKey: this.config.get("AWS_S3_FILE_UPLOAD_SECRET_ACCESS_KEY"),
      region: this.config.get("AWS_S3_FILE_UPLOAD_REGION"),
    });
  }

  async uploadBase64Image(base64Data: string, filename = "_no_id_provided") {
    if (!base64Data) {
      // If there's no file, throw an invalid request exception
      throw new NotAcceptableException("Invalid request");
    }

    const buffer = Buffer.from(base64Data, "base64");

    const params = {
      Bucket: this.config.get("AWS_S3_FILE_UPLOAD_BUCKET"),
      Key: Date.now().toString() + filename,
      Body: buffer,
      ContentType: "image/jpeg", // Set the content type as needed
      ACL: "public-read", // You can set your ACL
    };

    try {
      const uploadResult: ManagedUpload.SendData = await this.s3.upload(params).promise();
      console.log("File uploaded successfully to S3 !");
      console.log("File key:", uploadResult.Key);
      console.log("File location:", uploadResult.Location);

      return {
        url: uploadResult.Location,
      };
    } catch (error) {
      console.log("Error uploading base64 image to S3:", error);
      throw new InternalServerErrorException("Failed to upload file");
    }
  }
}
