/* eslint-disable @next/next/no-img-element */
import { COURSEDEFAULT, PROFILE } from "assets/images";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { individualTutorContent, tutorIdContent } from "locale";
import { useRouter } from "next/router";
import { currencyFormatter } from "utils";

type LectureDataType = {
  _id: string;
  subject: string;
  designation: string;
  description: string;
  rating?: number;
  numberOfLectures: string;
  fullName: string;
  thumbnailUrl?: string;
  courseName: string;
  title: string;
  courseCategory: string;
  salePrice?: number;
  mrpPrice?: number;
  Tutor: { name?: string };
};

const TutorDetails = () => {
  const { selectedLanguage } = useAppContext();
  const { tutorId } = useRouter().query;
  const { data, isValidating, mutate } = useSWRAPI(
    `admin-dashboard/pending-tutor-data?tutorId=${tutorId}`
  );

  const tutorData = data?.data?.data?.data[0];

  // mutate();
  return (
    <AdminPanelLayout title="Tutor Profile | StreamStudent">
      <section className="main-container flex flex-col gap-8">
        <aside className="flex flex-col-reverse lg:flex-row items-center justify-between gap-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl p-4 lg:p-6 bg-white">
          <div className="w-full md:w-[65%] flex flex-col gap-4 tracking-wide">
            <h1 className="flex items-center font-semibold text-lg md:text-xl">
              {individualTutorContent(selectedLanguage).Name}:
              <span className="text-lg font-medium ml-4">
                {tutorData?.name ||
                  individualTutorContent(selectedLanguage).Namenotgiven}
              </span>
            </h1>
            <h1 className="flex items-center font-semibold text-lg md:text-xl">
              {individualTutorContent(selectedLanguage).Country}:
              <span className="text-lg font-medium ml-4">
                {tutorData?.country?.label ||
                  individualTutorContent(selectedLanguage).Countrynotgiven}
              </span>
            </h1>
            <h1 className="flex items-center font-semibold text-lg md:text-xl">
              {individualTutorContent(selectedLanguage).Designation}:
              <span className="text-lg font-medium ml-4">
                {tutorData?.designation ||
                  individualTutorContent(selectedLanguage).Designationnotgiven}
              </span>
            </h1>
            <h1 className="flex items-center font-semibold text-lg md:text-xl">
              {individualTutorContent(selectedLanguage).About}:
              <span className="text-lg font-medium ml-4">
                {tutorData?.about ||
                  individualTutorContent(selectedLanguage).Aboutnotgiven}
              </span>
            </h1>
            <h1 className="flex items-center font-semibold text-lg md:text-xl">
              {individualTutorContent(selectedLanguage).Expertise}
              <span className="text-lg font-medium ml-4">
                {tutorData?.expertiseInSubject ||
                  individualTutorContent(selectedLanguage).Expertisenotgiven}
              </span>
            </h1>
            <h1 className="flex items-center font-semibold text-lg md:text-xl">
              {individualTutorContent(selectedLanguage).YearofExperience}:
              <span className="text-lg font-medium ml-4">
                {tutorData?.yearOfExperience ||
                  individualTutorContent(selectedLanguage)
                    .YearofExperiencenotgiven}
              </span>
            </h1>
            <p className="font-semibold text-lg md:text-xl">
              {individualTutorContent(selectedLanguage).email}:
              <span className="text-lg font-medium ml-4">
                {tutorData?.email ||
                  individualTutorContent(selectedLanguage).emailnotgiven}
              </span>
            </p>
            <p className="font-semibold text-lg md:text-xl">
              {individualTutorContent(selectedLanguage).MobileNumber}:
              <span className="text-lg font-medium ml-4">
                {tutorData?.phoneNumber ||
                  individualTutorContent(selectedLanguage).MobileNumbernotgiven}
              </span>
            </p>
            {/* <p className=" font-semibold text-lg md:text-xl">
              {adminTutorIDContent(selectedLanguage).TechnicalSkills}
            </p> */}
            {/* <p className="flex flex-wrap gap-2">
              <span className="capitalize px-3 py-0.5 bg-primary/5 border border-primary text-primary rounded-3xl">
                {tutorData?.skills[0] || "Skills are not updated yet"}
              </span>
            </p> */}
          </div>
          <div className="w-full flex justify-end md:w-[35%]">
            <div className="flex flex-col items-center gap-4">
              <img
                src={tutorData?.profileUrl || PROFILE.src}
                alt="teacher-profile"
                className="w-72 h-72"
              />
            </div>
          </div>
        </aside>
        <aside className=" shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl p-4 lg:p-6 bg-white">
          <h1 className="title-styling text-center text-primary pb-8">
            {tutorIdContent(selectedLanguage).Courses}
          </h1>
          {data?.data?.data?.data[0]?.courseData?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-8 gap-y-8">
              {data?.data?.data?.data[0]?.courseData?.map(
                (item: LectureDataType) => (
                  <PlaylistCard item={item} key={item._id} />
                )
              )}
            </div>
          ) : (
            <p className="flex justify-center items-center font-semibold text-2xl">
              {individualTutorContent(selectedLanguage).NoCourse}
            </p>
          )}
        </aside>
      </section>
    </AdminPanelLayout>
  );
};

const PlaylistCard = ({ item }: { item: LectureDataType }) => {
  return (
    <section key={item._id}>
      <aside className="flex items-center  gap-4 rounded-2xl px-4 py-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <img
          className="w-32 h-32  object-cover shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md"
          src={item?.thumbnailUrl || COURSEDEFAULT.src}
          alt="course-thumbnail"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-semibold text-secondary uppercase break-words">
            {item?.courseName || "Not Given"}
          </h1>
          {/* <h3 className="capitalize text-lg font-semibold">
              {item?.Tutor?.name || "Not Given"}
            </h3> */}
          <p className="text-sm break-words">
            {String(item?.description || "Not Given").slice(0, 10)}
            {String(item?.description || "Not Given")?.length > 10
              ? "..."
              : null}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              {currencyFormatter(item?.salePrice as number)}
            </span>
            <span className="line-through text-gray-500 text-sm">
              {currencyFormatter(item?.mrpPrice as number)}
            </span>
          </p>
          {/* <Link href={`/courses/${item?._id}`} className="flex">
            <button className="btn-primary px-3 py-1.5">
              {lectureContent(selectedLanguage).ViewCourse}
            </button>
          </Link> */}
        </div>
      </aside>
    </section>
  );
};
export default TutorDetails;
