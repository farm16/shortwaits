export interface EventTransactionType {
  id: number;
  client_id: string;
  event_id: string;
  transaction_date: Date;
  transaction_amount: number;
  transaction_type?: string;
  payment_method?: string;
  transaction_status?: string;
  notes?: string;
  promo_code?: string[];
}
