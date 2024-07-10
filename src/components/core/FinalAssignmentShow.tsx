import { DeleteOutline } from "@mui/icons-material";
import { Radio, Tooltip } from "@mui/material";
import { AddQuestionDialog, UpdateQuestionDialog } from "components/forms";
import { TutorPanelLayout } from "layouts";

import ViewAddQuestionDialog from "components/forms/tutorForms/ViewAddQuastionDialog";
import React from "react";
import useMutation from "hooks/useMutataion";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useSWRAPI } from "hooks";
import { useAppContext } from "contexts";
import { studentPanel } from "locale";

const FinalAssignmentShow = () => {
  const { selectedLanguage } = useAppContext();
  const router = useRouter();
  const { data, mutate } = useSWRAPI(
    `tutor/get-exam?courseId=${router?.query?.courseID}`
  );

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-end items-center">
        <div className="w-1/6">
          {/* <AddQuestionDialog mutate={mutate} /> */}
        </div>
        {/* <Tooltip
            title="Delete Assignments"
            followCursor
            placement="top-start"
            arrow
          >
            <button className="w-10 h-10 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500">
              <DeleteOutline />
            </button>
          </Tooltip> */}
      </div>
      <QuestionSection data={data?.data?.data?.examData} mutate={mutate} />
    </div>
  );
};

export default FinalAssignmentShow;

type TOPIC_ASSIGNMENT = {
  topic: string;
  numberOfAssignment: number;
};

const QuestionSection = ({
  data,
  mutate,
}: {
  data: any;
  mutate: () => void;
}) => {
  const { mutation } = useMutation();
  const handleDelete = (questionId?: string) => {
    // try {
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: "You want to delete the question!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, delete it!",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       const res = mutation(
    //         `tutor/delete-question?questionId=${questionId}`,
    //         {
    //           method: "DELETE",
    //           isAlert: true,
    //         }
    //       );
    //       mutate();
    //       return;
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const { selectedLanguage } = useAppContext();

  return (
    <>
      {data?.length === 0 ? (
        <div>
          <h1 className="text-3xl font-bold text-primary text-center pb-2">
            {studentPanel(selectedLanguage).AssignmentReview}
          </h1>
          <p className="text-2xl mt-6 capitalize text-center">
            {studentPanel(selectedLanguage).NoQuestion}
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-primary text-center pb-2">
            {studentPanel(selectedLanguage).ReviewQA}
          </h1>
          <div className="max-h-full overflow-scroll flex flex-col gap-5 overflow-x-hidden">
            {data?.map((QST: any, index: number) => (
              <QuestionCont
                key={QST.id}
                data={QST}
                index={index}
                closeModal={() => {}}
                handleDelete={handleDelete}
                mutate={mutate}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

type QUESTION_TYPE = {
  _id: string;
  topic: string;
  description: string;
  answer: string;
  question: string;
  marks: string;
  options: string[];
};

const QuestionCont = ({
  data,
  index,
  handleDelete,
  closeModal,
  mutate,
}: {
  data: QUESTION_TYPE;
  index: number;
  handleDelete: any;
  closeModal: any;
  mutate: () => void;
}) => {
  const [selectedValue, setSelectedValue] = React.useState("");

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

  const handleCloseDelete = (id: string) => {
    handleDelete(id);
    closeModal();
  };
  const { selectedLanguage } = useAppContext();

  return (
    <div className="relative group flex flex-col bg-blue-100/50 shadow-sm px-4 py-2 rounded-md cursor-pointer">
      <div className=" flex flex-row-reverse justify-between gap-7 text-xl font-medium">
        <div className="whitespace-nowrap text-right">
          <p className="font-semibold text-lg text-primary">
            {studentPanel(selectedLanguage).Marks} : {data?.marks}
          </p>
          <p>
            {studentPanel(selectedLanguage).Answer} : {data?.answer}
          </p>
        </div>
        <div className="flex flex-col">
          <p>
            <span className="text-2xl font-bold mr-3">{index + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: data?.question }} />
          </p>
          <div className="flex flex-col">
            {data?.options?.map((option: string, index: number) => (
              <div className="flex gap-1 items-center" key={index}>
                <Radio {...controlProps(option)} color="success" />
                <p className="text-lg font-bold">{option}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="invisible absolute bottom-2 -right-8 opacity-0 flex flex-col gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible">
        {/* <UpdateQuestionDialog mutate={mutate} data={data} /> */}

        {/* <Tooltip
          title="Delete Question"
          followCursor
          placement="top-start"
          arrow
        >
          <button
            onClick={() => {
              handleCloseDelete(data?._id);
            }}
            className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
          >
            <DeleteOutline fontSize="small" />
          </button>
        </Tooltip> */}
      </div>
    </div>
  );
};

// const AssignmentCard = ({ topic, numberOfAssignment }: TOPIC_ASSIGNMENT) => {
//   const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
//     useState(false);
//   const { selectedLanguage } = useAppContext();
//   return (
//     <div className="bg-white flex justify-between items-center py-2 px-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border-t-2 border-primary rounded-md hover:-translate-y-2 duration-300">
//       <div className="flex items-center gap-6">
//         <Description className="!text-5xl text-primary" />
//         <div>
//           <AssignmentDrawer
//             open={openEditPrescriptionDrawer}
//             setOpenEditPrescriptionDrawer={() => setOpenEditPrescriptionDrawer}
//             onClose={() => setOpenEditPrescriptionDrawer(false)}
//             topic={topic}
//           />
//           <div className="flex gap-6 items-center text-md font-bold text-gray-700 mt-1">
//             <p className="text-lg">
//               {assignmentPage(selectedLanguage).noOfAssignments}
//               <span className="text-primary ml-2 text-xl mr-2">
//                 {numberOfAssignment}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="flex gap-3">
//         <Tooltip
//           title="Delete Assignments"
//           followCursor
//           placement="top-start"
//           arrow
//         >
//           <button className="w-12 h-12 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500">
//             <DeleteOutline />
//           </button>
//         </Tooltip>
//       </div>
//     </div>
//   );
// };
