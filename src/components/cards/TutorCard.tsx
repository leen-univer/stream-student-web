/* eslint-disable @next/next/no-img-element */
import { PROFILE } from "assets/images";
import { useAppContext } from "contexts";
import { studentPanel } from "locale";
import { useRouter } from "next/router";
import { TutorDataType } from "types/tutorCard";
const TutorCard = ({ item }: { item: TutorDataType }) => {
  const router = useRouter();
  const { selectedLanguage } = useAppContext();
  const goToAlltutor = () => {
    router.push(`tutors/${item._id}`);
  };
  return (
    <article
      onClick={goToAlltutor}
      className="bg-white cursor-pointer hover:scale-105 common-transition  h-48 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md overflow-hidden"
    >
      <section className="">
        <aside className="h-14 relative grid place-items-center border-b border-slate-400">
          <div className="w-full absolute top-6 p-4">
            <span className="-mt-4 flex justify-between">
              <img
                className="w-16 h-16 rounded-full object-cover border-4 border-white"
                src={item?.profileUrl || PROFILE.src}
                alt="profile-image"
              />
              <p className="flex items-center mb-7 font-semibold">
                {item?.name || studentPanel(selectedLanguage).notgiven}
              </p>
            </span>
            <div className="flex flex-col items-center py-2">
              <h1 className="text-base font-medium">
                {studentPanel(selectedLanguage).Course}:{" "}
                {item?.expertiseInSubject ||
                  studentPanel(selectedLanguage).notgiven}
              </h1>
              <h1 className="text-base font-medium">
                {studentPanel(selectedLanguage).Experience}:{" "}
                {item?.yearOfExperience || "0"}{" "}
                {studentPanel(selectedLanguage).years}
              </h1>
              <h1 className="text-base font-medium">
                {studentPanel(selectedLanguage).Country}:{" "}
                {item?.country?.label ||
                  studentPanel(selectedLanguage).notgiven}
              </h1>
            </div>
          </div>
        </aside>
      </section>
    </article>
  );
};
export default TutorCard;
