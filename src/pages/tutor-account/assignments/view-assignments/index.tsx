import { Description } from "@mui/icons-material";
import { ASSIGNMENT } from "assets/animations";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { TutorPanelLayout } from "layouts";
import { dataContent } from "locale";
import { useRouter } from "next/router";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: ASSIGNMENT,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

type assignmentDataType = {
  _id: string;
  title: string;
  category: string;
  description: string;
};

const ViewAssignments = () => {
  const { data, isValidating } = useSWRAPI("tutor-dashboard/all-assignment");
  const { selectedLanguage } = useAppContext();

  return (
    <TutorPanelLayout title="View Assignment | StreamStudent">
      {data?.data?.data?.data?.length ? (
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 px-8 py-4">
          {data?.data?.data?.data?.map((assignment: any) => (
            <AssignmentCard key={assignment.id} data={assignment} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center">
            <Lottie options={defaultOptions} height={300} width={350} />
            <p className="capitalize font-semibold text-xl flex items-center justify-center">
              {dataContent(selectedLanguage).NoAssignment}
            </p>
          </div>
        </div>
      )}
    </TutorPanelLayout>
  );
};

type ASSIGNMENT = {
  _id: string;
  courseName: string;
  topics: string;
  totalQuestions: number;
  totalMarks: number;
  questions: {
    _id: string;
    answer: string;
    marks: number;
    options: string[];
  }[];
};

const AssignmentCard = ({ data }: { data: any }) => {
  const router = useRouter();

  const goToAllAssignment = () => {
    router.push(
      `/tutor-account/assignments/view-assignments/${data?.Sections?._id}`
    );
  };
  const { selectedLanguage } = useAppContext();
  return (
    <section className="bg-white py-4 rounded-lg  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  hover:-translate-y-2 duration-300 border-2 border-primary/20">
      <div className="space-y-1 p-4">
        <Description className="!text-[2rem] text-primary/80 text-center" />
        <h1 className="text-2xl font-bold text-gray-700">{data?.courseName}</h1>
        <p className="text-xl font-semibold text-gray-500">
          {data?.Sections?.topic}
        </p>
        {data?.Question?.length > 0 ? (
          <div>
            <p className="text-lg font-semibold text-gray-500">
              <span> {dataContent(selectedLanguage).TotalMarks}: </span>
              <span className="text-gray-600 font-medium text-xl">
                {data?.Question.reduce((totalMarks: any, question: any) => {
                  // Check if question.marks is a number before adding it
                  if (typeof question?.marks === "number") {
                    return totalMarks + question.marks;
                  }
                  return totalMarks;
                }, 0)}
              </span>
            </p>
            <p className="text-lg font-semibold text-gray-500">
              <span>{dataContent(selectedLanguage).NoofQuestions} : </span>
              <span className="text-gray-600 font-medium text-xl">
                {data?.Question.length}
              </span>
            </p>
            <p
              onClick={goToAllAssignment}
              className="text-lg font-semibold text-secondary hover:underline cursor-pointer hover:text-blue-600 inline-block"
            >
              {dataContent(selectedLanguage).ViewDetails}
            </p>
          </div>
        ) : (
          <p className="text-xl py-3 text-red-500">
            {dataContent(selectedLanguage).NoQuestionCreatedYet}
          </p>
        )}
      </div>
    </section>
  );
};

export default ViewAssignments;
