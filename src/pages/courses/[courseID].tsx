import { FolderCopy } from "@mui/icons-material";
import { BundleCard } from "components/cards";
import {
  BuyBox,
  CourseBannerCard,
  DisplayProgressBox,
  FaqSection,
  FinalAssignmentCard,
  MyQuestions,
  PracticeExercise,
  ReviewCard,
  TopicCard,
  TutorInfo,
} from "components/courseContent";
import { ReviewDialog } from "components/forms";
import { useAppContext } from "contexts";
import { useAuth, useSWRAPI } from "hooks";
import { PublicLayout } from "layouts";
import { coursesIdContent, studentPanel } from "locale";
import { useRouter } from "next/router";
import { COURSE_ALL_DATA, REVIEW_TYPE, bundleDataType } from "types";

const IndividualCourse = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { selectedLanguage, changeLanguage } = useAppContext();

  const { data: courseDATA, mutate: courseMutate } = useSWRAPI(
    `student/complete-course-data?courseId=${router?.query?.courseID}`
  );
  const getAllSections = courseDATA?.data?.data?.data?.[0]?.Section;
  const getCourse = courseDATA?.data?.data?.data?.[0];

  const { data, mutate } = useSWRAPI(
    `student/all-reviews?courseId=${router?.query?.courseID}`
  );
  const { data: finalExamData, mutate: finalExamMutate } = useSWRAPI(
    `tutor/get-exam?courseId=${router?.query?.courseID}`
  );
  const { data: resultData, mutate: resultMutate } = useSWRAPI(
    `examAnswer/final-exam-student-data?courseId=${router?.query?.courseID}`
  );
  const getFinalResult = resultData?.data?.data?.[0];

  const { data: finalCreateData, mutate: finalCreateMutate } = useSWRAPI(
    `finalAnswer/final-assignment-data-get?courseId=${router?.query?.courseID}`
  );
  const getFinalExamData = finalCreateData?.data?.data?.[0];

  const { data: newData } = useSWRAPI("transaction/all-purchase-course");
  const isPurchased = newData?.data?.data?.data?.some(
    (item: any) => item?.courseId === router?.query?.courseID
  );
  const { data: bundleCardData, mutate: bundleMutate } = useSWRAPI(
    `bundles/get-bundle-course-wise?courseId=${router?.query?.courseID}`
  );

  const {
    data: progress,
    mutate: progressMutate,
    isValidating,
  } = useSWRAPI(
    `student/progress?courseId=${router?.query?.courseID}&userId=${user?._id}`
  );

  return (
    <PublicLayout title="All Courses | StreamStudent">
      <article className="relative main-container flex flex-col lg:flex-row items-start justify-between gap-12 py-8 lg:py-16">
        <section className="w-full lg:w-[70%]">
          <div className="my-4">
            <CourseBannerCard data={getCourse} />
          </div>
          <h1 className="title-styling pb-6">
            {coursesIdContent(selectedLanguage).CourseProgress}
          </h1>
          <DisplayProgressBox
            progress={progress}
            progressMutate={progressMutate}
            courseDATA={courseDATA}
            finalCreateData={finalCreateData}
            finalExamData={finalExamData}
            getFinalResult={getFinalResult}
          />
          <h1 className="title-styling pb-6">
            {coursesIdContent(selectedLanguage).CourseContent}
          </h1>
          {/* topic Card */}
          {getAllSections?.length === 0 ? (
            <div className="border rounded-sm p-2">
              <p className="text-center">No Content Available.</p>
            </div>
          ) : (
            <aside className="border rounded-sm p-2">
              {getAllSections?.map((item: COURSE_ALL_DATA) => (
                <TopicCard
                  key={item._id}
                  data={item}
                  isPurchased={isPurchased}
                  courseMutate={courseMutate}
                  progressMutate={progressMutate}
                />
              ))}
            </aside>
          )}

          {/* Practice Exercise */}
          <PracticeExercise />
          {/* Final Assignment */}
          <aside>
            {finalCreateData?.data?.data?.[0] &&
              finalExamData?.data?.data &&
              finalExamData?.data?.data?.examData?.length > 0 && (
                <aside className="my-5">
                  <FinalAssignmentCard
                    data={finalExamData}
                    getFinalResult={getFinalResult}
                    resultMutate={resultMutate}
                    getFinalExamData={getFinalExamData}
                    isPurchased={isPurchased}
                  />
                </aside>
              )}
          </aside>
          {/* Review Part  */}
          <aside className="pt-6">
            <div className="text-xl md:text-2xl font-bold pb-6 flex justify-between items-center">
              <div>
                <ReviewDialog mutate={mutate} isPurchased={isPurchased} />
              </div>
            </div>
            {data?.data?.data?.data?.length == 0 ? (
              <p className="text-lg font-medium">
                {studentPanel(selectedLanguage).Noreviewyet}
              </p>
            ) : (
              <div
                className={`${
                  data?.data?.data?.data?.length > 3
                    ? "max-h-[350px] overflow-y-scroll shadow-[inset_0px_-10px_30px_#46464620]"
                    : ""
                } grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6`}
              >
                {data?.data?.data?.data
                  // ?.slice(0, 3)
                  ?.map((item: REVIEW_TYPE) => (
                    <>
                      <ReviewCard key={item?._id} data={item} />
                    </>
                  ))}
              </div>
            )}
          </aside>
          {/* Display Frequently buyed together */}
          {bundleCardData?.data?.data?.data?.length > 0 ? (
            <aside className="pt-6">
              <h1 className="text-xl md:text-2xl font-bold pb-6 flex justify-between items-center">
                {studentPanel(selectedLanguage).FrequentlyBroughtTogether}
              </h1>
              <div
                className={`${
                  bundleCardData?.data?.data?.data?.length > 3
                    ? "max-h-[570px] overflow-y-scroll shadow-[inset_0px_-10px_30px_#46464620]"
                    : ""
                } grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6`}
              >
                {bundleCardData?.data?.data?.data?.map(
                  (item: bundleDataType) => (
                    <BundleCard
                      key={item?._id}
                      bundle={item}
                      mutate={bundleMutate}
                    />
                  )
                )}
              </div>
            </aside>
          ) : (
            ""
          )}
        </section>

        {/* right side purchase section */}
        <section className="lg:w-[30%] w-full h-fit sticky top-[120px]">
          {isPurchased ? (
            <section className="w-full py-4 space-y-5 h-fit flex flex-col gap-6 z-[50] bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-3xl p-6 relative">
              <div className="flex flex-col justify-center items-center gap-2">
                <span className="font-semibold text-base capitalize">
                  {coursesIdContent(selectedLanguage).AlreadyPurchased}
                </span>
                <button
                  onClick={() => router.push(`/my-account/my-courses`)}
                  className="btn-primary cursor-pointer h-11 w-64 rounded-xl flex flex-row gap-2 items-center justify-center border border-green-600/10 !bg-green-600/10 hover:border-green-600/50 hover:!bg-green-600/25"
                >
                  <FolderCopy className="text-green-600" />
                  <span className="lg:font-semibold font-medium text-xl text-green-600">
                    {coursesIdContent(selectedLanguage).ViewMyCourses}
                  </span>
                </button>
              </div>
            </section>
          ) : (
            <BuyBox courseMutate={courseMutate} getCourse={getCourse} />
          )}
          <TutorInfo tutorData={courseDATA?.data?.data?.data?.[0]?.Tutor} />
          <MyQuestions isPurchased={isPurchased} />
          <FaqSection />
        </section>
      </article>
    </PublicLayout>
  );
};
export default IndividualCourse;
