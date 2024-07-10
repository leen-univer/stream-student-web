import { Close, EditOutlined } from "@mui/icons-material";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { TextInput } from "components/core";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { CategoryFormContent, lectureSectionPage } from "locale";
import { useState } from "react";
import * as yup from "yup";

export default function UpdateMainQuizForm({
  data,
  mutate, //-->
}: {
  data?: any;
  mutate?: () => void;
}) {
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputSchema = [
    {
      key: "1",
      name: "title",
      label: `${lectureSectionPage(selectedLanguage).title} `,
      required: true,
      placeholder: `${lectureSectionPage(selectedLanguage).titlePlace}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(lectureSectionPage(selectedLanguage).titleSpan),
      type: "text",
      className: "col-span-12",
    },
  ];

  const initialValues = inputSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = inputSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const formik = useFormik({
    initialValues: data
      ? {
          title: data?.title,
        }
      : initialValues,
    validationSchema: yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;

        formData?.append("title", values?.title);

        res = await mutation(`quiz/update-quiz/${data?._id}`, {
          method: "PUT",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
        mutate?.();
        handleClose();
        formik.resetForm();
        setLoading(false);
      } catch (error) {}
    },
  });
  return (
    <>
      <Tooltip
        title={lectureSectionPage(selectedLanguage).UpdateQuiz}
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
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {lectureSectionPage(selectedLanguage).UpdateQuiz}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <div>
              <form>
                {inputSchema?.map((items) => (
                  <div
                    className={`text-xl font-semibold text-primary ${items?.className}`}
                    key={items.key}
                  >
                    {items?.label}
                    {items?.required ? (
                      <span className="-ml-1 text-red-500"> *</span>
                    ) : null}
                    <TextInput
                      key={items?.key}
                      name={items?.name}
                      placeholder={items?.placeholder}
                      type={items?.type as any}
                      value={formik?.values[items?.name]}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      size="small"
                      // options={items?.options}
                      // multiline={items?.multiline}
                      // rows={items?.rows}
                      fullWidth
                      error={Boolean(
                        formik?.touched[items?.name] &&
                          formik?.errors[items?.name]
                      )}
                      helperText={
                        formik?.touched[items?.name] &&
                        (formik?.errors[items?.name] as any)
                      }
                      // styleContact={items?.className}
                      styleArea={`${"col-span-12 md:col-span-6 !w-full"}`}
                      styleField="w-full col-span-12 overflow-hidden"
                    />
                  </div>
                ))}
              </form>
              <div className="w-full flex items-center justify-center mt-6">
                <button
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                  disabled={formik.isSubmitting}
                  className={`bg-primary/90 px-8 py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md ${
                    formik.isSubmitting ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        color="inherit"
                        size={20}
                        style={{ marginRight: 10 }}
                      />
                      {lectureSectionPage(selectedLanguage).Updating}
                    </>
                  ) : (
                    lectureSectionPage(selectedLanguage).UpdateQuiz
                  )}
                </button>
              </div>
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
    </>
  );
}
