import { EditOutlined, Send } from "@mui/icons-material";
import { Button, Checkbox, CircularProgress, Tooltip } from "@mui/material";
import { TextInput } from "components/core";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import useMutation from "hooks/useMutataion";
import { lectureSectionPage, tutorAddCoursePage } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";
import * as Yup from "yup";

const AddVideoForm = ({
  mutate,
  handleClose,
}: {
  mutate?: () => void;
  handleClose: any;
}) => {
  const router = useRouter();
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState("");
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
      validationSchema: Yup.string()
        .min(5, `${tutorAddCoursePage(selectedLanguage).Min5letter}`)
        .max(100, `${tutorAddCoursePage(selectedLanguage).Max100letter}`)
        .required(`${lectureSectionPage(selectedLanguage).titleSpan}`),
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
      validationSchema: Yup.string()
        .min(10, `${tutorAddCoursePage(selectedLanguage).Min10letter}`)
        .max(200, `${tutorAddCoursePage(selectedLanguage).Max100letter}`)
        .required(`${lectureSectionPage(selectedLanguage).descriptionSpan}`),
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
    {
      isFree: false,
    }
  );
  const validationSchema = inputSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {
      isFree: yup.boolean(),
    }
  );
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setVideoError("");
        const formData = new FormData();
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;

        formData?.append("title", values?.title);
        formData?.append("description", values?.description);
        formData?.append("isFree", values.isFree);

        if (!file) {
          setVideoError("Video is required");
          setIsLoading(false);
          return;
        }

        values?.thumbnail &&
          formData?.append("courseVideo", file?.target?.files[0] as any);
        if (router?.query?.videoId) {
          res = await mutation(
            `tutor/create-video?sectionId=${router?.query?.videoId}`,
            {
              method: "POST",
              body: formData,
              isFormData: true,
              isAlert: true,
            }
          );
          mutate?.();
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
            <div className="my-4">
              <label className="block text-xl font-semibold text-primary">
                Preview
              </label>
              <div>
                <span className="text-lg font-medium text-gray-600">
                  Mark this video as a preview
                </span>
                <Checkbox
                  name="isFree"
                  checked={formik.values.isFree}
                  onChange={() => {
                    formik.setFieldValue("isFree", !formik.values.isFree);
                  }}
                />
              </div>
            </div>
            <div>
              <label className="my-2 block text-xl font-semibold text-primary">
                {lectureSectionPage(selectedLanguage).video}
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
                txtName={lectureSectionPage(selectedLanguage).video}
                allowedTypes=".mp4"
                className="object-contain overflow-hidden bg-primary/10"
              />
              {videoError && <p className="text-red-500">{videoError}</p>}
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

export default AddVideoForm;
