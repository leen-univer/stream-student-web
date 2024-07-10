/* eslint-disable @next/next/no-img-element */
import { Event, Notifications, TipsAndUpdates } from "@mui/icons-material";
import { COURSEDEFAULT } from "assets/images";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { CourseDataType } from "types/courseCard";
import { currencyFormatter } from "utils";
import showError from "utils/error";

const CourseCard = ({ item }: { item: CourseDataType }) => {
  const { mutation } = useMutation();

  const handleBlinkApi = async (courseId?: string) => {
    try {
      const res = await mutation(
        `courseBlink/create-Course-blink?courseId=${courseId}`,
        {
          method: "POST",
        }
      );
    } catch (error) {
      showError(error);
    } finally {
      console.error();
    }
  };

  return (
    <article
      onClick={() => handleBlinkApi(item?.courseId)}
      className="relative h-[23rem] flex flex-col items-center justify-center text-center rounded-lg border border-primary/30 p-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:translate-y-1 common-transition"
    >
      {!item?.isBlinked && (
        <div className="absolute right-2 top-2 animate-fade-in-out">
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400/80 to-orange-500/80 text-white px-4 py-1 rounded-md">
            <TipsAndUpdates className="animate-pulse" />
            <p className="text-sm font-semibold">New Updates!</p>
          </div>
        </div>
      )}
      <img
        className="w-full h-[10rem] object-cover rounded-md"
        src={item?.BuyCourses?.thumbnailUrl || COURSEDEFAULT.src}
        alt="profile-image"
      />
      <div className="flex flex-col gap-1 items-start pt-4">
        <p className="text-lg font-semibold text-start leading-6">
          {item?.BuyCourses?.courseName}
        </p>
        <p className="font-semibold text-gray-600">
          {item?.BuyCourses?.completeData?.name}
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold">
            {currencyFormatter(item?.BuyCourses?.salePrice)}
          </span>
          <span className="line-through text-red-500 text-sm">
            {currencyFormatter(item?.BuyCourses?.mrpPrice)}
          </span>
        </p>
      </div>
    </article>
  );
};
export default CourseCard;
