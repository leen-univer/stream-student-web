/* eslint-disable @next/next/no-img-element */
import { COURSEDEFAULT, PROFILE } from "assets/images";
import { useAppContext } from "contexts";
import { useAuth, useSWRAPI } from "hooks";
import { PublicLayout } from "layouts";
import { individualTutorContent, lectureContent, tutorIdContent } from "locale";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
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

const IndividualTeacher = () => {
  const { selectedLanguage, changeLanguage } = useAppContext();
  const { user } = useAuth();
  const router = useRouter();

  const { data } = useSWRAPI(
    `contact/all-course?tutorId=${router?.query?.tutorID}`
  );
  // const showLogin = (id: any) => {
  //   if (user?._id) {
  //     router?.push(`courses/${id}`);
  //   } else {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Access Denied",
  //       text: "You must be logged in to view the course.",
  //     });
  //   }
  // };
  return (
    <PublicLayout
      title="Teacher Name | StreamStudent"
      footerBgColor="bg-primary/20"
    >
      <article className="bg-primary/20 py-8 lg:py-16">
        <section className="main-container flex flex-col gap-8">
          <aside className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl p-4 lg:p-6 bg-white">
            <div className="w-full md:w-[65%] flex flex-col gap-4 tracking-wide">
              <h1 className="flex items-center font-semibold text-lg md:text-xl">
                {individualTutorContent(selectedLanguage).Name}:
                <span className="text-lg font-medium ml-4">
                  {data?.data?.data?.data[0]?.name ||
                    individualTutorContent(selectedLanguage).Namenotgiven}
                </span>
              </h1>
              <h1 className="flex items-center font-semibold text-lg md:text-xl">
                {individualTutorContent(selectedLanguage).Country}:
                <span className="text-lg font-medium ml-4">
                  {data?.data?.data?.data[0]?.country?.label ||
                    individualTutorContent(selectedLanguage).Countrynotgiven}
                </span>
              </h1>
              <h1 className="flex items-center font-semibold text-lg md:text-xl">
                {individualTutorContent(selectedLanguage).Designation}:
                <span className="text-lg font-medium ml-4">
                  {data?.data?.data?.data[0]?.designation ||
                    individualTutorContent(selectedLanguage)
                      .Designationnotgiven}
                </span>
              </h1>
              <h1 className="flex items-center font-semibold text-lg md:text-xl">
                {individualTutorContent(selectedLanguage).About}:
                <span className="text-lg font-medium ml-4">
                  {data?.data?.data?.data[0]?.about ||
                    individualTutorContent(selectedLanguage).Aboutnotgiven}
                </span>
              </h1>
              <h1 className="flex items-center font-semibold text-lg md:text-xl">
                {individualTutorContent(selectedLanguage).Expertise}:
                <span className="text-lg font-medium ml-4">
                  {data?.data?.data?.data[0]?.expertiseInSubject ||
                    individualTutorContent(selectedLanguage).Expertisenotgiven}
                </span>
              </h1>
              <h1 className="flex items-center font-semibold text-lg md:text-xl">
                {individualTutorContent(selectedLanguage).YearofExperience}:
                <span className="text-lg font-medium ml-4">
                  {data?.data?.data?.data[0]?.yearOfExperience ||
                    individualTutorContent(selectedLanguage)
                      .YearofExperiencenotgiven}
                </span>
              </h1>
              <h1 className="flex items-center font-semibold text-lg md:text-xl">
                {individualTutorContent(selectedLanguage).email}:
                <span className="text-lg font-medium ml-4">
                  {data?.data?.data?.data[0]?.email ||
                    individualTutorContent(selectedLanguage).emailnotgiven}
                </span>
              </h1>
            </div>
            <div className="w-full flex md:justify-end justify-center  md:w-[35%]">
              <div className="flex flex-col items-center gap-4 ">
                <img
                  src={data?.data?.data?.data[0]?.profileUrl || PROFILE.src}
                  alt="teacher-profile"
                  className="w-80 h-80 rounded-2xl"
                />
              </div>
            </div>
          </aside>
          <aside className=" shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl p-4 lg:p-6 bg-white">
            <h1 className="title-styling text-center text-primary pb-8">
              {tutorIdContent(selectedLanguage).Courses}
            </h1>
            {data?.data?.data?.data[0]?.courseData?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-8">
                {data?.data?.data?.data[0]?.courseData?.map(
                  (item: LectureDataType) => (
                    <PlaylistCard
                      // showLogin={showLogin}
                      item={item}
                      key={item._id}
                    />
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
      </article>
    </PublicLayout>
  );
};
const PlaylistCard = ({
  item,
}: // showLogin,
{
  item: LectureDataType;
  // showLogin: any;
}) => {
  const { selectedLanguage } = useAppContext();
  const router = useRouter();
  return (
    <section key={item._id}>
      <aside className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <img
          className="w-32 h-32  object-cover shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md"
          src={item?.thumbnailUrl || COURSEDEFAULT.src}
          alt="course-thumbnail"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-bold text-secondary uppercase">
            {item?.courseName || "Not Given"}
          </h1>
          {/* <h3 className="capitalize text-lg font-semibold">
              {item?.Tutor?.name || "Not Given"}
            </h3> */}
          <p className="text-sm">
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
          <Link href={`/courses/${item?._id}`}>
            <button
              // onClick={() => router.push(`courses/${item?._id}`)}
              className="btn-primary px-3 py-1.5"
            >
              {lectureContent(selectedLanguage).ViewCourse}
            </button>
          </Link>
        </div>
      </aside>
    </section>
  );
};

export default IndividualTeacher;
