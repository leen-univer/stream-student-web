/* eslint-disable @next/next/no-img-element */
import ClassIcon from "@mui/icons-material/Class";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { PROFILE } from "assets/images";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useAuth, useSWRAPI } from "hooks";
import { AccountLayout, PublicLayout } from "layouts";
import { myDashboardContent } from "locale";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  studentDashboardArrType,
  studentDashboardClassArrType,
  studentDashboardTutorArrType,
} from "types";

const MyDashboard = () => {
  const { selectedLanguage } = useAppContext();
  const { user } = useAuth();

  const { data: ClassCardData } = useSWRAPI(`student/current-day-class`);

  const { data: CoursePurchaseCount } = useSWRAPI(
    "student/totalPurchasedCourse"
  );
  const { data: CourseCompleteCount } = useSWRAPI(
    "student/allMyCompletedCourse"
  );
  const { data: CourseInCompleteCount } = useSWRAPI(
    "student/unComplete-courses"
  );

  const { data: MyTutor } = useSWRAPI("student/my-tutor");
  const STUDENT_ARR: studentDashboardArrType[] = useMemo(
    () => [
      {
        _id: "1",
        title: `${myDashboardContent(selectedLanguage).NoofCoursePurchased}`,
        count: `${CoursePurchaseCount?.data?.data?.totalPurchasedCourses || 0}`,
        icon: <LibraryBooksIcon fontSize="medium" />,
        path: "/my-account/my-courses",
      },
      {
        _id: "2",
        title: `${myDashboardContent(selectedLanguage).NoofCourseCompleted}`,
        count: `${CourseCompleteCount?.data?.data?.totalCount || 0}`,
        icon: <MenuBookIcon fontSize="medium" />,
        path: "/my-account/my-certificates",
      },
      {
        _id: "3",
        title: `${myDashboardContent(selectedLanguage).NoofCourseOngoing}`,
        count: `${CourseInCompleteCount?.data?.data || 0}`,
        icon: <ClassIcon fontSize="medium" />,
        path: "/my-account/my-courses",
      },
      // {
      //   _id: "4",
      //   title: `${myDashboardContent(selectedLanguage).NoofCertificateEarned}`,
      //   count: `${0}`,
      //   icon: <WorkspacePremiumIcon fontSize="medium" />,
      // },
    ],
    [
      selectedLanguage,
      CourseCompleteCount,
      CoursePurchaseCount,
      CourseInCompleteCount,
    ]
  );

  return (
    <PublicLayout
      title="Dashboard | StreamStudent"
      footerBgColor="bg-primary/20"
    >
      <AccountLayout>
        <section className="w-full max-h-[40rem] min-h-[31rem] overflow-x-scroll">
          <h1 className="title-styling text-center pb-6">
            {myDashboardContent(selectedLanguage).welcome}{" "}
            <span className="text-primary">{user?.name}</span>
          </h1>
          <article className="w-full flex flex-col gap-4">
            <aside className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">
                {myDashboardContent(selectedLanguage).SummaryReport}
              </h1>
              <section className="grid place-items-center md:grid-cols-3 grid-cols-1 gap-2">
                {STUDENT_ARR?.map((item: studentDashboardArrType) => (
                  <MainDashboardCard item={item} key={item._id} />
                ))}
              </section>
            </aside>

            <aside className="flex md:flex-row flex-col w-full justify-between gap-4">
              <div className="md:w-1/2 w-full flex gap-2 flex-col">
                <h1 className="text-2xl font-semibold">
                  {myDashboardContent(selectedLanguage).UpcomingClasses}
                </h1>
                {ClassCardData?.data?.data?.data?.length ? (
                  <section className="bg-white max-h-[250px] overflow-y-scroll no-scrollbar flex flex-col gap-2">
                    {ClassCardData?.data?.data?.data?.map(
                      (item: studentDashboardClassArrType) => (
                        <ClassCard item={item} key={item._id} />
                      )
                    )}
                  </section>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-lg shadow-lg border-2 hover:border-primary/20">
                    <h1 className="font-semibold text-xl">
                      {myDashboardContent(selectedLanguage).NoUpcomingClasses}
                    </h1>
                  </div>
                )}
              </div>
              <div className="md:w-1/2 w-full flex gap-2 flex-col">
                <h1 className="text-2xl font-semibold">
                  {myDashboardContent(selectedLanguage).MyTeachers}
                </h1>
                {MyTutor?.data?.data?.length ? (
                  <section className="bg-white max-h-[250px] overflow-y-scroll no-scrollbar flex flex-col gap-2">
                    {MyTutor?.data?.data?.map(
                      (item: studentDashboardTutorArrType) => (
                        <TutorCard item={item} key={item._id} />
                      )
                    )}
                  </section>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-lg shadow-lg border-2 hover:border-primary/20">
                    <h1 className="font-semibold text-xl">
                      {
                        myDashboardContent(selectedLanguage)
                          .YouHaveNotPurchasedanyCourseyet
                      }
                    </h1>
                  </div>
                )}
              </div>
            </aside>
          </article>
        </section>
      </AccountLayout>
    </PublicLayout>
  );
};

export default MyDashboard;

const MainDashboardCard = ({ item }: { item: studentDashboardArrType }) => {
  const router = useRouter();
  return (
    <article
      onClick={() => {
        item?.path && router.push(`${item?.path}`);
      }}
      className={`${
        item?.path ? "cursor-pointer hover:bg-slate-100/50" : ""
      } w-full  flex flex-row  items-center justify-between bg-white p-4 rounded-lg shadow-lg border-2 hover:border-primary/20`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-2xl lg:text-3xl font-semibold text-primary">
          {item?.count}
        </p>
        <p className="text-xl font-medium">{item?.title}</p>
      </div>
      <div className="w-16 h-16 flex items-center justify-center  bg-primary/20 rounded-full ">
        <p>{item?.icon}</p>
      </div>
    </article>
  );
};
const ClassCard = ({ item }: { item: studentDashboardClassArrType }) => {
  const { selectedLanguage } = useAppContext();
  return (
    <article className="w-full flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg border-2 hover:border-primary/20">
      <p className=" font-semibold text-lg">
        {item?.Class?.Course?.courseName || "Not Given"}
      </p>
      <p className="font-medium tracking-wide">
        {myDashboardContent(selectedLanguage).StartTime}
        <span className="font-semibold">
          {dayjs(item?.Class?.timeOfEnter || "Not Given").format(
            " ddd, MMM D, YYYY h:mm A"
          )}
        </span>
      </p>
      <p className="font-medium tracking-wide">
        {myDashboardContent(selectedLanguage).EndTime}
        <span className="font-semibold">
          {dayjs(item?.Class?.timeOfExit).format(" ddd, MMM D, YYYY h:mm A")}
        </span>
      </p>
    </article>
  );
};
const TutorCard = ({ item }: { item: studentDashboardTutorArrType }) => {
  const { selectedLanguage } = useAppContext();
  const router = useRouter();
  return (
    <article
      onClick={() => router.push(`/tutors/${item?._id}`)}
      className="w-full flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg border-2 hover:border-primary/20 py-2 space-y-5 cursor-pointer"
    >
      <div className="flex flex-row gap-4 items-center justify-start">
        <img
          src={item?.tutorProfile || PROFILE.src}
          alt="course-image"
          className="w-14 h-14 rounded-3xl"
        />
        <div>
          <h1 className="flex items-center font-semibold text-sm 2xl:text-lg">
            {myDashboardContent(selectedLanguage).Name}
            <span className="text-sm font-semibold ml-4 2xl:text-base">
              {item?.tutorName || "Name not given"}
            </span>
          </h1>
          <h1 className="flex items-center font-semibold text-sm 2xl:text-lg">
            {myDashboardContent(selectedLanguage).Experience}
            <span className="text-sm font-semibold ml-4 2xl:text-base">
              {item?.yearOfExperience || 0}
            </span>
          </h1>
          <h1 className="flex items-center font-semibold text-sm 2xl:text-lg">
            {myDashboardContent(selectedLanguage).Email}
            <span className="text-sm font-semibold ml-4 2xl:text-base">
              {item?.tutorEmail || "Email not given"}
            </span>
          </h1>
        </div>
      </div>
    </article>
  );
};
