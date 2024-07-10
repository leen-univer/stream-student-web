import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Add, Close, DeleteOutline, EditOutlined } from "@mui/icons-material";
import FileUpload from "components/core/FileUpload";
import { useFormik } from "formik";
import * as yup from "yup";
import { Radio, Tooltip } from "@mui/material";
import UpdateQuestionDialog from "./UpdateQuestionDialog";
import { data } from "autoprefixer";

type VIEW_ASSIGNMENT = {
  title: string;
};

const QUESTION_ARR = [
  {
    id: "1",
    questionNumber: 1,
    question:
      "consectetur adipisicing elit. Maxime mollitia, molestiae quas vel consequuntur voluptatum laborum numquam blanditiis harum quisquam",
    options: [
      {
        id: "1",
        alpha: "a",
        name: "option-1",
      },
      {
        id: "2",
        alpha: "b",
        name: "option-2",
      },
      {
        id: "3",
        alpha: "c",
        name: "option-3",
      },
      {
        id: "4",
        alpha: "d",
        name: "option-4",
      },
    ],
  },
  {
    id: "2",
    questionNumber: 2,
    question:
      "consectetur adipisicing elit. Maxime mollitia, molestiae quas vel consequuntur voluptatum laborum numquam blanditiis harum quisquam",
    options: [
      {
        id: "1",
        alpha: "a",
        name: "option-1",
      },
      {
        id: "2",
        alpha: "b",
        name: "option-2",
      },
      {
        id: "3",
        alpha: "c",
        name: "option-3",
      },
      {
        id: "4",
        alpha: "d",
        name: "option-4",
      },
    ],
  },
  {
    id: "3",
    questionNumber: 3,
    question:
      "consectetur adipisicing elit. Maxime mollitia, molestiae quas vel consequuntur voluptatum laborum numquam blanditiis harum quisquam",
    options: [
      {
        id: "1",
        alpha: "a",
        name: "option-1",
      },
      {
        id: "2",
        alpha: "b",
        name: "option-2",
      },
      {
        id: "3",
        alpha: "c",
        name: "option-3",
      },
      {
        id: "4",
        alpha: "d",
        name: "option-4",
      },
    ],
  },
  {
    id: "4",
    questionNumber: 4,
    question:
      "consectetur adipisicing elit. Maxime mollitia, molestiae quas vel consequuntur voluptatum laborum numquam blanditiis harum quisquam",
    options: [
      {
        id: "1",
        alpha: "a",
        name: "option-1",
      },
      {
        id: "2",
        alpha: "b",
        name: "option-2",
      },
      {
        id: "3",
        alpha: "c",
        name: "option-3",
      },
      {
        id: "4",
        alpha: "d",
        name: "option-4",
      },
    ],
  },
];
export default function ViewAssignmentDialog({ title }: VIEW_ASSIGNMENT) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1
        className="text-xl font-semibold text-blue-500 hover:text-blue-600 cursor-pointer"
        onClick={handleClickOpen}
      >
        {title}
      </h1>

      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <h1 className="text-3xl font-bold text-primary text-center py-5">
          {title}
        </h1>
        <DialogContent>
          <div className="max-h-full overflow-scroll flex flex-col gap-5 overflow-x-hidden">
            {QUESTION_ARR.map((QST) => (
              <QuestionCont
                key={QST.id}
                questionNumber={QST.questionNumber}
                question={QST.question}
                options={QST.options}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions className="absolute top-2 right-5">
          <Close
            onClick={handleClose}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

type QUESTION_TYPE = {
  questionNumber: number;
  question: string;
  options: {
    id: string;
    alpha: string;
    name: string;
  }[];
};
const QuestionCont = ({ questionNumber, question, options }: QUESTION_TYPE) => {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div className="relative group flex flex-col bg-gray-100 px-4 py-2 rounded-md shadow-md cursor-pointer">
      <p className="text-xl font-medium">
        <span className="text-2xl font-bold mr-3">{questionNumber}</span>
        {question}
      </p>
      <div className="flex gap-4 items-center mt-2">
        {options.map((option, i) => (
          <div className="flex gap-1 items-center" key={option.id}>
            <Radio {...controlProps(`${option.alpha}`)} color="success" />
            <p className="text-lg font-bold">{option.name}</p>
          </div>
        ))}
      </div>
      <div className="invisible absolute bottom-2 -right-8 opacity-0 flex flex-col gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible">
        {/* <UpdateQuestionDialog mutate={mutate} data={data} /> */}

        <Tooltip
          title="Delete Question"
          followCursor
          placement="top-start"
          arrow
        >
          <button className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500">
            <DeleteOutline fontSize="small" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
