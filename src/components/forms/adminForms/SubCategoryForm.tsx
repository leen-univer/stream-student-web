import FileUpload from "components/core/FileUpload";
import { CircularProgress } from "@mui/material";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import useMutation from "hooks/useMutataion";
import { adminSubCategoryFormContent, loadingContent } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubCategoryType } from "types";
import * as Yup from "yup";

export default function SubCategoryForm({
  isEdit,
  item,
  handleClose,
  mutate,
  categoryID,
}: {
  isEdit?: boolean;
  item?: SubCategoryType;
  handleClose: () => void;
  mutate?: () => void;
  categoryID?: string;
}) {
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    subCategoryName: "",
    description: "",
    thumbnail: "",
  };
  const validationSchema = Yup.object({
    subCategoryName: Yup.string()
      .required(
        adminSubCategoryFormContent(selectedLanguage).CategoryNameIsRequired
      )
      .min(
        3,
        adminSubCategoryFormContent(selectedLanguage)
          .SubCategoryMinimum3LetterRequired
      ),
    description: Yup.string()
      .required(
        adminSubCategoryFormContent(selectedLanguage).DescriptionIsRequired
      )
      .min(
        3,
        adminSubCategoryFormContent(selectedLanguage)
          .DescriptionMinimum3LetterRequired
      )
      .max(
        80,
        adminSubCategoryFormContent(selectedLanguage)
          .DescriptionMaximum80LetterRequired
      ),
    thumbnail: Yup.string().required(
      adminSubCategoryFormContent(selectedLanguage).imgFieldIsRequired
    ),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: item
      ? {
          subCategoryName: item?.name,
          description: item?.description,
          thumbnail: item?.thumbnailUrl,
        }
      : initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // return;

      try {
        setLoading(true);
        const formData = new FormData();
        let res;
        formData?.append("name", values?.subCategoryName);
        formData?.append("description", values?.description);
        formData?.append("thumbnailImage", values?.thumbnail);

        if (item) {
          res = await mutation(
            `category/update-subCategory?subCategoryId=${item?._id}`,
            {
              method: "PUT",
              body: formData,
              isFormData: true,
              isAlert: true,
            }
          );
        }
        if (!item) {
          res = await mutation(
            `category/create-subCategory?categoryId=${categoryID}`,
            {
              method: "POST",
              body: formData,
              isFormData: true,
              isAlert: true,
            }
          );
        } else {
        }
        mutate?.();
        handleClose();
      } catch (error) {
      } finally {
        formik.resetForm();
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-xl font-semibold text-primary">
            {adminSubCategoryFormContent(selectedLanguage).SubCategoryName}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder={
              adminSubCategoryFormContent(selectedLanguage).EnterSubCategoryName
            }
            className={`bg-white text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full  ${
              formik.touched.subCategoryName &&
              Boolean(formik.errors.subCategoryName)
                ? "dark:border-red-600"
                : "dark:border-gray-400"
            }`}
            name="subCategoryName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subCategoryName}
          />
          <span className="text-base text-red-600">
            {formik.touched.subCategoryName && formik.errors.subCategoryName}
          </span>
        </div>
        <div>
          <label className="mb-2 block text-xl font-semibold text-primary">
            {adminSubCategoryFormContent(selectedLanguage).Description}{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            id="description"
            placeholder={
              adminSubCategoryFormContent(selectedLanguage).EnterDescriptions
            }
            className={` text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full ${
              formik.touched.description && Boolean(formik.errors.description)
                ? "dark:border-red-600"
                : "dark:border-gray-400"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          ></textarea>

          <span className="text-base text-red-600">
            {formik.touched.description && formik.errors.description}
          </span>
        </div>

        <div>
          <label className="mb-2 block text-xl font-semibold text-primary">
            {adminSubCategoryFormContent(selectedLanguage).Thumbnail}{" "}
            <span className="text-red-500">*</span>
          </label>
          <FileUpload
            variant={"square"}
            value={image || item?.thumbnailUrl}
            onChange={(e: any) => {
              formik.setFieldValue("thumbnail", e?.target.files[0]);
              setImage(e);
            }}
            width="100%"
            height={175}
            txtName={
              adminSubCategoryFormContent(selectedLanguage)
                .ClickHereToUploadImage
            }
            allowedTypes=".jpg, .jpeg, .png, .gif"
            className="object-contain overflow-hidden bg-primary/10"
          />
          <span className="text-base text-red-600">
            {formik.touched.thumbnail && formik.errors.thumbnail}
          </span>
        </div>

        <div className="w-full flex items-center justify-center mt-6">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-primary/90 px-8 py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md"
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
                  adminSubCategoryFormContent(selectedLanguage).Update
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
                  adminSubCategoryFormContent(selectedLanguage).AddCategory
                )}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
