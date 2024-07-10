import { CourseCard } from "components/cards";
import { useAppContext } from "contexts";
import { AccountLayout, PublicLayout } from "layouts";
import { myCoursesContent } from "locale";
import Link from "next/link";

import { COURSE } from "assets/animations";
import { useSWRAPI } from "hooks";
import Lottie from "react-lottie";

const MyCourses = () => {
  const { selectedLanguage } = useAppContext();
  const { data } = useSWRAPI("transaction/all-purchase-course");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: COURSE,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <PublicLayout
      title="My Courses | StreamStudent"
      footerBgColor="bg-primary/20"
    >
      <AccountLayout>
        <section className="w-full max-h-[40rem] min-h-[31rem] overflow-x-scroll">
          <h1 className="title-styling text-center pb-6 lg:pb-12">
            {myCoursesContent(selectedLanguage).My}{" "}
            <span className="text-primary">
              {myCoursesContent(selectedLanguage).Courses}
            </span>
          </h1>
          {data?.data?.data?.data?.length ? (
            <aside className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4">
              {data?.data?.data?.data.map((item: any) => (
                <Link href={`/courses/${item?.courseId}`} key={item._id}>
                  <CourseCard item={item} />
                </Link>
              ))}
            </aside>
          ) : (
            <Lottie options={defaultOptions} height={400} width={400} />
          )}
        </section>
      </AccountLayout>
    </PublicLayout>
  );
};

export default MyCourses;
