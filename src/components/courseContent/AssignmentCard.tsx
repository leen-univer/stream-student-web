import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useAppContext } from "contexts";
import { studentPanel } from "locale";
import { useState } from "react";
import { QuestionType } from "types";

const AssignmentCard = ({
  curQuestion,
  onChange,
  index,
}: {
  index: number;
  curQuestion: QuestionType;
  onChange: (answer: string) => void;
}) => {
  const { selectedLanguage } = useAppContext();
  const [showHint, setShowHint] = useState(false);
  return (
    <article className="text-base font-medium">
      <div className="flex flex-row text-lg font-semibold">
        <p>{index + 1} Q.</p>
        <p dangerouslySetInnerHTML={{ __html: curQuestion.question! }} />
      </div>
      <div className="font-medium text-base text-gray-600 italic flex flex-row gap-3 my-2 items-center">
        {studentPanel(selectedLanguage).hint}:
        <div>
          {showHint ? (
            <div
              className="flex flex-row gap-3 cursor-pointer"
              onClick={() => setShowHint(!showHint)}
            >
              <Visibility />
              <p> {curQuestion?.hint}</p>
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
      </div>
      <p className="font-semibold text-base text-primary">
        {studentPanel(selectedLanguage).mark}: {curQuestion?.marks}
      </p>

      <div className="">
        <RadioGroup
          name={`${index}`}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          {curQuestion?.options?.map((option, optionIndex) => (
            <FormControlLabel
              key={optionIndex}
              value={option}
              control={<Radio size="small" />}
              label={option}
              className="!w-fit"
            />
          ))}
        </RadioGroup>
      </div>
    </article>
  );
};

export default AssignmentCard;
