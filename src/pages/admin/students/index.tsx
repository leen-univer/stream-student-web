/* eslint-disable @next/next/no-img-element */
import { COURSEDEFAULT } from "assets/images";
import AdminStudentGraph from "components/graphs/AdminStudentGraph";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminStudentDashboardContent } from "locale";
import Link from "next/link";
import { COURSE_TYPE } from "types";
import { sliceSentence } from "utils/SliceSentence";
const CourseDashboard = () => {
  const { data: allStudentData } = useSWRAPI("admin-dashboard/all-student");
  const { data: lastAddedStudentData } = useSWRAPI(
    "admin-dashboard/previous-month-student"
  );
  const { selectedLanguage } = useAppContext();
  const { data: studentData } = useSWRAPI(
    "admin-dashboard/student-course-wise"
  );
  const CourseData = studentData?.data?.data?.data;
  return (
    <AdminPanelLayout title="Student Dashboard | StreamStudent">
      <article className="flex flex-col gap-5">
        <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
          <aside className="w-full lg:w-3/4 bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] py-3 ">
            <AdminStudentGraph type="bar" />
          </aside>
          <aside className="w-full lg:w-1/4 flex flex-col items-center justify-center gap-5">
            <Link href="/admin/students/student-details">
              <div className="w-full flex flex-col items-center justify-center gap-2 bg-white p-3 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-hidden">
                <img
                  className="w-full h-56 object-cover rounded-t-xl"
                  src="/Image/student_7.jpg"
                  alt="student_image"
                />
                <div className="text-center">
                  <p className="text-2xl">
                    {
                      adminStudentDashboardContent(selectedLanguage)
                        .TotalStudents
                    }
                  </p>
                  <p className="text-3xl font-bold">
                    {allStudentData?.data?.allStudent?.totalCount || 0}
                  </p>
                </div>
              </div>
            </Link>
            <div className="w-full flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
              <p className="text-2xl text-center">
                {
                  adminStudentDashboardContent(selectedLanguage)
                    .LastMonthAddedStudents
                }
              </p>
              <p className="text-3xl font-bold">
                {lastAddedStudentData?.data?.data?.totalCount || 0}
              </p>
            </div>
          </aside>
        </section>
        <section className="bg-white rounded-xl overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="flex items-center justify-center text-3xl m-5 font-bold">
            {adminStudentDashboardContent(selectedLanguage).Coursewisestudent}
          </div>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CourseData?.slice(0, 16)?.map((item: COURSE_TYPE) => (
              <section
                key={item._id}
                className="flex items-center gap-2 bg-white rounded-xl overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
              >
                <div className="">
                  <img
                    className="w-28 h-28 object-cover"
                    src={item?.thumbnailUrl || COURSEDEFAULT.src}
                    alt="category_image"
                  />
                </div>
                <div className="p-3">
                  <p className="lg:text-lg lg:w-40 font-bold text-primary">
                    {sliceSentence(item?.courseName, 3)}
                  </p>
                  <p className="">
                    {item?.totalStudents}{" "}
                    {adminStudentDashboardContent(selectedLanguage).students}
                  </p>
                </div>
              </section>
            ))}
          </section>
        </section>
      </article>
    </AdminPanelLayout>
  );
};

export default CourseDashboard;
