import { Tooltip } from "@mui/material";
import { COURSEDEFAULT } from "assets/images";
import CategoryColumnBarGraph from "components/graphs/CategoryGraph";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminCourseDashboardContent } from "locale";
import { CATEGORY_TYPE, GRAPH_TYPE } from "types";

const CourseDashboard = () => {
  const { selectedLanguage } = useAppContext();
  const { data: uploadedCoursecData } = useSWRAPI(
    "admin-dashboard/uploaded-courses"
  );
  return (
    <AdminPanelLayout title="Course Dashboard | StreamStudent">
      <article className="grid place-items-center gap-10">
        <section className="w-full">
          <CategoryColumnBarGraph
            barHeight={480}
            categories={
              uploadedCoursecData?.data?.data?.data
                ?.slice(0, 10)
                ?.map((item: GRAPH_TYPE) => {
                  return item?.name;
                  // item?.name?.slice(0, 10) +
                  // `${
                  //   item?.name?.length && item?.name?.length > 10 ? "..." : ""
                  // }`
                }) || []
            }
            colors={["#0e0e66", "#00ADEC", "#3b5998"]}
            series={[
              {
                name: adminCourseDashboardContent(selectedLanguage)
                  .SuCategories,
                data:
                  uploadedCoursecData?.data?.data?.data
                    ?.slice(0, 10)
                    ?.map((item: GRAPH_TYPE) => item?.totalSubcategories) || [],
              },
              {
                name: adminCourseDashboardContent(selectedLanguage).Courses,
                data:
                  uploadedCoursecData?.data?.data?.data
                    ?.slice(0, 10)
                    ?.map((item: GRAPH_TYPE) => item?.totalCourses) || [],
              },
            ]}
            title={
              adminCourseDashboardContent(selectedLanguage)
                .TotalUploadedCoursesByCategory
            }
          />
        </section>
        <section className="w-full">
          <h1 className="title-styling text-center text-4xl text-primary pb-4">
            {adminCourseDashboardContent(selectedLanguage).CreatedCategories}
          </h1>
          <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 pt-4">
            {uploadedCoursecData?.data?.data?.data
              // ?.slice(0, 12)
              ?.map((item: CATEGORY_TYPE) => (
                <div
                  key={item._id}
                  className="w-full flex items-center justify-between bg-primary/10 rounded-xl border "
                >
                  <div className="flex flex-col p-5">
                    <p className="lg:text-lg lg:w-40 font-bold text-primary">
                      {item?.name}
                    </p>
                    <p>{item.totalCourses || 0} Courses</p>
                  </div>
                  <div className="w-32 h-36 overflow-hidden flex justify-center items-center bg-primary rounded-r-xl">
                    <img
                      className=" object-cover object-center"
                      src={item.thumbnailUrl || COURSEDEFAULT.src}
                      alt=""
                    />
                  </div>
                </div>
              ))}
          </aside>
        </section>
      </article>
    </AdminPanelLayout>
  );
};

export default CourseDashboard;
