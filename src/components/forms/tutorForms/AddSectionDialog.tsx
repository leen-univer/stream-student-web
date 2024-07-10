import { Add, Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import useMutation from "hooks/useMutataion";
import { courseSectionPage, dataContent } from "locale";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";

export default function AddSectionDialog({ mutate }: { mutate?: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [loading, setLoading] = React.useState(false);
  const { selectedLanguage } = useAppContext();
  const { query } = useRouter();
  const { mutation, isLoading } = useMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const schema = yup.object({
    topicName: yup
      .string()
      .required(`${dataContent(selectedLanguage).LessonReq}`),
    description: yup
      .string()
      .required(`${dataContent(selectedLanguage).DescriptionReq}`),
  });

  const formik = useFormik({
    initialValues: {
      topicName: "",
      description: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData?.append("topic", values?.topicName);
        formData?.append("description", values?.description);
        formData?.append("courseId", query?.sectionId as string);
        const res = await mutation("tutor/create-section", {
          method: "POST",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
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
      <div
        className="flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded-md"
        onClick={handleClickOpen}
      >
        <Add className="text-2xl" />
        <p className="text-lg font-medium">
          {courseSectionPage(selectedLanguage).addSection}
        </p>
      </div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {courseSectionPage(selectedLanguage).addSection}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <form onSubmit={formik.handleSubmit}>
              <label className="mb-2 block text-xl font-semibold text-primary">
                {courseSectionPage(selectedLanguage).topicName}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={courseSectionPage(selectedLanguage).topicNamePlace}
                className={`bg-white text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full  ${
                  formik.touched.topicName && Boolean(formik.errors.topicName)
                    ? "dark:border-red-600"
                    : "dark:border-gray-400"
                }`}
                name="topicName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.topicName}
              />

              <p className="text-base text-red-600 mt-1">
                {formik.touched.topicName && formik.errors.topicName}
              </p>
              <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                {courseSectionPage(selectedLanguage).description}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                placeholder={
                  courseSectionPage(selectedLanguage).descriptionPlace
                }
                className={`bg-white text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full  ${
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                    ? "dark:border-red-600"
                    : "dark:border-gray-400"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              ></textarea>

              <p className="text-base text-red-600 mt-1">
                {formik.touched.description && formik.errors.description}
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
                      {courseSectionPage(selectedLanguage).Adding}
                    </>
                  ) : (
                    courseSectionPage(selectedLanguage).addSectionBtn
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
