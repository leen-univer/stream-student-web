import Accordion from "components/cards/QuizCollapseCard";
import ResponseDrawer from "components/cards/ResponseDrawer";
import TakersDrawer from "components/cards/TrackerDrawer";
import { QuizForm } from "components/forms/adminForms";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout, TutorPanelLayout } from "layouts";
import { adminManageCategoryContent } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";

export const demoData = [
  {
    answer: "Sample Answer 1",
    question: "Sample Question 1?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    explainAnswer: "Explanation for Sample Answer 1.",
  },
  {
    answer: "Sample Answer 2",
    question: "Sample Question 2?",
    options: ["Option X", "Option Y", "Option Z"],
    explainAnswer: "Explanation for Sample Answer 2.",
  },
  // Add more data as needed
];

const AdminQuizId = () => {
  const router = useRouter();
  const [openResponseDrawer, setOpenResponseDrawer] = useState(false);
  const [openTakerDrawer, setOpenTakerDrawer] = useState(false);
  const { selectedLanguage } = useAppContext();
  const { data, mutate, isValidating } = useSWRAPI(
    `quiz/get-all-question/${router?.query?.quizzeId}`
  );
  return (
    <AdminPanelLayout title="Manage Quiz | StreamStudent">
      <section className="w-full h-full space-y-10">
        <div className="cursor-pointer flex md:justify-end flex-col md:flex-row gap-6 px-2">
          <QuizForm mutate={mutate} />
          <ResponseDrawer
            open={openResponseDrawer}
            setOpenResponseDrawer={() => setOpenResponseDrawer}
            onClose={() => setOpenResponseDrawer(false)}
          />
          <TakersDrawer
            open={openTakerDrawer}
            setOpenTakerDrawer={() => setOpenTakerDrawer}
            onClose={() => setOpenTakerDrawer(false)}
          />
        </div>
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-primary mb-2 text-center my-5">
            {adminManageCategoryContent(selectedLanguage).queAndAns}
          </h2>
          <div className="flex flex-col">
            {data?.data?.data?.data[0]?.data?.map(
              (ques: any, index: number) => (
                <Accordion
                  key={index}
                  idx={index + 1}
                  faq={ques}
                  mutate={mutate}
                />
              )
            )}
          </div>
        </div>
      </section>
    </AdminPanelLayout>
  );
};

export default AdminQuizId;
