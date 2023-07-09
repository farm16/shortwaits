import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

// TODO: this can be cache !!!
@ApiTags("categories")
@Controller("categories")
@ApiBearerAuth("bearer")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns all categories record",
    // type: CategoriesSuccessResponse,
  })
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns category record",
    // type: CategoriesSuccessResponse,
  })
  getCategory(@Param("id") categoriesId: string) {
    return this.categoriesService.getCategory(categoriesId);
  }
}
