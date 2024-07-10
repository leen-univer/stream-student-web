import CourseBarGraph from "components/graphs/CourseBarGraph";
import DonutDashboard from "components/graphs/DonutDashboard";
import { TutorPanelLayout } from "layouts";
import { useAppContext } from "contexts";
import { dataContent, tutorCourseDashboard } from "locale";
import { useSWRAPI } from "hooks";
import { GRAPH_TYPE } from "types";
const TutorCourses = () => {
  const { data } = useSWRAPI("courseCompleted/course-status");

  const { selectedLanguage } = useAppContext();
  return (
    <TutorPanelLayout title="Course Dashboard | StreamStudent">
      <article className="w-full flex flex-col">
        <section className="w-full flex lg:flex-row md:flex-col flex-col gap-5 pb-1">
          <aside className="lg:w-2/5 md:w-full sm:w-full">
            <DonutDashboard type="donut" />
          </aside>
          <aside className="lg:w-3/5 md:w-full sm:w-full px-3 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl">
            <h2 className="text-black font-semibold pl-5">
              {tutorCourseDashboard(selectedLanguage).courseCompleted}
            </h2>
            {data?.data?.data?.data?.length ? (
              <CourseBarGraph
                series={[
                  {
                    name: `${
                      tutorCourseDashboard(selectedLanguage).completedCourse
                    }`,
                    data:
                      data?.data?.data?.data
                        ?.slice(0, 5)
                        ?.map((item: GRAPH_TYPE) => item?.completedStatus) ||
                      [],
                  },
                  {
                    name: `${
                      tutorCourseDashboard(selectedLanguage).notCompletedCourse
                    }`,
                    data:
                      data?.data?.data?.data
                        ?.slice(0, 5)
                        ?.map((item: GRAPH_TYPE) => item?.difference) || [],
                  },
                ]}
                categories={
                  data?.data?.data?.data
                    ?.slice(0, 5)
                    ?.map((item: GRAPH_TYPE) => {
                      return (
                        item?.courseName?.slice(0, 15) +
                        `${
                          item?.courseName?.length &&
                          item?.courseName?.length > 15
                            ? "..."
                            : ""
                        }`
                      );
                    }) || []
                }
                colors={["#0e0e66", "#00ADEC"]}
                // title={tutorCourseDashboard(selectedLanguage).courseCompleted}
                barHeight={280}
              />
            ) : (
              <div className="flex items-center justify-center h-[10rem]">
                <span className="font-semibold text-xl">
                  {dataContent(selectedLanguage).NoCourse}
                </span>
              </div>
            )}
          </aside>
        </section>
      </article>
    </TutorPanelLayout>
  );
};

export default TutorCourses;
