import {
  Assessment,
  AssignmentTurnedIn,
  Close,
  MenuBook,
} from "@mui/icons-material";
import { CircularProgress, Dialog, IconButton } from "@mui/material";
import { FinalAssignmentShow } from "components/core";
import { useAuth, useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { QuestionType } from "types";
import AssignmentCard from "./AssignmentCard";
import { studentPanel } from "locale";
import { useAppContext } from "contexts";

const FinalAssignmentCard = ({
  data,
  getFinalResult,
  resultMutate,
  getFinalExamData,
  isPurchased,
}: {
  data: any;
  getFinalResult: any;
  resultMutate: () => void;
  getFinalExamData: any;
  isPurchased: any;
}) => {
  const [openFinalAssignment, setOpenFinalAssignment] = useState(false);
  const [openFinalTestReview, setOpenFinalTestReview] = useState(false);
  const [ViewFinalAssignment, setViewFinalAssignment] = useState(false);
  const [isValidationFailed, setIsValidationFailed] = useState(false);
  const [answerIdStore, setAnswerIdStore] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { mutation } = useMutation();
  const router = useRouter();
  const { selectedLanguage } = useAppContext();

  const { data: submitData, mutate: submitMutate } = useSWRAPI(
    `examAnswer/get-exam-answers?courseId=${router?.query?.courseID}`
  );

  const handleCloseFinalAssignment = () => {
    setOpenFinalAssignment(false);
  };

  const closeFinalTestReview = () => {
    setOpenFinalTestReview(false);
  };

  const closeViewFinalAssignment = () => {
    setViewFinalAssignment(false);
  };

  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(data?.data?.data?.examData?.length).fill("")
  );

  function areAllQuestionsAnswered(selectedAnswers: any) {
    return selectedAnswers.every((answer: any) => answer !== "");
  }

  const handleFinalTestReview = () => {
    setOpenFinalTestReview(true);
  };

  // const handlePutMethod = async (e: any) => {
  //   e.preventDefault();

  //   if (!areAllQuestionsAnswered(selectedAnswers)) {
  //     setIsValidationFailed(true);
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);

  //     const questionAnswers = [];
  //     const answerDataArray = [];

  //     for (const question of data?.data?.data?.examData) {
  //       const answerData = {
  //         clickedAnswer:
  //           selectedAnswers[data?.data?.data?.examData.indexOf(question)],
  //         questionId: question._id,
  //       };

  //       const answerId = submitData?.data?.data?.data.find(
  //         (item: any) => item.questionId === question._id
  //       )?._id;

  //       if (answerId) {
  //         questionAnswers.push(answerData);
  //       } else {
  //       }
  //     }

  //     const res = await mutation(`examAnswer/update-the-exam-answer?answerId`, {
  //       method: "PUT",
  //       body: questionAnswers,
  //     });

  //     resultMutate();
  //     submitMutate();
  //     setIsLoading(false);
  //     handleCloseFinalAssignment();

  //     if (res?.status === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Test Submitted Successfully",
  //         text: "You can review your results now.",
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error Submitted Test",
  //         text: "There was an issue submitting your test. Please try again.",
  //       });
  //     }

  //     submitMutate();
  //     resultMutate();
  //     submitMutate();
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error("API request error:", error);

  //     Swal.fire({
  //       icon: "error",
  //       title: "Error Submitting Test",
  //       text: "There was an issue submitting your test. Please try again.",
  //     });

  //     submitMutate();
  //   }
  // };

  const handlePostMethod = async (e: any) => {
    e.preventDefault();

    // Check if all questions have been answered
    if (!areAllQuestionsAnswered(selectedAnswers)) {
      setIsValidationFailed(true);
      return;
    }

    try {
      setIsLoading(true);

      const questionAnswers = [];

      for (let i = 0; i < data?.data?.data?.examData?.length; i++) {
        const question = data?.data?.data?.examData[i];
        const answerData = {
          clickedAnswer: selectedAnswers[i],
          questionId: question._id,
        };

        questionAnswers.push(answerData);
      }

      const res = await mutation(`examAnswer/create-exam-routes`, {
        method: "POST",
        body: questionAnswers,
      });

      resultMutate();

      setIsLoading(false);
      submitMutate();
      resultMutate();
      handleCloseFinalAssignment();

      if (res?.status === 200) {
        Swal.fire({
          icon: "success",
          title: studentPanel(selectedLanguage).testsubmittedsuccessfully,
          text: studentPanel(selectedLanguage).youcanreviewresult,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: studentPanel(selectedLanguage).ErrorSubmittingTest,
          text: studentPanel(selectedLanguage).Thereanissue,
        });
      }

      submitMutate();
      resultMutate();
      submitMutate();
    } catch (error) {
      setIsLoading(false);
      console.error("API request error:", error);

      Swal.fire({
        icon: "error",
        title: studentPanel(selectedLanguage).ErrorSubmittingTest,
        text: studentPanel(selectedLanguage).Thereanissue,
      });
    }
  };

  // const handleSubmit = (e: any) => {
  //   handlePostMethod(e);
  // };

  const handleAnswerChange = (answer: any, index: any) => {
    // Update the selected answers when a student changes their answer
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  return (
    <section className="border p-2">
      <div className="bg-gray-200/70 rounded-sm shadow-md flex lg:flex-row flex-col justify-center gap-8 p-6">
        <div>
          <img
            src="/exam.jpg"
            alt="Exam image"
            className="object-cover h-72 w-96 rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-primary mb-2">
            {studentPanel(selectedLanguage).FinalAssignment}
          </h3>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-700">
              {studentPanel(selectedLanguage).TestInformation}
            </p>
            <div className="py-2">
              <p>
                {studentPanel(selectedLanguage).TotalNoofQuestions}:{" "}
                {getFinalExamData?.totalNumberOfQuestion}
              </p>
              <p>
                {" "}
                {studentPanel(selectedLanguage).TotalMarks}:{" "}
                {getFinalExamData?.fullMarks}
              </p>
              <p>
                {studentPanel(selectedLanguage).PassMarks}:{" "}
                {getFinalExamData?.passMarks}
              </p>
              {/* /<p>Pass Percentage: {passPercentage}%</p> */}
              <p>
                {studentPanel(selectedLanguage).skillGain}:{" "}
                <span className="text-gray-700">
                  {getFinalExamData?.skills}
                </span>
              </p>
            </div>
            <div className="py-2">
              {submitData?.data?.data?.data?.length > 0 &&
              getFinalResult?.isPass ? (
                <p className="text-green-600 font-semibold">
                  {
                    studentPanel(selectedLanguage)
                      .CongratulationsYouhavepassedtheexam
                  }
                  .
                </p>
              ) : submitData?.data?.data?.data?.length > 0 &&
                getFinalResult?.isPass == false ? (
                <p className="text-red-600 font-semibold">
                  {studentPanel(selectedLanguage).Sorryyouhavenotpassed}
                </p>
              ) : (
                <p className="text-blue-600 font-semibold">
                  {
                    studentPanel(selectedLanguage)
                      .Completethisfinalassignmenttoearnyourcertificate
                  }
                  .
                </p>
              )}
            </div>
          </div>

          <section className="flex flex-col gap-3 mt-5">
            {submitData?.data?.data?.data?.length > 0 &&
            getFinalResult?.isPass == false ? (
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex flex-row gap-1">
                  <Assessment className="text-base text-blue-500 cursor-pointer" />
                  <span
                    className="text-blue-500 hover:text-blue-600 cursor-pointer underline"
                    onClick={handleFinalTestReview}
                  >
                    {studentPanel(selectedLanguage).FinalTestReview}
                  </span>
                </div>
                <div className="flex flex-row gap-1">
                  <button
                    onClick={() => setOpenFinalAssignment(true)}
                    className="bg-blue-900 hover:bg-blue-800 transition-colors font-medium text-lg text-white rounded-md py-2 px-4 mt-4"
                  >
                    {studentPanel(selectedLanguage).GiveFinalTest}
                  </button>
                </div>
              </div>
            ) : submitData?.data?.data?.data?.length > 0 &&
              getFinalResult?.isPass ? (
              <article className="flex flex-col gap-3">
                <aside className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1">
                    <Assessment className="!text-base !text-blue-500 !cursor-pointer" />
                    <span
                      className="text-blue-500 hover:text-blue-600 cursor-pointer underline"
                      onClick={handleFinalTestReview}
                    >
                      {studentPanel(selectedLanguage).FinalTestReview}
                    </span>
                  </div>
                </aside>
                <aside>
                  <div className="flex flex-row gap-1">
                    <AssignmentTurnedIn className="!text-base !text-blue-500 !cursor-pointer" />
                    <span
                      className="text-blue-500 hover:text-blue-600 cursor-pointer underline"
                      onClick={() => setViewFinalAssignment(true)}
                    >
                      {studentPanel(selectedLanguage).viewFinalAssignment}
                    </span>
                  </div>
                </aside>
              </article>
            ) : (
              <aside className="flex flex-row gap-1">
                <button
                  onClick={() => {
                    if (user?._id) {
                      setOpenFinalAssignment(true);
                    } else {
                      Swal.fire({
                        icon: "warning",
                        title: studentPanel(selectedLanguage).AccessDenied,
                        text: studentPanel(selectedLanguage)
                          .Youmustbeloggedintotakethisaction,
                      });
                    }
                  }}
                  className="bg-blue-900 hover:bg-blue-800 common-transition font-medium text-lg text-white rounded-md px-4 py-2 mt-4"
                >
                  {studentPanel(selectedLanguage).GiveFinalTest}
                </button>
              </aside>
            )}
          </section>
        </div>
      </div>

      {/* give final test  */}
      <Dialog
        open={openFinalAssignment}
        keepMounted={false}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <article className="relative flex flex-col gap-4 p-6">
          <span className="absolute top-5 right-3">
            <IconButton onClick={handleCloseFinalAssignment}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <p className="uppercase font-bold text-primary">{data?.topic}</p>

          <h1 className="title-styling text-start capitalize flex items-center gap-3">
            {studentPanel(selectedLanguage).FinalAssignment}
            <MenuBook className="!text-5xl text-blue-500" />
          </h1>
          {isPurchased ? (
            <aside className="w-full flex flex-col rounded-lg">
              <p className="text-2xl text-primary pb-4">
                {studentPanel(selectedLanguage).Choosethecorrectanswer}.
              </p>
              {isValidationFailed && (
                <p className="text-red-500 pb-3">
                  {
                    studentPanel(selectedLanguage)
                      .Pleaseanswerallquestionsbeforesubmitting
                  }
                  .
                </p>
              )}

              <form onSubmit={handlePostMethod}>
                <div className="w-full lg:w-3/4 flex flex-col gap-8">
                  {data?.data?.data?.examData &&
                  data?.data?.data?.examData?.length > 0
                    ? data?.data?.data?.examData?.map(
                        (item: QuestionType, i: number) => (
                          <AssignmentCard
                            key={i}
                            curQuestion={item}
                            index={i}
                            onChange={(answer) => handleAnswerChange(answer, i)}
                          />
                        )
                      )
                    : null}
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="btn-primary px-5 py-1.5"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-1">
                        <span>{studentPanel(selectedLanguage).Submitting}</span>
                        <CircularProgress
                          size={20}
                          className="!text-green-700"
                        />
                      </div>
                    ) : (
                      studentPanel(selectedLanguage).SubmitTest
                    )}
                  </button>
                </div>
              </form>
            </aside>
          ) : (
            <p className="text-red-500 text-xl font-semibold bg-yellow-100 p-2 rounded-md text-center">
              {
                studentPanel(selectedLanguage)
                  .Youneedtopurchasethiscoursetotakethefinaltest
              }
              .
            </p>
          )}
        </article>
      </Dialog>
      {/* test review Dialog */}
      <Dialog
        open={openFinalTestReview}
        keepMounted={false}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <article className="relative flex flex-col gap-4 p-6">
          <span className="absolute top-5 right-3">
            <IconButton onClick={closeFinalTestReview}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <p className="uppercase font-bold text-primary">{data?.topic}</p>

          <h1 className="title-styling text-start capitalize flex items-center gap-3">
            {studentPanel(selectedLanguage).assignmentresults}
            <MenuBook className="!text-5xl text-blue-500" />
          </h1>
          <aside>
            <h1 className="text-xl text-black">Test Review </h1>
            <div className="bg-gray-100 rounded p-4 border border-gray-200 mt-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {studentPanel(selectedLanguage).TestResults}
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                {studentPanel(selectedLanguage).TotalQuestions}:{" "}
                {getFinalExamData?.totalNumberOfQuestion}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <p>
                  {studentPanel(selectedLanguage).TotalMarks}:{" "}
                  {getFinalExamData?.fullMarks}
                </p>
              </p>
              <p className="text-lg text-gray-600 mb-2">
                {studentPanel(selectedLanguage).ObtainedMarks}:{" "}
                {getFinalResult?.totalMarks}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                {studentPanel(selectedLanguage).Percentage}:{" "}
                {getFinalResult?.percentage}%
              </p>
            </div>
          </aside>
        </article>
      </Dialog>
      {/* view assignment Dialog */}
      <Dialog
        open={ViewFinalAssignment}
        keepMounted={false}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <article className="relative flex flex-col gap-4 p-6">
          <span className="absolute top-5 right-3">
            <IconButton onClick={closeViewFinalAssignment}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <p className="uppercase font-bold text-primary">{data?.topic}</p>

          <h1 className="title-styling text-start capitalize flex items-center gap-3">
            {studentPanel(selectedLanguage).assignment}
            <MenuBook className="!text-5xl text-blue-500" />
          </h1>
          <aside>
            <FinalAssignmentShow />
          </aside>
        </article>
      </Dialog>
    </section>
  );
};

export default FinalAssignmentCard;
