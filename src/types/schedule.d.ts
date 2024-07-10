export interface ScheduleDataType {
  _id: string;
  courseName: string;
  price: number;
  topicName: string;
  date: string;
  time: string;
  link: string;
  Classes?: {
    courseName?: string;
    thumbnailUrl?: string;
  };
  classTitle?: string;
  createdAt?: string;
  timeOfEnter?: string;
  timeOfExit?: string;
  endTime?: string;
  startTime?: string;
  CourseData?: {
    courseName?: string;
    thumbnailUrl?: string;
    _id?: string;
  };
}
