import { DeleteOutline, ExpandMore } from "@mui/icons-material";
import { Collapse, Tooltip, Typography } from "@mui/material";
import {
  AddExerciseQuestion,
  UpdateExerciseQuestions,
  UpdateFaqDialog,
} from "components/forms";
import AddFaqsDialog from "components/forms/tutorForms/AddFaqsDialog";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { TutorPanelLayout } from "layouts";
import { adminManageCategoryContent, dataContent, deleteContent } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TutorAddExercise = () => {
  const router = useRouter();
  const { selectedLanguage } = useAppContext();
  const { data, mutate, isValidating } = useSWRAPI(
    `longQuestion/get-all-question?courseId=${router?.query?.id}`
  );

  const { data: courseData } = useSWRAPI(
    `tutor/all-section/${router?.query?.id}`
  );

  return (
    <TutorPanelLayout title="Manage Faqs | StreamStudent">
      <section className="w-full h-full space-y-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-bold text-primary uppercase lg:pr-12 md:pr-4">
              {courseData?.data?.courseName?.courseName}
            </h1>
          </div>
          <h2 className="text-xl font-medium tracking-wider lg:pr-12 md:pr-4">
            {courseData?.data?.courseName?.description}
          </h2>
          <div className=" text-lg font-semibold mt-4 text-white ">
            <p className="inline-block bg-primary/80  px-2 rounded-lg">
              {courseData?.data?.courseName?.Category?.name}
            </p>
          </div>
        </div>
        <div className="cursor-pointer flex md:justify-end flex-col md:flex-row gap-6 px-2">
          <AddExerciseQuestion mutate={mutate} />
        </div>
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-primary mb-2 text-center my-5">
            {dataContent(selectedLanguage).AllQuestions}
          </h2>
          <ul className="flex flex-col">
            {data?.data?.data?.map((faq: any, index: number) => (
              <Accordion
                key={index}
                idx={index + 1}
                faq={faq}
                mutate={mutate}
              />
            ))}
          </ul>
        </div>
      </section>
    </TutorPanelLayout>
  );
};

export default TutorAddExercise;

const Accordion = ({
  idx,
  faq,
  mutate,
}: {
  idx: any;
  faq: any;
  mutate: () => void;
}) => {
  const { mutation } = useMutation();

  const { selectedLanguage } = useAppContext();

  const handleDelete = async () => {
    Swal.fire({
      title: deleteContent(selectedLanguage).Warning,
      text: deleteContent(selectedLanguage).Areyousureyouwanttodelete,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: deleteContent(selectedLanguage).yes,
      cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutation(
            `longQuestion/delete-long-question/${faq?._id}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );
          mutate?.();
        } catch (error: any) {
          toast.error(error);
        }
      }
    });
  };

  return (
    <div className="relative bg-white my-2 py-3 shadow-lg hover:bg-blue-100/10 common-transition cursor-pointer">
      <div className="flex flex-row justify-between items-center font-semibold p-3">
        <p className="flex flex-col gap-2">
          <span className="flex flex-row">
            <span className="text-gray-700">{idx}.</span>
            <span className="text-lg">{faq?.question}</span>
          </span>
          <span className="flex flex-row">
            <span className="text-md font-semibold italic text-gray-800 mr-2">
              {adminManageCategoryContent(selectedLanguage).hint}:
            </span>
            <p>{faq?.hint}</p>
          </span>
        </p>
      </div>
      <div className="absolute right-0 top-1 flex flex-row gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible group-hover:bg-gray-900 p-2 rounded-md">
        <UpdateExerciseQuestions data={faq} mutate={mutate} />
        <Tooltip title="Delete" followCursor placement="top-start" arrow>
          <button
            className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
            onClick={handleDelete}
          >
            <DeleteOutline fontSize="small" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
