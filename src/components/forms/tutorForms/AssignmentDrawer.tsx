import { Add, Close, DeleteOutline } from "@mui/icons-material";
import { Container, Drawer, Tooltip } from "@mui/material";
import AddQuestionDialog from "./AddQuestionDialog";
import * as React from "react";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import ViewAssignmentDialog from "./ViewAssignmentDialog";
import ViewAddQuestionDialog from "./ViewAddQuastionDialog";
import { useAppContext } from "contexts";
import { assignmentPage } from "locale";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setOpenEditPrescriptionDrawer: any;
  mutate?: any;
  activeData?: any;
  topic: string;
};

const ASSIGNMENT_ARR = [
  {
    id: "1",
    title: "Assignment-1",
  },
  {
    id: "2",
    title: "Assignment-2",
  },
  {
    id: "3",
    title: "Assignment-3",
  },
  {
    id: "4",
    title: "Assignment-4",
  },
  {
    id: "5",
    title: "Assignment-5",
  },
];

const AssignmentDrawer = ({
  open,
  onClose,
  setOpenEditPrescriptionDrawer,
  topic,
}: Props) => {
  const { selectedLanguage } = useAppContext();

  return (
    <div>
      <div onClick={setOpenEditPrescriptionDrawer(true)}>
        <h1 className="text-xl font-medium text-blue-500 hover:text-blue-600 cursor-pointer underline">
          {topic}
        </h1>
      </div>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "30vw",
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
                {assignmentPage(selectedLanguage).assignemnts}
              </h1>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-6 p-2">
            {ASSIGNMENT_ARR.map((assignment) => (
              <Assignment key={assignment.id} title={assignment.title} />
            ))}
          </div>
        </Container>
      </Drawer>
    </div>
  );
};

export default AssignmentDrawer;

type ASSIGNMENT_TYPE = {
  title: string;
};
const Assignment = ({ title }: ASSIGNMENT_TYPE) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded-md shadow-md">
      <ViewAssignmentDialog title={title} />

      <div className="flex items-center gap-3">
        <Tooltip
          title="Delete Assignments"
          followCursor
          placement="top-start"
          arrow
        >
          <button className="w-10 h-10 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500">
            <DeleteOutline />
          </button>
        </Tooltip>
        <ViewAddQuestionDialog />
      </div>
    </div>
  );
};
