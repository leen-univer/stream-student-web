import { StringSchema } from "yup";

export interface tutorCourseArrType {
  Categories: ICategories;
  SubCategory: ISubcategories;
  _id: string;
  title: string;
  tutor: string;
  courseName: string;
  courseCategory: string;
  description: string;
  thumbnailUrl: string;
  courseSubCategory: string;
  mrpPrice: number;
  salePrice: number;
  thumbnailPath: string;
  publishStatus: string;
  createdAt: string;
  updatedAt: String;
  language?: [];
  options?: string;
}

interface ICategories {
  _id: string;
  description: string;
  name: string;
  thumbnailPath: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: String;
}
interface ISubcategories {
  _id: string;
  description: string;
  name: string;
  thumbnailUrl: string;
  thumbnailPath: string;
  createdAt: string;
  updatedAt: String;
}
