import { ApiProperty } from '@nestjs/swagger';

export class GetServicesDto {
  @ApiProperty({
    name: 'services',
    format: 'array',
    required: false,
  })
  services: string[];
}

export class GetServicesQuery {
  @ApiProperty({
    name: 'businessId',
    format: 'string',
    required: false,
  })
  businessId?: string;

  @ApiProperty({
    name: 'serviceId',
    format: 'string',
    required: false,
  })
  serviceId?: string;

  @ApiProperty({
    minimum: 0,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 0,
    required: false,
  })
  page?: number;

  @ApiProperty({
    name: '_sortBy',
    required: false,
  })
  sortBy?: string[];

  @ApiProperty({
    name: 'limit',
    required: false,
  })
  limit?: number;

  static _OPENAPI_METADATA_FACTORY() {
    return {
      sortBy: { type: () => [String] },
    };
  }
}
