/* eslint-disable @next/next/no-img-element */
import TutorLineGraph from "components/graphs/TutorLineGraph";
import TutorPieChart from "components/graphs/TutorPieChart";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminTutorDashboardContent, dataContent } from "locale";
import Link from "next/link";
import { GRAPH_TYPE } from "types";
const CourseDashboard = () => {
  const { selectedLanguage } = useAppContext();
  const { data: allTutorData } = useSWRAPI("admin-dashboard/all-tutor");
  const { data: activeTutorData } = useSWRAPI(
    "admin-dashboard/all-active-tutor"
  );
  const { data: pendingTutorData } = useSWRAPI(
    "admin-dashboard/all-pending-tutor"
  );
  const { data: blockedTutorData } = useSWRAPI("admin-dashboard/block-tutor");

  const { data: mainData } = useSWRAPI("admin-dashboard/course-wise-data");

  return (
    <AdminPanelLayout title="Tutor Dashboard | StreamStudent">
      <article className="flex flex-col gap-10">
        <section className="w-full flex flex-col lg:flex-row justify-between items-center gap-5">
          <aside className="w-full lg:w-2/5 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
            {mainData?.data?.data?.data?.length ? (
              <TutorPieChart
                title={
                  adminTutorDashboardContent(selectedLanguage)
                    .HighestNoOfTutorsInTop7Categories
                }
                pieSeries={
                  mainData?.data?.data?.data
                    ?.slice(0, 7)
                    ?.map((item: GRAPH_TYPE) => item?.totalTutor) || []
                }
                pieLabel={
                  mainData?.data?.data?.data
                    ?.slice(0, 7)
                    ?.map((item: GRAPH_TYPE) => item?.name) || []
                }
              />
            ) : (
              <div className="flex items-center justify-center h-[10rem]">
                <span className="font-semibold text-xl">
                  {dataContent(selectedLanguage).NODATAAVAILABLE}
                </span>
              </div>
            )}
          </aside>
          <aside className="w-full lg:w-3/5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Link href="/admin/tutors/accepted-tutors">
              <div className="flex flex-col justify-center items-center text-2xl border bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md overflow-hidden">
                <div className="w-full  flex justify-between items-center font-bold text-white bg-primary p-3">
                  <p className="text-xl ">
                    {
                      adminTutorDashboardContent(selectedLanguage)
                        .TotalNoOfTutors
                    }
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                  <div className="text-primary flex justify-center items-center gap-4">
                    <span>
                      <img
                        className="w-20 text-5xl"
                        src="/Image/admin_tutor_icon.png"
                        alt="tutor_icon"
                      />
                    </span>
                    <p className="font-bold text-primary">
                      {allTutorData?.data?.success?.data || 0}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/admin/tutors/accepted-tutors">
              <div className="flex flex-col justify-center items-center text-2xl border bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md overflow-hidden">
                <div className="w-full  flex justify-between items-center font-bold text-white bg-secondary p-3">
                  <p className="text-xl ">
                    {
                      adminTutorDashboardContent(selectedLanguage)
                        .AcceptedTutors
                    }
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                  <div className=" flex justify-center items-center gap-4">
                    <span>
                      <img
                        className="w-20 text-5xl"
                        src="/Image/admin_tutor_icon.png"
                        alt="tutor_icon"
                      />
                    </span>
                    <p className="text-secondary font-bold">
                      {activeTutorData?.data?.data?.totalCount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/admin/tutors/pending-tutors">
              <div className="flex flex-col justify-center items-center text-2xl border bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md overflow-hidden">
                <div className="w-full  flex justify-between items-center font-bold text-white bg-[#7C7661] p-3">
                  <p className="text-xl ">
                    {
                      adminTutorDashboardContent(selectedLanguage)
                        .PendingRequests
                    }
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                  <div className=" flex justify-center items-center gap-4">
                    <span>
                      <img
                        className="w-20 text-5xl"
                        src="/Image/admin_tutor_icon.png"
                        alt="tutor_icon"
                      />
                    </span>
                    <p className="text-[#7C7661] font-bold">
                      {pendingTutorData?.data?.data?.totalCount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/admin/tutors/accepted-tutors">
              <div className="flex flex-col justify-center items-center text-2xl border bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md overflow-hidden">
                <div className="w-full  flex justify-between items-center font-bold text-white bg-[#000000] p-3">
                  <p className="text-xl ">
                    {adminTutorDashboardContent(selectedLanguage).BlockTutors}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                  <div className="flex justify-center items-center gap-4">
                    <span>
                      <img
                        className="w-20 text-5xl"
                        src="/Image/admin_tutor_icon.png"
                        alt="tutor_icon"
                      />
                    </span>
                    <p className="text-[#000000] font-bold">
                      {blockedTutorData?.data?.data?.totalCount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </aside>
        </section>
        <section>
          <TutorLineGraph
            series={[
              {
                name: adminTutorDashboardContent(selectedLanguage)
                  .TotalStudents,
                data:
                  mainData?.data?.data?.data
                    ?.slice(0, 8)
                    ?.map((item: GRAPH_TYPE) => item?.totalStudents) || [],
              },
              {
                name: adminTutorDashboardContent(selectedLanguage).TotalTutors,
                data:
                  mainData?.data?.data?.data
                    ?.slice(0, 8)
                    ?.map((item: GRAPH_TYPE) => item?.totalTutor) || [],
              },
            ]}
            height={360}
            colors={["#0e0e66", "#00ADEC"]}
            title={
              adminTutorDashboardContent(selectedLanguage)
                .TotalTutorsWithStudents
            }
            xaxisCategories={
              mainData?.data?.data?.data
                ?.slice(0, 8)
                ?.map((item: GRAPH_TYPE) => {
                  return (
                    item?.name?.slice(0, 8) +
                    `${
                      item?.name?.length && item?.name?.length > 8 ? "..." : ""
                    }`
                  );
                }) || []
            }
            yaxisTitle={
              adminTutorDashboardContent(selectedLanguage).NoOfTutorsAndStudents
            }
            xaxisTitle={adminTutorDashboardContent(selectedLanguage).Categories}
          />
        </section>
      </article>
    </AdminPanelLayout>
  );
};

export default CourseDashboard;
