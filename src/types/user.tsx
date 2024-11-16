import { SubscriptionStatus } from "./SubscriptionStatus";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  subscriptionStatus: SubscriptionStatus;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  about?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  leisurePictures?: string[];
  professionalPictures?: string[];
  workPictures?: string[];
  shareableLink?: string;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
  _id: string;
}

// export interface Root {
//   _id: string
//   email: string
//   profilePicture: string
//   professionalPictures: string[]
//   workPictures: string[]
//   leisurePictures: string[]
//   createdAt: string
//   updatedAt: string
//   __v: number
//   country: string
//   about: string
//   address: string
//   city: string
//   phoneNumber: string
//   state: string
//   zipCode: string
//   id: string
// }
