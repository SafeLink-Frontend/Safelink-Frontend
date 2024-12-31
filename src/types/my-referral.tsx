export interface MyReferral {
  accountName: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  createdAt: string; // This should ideally be a Date object
  isActive: boolean;
  lastPayoutDate: string | null; // This can be null
  paymentStatus: string;
  referralCode: string;
  referralLink: string;
  totalEarnings: number;
  updatedAt: string; // This should ideally be a Date object
  user: string;
  __v: number;
  _id: string;
}
