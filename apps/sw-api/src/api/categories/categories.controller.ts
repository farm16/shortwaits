import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";

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

  @Get(":categoryId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns category record",
    // type: CategoriesSuccessResponse,
  })
  getCategory(@Param("categoryId") categoriesId: string) {
    return this.categoriesService.getCategory(categoriesId);
  }
}
