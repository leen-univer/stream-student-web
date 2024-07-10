import { Description } from "@mui/icons-material";
import { Socket } from "socket.io-client";

export type LanguageType = "en" | "ar";
export type AppContextType = {
  selectedLanguage: LanguageType;
  changeLanguage?: (lang: LanguageType) => void;
  socketRef?: Socket<any, any>;
};

export type ROLE = "STUDENT" | "TUTOR" | "SUPER-ADMIN";

export default interface USER_TYPE {
  role: ROLE;
  name: string;
  email: string;
  country: string;
  phoneNumber: string;
  password?: string;
  designation?: string;
  profileUrl?: string;
  profilePath?: string;
  about?: string;
  image?: string;
  yearOfExperience?: number;
  expertiseInSubject?: string;
  status: "ACTIVE" | "INACTIVE";
  isBlocked: boolean;
  isVerified: boolean;
  emailVerificationToken: string | undefined;
  skills?: string[];
  fcmTokens: {
    web: string;
    android: string;
    ios: string;
  };
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  // isSubmitted?: boolean;
}

export type APIOptsType = {
  path: string;
  body?: any;
  method?: RequestInit["method"];
  headers?: {
    [key: string]: string;
  };
  options?: RequestInit;
  token?: string;
  isImage?: boolean;
};

export type APIReturnType = {
  success: any;
  data: any;
  status: number;
  message: string;
  error: any;
  ACCESS_TOKEN?: any;
  REFRESH_TOKEN?: any;
  res: any;
};

export type APIFunction = (APIOpts: APIOptsType) => Promise<APIReturnType>;

export type SubCategoryType = {
  name: string;
  description: string;
  categoryId: CATEGORY_TYPE;
  thumbnailUrl: string;
  thumbnailPath: string;
  _id: string;
};

export type CATEGORY_TYPE = {
  name: string;
  description: string;
  thumbnailUrl: string;
  thumbnailPath: string;
  _id?: string;
  totalCourses?: string;
  count?: number;
};
export type COURSE_TYPE = {
  _id: string;
  category: string;
  thumbnailUrl: string;
  thumbnailPath: string;
  studentCount: number;
  courseName?: string;
  totalStudents?: number;
};

export type GRAPH_TYPE = {
  _id?: string;
  count?: number;
  totalCourses?: number;
  name?: string;
  course?: string;
  totalTutor?: string;
  totalStudents?: number;
  tutorCount?: number;
  totalEarnings?: number;
  courseName?: string;
  courseNames?: string;
  studentCount?: number;
  assignmentCount?: number;
  totalSubcategories: number;
  category?: string;
  categoryName?: string;
  lastMonthCount?: number;
  totalCount?: number;
  sectionCount?: number;
  completedStatus?: number;
  difference?: number;
  studentInvolve?: number;
};

export type REVIEW_TYPE = {
  _id?: string;
  Tutor?: {
    name?: string;
  };
  Courses?: {
    title?: string;
    courseName?: string;
  };
  courseData?: {
    courseName?: string;
    thumbnailUrl?: string;
  };
  createdAt?: string;
  rating?: number;
  message?: string;
  ReviewCourses?: {
    rating?: number;
    message?: string;
    createdAt?: string;
    _id: string;
  };
  Student?: {
    name?: string;
    profileUrl?: string;
  };
};

export type LIVE_STUDENT = {
  _id?: string;
  user?: { name?: string; email?: string };
  transaction?: { createdAt?: string };
};

export type COURSE_ALL_DATA = {
  _id?: string;
  Category?: {
    name?: string;
  };
  Tutor?: {
    name?: string;
  };
  courseName?: string;
  description?: string;
  mrpPrice?: number;
  salePrice?: number;
  thumbnailUrl?: string;
  title?: string;
  topic?: string;
  updatedAt: string;
  Section?: {
    topic?: string;
    VideoSection?: {
      title?: string;
      videoUrl?: string;
      _id?: string;
    }[];
  };
  questions?: QuestionType[];
};

export type QuestionType = {
  answer?: string;
  marks?: number;
  question?: string;
  title?: string;
  videoUrl?: string;
  _id?: string;
  options: string[];
  hint?: string;
};

export type Student_Class_DataType = {
  _id?: string;
  Class?: {
    _id: string;
    Course?: { courseName: string };
    Tutor?: {
      name?: string;
    };
    classTitle?: string;
    startDate?: string;
    timeOfEnter?: string;
    timeOfExit?: string;
  };
};
export type studentArrType = {
  _id?: string;
  courseName?: string;
  purchaseUserCount?: number;
  salePrice?: number;
  totalSale?: number;
  createdAt?: string;
  email?: string;
  id?: string;
  name?: string;
  purchaseDate?: string;
  courseStatus?: string;
};

export type superAdminArrType = {
  _id?: string;
  title?: string;
  count?: string;
  path?: string;
  icon?: JSX.Element;
};
export type studentDashboardArrType = {
  _id?: string;
  title?: string;
  count?: string;
  path?: string;
  timeOfEnter?: string;
  timeOfExit?: string;
  Course?: {
    courseName?: string;
  };
  icon?: JSX.Element;
};
export type studentDashboardClassArrType = {
  _id?: string;
  Class?: {
    _id?: string;
    timeOfEnter?: string;
    timeOfExit?: string;
    Course?: {
      courseName?: string;
    };
  };
};
export type studentDashboardTutorArrType = {
  _id?: string;
  tutorProfile?: string;
  tutorName?: string;
  tutorEmail?: string;
  yearOfExperience?: number;
};
export type bundleDataType = {
  _id?: string;
  description?: string;
  mrpPrice?: number;
  name?: string;
  salePrice?: number;
  thumbnailPath?: string;
  thumbnailUrl?: string;
  Courses?: coursesArrType[];
};

export type coursesArrType = {
  _id?: string;
  courseName?: string;
  description?: string;
  mrpPrice?: number;
  salePrice?: number;
  thumbnailPath?: string;
  thumbnailUrl?: string;
};
export type tutorInfoType = {
  _id?: string;
  name?: string;
  profileUrl?: string;
  email?: string;
  yearOfExperience?: number;
};
