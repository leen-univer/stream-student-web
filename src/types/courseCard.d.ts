export interface CourseDataType {
  _id: string;
  image: string;
  courseName: string;
  tutorName: string;
  title: string;
  description: string;
  rating?: number;
  mrpPrice: number;
  salePrice: number;
  students: number;
  BuyCourses: BuyCoursesType;
  thumbnailUrl?: string;
  courseId?: string;
  isBlinked?: string;
}

export interface BuyCoursesType {
  thumbnailUrl?: string;
  courseName: string;
  title: string;
  mrpPrice: number;
  salePrice: number;
  image: string;
  tutorName: string;
  completeData: CompleteDataType;
}

export interface CompleteDataType {
  name: string;
}
