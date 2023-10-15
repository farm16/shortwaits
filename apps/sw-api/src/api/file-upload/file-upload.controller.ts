import { Controller, Post, Body, Req } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "../../common/decorators/auth.decorator";
import { UploadImageFile } from "./file-upload.dto";

@ApiTags("upload-file")
@Controller("upload-file")
// @ApiBearerAuth("bearer")
// @UseGuards(AtGuard)
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post("image")
  @Public()
  @ApiOperation({ summary: "Upload an image file as base64" })
  @ApiResponse({ status: 201, description: "File uploaded successfully" })
  async uploadFile(
    @Req() request,
    @Body() body: UploadImageFile // Accept base64 data in the request body
  ) {
    const base64Data = body.base64Data;
    return await this.fileUploadService.uploadBase64Image(base64Data, request?.user?.sub);
  }
}
