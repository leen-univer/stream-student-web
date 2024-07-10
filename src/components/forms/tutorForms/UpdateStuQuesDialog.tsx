import { Close, EditOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextInput } from "components/core";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import useMutation from "hooks/useMutataion";
import { courseSectionPage, lectureSectionPage } from "locale";
import { useRouter } from "next/router";
import * as React from "react";
import * as Yup from "yup";
import * as yup from "yup";

export default function UpdateStuQuesDialog({
  data,
  mutate,
}: {
  data: any;
  mutate: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [loading, setLoading] = React.useState(false);
  const { selectedLanguage } = useAppContext();
  const [file, setFile] = React.useState<any>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const { mutation } = useMutation();

  //? tutor registration array
  const inputSchema = [
    {
      key: "1",
      name: "answer",
      label: `${lectureSectionPage(selectedLanguage).answer}`,
      placeholder: `${lectureSectionPage(selectedLanguage).answerPlace}`,
      type: "text",
      required: true,
      validationSchema: Yup.string().required(
        `${lectureSectionPage(selectedLanguage).answerSpan}`
      ),
      initialValue: "",
      disabled: true,
      className: "col-span-12",
    },
    {
      key: "2",
      name: "linkUrl",
      label: `${lectureSectionPage(selectedLanguage).link}`,
      placeholder: `${lectureSectionPage(selectedLanguage).addLink}`,
      type: "text",
      validationSchema: Yup.string().url("Please enter a valid URL"),
      initialValue: "",
      disabled: true,
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
          question: data?.question || "",
          answer: data?.answer || "",
          attachmentMaterial: data?.attachmentMaterial || "",
          linkUrl: data?.linkUrl || "",
        }
      : initialValues,
    validationSchema: yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;

        formData?.append("answer", values?.answer);
        formData?.append("linkUrl", values?.linkUrl);
        formData?.append("attachmentMaterial", file?.target?.files[0] as any);

        res = await mutation(`myQuestion/give-reply?questionId=${data?._id}`, {
          method: "PUT",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
        mutate?.();
        setFile(null);
        handleClose();
        formik.resetForm();
      } catch (error) {}
    },
  });
  return (
    <React.Fragment>
      <Tooltip title={`${data?.answer ? "Update answer" : "Give answer"}`}>
        <button
          onClick={handleClickOpen}
          className="w-10 h-10 grid place-items-center rounded-full border border-amber-500 bg-amber-500/10 text-amber-500"
        >
          <EditOutlined />
        </button>
      </Tooltip>
      <Dialog
        fullWidth={fullWidth}
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {data?.answer
              ? courseSectionPage(selectedLanguage).UpdateAnswer
              : courseSectionPage(selectedLanguage).Giveanswer}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <div className="flex flex-col gap-4">
              <div>
                <form>
                  <p className="text-gray-800 font-semibold text-lg">
                    Question :{" "}
                    <span className="text-red-700 font-medium">
                      {data?.question}
                    </span>
                  </p>
                  {inputSchema?.map((items) => (
                    <div
                      className={`text-xl font-semibold text-primary ${items?.className}`}
                      key={items.key}
                    >
                      <label className="mt-2 block text-xl font-semibold text-primary">
                        {items?.label}
                        {items?.required ? (
                          <span className="text-red-500">*</span>
                        ) : null}
                      </label>
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
                  <div>
                    <label className="my-2 block text-xl font-semibold text-primary">
                      {lectureSectionPage(selectedLanguage).document}
                    </label>
                    <FileUpload
                      variant={"square"}
                      value={file}
                      onChange={(e: any) => {
                        formik.setFieldValue("thumbnail", e?.target.files[0]);
                        setFile(e);
                      }}
                      width="100%"
                      height={175}
                      txtName={lectureSectionPage(selectedLanguage).document}
                      allowedTypes=".pdf, .doc, .docx"
                      className="object-contain overflow-hidden bg-primary/10"
                    />
                  </div>
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
                    {data?.answer
                      ? lectureSectionPage(selectedLanguage).update
                      : lectureSectionPage(selectedLanguage).add}
                  </button>
                </div>
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
    </React.Fragment>
  );
}
