/* eslint-disable @next/next/no-img-element */
import { useAppContext } from "contexts";
import { lectureContent, studentPanel } from "locale";

import { LOADER } from "assets/animations";
import { useAuth } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import Swal from "sweetalert2";
import { currencyFormatter } from "utils";
import { sliceSentence } from "utils/SliceSentence";

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

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LOADER,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LecturesSection = () => {
  const { data: LectureData, isValidating } = useSWRAPI("student/new-course");

  const { selectedLanguage } = useAppContext();
  if (isValidating) {
    return <Lottie options={defaultOptions} height={200} width={200} />;
  }
  return (
    <article className="main-container py-10 md:py-20">
      <h1 className="capitalize title-styling text-center lg:text-end pb-12">
        {lectureContent(selectedLanguage).NewCourses}
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-6 2xl:gap-8">
        {LectureData?.data?.data?.data
          ?.slice(0, 12)
          .map((item: LectureDataType) => (
            <PlaylistCard key={item._id} item={item} />
          ))}
      </section>
    </article>
  );
};
const PlaylistCard = ({ item }: { item: LectureDataType }) => {
  const { selectedLanguage } = useAppContext();
  const router = useRouter();
  const { user } = useAuth();

  const showLogin = (id: any) => {
    if (user?._id) {
      router?.push(`courses/${id}`);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "You must be logged in to view the course.",
      });
    }
  };

  return (
    <section className="relative group bg-white shadow-lg rounded-xl overflow-hidden border hover:border-teal-600/60 hover:scale-105 common-transition">
      <aside className="flex flex-col">
        <img
          className="w-full h-48  object-cover shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md"
          src={item?.thumbnailUrl || "/Image/Placeholder.png"}
          alt="course-thumbnail"
        />
        <div className="flex flex-col gap-1 p-5">
          <h1 className="text-lg font-semibold text-secondary uppercase">
            {item?.courseName || studentPanel(selectedLanguage).notgiven}
          </h1>
          <h3 className="capitalize text-lg font-semibold">
            {item?.Tutor?.name || studentPanel(selectedLanguage).notgiven}
          </h3>
          <p className="text-lg break-words font-medium line-clamp-1">
            {/* {sliceSentence(item?.description, 10)} */}
            {item?.description || studentPanel(selectedLanguage).notgiven}
          </p>
          <p className="flex items-center justify-between gap-2">
            <span className="font-semibold text-xl">
              {currencyFormatter(item?.salePrice as number)}
            </span>
            <span className="line-through text-red-500 text-xl">
              {currencyFormatter(item?.mrpPrice as number)}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center p-5">
          <button
            onClick={() => router?.push(`courses/${item?._id}`)}
            className="btn-primary px-3 py-1.5 w-full rounded-xl"
          >
            {lectureContent(selectedLanguage).ViewCourse}
          </button>
        </div>
      </aside>
    </section>
  );
};

export default LecturesSection;
