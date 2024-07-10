import { LECTURE } from "assets/animations";
import { COURSEDEFAULT } from "assets/images";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { TutorPanelLayout } from "layouts";
import { dataContent, onlineClassContent, tutorLiveClassPage } from "locale";
import Lottie from "react-lottie";
import { ScheduleDataType } from "types/schedule";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LECTURE,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const PastSchedules = () => {
  const { selectedLanguage } = useAppContext();
  const { data } = useSWRAPI("class/get-all-classes");

  return (
    <TutorPanelLayout title="schedule | StreamStudent">
      <article>
        <h1 className="title-styling text-center text-primary pb-8">
          {tutorLiveClassPage(selectedLanguage).pastLiveClasses}
        </h1>
        {data?.data?.data?.data?.length ? (
          <section className="w-full grid lg:grid-cols-2 2xl:grid-cols-3 md:grid-cols-2 grid-col-1 gap-8">
            {data?.data?.data?.data.map((item: ScheduleDataType) => (
              <PastScheduleCard item={item} key={item._id} />
            ))}
          </section>
        ) : (
          <Lottie options={defaultOptions} height={500} width={550} />
        )}
      </article>
    </TutorPanelLayout>
  );
};

const PastScheduleCard = ({ item }: { item: ScheduleDataType }) => {
  const { selectedLanguage } = useAppContext();
  return (
    <section className="flex justify-between items-center p-4 bg-white border-t-4 border-primary rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <aside className="flex flex-row gap-2 text-xl justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">
            {item?.Classes?.courseName ||
              dataContent(selectedLanguage).Notgiven}
          </h1>
          <h3 className="text-base font-semibold">
            {item?.classTitle || dataContent(selectedLanguage).Notgiven}
          </h3>
          <p className="flex items-center text-sm font-semibold gap-3">
            <span>{tutorLiveClassPage(selectedLanguage).createdOn} : </span>
            <span>
              {dayjs(
                item?.createdAt || dataContent(selectedLanguage).Notgiven
              ).format("MMM D, YYYY h:mm A")}
            </span>
          </p>
          <p className="flex items-center text-sm font-semibold gap-3">
            <span>{tutorLiveClassPage(selectedLanguage).startedOn} : </span>
            <span>
              {dayjs(
                item?.timeOfEnter || dataContent(selectedLanguage).Notgiven
              ).format("MMM D, YYYY h:mm A")}
            </span>
          </p>
          <p className="flex items-center text-sm font-semibold gap-3">
            <span>{tutorLiveClassPage(selectedLanguage).endedOn} : </span>
            <span>
              {dayjs(
                item?.timeOfExit || dataContent(selectedLanguage).Notgiven
              ).format("MMM D, YYYY h:mm A")}
            </span>
          </p>
        </div>
        <div className="overflow-hidden flex justify-center items-center bg-transparent rounded-r-xl flex-col">
          <div className="">
            {item?.price === 0 ? (
              <div className="bg-green-400 font-semibold text-white  rounded-lg  mb-2 px-3 py-1">
                <span className="text-xl">
                  {onlineClassContent(selectedLanguage).free}
                </span>
              </div>
            ) : (
              <div className="bg-primary/60 font-semibold text-white  rounded-lg  mb-2 px-3 py-1">
                {onlineClassContent(selectedLanguage).Price}
                <span className="text-xl">$</span> {item?.price}
              </div>
            )}
          </div>
          <img
            className=" object-cover object-center lg:w-32 md:w-24 w-16 md:block lg:block"
            src={item?.Classes?.thumbnailUrl || COURSEDEFAULT.src}
            alt=""
          />
        </div>
      </aside>
    </section>
  );
};

export default PastSchedules;
