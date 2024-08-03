export interface BusinessReviewType {
  id: number;
  businessId: number;
  clientId: string;
  rating: number;
  reviewText: string;
  reviewDate: Date;
}
