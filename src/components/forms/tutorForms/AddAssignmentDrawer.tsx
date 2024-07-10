import { Add, Close, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Container, Drawer, Tooltip } from "@mui/material";
import AddQuestionDialog from "./AddQuestionDialog";
import * as React from "react";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import UpdateQuestionDialog from "./UpdateQuestionDialog";
import { useAppContext } from "contexts";
import { deleteContent, lectureSectionPage } from "locale";
import { useSWRAPI } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import useMutation from "hooks/useMutataion";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setOpenEditPrescriptionDrawer: any;
  mutate?: any;
  activeData?: any;
};

const AddAssignmentDrawer = ({
  open,
  onClose,
  setOpenEditPrescriptionDrawer,
}: Props) => {
  const { selectedLanguage } = useAppContext();
  const router = useRouter();
  const { data, mutate } = useSWRAPI(
    `tutor/assignment-question?sectionId=${router?.query?.videoId}`
  );

  const { mutation } = useMutation();

  const handleDelete = (questionId?: string) => {
    try {
      Swal.fire({
        title: deleteContent(selectedLanguage).Warning,
        text: deleteContent(selectedLanguage).Areyousureyouwanttodelete,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: deleteContent(selectedLanguage).yes,
        cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      }).then((result) => {
        if (result.isConfirmed) {
          const res = mutation(
            `tutor/delete-question?questionId=${questionId}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );
          mutate();
          return;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded-md cursor-pointer"
        onClick={setOpenEditPrescriptionDrawer(true)}
      >
        <Add className="text-2xl" />
        <p className="text-lg font-medium">
          {lectureSectionPage(selectedLanguage).addMcqAssessment}
        </p>
      </div>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "80vw",
            marginTop: "3vh",
          }}
        >
          <div className="w-full flex items-center">
            <div
              className="basis-[20%] cursor-pointer"
              onClick={() => onClose && onClose()}
            >
              <Close className="text-3xl" />
            </div>
            <div className="basis-[80%] text-center mr-20">
              <h1 className="text-3xl font-bold text-primary">
                {lectureSectionPage(selectedLanguage).createAssignment}
              </h1>
            </div>
          </div>
          <div className="mt-4">
            <AddQuestionDialog mutate={mutate} />
          </div>
          <div className="mt-3 flex flex-col gap-6 p-2">
            {data?.data?.data?.map((QST: any, index: number) => (
              <QuestionCont
                key={QST.id}
                data={QST}
                index={index}
                closeModal={() => {
                  onClose();
                }}
                handleDelete={handleDelete}
                mutate={mutate}
              />
            ))}
          </div>
          {/* <div className="w-full flex items-center justify-center mt-10 mb-10">
            <button className="w-[60%] m-auto bg-primary/90 text-xl py-2 font-bold text-white rounded-md hover:bg-primary duration-300">
              {lectureSectionPage(selectedLanguage).createAssignment}
            </button>
          </div> */}
        </Container>
      </Drawer>
    </div>
  );
};

export default AddAssignmentDrawer;

type QUESTION_TYPE = {
  _id: string;
  answer: string;
  question: string;
  options: string[];
  marks: string;
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
    <div className="relative group flex flex-col bg-gray-100 px-4 py-2 rounded-md shadow-md cursor-pointer">
      <div className=" flex flex-row-reverse justify-between gap-7 text-xl font-medium">
        <div className="whitespace-nowrap">
          <div>
            <p className="font-semibold text-lg text-primary pr-6">
              {lectureSectionPage(selectedLanguage).mark} : {data?.marks}
            </p>
            <p>
              {lectureSectionPage(selectedLanguage).answer} : {data?.answer}
            </p>
          </div>
        </div>
        <div className="flex flex-col overflow-scroll">
          <p>
            <span className="text-2xl font-bold mr-3">{index + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: data?.question }} />
          </p>
          <div className="flex flex-col">
            {data?.options.map((option: string, index: number) => (
              <div className="flex gap-1 items-center" key={index}>
                <Radio {...controlProps(option)} color="success" />
                <p className="text-lg font-bold">{option}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="invisible absolute bottom-2 -right-8 opacity-0 flex flex-col gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible">
        <UpdateQuestionDialog mutate={mutate} data={data} />

        <Tooltip
          title={lectureSectionPage(selectedLanguage).DeleteQuestion}
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
        </Tooltip>
      </div>
    </div>
  );
};
