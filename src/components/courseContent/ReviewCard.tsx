import { Star, StarBorder } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { PROFILE } from "assets/images";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { studentPanel } from "locale";
import { Fragment } from "react";
import { REVIEW_TYPE } from "types";
import { sliceSentence } from "utils/SliceSentence";

const ReviewCard = ({ data }: { data: REVIEW_TYPE }) => {
  const { selectedLanguage } = useAppContext();

  return (
    <article className="flex flex-col gap-4 py-4 border-y h-40  rounded-3xl">
      <div className="flex items-center gap-4">
        <img
          src={data?.Student?.profileUrl || PROFILE.src}
          style={{ width: "3rem", height: "3rem" }}
        />
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{data?.Student?.name}</span>
          <span className="flex flex-col gap-2">
            <div>
              {[...Array(5)].map((_, index) => (
                <Fragment key={index}>
                  {data?.ReviewCourses?.rating &&
                  data?.ReviewCourses?.rating >= index + 1 ? (
                    <Star
                      fontSize="inherit"
                      color="inherit"
                      className="!text-yellow-400"
                    />
                  ) : (
                    <StarBorder
                      fontSize="inherit"
                      color="inherit"
                      className="!text-yellow-400"
                    />
                  )}
                </Fragment>
              ))}
            </div>
            <div>
              {data?.ReviewCourses?.createdAt ? (
                dayjs(data?.ReviewCourses?.createdAt).format(
                  "MMM D, YYYY h:mm A"
                )
              ) : (
                <> {studentPanel(selectedLanguage).Noreviewyet}</>
              )}
            </div>
          </span>
          {data?.ReviewCourses?.message && (
            <Tooltip title={`${data?.ReviewCourses?.message || "Not Given"}`}>
              <p className="tracking-wide text-lg">
                {/* {String(data?.ReviewCourses?.message).slice(0, 60)}
                {String(data?.ReviewCourses?.message)?.length > 60
                  ? "..."
                  : null} */}
                {sliceSentence(data?.ReviewCourses?.message, 10)}
              </p>
            </Tooltip>
          )}
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;
