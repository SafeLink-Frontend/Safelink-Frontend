export enum SubscriptionStatus {
  FREE = "free",
  BASIC = "basic",
  PLUS = "premium",
  PLATINUM = "Platinum",
  // Add more subscription statuses as needed
}

export interface SubscriptionData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  user: string;
  __v: number;
  plan: {
    name: SubscriptionStatus;
    _id: string;
  };
}
