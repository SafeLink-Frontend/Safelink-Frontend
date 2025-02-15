export interface Product {
  _id: { $oid: string };
  title: string;
  description: string;
  price: number;
  currency: string;
  images: [string];
  videos: [string];
  owner: {
    name: string;
    _id: string;
    id: string;
    email: string;
    profilePicture: string;
    phoneNumber: number;
  };
}

export interface UserProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: [string];
  videos: [string];
  owner: {
    name: string;
    _id: string;
    id: string;
    email: string;
    profilePicture: string;
    phoneNumber: number;
  };
}

export type UserProducts = {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: [string];
  videos: [string];
  owner: string;
}[];
