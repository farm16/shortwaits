import { ApiProperty } from "@nestjs/swagger";
import { UploadFileDtoType } from "@shortwaits/shared-lib";
import { IsBase64 } from "class-validator";

export class UploadImageFile implements UploadFileDtoType {
  @IsBase64()
  @ApiProperty({ required: true })
  base64Data: string;
}
