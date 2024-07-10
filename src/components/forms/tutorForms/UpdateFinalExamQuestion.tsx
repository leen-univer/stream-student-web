import { Close, EditOutlined } from "@mui/icons-material";
import { Checkbox, FormControl, FormHelperText, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import useMutation from "hooks/useMutataion";
import { assignmentexam, lectureSectionPage } from "locale";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function UpdateFinalExamQuestion({
  mutate,
  data,
}: {
  mutate: () => void;
  data: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState<string>(
    data?.answer || ""
  );
  const [fullWidth, setFullWidth] = React.useState(true);
  const [options, setOptions] = React.useState<string[]>(data?.options || []);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { selectedLanguage } = useAppContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { mutation } = useMutation();
  const router = useRouter();

  const createOption = (e: any) => {
    e.preventDefault();
    if (value && value !== " ") {
      setOptions((prevOptions) => [...prevOptions, value.trim()]);
      setValue("");
    }
  };

  const deleteOption = (id: number) => {
    setOptions(options.filter((option, index) => index !== id));
  };
  // const optionsString = options.join(", ");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: data?.question,
      mark: data?.marks,
      hint: data?.hint,
      answer: data?.answer,
    },
    validationSchema: yup.object({
      question: yup
        .string()
        .required(`${lectureSectionPage(selectedLanguage).questionSpan}`),
      mark: yup
        .string()
        .required(`${lectureSectionPage(selectedLanguage).markSpan}`)
        .test(
          "non-negative",
          `${assignmentexam(selectedLanguage).Valuepositive}`,
          (value) => {
            return parseFloat(value) >= 0;
          }
        ),
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
        formData?.append("marks", values?.mark);
        formData?.append("hint", values?.hint);
        formData?.append("question", values?.question);
        formData?.append("answer", correctAnswer);
        options.forEach((option, index) => {
          formData?.append(`options`, option);
        });
        // formData?.append("questionType", "MCQ");
        formData?.append("questionId", data?._id);

        res = await mutation(
          `tutor/update-exam-question?courseId=${router?.query?.sectionId}`,
          {
            method: "PUT",
            body: formData,
            isFormData: true,
            isAlert: true,
          }
        );
        mutate();
        handleClose();
        formik.resetForm();
      } catch (error) {}
    },
  });

  return (
    <React.Fragment>
      <Tooltip
        title={assignmentexam(selectedLanguage).updateQuestion}
        followCursor
        placement="top-start"
        arrow
      >
        <button
          onClick={handleClickOpen}
          className="w-8 h-8 grid place-items-center rounded-full border border-emerald-500 bg-emerald-500/10 text-emerald-500"
        >
          <EditOutlined fontSize="small" />
        </button>
      </Tooltip>

      <Dialog
        fullWidth={fullWidth}
        maxWidth="md"
        open={open}
        onClose={() => {
          handleClose();
          formik.resetForm();
        }}
      >
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {lectureSectionPage(selectedLanguage).updateQuestion}
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
              <label className="mt-3 mb-2 block text-xl font-semibold text-primary">
                {lectureSectionPage(selectedLanguage).mark}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder={lectureSectionPage(selectedLanguage).markPlace}
                className={`bg-white text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full ${
                  formik.touched.mark && Boolean(formik.errors.mark)
                    ? "dark:border-red-600"
                    : "dark:border-gray-400"
                }`}
                name="mark"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mark}
              />

              {/* <span className="text-base text-red-600">
                {formik.touched.mark && formik.errors.mark}
              </span> */}

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

              <label className="mt-3 mb-2 block text-xl font-semibold text-primary">
                {lectureSectionPage(selectedLanguage).options}
                <span className="text-red-500">*</span>
                <span className="text-gray-500 text-md ml-2">
                  (
                  {
                    assignmentexam(selectedLanguage)
                      .Pleaseaddoptionsbelowandselectthecorrectanswerbycheckingthebox
                  }
                  )
                </span>
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
                // className="bg-primary/90 w-[30%] py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md"
              >
                {lectureSectionPage(selectedLanguage).updateQuestionBtn}
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
  deleteOption: (key: number) => void;
};
const OptionCont = ({
  setCorrectAnswer,
  option,
  value,
  deleteOption,
  id,
  correctAnswer,
}: OPTION_TYPE) => {
  const isChecked = option === correctAnswer; // Check if the option matches the initial correct answer

  const toggleCheckbox = () => {
    if (isChecked) {
      setCorrectAnswer(""); // Set as no correct answer
    } else {
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
        checked={isChecked} // Check if this option is the correct answer
        onChange={toggleCheckbox}
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
