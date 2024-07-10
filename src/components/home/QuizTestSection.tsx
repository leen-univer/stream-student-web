import { Close } from "@mui/icons-material";
import { CircularProgress, Dialog, IconButton } from "@mui/material";
import { StudentQuizShowCollapse } from "components/cards";
import { AssignmentCard } from "components/courseContent";
import { useAppContext } from "contexts";
import { useAuth, useSWRAPI } from "hooks";
import useMutation, { getAccessToken } from "hooks/useMutataion";
import { studentPanel } from "locale";
import { useState } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "utils";
import TakeUserData from "./TakeUserData";

const QuizTestSection = () => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openAssignment, setOpenAssignment] = useState(false);
  const [openTestReview, setOpenTestReview] = useState(false);
  const [openViewAssignment, setOpenViewAssignment] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isValidationFailed, setIsValidationFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizId, setQuizId] = useState();

  const { user } = useAuth();
  const { selectedLanguage } = useAppContext();
  const { mutation } = useMutation();

  if (user && user?._id) {
    typeof window !== "undefined" &&
      window?.localStorage?.removeItem("localUser");
  }
  interface LocalUser {
    name: string;
    email: string;
  }
  let localUser: LocalUser | null;

  localUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("localUser") || "null")
      : {};

  const handleOpenAssignment = (Id: any) => {
    checkUserResponse();
    setOpenAssignment(true);
    setQuizId(Id);
  };

  const checkUserResponse = async () => {
    const token = getAccessToken();

    let requestBody = {};

    if (user && user?._id) {
      requestBody = {
        name: user?.name,
        email: user?.email,
      };
    } else {
      requestBody = {
        name: localUser?.name,
        email: localUser?.email,
      };
    }

    try {
      const response = await fetch(
        BASE_URL + `/quizSubmitted/create-quiz-submission?quizId=${quizId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:");
    }
  };

  const { data: allQuiz, mutate: allQuizMutate } = useSWRAPI(
    `quiz/all-quiz?email=${
      user?.email ? user?.email : localUser?.email ? localUser?.email : ""
    }`
  );

  // console.log("allQUizzess--->", allQuiz);

  const { data, mutate } = useSWRAPI(`quiz/get-all-question/${quizId}`);
  const QuesArr = data?.data?.data?.data[0]?.data;

  const { data: submitData, mutate: submitMutate } = useSWRAPI(
    `studentQuiz/get-submitted-answer?quizId=${quizId}&email=${
      user?.email || localUser?.email
    }`
  );
  const handleUserModal = (Id: any) => {
    setOpenUserModal(true);
    setQuizId(Id);
  };

  const handleOpenViewAssignment = (Id: any) => {
    setOpenViewAssignment(true);
    setQuizId(Id);
  };

  const handleCloseAssignment = () => {
    setOpenAssignment(false);
  };
  const closeTestReview = () => {
    setOpenTestReview(false);
  };

  const closeViewAssignment = () => {
    setOpenViewAssignment(false);
  };

  const handleModalOpen = (Id: any) => {
    (user && user?._id) || localUser
      ? handleOpenAssignment(Id)
      : handleUserModal(Id);
  };

  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(QuesArr?.length).fill("")
  );

  function areAllQuestionsAnswered(selectedAnswers: any) {
    return selectedAnswers.every((answer: any) => answer !== "");
  }

  const handleOpenTestAssignment = (Id: any, correctCount: number) => {
    setOpenTestReview(true);
    setQuizId(Id);
    setCorrectAnswers(correctCount);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!areAllQuestionsAnswered(selectedAnswers)) {
      setIsValidationFailed(true);
      return;
    }

    try {
      setIsLoading(true);
      const answerDataArray = QuesArr?.map((question: any, i: number) => ({
        clickedAnswer: selectedAnswers[i],
        quizQuestion: question._id,
        email: user?.email || localUser?.email,
        name: user?.name || localUser?.name,
      }));

      const res = await mutation(`studentQuiz/create-quiz-answer`, {
        method: "POST",
        body: answerDataArray,
      });

      if (res?.status === 200) {
        const newres = await mutation(
          `quizSubmitted/create-quiz-submission?quizId=${quizId}`,
          {
            method: "POST",
            body: {
              email: user?.email || localUser?.email,
              name: user?.name || localUser?.name,
            },
          }
        );
        allQuizMutate();
        setIsLoading(false);
        handleCloseAssignment();
        Swal.fire({
          icon: "success",
          title: studentPanel(selectedLanguage).testsubmittedsuccessfully,
          text: studentPanel(selectedLanguage).youcanreviewresult,
        });
        // handleResults();
        submitMutate();
      } else {
      }
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

  return (
    <section className="main-container flex flex-wrap lg:gap-20 md:gap-16 gap-12 justify-center lg:mt-16 md:mt-12 mt-8">
      {allQuiz?.data?.data?.data?.map((item: any) => (
        <aside
          key={item?._id}
          className="md:w-[16rem] w-full min-h-[13rem] bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="p-4 bg-blue-500/10 text-white rounded-t-lg">
            <p className="text-xl text-gray-900 text-center font-semibold">
              {item?.title}
            </p>
          </div>
          {item?.isSubmitted ? (
            <div className="p-4 flex flex-col items-center justify-between h-full">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => handleOpenViewAssignment(item?._id)}
                  className="bg-blue-700/30 font-semibold text-blue-900 px-6 py-2 rounded-md hover:bg-blue-800/30 focus:outline-none focus:ring focus:border-blue-300"
                >
                  {studentPanel(selectedLanguage).viewSolution}
                </button>
                <button
                  onClick={() =>
                    handleOpenTestAssignment(
                      item?._id,
                      item?.totalCorrectAnswer
                    )
                  }
                  className="bg-green-500/30 font-semibold text-green-900 px-6 py-2 rounded-md hover:bg-green-600/30 focus:outline-none focus:ring focus:border-purple-300 mt-2"
                >
                  {studentPanel(selectedLanguage).viewResult}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center space-y-4">
              <p className="text-gray-700">
                {studentPanel(selectedLanguage).quizinfo}
              </p>
              <button
                onClick={() => handleModalOpen(item?._id)}
                className="bg-blue-500 font-semibold text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-purple-300"
              >
                {studentPanel(selectedLanguage).startQuiz}
              </button>
            </div>
          )}
        </aside>
      ))}

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

          <h1 className="title-styling text-start capitalize flex items-center gap-3">
            {studentPanel(selectedLanguage).Quizzes}
          </h1>
          <div>
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
                  {QuesArr && QuesArr?.length > 0
                    ? QuesArr?.map((item: any, i: number) => (
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
          </div>
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
          <h1 className="title-styling text-start capitalize flex items-center gap-3">
            {studentPanel(selectedLanguage).results}
          </h1>
          <aside>
            <div className="bg-gray-100 rounded p-4 border border-gray-200 mt-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {studentPanel(selectedLanguage).TestResults} :
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                {studentPanel(selectedLanguage).TotalQuestions}:{" "}
                {QuesArr?.length}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                {studentPanel(selectedLanguage).correctAnswer}:{" "}
                {correctAnswers || 0}
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

          <h1 className="title-styling text-start capitalize flex items-center gap-3">
            {studentPanel(selectedLanguage).solutions}
            {/* <MenuBook className="!text-5xl text-blue-500" /> */}
          </h1>
          <aside>
            <StudentQuizShowCollapse quizId={quizId} />
          </aside>
        </article>
      </Dialog>
      {/* get user Modal */}
      <TakeUserData
        mutate={mutate}
        open={openUserModal}
        setOpen={setOpenUserModal}
        quizId={quizId}
      />
    </section>
  );
};

export default QuizTestSection;
