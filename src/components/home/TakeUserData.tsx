import { Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { useAuth } from "hooks";
import useMutation from "hooks/useMutataion";
import { courseSectionPage } from "locale";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function TakeUserData({
  mutate,
  open,
  setOpen,
  quizId,
}: {
  open: any;
  setOpen: any;
  mutate?: () => void;
  quizId?: any;
}) {
  const [fullWidth, setFullWidth] = useState(true);
  const [loading, setLoading] = useState(false);
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();

  const handleClose = () => {
    setOpen(false);
  };
  const schema = yup.object({
    name: yup
      .string()
      .required(`${courseSectionPage(selectedLanguage).nameSpan}`),
    email: yup
      .string()
      .email(`${courseSectionPage(selectedLanguage).emailSpan}`)
      .required(`${courseSectionPage(selectedLanguage).emailSpan}`),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Check if user exists in localStorage
        const localUser = JSON.parse(
          localStorage.getItem("localUser") || "null"
        );

        let requestBody;

        if (localUser) {
          // If user exists, use local user information
          requestBody = {
            name: localUser.name,
            email: localUser.email,
          };
        } else {
          // If user doesn't exist, use input values and store in localStorage
          requestBody = {
            name: values.name,
            email: values.email,
          };
        }

        // Your existing code to append values to FormData
        const formData = new FormData();
        formData?.append("name", requestBody?.name);
        formData?.append("email", requestBody?.email);

        // Your existing code for making the API call
        const res = await mutation(
          `quizSubmitted/create-quiz-submission?quizId=${quizId}`,
          {
            method: "POST",
            body: formData,
            isFormData: true,
            isAlert: true,
          }
        );

        if (res?.status === 200) {
          // Store in localStorage
          localStorage.setItem("localUser", JSON.stringify(requestBody));
          // Display success message
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "User data saved successfully!",
          });
        }
        // Your existing code for mutation, handleClose, and resetting form
        mutate?.();
        handleClose();
        formik.resetForm();
        return;
      } catch (error) {
        console.error("An error occurred:", error);
        // Display error message
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {courseSectionPage(selectedLanguage).Information}
          </h1>
          <p className="text-sm">
            {courseSectionPage(selectedLanguage).InformationDesc}
          </p>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <form onSubmit={formik.handleSubmit}>
              <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                {courseSectionPage(selectedLanguage).name}
                <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                id="name"
                placeholder={courseSectionPage(selectedLanguage).namePlace}
                className={`bg-white text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full  ${
                  formik.touched.name && Boolean(formik.errors.name)
                    ? "dark:border-red-600"
                    : "dark:border-gray-400"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              ></input>

              <p className="text-base text-red-600 mt-1">
                {formik.touched.name && formik.errors.name}
              </p>
              <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                {courseSectionPage(selectedLanguage).email}
                <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                id="email"
                placeholder={courseSectionPage(selectedLanguage).emailPlace}
                className={`bg-white text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full  ${
                  formik.touched.email && Boolean(formik.errors.email)
                    ? "dark:border-red-600"
                    : "dark:border-gray-400"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              ></input>

              <p className="text-base text-red-600 mt-1">
                {formik.touched.email && formik.errors.email}
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
                      {courseSectionPage(selectedLanguage).submit}
                    </>
                  ) : (
                    courseSectionPage(selectedLanguage).submit
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
    </>
  );
}
