import React, { useState } from "react";
import { useAppContext } from "contexts";
import { lectureSectionPage } from "locale";
import { useFormik } from "formik";
import * as yup from "yup";
import FileUpload from "components/core/FileUpload";
import { useRouter } from "next/router";
import useMutation from "hooks/useMutataion";
import * as Yup from "yup";
import { TextInput } from "components/core";
import { CircularProgress } from "@mui/material";

const AddDocumentForm = ({
  documentMutate,
  handleClose,
}: {
  documentMutate: () => void;
  handleClose: any;
}) => {
  const router = useRouter();
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [documentError, setDocumentError] = useState("");
  const { selectedLanguage } = useAppContext();
  const { mutation } = useMutation();

  //? tutor registration array
  const inputSchema = [
    {
      key: "1",
      name: "title",
      label: `${lectureSectionPage(selectedLanguage).title}`,
      placeholder: `${lectureSectionPage(selectedLanguage).title}`,
      type: "text",
      required: true,
      validationSchema: Yup.string().required(
        `${lectureSectionPage(selectedLanguage).titleSpan}`
      ),
      initialValue: "",
      className: "col-span-12",
    },
    {
      key: "2",
      name: "description",
      label: `${lectureSectionPage(selectedLanguage).description}`,
      placeholder: `${lectureSectionPage(selectedLanguage).description}`,
      type: "description",
      required: true,
      validationSchema: Yup.string().required(
        `${lectureSectionPage(selectedLanguage).descriptionSpan}`
      ),
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
    initialValues: initialValues,
    validationSchema: yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setDocumentError("");
        const formData = new FormData();
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;

        formData?.append("title", values?.title);
        formData?.append("description", values?.description);

        if (!file) {
          setDocumentError("Document is required");
          setIsLoading(false);
          return;
        }

        values?.thumbnail &&
          formData?.append("studyMaterial", file?.target?.files[0] as any);
        if (router?.query?.videoId) {
          res = await mutation(
            `tutor/create-study-material?sectionId=${router?.query?.videoId}`,
            {
              method: "POST",
              body: formData,
              isFormData: true,
              isAlert: true,
            }
          );
          documentMutate?.();
          setFile(null);
          handleClose();
          setIsLoading(false);
          formik.resetForm();
        } else {
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
  });
  return (
    <>
      <div className="max-h-full overflow-scroll">
        <div className="flex flex-col gap-4">
          <form>
            {inputSchema?.map((items) => (
              <div
                className={`text-xl font-semibold text-primary ${items?.className}`}
                key={items.key}
              >
                <div className="mt-2">
                  {items?.label}
                  {items?.required ? (
                    <span className=" text-red-500"> *</span>
                  ) : null}
                </div>
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
                    formik?.touched[items?.name] && formik?.errors[items?.name]
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
                <span className="text-red-500">*</span>
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
              {documentError && <p className="text-red-500">{documentError}</p>}
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
              {isLoading ? (
                <CircularProgress size={20} className="!text-white" />
              ) : (
                lectureSectionPage(selectedLanguage).add
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDocumentForm;
