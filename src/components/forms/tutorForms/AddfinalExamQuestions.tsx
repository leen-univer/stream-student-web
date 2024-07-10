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
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { assignmentexam, lectureSectionPage } from "locale";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
export default function AddFinalExamQuestions({
  mutate,
  onClose,
  finalCreateMutate,
}: {
  mutate: () => void;
  onClose: any;
  finalCreateMutate: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState<string>("");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [options, setOptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { selectedLanguage } = useAppContext();

  const { mutation, isLoading } = useMutation();
  const router = useRouter();

  const { data: finalExamData, mutate: finalExamMutate } = useSWRAPI(
    `tutor/get-exam?courseId=${router?.query?.sectionId}`
  );

  const totalMarks = finalExamData?.data?.data?.examData?.reduce(
    (total: any, question: any) => total + question.marks,
    0
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createOption = (e: any) => {
    e.preventDefault();
    if (value && value !== " ") {
      setOptions((prevOptions) => [...prevOptions, value.trim()]);
      setValue("");
      formik.setFieldValue("options", [...formik.values.options, value.trim()]);
      formik.setFieldError("options", undefined);
    }
  };

  const deleteOption = (id: number) => {
    setOptions(options.filter((option, index) => index !== id));
  };

  // create the questions

  const formik = useFormik({
    initialValues: {
      question: "",
      mark: "",
      answer: "",
      options: [],
      hint: "",
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
        formData?.append("marks", values?.mark);
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

        res = await mutation(
          `tutor/create-final-exam?courseId=${router?.query?.sectionId}`,
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
      } catch (error) {}
    },
  });

  // create the final exam

  const newFormik = useFormik({
    initialValues: {
      title: "",
      skills: "",
      passMark: "",
      totalNumberOfQuestion: Number(
        finalExamData?.data?.data?.examData?.length
      ),
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .required(`${assignmentexam(selectedLanguage).Titlereq}`),
      skills: yup
        .string()
        .required(`${assignmentexam(selectedLanguage).SkillsSpan}`),
      passMark: yup
        .number()
        .required(`${assignmentexam(selectedLanguage).Passmarkreq}`)
        .positive(`${assignmentexam(selectedLanguage).passmarkpositive}`)
        .max(
          totalMarks,
          `${assignmentexam(selectedLanguage).totalmarkgreater}`
        ),
    }),
    onSubmit: async (values) => {
      try {
        const res = await mutation(
          `finalAnswer/final-assignment-data?courseId=${router?.query?.sectionId}`,
          {
            method: "POST",
            body: {
              title: values.title,
              skills: values.skills,
              fullMarks: totalMarks,
              passMarks: values.passMark,
              totalNumberOfQuestion:
                finalExamData?.data?.data?.examData?.length,
            },
          }
        );
        finalExamMutate();
        finalCreateMutate();
        onClose();
        newFormik.resetForm();
      } catch (error) {}
    },
  });

  return (
    <React.Fragment>
      <aside className=" p-4">
        <div className="w-[80%] m-auto">
          {/* add title  */}
          <div className="mb-4">
            <label className="block text-primary text-lg font-semibold">
              {assignmentexam(selectedLanguage).Title}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={newFormik.values.title}
              onChange={newFormik.handleChange}
              onBlur={newFormik.handleBlur}
              className="w-full border border-primary rounded-md p-2"
              placeholder={assignmentexam(selectedLanguage).EnterTitle}
            />
            {newFormik.touched.title && newFormik.errors.title && (
              <div className="text-base text-red-600 mt-2">
                {newFormik.errors.title}
              </div>
            )}
          </div>
          {/* skills Gain */}
          <div className="mb-4">
            <label className="block text-primary text-lg font-semibold">
              {assignmentexam(selectedLanguage).SkillsGain}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="skills"
              value={newFormik.values.skills}
              onChange={newFormik.handleChange}
              onBlur={newFormik.handleBlur}
              className="w-full border border-primary rounded-md p-2"
              placeholder={assignmentexam(selectedLanguage).SkillsPlace}
            />
            {newFormik.touched.skills && newFormik.errors.skills && (
              <div className="text-base text-red-600 mt-2">
                {newFormik.errors.skills}
              </div>
            )}
          </div>
          {/* add questions */}
          <div className="mt-4">
            <label className="block text-primary text-lg font-semibold">
              <p>
                {lectureSectionPage(selectedLanguage).addQuestion}
                <span className="text-red-500">*</span>
              </p>
              <p>
                {finalExamData?.data?.data?.examData?.length < 5 && (
                  <span className="text-base font-medium text-red-600 mt-2">
                    {
                      assignmentexam(selectedLanguage)
                        .Theremustbeatleast5questions
                    }
                  </span>
                )}
              </p>
            </label>
            <div
              onClick={handleClickOpen}
              className="w-full cursor-pointer justify-center flex items-center gap-1 border border-gray-400 text-primary px-3 py-1 rounded-md text-lg font-medium"
            >
              <Add className="text-2xl" />
            </div>
          </div>
          {/* total marks */}
          <div className="mt-4">
            <label className="block text-primary text-lg font-semibold">
              {assignmentexam(selectedLanguage).TotalMarkCount}: {totalMarks}
            </label>
          </div>
          {/* total question created  */}
          <div className="mt-4">
            <label className="block text-primary text-lg font-semibold">
              {assignmentexam(selectedLanguage).TotalQuestionCreated} :{" "}
              {finalExamData?.data?.data?.examData?.length}
            </label>
          </div>
          {/* passMark  */}
          <div className="mt-4">
            <label className="block text-primary text-lg font-semibold">
              {assignmentexam(selectedLanguage).PassMark}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="passMark"
              value={newFormik.values.passMark}
              onChange={newFormik.handleChange}
              onBlur={newFormik.handleBlur}
              className="w-full border border-primary rounded-md p-2"
              placeholder={assignmentexam(selectedLanguage).setpassmark}
            />
            {newFormik.touched.passMark && newFormik.errors.passMark && (
              <div className="text-base text-red-600 mt-2">
                {newFormik.errors.passMark}
              </div>
            )}
          </div>
          {/* submit btn */}
          <div className="mt-4">
            <button
              type="submit"
              onClick={() => newFormik.handleSubmit()}
              className="w-full bg-primary/80 hover:bg-primary text-white text-lg font-semibold rounded-md py-2 hover:bg-primary-dark"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  {lectureSectionPage(selectedLanguage).creating}
                </>
              ) : (
                <>{lectureSectionPage(selectedLanguage).createFinalTest}</>
              )}
            </button>
          </div>
        </div>
      </aside>

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

              <span className="text-base text-red-600 ">
                {formik.touched.mark && formik.errors.mark}
              </span>

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
                // className="bg-primary/90 w-[30%] py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md"
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    {lectureSectionPage(selectedLanguage).adding}
                  </>
                ) : (
                  lectureSectionPage(selectedLanguage).addQuestionBtn
                )}
                {}
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
  formik: FormikProps<any>;
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
  const isChecked = option === correctAnswer;

  React.useEffect(() => {
    if (isChecked) {
      formik.setFieldError("answer", undefined);
    }
  }, [isChecked]);

  const toggleCheckbox = () => {
    if (isChecked) {
      setCorrectAnswer("");
      formik.setFieldError("answer", undefined);
    } else {
      setCorrectAnswer(option);
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
