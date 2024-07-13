import { CommonResponseType } from "../../..";

export type UploadFileDtoType = {
  base64Data: string;
};

type Url = {
  url: string;
};

export type UploadFileResponseType = CommonResponseType<Url>;
