import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import {
  TypedUseQueryHookResult,
  TypedUseQueryStateResult,
  UseQuery,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ShortwaitsAdminDefaultDataSuccessResponseType } from "@shortwaits/shared-types";
import { FC } from "react";
import { ListRenderItem } from "react-native";
import { Button, ButtonProps, Spinner } from "../../../components";

/**
 * - WRITE: Enable add/update capability.
 * - READ: Enable visibility capability.
 * - DELETE: Enable delete capability.
 */
export type ModalPermissions = "WRITE" | "READ" | "DELETE";
export interface SelectorConfig {
  headerTitle: string;
  /**
   * should be selectMax > 0,
   * else disable select action
   *  */
  selectMax?: number;
  searchPlaceholder: string;
  /**
   * func to initialize data
   */
  isReadOnly: boolean;
  testId?: string;
}
