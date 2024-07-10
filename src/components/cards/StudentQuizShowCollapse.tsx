import { ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useSWRAPI } from "hooks";
import { useState } from "react";
import StudentQuizQues from "./StudentQuizQues";

const StudentQuizShowCollapse = ({ quizId }: { quizId: any }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { data, mutate, isValidating } = useSWRAPI(
    `quiz/get-all-question/${quizId}`
  );

  const handleClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {data?.data?.data?.data[0]?.data?.map((item: any, index: any) => (
        <div key={index} className="bg-white my-2 shadow-lg">
          <div
            onClick={() => handleClick(index)}
            className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100/50"
          >
            <p className="flex gap-2">
              <span className="text-gray-700">{index + 1}.</span>

              <span
                dangerouslySetInnerHTML={{ __html: item?.question! }}
                className="text-lg font-medium"
              ></span>
            </p>
            <ExpandMore
              className={`text-purple-700 h-6 w-6 transform transition-transform duration-300 ease-in-out ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            />
          </div>
          <Collapse
            in={activeIndex === index}
            timeout="auto"
            unmountOnExit
            key={index}
          >
            <div className="border-l-2 border-primary/60 overflow-hidden pb-2 relative group">
              <div className="mt-3 flex flex-col gap-6 p-2">
                <StudentQuizQues data={item} mutate={mutate} />
              </div>
            </div>
          </Collapse>
        </div>
      ))}
    </>
  );
};

export default StudentQuizShowCollapse;
