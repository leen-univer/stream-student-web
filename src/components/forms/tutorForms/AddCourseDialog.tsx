import { Add, Close } from "@mui/icons-material";
import {
  CircularProgress,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TextInput } from "components/core";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { tutorAddCoursePage } from "locale";
import { useState } from "react";
import * as yup from "yup";

export default function AddCourseDialog({ mutate }: { mutate: () => void }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<any>(null);
  const { selectedLanguage } = useAppContext();
  const [courseCategoryId, setCourseCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutation, isLoading } = useMutation();

  const { data } = useSWRAPI("category/getAllCategory");
  const courseCategoryData = data?.data?.data?.data;

  const { data: courseSubCategoryData } = useSWRAPI(
    `category/getAllSubCategory?categoryId=${courseCategoryId}`
  );
  const { data: languageData } = useSWRAPI(`language/get-all-language`);
  const inputSchema = [
    {
      key: "1",
      name: "courseName",
      label: `${tutorAddCoursePage(selectedLanguage).courseName} `,
      required: true,
      placeholder: `${tutorAddCoursePage(selectedLanguage).courseNamePlace}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(`${tutorAddCoursePage(selectedLanguage).courseNameSpan}`)
        .min(3, `${tutorAddCoursePage(selectedLanguage).Min3letter}`)
        .max(100, `${tutorAddCoursePage(selectedLanguage).Max100letter}`),
      type: "text",
      className: "col-span-12",
    },
    {
      key: "2",
      name: "description",
      label: `${tutorAddCoursePage(selectedLanguage).description} `,
      required: true,
      placeholder: `${tutorAddCoursePage(selectedLanguage).descriptionPlace}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(`${tutorAddCoursePage(selectedLanguage).descriptionSpan}`)
        .min(10, `${tutorAddCoursePage(selectedLanguage).Min10letter}`)
        .max(100, `${tutorAddCoursePage(selectedLanguage).Max100letter}`),

      type: "text",
      multiline: true,
      rows: 2,
      className: "col-span-12",
    },
    {
      key: "3",
      name: "courseCategory",
      label: `${tutorAddCoursePage(selectedLanguage).category} `,
      required: true,
      // placeholder: `${tutorAddCoursePage(selectedLanguage).category}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(`${tutorAddCoursePage(selectedLanguage).categorySpan}`),
      type: "select",
      options:
        courseCategoryData === null
          ? []
          : courseCategoryData?.map((item: any) => ({
              key: item?._id, // Adjust this according to your API response
              label: item?.name, // Adjust this according to your API response
              value: item?._id,
              // value: item?.name + "@" + item?._id,
            })),
      className: "col-span-6",
    },
    {
      key: "4",
      name: "courseSubCategory",
      label: `${tutorAddCoursePage(selectedLanguage).subCategory} `,
      // required: true,
      // placeholder: `${tutorAddCoursePage(selectedLanguage).category}`,
      initialValue: "",
      validationSchema: yup.string(),
      type: "select", //courseSubCategoryData
      options:
        courseSubCategoryData === null
          ? []
          : courseSubCategoryData?.data?.data?.data?.map((item: any) => ({
              key: item?._id, // Adjust this according to your API response
              label: item?.name, // Adjust this according to your API response
              value: item?._id,
              // name: item?.name, // Adjust this according to your API response
            })),
      className: "col-span-6",
    },
    {
      key: "5",
      name: "mrpPrice",
      label: `${tutorAddCoursePage(selectedLanguage).mrpPrice} `,
      required: true,
      placeholder: `${tutorAddCoursePage(selectedLanguage).mrpPricePlace}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(`${tutorAddCoursePage(selectedLanguage).mrpPriceSpan}`)
        .min(1, `${tutorAddCoursePage(selectedLanguage).Min1digit}`)
        // .max(100, "Maximum 100 digit numbers")
        .test(
          "non-negative",
          `${tutorAddCoursePage(selectedLanguage).ValuePositive}`,
          (value) => {
            return parseFloat(value) >= 0;
          }
        ),
      type: "number",
      className: "col-span-6",
    },
    {
      key: "6",
      name: "salePrice",
      label: `${tutorAddCoursePage(selectedLanguage).salePrice} `,
      required: true,
      placeholder: `${tutorAddCoursePage(selectedLanguage).salePricePlace}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(`${tutorAddCoursePage(selectedLanguage).salePriceSpan}`)
        .min(1, `${tutorAddCoursePage(selectedLanguage).Min1digit}`)
        // .max(100, "Maximum 100 Numbers")
        .test(
          "non-negative",
          `${tutorAddCoursePage(selectedLanguage).ValuePositive}`,
          (value) => {
            return parseFloat(value) >= 0;
          }
        )
        .test(
          "less-than-or-equal-to-cost-price",
          `${tutorAddCoursePage(selectedLanguage).Salegreaterprice}`,
          function (value) {
            const mrpPrice = this.parent.mrpPrice;
            return parseFloat(value) <= parseFloat(mrpPrice);
          }
        ),
      type: "number",
      className: "col-span-6",
    },
  ];

  const initialValues = inputSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    { selectedLanguages: [] }
  );
  const validationSchema = inputSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const [thumbnailError, setThumbnailError] = useState("");
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setThumbnailError("");
      if (!values?.thumbnail) {
        setThumbnailError(
          `${tutorAddCoursePage(selectedLanguage).thumbnailreq}`
        );
        return;
      }
      let res;
      const formData = new FormData();
      formData?.append("courseName", values?.courseName);
      formData?.append("description", values?.description);
      formData?.append(
        "courseCategory",
        values?.courseCategory
        // values?.courseCategory?.split("@")?.at(0)
      );
      formData?.append("courseSubCategory", values?.courseSubCategory);
      formData?.append("mrpPrice", values?.mrpPrice);
      formData?.append("salePrice", values?.salePrice);
      formData?.append("thumbnailImage", values?.thumbnail);
      values.selectedLanguageIds.forEach((item: string) => {
        formData.append("language", item);
      });
      try {
        setLoading(true);
        res = await mutation("tutor/create-course", {
          method: "POST",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
        mutate();
        handleClose();
        setImage(null);
        formik.resetForm();
        setLoading(false);
      } catch (error) {}
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {tutorAddCoursePage(selectedLanguage).addCourse}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <form className="grid grid-cols-12 gap-6">
              {inputSchema?.map((items) => (
                <div
                  className={`text-xl font-semibold text-primary ${items?.className}`}
                  key={items.key}
                >
                  {items?.label}
                  {items?.required ? (
                    <span className="-ml-1 text-red-500">*</span>
                  ) : null}
                  <TextInput
                    key={items?.key}
                    name={items?.name}
                    placeholder={items?.placeholder}
                    type={items?.type as any}
                    value={formik?.values[items?.name]}
                    onChange={(e) => {
                      if (items?.name == "courseCategory")
                        setCourseCategoryId(
                          e?.target?.value
                          // e?.target?.value?.split("@")?.at(-1) || ""
                        );
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    options={items?.options}
                    size="small"
                    multiline={items?.multiline}
                    rows={items?.rows}
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
              <div className="col-span-12">
                <label className="mb-2 block text-xl font-semibold text-primary">
                  {tutorAddCoursePage(selectedLanguage).selectLanguage}
                  <span className="text-red-500">*</span>
                </label>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Select Languages</InputLabel>
                  <Select
                    label="Select Languages"
                    multiple
                    name="selectedLanguages"
                    value={formik.values.selectedLanguages}
                    onChange={(e) => {
                      const selectedLanguageIds = e.target.value.map(
                        (languageName: any) => {
                          const language = languageData?.data?.data.find(
                            (l: any) => l.options === languageName
                          );
                          return language ? language._id : "";
                        }
                      );
                      formik.setFieldValue("selectedLanguages", e.target.value);
                      formik.setFieldValue(
                        "selectedLanguageIds",
                        selectedLanguageIds
                      );
                    }}
                    onBlur={formik.handleBlur}
                    renderValue={(selected) => (
                      <div className="flex flex-row gap-3">
                        {selected.map((languageName: any) => (
                          <div
                            className="bg-blue-100/50 rounded-full py-0 px-4"
                            key={languageName}
                          >
                            {languageName}
                          </div>
                        ))}
                      </div>
                    )}
                  >
                    {languageData?.data?.data?.map((language: any) => (
                      <MenuItem key={language._id} value={language.options}>
                        {language.options}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12">
                <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                  {tutorAddCoursePage(selectedLanguage).thumbnail}
                  <span className="text-red-500">*</span>
                </label>
                <FileUpload
                  // setValue={null}
                  allowedTypes=".jpg, .jpeg, .png, .gif, .webp"
                  variant={"square"}
                  value={image}
                  onChange={(e: any) => {
                    formik.setFieldValue("thumbnail", e?.target.files[0]);
                    setImage(e);
                  }}
                  width="100%"
                  height={175}
                  // variant="rounded"
                  className="bg-primary/30"
                />
                {thumbnailError && (
                  <p className="text-red-500">{thumbnailError}</p>
                )}
              </div>
            </form>
            <div className="w-full flex items-center justify-center mt-6">
              <button
                type="submit"
                onClick={() => formik.handleSubmit()}
                className={`bg-primary/90 md:w-[30%] w-full py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md ${
                  formik.isSubmitting ? "opacity-50" : "opacity-100"
                }`}
                disabled={formik.isSubmitting}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      color="inherit"
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                    {tutorAddCoursePage(selectedLanguage).Adding}
                  </>
                ) : (
                  tutorAddCoursePage(selectedLanguage).addcourseBtn
                )}
              </button>
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

      <div
        className="w-full h-full flex items-center justify-center bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl cursor-pointer"
        onClick={handleClickOpen}
      >
        <Add className="text-5xl text-primary" />
        <h1 className="text-3xl text-primary font-bold">
          {tutorAddCoursePage(selectedLanguage).addCourse}
        </h1>
      </div>
    </>
  );
}
