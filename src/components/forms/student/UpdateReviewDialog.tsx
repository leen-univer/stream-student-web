import { LoadingButton } from "@mui/lab";
import { CircularProgress, Dialog, Rating, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import { Close, EditOutlined } from "@mui/icons-material";
import { useAppContext } from "contexts";
import useMutation from "hooks/useMutataion";
import { loadingContent, reviewDialogContent } from "locale";
import { useRouter } from "next/router";
import React from "react";
import { REVIEW_TYPE } from "types";
import showError from "utils/error";

const UpdateReviewDialog = ({
  mutate,
  data,
}: {
  mutate?: () => void;
  data?: REVIEW_TYPE;
}) => {
  const { selectedLanguage, changeLanguage } = useAppContext();
  const [open, setOpen] = React.useState(false);
  const { mutation } = useMutation();
  const { query } = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?._id)
      setInitialValues({
        review: data?.message,
        rating: data?.rating,
      });
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [initialValues, setInitialValues] = useState({
    review: data?.message,
    rating: data?.rating,
  });

  const handleClose = () => {
    setOpen(false);
  };

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
    enableReinitialize: data?._id ? true : false,
    onSubmit: async (values: any, props: { resetForm: () => void }) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData?.append("rating", values?.rating);
        formData?.append("message", values?.review);
        // formData?.append("reviewedCourse", query?.courseID as string);

        const res = await mutation(
          `student/update-review?reviewId=${data?._id}`,
          {
            method: "PUT",
            body: formData,
            isFormData: true,
            isAlert: true,
          }
        );
        res?.status && mutate && mutate();
        props.resetForm();
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
      <div>
        <EditOutlined
          onClick={handleClickOpen}
          fontSize="medium"
          className="absolute top-12 right-4 text-green-500 hidden group-hover:block cursor-pointer"
        />
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <h1 className="text-2xl font-bold text-center mt-4">
          {reviewDialogContent(selectedLanguage).Review}
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="relative flex w-[30rem] flex-col gap-4 px-8 py-6"
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
                {loadingContent(selectedLanguage).Updating}
              </>
            ) : (
              loadingContent(selectedLanguage).Update
            )}
          </LoadingButton>
        </form>
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

export default UpdateReviewDialog;
