import { Add, Close } from "@mui/icons-material";
import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppContext } from "contexts";
import { FormikProps, useFormik } from "formik";
import useMutation from "hooks/useMutataion";
import { assignmentexam, lectureSectionPage } from "locale";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function QuizFormDialog({ mutate }: { mutate: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState<string>("");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [options, setOptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { selectedLanguage } = useAppContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { mutation, isLoading } = useMutation();
  const router = useRouter();

  const createOption = (e: any) => {
    e.preventDefault();
    if (value && value.trim() !== "") {
      setOptions((prevOptions) => [...prevOptions, value.trim()]);
      setValue("");
      formik.setFieldValue("options", [...formik.values.options, value.trim()]);
      formik.setFieldError("options", undefined);
    }
  };

  const deleteOption = (id: number) => {
    setOptions(options.filter((option, index) => index !== id));
  };

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
      options: [],
      answerExplanation: "",
      hint: "",
    },

    validationSchema: yup.object({
      question: yup
        .string()
        .required(`${lectureSectionPage(selectedLanguage).questionSpan}`),
      options: yup
        .array()
        .of(
          yup
            .string()
            .required(`${assignmentexam(selectedLanguage).entervalue}`)
        )
        .min(2, `${assignmentexam(selectedLanguage).atleast2option}`),
    }),

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;
        formData?.append("answerExplanation", values?.answerExplanation);
        formData?.append("hint", values?.hint);
        formData?.append("question", values?.question);
        if (Boolean(!correctAnswer)) {
          formik.setFieldError(
            "answer",
            `${assignmentexam(selectedLanguage).correctanswer}`
          );
          return;
        }
        formData?.append("answer", correctAnswer);
        options.forEach((option, index) => {
          formData?.append(`options`, option);
        });
        formData?.append("questionType", "MCQ");

        if (router?.query?.quizzeId) {
          res = await mutation(
            `quizQuestion/create-quizQuestion/${router?.query?.quizzeId}`,
            {
              method: "POST",
              body: formData,
              isFormData: true,
              isAlert: true,
            }
          );
          mutate?.();
          handleClose();
          formik.resetForm();
          setOptions([]);
        } else {
        }
      } catch (error) {}
    },
  });

  return (
    <React.Fragment>
      <div
        onClick={handleClickOpen}
        className="cursor-pointer justify-center flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded-md"
      >
        <Add className="text-2xl" />
        <p className="text-lg font-medium">
          {lectureSectionPage(selectedLanguage).addQuestion}
        </p>
      </div>

      <Dialog
        fullWidth={fullWidth}
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {lectureSectionPage(selectedLanguage).addQuestion}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <form>
              <div className="h-40">
                <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                  {lectureSectionPage(selectedLanguage).question}
                  <span className="text-red-500">*</span>
                </label>
                <FormControl className="!w-full">
                  <ReactQuill
                    modules={modules}
                    formats={formats}
                    className="h-20"
                    value={formik?.values?.question}
                    onChange={(value) => {
                      formik?.setFieldValue("question", value);
                    }}
                    onBlur={() => {
                      formik.setFieldTouched("question", true);
                    }}
                  />
                  <FormHelperText className="!text-red-600">
                    {formik?.touched?.question &&
                      (formik?.errors?.question as any)}
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="h-40">
                <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                  {lectureSectionPage(selectedLanguage).answerExplanation}
                  {/* <span className="text-red-500">*</span> */}
                </label>
                <FormControl className="!w-full">
                  <ReactQuill
                    modules={modules}
                    formats={formats}
                    placeholder={
                      lectureSectionPage(selectedLanguage).answeExplainPlace
                    }
                    className="h-20"
                    value={formik?.values?.answerExplanation}
                    onChange={(value) => {
                      formik?.setFieldValue("answerExplanation", value);
                    }}
                    onBlur={() => {
                      formik.setFieldTouched("answerExplanation", true);
                    }}
                  />
                  <FormHelperText className="!text-red-600">
                    {formik?.touched?.answerExplanation &&
                      (formik?.errors?.answerExplanation as any)}
                  </FormHelperText>
                </FormControl>
              </div>

              <label className="mt-3 mb-2 block text-xl font-semibold text-primary">
                {lectureSectionPage(selectedLanguage).hint}
                {/* <span className="text-red-500">*</span> */}
              </label>
              <input
                type="text"
                placeholder={lectureSectionPage(selectedLanguage).HintPlace}
                className="bg-white text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full "
                name="hint"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hint}
              />

              {/* <span className="text-base text-red-600 ">
                {formik.touched.mark && formik.errors.mark}
              </span> */}

              <label className="mt-3 mb-4 block text-xl font-semibold text-primary">
                {lectureSectionPage(selectedLanguage).options}
                <span className="text-red-500">*</span>
                <span className="text-gray-500 text-md ml-2">
                  {
                    assignmentexam(selectedLanguage)
                      .Pleaseaddoptionsbelowandselectthecorrectanswerbycheckingthebox
                  }
                </span>
                {formik.touched.options && formik.errors.options && (
                  <div className="text-base text-red-600 ">
                    {formik.errors.options}
                  </div>
                )}
                {formik.touched.answer && formik?.errors.answer && (
                  <div className="text-base text-red-600 ">
                    {formik.errors.answer}
                  </div>
                )}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {options.map((option, index) => (
                  <OptionCont
                    option={option}
                    key={index}
                    id={index}
                    value={option}
                    deleteOption={deleteOption}
                    correctAnswer={correctAnswer}
                    setCorrectAnswer={setCorrectAnswer}
                    formik={formik}
                  />
                ))}
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder={
                      lectureSectionPage(selectedLanguage).optionsPlace
                    }
                    value={value}
                    onChange={(e: any) => setValue(e.target.value)}
                    className={`bg-white h-11 mr-3 text-lg block w-full rounded-md border-2 px-4 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full`}
                  />
                  <div className="flex items-center">
                    <button
                      className="bg-primary rounded-md px-4 py-2 font-bold text-white text-xl"
                      onClick={createOption}
                    >
                      {lectureSectionPage(selectedLanguage).add}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="w-full flex items-center justify-center mt-10">
              <button
                type="submit"
                onClick={() => formik.handleSubmit()}
                disabled={formik.isSubmitting}
                className={`bg-primary/90 px-8 py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md ${
                  formik.isSubmitting ? "opacity-50" : "opacity-100"
                }`}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} color="warning" />{" "}
                    {lectureSectionPage(selectedLanguage).adding}
                  </>
                ) : (
                  lectureSectionPage(selectedLanguage).addQuestionBtn
                )}
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="absolute top-2 right-5">
          <Close
            onClick={handleClose}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

type OPTION_TYPE = {
  option: any;
  correctAnswer: string;
  setCorrectAnswer: any;
  value: string;
  id: number;
  formik: FormikProps<any>;
  deleteOption: (key: number) => void;
};
const OptionCont = ({
  setCorrectAnswer,
  option,
  value,
  deleteOption,
  id,
  correctAnswer,
  formik,
}: OPTION_TYPE) => {
  const isChecked = option === correctAnswer; // Check if the option is the correct answer

  React.useEffect(() => {
    if (isChecked) {
      formik.setFieldError("answer", undefined);
    }
  }, [isChecked]);

  const toggleCheckbox = () => {
    if (isChecked) {
      // If the option is already the correct answer, uncheck it
      setCorrectAnswer(""); // Set as no correct answer
      formik.setFieldError("answer", undefined);
    } else {
      // If the option is not the correct answer, check it
      setCorrectAnswer(option); // Set as correct answer
    }
  };

  const deleteOptionCont = (e: any) => {
    e.preventDefault();
    deleteOption(id);
  };
  const { selectedLanguage } = useAppContext();

  return (
    <div className="flex items-center justify-center">
      <Checkbox
        color="success"
        sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
        checked={isChecked}
        onChange={toggleCheckbox} // Handle the checkbox state change
      />
      <input
        type="text"
        value={value}
        readOnly
        className={`bg-white h-11 mr-3 text-lg block w-full rounded-md border-2 px-4 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full `}
      />
      <div className="flex items-center">
        <button
          className="bg-red-500 rounded-md px-2 py-[0.4rem] font-bold text-white text-xl"
          onClick={deleteOptionCont}
        >
          {assignmentexam(selectedLanguage).remove}
        </button>
      </div>
    </div>
  );
};
