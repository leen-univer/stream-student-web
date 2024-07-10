import { LoadingButton } from "@mui/lab";
import { CircularProgress, Dialog, Rating, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { Add, Close } from "@mui/icons-material";
import { useAppContext } from "contexts";
import { useAuth } from "hooks";
import useMutation from "hooks/useMutataion";
import { loadingContent, reviewDialogContent } from "locale";
import { useRouter } from "next/router";
import React from "react";
import showError from "utils/error";

const ReviewDialog = ({
  mutate,
  isPurchased,
}: {
  mutate?: () => void;
  isPurchased?: any;
}) => {
  const { selectedLanguage, changeLanguage } = useAppContext();
  const [open, setOpen] = React.useState(false);
  const { mutation } = useMutation();
  const { query } = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [initialValues, setInitialValues] = useState({
    review: "",
    rating: 0,
  });
  const validationSchema = Yup.object({
    rating: Yup.number().required(
      reviewDialogContent(selectedLanguage).RatingRequired
    ),
    review: Yup.string().required(
      reviewDialogContent(selectedLanguage).ReviewRequired
    ),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any, props: { resetForm: () => void }) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData?.append("rating", values.rating);
        formData?.append("message", values.review);
        formData?.append("reviewedCourse", query?.courseID as string);

        const res = await mutation("student/create-review", {
          method: "POST",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
        res?.status && mutate && mutate();
        handleClose();
      } catch (error) {
        showError(error);
      } finally {
        props.resetForm();
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div
        className="w-full h-full flex items-center justify-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl cursor-pointer px-2"
        onClick={handleClickOpen}
      >
        <Add className="text-2xl text-primary" />
        <h1 className="text-lg text-primary font-bold">
          {reviewDialogContent(selectedLanguage).GiveReview}
        </h1>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <h1 className="text-2xl font-bold text-center mt-4">
          {reviewDialogContent(selectedLanguage).Review}
        </h1>
        {isPurchased ? (
          <form
            onSubmit={formik.handleSubmit}
            className="relative flex md:w-[30rem] w-full flex-col gap-4 px-8 py-6"
          >
            <p className="text-sm tracking-wide text-gray-500">
              {reviewDialogContent(selectedLanguage).YourRating} *
            </p>
            <Rating
              name="size-small"
              value={formik.values.rating}
              size="large"
              className="!w-fit"
              onChange={(event: any, newValue: any) => {
                formik.setFieldValue("rating", newValue);
              }}
            />

            <TextField
              fullWidth
              type="text"
              name="review"
              placeholder={reviewDialogContent(selectedLanguage).YourReview}
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              className=""
              InputProps={{
                classes: {
                  root: " ",
                  notchedOutline: "sorting-select-outline",
                  // input: 'mui-textfield-input',
                },
              }}
              value={formik.values.review}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.review && Boolean(formik.errors.review)}
              helperText={formik.touched.review && formik.errors.review}
            />

            <LoadingButton
              size="large"
              variant="contained"
              className="w-full bg-theme !tracking-wider text-white bg-primary/90 hover:bg-primary duration-300"
              type="submit"
            >
              {loading ? (
                <>
                  <CircularProgress
                    color="inherit"
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                  {loadingContent(selectedLanguage).Submitting}
                </>
              ) : (
                reviewDialogContent(selectedLanguage).Submit
              )}
            </LoadingButton>
          </form>
        ) : (
          <p className="text-red-500 text-xl font-semibold bg-yellow-100 p-2 rounded-md text-center m-5">
            You need to purchase this course to give the review.
          </p>
        )}
        <DialogActions className="absolute top-2 right-5">
          <Close
            onClick={handleClose}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewDialog;
