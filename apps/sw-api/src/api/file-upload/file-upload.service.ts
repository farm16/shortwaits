import { PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FileUploadService {
  private s3: S3Client;

  constructor(private config: ConfigService) {
    this.s3 = new S3Client({
      region: this.config.get("AWS_S3_FILE_UPLOAD_REGION"),
      credentials: {
        accessKeyId: this.config.get("AWS_S3_FILE_UPLOAD_ACCESS_KEY_ID"),
        secretAccessKey: this.config.get("AWS_S3_FILE_UPLOAD_SECRET_ACCESS_KEY"),
      },
    });
  }

  async uploadBase64Image(base64Data: string, filename = "_no_id_provided") {
    if (!base64Data) {
      // If there's no file, throw an invalid request exception
      throw new NotAcceptableException("Invalid request");
    }

    const buffer = Buffer.from(base64Data, "base64");

    const uploadParams = {
      Bucket: this.config.get("AWS_S3_FILE_UPLOAD_BUCKET"),
      Key: Date.now().toString() + filename,
      Body: buffer,
      ContentType: "image/jpeg", // Set the content type as needed
      ACL: "public-read", // You can set your ACL
    } as PutObjectCommandInput;

    try {
      const upload = new Upload({
        client: this.s3,
        params: uploadParams,
      });
      const result = await upload.done();

      console.log("File uploaded successfully:", result.$metadata.httpStatusCode === 200);
      console.log("File request Id:", result.$metadata.requestId);
      console.log("File url:", result.Location);
      console.log("File ETag:", result.ETag);

      if (result.$metadata.httpStatusCode !== 200) {
        throw new InternalServerErrorException("Failed to upload file");
      }

      return {
        url: result.Location,
      };
    } catch (error) {
      console.log("Error uploading base64 image to S3:", error);
      throw new InternalServerErrorException("Failed to upload file");
    }
  }
}
