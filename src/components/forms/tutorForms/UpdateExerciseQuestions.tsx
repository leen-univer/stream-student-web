import { Add, Close, EditOutlined, HelpOutline } from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import useMutation from "hooks/useMutataion";
import { courseSectionPage, dataContent, lectureSectionPage } from "locale";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";

type props = {
  _id: string;
  question: string;
  hint: string;
};

export default function UpdateExerciseQuestions({
  mutate,
  data,
}: {
  mutate?: () => void;
  data?: props;
}) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [loading, setLoading] = React.useState(false);
  const { selectedLanguage } = useAppContext();
  const router = useRouter();
  const { mutation, isLoading } = useMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const schema = yup.object({
    question: yup
      .string()
      .required(`${courseSectionPage(selectedLanguage).questionSpan}`)
      .min(10, `${dataContent(selectedLanguage).Min10letter}`)
      .max(1000, `${dataContent(selectedLanguage).Max1000letter}`),
    hint: yup
      .string()
      .min(10, `${dataContent(selectedLanguage).Min3letter}`)
      .max(1000, `${dataContent(selectedLanguage).Max1000letter}`),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data
      ? {
          question: data?.question,
          hint: data?.hint,
        }
      : {
          question: "",
          hint: "",
        },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData?.append("question", values?.question);
        formData?.append("hint", values?.hint);
        const res = await mutation(
          `longQuestion/update-long-question/${data?._id}`,
          {
            method: "PUT",
            body: formData,
            isFormData: true,
            isAlert: true,
          }
        );
        mutate?.();
        handleClose();
        formik.resetForm();
        return;
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <React.Fragment>
      <Tooltip title="edit" followCursor placement="top-start" arrow>
        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 grid place-items-center rounded-full border border-amber-500 bg-amber-500/10 text-amber-500"
        >
          <EditOutlined fontSize="small" />
        </button>
      </Tooltip>
      <Dialog
        fullWidth={fullWidth}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {courseSectionPage(selectedLanguage).updateQuestion}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <form onSubmit={formik.handleSubmit}>
              <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                {courseSectionPage(selectedLanguage).question}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="question"
                id="question"
                placeholder={courseSectionPage(selectedLanguage).enterQuestion}
                className={`bg-white text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full  ${
                  formik.touched.question && Boolean(formik.errors.question)
                    ? "dark:border-red-600"
                    : "dark:border-gray-400"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.question}
              ></textarea>

              <p className="text-base text-red-600 mt-1">
                {formik.touched.question && formik.errors.question}
              </p>
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
              <p className="text-base text-red-600 mt-1">
                {formik.touched.hint && formik.errors.hint}
              </p>
              <div className="w-full flex items-center justify-center mt-6">
                <button
                  type="submit"
                  className="bg-primary/90 w-[30%] py-3  text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md"
                  disabled={loading && formik.isSubmitting}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        color="inherit"
                        size={20}
                        style={{ marginRight: 10 }}
                      />
                      {courseSectionPage(selectedLanguage).Updating}
                    </>
                  ) : (
                    courseSectionPage(selectedLanguage).update
                  )}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions className="absolute top-2 right-3">
          <Close
            onClick={handleClose}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
