import { AdminPanelLayout } from "layouts";
import { PanelReviewCard } from "../tutors/[tutorId]/[topicDetails]";
import { useRouter } from "next/router";
import { useSWRAPI } from "hooks";
import { REVIEW_TYPE } from "types";
import { REVIEW } from "assets/animations";
import Lottie from "react-lottie";
import { useAppContext } from "contexts";
import { dataContent } from "locale";

const AllReviews = () => {
  const { Id } = useRouter().query;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: REVIEW,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { data, mutate } = useSWRAPI(`student/all-reviews/?courseId=${Id}`);
  const { selectedLanguage } = useAppContext();

  return (
    <AdminPanelLayout title="Admin | All Reviews | StreamStudent">
      <section>
        <h2 className="title-styling text-center">
          {dataContent(selectedLanguage).AllReview}
        </h2>
        {data?.data?.data?.data?.length ? (
          <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {data?.data?.data?.data?.map((item: REVIEW_TYPE) => (
              <PanelReviewCard key={item?._id} data={item} mutate={mutate} />
            ))}
          </aside>
        ) : (
          <Lottie options={defaultOptions} height={300} width={350} />
        )}
      </section>
    </AdminPanelLayout>
  );
};

export default AllReviews;
