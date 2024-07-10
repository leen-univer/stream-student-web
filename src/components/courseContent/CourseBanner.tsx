import { useSWRAPI } from "hooks";
import { useRouter } from "next/router";

const CourseBanner = ({ data }: any) => {
  const router = useRouter();

  const { data: introData } = useSWRAPI(
    `intro/get-introVideo?courseId=${router?.query?.courseID}`
  );
  return (
    <article className="py-2 space-y-5">
      <aside className="w-full space-y-5">
        <h1 className="font-semibold lg:text-6xl md:text-4xl text-3xl break-words">
          {data?.courseName}
        </h1>
        <section className="flex flex-wrap items-center text-base tracking-wide lg:gap-5 gap-2 font-medium">
          <span className="capitalize px-3 py-0.5 bg-primary/5 border border-primary text-primary rounded-3xl">
            {data?.Category?.name}
          </span>
        </section>
        <section className="text-base gap-5 font-medium space-y-7">
          <aside className="flex md:flex-row flex-col justify-between gap-8">
            <div className="w-full">
              <img
                src={
                  data?.thumbnailUrl ? data?.thumbnailUrl : "/banner_course.jpg"
                }
                alt="course-image"
                className="w-full h-72 rounded-3xl object-cover object-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              />
            </div>
            {introData?.data?.data?.introMaterialUrl && (
              <div className="w-full">
                <iframe
                  className="w-full h-72 object-cover shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl"
                  title="Intro Video"
                  width="100%"
                  height="315"
                  src={introData?.data?.data?.introMaterialUrl}
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </aside>
          <p className="break-words text-base px-2">{data?.description}</p>
        </section>
      </aside>
    </article>
  );
};

export default CourseBanner;
