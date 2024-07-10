import {
  Assessment,
  Assignment,
  AssignmentTurnedIn,
  Close,
  ExpandMore,
  MenuBook,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Dialog,
  IconButton,
} from "@mui/material";
import { AssignmentShow } from "components/core";
import { useAuth, useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { useState } from "react";
import Swal from "sweetalert2";
import { QuestionType } from "types";
import showError from "utils/error";
import AssignmentCard from "./AssignmentCard";
import AttachedLinks from "./AttachedLinks";
import DocumentRead from "./DocumentRead";
import PreviewVideoPlay from "./PreviewVideoPlay";
import VideoPlay from "./VideoPlay";
import { studentPanel } from "locale";
import { useAppContext } from "contexts";

const TopicCard = ({
  data,
  isPurchased,
  courseMutate,
  progressMutate,
}: {
  data: any;
  isPurchased: any;
  courseMutate: () => void;
  progressMutate: () => void;
}) => {
  const [openAssignment, setOpenAssignment] = useState(false);
  const [openTestReview, setOpenTestReview] = useState(false);
  const [openViewAssignment, setOpenViewAssignment] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isValidationFailed, setIsValidationFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { selectedLanguage } = useAppContext();

  const { mutation } = useMutation();
  const { data: submitData, mutate: submitMutate } = useSWRAPI(
    `answer/get-all-sub-assignment?sectionId=${data?._id}`
  );
  const handleCloseAssignment = () => {
    setOpenAssignment(false);
  };
  const closeTestReview = () => {
    setOpenTestReview(false);
  };

  const closeViewAssignment = () => {
    setOpenViewAssignment(false);
  };

  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(data.questions.length).fill("")
  );

  const totalMarks = data.questions.reduce(
    (total: any, question: any) => total + question.marks,
    0
  );

  function areAllQuestionsAnswered(selectedAnswers: any) {
    return selectedAnswers.every((answer: any) => answer !== "");
  }

  const handleVideoWatch = async (videoId?: string) => {
    try {
      const res = await mutation("watch/create-watch-data", {
        method: "POST",
        body: {
          userId: user?._id,
          videoId: videoId,
          isWatched: true,
        },
      });
      courseMutate();
      progressMutate();
    } catch (error) {
      showError(error);
    } finally {
      console.error();
    }
  };

  const handleDocumentRead = async (documentId?: string) => {
    try {
      const res = await mutation(
        `read/read-study-material?studyMaterialId=${documentId}`,
        {
          method: "POST",
          body: {
            userId: user?._id,
            documentId: documentId,
            isRead: true,
          },
        }
      );
      courseMutate();
      progressMutate();
    } catch (error) {
      showError(error);
    } finally {
    }
  };

  const handleLinkClick = async (linkId?: string) => {
    try {
      const res = await mutation(
        `is-click/click-link-material?linkId=${linkId}`,
        {
          method: "POST",
          body: {
            userId: user?._id,
            isClick: true,
          },
        }
      );
      courseMutate();
      progressMutate();
    } catch (error) {
      showError(error);
    } finally {
    }
  };

  const handleResults = () => {
    const correctCount = submitData?.data?.data?.data?.reduce(
      (count: any, response: any) => {
        const question = data.questions.find(
          (q: any) => q._id === response.questionId
        );
        return question && response.clickedAnswer === question.answer
          ? count + question.marks // Add the question's marks for correct answers
          : count;
      },
      0
    );

    const totalMarks = data.questions.reduce(
      (total: any, question: any) => total + question.marks,
      0
    );

    const percent = (correctCount / totalMarks) * 100;

    setCorrectAnswers(correctCount);
    setPercentage(percent);
  };

  const handleOpenTestReview = () => {
    setOpenTestReview(true);
    handleResults();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if all questions have been answered
    if (!areAllQuestionsAnswered(selectedAnswers)) {
      setIsValidationFailed(true);
      return;
    }

    try {
      setIsLoading(true);
      // const apiResponses = [];

      // send the request now in array
      const answerDataArray = data.questions.map(
        (question: any, i: number) => ({
          clickedAnswer: selectedAnswers[i],
          questionId: question._id,
        })
      );

      // Loop through each question and send the answer individually
      // for (let i = 0; i < data.questions.length; i++) {
      //   const question = data.questions[i];
      //   const answerData = {
      //     clickedAnswer: selectedAnswers[i],
      //     questionId: question._id,
      //   };
      // }

      const res = await mutation(`answer/create-answer`, {
        method: "POST",
        body: answerDataArray,
      });

      // apiResponses.push(res);

      // const allSuccessful = apiResponses.every((res) => res?.status === 200);

      if (res?.status === 200) {
        setIsLoading(false);
        handleCloseAssignment();
        Swal.fire({
          icon: "success",
          title: studentPanel(selectedLanguage).testsubmittedsuccessfully,
          text: studentPanel(selectedLanguage).youcanreviewresult,
        });
        handleResults();
        submitMutate();
      } else {
      }
      const correctCount = data.questions
        .filter(
          (question: any, i: number) => selectedAnswers[i] === question.answer
        )
        .reduce((total: any, question: any) => total + question.marks, 0);

      const percent = (correctCount / totalMarks) * 100;
      setCorrectAnswers(correctCount);
      setPercentage(percent);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (answer: any, index: any) => {
    // Update the selected answers when a student changes their answer
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;
    setSelectedAnswers(updatedAnswers);
  };
  const freeVideos = data?.VideoSection?.filter(
    (videoData: any) => videoData.isFree
  );

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="!bg-primary/5"
        >
          <h3 className="capitalize font-semibold tracking-wide">
            {data?.topic || studentPanel(selectedLanguage).notgiven}
          </h3>
        </AccordionSummary>
        <AccordionDetails>
          <aside className="flex flex-col gap-4">
            {/* free video Material  */}
            <div className="flex flex-col gap-3">
              {freeVideos?.length === 0 ? (
                ""
              ) : (
                <>
                  <h1 className="text-gray-700 font-medium">
                    {studentPanel(selectedLanguage).freepreviewmaterial}
                  </h1>
                  {freeVideos?.map((videoData: any) => (
                    <PreviewVideoPlay data={videoData} key={videoData._id} />
                  ))}
                </>
              )}
            </div>
            {/* Video Material  */}
            <div className="flex flex-col gap-3">
              {data?.VideoSection?.length === 0 ? (
                studentPanel(selectedLanguage).NOVideoMaterial
              ) : (
                <>
                  <h1 className="text-gray-700 font-medium">
                    {studentPanel(selectedLanguage).videoMaterial}
                  </h1>
                  {data?.VideoSection?.map((data: any) => (
                    <VideoPlay
                      data={data}
                      key={data?._id}
                      handleVideoWatch={handleVideoWatch}
                      isPurchased={isPurchased}
                    />
                  ))}
                </>
              )}
            </div>
            {/* study material  */}
            <div className="flex flex-col gap-3">
              {data?.studyMaterial?.length === 0 ? (
                studentPanel(selectedLanguage).NOStudyMaterial
              ) : (
                <>
                  <h1 className="text-gray-700 font-medium">
                    {studentPanel(selectedLanguage).studyMaterial}
                  </h1>
                  {data?.studyMaterial?.map((data: any) => (
                    <DocumentRead
                      data={data}
                      key={data?._id}
                      handleDocumentRead={handleDocumentRead}
                      isPurchased={isPurchased}
                    />
                  ))}
                </>
              )}
            </div>
            {/* Attached Link Material  */}
            <div className="flex flex-col gap-3">
              {data?.linkMaterial?.length === 0 ? (
                studentPanel(selectedLanguage).NOLinkMaterial
              ) : (
                <>
                  <h1 className="text-gray-700 font-medium">
                    {studentPanel(selectedLanguage).AttachedLinks}
                  </h1>
                  {data?.linkMaterial?.map((data: any) => (
                    <AttachedLinks
                      data={data}
                      key={data?._id}
                      handleLinkClick={handleLinkClick}
                      isPurchased={isPurchased}
                    />
                  ))}
                </>
              )}
            </div>
            {/* practice assignment  */}
            <div className="flex flex-col gap-3">
              {data?.questions?.length === 0 ? (
                studentPanel(selectedLanguage).NoAssignments
              ) : (
                <>
                  <h1 className="text-gray-700 font-medium">
                    {studentPanel(selectedLanguage).mcqselfassessment}
                  </h1>
                  <p className="flex items-center gap-2 text-sm">
                    <section className="flex flex-col gap-3">
                      {submitData?.data?.data?.data?.length > 0 ? (
                        <aside className="flex flex-col gap-2">
                          <div className="flex flex-row gap-1">
                            <Assessment className="!text-base !text-blue-500 !cursor-pointer" />
                            <span
                              className="text-blue-500 hover:text-blue-600 cursor-pointer underline"
                              onClick={handleOpenTestReview}
                            >
                              {studentPanel(selectedLanguage).TestReview}
                            </span>
                          </div>
                          <div className="flex flex-row gap-1">
                            <AssignmentTurnedIn className="!text-base !text-blue-500 !cursor-pointer" />
                            <span
                              className="text-blue-500 hover:text-blue-600 cursor-pointer underline"
                              onClick={() => setOpenViewAssignment(true)}
                            >
                              {studentPanel(selectedLanguage).viewAssignment}
                            </span>
                          </div>
                        </aside>
                      ) : (
                        <aside className="flex flex-row gap-1">
                          <Assignment className="!text-base !text-blue-500 !cursor-pointer" />
                          <span
                            className="text-blue-500 hover:text-blue-600 cursor-pointer underline"
                            onClick={() => setOpenAssignment(true)}
                          >
                            {studentPanel(selectedLanguage).practiceAssignment}
                          </span>
                        </aside>
                      )}
                    </section>
                  </p>
                </>
              )}
            </div>
          </aside>
        </AccordionDetails>
      </Accordion>
      {/* practice assignment Dialog */}
      <Dialog
        open={openAssignment}
        keepMounted={false}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <article className="relative flex flex-col gap-4 p-6">
          <span className="absolute top-5 right-3">
            <IconButton onClick={handleCloseAssignment}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <p className="uppercase font-bold text-primary">{data?.topic}</p>

          <h1 className="title-styling text-start capitalize flex items-center gap-3">
            {studentPanel(selectedLanguage).assignment}
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

              <form onSubmit={handleSubmit}>
                <div className="w-full lg:w-3/4 flex flex-col gap-8">
                  {data?.questions && data?.questions?.length > 0
                    ? data?.questions?.map((item: QuestionType, i: number) => (
                        <AssignmentCard
                          key={i}
                          curQuestion={item}
                          index={i}
                          onChange={(answer) => handleAnswerChange(answer, i)}
                        />
                      ))
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
                  .youneedtopurchasethiscoursetopracticetheassignment
              }
              .
            </p>
          )}
        </article>
      </Dialog>
      {/* test review Dialog */}
      <Dialog
        open={openTestReview}
        keepMounted={false}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <article className="relative flex flex-col gap-4 p-6">
          <span className="absolute top-5 right-3">
            <IconButton onClick={closeTestReview}>
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
                {data.questions.length}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                {studentPanel(selectedLanguage).TotalMarks}: {totalMarks}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                {studentPanel(selectedLanguage).ObtainedMarks}: {correctAnswers}
              </p>
              <p className="text-lg text-gray-600">
                {studentPanel(selectedLanguage).Percentage}:{" "}
                {percentage.toFixed(2)}%
              </p>
            </div>
          </aside>
        </article>
      </Dialog>
      {/* view assignment Dialog */}
      <Dialog
        open={openViewAssignment}
        keepMounted={false}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <article className="relative flex flex-col gap-4 p-6">
          <span className="absolute top-5 right-3">
            <IconButton onClick={closeViewAssignment}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <p className="uppercase font-bold text-primary">{data?.topic}</p>

          <h1 className="title-styling text-start capitalize flex items-center gap-3">
            {studentPanel(selectedLanguage).assignment}
            <MenuBook className="!text-5xl text-blue-500" />
          </h1>
          <aside>
            <AssignmentShow sectionId={data?._id} />
          </aside>
        </article>
      </Dialog>
    </>
  );
};

export default TopicCard;
