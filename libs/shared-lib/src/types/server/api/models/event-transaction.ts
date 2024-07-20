import { CommonResponseType } from "../../../common";
import { EventStatusName } from "./events";

export interface EventTransactionType {
  id?: number;
  short_id?: number;
  client_id: string;
  event_id: string;
  transaction_date: Date;
  transaction_amount: number;
  transaction_type?: string;
  payment_method?: string;
  transaction_status?: EventStatusName;
  notes?: string;
  /** "promo123,promo213,promo341" */
  promo_codes?: string;
  withdraw_from_event: boolean;
}

export type EventTransactionsType = EventTransactionType[];

export type EventTransactionResponseType = CommonResponseType<EventTransactionType>;
export type EventTransactionsResponseType = CommonResponseType<EventTransactionsType>;
