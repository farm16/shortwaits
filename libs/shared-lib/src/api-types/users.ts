import { BusinessUserType } from "../models-types";

import { CommonResponseType, DocType } from ".";
import { ConvertToDtoType } from "../common-types";

export type UserDocType = DocType<BusinessUserType>;
export type UserDtoType = ConvertToDtoType<UserDocType>;
export type UsersDtoType = UserDtoType[];
export type UserResponseType = CommonResponseType<UserDtoType>;
export type UsersResponseType = CommonResponseType<UsersDtoType>;
