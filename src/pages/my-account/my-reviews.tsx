import { useAppContext } from "contexts";
import { AccountLayout, PublicLayout } from "layouts";
import { deleteContent, myReviewsContent } from "locale";

import {
  DeleteOutline,
  EditOutlined,
  Star,
  StarBorder,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { REVIEW } from "assets/animations";
import { COURSEDEFAULT } from "assets/images";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { Fragment } from "react";
import Lottie from "react-lottie";
import Swal from "sweetalert2";
import { REVIEW_TYPE } from "types";
import UpdateReviewDialog from "components/forms/student/UpdateReviewDialog";

const MyReviews = () => {
  const { selectedLanguage } = useAppContext();
  const { data: myreviews, mutate } = useSWRAPI("student/student-all-review");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: REVIEW,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <PublicLayout
      title="My Reviews | StreamStudent"
      footerBgColor="bg-primary/20"
    >
      <AccountLayout>
        <section className="w-full max-h-[40rem] min-h-[31rem] overflow-y-scroll">
          <h1 className="title-styling text-center pb-6 lg:pb-12">
            {myReviewsContent(selectedLanguage).My}{" "}
            <span className="text-primary">
              {myReviewsContent(selectedLanguage).Reviews}
            </span>
          </h1>
          {myreviews?.data?.data?.data?.length ? (
            <aside className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {myreviews?.data?.data?.data?.map((item: REVIEW_TYPE) => (
                <PanelReviewCard key={item?._id} data={item} mutate={mutate} />
              ))}
            </aside>
          ) : (
            <Lottie options={defaultOptions} height={400} width={350} />
          )}
        </section>
      </AccountLayout>
    </PublicLayout>
  );
};

// const ReviewCard = ({ data }: { data: REVIEW_TYPE }) => {
export const PanelReviewCard = ({
  data,
  mutate,
}: {
  data: REVIEW_TYPE;
  mutate: () => void;
}) => {
  const { mutation } = useMutation();
  const { selectedLanguage } = useAppContext();

  const handleRemoveReview = async () => {
    try {
      Swal.fire({
        title: deleteContent(selectedLanguage).Warning,
        text: deleteContent(selectedLanguage).Areyousureyouwanttoremovethis,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: deleteContent(selectedLanguage).YesRemoveit,
        cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await mutation(
            `student/delete-review?reviewId=${data?._id}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );
          mutate();
          return;
        }
      });
    } catch (error) {}
  };
  return (
    <article className="group relative flex flex-col gap-4 py-4 border-y">
      <div className=" flex items-center gap-4">
        <DeleteOutline
          onClick={handleRemoveReview}
          fontSize="medium"
          className="absolute top-4 right-4 text-red-500 hidden group-hover:block cursor-pointer"
        />
        <UpdateReviewDialog data={data} mutate={mutate} />
        <div className="flex flex-col items-center justify-center gap-4">
          <div>
            <img
              src={data?.courseData?.thumbnailUrl || COURSEDEFAULT.src}
              // style={{ width: "10rem", height: "10rem" }}
              className="w-[10rem] h-[10rem] object-cover object-center bg-primary/5 p-2 rounded-lg  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-2">
              <h1 className="font-medium text-lg">
                {myReviewsContent(selectedLanguage).courseName}:
              </h1>
              <span className="font-medium text-lg">
                {data?.courseData?.courseName || "Not Given"}
              </span>
            </div>
            <span className="flex flex-col gap-2">
              <div>
                {[...Array(5)].map((_, index) => (
                  <Fragment key={index}>
                    {data?.rating && data?.rating >= index + 1 ? (
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
                {dayjs(data?.createdAt || "Not Given").format(
                  "MMM D, YYYY h:mm A"
                )}
              </div>
            </span>
            <Tooltip title={`${data?.message || "Not Given"}`}>
              <p className="tracking-wide text-lg">
                {String(data?.message).slice(0, 60)}
                {String(data?.message)?.length > 60 ? "..." : null}
              </p>
            </Tooltip>
            {/* <p className="tracking-wide text-lg">
              {data?.message || "Not Given"}
            </p> */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyReviews;
