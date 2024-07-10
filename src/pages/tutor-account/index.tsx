/* eslint-disable @next/next/no-img-element */
import { MenuBook, Topic } from "@mui/icons-material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ClassIcon from "@mui/icons-material/Class";
import LeadColumnGraph from "components/graphs/AssignmentGraph";
import DonutDealsDashboard from "components/graphs/CoursePurchase";
import { useAppContext } from "contexts";
import useSWRAPI from "hooks/useSWRAPI";
import { TutorPanelLayout } from "layouts";
import { tutorMainDashboard } from "locale";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { GRAPH_TYPE } from "types";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
type adminArrTpe = {
  _id?: string;
  title?: string;
  count?: string;
  icon?: JSX.Element;
  path?: string;
};
const TutorAccount = () => {
  const { selectedLanguage } = useAppContext();
  const { data: assignmentData } = useSWRAPI("tutor-dashboard/all-assignment");
  const { data: allSoldData } = useSWRAPI("tutor-dashboard/all-sold-course");
  const { data: myCoursesData } = useSWRAPI("tutor-dashboard/all-courses");
  const { data: earningData } = useSWRAPI("tutor-dashboard/total-earning");
  const { data: totalearning } = useSWRAPI(
    "tutor-dashboard/tutor-total-earning"
  );
  const { data: liveEarning } = useSWRAPI("tutor-dashboard/class-earning");
  const { data: classData } = useSWRAPI("tutor-dashboard/my-class-card-data");
  const { data: BundleData } = useSWRAPI("bundles/get-search-bundle");

  const { data: topPurchasedData } = useSWRAPI(
    "tutor-dashboard/top-purchased-course"
  );

  const ADMIN_ARR: adminArrTpe[] = useMemo(
    () => [
      // {
      //   _id: "1",
      //   title: `${tutorMainDashboard(selectedLanguage).courseSold}`,
      //   count: `${allSoldData?.data?.data?.totalSoldCourse || 0}`,
      //   icon: <PeopleAlt fontSize="large" />,
      // },
      {
        _id: "1",
        title: `${
          tutorMainDashboard(selectedLanguage).totalNumberOfAssignment
        }`,
        count: `${assignmentData?.data?.data?.totalCount || 0}`,
        icon: <MenuBook fontSize="large" />,
      },
      {
        _id: "2",
        title: `${tutorMainDashboard(selectedLanguage).myBundles}`,
        count: `${BundleData?.data?.data?.totalCount || 0}`,
        icon: <LibraryBooksIcon fontSize="large" />,
        path: "/tutor-account/courses/manage-bundles",
      },
      {
        _id: "3",
        title: `${tutorMainDashboard(selectedLanguage).myCourses}`,
        count: `${myCoursesData?.data?.data?.student?.totalCount || 0}`,
        icon: <Topic fontSize="large" />,
        path: "/tutor-account/courses/manage-courses",
      },
      {
        _id: "4",
        title: `${tutorMainDashboard(selectedLanguage).TotalEarnings}`,
        count: `${totalearning?.data?.data?.data[0]?.total || 0}`,
        icon: <AttachMoneyOutlinedIcon fontSize="large" />,
      },
      {
        _id: "5",
        title: `${tutorMainDashboard(selectedLanguage).LiveClassEarnings}`,
        count: `${liveEarning?.data?.data?.data[0]?.totalEarnings || 0}`,
        icon: <AttachMoneyOutlinedIcon fontSize="large" />,
      },
      {
        _id: "6",
        title: `${tutorMainDashboard(selectedLanguage).TotalCourseEarnings}`,
        count: `${earningData?.data?.data?.data[0]?.totalEarnings || 0}`,
        icon: <AttachMoneyOutlinedIcon fontSize="large" />,
      },
    ],
    [
      selectedLanguage,
      assignmentData,
      BundleData,
      myCoursesData,
      totalearning,
      liveEarning,
      earningData,
    ]
  );
  const CLASS_ARR: adminArrTpe[] = useMemo(
    () => [
      {
        _id: "1",
        title: `${tutorMainDashboard(selectedLanguage).TotalClass}`,
        count: `${classData?.data?.data?.totalClasses || 0}`,
        icon: <ClassIcon fontSize="large" />,
      },
      {
        _id: "2",
        title: `${tutorMainDashboard(selectedLanguage).PaidClass}`,
        count: `${classData?.data?.data?.paidClasses || 0}`,
        icon: <ClassIcon fontSize="large" />,
      },
      {
        _id: "3",
        title: `${tutorMainDashboard(selectedLanguage).FreeClass}`,
        count: `${classData?.data?.data?.freeClasses || 0}`,
        icon: <ClassIcon fontSize="large" />,
      },
    ],
    [selectedLanguage, classData]
  );

  return (
    <TutorPanelLayout title="My Account">
      <article className="flex flex-col gap-12">
        <section className="w-full flex md:flex-col lg:flex-row flex-col gap-5">
          <aside className="w-full md:w-full 2xl:w-[60%] p-8 flex items-center justify-between bg-primary/20 border-2 border-primary rounded-3xl ">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl text-primary font-medium capitalize">
                {tutorMainDashboard(selectedLanguage).courseSold}
              </h1>
              <p className="title-styling">
                {allSoldData?.data?.data?.totalSoldCourse || 0}
              </p>
            </div>
            <img
              className="w-32 h-32 rounded-md lg:block md:block hidden"
              src="/Image/elearning.png"
              alt="tutor-image"
            />
          </aside>
          <aside className="w-full md:w-full 2xl:w-[40%] bg-white rounded-3xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <DonutDealsDashboard type="donut" />
          </aside>
        </section>
        <section className="grid place-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {ADMIN_ARR.map((item: adminArrTpe) => (
            <MainDashboardCard item={item} key={item._id} />
          ))}
        </section>
        <section className="w-full flex md:flex-col lg:flex-row flex-col items-center justify-center gap-5">
          <aside className="lg:w-3/5 md:w-full w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl p-4 overflow-hidden">
            <h2 className="text-black font-semibold pl-5">
              {tutorMainDashboard(selectedLanguage).allCourses}
            </h2>
            {topPurchasedData?.data?.data?.data?.length ? (
              <LeadColumnGraph
                barHeight={350}
                // title={tutorMainDashboard(selectedLanguage).allCourses}
                categories={
                  topPurchasedData?.data?.data?.data
                    ?.slice(0, 7)
                    ?.map((course: GRAPH_TYPE) => course?._id) || []
                }
                series={[
                  {
                    name: tutorMainDashboard(selectedLanguage)
                      .noOfPurchasedCourse,
                    data:
                      topPurchasedData?.data?.data?.data
                        ?.slice(0, 7)
                        ?.map((course: GRAPH_TYPE) => course?.count) || [],
                  },
                ]}
                colors={["#0e0e66"]}
              />
            ) : (
              <div className="flex items-center justify-center h-[10rem]">
                <span className="font-semibold text-xl">
                  {tutorMainDashboard(selectedLanguage).nocoursesoldyet}
                </span>
              </div>
            )}
          </aside>
          <aside className="lg:w-2/5 md:w-full w-full border bg-white rounded-3xl p-4">
            <p className="text-center text-xl font-bold">
              {tutorMainDashboard(selectedLanguage).classStatistics}
            </p>
            <div className="flex flex-col gap-1">
              {CLASS_ARR.map((item: adminArrTpe) => (
                <StatisticCard item={item} key={item._id} />
              ))}
            </div>
          </aside>
        </section>
      </article>
    </TutorPanelLayout>
  );
};
const MainDashboardCard = ({ item }: { item: adminArrTpe }) => {
  const router = useRouter();
  return (
    // <section className="flex lg:flex-row md:flex-col">
    <article
      onClick={() => {
        item?.path && router.push(`${item?.path}`);
      }}
      className={`${
        item?.path ? "cursor-pointer hover:bg-slate-100/50" : ""
      } w-full bg-white flex items-center gap-4 p-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-bl-[45px]`}
    >
      <div className="w-28 min-w-[7rem] h-24 bg-primary/20 border border-primary text-white flex items-center justify-center rounded-bl-[40px] rounded-tr-[40px] rounded-br-[40px]">
        <p className="text-primary">{item?.icon}</p>
      </div>
      <div className="text-xl font-medium flex flex-col gap-2 ">
        <h1 className="text-primary">{item?.title}</h1>
        <p className="text-2xl lg:text-3xl font-semibold">{item?.count}</p>
      </div>
    </article>
    // </section>
  );
};
const StatisticCard = ({ item }: { item: adminArrTpe }) => {
  return (
    // <section className="flex lg:flex-row md:flex-col">
    <article className="w-full bg-white flex items-center gap-4 p-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-bl-[45px]">
      <div className="w-28 min-w-[7rem] h-24 bg-primary/20 border border-primary text-white flex items-center justify-center rounded-bl-[40px] rounded-tr-[40px] rounded-br-[40px]">
        <p className="text-primary">{item?.icon}</p>
      </div>
      <div className="text-xl font-medium flex flex-col gap-2 ">
        <h1 className="text-primary">{item?.title}</h1>
        <p className="text-2xl lg:text-3xl font-semibold">{item?.count}</p>
      </div>
    </article>
    // </section>
  );
};

export default TutorAccount;
