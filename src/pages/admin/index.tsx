/* eslint-disable @next/next/no-img-element */
import {
  AnalyticsOutlined,
  AssignmentTurnedInOutlined,
  PeopleOutline,
  PersonOutline,
  QuizOutlined,
  QuizTwoTone,
  TopicOutlined,
} from "@mui/icons-material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AdminEarningGraph from "components/graphs/AdminEarningGraph";
import AdminPieGraph from "components/graphs/AdminPieGraph";
import VisitorAnalytics from "components/graphs/VisitorGraph";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminDashboardContent, adminPieGraphContent } from "locale";
import { useRouter } from "next/router";
import { useMemo } from "react";
import USER_TYPE, { GRAPH_TYPE, superAdminArrType } from "types";
const AdminDashboard = () => {
  const { data: studentData } = useSWRAPI("admin-dashboard/all-student");
  const { data: tutorData } = useSWRAPI("admin-dashboard/all-tutor");
  const { data: courseData } = useSWRAPI("admin-dashboard/all-course");
  const { data: earningData } = useSWRAPI("admin-dashboard/total-revenue");
  const { data: topTutorData } = useSWRAPI("admin-dashboard/all-top-tutor");
  const { data: uploadedCoursesData } = useSWRAPI(
    "admin-dashboard/uploaded-courses"
  );
  const topTutorDatas = topTutorData?.data?.success?.data?.topTutor?.data;
  const { data: payoutData } = useSWRAPI(
    "admin-dashboard/get-all-payOut-money"
  );
  const { data: pendingData } = useSWRAPI("admin-dashboard/get-pending-amount");
  const { data: totalResponse } = useSWRAPI(
    "admin-dashboard/total-quiz-response"
  );
  const { data: totalQuizzes } = useSWRAPI("admin-dashboard/all-quiz-count");
  const { data: totalQuizTakers } = useSWRAPI(
    "admin-dashboard/total-quiz-student"
  );

  const { data: topQuizTaker } = useSWRAPI("admin-dashboard/all-top-quiz");

  const { selectedLanguage } = useAppContext();
  // const ADMIN_ARR: superAdminArrType[] = useMemo(
  //   () => [
  //     // {
  //     //   _id: "1",
  //     //   title: `${adminDashboardContent(selectedLanguage).TotalTutorsDue}`,
  //     //   count: `${0}`,
  //     //   icon: <AttachMoneyOutlinedIcon fontSize="large" />,
  //     // },
  //     {
  //       _id: "2",
  //       title: `${adminDashboardContent(selectedLanguage).TotalPayouts}`,
  //       count: `${payoutData?.data?.data[0]?.totalPayOut || 0}`,
  //       icon: <AttachMoneyOutlinedIcon fontSize="large" />,
  //     },
  //     {
  //       _id: "3",
  //       title: `${adminDashboardContent(selectedLanguage).TotalTutorsPending}`,
  //       count: `${pendingData?.data?.data || 0}`,
  //       icon: <AttachMoneyOutlinedIcon fontSize="large" />,
  //     },
  //   ],
  //   [selectedLanguage, payoutData, pendingData]
  // );
  const SUPER_ADMIN_ARR: superAdminArrType[] = useMemo(
    () => [
      {
        _id: "1",
        title: adminDashboardContent(selectedLanguage).TotalEarnings,
        count: `${earningData?.data?.data?.data?.[0]?.totalRevenue || 0}`,
        icon: <AttachMoneyOutlinedIcon fontSize="large" />,
      },
      {
        _id: "2",
        title: `${adminDashboardContent(selectedLanguage).TotalPayouts}`,
        count: `${payoutData?.data?.data?.[0]?.totalPayOut || 0}`,
        icon: <AttachMoneyOutlinedIcon fontSize="large" />,
      },
      {
        _id: "3",
        title: `${adminDashboardContent(selectedLanguage).TotalTutorsPending}`,
        count: `${pendingData?.data?.data.toFixed(2) || 0}`,
        icon: <AttachMoneyOutlinedIcon fontSize="large" />,
      },
      {
        _id: "4",
        title: adminDashboardContent(selectedLanguage).TotalNoOfStudents,
        count: `${studentData?.data?.success?.data || 0}`,
        icon: <PeopleOutline fontSize="large" />,
        path: "/admin/students/student-details",
      },
      {
        _id: "5",
        title: adminDashboardContent(selectedLanguage).TotalNoOfTutors,
        count: `${tutorData?.data?.success?.data || 0}`,
        icon: <PersonOutline fontSize="large" />,
        path: "/admin/tutors/accepted-tutors",
      },
      {
        _id: "6",
        title: adminDashboardContent(selectedLanguage).TotalCourses,
        count: `${courseData?.data?.success?.data || 0}`,
        icon: <TopicOutlined fontSize="large" />,
        path: "/admin/courses/course-details",
      },
      {
        _id: "7",
        title: adminDashboardContent(selectedLanguage).TotalNoOfQuizzes,
        count: `${totalQuizzes?.data?.data || 0}`,
        icon: <QuizOutlined fontSize="large" />,
        path: "/admin/quizzes",
      },
      {
        _id: "8",
        title: adminDashboardContent(selectedLanguage).TotalNoOfResponses,
        count: `${totalResponse?.data?.data || 0}`,
        icon: <AssignmentTurnedInOutlined fontSize="large" />,
        path: "/admin/quizzes",
      },
      {
        _id: "9",
        title: adminDashboardContent(selectedLanguage).TotalNoOfQuizzesTakers,
        count: `${totalQuizTakers?.data?.data || 0}`,
        icon: <AnalyticsOutlined fontSize="large" />,
        path: "/admin/quizzes",
      },
    ],
    [
      studentData,
      tutorData,
      courseData,
      earningData,
      payoutData,
      pendingData,
      selectedLanguage,
    ]
  );
  return (
    <AdminPanelLayout title="Admin Dashboard">
      <article className="flex flex-col gap-10">
        <section className="flex flex-col lg:flex-row justify-between gap-5">
          <aside className="w-full grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUPER_ADMIN_ARR?.map((item: superAdminArrType) => (
              <SuperAdminDashboardCard item={item} key={item?._id} />
            ))}
          </aside>
        </section>
        <section className="flex flex-col lg:flex-row justify-between gap-5">
          {/* top tutors */}
          <aside className=" w-full lg:w-1/2 flex flex-col gap-2 rounded-2xl text-2xl font-semibold bg-white p-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] max-h-[450px] overflow-y-scroll no-scrollbar">
            <h1 className="text-center">
              {adminDashboardContent(selectedLanguage).TopTutors}
            </h1>
            {topTutorDatas?.slice(0, 10).map((_: USER_TYPE, i: number) => (
              <div
                key={i}
                className="flex gap-4 items-center border p-1 rounded-lg "
              >
                <img
                  className="w-24 h-24 object-cover rounded-lg"
                  src={_?.profileUrl || "profile.jpg"}
                  alt="tutor-image"
                />
                <div>
                  <p className="font-semibold text-xl">{_?.name}</p>
                  <p className="flex items-center font-semibold text-lg">
                    {adminDashboardContent(selectedLanguage).Experience}
                    <span className="text-lg font-semibold ml-4">
                      {_?.yearOfExperience || "Year is not given"}
                    </span>
                  </p>
                  <p className="flex items-center font-semibold text-lg">
                    {adminDashboardContent(selectedLanguage).Expertisein}
                    <span className="text-lg font-semibold ml-4">
                      {_?.expertiseInSubject || "Expertise is not given"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </aside>
          {/* top quizzers  */}
          <aside className=" w-full lg:w-1/2 flex flex-col gap-2 rounded-2xl text-2xl font-semibold bg-white p-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] max-h-[450px] overflow-y-scroll no-scrollbar">
            <h1 className="text-center">
              {adminDashboardContent(selectedLanguage).TopQuizzes}
            </h1>
            {topQuizTaker?.data?.data?.slice(0, 10).map((_: any, i: number) => (
              <div
                key={i}
                className="flex gap-4 items-center border p-1 rounded-lg "
              >
                <div className="bg-primary/10 p-3 rounded-md shadow-sm">
                  <QuizTwoTone fontSize="large" />
                </div>
                <div>
                  <p className="font-semibold text-xl">{_?.title}</p>
                  <p className="flex items-center font-semibold text-lg text-gray-600">
                    {_?.quizDataCount}
                  </p>
                </div>
              </div>
            ))}
          </aside>
        </section>
        <section className="">
          <aside className="w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-5 rounded-2xl hidden md:block">
            <AdminEarningGraph type="bar" />
          </aside>
        </section>
        <section className="w-full flex flex-col lg:flex-row justify-between gap-5 pb-5">
          <div className="w-full lg:w-2/5 py-3 bg-white rounded-2xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex items-center justify-center">
            {uploadedCoursesData?.data?.data?.data?.length ? (
              <AdminPieGraph
                title={
                  adminPieGraphContent(selectedLanguage)
                    .HighestCategorizedCourses
                }
                pieSeries={
                  uploadedCoursesData?.data?.data?.data
                    ?.slice(0, 4)
                    ?.map((item: GRAPH_TYPE) => item?.totalCourses) || []
                }
                pieLabel={
                  uploadedCoursesData?.data?.data?.data
                    ?.slice(0, 4)
                    ?.map((item: GRAPH_TYPE) => item?.name) || []
                }
              />
            ) : (
              <div className="flex items-center justify-center h-[10rem]">
                <span className="font-semibold text-xl">
                  {adminDashboardContent(selectedLanguage).NODATAAVAILABLE}
                </span>
              </div>
            )}
          </div>
          <div className="w-full lg:w-3/5 rounded-2xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <VisitorAnalytics />
          </div>
        </section>
      </article>
    </AdminPanelLayout>
  );
};

const SuperAdminDashboardCard = ({ item }: { item: superAdminArrType }) => {
  const router = useRouter();
  return (
    <article
      onClick={() => {
        item?.path && router.push(`${item?.path}`);
      }}
      className={`${
        item?.path ? "cursor-pointer hover:bg-slate-100/50" : ""
      } w-full bg-white flex  items-center justify-between p-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-2xl`}
    >
      <section className="w-48 flex flex-col gap-2">
        <p className="text-2xl lg:text-3xl font-semibold text-primary">
          {item?.count}
        </p>
        <p className="text-xl font-semibold text-gray-700 ">{item?.title}</p>
      </section>
      <section className="w-16 h-16 flex items-center justify-center  bg-primary/20 rounded-full ">
        <p>{item?.icon}</p>
      </section>
    </article>
  );
};
export default AdminDashboard;
