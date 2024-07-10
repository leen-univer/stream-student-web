import { CircularProgress } from "@mui/material";
import { TextInput } from "components/core";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { CategoryFormContent, lectureSectionPage } from "locale";
import { useState } from "react";
import * as yup from "yup";

export default function AddMainQuizForm({
  handleClose,
  id,
  mutate, //-->
}: {
  handleClose: any;
  id?: string;
  mutate?: () => void;
}) {
  const { data: getIndividualCategory, isValidating } = useSWRAPI(
    `category/getCategory/${id}`
  );
  const cardData = getIndividualCategory?.data?.data;
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
    initialValues: cardData
      ? {
          title: "",
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

        res = await mutation("quiz/create-quiz", {
          method: "POST",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
        mutate?.();
        setImage(null);
        handleClose();
        formik.resetForm();
        setLoading(false);
      } catch (error) {}
    },
  });

  return (
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
                {lectureSectionPage(selectedLanguage).adding}
              </>
            ) : (
              lectureSectionPage(selectedLanguage).add
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
