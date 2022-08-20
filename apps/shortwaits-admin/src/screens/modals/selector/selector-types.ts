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
