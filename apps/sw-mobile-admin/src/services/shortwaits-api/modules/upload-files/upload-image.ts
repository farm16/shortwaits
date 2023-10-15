import { UploadFileDtoType, UploadFileResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  body: UploadFileDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<UploadFileResponseType, RequestType>({
    query: ({ body }) => ({
      ...endpoints.uploadImageFile.getConfig([], {}),
      body,
    }),
  });
