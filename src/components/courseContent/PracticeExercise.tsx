import {
  ExpandMore,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Collapse, Typography } from "@mui/material";
import { StudentPracticeQuestion } from "components/forms/student";
import UpdateStudentPracticeQuestion from "components/forms/student/UpdateStudentPracticeQuestion";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { adminManageCategoryContent, studentPanel } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";

const PracticeExercise = () => {
  const router = useRouter();
  const [openQuestion, setOpenQuestions] = useState(false);
  const { selectedLanguage } = useAppContext();
  // const { data: questions, mutate: stuQuesMutate } = useSWRAPI(
  //   `longQuestion/get-all-question?courseId=${router?.query?.courseID}`
  // );
  const { data: longData, mutate: stuQuesMutate } = useSWRAPI(
    `longAnswer/get-all-answer?courseId=${router?.query?.courseID}`
  );
  console.log(longData);
  return (
    <section className="w-full h-full space-y-10 my-10">
      <div className="w-full border p-2">
        <div
          onClick={() => setOpenQuestions(!openQuestion)}
          className="flex flex-row items-center gap-2 cursor-pointer my-2 hover:bg-primary/5 bg-gray-200/60 rounded-sm py-2 px-3"
        >
          <p className="text-xl font-semibold text-primary text-left">
            {studentPanel(selectedLanguage).Longselfassessment}
          </p>
          <span>
            {openQuestion ? (
              <KeyboardArrowUp fontSize="medium" />
            ) : (
              <KeyboardArrowDown fontSize="medium" />
            )}
          </span>
        </div>
        <Collapse in={openQuestion} timeout="auto" unmountOnExit>
          <ul className="flex flex-col">
            {longData?.data?.data?.data?.map((faq: any, index: number) => (
              <Accordion
                key={index}
                idx={index + 1}
                faq={faq}
                stuQuesMutate={stuQuesMutate}
              />
            ))}
          </ul>
        </Collapse>
      </div>
    </section>
  );
};

export default PracticeExercise;

const Accordion = ({
  idx,
  faq,
  stuQuesMutate,
}: {
  idx: any;
  faq: any;
  stuQuesMutate: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const { selectedLanguage } = useAppContext();

  return (
    <li className="bg-white my-2 shadow-sm">
      <h2
        onClick={() => handleClick()}
        className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100/50"
      >
        <p className="flex gap-2 flex-col">
          <p className="flex gap-2 flex-row">
            <span className="text-gray-700">{idx}.</span>
            <span>{faq?.question}</span>
          </p>
          <span className="text-md text-gray-500  mb-3 italic flex flex-row">
            <span className="text-md font-semibold italic text-gray-800 mr-2">
              {adminManageCategoryContent(selectedLanguage).hint}:
            </span>
            <div>
              {showHint ? (
                <div
                  className="flex flex-row gap-3 cursor-pointer"
                  onClick={() => setShowHint(!showHint)}
                >
                  <Visibility />
                  <p>{faq?.hint}</p>
                </div>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => setShowHint(!showHint)}
                >
                  <VisibilityOff />
                </div>
              )}
            </div>
          </span>
        </p>
        <ExpandMore
          className={`text-purple-700 h-6 w-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </h2>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="border-l-2 border-blue-600 overflow-hidden relative group">
          <div className="flex flex-col">
            {faq?.answerData?.length > 0 ? (
              <Typography className="p-3 text-gray-900 text-sm">
                <span className="w-full flex justify-between">
                  <span>{faq?.answerData[0]?.answer}</span>
                  <span className="invisible absolute -top-1 right-0 opacity-0 flex flex-row gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible p-2 rounded-md">
                    <UpdateStudentPracticeQuestion
                      data={faq}
                      mutate={stuQuesMutate}
                    />
                  </span>
                </span>
              </Typography>
            ) : (
              <Typography className="p-3 text-red-900 text-sm">
                {studentPanel(selectedLanguage).youHavenotans}
              </Typography>
            )}
          </div>
          {faq?.answerData?.length === 0 ? (
            <div className="invisible absolute -top-1 right-0 opacity-0 flex flex-row gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible p-2 rounded-md">
              <StudentPracticeQuestion data={faq} mutate={stuQuesMutate} />
            </div>
          ) : null}
        </div>
      </Collapse>
    </li>
  );
};
