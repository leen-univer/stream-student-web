/* eslint-disable @next/next/no-img-element */
import { PROFILE } from "assets/images";
import { useAppContext } from "contexts";
import { coursesIdContent } from "locale";
import { tutorInfoType } from "types";

const TutorInfo = ({ tutorData }: { tutorData: tutorInfoType }) => {
  const { selectedLanguage, changeLanguage } = useAppContext();
  return (
    <article className="py-2 space-y-5">
      <section className="w-full h-fit flex flex-col gap-6 bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-3xl p-6">
        <h1 className="font-semibold text-3xl text-gray-400">
          {coursesIdContent(selectedLanguage).CourseAuthor}
        </h1>
        <div className="flex flex-row gap-4 items-center justify-center">
          <img
            src={tutorData?.profileUrl || PROFILE.src}
            alt="course-image"
            className="w-14 h-14 rounded-3xl md:block hidden"
          />
          <div>
            <h1 className="flex items-center font-medium text-lg">
              {coursesIdContent(selectedLanguage).Name}
              <span className="text-lg font-semibold ml-4">
                {tutorData?.name || "Name not given"}
              </span>
            </h1>
            <h1 className="flex items-center font-medium text-lg">
              {coursesIdContent(selectedLanguage).Experience}
              <span className="text-lg font-semibold ml-4">
                {tutorData?.yearOfExperience || "Experience not given"}
              </span>
            </h1>
            <h1 className="flex items-center font-medium text-lg">
              {coursesIdContent(selectedLanguage).Email}
              <span className="text-lg font-semibold ml-4">
                {tutorData?.email || "Email not given"}
              </span>
            </h1>
          </div>
        </div>
      </section>
    </article>
  );
};

export default TutorInfo;
