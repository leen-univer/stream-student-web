import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Radio } from "@mui/material";
import { useAppContext } from "contexts";
import { adminManageCategoryContent, lectureSectionPage } from "locale";
import { useState } from "react";

type QUESTION_TYPE = {
  _id: string;
  answer: string;
  question: string;
  options: string[];
  marks: string;
  hint: string;
  answerExplanation: string;
};
const StudentQuizQues = ({
  data,
  mutate,
}: {
  data: QUESTION_TYPE;
  mutate: () => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const controlProps = (name: string) => ({
    checked: selectedValue === name || data?.answer === name,
    value: name,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": name },
  });
  const [showHint, setShowHint] = useState(false);
  const { selectedLanguage } = useAppContext();

  return (
    <div className="relative group flex flex-col bg-white px-4 py-2 cursor-pointer">
      <div className=" flex flex-row-reverse justify-between gap-7 text-xl font-medium">
        <div className="whitespace-nowrap">
          <p>
            {lectureSectionPage(selectedLanguage).answer} : {data?.answer}
          </p>
        </div>
        <div className="flex flex-col overflow-scroll">
          <p className="text-md text-gray-500  mb-3 italic">
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
                  <p> {data?.hint}</p>
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
          </p>
          <div className="flex flex-col">
            {data?.options.map((option: string, index: number) => (
              <div className="flex gap-1 items-center" key={index}>
                <Radio {...controlProps(option)} color="success" />
                <p className="text-lg font-medium">{option}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-4">
            <p className="text-gray-800 font-semibold text-lg">
              {
                adminManageCategoryContent(selectedLanguage)
                  .correctAnsExplanation
              }
              :
            </p>
            <p className="text-gray-600 text-md mt-1">
              <span
                dangerouslySetInnerHTML={{ __html: data?.answerExplanation! }}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentQuizQues;
