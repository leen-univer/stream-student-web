import { DeleteOutline } from "@mui/icons-material";
import { Radio, Tooltip } from "@mui/material";
import { UpdateQuizForm } from "components/forms/adminForms";
import UpdateQuestionDialog from "components/forms/adminForms/UpdateQuizForm";
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
const AdminQuestionCard = ({
  data,
  handleDelete,
  mutate,
}: {
  data: QUESTION_TYPE;
  handleDelete?: any;
  mutate: () => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (name: string) => {
    setSelectedValue(name);
  };

  // const controlProps = (name: string) => ({
  //   checked: selectedValue === name,
  //   onChange: () => handleChange(name),
  //   value: name,
  //   name: "color-radio-button-demo",
  //   inputProps: { "aria-label": name },
  // });
  const controlProps = (name: string) => ({
    checked: selectedValue === name || data?.answer === name,
    // onChange: () => handleChange(name),
    value: name,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": name },
  });
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
            {data?.hint}
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
      <div className="invisible absolute bottom-2 -right-8 opacity-0 flex flex-col gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible">
        <UpdateQuizForm mutate={mutate} data={data} />

        <Tooltip
          title={lectureSectionPage(selectedLanguage).DeleteQuestion}
          followCursor
          placement="top-start"
          arrow
        >
          <button
            onClick={handleDelete}
            className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
          >
            <DeleteOutline fontSize="small" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
export default AdminQuestionCard;
