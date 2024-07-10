import { CircularProgress } from "@mui/material";
import { TextInput } from "components/core";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { CategoryFormContent, loadingContent } from "locale";
import { useState } from "react";
import * as yup from "yup";

export default function CategoryForm({
  isEdit,
  handleClose,
  id,
  mutate, //-->
}: {
  isEdit?: boolean;
  handleClose: () => void;
  id?: string;
  mutate?: () => void;
}) {
  const { data: getIndividualCategory, isValidating } = useSWRAPI(
    `category/getCategory/${id}`
  );
  const cardData = getIndividualCategory?.data?.data;
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inputSchema = [
    {
      key: "1",
      name: "categoryName",
      label: `${CategoryFormContent(selectedLanguage).CategoryName} `,
      required: true,
      placeholder: `${CategoryFormContent(selectedLanguage).EnterCategoryName}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(CategoryFormContent(selectedLanguage).CategoryNameIsRequired)
        .min(3, CategoryFormContent(selectedLanguage).MinimumLetters)
        .max(50, CategoryFormContent(selectedLanguage).MaximumLetters),
      type: "text",
      className: "col-span-12",
    },
    {
      key: "2",
      name: "description",
      label: `${CategoryFormContent(selectedLanguage).description}`,
      required: true,
      placeholder: `${CategoryFormContent(selectedLanguage).EnterDescription}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(
          CategoryFormContent(selectedLanguage).CategoryDescriptionIsRequired
        )
        .min(3, CategoryFormContent(selectedLanguage).MinimumLetters)
        .max(80, CategoryFormContent(selectedLanguage).MaximumLetters),
      type: "text",
      className: "col-span-12",
    },
    {
      key: "3",
      name: "thumbnailImage",
      label: `upload image`,
      required: true,
      placeholder: `enter image`,
      initialValue: "",
      validationSchema: yup.string().required("required!"),
      type: "file",
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
          categoryName: cardData?.name,
          description: cardData?.description,
          thumbnailImage: cardData?.thumbnailUrl,
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

        formData?.append("name", values?.categoryName);
        formData?.append("description", values?.description);
        values?.thumbnailImage &&
          formData?.append("thumbnailImage", values?.thumbnailImage);
        if (id) {
          res = await mutation(`category/update-category?categoryId=${id}`, {
            method: "PUT",
            body: formData,
            isFormData: true,
            isAlert: true,
          });

          mutate?.();
          handleClose();
        }
        if (!id) {
          res = await mutation("category/create-category", {
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
        } else {
        }
      } catch (error) {}
    },
  });

  if (isEdit && isValidating)
    return (
      <div className="w-full flex justify-center ">
        <img src="/loader.png" alt="" className="object-fill w-10 h-10" />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {isEdit && isValidating ? (
        <div className="w-full flex justify-center ">
          <img src="/loader.png" alt="" className="object-fill w-10 h-10" />
        </div>
      ) : (
        <div>
          <form>
            {inputSchema?.map((items) => (
              <>
                {items?.type === "file" ? (
                  <div>
                    <label className="mb-2 block text-xl font-semibold text-primary">
                      {CategoryFormContent(selectedLanguage).Thumbnail}
                      <span className="text-red-500">*</span>
                    </label>
                    <FileUpload
                      variant={"square"}
                      value={image || cardData?.thumbnailUrl}
                      onChange={(e: any) => {
                        formik.setFieldValue(
                          "thumbnailImage",
                          e?.target.files[0]
                        );
                        setImage(e);
                      }}
                      width="100%"
                      height={175}
                      txtName={
                        CategoryFormContent(selectedLanguage)
                          .ClickHereToUploadImage
                      }
                      allowedTypes=".jpg, .jpeg, .png, .gif"
                      className="object-contain overflow-hidden bg-primary/10"
                    />

                    {formik.touched["thumbnailImage"] &&
                    formik.errors["thumbnailImage"] ? (
                      <p className="text-red-500">
                        {
                          CategoryFormContent(selectedLanguage)
                            .Pleaseprovideanimage
                        }
                      </p>
                    ) : null}
                  </div>
                ) : (
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
                )}
              </>
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
              {isEdit ? (
                <>
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
                    CategoryFormContent(selectedLanguage).Update
                  )}
                </>
              ) : (
                <>
                  {loading ? (
                    <>
                      <CircularProgress
                        color="inherit"
                        size={20}
                        style={{ marginRight: 10 }}
                      />
                      {loadingContent(selectedLanguage).Adding}
                    </>
                  ) : (
                    CategoryFormContent(selectedLanguage).AddCategory
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
