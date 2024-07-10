import TutorLineGraph from "components/graphs/TutorLineGraph";
import TutorPieChart from "components/graphs/TutorPieChart";
import { TutorPanelLayout } from "layouts";
import { useAppContext } from "contexts";
import { assignmentDashboard, dataContent } from "locale";
import { useSWRAPI } from "hooks";
import { GRAPH_TYPE } from "types";

const TutorAssignments = () => {
  const { selectedLanguage } = useAppContext();
  const { data: assignmentData } = useSWRAPI(
    "tutor-dashboard/course-wise-section"
  );
  const { data } = useSWRAPI("courseCompleted/course-status");

  return (
    <TutorPanelLayout title="Assignment Dashboard | StreamStudent">
      <article className="w-full flex lg:flex-row md:flex-col flex-col gap-5 rounded-xl">
        <section className="lg:w-3/5 md:w-full sm:w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <h2 className="text-black font-semibold pl-5">
            {assignmentDashboard(selectedLanguage).totalAssignWithSub}
          </h2>
          {data?.data?.data?.data?.length ? (
            <TutorLineGraph
              series={[
                {
                  name: assignmentDashboard(selectedLanguage)
                    .submittedAssignments,
                  data:
                    data?.data?.data?.data
                      ?.slice(0, 5)
                      ?.map((item: GRAPH_TYPE) => item?.completedStatus) || [],
                },
              ]}
              height={360}
              colors={["#0e0e66"]}
              // title={assignmentDashboard(selectedLanguage).totalAssignWithSub}
              xaxisCategories={
                data?.data?.data?.data?.slice(0, 5)?.map((item: GRAPH_TYPE) => {
                  return (
                    item?.courseName?.slice(0, 15) +
                    `${
                      item?.courseName?.length && item?.courseName?.length > 15
                        ? "..."
                        : ""
                    }`
                  );
                }) || []
              }
              yaxisTitle={
                assignmentDashboard(selectedLanguage).numberOfAssignments
              }
              xaxisTitle={assignmentDashboard(selectedLanguage).courses}
            />
          ) : (
            <div className="flex items-center justify-center h-[10rem]">
              <span className="font-semibold text-xl">
                {dataContent(selectedLanguage).NoCourse}
              </span>
            </div>
          )}
        </section>
        <section className="lg:w-2/5 md:w-full sm:w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <h2 className="text-black font-semibold pl-5">
            {assignmentDashboard(selectedLanguage).coursewiseTotalsections}
          </h2>
          {assignmentData?.data?.data?.data?.length ? (
            <TutorPieChart
              title={
                assignmentDashboard(selectedLanguage).coursewiseTotalsections
              }
              pieSeries={
                assignmentData?.data?.data?.data?.length
                  ? assignmentData?.data?.data?.data
                      ?.slice(0, 5)
                      ?.map((item: GRAPH_TYPE) => item?.sectionCount || 0)
                  : []
              }
              pieLabel={
                assignmentData?.data?.data?.data?.length
                  ? assignmentData?.data?.data?.data
                      ?.slice(0, 5)
                      ?.map((item: GRAPH_TYPE) => String(item?.courseName))
                  : []
              }
            />
          ) : (
            <div className="flex items-center justify-center h-[10rem]">
              <span className="font-semibold text-xl">
                {dataContent(selectedLanguage).NoCourse}
              </span>
            </div>
          )}
        </section>
      </article>
    </TutorPanelLayout>
  );
};

export default TutorAssignments;
