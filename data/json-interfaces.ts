import * as mongoose from 'mongoose';

export interface IBaseCategory {
  id: string;
  title: string;
  count: number;
  weight: number;
}

export interface IBaseSubcategory {
  id: string;
  title: string;
  count: number;
  category: string;
  weight: number;
}
export interface IBaseImage {
  url: string;
  source: string;
}
export interface IBaseProduct {
  id: string;
  title: string;
  description: string;
  quantity: number;
  subcategory: string;
  status: boolean;
  images: IBaseImage[];
  price: number;
  discount: number;
}

export interface IBaseOrderProduct {
  product: string;
  count: number;
}

export interface IBaseOrder {
  id: string;
  products: IBaseOrderProduct[];
  totalCost: number;
  createdAt: string;
  delivery: string;
  user: string;
  phone: string;
}

export interface ICategory {
  _id: mongoose.Types.ObjectId;
  name: string;
}

export interface ISubCategory {
  _id: mongoose.Types.ObjectId;
  name: string;
}

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  subCategory: mongoose.Types.ObjectId;
  images: IBaseImage[];
  price: number;
  status: boolean;
}

export interface IOrderProduct {
  product: mongoose.Types.ObjectId;
  count: number;
}

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  products: IOrderProduct[];
  totalCost: number;
  createdAt: string;
  delivery: string;
  user: string;
  phone: string;
}
export interface IJsonData {
  categories: IBaseCategory[];
  subcategories: IBaseSubcategory[];
  products: IBaseProduct[];
  orders: IBaseOrder[];
}
